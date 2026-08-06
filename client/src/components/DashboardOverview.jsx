import "./DashboardOverview.css";

import {
  FiTrendingUp,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";

function DashboardOverview({
  totalRevenue,
  totalSales,
  totalCustomers,
  totalProducts,
  totalInvoices,
}) {

  const completion = Math.min(
    Math.round(
      (totalSales +
        totalCustomers +
        totalProducts +
        totalInvoices) /
        4
    ),
    100
  );

  return (

    <section className="dashboard-overview">

      <div className="overview-left">

        <div className="overview-header">

          <h2>Business Overview</h2>

          <span className="overview-badge">

            <FiTrendingUp />

            Business Healthy

          </span>

        </div>

        <p>
          A quick summary of your company's current
          performance and operational statistics.
        </p>

        <div className="overview-grid">

          <div className="overview-item">

            <FiDollarSign />

            <div>

              <h3>
                ₹{Number(totalRevenue).toLocaleString("en-IN")}
              </h3>

              <span>Total Revenue</span>

            </div>

          </div>

          <div className="overview-item">

            <FiShoppingCart />

            <div>

              <h3>{totalSales}</h3>

              <span>Sales</span>

            </div>

          </div>

          <div className="overview-item">

            <FiUsers />

            <div>

              <h3>{totalCustomers}</h3>

              <span>Customers</span>

            </div>

          </div>

          <div className="overview-item">

            <FiPackage />

            <div>

              <h3>{totalProducts}</h3>

              <span>Products</span>

            </div>

          </div>

        </div>

      </div>

      <div className="overview-right">

        <div className="health-circle">

          <h1>{completion}%</h1>

          <span>Business Score</span>

        </div>

        <div className="status-box">

          <FiCheckCircle />

          <div>

            <strong>System Status</strong>

            <small>Everything is running normally</small>

          </div>

        </div>

      </div>

    </section>

  );

}

export default DashboardOverview;