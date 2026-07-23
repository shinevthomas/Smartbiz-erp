import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

export const getReport = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalSales = await Sale.countDocuments();
    const totalInvoices = await Invoice.countDocuments();

    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const bestProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalSold: { $sum: "$quantity" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const latestSales = await Sale.find()
      .populate("product")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProducts,
      totalCustomers,
      totalSales,
      totalInvoices,
      totalRevenue: revenue[0]?.totalRevenue || 0,
      bestProducts,
      latestSales,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};