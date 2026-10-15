import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError("Route not found", 404));
};

export default notFoundMiddleware;