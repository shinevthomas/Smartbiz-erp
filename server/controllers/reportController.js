import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

export const getReport = async (req, res) => {
  try {
    // Dashboard Counts
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalSales = await Sale.countDocuments();
    const totalInvoices = await Invoice.countDocuments();

    // Total Revenue
    const revenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    // Best Selling Products WITH PRODUCT NAME
    const bestProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalSold: {
            $sum: "$quantity",
          },
        },
      },
      {
        $lookup: {
          from: "products", // MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 1,
          totalSold: 1,
          productName: "$product.name",
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // Latest Sales
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