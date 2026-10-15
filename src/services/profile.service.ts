import User from "../models/User";
import AppError from "../utils/AppError";

interface UpdateProfileData {
  firstName: string;
  lastName?: string;
  email?: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Others";
  pincode?: string;
  city?: string;
  state?: string;
}

export const updateProfile = async (
  userId: string,
  data: UpdateProfileData
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.dateOfBirth = data.dateOfBirth;
  user.gender = data.gender;
  user.pincode = data.pincode;
  user.city = data.city;
  user.state = data.state;

  user.onboardingCompleted = true;

  await user.save();

  return user;
};

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select(
    "-otp -otpExpiry"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};