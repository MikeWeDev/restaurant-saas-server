import { Router } from "express";
import {
  getPublicCategories,
  getPublicMenuItems,
  getPublicMenuItemIngredients,
  getPublicMenuItem
} from "./public-menu.controller.js";


const router: Router = Router();


router.get(
  "/restaurants/:restaurantId/categories",
  getPublicCategories
);

router.get(
  "/categories/:categoryId/menu-items",
  getPublicMenuItems
);

router.get(
  "/menu-items/:menuItemId/ingredients",
  getPublicMenuItemIngredients
);

router.get(
  "/items/:menuItemId",
  getPublicMenuItem
);

export default router;