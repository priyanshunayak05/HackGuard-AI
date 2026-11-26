import jwt from 'jsonwebtoken'

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
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ["HS256"]
            }
        );

        if (
            typeof decoded !== "object" ||
            typeof decoded.sub !== "string" ||
            !["candidate", "admin"].includes(decoded.role)
        ) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        // Attach authenticated user to request
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

export default requireAuth
