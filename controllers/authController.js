import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================================================
// REGISTER
// ==========================================================

export const register = async (req, res) => {
  try {
    console.log("=================================");
    console.log("REGISTER REQUEST RECEIVED");
    console.log("Request body:", req.body);
    console.log("=================================");

    const {
      name,
      email,
      password,
      role,
      companyName,
      phone,
      address,
      currency,
      logo,
      gst,
      theme,
    } = req.body;

    // ------------------------------------------------------
    // Validate required fields
    // ------------------------------------------------------

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");

      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // ------------------------------------------------------
    // Clean email
    // ------------------------------------------------------

    const cleanEmail = email.trim().toLowerCase();

    // ------------------------------------------------------
    // Check existing email
    // ------------------------------------------------------

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      console.log("❌ Email already exists:", cleanEmail);

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ------------------------------------------------------
    // Hash password
    // ------------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("✅ Password hashed");

    // ------------------------------------------------------
    // Create user
    // ------------------------------------------------------

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,

      role: role || "Employee",

      companyName: companyName || "",
      phone: phone || "",
      address: address || "",
      currency: currency || "INR",
      logo: logo || "",
      gst: gst || "",
      theme: theme || "light",
    });

    console.log("=================================");
    console.log("✅ USER CREATED SUCCESSFULLY");
    console.log("User ID:", user._id);
    console.log("User Name:", user.name);
    console.log("User Email:", user.email);
    console.log("=================================");

    // ------------------------------------------------------
    // Response
    // ------------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Registration Successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log("=================================");
    console.log("❌ REGISTRATION ERROR");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};


// ==========================================================
// LOGIN
// ==========================================================

export const login = async (req, res) => {
  try {
    console.log("=================================");
    console.log("LOGIN REQUEST RECEIVED");
    console.log("Email:", req.body?.email);
    console.log("=================================");

    const { email, password } = req.body;

    // ------------------------------------------------------
    // Validate input
    // ------------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ------------------------------------------------------
    // Clean email
    // ------------------------------------------------------

    const cleanEmail = email.trim().toLowerCase();

    // ------------------------------------------------------
    // Find user
    // ------------------------------------------------------

    const user = await User.findOne({
      email: cleanEmail,
    });

    console.log("User found:", user ? "YES" : "NO");

    if (!user) {
      console.log("❌ User does not exist");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("User ID:", user._id);
    console.log("User Name:", user.name);
    console.log("User Email:", user.email);

    // ------------------------------------------------------
    // Check password exists
    // ------------------------------------------------------

    if (!user.password) {
      console.log("❌ Password is missing from database");

      return res.status(500).json({
        success: false,
        message: "User password is not configured",
      });
    }

    // ------------------------------------------------------
    // Compare password
    // ------------------------------------------------------

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      console.log("❌ Password does not match");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ------------------------------------------------------
    // Check JWT secret
    // ------------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET is missing");

      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is not configured on the server",
      });
    }

    // ------------------------------------------------------
    // Create JWT
    // ------------------------------------------------------

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("=================================");
    console.log("✅ LOGIN SUCCESSFUL");
    console.log("User:", user.email);
    console.log("=================================");

    // ------------------------------------------------------
    // Response
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        companyName: user.companyName || "",
        phone: user.phone || "",
        address: user.address || "",
        currency: user.currency || "INR",
        logo: user.logo || "",
        gst: user.gst || "",
        theme: user.theme || "light",
      },
    });

  } catch (error) {
    console.log("=================================");
    console.log("❌ LOGIN ERROR");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};


// ==========================================================
// GET PROFILE
// ==========================================================

export const getProfile = async (req, res) => {
  try {
    console.log("=================================");
    console.log("GET PROFILE REQUEST");
    console.log("User:", req.user);
    console.log("=================================");

    // ------------------------------------------------------
    // Check authentication
    // ------------------------------------------------------

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ------------------------------------------------------
    // Find user
    // ------------------------------------------------------

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      console.log("❌ User not found");

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ Profile found:", user.email);

    // ------------------------------------------------------
    // Response
    // ------------------------------------------------------

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("=================================");
    console.log("❌ GET PROFILE ERROR");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
    console.log("=================================");

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get profile",
    });
  }
};