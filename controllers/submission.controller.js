import pool from '../config/db.js'


// Custom API error
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Validate BIGINT IDs without risking JavaScript precision loss
function isValidId(value) {
    return (
        typeof value === "string" &&
        /^[1-9]\d{0,18}$/.test(value) &&
        (
            value.length < 19 ||
            value <= "9223372036854775807"
        )
    );
}

// Validate google drive secure URLs

function isGoogleDriveUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    try {
        const url = new URL(value);

        if (
            url.protocol !== "https:" ||
            url.username ||
            url.password
        ) {
            return false;
        }

        const host = url.hostname.toLowerCase();

        const fileIdPattern = /^[a-zA-Z0-9_-]+$/;

        // Standard Google Drive file link
        if (host === "drive.google.com") {
            const fileMatch = url.pathname.match(
                /^\/file\/d\/([a-zA-Z0-9_-]+)\/view\/?$/
            );

            if (fileMatch && fileIdPattern.test(fileMatch[1])) {
                return true;
            }

            // Older Google Drive sharing link
            if (url.pathname === "/open") {
                const fileId = url.searchParams.get("id");

                return fileIdPattern.test(fileId || "");
            }
        }

        // Google Docs document link
        if (host === "docs.google.com") {
            const documentMatch = url.pathname.match(
                /^\/document\/d\/([a-zA-Z0-9_-]+)\/(edit|view|preview)\/?$/
            );

            return Boolean(documentMatch);
        }

        return false;

    } catch {
        return false;
    }
}

// is youtube video

function isYouTubeUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    try {
        const url = new URL(value);

        if (
            url.protocol !== "https:" ||
            url.username ||
            url.password
        ) {
            return false;
        }

        const host = url.hostname.toLowerCase();

        const validHosts = [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "youtu.be"
        ];

        if (!validHosts.includes(host)) {
            return false;
        }

        let videoId = null;

        if (host === "youtu.be") {
            videoId = url.pathname.split("/").filter(Boolean)[0];
        } else if (url.pathname === "/watch") {
            videoId = url.searchParams.get("v");
        } else {
            const match = url.pathname.match(
                /^\/(?:shorts|embed|live)\/([a-zA-Z0-9_-]{11})\/?$/
            );

            videoId = match ? match[1] : null;
        }

        return /^[a-zA-Z0-9_-]{11}$/.test(videoId || "");

    } catch {
        return false;
    }
}

// Validate GitHub repository URLs
function isGithubRepoUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    try {
        const url = new URL(value);

        const segments = url.pathname
            .split("/")
            .filter(Boolean);

        return (
            url.protocol === "https:" &&
            url.hostname === "github.com" &&
            !url.username &&
            !url.password &&
            segments.length >= 2 &&
            !["login", "signup", "settings"].includes(segments[0])
        );

    } catch {
        return false;
    }
}

// PostgreSQL transaction helper
async function runTransaction(callback) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await callback(client);

        await client.query("COMMIT");

        return result;

    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Transaction rollback error:", rollbackError);
        }

        throw error;

    } finally {
        client.release();
    }
}

// Check that the candidate belongs to the entry
// and that the hackathon is currently accepting submissions
async function validateSubmissionAccess(
    client,
    hackathonId,
    entryId,
    candidateId
) {
    const result = await client.query(
        `SELECT
            e.id,
            h.id AS hackathon_id,
            (h.starts_at <= NOW() AND h.ends_at > NOW())
                AS submission_open

         FROM hackathon_entries e

         JOIN hackathons h
            ON h.id = e.hackathon_id

         JOIN hackathon_entry_members m
            ON m.entry_id = e.id
            AND m.hackathon_id = e.hackathon_id

         WHERE e.id = $1
           AND h.id = $2
           AND m.candidate_id = $3

         FOR UPDATE OF e`,
        [
            entryId,
            hackathonId,
            candidateId
        ]
    );

    if (result.rows.length === 0) {
        throw new ApiError(
            404,
            "Entry not found or you are not a member of this entry"
        );
    }

    if (!result.rows[0].submission_open) {
        throw new ApiError(
            409,
            "Submissions are only allowed while the hackathon is ongoing"
        );
    }
}

