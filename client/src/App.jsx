import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";

import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Customers from "./components/Customers";
import Invoices from "./components/Invoices";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

function App() {
  return (
    <Routes>

      {/* =====================================
          HOME PAGE
          First page when ERP opens
      ===================================== */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =====================================
          LOGIN
      ===================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =====================================
          REGISTER
      ===================================== */}

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =====================================
          DASHBOARD
      ===================================== */}

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />


      {/* =====================================
          INVENTORY
      ===================================== */}

      <Route
        path="/inventory"
        element={
          <Layout>
            <Inventory />
          </Layout>
        }
      />


      {/* =====================================
          SALES
      ===================================== */}

      <Route
        path="/sales"
        element={
          <Layout>
            <Sales />
          </Layout>
        }
      />


      {/* =====================================
          CUSTOMERS
      ===================================== */}

      <Route
        path="/customers"
        element={
          <Layout>
            <Customers />
          </Layout>
        }
      />


      {/* =====================================
          INVOICES
      ===================================== */}

      <Route
        path="/invoices"
        element={
          <Layout>
            <Invoices />
          </Layout>
        }
      />


      {/* =====================================
          REPORTS
      ===================================== */}

      <Route
        path="/reports"
        element={
          <Layout>
            <Reports />
          </Layout>
        }
      />


      {/* =====================================
          SETTINGS
      ===================================== */}

      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />


      {/* =====================================
          INVALID URL
          Send back to Home
      ===================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;