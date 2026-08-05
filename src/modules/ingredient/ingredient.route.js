import { Router } from "express";
import { createIngredient, getIngredients, updateIngredient, deleteIngredient } from "./ingredient.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";
const router = Router();
router.post("/ingredients", authenticate, authorize(Role.ADMIN), createIngredient);
router.get("/ingredients", authenticate, authorize(Role.ADMIN), getIngredients);
router.patch("/ingredients/:id", authenticate, authorize(Role.ADMIN), updateIngredient);
router.delete("/ingredients/:id", authenticate, authorize(Role.ADMIN), deleteIngredient);
export default router;
//# sourceMappingURL=ingredient.route.js.map