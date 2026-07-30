import "./DashboardOverview.css";

import {
  FiActivity,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiFileText,
  FiPlus,
  FiArrowRight,
} from "react-icons/fi";

function DashboardOverview({
  totalRevenue,
  totalSales,
  totalCustomers,
  totalProducts,
  totalInvoices,
}) {

  const actions = [
    {
      title: "New Sale",
      icon: <FiShoppingCart />,
      color: "#2563eb",
    },
    {
      title: "Add Product",
      icon: <FiPackage />,
      color: "#10b981",
    },
    {
      title: "New Customer",
      icon: <FiUsers />,
      color: "#f59e0b",
    },
    {
      title: "Create Invoice",
      icon: <FiFileText />,
      color: "#ef4444",
    },
  ];

  return (

    <section className="dashboard-overview">

      {/* Business Overview */}

      <div className="overview-card">

        <div className="overview-header">

          <div>

            <h2>Business Overview</h2>

            <p>Today's Business Summary</p>

          </div>

          <FiActivity className="overview-icon" />

        </div>

        <div className="overview-grid">

          <div>

            <h3>
              ₹{Number(totalRevenue).toLocaleString("en-IN")}
            </h3>

            <span>Total Revenue</span>

          </div>

          <div>

            <h3>{totalSales}</h3>

            <span>Sales</span>

          </div>

          <div>

            <h3>{totalCustomers}</h3>

            <span>Customers</span>

          </div>

          <div>

            <h3>{totalProducts}</h3>

            <span>Products</span>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="overview-card">

        <div className="overview-header">

          <div>

            <h2>Quick Actions</h2>

            <p>Frequently used operations</p>

          </div>

          <FiPlus className="overview-icon blue" />

        </div>

        <div className="action-grid">

          {actions.map((item) => (

            <button
              key={item.title}
              className="action-btn"
            >

              <div
                className="action-icon"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <span>{item.title}</span>

            </button>

          ))}

        </div>

      </div>

      {/* Performance */}

      <div className="overview-card">

        <div className="overview-header">

          <div>

            <h2>Performance</h2>

            <p>Monthly Progress</p>

          </div>

          <FiArrowRight className="overview-icon green" />

        </div>

        <div className="progress-row">

          <span>Revenue Target</span>

          <strong>84%</strong>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: "84%" }}
          />

        </div>

        <div className="progress-row">

          <span>Invoices</span>

          <strong>{totalInvoices}</strong>

        </div>

      </div>

    </section>

  );

}

export default DashboardOverview;