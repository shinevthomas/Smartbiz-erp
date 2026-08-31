import mongoose from "mongoose";
import Product from "../models/Product.js";

// =========================
// GENERATE PRODUCT SKU
// =========================
const generateSKU = async () => {
  let sku;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    sku = `PRD-${randomNumber}`;

    const existingProduct = await Product.findOne({ sku });

    exists = !!existingProduct;
  }

  return sku;
};

// =========================
// GET ALL PRODUCTS
// =========================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products.",
    });
  }
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      supplier,
      barcode,
      price,
      purchasePrice,
      stock,
      minimumStock,
      description,
      image,
      status,
    } = req.body;

    // Validate required fields
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product name is required.",
      });
    }

    if (price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Selling price is required.",
      });
    }

    if (stock === undefined || stock === "") {
      return res.status(400).json({
        success: false,
        message: "Stock quantity is required.",
      });
    }

    // Validate numeric values
    if (
      Number(price) < 0 ||
      Number(purchasePrice || 0) < 0 ||
      Number(stock) < 0 ||
      Number(minimumStock ?? 10) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price and stock values cannot be negative.",
      });
    }

    // Use provided SKU or automatically generate one
    let productSKU = sku?.trim().toUpperCase();

    if (!productSKU) {
      productSKU = await generateSKU();
    }

    // Check duplicate SKU
    const existingProduct = await Product.findOne({
      sku: productSKU,
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "A product with this SKU already exists.",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      sku: productSKU,
      category: category?.trim() || "General",
      supplier: supplier?.trim() || "",
      barcode: barcode?.trim() || "",
      price: Number(price),
      purchasePrice: Number(purchasePrice || 0),
      stock: Number(stock),
      minimumStock: Number(minimumStock ?? 10),
      description: description?.trim() || "",
      image: image || "",
      status: status || "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A product with this SKU already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create product.",
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const allowedFields = [
      "name",
      "sku",
      "category",
      "supplier",
      "barcode",
      "price",
      "purchasePrice",
      "stock",
      "minimumStock",
      "description",
      "image",
      "status",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Normalize text fields
    if (updates.name !== undefined) {
      updates.name = updates.name.trim();
    }

    if (updates.sku !== undefined) {
      updates.sku = updates.sku.trim().toUpperCase();
    }

    if (updates.category !== undefined) {
      updates.category = updates.category.trim();
    }

    if (updates.supplier !== undefined) {
      updates.supplier = updates.supplier.trim();
    }

    if (updates.barcode !== undefined) {
      updates.barcode = updates.barcode.trim();
    }

    if (updates.description !== undefined) {
      updates.description = updates.description.trim();
    }

    // Validate numeric fields
    const numericFields = [
      "price",
      "purchasePrice",
      "stock",
      "minimumStock",
    ];

    for (const field of numericFields) {
      if (updates[field] !== undefined) {
        if (
          updates[field] === "" ||
          Number.isNaN(Number(updates[field])) ||
          Number(updates[field]) < 0
        ) {
          return res.status(400).json({
            success: false,
            message: `${field} must be a valid non-negative number.`,
          });
        }

        updates[field] = Number(updates[field]);
      }
    }

    // Check duplicate SKU
    if (updates.sku) {
      const existingProduct = await Product.findOne({
        sku: updates.sku,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return res.status(409).json({
          success: false,
          message: "Another product already uses this SKU.",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A product with this SKU already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update product.",
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete product.",
    });
  }
};