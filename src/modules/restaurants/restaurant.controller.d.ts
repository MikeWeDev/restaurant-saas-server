import { Request, Response } from "express";
export declare function create(req: Request, res: Response): Promise<void>;
export declare function getMyRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllRestaurants(req: Request, res: Response): Promise<void>;
export declare function updateMyRestaurant(req: Request, res: Response): Promise<void>;
export declare function deleteMyRestaurant(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=restaurant.controller.d.ts.map