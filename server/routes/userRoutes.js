import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// GET user profile
router.get("/:id", getProfile);

// UPDATE user profile
router.put("/:id", updateProfile);

// CHANGE password
router.put("/:id/password", changePassword);

export default router;