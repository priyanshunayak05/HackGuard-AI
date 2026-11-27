
import jwt from "jsonwebtoken";

function generateToken(user) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        {
            role: user.role
        },
        secret,
        {
            subject: String(user.id),
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            algorithm: "HS256"
        }
    );
}

export { generateToken };
