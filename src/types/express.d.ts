import "express";
import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Role;
      };
      file?: {
        filename: string;
        [key: string]: any;
      };
    }
  }
}

export {};