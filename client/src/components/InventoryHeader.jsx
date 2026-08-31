import "./InventoryHeader.css";

import { FiPlus } from "react-icons/fi";

function InventoryHeader({ onAddProduct, productCount }) {
  return (
    <div className="inventory-header">

      <div className="inventory-header-left">

        <div className="inventory-breadcrumb">
          <span>Dashboard</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Inventory</span>
        </div>

        <h1>Inventory</h1>

        <p>
          Manage your products, stock levels and pricing.
        </p>

      </div>

      <div className="inventory-header-right">

        {productCount !== undefined && (
          <div className="header-count-badge">
            <strong>{productCount}</strong>
            <span>Products</span>
          </div>
        )}

        <button
          className="add-product-btn"
          onClick={onAddProduct}
        >
          <FiPlus size={20} />
          <span>New Product</span>
        </button>

      </div>

    </div>
  );
}

export default InventoryHeader;
