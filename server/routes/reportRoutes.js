import express from "express";

import {
  getReport,
} from "../controllers/reportController.js";

const router = express.Router();

// GET report data
router.get("/", getReport);

export default router;