import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalSales: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {

  toast.success("Logout Successful!");

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setTimeout(() => {
    navigate("/login");
  }, 1000);

}
  

  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="card">
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue.toLocaleString()}</h2>
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

      {/* Bottom Section */}

      <div className="dashboard-bottom">

        {/* Recent Activity */}

        <div className="recent-card">

          <h2>Recent Activity</h2>

          <ul>
            <li>📦 Product Added</li>
            <li>💰 New Sale Completed</li>
            <li>👤 Customer Registered</li>
            <li>🧾 Invoice Generated</li>
          </ul>

        </div>

        {/* Quick Actions */}

        <div className="recent-card">

          <h2>Quick Actions</h2>

          <Link to="/inventory">
            <button>Add Product</button>
          </Link>

          <Link to="/sales">
            <button>Create Sale</button>
          </Link>

          <Link to="/reports">
            <button>View Reports</button>
          </Link>

        </div>

        {/* Logged In User */}

        <div className="user-card">

          <h2>Logged In User</h2>

          <p>
            <strong>Name:</strong> {user?.name || "Admin"}
          </p>

          <p>
            <strong>Email:</strong> {user?.email || "admin@gmail.com"}
          </p>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;