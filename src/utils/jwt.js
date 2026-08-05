import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
export function generateToken(payload) {
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
    const options = {
        expiresIn: expiresIn,
    };
    return jwt.sign(payload, jwtSecret, options);
}
export function verifyToken(token) {
    return jwt.verify(token, jwtSecret);
}
//# sourceMappingURL=jwt.js.map