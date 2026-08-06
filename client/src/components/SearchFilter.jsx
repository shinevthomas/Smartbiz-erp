import "./SearchFilter.css";

import { FiSearch, FiPlus } from "react-icons/fi";

function SearchFilter() {
  return (
    <div className="search-filter">

      {/* Left */}

      <div className="search-section">

        <div className="search-box">

          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search products..."
          />

        </div>

        <select>

          <option>All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
          <option>Furniture</option>

        </select>

        <select>

          <option>All Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>

        </select>

      </div>

      {/* Right */}

      <button className="inventory-add-btn">

        <FiPlus />

        Add Product

      </button>

    </div>
  );
}

export default SearchFilter;