import { Router } from "express";
import {
  getPublicCategories
} from "./public-menu.controller.js";


const router: Router = Router();


router.get(
  "/restaurants/:restaurantId/categories",
  getPublicCategories
);


export default router;