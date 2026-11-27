import pool from '../config/db.js'
import { randomBytes, createHash } from "node:crypto";


// Custom error for expected API errors
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

// Validate PostgreSQL BIGINT IDs without converting them to JS numbers
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

// Transaction helper
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

// Check whether a hackathon accepts registrations
async function checkRegistrationOpen(client, hackathonId) {
    const result = await client.query(
        `SELECT
            id,
            name,
            ends_at,
            (ends_at > NOW()) AS registration_open
         FROM hackathons
         WHERE id = $1
         FOR SHARE`,
        [hackathonId]
    );

    if (result.rows.length === 0) {
        throw new ApiError(404, "Hackathon not found");
    }

    const hackathon = result.rows[0];

    if (!hackathon.registration_open) {
        throw new ApiError(
            409,
            "Registration for this hackathon is closed"
        );
    }

    return hackathon;
}

// Get candidate details from authenticated user
async function getCandidate(client, candidateId) {
    const result = await client.query(
        `SELECT id, name
         FROM users
         WHERE id = $1 AND role = 'candidate'`,
        [candidateId]
    );

    if (result.rows.length === 0) {
        throw new ApiError(404, "Candidate not found");
    }

    return result.rows[0];
}

// Convert expected and database errors into API responses
function handleError(res, error, operation) {
    if (error instanceof ApiError) {
        return res.status(error.status).json({
            message: error.message
        });
    }

    if (error.code === "23505") {
        return res.status(409).json({
            message: "You are already registered for this hackathon"
        });
    }

    console.error(`${operation} error:`, error);

    return res.status(500).json({
        message: "Internal server error"
    });
}


// --------------------------------------------------
// 1. INDIVIDUAL HACKATHON REGISTRATION
// --------------------------------------------------

async function registerIndividual(req, res) {
    try {
        const { hackathonId } = req.params;
        const candidateId = req.user.id;

        if (!isValidId(hackathonId)) {
            return res.status(400).json({
                message: "Invalid hackathon ID"
            });
        }

        const registration = await runTransaction(async (client) => {

            await checkRegistrationOpen(client, hackathonId);

            const candidate = await getCandidate(client, candidateId);

            // Create individual entry
            const entryResult = await client.query(
                `INSERT INTO hackathon_entries (
                    hackathon_id,
                    created_by_candidate_id,
                    entry_type,
                    display_name
                )
                VALUES ($1, $2, 'individual', $3)
                RETURNING id, hackathon_id, entry_type, display_name, created_at`,
                [
                    hackathonId,
                    candidateId,
                    candidate.name
                ]
            );

            const entry = entryResult.rows[0];

            // Add candidate as entry owner
            await client.query(
                `INSERT INTO hackathon_entry_members (
                    hackathon_id,
                    entry_id,
                    candidate_id,
                    member_role
                )
                VALUES ($1, $2, $3, 'owner')`,
                [
                    hackathonId,
                    entry.id,
                    candidateId
                ]
            );

            return entry;
        });

        return res.status(201).json({
            message: "Successfully registered for hackathon",
            registration
        });

    } catch (error) {
        return handleError(res, error, "Individual registration");
    }
}


// --------------------------------------------------
// 2. CREATE A TEAM
// --------------------------------------------------

async function createTeam(req, res) {
    try {
        const { hackathonId } = req.params;
        const candidateId = req.user.id;

        const { teamName } = req.body || {};

        if (!isValidId(hackathonId)) {
            return res.status(400).json({
                message: "Invalid hackathon ID"
            });
        }

        if (
            typeof teamName !== "string" ||
            !teamName.trim() ||
            teamName.trim().length > 150
        ) {
            return res.status(400).json({
                message: "Valid team name is required (maximum 150 characters)"
            });
        }

        // Generate a high-entropy invitation code
        const inviteCode = randomBytes(18).toString("base64url");

        // Store only the SHA-256 hash
        const inviteCodeHash = createHash("sha256")
            .update(inviteCode)
            .digest("hex");

        const team = await runTransaction(async (client) => {

            await checkRegistrationOpen(client, hackathonId);

            await getCandidate(client, candidateId);

            // Create team entry
            const entryResult = await client.query(
                `INSERT INTO hackathon_entries (
                    hackathon_id,
                    created_by_candidate_id,
                    entry_type,
                    display_name,
                    invite_code_hash
                )
                VALUES ($1, $2, 'team', $3, $4)
                RETURNING id, hackathon_id, entry_type, display_name, created_at`,
                [
                    hackathonId,
                    candidateId,
                    teamName.trim(),
                    inviteCodeHash
                ]
            );

            const entry = entryResult.rows[0];

            // Register creator as team owner
            await client.query(
                `INSERT INTO hackathon_entry_members (
                    hackathon_id,
                    entry_id,
                    candidate_id,
                    member_role
                )
                VALUES ($1, $2, $3, 'owner')`,
                [
                    hackathonId,
                    entry.id,
                    candidateId
                ]
            );

            return entry;
        });

        return res.status(201).json({
            message: "Team created successfully",
            team: {
                ...team,
                inviteCode
            },
            note: "Save this invitation code and share it with your teammates. It will not be displayed again."
        });

    } catch (error) {
        return handleError(res, error, "Team creation");
    }
}


// --------------------------------------------------
// 3. JOIN AN EXISTING TEAM
// --------------------------------------------------

