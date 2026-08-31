import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartBiz ERP API is running",
  });
});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/sales", saleRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/invoices", invoiceRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);

app.use("/api/notifications", notificationRoutes);

// ================= 404 HANDLER =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ================= DATABASE =================

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/smartbiz";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 SmartBiz ERP Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });