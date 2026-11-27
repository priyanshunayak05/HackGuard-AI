
import pool from '../config/db.js'

// Create a new hackathon
async function createHackathon(req, res) {
    try {
        const {
            name,
            description,
            readme,
            startsAt,
            endsAt
        } = req.body || {};

        // Validate name
        if (
            typeof name !== "string" ||
            !name.trim() ||
            name.trim().length > 200
        ) {
            return res.status(400).json({
                message: "Valid hackathon name is required (maximum 200 characters)"
            });
        }

        // Validate optional text fields
        if (
            (description != null && typeof description !== "string") ||
            (readme != null && typeof readme !== "string")
        ) {
            return res.status(400).json({
                message: "Description and README must be strings"
            });
        }

        // Validate dates
        if (
            typeof startsAt !== "string" ||
            typeof endsAt !== "string" ||
            !startsAt.trim() ||
            !endsAt.trim()
        ) {
            return res.status(400).json({
                message: "Start date and end date are required"
            });
        }

        const startDate = new Date(startsAt);
        const endDate = new Date(endsAt);

        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime())
        ) {
            return res.status(400).json({
                message: "Invalid date format"
            });
        }

        if (endDate <= startDate) {
            return res.status(400).json({
                message: "End date must be after start date"
            });
        }

        // Get authenticated admin ID from JWT
        const adminId = req.user.id;

        // Insert hackathon
        const result = await pool.query(
            `INSERT INTO hackathons (
                created_by_admin_id,
                name,
                status,
                description,
                readme,
                starts_at,
                ends_at
            )
            VALUES (
                $1,
                $2,
                CASE
                    WHEN $5::timestamptz > NOW() THEN 'future'
                    WHEN $6::timestamptz >= NOW() THEN 'ongoing'
                    ELSE 'completed'
                END,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING
                id,
                created_by_admin_id AS "createdByAdminId",
                name,
                status,
                description,
                readme,
                starts_at AS "startsAt",
                ends_at AS "endsAt",
                created_at AS "createdAt",
                updated_at AS "updatedAt"`,
                [
                    adminId,
                    name.trim(),
                    description ?? null,
                    readme ?? null,
                    startsAt,
                    endsAt
                ]
        );

        return res.status(201).json({
            message: "Hackathon created successfully",
            hackathon: result.rows[0]
        });

    } catch (error) {
        console.error("Create hackathon error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


// Fetch all hackathons
async function getAllHackathons(req, res) {
    try {
        const { status } = req.query;

        // Validate optional status filter
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

        // Pagination
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 20);

        if (
            !Number.isSafeInteger(page) ||
            !Number.isSafeInteger(limit) ||
            page < 1 ||
            limit < 1 ||
            limit > 100
        ) {
            return res.status(400).json({
                message: "Page must be positive and limit must be between 1 and 100"
            });
        }

        const offset = (page - 1) * limit;

        // Calculate current status dynamically from dates
        const currentStatus = `
            CASE
                WHEN h.starts_at > NOW() THEN 'future'
                WHEN h.ends_at >= NOW() THEN 'ongoing'
                ELSE 'completed'
            END
        `;

        // Get total count
        const countResult = await pool.query(
            `SELECT COUNT(*)::int AS total
             FROM hackathons h
             WHERE ($1::text IS NULL OR ${currentStatus} = $1)`,
            [status || null]
        );

        const total = countResult.rows[0].total;

        // Fetch hackathons
        const result = await pool.query(
            `SELECT
                h.id,
                h.name,
                ${currentStatus} AS status,
                h.description,
                h.readme,
                h.starts_at AS "startsAt",
                h.ends_at AS "endsAt",
                h.created_at AS "createdAt",
                u.name AS "createdByAdminName"

             FROM hackathons h

             JOIN users u
                ON h.created_by_admin_id = u.id

             WHERE ($1::text IS NULL OR ${currentStatus} = $1)

             ORDER BY
                CASE ${currentStatus}
                    WHEN 'future' THEN 1
                    WHEN 'ongoing' THEN 2
                    ELSE 3
                END,

                CASE
                    WHEN ${currentStatus} = 'completed'
                    THEN h.starts_at
                END DESC,

                CASE
                    WHEN ${currentStatus} <> 'completed'
                    THEN h.starts_at
                END ASC

             LIMIT $2 OFFSET $3`,
            [
                status || null,
                limit,
                offset
            ]
        );

        return res.status(200).json({
            message: "Hackathons fetched successfully",

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },

            hackathons: result.rows
        });

    } catch (error) {
        console.error("Fetch hackathons error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function getMyHackathons(req, res) {
    try {
        const adminId = req.user.id;

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

        // Count hackathons created by this admin
        const countResult = await pool.query(
            `SELECT COUNT(*)::int AS total
             FROM hackathons h
             WHERE h.created_by_admin_id = $1
               AND ($2::text IS NULL OR ${currentStatus} = $2)`,
            [
                adminId,
                status || null
            ]
        );

        const total = countResult.rows[0].total;

        // Fetch hackathons with registration counts
        const result = await pool.query(
            `SELECT
                h.id,
                h.name,
                ${currentStatus} AS status,
                h.description,
                h.readme,
                h.starts_at AS "startsAt",
                h.ends_at AS "endsAt",
                h.created_at AS "createdAt",

                COALESCE(
                    entry_stats.total_entries,
                    0
                ) AS "totalEntries"

             FROM hackathons h

             LEFT JOIN (
                SELECT
                    hackathon_id,
                    COUNT(*)::int AS total_entries
                FROM hackathon_entries
                GROUP BY hackathon_id
             ) entry_stats
                ON entry_stats.hackathon_id = h.id

             WHERE h.created_by_admin_id = $1
               AND ($2::text IS NULL OR ${currentStatus} = $2)

             ORDER BY h.created_at DESC

             LIMIT $3 OFFSET $4`,
            [
                adminId,
                status || null,
                limit,
                offset
            ]
        );

        return res.status(200).json({
            message: "Your hackathons fetched successfully",

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },

            hackathons: result.rows
        });

    } catch (error) {
        console.error("Fetch admin hackathons error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export {
    createHackathon,
    getAllHackathons,
    getMyHackathons
};
