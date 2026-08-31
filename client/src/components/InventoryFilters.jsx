import "./InventoryFilters.css";

import {
  FiSearch,
  FiFilter,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

function InventoryFilters({
  search,
  setSearch,

  categoryFilter,
  setCategoryFilter,

  stockFilter,
  setStockFilter,

  sortBy,
  setSortBy,

  products,
}) {
  const categories = [
    ...new Set(
      products
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="inventory-toolbar">

      {/* ==========================
          SEARCH
      ========================== */}

      <div className="search-container">

        <div className="search-wrap">

          <FiSearch className="search-icon" />

          <input
            type="text"
            className="search-box"
            placeholder="Search by name, SKU, supplier or barcode..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              ×
            </button>
          )}

        </div>

      </div>

      {/* ==========================
          FILTERS
      ========================== */}

      <div className="filter-container">

        {/* Category */}

        <div className="filter-item">

          <span className="filter-label">
            <FiFilter /> Category
          </span>

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

        </div>

        {/* Stock */}

        <div className="filter-item">

          <span className="filter-label">Stock</span>

          <select
            className="filter-select"
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
            }
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>

        </div>

        {/* Sort */}

        <div className="filter-item">

          <span className="filter-label">
            {sortBy.includes("Low") ? (
              <FiArrowUp />
            ) : (
              <FiArrowDown />
            )}{" "}
            Sort
          </span>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="Newest">Newest</option>
            <option value="Price Low">
              Price: Low → High
            </option>
            <option value="Price High">
              Price: High → Low
            </option>
            <option value="Stock High">
              Stock: High → Low
            </option>
            <option value="Stock Low">
              Stock: Low → High
            </option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default InventoryFilters;
