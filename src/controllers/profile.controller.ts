import { Request, Response, NextFunction } from "express";
import { updateProfile, getProfile } from "../services/profile.service";
import { sendSuccess } from "../utils/apiResponse";
import AppError from "../utils/AppError";
import { AuthRequest } from "../middleware/auth.middleware";


export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      pincode,
      city,
      state,
    } = req.body;

    if (!firstName) {
      throw new AppError("First name is required", 400);
    }

    if (!dateOfBirth) {
      throw new AppError("Date of birth is required", 400);
    }

    if (!gender) {
      throw new AppError("Gender is required", 400);
    }

    const user = await updateProfile(authReq.userId, {
      firstName,
      lastName,
      email,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      pincode,
      city,
      state,
    });

    return sendSuccess(
      res,
      "Profile updated successfully",
      {
        userId: user._id,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        pincode: user.pincode,
        city: user.city,
        state: user.state,
        isProfileCompleted: user.onboardingCompleted,
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await getProfile(authReq.userId);

    return sendSuccess(
      res,
      "Profile retrieved successfully",
      {
        userId: user._id,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        pincode: user.pincode,
        city: user.city,
        state: user.state,
        isProfileCompleted: user.onboardingCompleted,
      }
    );
  } catch (error) {
    next(error);
  }
};