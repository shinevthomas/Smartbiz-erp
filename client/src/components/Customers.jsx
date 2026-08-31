import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ===============================
  // FETCH CUSTOMERS
  // ===============================

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/customers");

      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ===============================
  // INPUT CHANGE
  // ===============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // SAVE CUSTOMER
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, formData);

        toast.success("Customer updated successfully");
      } else {
        await api.post("/customers", formData);

        toast.success("Customer added successfully");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        company: "",
      });

      setEditingId(null);

      fetchCustomers();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to save customer"
      );
    }
  };

  // ===============================
  // EDIT CUSTOMER
  // ===============================

  const handleEdit = (customer) => {
    setEditingId(customer._id);

    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
      company: customer.company || "",
    });
  };

  // ===============================
  // DELETE CUSTOMER
  // ===============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/customers/${id}`);

      toast.success("Customer deleted successfully");

      fetchCustomers();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to delete customer"
      );
    }
  };

  // ===============================
  // CANCEL EDIT
  // ===============================

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
    });
  };

  return (
    <div className="customers-page">

      {/* ================= HEADER ================= */}

      <div className="customers-header">

        <div>
          <h1>Customers</h1>

          <p>
            Manage your customers and business relationships
          </p>
        </div>

        <div className="customer-count">
          <strong>{customers.length}</strong>
          <span>Total Customers</span>
        </div>

      </div>

      {/* ================= FORM ================= */}

      <div className="customer-form-card">

        <h2>
          {editingId ? "Edit Customer" : "Add New Customer"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="customer-form-grid">

            <div className="form-group">
              <label>Customer Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">

            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter customer address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />

          </div>

          <div className="customer-form-actions">

            <button
              type="submit"
              className="customer-save-btn"
            >
              {editingId
                ? "Update Customer"
                : "Add Customer"}
            </button>

            {editingId && (
              <button
                type="button"
                className="customer-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      {/* ================= TABLE ================= */}

      <div className="customers-table-card">

        <div className="table-header">

          <div>
            <h2>Customer List</h2>

            <p>
              View and manage all your customers
            </p>
          </div>

        </div>

        {loading ? (
          <div className="customers-loading">
            Loading customers...
          </div>
        ) : customers.length === 0 ? (
          <div className="customers-empty">
            <h3>No customers found</h3>

            <p>
              Add your first customer using the form above.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {customers.map((customer, index) => (

                  <tr key={customer._id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      <strong>
                        {customer.name}
                      </strong>
                    </td>

                    <td>
                      {customer.email || "-"}
                    </td>

                    <td>
                      {customer.phone || "-"}
                    </td>

                    <td>
                      {customer.company || "-"}
                    </td>

                    <td>
                      {customer.address || "-"}
                    </td>

                    <td>

                      <div className="customer-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(customer)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(customer._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Customers;