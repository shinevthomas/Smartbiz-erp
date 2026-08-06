import "./DashboardWidgets.css";

import {
  FiShoppingBag,
  FiAlertTriangle,
  FiArrowRight,
  FiPackage,
} from "react-icons/fi";

function DashboardWidgets({
  recentSales,
  lowStockProducts,
}) {

  return (

    <section className="dashboard-widgets">

      {/* ==========================
          RECENT SALES
      ========================== */}

      <div className="widget-card">

        <div className="widget-header">

          <div>

            <h2>Recent Sales</h2>

            <p>Latest completed orders</p>

          </div>

          <div className="widget-icon blue">

            <FiShoppingBag />

          </div>

        </div>

        {recentSales.length === 0 ? (

          <div className="empty-widget">

            <h3>No Sales Yet</h3>

            <p>Your completed sales will appear here.</p>

          </div>

        ) : (

          <div className="widget-list">

            {recentSales.map((sale) => (

              <div
                key={sale._id}
                className="widget-item"
              >

                <div className="widget-avatar">

                  {(sale.customerName || "A")
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div className="widget-content">

                  <h4>{sale.customerName}</h4>

                  <p>

                    {sale.product?.name ||
                      "Product"}

                  </p>

                </div>

                <div className="widget-right">

                  <strong>

                    ₹{Number(
                      sale.totalAmount
                    ).toLocaleString("en-IN")}

                  </strong>

                  <small>

                    {new Date(
                      sale.createdAt
                    ).toLocaleDateString()}

                  </small>

                </div>

              </div>

            ))}

          </div>

        )}

        <button className="widget-footer">

          View All Sales

          <FiArrowRight />

        </button>

      </div>

      {/* ==========================
          LOW STOCK
      ========================== */}

      <div className="widget-card">

        <div className="widget-header">

          <div>

            <h2>Inventory Alerts</h2>

            <p>Products requiring attention</p>

          </div>

          <div className="widget-icon orange">

            <FiAlertTriangle />

          </div>

        </div>

        {lowStockProducts.length === 0 ? (

          <div className="empty-widget">

            <h3>Inventory Healthy 🎉</h3>

            <p>No products are running low.</p>

          </div>

        ) : (

          <div className="widget-list">

            {lowStockProducts.map((product) => (

              <div
                key={product._id}
                className="widget-item"
              >

                <div className="product-box">

                  <FiPackage />

                </div>

                <div className="widget-content">

                  <h4>{product.name}</h4>

                  <p>

                    SKU : {product.sku || "N/A"}

                  </p>

                </div>

                <div className="widget-right">

                  <span
                    className={
                      product.stock <= 5
                        ? "danger"
                        : "warning-badge"
                    }
                  >

                    {product.stock} Left

                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

        <button className="widget-footer">

          Manage Inventory

          <FiArrowRight />

        </button>

      </div>

    </section>

  );

}

export default DashboardWidgets;