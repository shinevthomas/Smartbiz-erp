import "./Dashboard.css";
import { useEffect, useState } from "react";
import api from "../api";

// Dashboard Components
import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardInsights from "./DashboardInsights";
import DashboardWidgets from "./DashboardWidgets";
import DashboardOverview from "./DashboardOverview";
function Dashboard() {

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
api.get("/sales"),
api.get("/products"),
api.get("/customers"),
api.get("/invoices"),

      ]);

      const sales = salesRes.data;
      const products = productsRes.data;
      const customers = customersRes.data;
      const invoices = invoicesRes.data;

      /* ==========================
         TOTAL REVENUE
      ========================== */

      const totalRevenue = sales.reduce(

        (sum, sale) =>

          sum + Number(sale.totalAmount || 0),

        0

      );

      /* ==========================
         LAST 6 MONTHS
      ========================== */

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

        const index =
          (currentMonth - i + 12) % 12;

        lastSixMonths.push({

          month: months[index],

          revenue: 0,

          sales: 0,

        });

      }

      /* ==========================
         MONTHLY DATA
      ========================== */

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
            /* ==========================
         CHART DATA
      ========================== */

      const revenueData = lastSixMonths.map((item) => ({
        month: item.month,
        revenue: item.revenue,
      }));

      const salesData = lastSixMonths.map((item) => ({
        month: item.month,
        sales: item.sales,
      }));

      /* ==========================
         RECENT SALES
      ========================== */

      const recentSales = [...sales]
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 5);

      /* ==========================
         LOW STOCK PRODUCTS
      ========================== */

      const lowStockProducts = products.filter(
        (product) => product.stock < 10
      );

      /* ==========================
         UPDATE DASHBOARD STATE
      ========================== */

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

    } catch (error) {

      console.error(error);

    }

  };
    /* ==========================================
     GREETING
  ========================================== */

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <div className="dashboard-page">

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="dashboard-hero">

        <div className="hero-left">

          <span className="hero-badge">

            SmartBiz ERP Dashboard

          </span>

          <h1>

            {greeting},{" "}
            {user.name || "Administrator"} 👋

          </h1>

          <p>

            Welcome back! Here's a complete overview of
            your business performance, sales, customers,
            inventory and revenue for today.

          </p>

          <div className="hero-stats">

            <div className="hero-stat">

              <h3>

                ₹{dashboardData.totalRevenue.toLocaleString("en-IN")}

              </h3>

              <span>Total Revenue</span>

            </div>

            <div className="hero-stat">

              <h3>

                {dashboardData.totalSales}

              </h3>

              <span>Total Orders</span>

            </div>

            <div className="hero-stat">

              <h3>

                {dashboardData.totalCustomers}

              </h3>

              <span>Customers</span>

            </div>

            <div className="hero-stat">

              <h3>

                {dashboardData.totalProducts}

              </h3>

              <span>Products</span>

            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-date">

            {today}

          </div>

          <div className="hero-actions">

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

        </div>

      </section>
            {/* ==========================================
          KPI CARDS
      ========================================== */}

      <DashboardCards
        totalRevenue={dashboardData.totalRevenue}
        totalSales={dashboardData.totalSales}
        totalCustomers={dashboardData.totalCustomers}
        totalProducts={dashboardData.totalProducts}
        totalInvoices={dashboardData.totalInvoices}
        lowStock={dashboardData.lowStock}
      />

      {/* ==========================================
          REVENUE & SALES CHARTS
      ========================================== */}

      <DashboardCharts
        revenueData={dashboardData.revenueData}
        salesData={dashboardData.salesData}
      />

      {/* ==========================================
          BUSINESS INSIGHTS
      ========================================== */}

      <DashboardInsights
        totalRevenue={dashboardData.totalRevenue}
        totalSales={dashboardData.totalSales}
        totalCustomers={dashboardData.totalCustomers}
        totalProducts={dashboardData.totalProducts}
      />

      {/* ==========================================
          RECENT SALES & LOW STOCK
      ========================================== */}

      <DashboardWidgets
        recentSales={dashboardData.recentSales}
        lowStockProducts={dashboardData.lowStockProducts}
      />

      {/* ==========================================
          BUSINESS OVERVIEW
      ========================================== */}

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