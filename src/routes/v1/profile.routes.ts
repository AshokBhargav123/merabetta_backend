import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { updateProfileController, getProfileController } from "../../controllers/profile.controller";

const router = Router();

router.put(
  "/",
  authMiddleware,
  updateProfileController
);

router.get(
  "/",
  authMiddleware,
  getProfileController
);

export default router;