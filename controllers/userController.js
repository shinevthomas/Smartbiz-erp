import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ==============================
// GET USER PROFILE
// ==============================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// UPDATE PROFILE
// ==============================
export const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.companyName = req.body.companyName;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.currency = req.body.currency;

    await user.save();

    res.json({
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==============================
// CHANGE PASSWORD
// ==============================
export const changePassword = async (req, res) => {

  try {

    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      newPassword,
      salt
    );

    await user.save();

    res.json({
      message: "Password Changed Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};