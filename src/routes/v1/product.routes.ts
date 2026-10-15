import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
} from "../../controllers/product.controller";

const router = Router();

router.get(
  "/",
  getProductsController
);

router.get(
  "/:productId",
  getProductByIdController
);

export default router;