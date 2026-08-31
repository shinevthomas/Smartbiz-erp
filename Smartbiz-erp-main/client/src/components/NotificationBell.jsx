import "./NotificationBell.css";

import { useState } from "react";

import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiShoppingCart,
  FiPackage,
} from "react-icons/fi";

function NotificationBell() {

  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      icon: <FiShoppingCart />,
      title: "New Sale",
      message: "A new sale has been completed.",
      time: "2 min ago",
      color: "#2563eb",
    },
    {
      id: 2,
      icon: <FiPackage />,
      title: "Inventory Alert",
      message: "3 products are running low on stock.",
      time: "12 min ago",
      color: "#f59e0b",
    },
    {
      id: 3,
      icon: <FiCheckCircle />,
      title: "Invoice Created",
      message: "Invoice INV-1032 generated successfully.",
      time: "1 hour ago",
      color: "#10b981",
    },
    {
      id: 4,
      icon: <FiAlertCircle />,
      title: "System Update",
      message: "Daily database backup completed.",
      time: "Today",
      color: "#8b5cf6",
    },
  ];

  return (

    <div className="notification-wrapper">

      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
      >

        <FiBell />

        <span className="notification-badge">
          {notifications.length}
        </span>

      </button>

      {open && (

        <div className="notification-panel">

          <div className="notification-header">

            <h3>Notifications</h3>

            <span>{notifications.length} New</span>

          </div>

          <div className="notification-list">

            {notifications.map((item) => (

              <div
                className="notification-item"
                key={item.id}
              >

                <div
                  className="notification-icon"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <div className="notification-content">

                  <h4>{item.title}</h4>

                  <p>{item.message}</p>

                  <small>{item.time}</small>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );

}

export default NotificationBell;