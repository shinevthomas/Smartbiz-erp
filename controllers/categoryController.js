import Category from "../models/Category.js";

/* ==========================
   GET ALL CATEGORIES
========================== */

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};

/* ==========================
   CREATE CATEGORY
========================== */

export const createCategory = async (req, res) => {
  try {
    const { name, description, color, status } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      color,
      status,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
    });
  }
};

/* ==========================
   UPDATE CATEGORY
========================== */

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update category",
    });
  }
};

/* ==========================
   DELETE CATEGORY
========================== */

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};  