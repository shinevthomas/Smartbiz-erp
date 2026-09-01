import { useEffect, useState } from "react";
import api from "../api";
import "./Reports.css";
import SalesChart from "./SalesChart";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FiBarChart2,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiFileText,
  FiDollarSign,
  FiDownload,
  FiFile,
  FiTrendingUp,
  FiPackage,
  FiClock,
  FiArrowUpRight,
  FiRefreshCw,
} from "react-icons/fi";

function Reports() {
  const [report, setReport] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    bestProducts: [],
    latestSales: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const res = await api.get("/reports");

      setReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EXPORT EXCEL
  // =========================================================

  const exportExcel = () => {
    const data = report.latestSales.map((sale) => ({
      Customer: sale.customerName,
      Product: sale.product?.name || sale.product,
      Quantity: sale.quantity,
      Total: sale.totalAmount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sales Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "Sales_Report.xlsx");
  };

  // =========================================================
  // EXPORT PDF
  // =========================================================

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "SmartBiz ERP Report",
      14,
      18
    );

    autoTable(doc, {
      startY: 30,

      head: [
        [
          "Customer",
          "Product",
          "Qty",
          "Total",
        ],
      ],

      body: report.latestSales.map(
        (sale) => [
          sale.customerName,
          sale.product?.name ||
            sale.product,
          sale.quantity,
          "₹" +
            Number(
              sale.totalAmount
            ).toLocaleString("en-IN"),
        ]
      ),
    });

    doc.save("Sales_Report.pdf");
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString(
      "en-IN"
    )}`;
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="reports-container">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="reports-page-header">

        <div className="reports-title-area">

          <div className="reports-title-icon">
            <FiBarChart2 />
          </div>

          <div>

            <div className="reports-eyebrow">
              BUSINESS INTELLIGENCE
            </div>

            <h1>
              Reports & Analytics
            </h1>

            <p>
              Monitor your business performance,
              sales activity and inventory insights.
            </p>

          </div>

        </div>


        <div className="reports-header-actions">

          <button
            className="refresh-report-btn"
            onClick={fetchReport}
            title="Refresh reports"
          >
            <FiRefreshCw />

            Refresh
          </button>

          <button
            className="excel-btn"
            onClick={exportExcel}
          >
            <FiDownload />

            Excel
          </button>

          <button
            className="pdf-btn"
            onClick={exportPDF}
          >
            <FiFile />

            PDF
          </button>

        </div>

      </div>


      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="reports-kpi-grid">

        {/* PRODUCTS */}

        <div className="reports-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon blue">
              <FiBox />
            </div>

            <span className="kpi-trend">
              <FiArrowUpRight />
              Active
            </span>

          </div>

          <div className="kpi-label">
            Total Products
          </div>

          <div className="kpi-value">
            {report.totalProducts}
          </div>

          <div className="kpi-footer">
            <FiPackage />
            Products in inventory
          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="reports-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon purple">
              <FiUsers />
            </div>

            <span className="kpi-trend">
              <FiArrowUpRight />
              Active
            </span>

          </div>

          <div className="kpi-label">
            Total Customers
          </div>

          <div className="kpi-value">
            {report.totalCustomers}
          </div>

          <div className="kpi-footer">
            <FiUsers />
            Registered customers
          </div>

        </div>


        {/* SALES */}

        <div className="reports-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon orange">
              <FiShoppingCart />
            </div>

            <span className="kpi-trend positive">
              <FiTrendingUp />
              Sales
            </span>

          </div>

          <div className="kpi-label">
            Total Sales
          </div>

          <div className="kpi-value">
            {report.totalSales}
          </div>

          <div className="kpi-footer">
            <FiShoppingCart />
            Completed transactions
          </div>

        </div>


        {/* INVOICES */}

        <div className="reports-kpi-card">

          <div className="kpi-top">

            <div className="kpi-icon green">
              <FiFileText />
            </div>

            <span className="kpi-trend positive">
              <FiTrendingUp />
              Updated
            </span>

          </div>

          <div className="kpi-label">
            Total Invoices
          </div>

          <div className="kpi-value">
            {report.totalInvoices}
          </div>

          <div className="kpi-footer">
            <FiFileText />
            Generated invoices
          </div>

        </div>

      </div>


      {/* =====================================================
          REVENUE + QUICK INSIGHT
      ===================================================== */}

      <div className="reports-overview-grid">

        <div className="revenue-panel">

          <div className="revenue-panel-header">

            <div>

              <div className="panel-eyebrow">
                FINANCIAL OVERVIEW
              </div>

              <h2>
                Total Revenue
              </h2>

            </div>

            <div className="revenue-icon">
              <FiDollarSign />
            </div>

          </div>


          <div className="revenue-value">
            {formatCurrency(
              report.totalRevenue
            )}
          </div>


          <div className="revenue-meta">

            <span className="revenue-positive">
              <FiTrendingUp />
              Business Revenue
            </span>

            <span>
              Based on recorded sales
            </span>

          </div>

        </div>


        <div className="insight-panel">

          <div className="insight-header">

            <div className="insight-icon">
              <FiBarChart2 />
            </div>

            <div>

              <h3>
                Sales Overview
              </h3>

              <p>
                Current business activity
              </p>

            </div>

          </div>


          <div className="insight-stat">

            <span>
              Sales Transactions
            </span>

            <strong>
              {report.totalSales}
            </strong>

          </div>


          <div className="insight-stat">

            <span>
              Invoices Generated
            </span>

            <strong>
              {report.totalInvoices}
            </strong>

          </div>


          <div className="insight-stat">

            <span>
              Customers
            </span>

            <strong>
              {report.totalCustomers}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          SALES ANALYTICS
      ===================================================== */}

      <div className="reports-section">

        <div className="section-header">

          <div className="section-title">

            <div className="section-icon">
              <FiTrendingUp />
            </div>

            <div>

              <h2>
                Sales Analytics
              </h2>

              <p>
                Visual overview of your sales performance
              </p>

            </div>

          </div>

          <span className="live-indicator">
            <span></span>
            Live Data
          </span>

        </div>


        <div className="sales-chart-wrapper">

          {loading ? (

            <div className="reports-loading">
              Loading analytics...
            </div>

          ) : (

            <SalesChart
              report={report}
            />

          )}

        </div>

      </div>


      {/* =====================================================
          DATA TABLES
      ===================================================== */}

      <div className="reports-tables-grid">

        {/* ===================================================
            BEST PRODUCTS
        =================================================== */}

        <div className="reports-table-panel">

          <div className="table-panel-header">

            <div>

              <div className="table-panel-icon">
                <FiPackage />
              </div>

            </div>

            <div className="table-panel-title">

              <h2>
                Best Selling Products
              </h2>

              <p>
                Top performing products
              </p>

            </div>

            <span className="table-count">
              {report.bestProducts.length}
            </span>

          </div>


          <div className="table-scroll">

            <table className="professional-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity Sold</th>
                </tr>

              </thead>

              <tbody>

                {report.bestProducts.length >
                0 ? (

                  report.bestProducts.map(
                    (item, index) => (

                      <tr key={item._id}>

                        <td>
                          <span className="rank-number">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>
                        </td>

                        <td>

                          <div className="product-cell">

                            <div className="product-avatar">
                              <FiPackage />
                            </div>

                            <strong>
                              {
                                item.productName
                              }
                            </strong>

                          </div>

                        </td>

                        <td>

                          <span className="quantity-badge">
                            {
                              item.totalSold
                            }
                          </span>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="3"
                      className="empty-cell"
                    >
                      No product data available
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>


        {/* ===================================================
            LATEST SALES
        =================================================== */}

        <div className="reports-table-panel">

          <div className="table-panel-header">

            <div>

              <div className="table-panel-icon sales">
                <FiShoppingCart />
              </div>

            </div>

            <div className="table-panel-title">

              <h2>
                Latest Sales
              </h2>

              <p>
                Most recent transactions
              </p>

            </div>

            <span className="table-count">
              {report.latestSales.length}
            </span>

          </div>


          <div className="table-scroll">

            <table className="professional-table">

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>

              </thead>

              <tbody>

                {report.latestSales.length >
                0 ? (

                  report.latestSales.map(
                    (sale) => (

                      <tr key={sale._id}>

                        <td>

                          <div className="customer-cell">

                            <div className="customer-avatar">
                              {sale.customerName
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <strong>
                              {
                                sale.customerName
                              }
                            </strong>

                          </div>

                        </td>

                        <td>
                          <span className="product-name">
                            {sale.product?.name ||
                              sale.product}
                          </span>
                        </td>

                        <td>

                          <span className="quantity-badge">
                            {sale.quantity}
                          </span>

                        </td>

                        <td>

                          <strong className="sale-amount">
                            {formatCurrency(
                              sale.totalAmount
                            )}
                          </strong>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="empty-cell"
                    >
                      No recent sales available
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="reports-footer">

        <div>

          <FiClock />

          <span>
            Report data is based on your latest
            ERP transactions.
          </span>

        </div>

        <span>
          SmartBiz ERP • Business Intelligence
        </span>

      </div>

    </div>
  );
}

export default Reports;