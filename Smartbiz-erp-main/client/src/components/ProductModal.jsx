import "./ProductModal.css";

import {
  FiX,
  FiPackage,
} from "react-icons/fi";

function ProductModal({
  show,
  onClose,
  product,
  handleChange,
  handleSubmit,
  editing,
}) {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==========================
            HEADER
        ========================== */}

        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <FiPackage />
            </div>

            <div>
              <h2>
                {editing
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>

              <p>
                {editing
                  ? "Update product information."
                  : "Create a new inventory product."}
              </p>
            </div>
          </div>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* ==========================
            FORM
        ========================== */}

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >
          {/* ==========================
              ROW 1
          ========================== */}

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>SKU</label>

              <input
                type="text"
                name="sku"
                placeholder="SKU-1001"
                value={product.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ==========================
              ROW 2
          ========================== */}

          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">
                  Select Category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Office">
                  Office
                </option>

                <option value="Stationery">
                  Stationery
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Others">
                  Others
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Supplier</label>

              <input
                type="text"
                name="supplier"
                placeholder="Supplier name"
                value={product.supplier}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ==========================
              ROW 3
          ========================== */}

          <div className="form-grid">
            <div className="form-group">
              <label>Price (₹)</label>

              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={product.price}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>

              <input
                type="number"
                name="stock"
                placeholder="0"
                value={product.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          {/* ==========================
              IMAGE URL
          ========================== */}

          <div className="form-group">
            <label>Product Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={product.image}
              onChange={handleChange}
            />
          </div>

          {/* ==========================
              DESCRIPTION
          ========================== */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Enter product description..."
              value={product.description}
              onChange={handleChange}
            />
          </div>

          {/* ==========================
              IMAGE PREVIEW
          ========================== */}

          {product.image && (
            <div className="image-preview">
              <img
                src={product.image}
                alt="Product Preview"
              />
            </div>
          )}

          {/* ==========================
              FOOTER
          ========================== */}

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {editing
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;