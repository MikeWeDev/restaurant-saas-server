import { Router } from "express";
import { getOrCreateCart,addCartItem,updateCartItem} from "./cart.controller.js";

const router = Router();

router.get(
  "/table/:qrCode",
  getOrCreateCart
);

router.post(
  "/table/:qrCode/items",
  addCartItem
);
router.patch(
  "/table/:qrCode/items/:cartItemId",
  updateCartItem
)

export default router;