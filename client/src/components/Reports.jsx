import { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";

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
      const res = await axios.get("http://localhost:5000/api/reports");
      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reports-container">

      <h1>Reports Dashboard</h1>

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

      <div className="revenue-card">
        <h2>Total Revenue</h2>
        <h1>₹{Number(report.totalRevenue).toLocaleString("en-IN")}</h1>
      </div>

      <div className="tables">

        <div className="table-box">

          <h2>🔥 Best Selling Products</h2>

          <table>

            <thead>
              <tr>
                <th>#</th>
                <th>Product ID</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>

            <tbody>

              {report.bestProducts.map((item, index) => (

                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{item.totalSold}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

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

              {report.latestSales.map((sale) => (

                <tr key={sale._id}>
                  <td>{sale.customerName}</td>
                  <td>{sale.product?.name}</td>
                  <td>{sale.quantity}</td>
                  <td>
                    ₹{Number(sale.totalAmount).toLocaleString("en-IN")}
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;