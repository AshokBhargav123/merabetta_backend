import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import AppError from "../utils/AppError";

export interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        "Authorization token is required",
        401
      );
    }

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      throw new AppError(
        "Invalid authorization format",
        401
      );
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      env.jwtSecret
    ) as { userId: string };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(
      new AppError(
        "Invalid or expired token",
        401
      )
    );
  }
};

export default authMiddleware;