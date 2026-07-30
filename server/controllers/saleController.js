import Product from "../models/Product.js";
import Sale from "../models/Sale.js";
import Invoice from "../models/Invoice.js";

// ==========================================
// CREATE SALE
// ==========================================
export const createSale = async (req, res) => {
  try {
    const { customerName, product, quantity } = req.body;

    if (!customerName || !product || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const selectedProduct = await Product.findById(product);

    if (!selectedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (selectedProduct.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available.",
      });
    }

    const totalAmount =
      Number(selectedProduct.price) * Number(quantity);

    // Update Stock
    selectedProduct.stock -= Number(quantity);
    await selectedProduct.save();

    // Create Sale
    const sale = await Sale.create({
      customerName,
      product,
      quantity,
      price: selectedProduct.price,
      totalAmount,
    });

    // Create Invoice Automatically
    const invoiceCount = await Invoice.countDocuments();

    const invoice = await Invoice.create({
      invoiceNo: `INV${String(invoiceCount + 1).padStart(3, "0")}`,
      customerName,
      product: selectedProduct.name,
      quantity,
      price: selectedProduct.price,
      totalAmount,
      status: "Paid",
    });

    res.status(201).json({
      success: true,
      message: "Sale created successfully.",
      sale,
      invoice,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL SALES
// ==========================================
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.status(200).json(sales);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE SALE
// ==========================================
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate("product");

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found.",
      });
    }

    res.status(200).json(sale);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE SALE
// ==========================================
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found.",
      });
    }

    // Restore Product Stock
    const product = await Product.findById(sale.product);

    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    // Delete Sale
    await Sale.findByIdAndDelete(req.params.id);

    // Delete Matching Invoice
    await Invoice.findOneAndDelete({
      customerName: sale.customerName,
      totalAmount: sale.totalAmount,
    });

    res.status(200).json({
      success: true,
      message: "Sale deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};