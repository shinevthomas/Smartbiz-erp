import "./DashboardCards.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaRupeeSign,
  FaShoppingCart,
  FaUsers,
  FaBoxes,
  FaFileInvoice,
  FaExclamationTriangle,
  FaArrowUp,
} from "react-icons/fa";

function DashboardCards({
  totalRevenue,
  totalSales,
  totalCustomers,
  totalProducts,
  totalInvoices,
  lowStock,
}) {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Revenue",
      value: `₹${Number(totalRevenue).toLocaleString("en-IN")}`,
      subtitle: "Total Business Revenue",
      trend: "+12.4%",
      color: "#2563eb",
      icon: <FaRupeeSign />,
      path: "/reports",
    },

    {
      title: "Sales",
      value: totalSales.toLocaleString(),
      subtitle: "Completed Orders",
      trend: "+8.2%",
      color: "#10b981",
      icon: <FaShoppingCart />,
      path: "/sales",
    },

    {
      title: "Customers",
      value: totalCustomers.toLocaleString(),
      subtitle: "Registered Customers",
      trend: "+6.8%",
      color: "#f59e0b",
      icon: <FaUsers />,
      path: "/customers",
    },

    {
      title: "Products",
      value: totalProducts.toLocaleString(),
      subtitle: "Inventory Items",
      trend: "+4.1%",
      color: "#8b5cf6",
      icon: <FaBoxes />,
      path: "/inventory",
    },

    {
      title: "Invoices",
      value: totalInvoices.toLocaleString(),
      subtitle: "Generated Invoices",
      trend: "+9.5%",
      color: "#ef4444",
      icon: <FaFileInvoice />,
      path: "/invoices",
    },

    {
      title: "Low Stock",
      value: lowStock,
      subtitle:
        lowStock === 0
          ? "Everything is in Stock"
          : "Requires Attention",
      trend: lowStock === 0 ? "Healthy" : "Alert",
      color: "#dc2626",
      icon: <FaExclamationTriangle />,
      path: "/inventory",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          className="dashboard-card"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: index * 0.08,
          }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          onClick={() => navigate(card.path)}
        >
          <div className="card-header">
            <div
              className="card-icon"
              style={{
                background: `${card.color}15`,
                color: card.color,
              }}
            >
              {card.icon}
            </div>

            <div className="trend-badge">
              <FaArrowUp />
              <span>{card.trend}</span>
            </div>
          </div>

          <div className="card-body">
            <h5>{card.title}</h5>

            <h2>{card.value}</h2>

            <p>{card.subtitle}</p>
          </div>

          <div className="card-footer">
            <span className="footer-text">
              Compared to last month
            </span>

            <span
              className="footer-dot"
              style={{
                background: card.color,
              }}
            ></span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardCards;