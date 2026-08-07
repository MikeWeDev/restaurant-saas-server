import { Router } from "express";
import { getOrCreateCart } from "./cart.controller.js";

const router = Router();

router.get(
  "/table/:qrCode",
  getOrCreateCart
);

export default router;