import { useEffect, useState } from "react";
import axios from "axios";

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Sales
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales");
      setSales(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Save Sale
  const handleSale = async (e) => {
    e.preventDefault();

    if (!customerName || !product || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/sales", {
        customerName,
        product,
        quantity,
      });

      alert("Sale Added Successfully!");

      setCustomerName("");
      setProduct("");
      setQuantity("");

      fetchProducts();
      fetchSales();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        💰 Sales Management
      </h1>

      <form onSubmit={handleSale}>
                <div style={{ marginBottom: "20px" }}>
          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Select Product</label>

          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          >
            <option value="">Choose Product</option>

            {products.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} | ₹{item.price} | Stock: {item.stock}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Quantity</label>

          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save Sale
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>Available Products</h2>

      <ul>
        {products.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — ₹{item.price} — Stock: {item.stock}
          </li>
        ))}
      </ul>

      <hr style={{ margin: "30px 0" }} />

      <h2>Sales History</h2>
            {sales.length === 0 ? (
        <p>No sales found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.customerName}</td>
                <td>{sale.product?.name}</td>
                <td>{sale.quantity}</td>
                <td>₹{sale.price}</td>
                <td>₹{sale.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Sales;