import Invoice from "../models/Invoice.js";

// GET all invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE invoice
export const createInvoice = async (req, res) => {
  try {
    const count = await Invoice.countDocuments();

    const invoice = new Invoice({
      invoiceNo: `INV${String(count + 1).padStart(3, "0")}`,
      customerName: req.body.customerName,
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
      totalAmount: req.body.totalAmount,
      status: "Paid",
    });

    await invoice.save();

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE invoice
export const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);

    res.json({
      message: "Invoice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};