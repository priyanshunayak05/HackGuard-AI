
import pool from "../config/db.js";
import { HashPassword, VerifyPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

function publicUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        institution: user.institution,
        role: user.role,
        createdAt: user.created_at
    };
}

async function registerUser(req, res, role) {
    try {
        const {
            name,
            email,
            phone,
            password,
            institution
        } = req.body || {};

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof phone !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Name, email, phone and password are required"
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.trim();
        const cleanInstitution =
            typeof institution === "string"
                ? institution.trim()
                : null;

        if (
            !cleanName ||
            cleanName.length > 120 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
            cleanEmail.length > 255 ||
            cleanPhone.length > 30 ||
            cleanPhone.replace(/\D/g, "").length < 7 ||
            (cleanInstitution && cleanInstitution.length > 200)
        ) {
            return res.status(400).json({
                message: "Please provide valid registration details"
            });
        }

        if (password.length < 8 || password.length > 128) {
            return res.status(400).json({
                message: "Password must be between 8 and 128 characters"
            });
        }

        const passwordHash = await HashPassword(password);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, phone_number, institution, password_hash, role)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, name, email, phone_number,
                       institution, role, created_at`,
            [
                cleanName,
                cleanEmail,
                cleanPhone,
                cleanInstitution || null,
                passwordHash,
                role
            ]
        );

        const user = result.rows[0];
        const token = generateToken(user);

        return res.status(201).json({
            message: `${role} account created successfully`,
            token,
            tokenType: "Bearer",
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            user: publicUser(user)
        });

    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Public registration: candidates only
async function signupCandidate(req, res) {
    return registerUser(req, res, "candidate");
}

// Protected registration: admins can create admin/judge accounts
async function createStaffAccount(req, res) {
    const { role } = req.body || {};

    if (!["admin", "judge"].includes(role)) {
        return res.status(400).json({
            message: "Staff role must be admin or judge"
        });
    }

    return registerUser(req, res, role);
}

// Login supports all three roles
async function login(req, res) {
    try {
        const { email, password } = req.body || {};

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        const result = await pool.query(
            `SELECT id, name, email, phone_number,
                    institution, password_hash, role, created_at
             FROM users
             WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        const user = result.rows[0];

        if (!user || !user.password_hash) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const validPassword = await VerifyPassword(
            password,
            user.password_hash
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            tokenType: "Bearer",
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            user: publicUser(user)
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function getMe(req, res) {
    try {
        const result = await pool.query(
            `SELECT id, name, email, phone_number,
                    institution, role, created_at
             FROM users
             WHERE id = $1`,
            [req.user.id]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                message: "User account no longer exists"
            });
        }

        return res.status(200).json({
            user: publicUser(user)
        });

    } catch (error) {
        console.error("Get profile error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export {
    signupCandidate,
    createStaffAccount,
    login,
    getMe
};
