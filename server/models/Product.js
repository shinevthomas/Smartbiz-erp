import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 200,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
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

    price: {
      type: Number,
      required: [true, "Selling price is required"],
      min: 0,
    },

    purchasePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 10,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);