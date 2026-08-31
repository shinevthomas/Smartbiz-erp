function InventoryStats({
  totalProducts,
  totalStock,
  inventoryValue,
  lowStockProducts,
  outOfStockProducts,
}) {
  return (
    <div className="stats-grid">

      {/* Total Products */}

      <div className="stat-card">

        <span className="stat-icon">📦</span>

        <h2>{totalProducts}</h2>

        <p>Total Products</p>

      </div>

      {/* Inventory Value */}

      <div className="stat-card">

        <span className="stat-icon">💰</span>

        <h2>₹{inventoryValue.toLocaleString("en-IN")}</h2>

        <p>Inventory Value</p>

      </div>

      {/* Low Stock */}

      <div className="stat-card">

        <span className="stat-icon">⚠️</span>

        <h2>{lowStockProducts}</h2>

        <p>Low Stock</p>

      </div>

      {/* Total Stock */}

      <div className="stat-card">

        <span className="stat-icon">✅</span>

        <h2>{totalStock}</h2>

        <p>Available Stock</p>

      </div>

    </div>
  );
}

export default InventoryStats;