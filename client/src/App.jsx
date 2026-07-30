import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Website Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import WhyChoose from "./components/WhyChoose";
import Footer from "./components/Footer";

// Pages
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Customers from "./components/Customers";
import Invoices from "./components/Invoices";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Register from "./components/Register";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>

      {/* Website */}

      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <Login />
            <Footer />
          </>
        }
      />

      <Route
        path="/register"
        element={
          <>
            <Navbar />
            <Register />
            <Footer />
          </>
        }
      />

      {/* ERP */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Layout>
              <Inventory />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <Layout>
              <Sales />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Layout>
              <Customers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Layout>
              <Invoices />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/settings"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Layout>
        <Settings />
      </Layout>
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;