import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= HELPER: GENERATE JWT =================

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= REGISTER =================

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      phone,
      address,
      currency,
      logo,
      gst,
      theme,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // IMPORTANT:
    // Public registration should NOT allow users to choose admin.
    // The first registered/default user is created as admin.
    const userCount = await User.countDocuments();

    const userRole = userCount === 0 ? "admin" : "staff";

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole,
      companyName: companyName?.trim() || "",
      phone: phone?.trim() || "",
      address: address?.trim() || "",
      currency: currency || "INR",
      logo: logo || "",
      gst: gst?.trim() || "",
      theme: theme || "light",
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        address: user.address,
        currency: user.currency,
        logo: user.logo,
        gst: user.gst,
        theme: user.theme,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to register user.",
    });
  }
};

// ================= LOGIN =================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Password has select: false in User model,
    // so explicitly select it during login
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // Generic message for security
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        address: user.address,
        currency: user.currency,
        logo: user.logo,
        gst: user.gst,
        theme: user.theme,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log in.",
    });
  }
};

// ================= GET PROFILE =================

export const getProfile = async (req, res) => {
  try {
    // req.user is already the authenticated MongoDB user
    // because our protect middleware attached it.
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        address: user.address,
        currency: user.currency,
        logo: user.logo,
        gst: user.gst,
        theme: user.theme,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
};