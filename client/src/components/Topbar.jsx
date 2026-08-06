import "./Topbar.css";

import { useState, useEffect } from "react";

import {
  FiSearch,
  FiBell,
  FiSettings,
  FiChevronDown,
  FiMoon,
  FiSun,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

function Topbar({ collapsed, setCollapsed }) {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [currentTime, setCurrentTime] = useState(new Date());

  const [showProfile, setShowProfile] = useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Printer Paper is running low.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "New Order",
      message: "A new customer order has been placed.",
      time: "15 min ago",
    },
    {
      id: 3,
      title: "Invoice Paid",
      message: "Invoice INV-1008 has been paid.",
      time: "1 hour ago",
    },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="topbar">

      {/* Left Section */}

      <div className="topbar-left">

        <button
          className="menu-toggle"
          onClick={() =>
            setCollapsed(!collapsed)
          }
        >
          <FiMenu />
        </button>

        <div>

          <h1>Dashboard</h1>

          <p>
            Welcome back,
            <strong>
              {" "}
              {user?.name || "Administrator"}
            </strong>
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="topbar-search">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products, customers, invoices..."
        />

      </div>

      {/* Right */}

      <div className="topbar-right">

        <div className="topbar-time">

          {currentTime.toLocaleDateString(
            "en-GB",
            {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )}

          {" • "}

          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}

        </div>

        {/* Notifications */}

        <div className="notification-wrapper">

          <button
            className="top-icon"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
          >
            <FiBell />

            <span className="badge">
              {notifications.length}
            </span>

          </button>

          {showNotifications && (

            <div className="notification-dropdown">

              <h3>Notifications</h3>

              {notifications.map((item) => (

                <div
                  key={item.id}
                  className="notification-item"
                >
                  <h4>{item.title}</h4>

                  <p>{item.message}</p>

                  <small>{item.time}</small>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Theme */}

        <button
          className="top-icon"
          onClick={toggleTheme}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Settings */}

        <button className="top-icon">
          <FiSettings />
        </button>

        {/* Profile */}

        <div className="profile-wrapper">

          <div
            className="profile-box"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >

            <div className="avatar">

              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}

            </div>

            <div className="profile-info">

              <h4>
                {user?.name ||
                  "Administrator"}
              </h4>

              <small>
                System Administrator
              </small>

            </div>

            <FiChevronDown />

          </div>

          {showProfile && (

            <div className="profile-dropdown">

              <button>

                <FiUser />

                My Profile

              </button>

              <button>

                <FiSettings />

                Account Settings

              </button>

              <button
                onClick={logout}
              >

                <FiLogOut />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;