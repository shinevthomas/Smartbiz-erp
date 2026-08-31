import React from "react";
import "./DashboardHeader.css";

const SVGMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const SVGSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SVGMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SVGBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

function DashboardHeader({ userName = "Rajesh Admin", userRole = "Administrator" }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="dashboard-top-nav">
      <div className="nav-left">
        <button className="menu-toggle-btn" aria-label="Toggle Navigation">
          <SVGMenu />
        </button>

        <div className="search-bar-wrapper">
          <span className="search-bar-icon">
            <SVGSearch />
          </span>
          <input type="text" placeholder="Search invoices, customers, products..." />
        </div>
      </div>

      <div className="nav-right">
        <button className="icon-action-btn" aria-label="Toggle Dark Mode">
          <SVGMoon />
        </button>

        <button className="icon-action-btn" aria-label="Notifications">
          <SVGBell />
          <span className="badge-count">3</span>
        </button>

        <div className="user-profile-badge">
          <div className="user-avatar-circle">{getInitials(userName)}</div>
          <div className="user-details-text">
            <span className="name">{userName}</span>
            <span className="role">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;