// Common error handler
function handleError(res, error, operation) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message
        });
    }

    if (error.code === "23505") {
        return res.status(409).json({
            message: "A submission already exists for this level"
        });
    }

    console.error(`${operation} error:`, error);

    return res.status(500).json({
        message: "Internal server error"
    });
}


// --------------------------------------------------
// COMMON SUBMISSION FUNCTION
// --------------------------------------------------

async function submitLevel(
    req,
    res,
    level,
    fileData
) {
    try {
        const {
            hackathonId,
            entryId
        } = req.params;

        const candidateId = req.user.id;

        if (
            !isValidId(hackathonId) ||
            !isValidId(entryId)
        ) {
            return res.status(400).json({
                message: "Invalid hackathon or entry ID"
            });
        }

        const {
            synopsisUrl = null,
            introVideoUrl = null,
            githubRepoUrl = null,
            demoVideoUrl = null
        } = fileData;

        const submission = await runTransaction(async (client) => {

            // Verify candidate membership and submission dates
            await validateSubmissionAccess(
                client,
                hackathonId,
                entryId,
                candidateId
            );

            // Final submission requires approved screening
            if (level === "final") {

                const screeningResult = await client.query(
                    `SELECT id
                     FROM hackathon_submissions
                     WHERE entry_id = $1
                       AND hackathon_id = $2
                       AND level = 'screening'
                       AND submission_status = 'graded'
                       AND decision = 'passed'`,
                    [
                        entryId,
                        hackathonId
                    ]
                );

                if (screeningResult.rows.length === 0) {
                    throw new ApiError(
                        403,
                        "You must pass the screening round before submitting the final solution"
                    );
                }
            }

            // Insert or update an ungraded submission
            const result = await client.query(
                `INSERT INTO hackathon_submissions (
                    hackathon_id,
                    entry_id,
                    level,
                    submission_status,
                    synopsis_url,
                    intro_video_url,
                    github_repo_url,
                    demo_video_url,
                    submitted_at
                )
                VALUES (
                    $1, $2, $3, 'submitted',
                    $4, $5, $6, $7, NOW()
                )

                ON CONFLICT (entry_id, level)
                DO UPDATE SET
                    synopsis_url = EXCLUDED.synopsis_url,
                    intro_video_url = EXCLUDED.intro_video_url,
                    github_repo_url = EXCLUDED.github_repo_url,
                    demo_video_url = EXCLUDED.demo_video_url,
                    submitted_at = NOW(),
                    updated_at = NOW()

                WHERE hackathon_submissions.submission_status = 'submitted'

                RETURNING
                    id,
                    hackathon_id AS "hackathonId",
                    entry_id AS "entryId",
                    level,
                    submission_status AS "submissionStatus",
                    synopsis_url AS "synopsisUrl",
                    intro_video_url AS "introVideoUrl",
                    github_repo_url AS "githubRepoUrl",
                    demo_video_url AS "demoVideoUrl",
                    submitted_at AS "submittedAt"`,
                [
                    hackathonId,
                    entryId,
                    level,
                    synopsisUrl,
                    introVideoUrl,
                    githubRepoUrl,
                    demoVideoUrl
                ]
            );

            if (result.rows.length === 0) {
                throw new ApiError(
                    409,
                    "This submission has already been graded and cannot be modified"
                );
            }

            return result.rows[0];
        });

        return res.status(201).json({
            message: `${level} submission saved successfully`,
            submission
        });

    } catch (error) {
        return handleError(res, error, `${level} submission`);
    }
}


// --------------------------------------------------
// LEVEL 1: SCREENING SUBMISSION
// --------------------------------------------------

