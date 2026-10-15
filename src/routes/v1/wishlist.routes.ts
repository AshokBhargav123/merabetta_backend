import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import {
  addToWishlistController,
  removeFromWishlistController,
  getWishlistController,
} from "../../controllers/wishlist.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  getWishlistController
);

router.post(
  "/",
  authMiddleware,
  addToWishlistController
);

router.delete(
  "/:productId",
  authMiddleware,
  removeFromWishlistController
);

export default router;