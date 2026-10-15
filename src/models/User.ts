import { Schema, model, Document } from "mongoose";

export type Gender = "Male" | "Female" | "Others";

export interface IUser extends Document {
  mobile: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;

  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  pincode?: string;
  city?: string;
  state?: string;

  onboardingCompleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },

    pincode: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;