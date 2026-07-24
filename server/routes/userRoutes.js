import express from "express";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

// ==============================
// GET USER PROFILE
// ==============================
router.get("/:id", getProfile);

// ==============================
// UPDATE USER PROFILE
// ==============================
router.put("/:id", updateProfile);

// ==============================
// CHANGE PASSWORD
// ==============================
router.put("/change-password/:id", changePassword);

export default router;