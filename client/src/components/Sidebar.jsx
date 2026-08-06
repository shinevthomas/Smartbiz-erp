import "./Sidebar.css";

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

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <FaBoxes />,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: <FaShoppingCart />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: <FaFileInvoice />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const logout = () => {
    if (window.confirm("Logout from SmartBiz ERP?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <aside
      className={`sidebar ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* Top */}

      <div className="sidebar-top">

        <div className="logo-section">

          <div className="logo-circle">
            SB
          </div>

          {!collapsed && (
            <div className="logo-text">
              <h2>SmartBiz ERP</h2>
              <span>Business Suite</span>
            </div>
          )}

        </div>

        <button
          className="collapse-btn"
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          {collapsed ? (
            <FaChevronRight />
          ) : (
            <FaChevronLeft />
          )}
        </button>

      </div>

      {/* User */}

      {!collapsed && (
        <div className="sidebar-user">

          <div className="user-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <h3>
            {user?.name || "Administrator"}
          </h3>

          <p>System Administrator</p>

          <div className="status">
            <span className="dot"></span>
            Online
          </div>

        </div>
      )}

      {/* Menu */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
          >
            <div className="menu-icon">
              {item.icon}
            </div>

            {!collapsed && (
              <span>{item.name}</span>
            )}

          </NavLink>
        ))}

      </nav>

      {/* Storage */}

      {!collapsed && (
        <div className="sidebar-storage">

          <div className="storage-top">

            <span>Storage</span>

            <strong>72%</strong>

          </div>

          <div className="storage-bar">

            <div
              className="storage-fill"
              style={{ width: "72%" }}
            ></div>

          </div>

          <small>
            72 GB used of 100 GB
          </small>

        </div>
      )}

      {/* Logout */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />

        {!collapsed && (
          <span>Logout</span>
        )}

      </button>

    </aside>
  );
}

export default Sidebar;