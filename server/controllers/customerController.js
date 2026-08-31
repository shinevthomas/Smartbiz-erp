import Customer from "../models/Customer.js";

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add customer
export const addCustomer = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    const customer = new Customer({
      name,
      phone,
      email,
      address,
    });

    const savedCustomer = await customer.save();

    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};