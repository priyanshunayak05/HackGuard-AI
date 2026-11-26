import pool from '../config/db.js'
import { HashPassword, VerifyPassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';


// Convert database user into a safe public response
function publicUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        role: user.role,
        createdAt: user.created_at
    };
}

// Common signup handler
function createSignupHandler(role) {
    return async (req, res) => {
        try {
            const {
                name,
                email,
                phone,
                password
            } = req.body || {};

            // Validate required fields
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

            if (
                !cleanName ||
                cleanName.length > 120 ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
                cleanEmail.length > 255 ||
                cleanPhone.length > 30 ||
                cleanPhone.replace(/\D/g, "").length < 7
            ) {
                return res.status(400).json({
                    message: "Please provide valid name, email and phone"
                });
            }

            if (password.length < 8 || password.length > 128) {
                return res.status(400).json({
                    message: "Password must be between 8 and 128 characters"
                });
            }

            // Hash password
            const passwordHash = await HashPassword(password);

            // Insert user into PostgreSQL
            const result = await pool.query(
                `INSERT INTO users
                    (name, email, phone_number, password_hash, role)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, name, email, phone_number, role, created_at`,
                [
                    cleanName,
                    cleanEmail,
                    cleanPhone,
                    passwordHash,
                    role
                ]
            );

            const user = result.rows[0];

            // Generate JWT
            const token = generateToken(user);

            return res.status(201).json({
                message: `${role} registered successfully`,
                token,
                tokenType: "Bearer",
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
                user: publicUser(user)
            });

        } catch (error) {
            // Duplicate email
            if (error.code === "23505") {
                return res.status(409).json({
                    message: "An account with this email already exists"
                });
            }

            console.error("Signup error:", error);

            return res.status(500).json({
                message: "Internal server error"
            });
        }
    };
}

// Candidate signup
const signupCandidate = createSignupHandler("candidate");

// Admin signup
const signupAdmin = createSignupHandler("admin");



// Common login for candidates and admins
async function login(req, res) {
    try {
        const { email, password } = req.body || {};

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            password.length === 0
        ) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Find user
        const result = await pool.query(
            `SELECT *
             FROM users
             WHERE email = $1`,
            [cleanEmail]
        );

        const user = result.rows[0];

        // Generic error prevents revealing whether an email exists
        if (!user || !user.password_hash) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Verify password
        const isPasswordValid = await VerifyPassword(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
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

// Get authenticated user's profile
async function getMe(req, res) {
    try {
        const result = await pool.query(
            `SELECT id, name, email, phone_number, role, created_at
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
    signupAdmin,
    login,
    getMe
}