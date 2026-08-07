import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ==========================
    // Basic Details
    // ==========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Automatically generated in the controller
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    supplier: {
      type: String,
      default: "",
      trim: true,
    },

    barcode: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Pricing
    // ==========================

    purchasePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================
    // Stock
    // ==========================

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 10,
      min: 0,
    },

    // ==========================
    // Description
    // ==========================

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Product Image
    // ==========================

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;