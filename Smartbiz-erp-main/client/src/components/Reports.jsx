import { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";
import SalesChart from "./SalesChart";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/reports"
      );

      setReport(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  /* ===========================
      EXPORT FUNCTIONS
      (Part 2 continues here)
  =========================== */
// ===========================
// EXPORT TO EXCEL
// ===========================
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

// ===========================
// EXPORT TO PDF
// ===========================
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("SmartBiz ERP Report", 14, 18);

  autoTable(doc, {
    startY: 30,
    head: [["Customer", "Product", "Qty", "Total"]],
    body: report.latestSales.map((sale) => [
      sale.customerName,
      sale.product?.name || sale.product,
      sale.quantity,
      "₹" + Number(sale.totalAmount).toLocaleString("en-IN"),
    ]),
  });

  doc.save("Sales_Report.pdf");
};
  return (

    <div className="reports-container">

      <h1>Reports Dashboard</h1>

      {/* SUMMARY CARDS */}

      <div className="cards">

        <div className="card">
          <h3>Products</h3>
          <h2>{report.totalProducts}</h2>
        </div>

        <div className="card">
          <h3>Customers</h3>
          <h2>{report.totalCustomers}</h2>
        </div>

        <div className="card">
          <h3>Sales</h3>
          <h2>{report.totalSales}</h2>
        </div>

        <div className="card">
          <h3>Invoices</h3>
          <h2>{report.totalInvoices}</h2>
        </div>

      </div>

      {/* EXPORT BUTTONS */}

      <div className="report-buttons">

        <button onClick={exportExcel}>
          📗 Export Excel
        </button>

        <button onClick={exportPDF}>
          📄 Export PDF
        </button>

      </div>

      {/* BAR CHART */}

      <div className="chart-card">

        <SalesChart report={report} />

      </div>

      {/* REVENUE */}

      <div className="revenue-card">

        <h2>Total Revenue</h2>

        <h1>
          ₹{Number(report.totalRevenue).toLocaleString("en-IN")}
        </h1>

      </div>

      {/* TABLES */}

      <div className="tables">

        {/* BEST PRODUCTS */}

        <div className="table-box">

          <h2>🔥 Best Selling Products</h2>

          <table>

            <thead>

              <tr>

                <th>#</th>

              <th>Product</th>

                <th>Quantity Sold</th>

              </tr>

            </thead>

            <tbody>

              {report.bestProducts.length > 0 ? (

                report.bestProducts.map((item, index) => (

                  <tr key={item._id}>

                    <td>{index + 1}</td>
<td>{item.productName}</td>

                    <td>{item.totalSold}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="3">

                    No Data Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* LATEST SALES */}

        <div className="table-box">

          <h2>🛒 Latest Sales</h2>

          <table>

            <thead>

              <tr>

                <th>Customer</th>

                <th>Product</th>

                <th>Qty</th>

                <th>Total</th>

              </tr>

            </thead>

            <tbody>

              {report.latestSales.length > 0 ? (

                report.latestSales.map((sale) => (

                  <tr key={sale._id}>

                    <td>{sale.customerName}</td>

                    <td>{sale.product?.name}</td>

                    <td>{sale.quantity}</td>

                    <td>

                      ₹
                      {Number(
                        sale.totalAmount
                      ).toLocaleString("en-IN")}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="4">

                    No Data Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Reports;