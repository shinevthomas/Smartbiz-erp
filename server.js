import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


// ==========================================================
// MIDDLEWARE
// ==========================================================

app.use(cors());

app.use(express.json());


// ==========================================================
// TEST ROUTE
// ==========================================================

app.get("/test", (req, res) => {
    console.log("✅ TEST ROUTE HIT");

    res.json({
        success: true,
        message: "Server is working",
    });
});


// ==========================================================
// UPLOADS
// ==========================================================

app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads"))
);


// ==========================================================
// API ROUTES
// ==========================================================

// Product routes
app.use("/api/products", productRoutes);


// Authentication routes
app.use("/api/auth", authRoutes);


// ==========================================================
// 404 ROUTE
// ==========================================================

app.use((req, res) => {
    console.log("❌ ROUTE NOT FOUND:", req.method, req.originalUrl);

    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
});


// ==========================================================
// MONGODB CONNECTION
// ==========================================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:");
        console.error(error);
    });


// ==========================================================
// SERVER
// ==========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});