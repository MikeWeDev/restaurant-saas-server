export interface AuthPayload {
    userId: string;
    role: string;
}
export declare function generateToken(payload: AuthPayload): string;
export declare function verifyToken(token: string): AuthPayload;
//# sourceMappingURL=jwt.d.ts.map