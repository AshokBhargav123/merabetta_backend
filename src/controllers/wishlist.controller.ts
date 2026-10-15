import { Request, Response, NextFunction } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/wishlist.service";
import { sendSuccess } from "../utils/apiResponse";
import AppError from "../utils/AppError";
import { AuthRequest } from "../middleware/auth.middleware";

export const addToWishlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const { productId } = req.body;

    if (!productId) {
      throw new AppError(
        "Product ID is required",
        400
      );
    }

    const wishlistItem = await addToWishlist(
      authReq.userId,
      productId
    );

    return sendSuccess(
      res,
      "Product added to wishlist",
      wishlistItem,
      201
    );
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.userId) {
      throw new AppError("Unauthorized", 401);
    }

    // const { productId } = req.params;

    const productId = req.params.productId;

if (Array.isArray(productId)) {
  throw new AppError(
    "Invalid product ID",
    400
  );
}

    if (!productId) {
      throw new AppError(
        "Product ID is required",
        400
      );
    }

    await removeFromWishlist(
      authReq.userId,
      productId
    );

    return sendSuccess(
      res,
      "Product removed from wishlist"
    );
  } catch (error) {
    next(error);
  }
};

export const getWishlistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const wishlist = await getWishlist(
      authReq.userId
    );

    return sendSuccess(
      res,
      "Wishlist retrieved successfully",
      wishlist
    );
  } catch (error) {
    next(error);
  }
};