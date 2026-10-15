import { Router } from "express";
import authRoutes from "./auth.routes";
import profileRoutes from "./profile.routes";
import categoryRoutes from "./category.routes";
import wishlistRoutes from "./wishlist.routes";
import productRoutes from "./product.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Merabetta API v1 is healthy",
  });
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/categories", categoryRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/products", productRoutes);

export default router;