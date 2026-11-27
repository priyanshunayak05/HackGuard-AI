
import jwt from "jsonwebtoken";

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization token is required"
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        const decoded = jwt.verify(
            token,
            secret,
            {
                algorithms: ["HS256"]
            }
        );

        const validRoles = [
            "admin",
            "candidate",
            "judge"
        ];

        if (
            typeof decoded !== "object" ||
            typeof decoded.sub !== "string" ||
            !validRoles.includes(decoded.role)
        ) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

export default requireAuth;
