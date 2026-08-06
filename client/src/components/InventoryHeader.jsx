function InventoryHeader({ onAddProduct }) {
  return (
    <div className="inventory-header">

      <div className="inventory-header-left">

        <h1>Inventory</h1>

        <p>
          Manage your products, stock levels and pricing.
        </p>

      </div>

      <button
        className="add-product-btn"
        onClick={onAddProduct}
      >
        + New Product
      </button>

    </div>
  );
}

export default InventoryHeader;