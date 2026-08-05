import { verifyToken } from "../utils/jwt.js";
export function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }
        const decoded = verifyToken(token);
        if (typeof decoded === "string") {
            return res.status(401).json({
                message: "Invalid token",
            });
        }
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map