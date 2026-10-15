import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGO_URI || "",

  jwtSecret: process.env.JWT_SECRET || "",
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is not configured");
}

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is not configured");
}

export default env;