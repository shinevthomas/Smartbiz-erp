import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";
import Sale from "../models/Sale.js";

export const getDashboardStats = async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const customers = await Customer.countDocuments();
    const invoices = await Invoice.countDocuments();

    const sales = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json({
      products,
      customers,
      invoices,
      sales: sales[0]?.total || 0
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};