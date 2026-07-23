import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: String,
    email: String,
    phone: String,
    address: String,
    currency: String,
    notifications: Boolean,
    darkMode: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);