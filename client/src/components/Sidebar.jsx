import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBoxes,
  FaShoppingCart,
  FaUsers,
  FaFileInvoice,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-inner">

        {/* Collapse Button */}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>

        {/* Logo */}

        <div className="sidebar-logo">

          <div className="logo-circle">
            SB
          </div>

          {!collapsed && (
            <div>
              <h2>SmartBiz ERP</h2>
              <p>Business Management</p>
            </div>
          )}

        </div>

        {/* User */}

        {!collapsed && (
          <div className="sidebar-user">

            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <h3>{user?.name || "Administrator"}</h3>

            <span>System Administrator</span>

            <small>
              {user?.email || "admin@example.com"}
            </small>

          </div>
        )}

        {/* Scrollable Menu */}

        <div className="sidebar-menu-wrapper">

          <nav className="sidebar-menu">

            <NavLink to="/dashboard" className="menu-item">
              <div className="menu-icon">
                <FaHome />
              </div>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/inventory" className="menu-item">
              <div className="menu-icon">
                <FaBoxes />
              </div>
              <span>Inventory</span>
            </NavLink>

            <NavLink to="/sales" className="menu-item">
              <div className="menu-icon">
                <FaShoppingCart />
              </div>
              <span>Sales</span>
            </NavLink>

            <NavLink to="/customers" className="menu-item">
              <div className="menu-icon">
                <FaUsers />
              </div>
              <span>Customers</span>
            </NavLink>

            <NavLink to="/invoices" className="menu-item">
              <div className="menu-icon">
                <FaFileInvoice />
              </div>
              <span>Invoices</span>
            </NavLink>

            <NavLink to="/reports" className="menu-item">
              <div className="menu-icon">
                <FaChartBar />
              </div>
              <span>Reports</span>
            </NavLink>

            <NavLink to="/settings" className="menu-item">
              <div className="menu-icon">
                <FaCog />
              </div>
              <span>Settings</span>
            </NavLink>

          </nav>

        </div>

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;