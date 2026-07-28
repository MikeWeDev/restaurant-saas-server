import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const jwtSecret: Secret = process.env.JWT_SECRET!;

export interface AuthPayload {
  userId: string;
  role: string;
}

export function generateToken(payload: AuthPayload): string {
  const expiresIn =
    process.env.JWT_EXPIRES_IN ?? "7d";

  const options: SignOptions = {
    expiresIn: expiresIn as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(
    payload,
    jwtSecret,
    options
  );
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(
    token,
    jwtSecret
  ) as AuthPayload;
}