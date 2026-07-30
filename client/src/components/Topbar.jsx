import "./Topbar.css";
import { useState, useEffect } from "react";

import {
  FiSearch,
  FiSettings,
  FiChevronDown,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Topbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [currentTime, setCurrentTime] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">

      {/* LEFT */}

      <div className="topbar-left">

        <h1>Dashboard</h1>

        <p>
          Welcome back,
          <strong> {user?.name || "Administrator"}</strong>
        </p>

      </div>

      {/* SEARCH */}

      <div className="topbar-search">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search products, customers, invoices..."
        />

      </div>

      {/* RIGHT */}

      <div className="topbar-right">

        <div className="topbar-time">
          {currentTime}
        </div>

        {/* Notification */}

        <NotificationBell />

        {/* Settings */}

        <button
          className="top-icon"
          onClick={() => navigate("/settings")}
          title="Settings"
        >
          <FiSettings />
        </button>

        {/* Profile */}

        <div className="profile-wrapper">

          <div
            className="profile-box"
            onClick={() => setProfileOpen(!profileOpen)}
          >

            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="profile-info">

              <h4>{user?.name || "Administrator"}</h4>

              <small>System Administrator</small>

            </div>

            <FiChevronDown />

          </div>

          {profileOpen && (

            <div className="profile-dropdown">

              <button onClick={() => navigate("/settings")}>
                <FiUser />
                My Profile
              </button>

              <button onClick={() => navigate("/settings")}>
                <FiSettings />
                Settings
              </button>

              <button onClick={logout}>
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