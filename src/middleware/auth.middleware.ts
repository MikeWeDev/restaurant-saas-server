import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { Role } from "@prisma/client";
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  role: decoded.role as Role,
};

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}