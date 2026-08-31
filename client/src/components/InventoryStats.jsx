import "./InventoryStats.css";

import {
  FiPackage,
  FiTrendingUp,
  FiAlertTriangle,
  FiBox,
} from "react-icons/fi";

function InventoryStats({
  totalProducts,
  totalStock,
  inventoryValue,
  lowStockProducts,
  outOfStockProducts,
}) {
  const stats = [
    {
      icon: <FiPackage />,
      color: "blue",
      value: totalProducts,
      label: "Total Products",
      hint: "Items in catalog",
      badge: "●",
      warn: false,
    },
    {
      icon: <FiTrendingUp />,
      color: "green",
      value: "₹" + inventoryValue.toLocaleString("en-IN"),
      label: "Inventory Value",
      hint: "At purchase price",
      badge: "●",
      warn: false,
    },
    {
      icon: <FiAlertTriangle />,
      color: "orange",
      value: lowStockProducts,
      label: "Low Stock",
      hint: (
        <>
          <span className="low-dot"></span>
          {outOfStockProducts} out of stock
        </>
      ),
      badge: "⚠️",
      warn: true,
    },
    {
      icon: <FiBox />,
      color: "purple",
      value: totalStock,
      label: "Available Stock",
      hint: "Units on hand",
      badge: "●",
      warn: false,
    },
  ];

  return (
    <div className="inventory-stats">

      {stats.map((stat) => (
        <div
          className="inventory-stat-card"
          key={stat.label}
        >
          <div className="stat-top">

            <div className={`stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <div className={`stat-change ${stat.warn ? "warn" : ""}`}>
              {stat.badge}
            </div>

          </div>

          <h2>
            {stat.value}
          </h2>

          <p>{stat.label}</p>

          {stat.hint && (
            <small className="stat-hint">
              {stat.hint}
            </small>
          )}

        </div>
      ))}

    </div>
  );
}

export default InventoryStats;
