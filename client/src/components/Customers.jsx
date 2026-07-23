import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/customers"
      );

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const saveCustomer = async () => {
    if (
      !newCustomer.name ||
      !newCustomer.phone ||
      !newCustomer.email ||
      !newCustomer.address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId === null) {
        await axios.post(
          "http://localhost:5000/api/customers",
          newCustomer
        );

        alert("✅ Customer Added Successfully");
      } else {
        await axios.put(
          `http://localhost:5000/api/customers/${editingId}`,
          newCustomer
        );

        alert("✅ Customer Updated Successfully");
      }

      fetchCustomers();

      setNewCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer._id);

    setNewCustomer({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
    });

    setShowForm(true);
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/customers/${id}`
      );

      fetchCustomers();

      alert("🗑 Customer Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.phone.includes(keyword) ||
      customer.email.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return (
      <div className="customers-container">
        <h2 style={{ textAlign: "center" }}>
          Loading Customers...
        </h2>
      </div>
    );
  }

  return (
    <div className="customers-container">

      <div className="customers-header">

        <h1>Customer Management</h1>

        <button
          className="add-btn"
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setEditingId(null);

              setNewCustomer({
                name: "",
                phone: "",
                email: "",
                address: "",
              });
            }
          }}
        >
          {showForm ? "Close Form" : "+ Add Customer"}
        </button>

      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="customer-count">
        Total Customers : {filteredCustomers.length}
      </h3>

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
            {editingId ? "Update Customer" : "Save Customer"}
          </button>

        </div>
      )}

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
            filteredCustomers.map((customer, index) => (
              <tr key={customer._id}>

                <td>{index + 1}</td>

                <td>{customer.name}</td>

                <td>{customer.phone}</td>

                <td>{customer.email}</td>

                <td>{customer.address}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => editCustomer(customer)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteCustomer(customer._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
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