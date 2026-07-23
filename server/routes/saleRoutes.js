import express from "express";
import {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
} from "../controllers/saleController.js";

const router = express.Router();

// Create Sale
router.post("/", createSale);

// Get All Sales
router.get("/", getSales);

// Get Single Sale
router.get("/:id", getSaleById);

// Delete Sale
router.delete("/:id", deleteSale);

export default router;