import { Router } from "express";
import {
  createIngredient
} from "./ingredient.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";


const router: Router = Router();


router.post(
  "/ingredients",
  authenticate,
  authorize(Role.ADMIN),
  createIngredient
);


export default router;