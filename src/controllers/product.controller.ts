import { Request, Response, NextFunction } from "express";
import { getProducts, getProductById } from "../services/product.service";
import { sendSuccess } from "../utils/apiResponse";

export const getProductsController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getProducts();

    return sendSuccess(
      res,
      "Products retrieved successfully",
      products
    );
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    if (!productId || Array.isArray(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await getProductById(productId);

    return sendSuccess(
      res,
      "Product retrieved successfully",
      product
    );
  } catch (error) {
    next(error);
  }
};