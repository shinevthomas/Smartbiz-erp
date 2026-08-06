import "./DashboardHero.css";

import {
  FiPlus,
  FiShoppingBag,
  FiUsers,
  FiFileText,
} from "react-icons/fi";

function DashboardHero() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="dashboard-hero">

      <div className="hero-left">

        <span className="hero-badge">
          SmartBiz ERP
        </span>

        <h1>
          Welcome back,
          <br />
          {user?.name || "Administrator"} 👋
        </h1>

        <p>
          Here's a complete overview of your
          business performance, revenue,
          inventory, customers and sales today.
        </p>

        <div className="hero-date">
          {date}
        </div>

      </div>

      <div className="hero-actions">

        <button className="primary-btn">
          <FiShoppingBag />
          New Sale
        </button>

        <button>
          <FiPlus />
          Product
        </button>

        <button>
          <FiUsers />
          Customer
        </button>

        <button>
          <FiFileText />
          Invoice
        </button>

      </div>

    </section>
  );
}

export default DashboardHero;