async function submitScreening(req, res) {
    const {
        synopsisUrl,
        introVideoUrl
    } = req.body || {};

    if (
        !isGoogleDriveUrl(synopsisUrl) ||
        !isYouTubeUrl(introVideoUrl)
    ) {
        return res.status(400).json({
            message: "Please provide a valid Google Drive synopsis link and YouTube introduction video link"
        });
    }

    return submitLevel(
        req,
        res,
        "screening",
        {
            synopsisUrl,
            introVideoUrl
        }
    );
}


// --------------------------------------------------
// LEVEL 2: FINAL SUBMISSION
// --------------------------------------------------

async function submitFinal(req, res) {
    const {
        githubRepoUrl,
        demoVideoUrl
    } = req.body || {};

    if (
        !isGithubRepoUrl(githubRepoUrl) ||
        !isYouTubeUrl(demoVideoUrl)
    ) {
        return res.status(400).json({
            message: "Please provide a valid GitHub repository link and YouTube demo video link"
        });
    }

    return submitLevel(
        req,
        res,
        "final",
        {
            githubRepoUrl,
            demoVideoUrl
        }
    );
}


// --------------------------------------------------
// ADMIN: FETCH ALL SUBMISSIONS OF A HACKATHON
// --------------------------------------------------

async function getHackathonSubmissions(req, res) {
    try {
        const { hackathonId } = req.params;
        const adminId = req.user.id;

        if (!isValidId(hackathonId)) {
            return res.status(400).json({
                message: "Invalid hackathon ID"
            });
        }

        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 20);
        const offset = (page - 1) * limit;

        if (
            !Number.isSafeInteger(page) ||
            !Number.isSafeInteger(limit) ||
            page < 1 ||
            limit < 1 ||
            limit > 100
        ) {
            return res.status(400).json({
                message: "Invalid pagination parameters"
            });
        }

        const { level, status } = req.query;

        if (
            level !== undefined &&
            !["screening", "final"].includes(level)
        ) {
            return res.status(400).json({
                message: "Invalid submission level"
            });
        }

        if (
            status !== undefined &&
            !["submitted", "graded"].includes(status)
        ) {
            return res.status(400).json({
                message: "Invalid submission status"
            });
        }

        // Verify hackathon ownership
        const ownershipResult = await pool.query(
            `SELECT id, name
             FROM hackathons
             WHERE id = $1
               AND created_by_admin_id = $2`,
            [
                hackathonId,
                adminId
            ]
        );

        if (ownershipResult.rows.length === 0) {
            return res.status(404).json({
                message: "Hackathon not found or you do not own this hackathon"
            });
        }

        // Count matching submissions
        const countResult = await pool.query(
            `SELECT COUNT(*)::int AS total

             FROM hackathon_submissions s

             WHERE s.hackathon_id = $1
               AND ($2::text IS NULL OR s.level = $2)
               AND ($3::text IS NULL OR s.submission_status = $3)`,
            [
                hackathonId,
                level || null,
                status || null
            ]
        );

        const total = countResult.rows[0].total;

        // Fetch submissions and participant information
        const result = await pool.query(
            `SELECT
                s.id AS "submissionId",
                s.level,
                s.submission_status AS "submissionStatus",

                s.synopsis_url AS "synopsisUrl",
                s.intro_video_url AS "introVideoUrl",

                s.github_repo_url AS "githubRepoUrl",
                s.demo_video_url AS "demoVideoUrl",

                s.score,
                s.feedback,
                s.decision,

                s.submitted_at AS "submittedAt",
                s.graded_at AS "gradedAt",

                e.id AS "entryId",
                e.entry_type AS "entryType",
                e.display_name AS "displayName",

                member_data.members,

                grader.name AS "gradedByAdmin"

             FROM hackathon_submissions s

             JOIN hackathon_entries e
                ON e.id = s.entry_id
                AND e.hackathon_id = s.hackathon_id

             LEFT JOIN users grader
                ON grader.id = s.graded_by_admin_id

             LEFT JOIN LATERAL (
                SELECT COALESCE(
                    json_agg(
                        json_build_object(
                            'id', u.id,
                            'name', u.name,
                            'email', u.email,
                            'memberRole', em.member_role
                        )
                        ORDER BY em.joined_at
                    ),
                    '[]'::json
                ) AS members

                FROM hackathon_entry_members em

                JOIN users u
                    ON u.id = em.candidate_id

                WHERE em.entry_id = e.id
                  AND em.hackathon_id = e.hackathon_id
             ) member_data ON TRUE

             WHERE s.hackathon_id = $1
               AND ($2::text IS NULL OR s.level = $2)
               AND ($3::text IS NULL OR s.submission_status = $3)

             ORDER BY s.submitted_at DESC, s.id DESC

             LIMIT $4 OFFSET $5`,
            [
                hackathonId,
                level || null,
                status || null,
                limit,
                offset
            ]
        );

        return res.status(200).json({
            message: "Hackathon submissions fetched successfully",

            hackathon: ownershipResult.rows[0],

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },

            submissions: result.rows
        });

    } catch (error) {
        console.error("Fetch hackathon submissions error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// --------------------------------------------------
// ADMIN: GRADE A SUBMISSION
// --------------------------------------------------

async function gradeSubmission(req, res) {
    try {
        const {
            hackathonId,
            submissionId
        } = req.params;

        const adminId = req.user.id;

        const {
            score,
            decision,
            feedback = null
        } = req.body || {};

        if (
            !isValidId(hackathonId) ||
            !isValidId(submissionId)
        ) {
            return res.status(400).json({
                message: "Invalid hackathon or submission ID"
            });
        }

        if (
            typeof score !== "number" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            return res.status(400).json({
                message: "Score must be a number between 0 and 100"
            });
        }

        if (
            feedback !== null &&
            (
                typeof feedback !== "string" ||
                feedback.length > 5000
            )
        ) {
            return res.status(400).json({
                message: "Feedback must be a string of at most 5000 characters"
            });
        }

        // Screening requires an explicit pass/reject decision
        if (
            decision !== undefined &&
            !["passed", "rejected"].includes(decision)
        ) {
            return res.status(400).json({
                message: "Decision must be passed or rejected"
            });
        }

        const gradedSubmission = await runTransaction(async (client) => {

            // Verify ownership and lock the submission
            const submissionResult = await client.query(
                `SELECT
                    s.id,
                    s.entry_id,
                    s.level,
                    s.submission_status

                 FROM hackathon_submissions s

                 JOIN hackathons h
                    ON h.id = s.hackathon_id

                 WHERE s.id = $1
                   AND s.hackathon_id = $2
                   AND h.created_by_admin_id = $3

                 FOR UPDATE OF s`,
                [
                    submissionId,
                    hackathonId,
                    adminId
                ]
            );

            if (submissionResult.rows.length === 0) {
                throw new ApiError(
                    404,
                    "Submission not found or you do not own this hackathon"
                );
            }

            const submission = submissionResult.rows[0];

            if (submission.submission_status !== "submitted") {
                throw new ApiError(
                    409,
                    "This submission has already been graded"
                );
            }

            let finalDecision = "passed";

            if (submission.level === "screening") {

                if (!["passed", "rejected"].includes(decision)) {
                    throw new ApiError(
                        400,
                        "You must specify whether the candidate passed or failed screening"
                    );
                }

                finalDecision = decision;
            }

            // Update submission grade
            const updateResult = await client.query(
                `UPDATE hackathon_submissions

                 SET
                    submission_status = 'graded',
                    score = $1,
                    feedback = $2,
                    decision = $3,
                    graded_by_admin_id = $4,
                    graded_at = NOW(),
                    updated_at = NOW()

                 WHERE id = $5
                   AND hackathon_id = $6

                 RETURNING
                    id AS "submissionId",
                    entry_id AS "entryId",
                    level,
                    submission_status AS "submissionStatus",
                    score,
                    feedback,
                    decision,
                    graded_at AS "gradedAt"`,
                [
                    score,
                    feedback,
                    finalDecision,
                    adminId,
                    submissionId,
                    hackathonId
                ]
            );

            // Rebuild the leaderboard after a final grade
            if (submission.level === "final") {
                // Serialize leaderboard recalculations for this hackathon
                await client.query(
                    `SELECT id
                    FROM hackathons
                    WHERE id = $1
                    FOR UPDATE`,
                    [hackathonId]
                );
                // Remove old rankings for this hackathon
                await client.query(
                    `DELETE FROM hackathon_leaderboard
                     WHERE hackathon_id = $1`,
                    [hackathonId]
                );

                // Insert updated rankings
                await client.query(
                    `INSERT INTO hackathon_leaderboard (
                        hackathon_id,
                        entry_id,
                        rank,
                        total_score
                    )

                    SELECT
                        $1,
                        ranked.entry_id,
                        ranked.rank::integer,
                        ranked.score

                    FROM (
                        SELECT
                            s.entry_id,
                            s.score,

                            RANK() OVER (
                                ORDER BY s.score DESC
                            ) AS rank

                        FROM hackathon_submissions s

                        WHERE s.hackathon_id = $1
                          AND s.level = 'final'
                          AND s.submission_status = 'graded'
                    ) ranked`,
                    [hackathonId]
                );
            }

            return updateResult.rows[0];
        });

        return res.status(200).json({
            message: "Submission graded successfully",

            submission: gradedSubmission,

            leaderboardUpdated:
                gradedSubmission.level === "final"
        });

    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.status).json({
                message: error.message
            });
        }

        console.error("Grade submission error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// --------------------------------------------------
// LEADERBOARD: FETCH RANKINGS
// --------------------------------------------------

async function getLeaderboard(req, res) {
    try {
        const { hackathonId } = req.params;

        if (!isValidId(hackathonId)) {
            return res.status(400).json({
                message: "Invalid hackathon ID"
            });
        }

        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 50);
        const offset = (page - 1) * limit;

        if (
            !Number.isSafeInteger(page) ||
            !Number.isSafeInteger(limit) ||
            page < 1 ||
            limit < 1 ||
            limit > 100
        ) {
            return res.status(400).json({
                message: "Invalid pagination parameters"
            });
        }

        // Verify hackathon exists
        const hackathonResult = await pool.query(
            `SELECT id, name, starts_at, ends_at
             FROM hackathons
             WHERE id = $1`,
            [hackathonId]
        );

        if (hackathonResult.rows.length === 0) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        // Count leaderboard entries
        const countResult = await pool.query(
            `SELECT COUNT(*)::int AS total
             FROM hackathon_leaderboard
             WHERE hackathon_id = $1`,
            [hackathonId]
        );

        const total = countResult.rows[0].total;

        // Fetch rankings
        const result = await pool.query(
            `SELECT
                l.rank,
                l.entry_id AS "entryId",
                l.total_score AS "totalScore",

                e.entry_type AS "entryType",
                e.display_name AS "displayName"

             FROM hackathon_leaderboard l

             JOIN hackathon_entries e
                ON e.id = l.entry_id
                AND e.hackathon_id = l.hackathon_id

             WHERE l.hackathon_id = $1

             ORDER BY l.rank ASC, e.id ASC

             LIMIT $2 OFFSET $3`,
            [
                hackathonId,
                limit,
                offset
            ]
        );

        return res.status(200).json({
            message: "Leaderboard fetched successfully",

            hackathon: {
                id: hackathonResult.rows[0].id,
                name: hackathonResult.rows[0].name
            },

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },

            leaderboard: result.rows
        });

    } catch (error) {
        console.error("Fetch leaderboard error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export {
    submitScreening,
    submitFinal,
    getHackathonSubmissions,
    gradeSubmission,
    getLeaderboard
};
