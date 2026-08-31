import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

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
      trim: true,
      uppercase: true,
      default: "",
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "light",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);