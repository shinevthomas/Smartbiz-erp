import express from "express";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Sale from "../models/Sale.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalSales = await Sale.countDocuments();

    const sales = await Sale.find();

    let totalRevenue = 0;

    sales.forEach((sale) => {
      totalRevenue += sale.totalAmount;
    });

    res.json({
      totalProducts,
      totalCustomers,
      totalSales,
      totalRevenue,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;