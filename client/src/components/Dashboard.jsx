import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>SmartBiz ERP</h2>

        {user && (
          <div className="user-info">
            <p className="user-name">
              👋 Welcome,
              <br />
              {user.name}
            </p>
          </div>
        )}

        <hr />

        <ul>
          <li>
            <Link className="menu-link" to="/dashboard">
              🏠 Dashboard
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/inventory">
              📦 Inventory
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/sales">
              💰 Sales
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/customers">
              👥 Customers
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/invoices">
              🧾 Invoices
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/reports">
              📊 Reports
            </Link>
          </li>

          <li>
            <Link className="menu-link" to="/settings">
              ⚙️ Settings
            </Link>
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1>Dashboard</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Products</h3>
            <h2>{stats.totalProducts}</h2>
          </div>

          <div className="card">
            <h3>Total Revenue</h3>
            <h2>₹{stats.totalRevenue.toLocaleString("en-IN")}</h2>
          </div>

          <div className="card">
            <h3>Total Customers</h3>
            <h2>{stats.totalCustomers}</h2>
          </div>

          <div className="card">
            <h3>Total Sales</h3>
            <h2>{stats.totalSales}</h2>
          </div>
        </div>
      </main>

    </div>
  );
}

export default Dashboard;