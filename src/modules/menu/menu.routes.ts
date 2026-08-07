import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateMenuItemAvailability,
  getMenuItems,
  uploadMenuItemImage,
  assignIngredientToMenuItem
} from "./menu.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";
import multer from "multer";

const upload = multer({ dest: "uploads/menu-items/" });

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


router.post(
  "/menu-items",
  authenticate,
  authorize(Role.ADMIN),
  createMenuItem
);

router.patch(
  "/menu-items/:id",
  authenticate,
  authorize(Role.ADMIN),
  updateMenuItem
);

router.delete(
  "/menu-items/:id",
  authenticate,
  authorize(Role.ADMIN),
  deleteMenuItem
);

router.get(
  "/menu-items",
  authenticate,
  authorize(Role.ADMIN),
  getMenuItems
);

router.patch(
  "/menu-items/:id/availability",
  authenticate,
  authorize(Role.ADMIN),
  updateMenuItemAvailability
);

router.patch(
 "/menu-items/:id/image",
 authenticate,
 authorize(Role.ADMIN),
  upload.single("image"),
  uploadMenuItemImage
);

router.post(
  "/menu-items/:menuItemId/ingredients",
  authenticate,
  authorize(Role.ADMIN),
  assignIngredientToMenuItem
);
export default router;