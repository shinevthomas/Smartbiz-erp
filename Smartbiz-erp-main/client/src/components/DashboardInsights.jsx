import "./DashboardInsights.css";

import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

function DashboardInsights({
  totalRevenue,
  totalSales,
  totalCustomers,
  totalProducts,
}) {
  const revenueGrowth = 18;
  const salesGrowth = 12;
  const customerGrowth = 9;
  const inventoryHealth = 94;

  return (
    <section className="dashboard-insights">

      <div className="insight-card revenue">

        <div className="insight-top">

          <div className="insight-icon">

            <FiDollarSign />

          </div>

          <span className="growth positive">

            <FiTrendingUp />

            +{revenueGrowth}%

          </span>

        </div>

        <h2>
          ₹{Number(totalRevenue).toLocaleString("en-IN")}
        </h2>

        <p>Total Revenue</p>

      </div>

      <div className="insight-card sales">

        <div className="insight-top">

          <div className="insight-icon">

            <FiTrendingUp />

          </div>

          <span className="growth positive">

            +{salesGrowth}%

          </span>

        </div>

        <h2>{totalSales}</h2>

        <p>Completed Sales</p>

      </div>

      <div className="insight-card customers">

        <div className="insight-top">

          <div className="insight-icon">

            <FiUsers />

          </div>

          <span className="growth positive">

            +{customerGrowth}%

          </span>

        </div>

        <h2>{totalCustomers}</h2>

        <p>Customers</p>

      </div>

      <div className="insight-card inventory">

        <div className="insight-top">

          <div className="insight-icon">

            <FiTrendingDown />

          </div>

          <span className="growth neutral">

            {inventoryHealth}%

          </span>

        </div>

        <h2>{totalProducts}</h2>

        <p>Inventory Health</p>

      </div>

    </section>
  );
}

export default DashboardInsights;