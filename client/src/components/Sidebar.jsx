import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="logo">
        <h2>SmartBiz ERP</h2>
      </div>

      {/* User */}

      <div className="user-info">

        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>

        <h4>{user?.name || "Admin"}</h4>

        <p>{user?.email || "admin@gmail.com"}</p>

      </div>

      {/* Menu */}

      <nav className="sidebar-nav">

        <NavLink to="/dashboard" className="nav-link">
          <span>🏠</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/inventory" className="nav-link">
          <span>📦</span>
          <span>Inventory</span>
        </NavLink>

        <NavLink to="/sales" className="nav-link">
          <span>💰</span>
          <span>Sales</span>
        </NavLink>

        <NavLink to="/customers" className="nav-link">
          <span>👥</span>
          <span>Customers</span>
        </NavLink>

        <NavLink to="/invoices" className="nav-link">
          <span>🧾</span>
          <span>Invoices</span>
        </NavLink>

        <NavLink to="/reports" className="nav-link">
          <span>📊</span>
          <span>Reports</span>
        </NavLink>

        <NavLink to="/settings" className="nav-link">
          <span>⚙️</span>
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </aside>
  );
}

export default Sidebar;