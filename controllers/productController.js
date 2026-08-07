import Product from "../models/Product.js";

// =========================
// GET ALL PRODUCTS
// =========================
export const getProducts = async (req, res) => {
  console.log("========== GET PRODUCTS ==========");

  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    console.log(`Found ${products.length} products`);

    return res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req, res) => {
  console.log("========== CREATE PRODUCT ==========");

  try {
    // Generate SKU automatically
    const sku = `SKU-${Date.now()}`;

    // Image path
    const image = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";

    const product = new Product({
      name: req.body.name,
      sku,
      category: req.body.category,
      supplier: req.body.supplier,
      barcode: req.body.barcode,
      purchasePrice: req.body.purchasePrice,
      price: req.body.price,
      stock: req.body.stock,
      minimumStock: req.body.minimumStock,
      description: req.body.description,
      image,
    });

    await product.save();

    console.log("Product Created Successfully");

    return res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (req, res) => {
  console.log("========== UPDATE PRODUCT ==========");

  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      supplier: req.body.supplier,
      barcode: req.body.barcode,
      purchasePrice: req.body.purchasePrice,
      price: req.body.price,
      stock: req.body.stock,
      minimumStock: req.body.minimumStock,
      description: req.body.description,
    };

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product Updated Successfully");

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (req, res) => {
  console.log("========== DELETE PRODUCT ==========");

  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product Deleted Successfully");

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};