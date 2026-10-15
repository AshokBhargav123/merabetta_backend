import Wishlist from "../models/Wishlist";
import AppError from "../utils/AppError";

export const addToWishlist = async (
  userId: string,
  productId: string
) => {
  const existingItem = await Wishlist.findOne({
    userId,
    productId,
  });

  if (existingItem) {
    throw new AppError(
      "Product is already in wishlist",
      409
    );
  }

  const wishlistItem = await Wishlist.create({
    userId,
    productId,
  });

  return wishlistItem;
};

export const removeFromWishlist = async (
  userId: string,
  productId: string
) => {
  const wishlistItem = await Wishlist.findOneAndDelete({
    userId,
    productId,
  });

  if (!wishlistItem) {
    throw new AppError(
      "Product not found in wishlist",
      404
    );
  }

  return wishlistItem;
};

export const getWishlist = async (
  userId: string
) => {
  const wishlist = await Wishlist.find({
    userId,
  })
    .sort({ createdAt: -1 })
    .populate(
      "productId"
    );

  return wishlist;
};