import { Request, Response, NextFunction } from "express";
import { sendOtp } from "../services/auth.service";
import { sendSuccess } from "../utils/apiResponse";
import AppError from "../utils/AppError";
import { verifyOtp } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export const sendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      throw new AppError(
        "Mobile number is required",
        400
      );
    }

    await sendOtp(mobile);

    return sendSuccess(
      res,
      "OTP sent successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile) {
      throw new AppError(
        "Mobile number is required",
        400
      );
    }

    if (!otp) {
      throw new AppError(
        "OTP is required",
        400
      );
    }

    const user = await verifyOtp(mobile, otp);

    const token = generateToken(user._id.toString());

    return sendSuccess(
      res,
      "OTP verified successfully",
      {
        token,
        userId: user._id,
        isProfileCompleted: user.onboardingCompleted,
      }
    );
  } catch (error) {
    next(error);
  }
};