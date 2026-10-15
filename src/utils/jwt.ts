import jwt from "jsonwebtoken";
import env from "../config/env";

export interface JwtPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign(
    {
      userId,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    }
  );
};