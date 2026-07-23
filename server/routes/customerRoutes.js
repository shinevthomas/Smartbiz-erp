import express from "express";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

// Get all customers
router.get("/", getCustomers);

// Add customer
router.post("/", addCustomer);

// Update customer
router.put("/:id", updateCustomer);

// Delete customer
router.delete("/:id", deleteCustomer);

export default router;