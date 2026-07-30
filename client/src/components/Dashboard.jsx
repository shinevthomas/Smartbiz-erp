import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardWidgets from "./DashboardWidgets";
import NotificationBell from "./NotificationBell";
import DashboardOverview from "./DashboardOverview";
function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    revenueData: [],
    salesData: [],
    recentSales: [],
    lowStockProducts: [],
    totalRevenue: 0,
    totalSales: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalInvoices: 0,
    lowStock: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        salesRes,
        productsRes,
        customersRes,
        invoicesRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/sales"),
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/customers"),
        axios.get("http://localhost:5000/api/invoices"),
      ]);

      const sales = salesRes.data;
      const products = productsRes.data;
      const customers = customersRes.data;
      const invoices = invoicesRes.data;

      const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.totalAmount || 0),
        0
      );

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const currentMonth = new Date().getMonth();

      const lastSixMonths = [];

      for (let i = 5; i >= 0; i--) {
        const index = (currentMonth - i + 12) % 12;

        lastSixMonths.push({
          month: months[index],
          revenue: 0,
          sales: 0,
        });
      }

      sales.forEach((sale) => {
        const month = new Date(
          sale.createdAt
        ).toLocaleString("default", {
          month: "short",
        });

        const item = lastSixMonths.find(
          (m) => m.month === month
        );

        if (item) {
          item.revenue += Number(
            sale.totalAmount || 0
          );
          item.sales += 1;
        }
      });

      const revenueData = lastSixMonths.map(
        (item) => ({
          month: item.month,
          revenue: item.revenue,
        })
      );

      const salesData = lastSixMonths.map(
        (item) => ({
          month: item.month,
          sales: item.sales,
        })
      );

      const recentSales = [...sales]
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 5);

      const lowStockProducts = products.filter(
        (product) => product.stock < 10
      );

      setDashboardData({
        revenueData,
        salesData,
        recentSales,
        lowStockProducts,
        totalRevenue,
        totalSales: sales.length,
        totalCustomers: customers.length,
        totalProducts: products.length,
        totalInvoices: invoices.length,
        lowStock: lowStockProducts.length,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
return (
  <div className="dashboard-page">

    {/* =========================
        HERO SECTION
    ========================== */}

    <section className="dashboard-hero">

      <div className="hero-left">

        <span className="hero-badge">
          SmartBiz ERP
        </span>

        <h1>
          {greeting}, {JSON.parse(localStorage.getItem("user"))?.name || "Administrator"} 👋
        </h1>

        <p>
          Monitor your company's performance, track revenue,
          manage inventory, and stay updated with real-time
          business insights.
        </p>

      </div>

      <div className="hero-right">

        <button className="hero-primary">
          + New Sale
        </button>

        <button className="hero-secondary">
          + Product
        </button>

        <button className="hero-secondary">
          + Customer
        </button>

        <button className="hero-secondary">
          + Invoice
        </button>

      </div>

    </section>

    {/* =========================
        KPI CARDS
    ========================== */}

    <DashboardCards
      totalRevenue={dashboardData.totalRevenue}
      totalSales={dashboardData.totalSales}
      totalCustomers={dashboardData.totalCustomers}
      totalProducts={dashboardData.totalProducts}
      totalInvoices={dashboardData.totalInvoices}
      lowStock={dashboardData.lowStock}
    />

    {/* =========================
        CHARTS
    ========================== */}

    <DashboardCharts
      revenueData={dashboardData.revenueData}
      salesData={dashboardData.salesData}
    />

    {/* =========================
        WIDGETS
    ========================== */}

    <DashboardWidgets
      recentSales={dashboardData.recentSales}
      lowStockProducts={dashboardData.lowStockProducts}
    />
{/* =========================
    BUSINESS OVERVIEW
========================= */}

<DashboardOverview
  totalRevenue={dashboardData.totalRevenue}
  totalSales={dashboardData.totalSales}
  totalCustomers={dashboardData.totalCustomers}
  totalProducts={dashboardData.totalProducts}
  totalInvoices={dashboardData.totalInvoices}
/>
  </div>
);
}

export default Dashboard;