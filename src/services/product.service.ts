import Product from "../models/Product";
import AppError from "../utils/AppError";
import mongoose from "mongoose";

export const getProducts = async () => {
  const products = await Product.find({
    isActive: true,
  })
    .populate("categoryId", "_id name slug image")
    .sort({ createdAt: -1 });

  return products;
};

export const getProductById = async (
  productId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(
      "Invalid product ID",
      400
    );
  }

  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  }).populate(
    "categoryId",
    "_id name slug image"
  );

  if (!product) {
    throw new AppError(
      "Product not found",
      404
    );
  }

  return product;
};