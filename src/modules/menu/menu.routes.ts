import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from "./menu.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";

const router: Router = Router();

router.post(
  "/categories",
  authenticate,
  authorize(Role.ADMIN),
  createCategory
);

router.get(
  "/categories",
  authenticate,
  authorize(Role.ADMIN),
  getCategories
);

router.patch(
  "/categories/:id",
  authenticate,
  authorize(Role.ADMIN),
  updateCategory
);

router.delete(
  "/categories/:id",
  authenticate,
  authorize(Role.ADMIN),
  deleteCategory
);

export default router;