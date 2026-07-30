import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },

    companyName: String,
    phone: String,
    address: String,
    currency: String,
    logo: String,
    gst: String,
    theme: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);