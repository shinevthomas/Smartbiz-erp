import express from "express";

import {
  getSettings,
  saveSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

// GET settings
router.get("/", getSettings);

// SAVE / UPDATE settings
router.put("/", saveSettings);

export default router;