import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
export declare function authorize(...allowedRoles: Role[]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.middleware.d.ts.map