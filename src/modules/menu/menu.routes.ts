import {Router} from "express"
import { createCategory } from "./menu.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { Role } from "@prisma/client";


const router = Router();

router.post(
  "/categories",
  authenticate,
  authorize(Role.ADMIN),
  createCategory
);

export default router;