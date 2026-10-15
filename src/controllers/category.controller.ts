import { Request, Response, NextFunction } from "express";
import { getCategories } from "../services/category.service";
import { sendSuccess } from "../utils/apiResponse";

export const getCategoriesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getCategories();

    return sendSuccess(
      res,
      "Categories retrieved successfully",
      categories
    );
  } catch (error) {
    next(error);
  }
};