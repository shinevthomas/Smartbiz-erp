import express from "express";

import {
  getInvoices,
  createInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

// GET all invoices
router.get("/", getInvoices);

// CREATE invoice
router.post("/", createInvoice);

// DELETE invoice
router.delete("/:id", deleteInvoice);

export default router;