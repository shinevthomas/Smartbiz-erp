import express from "express";

import {
  getSales,
  createSale,
  getSaleById,
  deleteSale,
} from "../controllers/saleController.js";

const router = express.Router();

// GET all sales
router.get("/", getSales);

// CREATE sale
router.post("/", createSale);

// GET single sale
router.get("/:id", getSaleById);

// DELETE sale
router.delete("/:id", deleteSale);

export default router;