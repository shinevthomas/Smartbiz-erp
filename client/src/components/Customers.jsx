import { useEffect, useState } from "react";
import api from "../api";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // ==========================================================
  // FETCH CUSTOMERS
  // ==========================================================

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/customers");

      setCustomers(res.data);
    } catch (err) {
      console.error("Fetch Customers Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD CUSTOMERS
  // ==========================================================

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
    });

    setEditingId(null);
  };

  // ==========================================================
  // SAVE / UPDATE CUSTOMER
  // ==========================================================

  const saveCustomer = async () => {
    if (
      !newCustomer.name.trim() ||
      !newCustomer.phone.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.address.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      if (editingId === null) {
        // ADD CUSTOMER
        await api.post(
          "/customers",
          newCustomer
        );

        alert("✅ Customer Added Successfully");
      } else {
        // UPDATE CUSTOMER
        await api.put(
          `/customers/${editingId}`,
          newCustomer
        );

        alert("✅ Customer Updated Successfully");
      }

      await fetchCustomers();

      resetForm();

      setShowForm(false);
    } catch (err) {
      console.error("Save Customer Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to save customer."
      );
    }
  };

  // ==========================================================
  // EDIT CUSTOMER
  // ==========================================================

  const editCustomer = (customer) => {
    setEditingId(customer._id);

    setNewCustomer({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
    });

    setShowForm(true);
  };

  // ==========================================================
  // DELETE CUSTOMER
  // ==========================================================

  const deleteCustomer = async (id) => {
    const confirmed = window.confirm(
      "Delete this customer?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/customers/${id}`
      );

      await fetchCustomers();

      alert("🗑 Customer Deleted");
    } catch (err) {
      console.error("Delete Customer Error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete customer."
      );
    }
  };

  // ==========================================================
  // FILTER CUSTOMERS
  // ==========================================================

  const filteredCustomers = customers.filter(
    (customer) => {
      const keyword = search.toLowerCase();

      return (
        customer.name
          ?.toLowerCase()
          .includes(keyword) ||
        customer.phone
          ?.toLowerCase()
          .includes(keyword) ||
        customer.email
          ?.toLowerCase()
          .includes(keyword)
      );
    }
  );

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="customers-container">
        <h2 style={{ textAlign: "center" }}>
          Loading Customers...
        </h2>
      </div>
    );
  }

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div className="customers-container">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="customers-header">

        <h1>Customer Management</h1>

        <button
          className="add-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
              setShowForm(false);
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
        >
          {showForm
            ? "Close Form"
            : "+ Add Customer"}
        </button>

      </div>

      {/* ==========================
          SEARCH
      ========================== */}

      <input
        type="text"
        className="search-box"
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* ==========================
          CUSTOMER COUNT
      ========================== */}

      <h3 className="customer-count">
        Total Customers :{" "}
        {filteredCustomers.length}
      </h3>

      {/* ==========================
          CUSTOMER FORM
      ========================== */}

      {showForm && (
        <div className="form-container">

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={newCustomer.address}
            onChange={handleChange}
          />

          <button onClick={saveCustomer}>
            {editingId
              ? "Update Customer"
              : "Save Customer"}
          </button>

        </div>
      )}

      {/* ==========================
          CUSTOMER TABLE
      ========================== */}

      <table className="customers-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredCustomers.length > 0 ? (

            filteredCustomers.map(
              (customer, index) => (

                <tr key={customer._id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {customer.name}
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.address}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editCustomer(customer)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteCustomer(
                          customer._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontWeight: "bold",
                }}
              >
                No Customers Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;