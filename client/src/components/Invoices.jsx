import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Invoices.css";
import { generateInvoice } from "../utils/generateInvoice";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Invoices() {

  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ==========================
  // FETCH INVOICES
  // ==========================

  const fetchInvoices = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/invoices"
      );

      setInvoices(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  // ==========================
  // DELETE INVOICE
  // ==========================

  const deleteInvoice = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this invoice permanently?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/invoices/${id}`
      );

      fetchInvoices();

    } catch (err) {

      console.log(err);

    }

  };
    // ==========================
  // SEARCH
  // ==========================

  const filteredInvoices = useMemo(() => {

    return invoices.filter((invoice) => {

      const keyword = search.toLowerCase();

      return (
        invoice.invoiceNo.toLowerCase().includes(keyword) ||
        invoice.customerName.toLowerCase().includes(keyword) ||
        invoice.product.toLowerCase().includes(keyword)
      );

    });

  }, [search, invoices]);

  // ==========================
  // DASHBOARD CARDS
  // ==========================

  const totalInvoices = filteredInvoices.length;

  const totalRevenue = filteredInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.totalAmount),
    0
  );

  const paidInvoices = filteredInvoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const totalProducts = filteredInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.quantity),
    0
  );

  // ==========================
  // MONTHLY REVENUE CHART
  // ==========================

  const monthlyRevenue = {};

  invoices.forEach((invoice) => {

    const month = new Date(
      invoice.createdAt
    ).toLocaleString("default", {
      month: "short",
    });

    monthlyRevenue[month] =
      (monthlyRevenue[month] || 0) +
      Number(invoice.totalAmount);

  });

  const chartData = Object.keys(monthlyRevenue).map(
    (month) => ({
      month,
      revenue: monthlyRevenue[month],
    })
  );

  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (
      <div className="invoice-loading">
        <h2>Loading Invoices...</h2>
      </div>
    );

  }
    return (

    <div className="invoice-page">

      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div className="invoice-header">

        <div>

          <h1>Invoice Management</h1>

          <p>
            Manage, search, print and download customer invoices.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchInvoices}
        >
          🔄 Refresh
        </button>

      </div>

      {/* ========================= */}
      {/* DASHBOARD CARDS */}
      {/* ========================= */}

      <div className="invoice-cards">

        <div className="invoice-card">
          <span>Total Invoices</span>
          <h2>{totalInvoices}</h2>
        </div>

        <div className="invoice-card">
          <span>Total Revenue</span>
          <h2>
            ₹{Number(totalRevenue).toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="invoice-card">
          <span>Paid Invoices</span>
          <h2>{paidInvoices}</h2>
        </div>

        <div className="invoice-card">
          <span>Products Sold</span>
          <h2>{totalProducts}</h2>
        </div>

      </div>

      {/* ========================= */}
      {/* MONTHLY REVENUE CHART */}
      {/* ========================= */}

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            color: "#2563eb",
          }}
        >
          📈 Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Bar
              dataKey="revenue"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
            {/* ========================= */}
      {/* SEARCH BAR */}
      {/* ========================= */}

      <div className="invoice-toolbar">

        <input
          type="text"
          placeholder="🔍 Search by Invoice, Customer or Product..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <div className="invoice-table-wrapper">

        <table className="invoice-table">

          <thead>

            <tr>

              <th>#</th>

              <th>Invoice No</th>

              <th>Customer</th>

              <th>Product</th>

              <th>Qty</th>

              <th>Price</th>

              <th>Total</th>

              <th>Status</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>          {filteredInvoices.length > 0 ? (

            filteredInvoices.map((invoice, index) => (

              <tr key={invoice._id}>

                <td>{index + 1}</td>

                <td>
                  <strong>{invoice.invoiceNo}</strong>
                </td>

                <td>{invoice.customerName}</td>

                <td>{invoice.product}</td>

                <td>{invoice.quantity}</td>

                <td>
                  ₹{Number(invoice.price).toLocaleString("en-IN")}
                </td>

                <td>
                  <strong>
                    ₹{Number(invoice.totalAmount).toLocaleString("en-IN")}
                  </strong>
                </td>

                <td>

                  <span
                    className={
                      invoice.status === "Paid"
                        ? "status paid"
                        : "status pending"
                    }
                  >
                    {invoice.status}
                  </span>

                </td>

                <td>
                  {new Date(
                    invoice.createdAt
                  ).toLocaleDateString("en-IN")}
                </td>

                <td>

                  <div className="action-buttons">

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
                      📄 PDF
                    </button>

                    <button
                      className="print-btn"
                      onClick={() => window.print()}
                    >
                      🖨 Print
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteInvoice(invoice._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="10"
                className="empty-table"
              >

                <h3>No Invoices Found</h3>

                <p>
                  Create your first sale to generate invoices.
                </p>

              </td>

            </tr>

          )}
                    </tbody>

        </table>

      </div>

    </div>

  );

}

export default Invoices;