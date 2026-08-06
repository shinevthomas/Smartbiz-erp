import "./ProductTable.css";

import {
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

function ProductTable({
  filteredProducts = [],
  editProduct,
  deleteProduct,
}) {
  return (
    <div className="product-table-card">

      {/* ==========================
          TABLE HEADER
      ========================== */}

      <div className="table-header">

        <h2>Products</h2>

        <span>
          {filteredProducts.length} Product
          {filteredProducts.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* ==========================
          TABLE
      ========================== */}

      <div className="table-responsive">

        <table className="product-table">

          <thead>

            <tr>

              <th>Product</th>

              <th>Category</th>

              <th>Supplier</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="no-data"
                >
                  No products found.
                </td>

              </tr>

            ) : (

              filteredProducts.map((product) => (

                <tr key={product._id}>

                  {/* PRODUCT */}

                  <td>

                    <div className="product-info">

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/60x60?text=No+Image"
                        }
                        alt={product.name}
                        className="product-image"
                      />

                      <div>

                        <h4>{product.name}</h4>

                        <p>
                          SKU:{" "}
                          {product.sku || "N/A"}
                        </p>

                        <small>
                          ID:{" "}
                          {product._id
                            ?.slice(-6)
                            ?.toUpperCase()}
                        </small>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td>
                    {product.category ||
                      "-"}
                  </td>

                  {/* SUPPLIER */}

                  <td>
                    {product.supplier ||
                      "-"}
                  </td>

                  {/* PRICE */}

                  <td>

                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString("en-IN")}

                  </td>

                  {/* STOCK */}

                  <td>

                    <span
                      className={`stock-count ${
                        product.stock <= 5
                          ? "low-stock"
                          : ""
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`status-badge ${
                        product.stock === 0
                          ? "out-stock"
                          : product.stock <= 5
                          ? "low-stock"
                          : "in-stock"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock <= 5
                        ? "Low Stock"
                        : "In Stock"}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editProduct(product)
                        }
                        title="Edit Product"
                      >
                        <FiEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(
                            product._id
                          )
                        }
                        title="Delete Product"
                      >
                        <FiTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductTable;