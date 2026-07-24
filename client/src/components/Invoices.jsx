import { useEffect, useState } from "react";
import axios from "axios";
import "./Invoices.css";
import { generateInvoice } from "../utils/generateInvoice";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices");
      setInvoices(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      alert("Invoice Deleted Successfully");
      fetchInvoices();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const keyword = search.toLowerCase();

    return (
      invoice.invoiceNo.toLowerCase().includes(keyword) ||
      invoice.customerName.toLowerCase().includes(keyword) ||
      invoice.product.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="invoice-container">

      <h1>Invoice Management</h1>

      <input
        type="text"
        placeholder="Search Invoice..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Total Invoices : {filteredInvoices.length}</h3>

      <table className="invoice-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => (
              <tr key={invoice._id}>

                <td>{index + 1}</td>

                <td>{invoice.invoiceNo}</td>

                <td>{invoice.customerName}</td>

                <td>{invoice.product}</td>

                <td>{invoice.quantity}</td>

                <td>
                  ₹{Number(invoice.price).toLocaleString("en-IN")}
                </td>

                <td>
                  ₹{Number(invoice.totalAmount).toLocaleString("en-IN")}
                </td>

                <td>
                  <span className="paid">
                    {invoice.status}
                  </span>
                </td>

                <td>
                  {new Date(invoice.createdAt).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="pdf-btn"
                    onClick={() =>
                      generateInvoice({
                        invoiceNumber: invoice.invoiceNo,
                        customerName: invoice.customerName,
                        productName: invoice.product,
                        quantity: invoice.quantity,
                        price: Number(invoice.price),
                        total: Number(invoice.totalAmount),
                        status: invoice.status,
                        createdAt: invoice.createdAt,
                      })
                    }
                  >
                    PDF
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteInvoice(invoice._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontWeight: "bold",
                }}
              >
                No Invoices Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Invoices;