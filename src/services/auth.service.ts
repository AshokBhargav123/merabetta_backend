import User from "../models/User";
import AppError from "../utils/AppError";

export const sendOtp = async (mobile: string) => {
  const otp = Math.floor(
    1000 + Math.random() * 9000
  ).toString();

  const otpExpiry = new Date(
    Date.now() + 5 * 60 * 1000
  );

  let user = await User.findOne({ mobile });

  if (!user) {
    user = await User.create({
      mobile,
      otp,
      otpExpiry,
      isVerified: false,
    });
  } else {
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
  }

  // Development only.
  // Later this will be replaced with an SMS provider.
  console.log(`OTP for ${mobile}: ${otp}`);

  return user;
};

export const verifyOtp = async (
  mobile: string,
  otp: string
) => {
  const user = await User.findOne({ mobile });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.otp || user.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    throw new AppError("OTP has expired", 400);
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  return user;
};