async function joinTeam(req, res) {
    try {
        const {
            hackathonId,
            entryId
        } = req.params;

        const candidateId = req.user.id;

        const { inviteCode } = req.body || {};

        if (
            !isValidId(hackathonId) ||
            !isValidId(entryId)
        ) {
            return res.status(400).json({
                message: "Invalid hackathon or team ID"
            });
        }

        if (
            typeof inviteCode !== "string" ||
            inviteCode.length < 20 ||
            inviteCode.length > 100
        ) {
            return res.status(400).json({
                message: "Valid team invitation code is required"
            });
        }

        const inviteCodeHash = createHash("sha256")
            .update(inviteCode)
            .digest("hex");

        const registration = await runTransaction(async (client) => {

            await checkRegistrationOpen(client, hackathonId);

            await getCandidate(client, candidateId);

            // Find team and verify invitation code
            const teamResult = await client.query(
                `SELECT id, display_name, entry_type
                 FROM hackathon_entries
                 WHERE id = $1
                   AND hackathon_id = $2
                   AND entry_type = 'team'
                   AND invite_code_hash = $3
                 FOR UPDATE`,
                [
                    entryId,
                    hackathonId,
                    inviteCodeHash
                ]
            );

            if (teamResult.rows.length === 0) {
                throw new ApiError(
                    404,
                    "Team not found or invitation code is invalid"
                );
            }

            const team = teamResult.rows[0];

            // Add candidate to team
            await client.query(
                `INSERT INTO hackathon_entry_members (
                    hackathon_id,
                    entry_id,
                    candidate_id,
                    member_role
                )
                VALUES ($1, $2, $3, 'member')`,
                [
                    hackathonId,
                    entryId,
                    candidateId
                ]
            );

            return {
                entryId: team.id,
                hackathonId,
                teamName: team.display_name,
                memberRole: "member"
            };
        });

        return res.status(201).json({
            message: "Successfully joined the team",
            registration
        });

    } catch (error) {
        return handleError(res, error, "Team joining");
    }
}


// --------------------------------------------------
// 4. FETCH TEAMS IN A HACKATHON
// --------------------------------------------------

async function getTeams(req, res) {
    try {
        const { hackathonId } = req.params;

        if (!isValidId(hackathonId)) {
            return res.status(400).json({
                message: "Invalid hackathon ID"
            });
        }

        // Check if hackathon exists
        const hackathonResult = await pool.query(
            `SELECT id, name
             FROM hackathons
             WHERE id = $1`,
            [hackathonId]
        );

        if (hackathonResult.rows.length === 0) {
            return res.status(404).json({
                message: "Hackathon not found"
            });
        }

        // Fetch teams and their member counts
        const result = await pool.query(
            `SELECT
                e.id,
                e.display_name AS "teamName",
                COUNT(m.candidate_id)::int AS "memberCount",
                e.created_at AS "createdAt"

             FROM hackathon_entries e

             LEFT JOIN hackathon_entry_members m
                ON m.entry_id = e.id
                AND m.hackathon_id = e.hackathon_id

             WHERE e.hackathon_id = $1
               AND e.entry_type = 'team'

             GROUP BY e.id

             ORDER BY e.created_at ASC`,
            [hackathonId]
        );

        return res.status(200).json({
            message: "Teams fetched successfully",
            hackathon: hackathonResult.rows[0],
            teams: result.rows
        });

    } catch (error) {
        console.error("Fetch teams error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// --------------------------------------------------
// 5. FETCH HACKATHONS JOINED BY A CANDIDATE
// --------------------------------------------------

async function getMyRegistrations(req, res) {
    try {
        const candidateId = req.user.id;

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

        const { status } = req.query;

        const allowedStatuses = [
            "future",
            "ongoing",
            "completed"
        ];

        if (
            status !== undefined &&
            (
                typeof status !== "string" ||
                !allowedStatuses.includes(status)
            )
        ) {
            return res.status(400).json({
                message: "Invalid status filter",
                allowedStatuses
            });
        }

        const currentStatus = `
            CASE
                WHEN h.starts_at > NOW() THEN 'future'
                WHEN h.ends_at >= NOW() THEN 'ongoing'
                ELSE 'completed'
            END
        `;

        // Count registrations
        const countResult = await pool.query(
            `SELECT COUNT(*)::int AS total

             FROM hackathon_entry_members m

             JOIN hackathon_entries e
                ON e.id = m.entry_id
                AND e.hackathon_id = m.hackathon_id

             JOIN hackathons h
                ON h.id = m.hackathon_id

             WHERE m.candidate_id = $1
               AND ($2::text IS NULL OR ${currentStatus} = $2)`,
            [
                candidateId,
                status || null
            ]
        );

        const total = countResult.rows[0].total;

        // Fetch registered hackathons
        const result = await pool.query(
            `SELECT
                h.id AS "hackathonId",
                h.name AS "hackathonName",
                ${currentStatus} AS status,
                h.description,
                h.starts_at AS "startsAt",
                h.ends_at AS "endsAt",
                admin.name AS "createdByAdmin",

                e.id AS "entryId",
                e.entry_type AS "entryType",
                e.display_name AS "displayName",

                m.member_role AS "memberRole",
                m.joined_at AS "joinedAt"

             FROM hackathon_entry_members m

             JOIN hackathon_entries e
                ON e.id = m.entry_id
                AND e.hackathon_id = m.hackathon_id

             JOIN hackathons h
                ON h.id = m.hackathon_id

             JOIN users admin
                ON admin.id = h.created_by_admin_id

             WHERE m.candidate_id = $1
               AND ($2::text IS NULL OR ${currentStatus} = $2)

             ORDER BY m.joined_at DESC

             LIMIT $3 OFFSET $4`,
            [
                candidateId,
                status || null,
                limit,
                offset
            ]
        );

        return res.status(200).json({
            message: "Your hackathon registrations fetched successfully",

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },

            registrations: result.rows
        });

    } catch (error) {
        console.error("Fetch candidate registrations error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export {
    registerIndividual,
    createTeam,
    joinTeam,
    getTeams,
    getMyRegistrations
};
