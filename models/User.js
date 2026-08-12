import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ==========================================================
    // BASIC USER INFORMATION
    // ==========================================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ==========================================================
    // USER ROLE
    // ==========================================================

    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      default: "Employee",
    },

    // ==========================================================
    // COMPANY INFORMATION
    // ==========================================================

    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================================
    // BUSINESS SETTINGS
    // ==========================================================

    currency: {
      type: String,
      default: "INR",
    },

    logo: {
      type: String,
      default: "",
    },

    gst: {
      type: String,
      default: "",
    },

    theme: {
      type: String,
      default: "light",
    },

    // ==========================================================
    // ACCOUNT STATUS
    // ==========================================================

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

const User = mongoose.model("User", userSchema);

export default User;