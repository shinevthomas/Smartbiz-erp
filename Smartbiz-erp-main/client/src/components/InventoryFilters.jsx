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

      {/* Search */}

      <div className="search-container">

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Filters */}

      <div className="filter-container">

        {/* Category */}

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

        {/* Stock */}

        <select
          className="filter-select"
          value={stockFilter}
          onChange={(e) =>
            setStockFilter(e.target.value)
          }
        >

          <option value="All">
            All Stock
          </option>

          <option value="In Stock">
            In Stock
          </option>

          <option value="Low Stock">
            Low Stock
          </option>

          <option value="Out of Stock">
            Out of Stock
          </option>

        </select>

        {/* Sorting */}

        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="Newest">
            Newest
          </option>

          <option value="Price Low">
            Price Low → High
          </option>

          <option value="Price High">
            Price High → Low
          </option>

          <option value="Stock High">
            Stock High
          </option>

          <option value="Stock Low">
            Stock Low
          </option>

        </select>

      </div>

    </div>

  );

}

export default InventoryFilters;