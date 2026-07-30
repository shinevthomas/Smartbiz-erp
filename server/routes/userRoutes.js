import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// Get Profile
router.get("/profile/:id", getProfile);

// Update Profile
router.put("/profile/:id", updateProfile);

// Change Password
router.put("/change-password/:id", changePassword);

export default router;