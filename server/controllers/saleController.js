import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Invoice from "../models/Invoice.js";

// Create Sale
export const createSale = async (req, res) => {
  try {
    const { customerName, product, quantity } = req.body;

    // Check if all fields are provided
    if (!customerName || !product || !quantity) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    // Find product
    const selectedProduct = await Product.findById(product);

    if (!selectedProduct) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    // Check stock availability
    if (selectedProduct.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available.",
      });
    }

    // Calculate total amount
    const totalAmount = selectedProduct.price * quantity;

    // Reduce stock
    selectedProduct.stock -= quantity;
    await selectedProduct.save();

    // Save Sale
    const sale = new Sale({
      customerName,
      product,
      quantity,
      price: selectedProduct.price,
      totalAmount,
    });

    await sale.save();

    // ===========================
    // Create Invoice Automatically
    // ===========================

    const invoiceCount = await Invoice.countDocuments();

    const invoice = new Invoice({
      invoiceNo: `INV${String(invoiceCount + 1).padStart(3, "0")}`,
      customerName,
      product: selectedProduct.name,
      quantity,
      price: selectedProduct.price,
      totalAmount,
      status: "Paid",
    });

    await invoice.save();

    res.status(201).json({
      message: "Sale and Invoice created successfully.",
      sale,
      invoice,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get All Sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("product");

    res.status(200).json(sales);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Sale
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate("product");

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found.",
      });
    }

    res.status(200).json(sale);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Sale
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found.",
      });
    }

    // Restore stock
    const product = await Product.findById(sale.product);

    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    // Delete sale
    await Sale.findByIdAndDelete(req.params.id);

    // Delete invoice with same customer and amount
    await Invoice.findOneAndDelete({
      customerName: sale.customerName,
      totalAmount: sale.totalAmount,
    });

    res.status(200).json({
      message: "Sale and Invoice deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};