import "./Inventory.css";

import { useEffect, useState } from "react";
import axios from "axios";

import InventoryHeader from "./InventoryHeader";
import InventoryStats from "./InventoryStats";
import InventoryFilters from "./InventoryFilters";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

const API_URL = "http://localhost:5000/api";

// ===========================================
// GET AUTH CONFIG
// ===========================================

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function Inventory() {
  /* ===========================================
      STATES
  =========================================== */

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [error, setError] = useState("");

  /* ===========================================
      FILTER STATES
  =========================================== */

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  /* ===========================================
      PRODUCT FORM
  =========================================== */

  const emptyProduct = {
    name: "",
    sku: "",
    category: "General",
    supplier: "",
    barcode: "",
    price: "",
    purchasePrice: "",
    stock: "",
    minimumStock: 10,
    image: "",
    description: "",
    status: "Active",
  };

  const [product, setProduct] = useState(emptyProduct);

  /* ===========================================
      FETCH PRODUCTS
  =========================================== */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to access inventory.");
        setProducts([]);
        return;
      }

      const res = await axios.get(
        `${API_URL}/products`,
        getAuthConfig()
      );

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err);

      setProducts([]);

      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.message ||
          "Unable to fetch products."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ===========================================
      INPUT CHANGE
  =========================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===========================================
      OPEN ADD PRODUCT MODAL
  =========================================== */

  const openAddModal = () => {
    setEditing(false);
    setSelectedProductId(null);
    setProduct(emptyProduct);
    setShowModal(true);
  };

  /* ===========================================
      OPEN EDIT PRODUCT
  =========================================== */

  const editProduct = (item) => {
    setEditing(true);
    setSelectedProductId(item._id);

    setProduct({
      name: item.name || "",
      sku: item.sku || "",
      category: item.category || "General",
      supplier: item.supplier || "",
      barcode: item.barcode || "",
      price: item.price ?? "",
      purchasePrice: item.purchasePrice ?? "",
      stock: item.stock ?? "",
      minimumStock: item.minimumStock ?? 10,
      image: item.image || "",
      description: item.description || "",
      status: item.status || "Active",
    });

    setShowModal(true);
  };

  /* ===========================================
      CLOSE MODAL
  =========================================== */

  const closeModal = () => {
    setShowModal(false);
    setEditing(false);
    setSelectedProductId(null);
    setProduct(emptyProduct);
  };

  /* ===========================================
      SAVE PRODUCT
  =========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in before making changes.");
        return;
      }

      if (editing) {
        await axios.put(
          `${API_URL}/products/${selectedProductId}`,
          product,
          getAuthConfig()
        );
      } else {
        await axios.post(
          `${API_URL}/products`,
          product,
          getAuthConfig()
        );
      }

      await fetchProducts();
      closeModal();
    } catch (err) {
      console.error("Save product error:", err);

      const message =
        err.response?.data?.message ||
        "Unable to save product.";

      setError(message);
      alert(message);
    }
  };

  /* ===========================================
      DELETE PRODUCT
  =========================================== */

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await axios.delete(
        `${API_URL}/products/${id}`,
        getAuthConfig()
      );

      await fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);

      const message =
        err.response?.data?.message ||
        "Unable to delete product.";

      setError(message);
      alert(message);
    }
  };

  /* ===========================================
      SEARCH + FILTER + SORT
  =========================================== */

  let filteredProducts = [...products];

  /* ---------- SEARCH ---------- */

  if (search.trim() !== "") {
    const searchTerm = search.toLowerCase();

    filteredProducts = filteredProducts.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.category?.toLowerCase().includes(searchTerm) ||
        item.sku?.toLowerCase().includes(searchTerm) ||
        item.supplier?.toLowerCase().includes(searchTerm) ||
        item.barcode?.toLowerCase().includes(searchTerm)
    );
  }

  /* ---------- CATEGORY FILTER ---------- */

  if (categoryFilter !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) => item.category === categoryFilter
    );
  }

  /* ---------- STOCK FILTER ---------- */

  switch (stockFilter) {
    case "In Stock":
      filteredProducts = filteredProducts.filter(
        (item) =>
          Number(item.stock) >
          Number(item.minimumStock ?? 10)
      );
      break;

    case "Low Stock":
      filteredProducts = filteredProducts.filter(
        (item) =>
          Number(item.stock) > 0 &&
          Number(item.stock) <=
            Number(item.minimumStock ?? 10)
      );
      break;

    case "Out of Stock":
      filteredProducts = filteredProducts.filter(
        (item) => Number(item.stock) === 0
      );
      break;

    default:
      break;
  }

  /* ---------- SORT ---------- */

  switch (sortBy) {
    case "Price Low":
      filteredProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
      break;

    case "Price High":
      filteredProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      break;

    case "Stock High":
      filteredProducts.sort(
        (a, b) => Number(b.stock) - Number(a.stock)
      );
      break;

    case "Stock Low":
      filteredProducts.sort(
        (a, b) => Number(a.stock) - Number(b.stock)
      );
      break;

    case "Newest":
    default:
      filteredProducts.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
      break;
  }

  /* ===========================================
      DASHBOARD STATS
  =========================================== */

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, item) => sum + Number(item.stock || 0),
    0
  );

  const lowStockProducts = products.filter(
    (item) =>
      Number(item.stock) > 0 &&
      Number(item.stock) <=
        Number(item.minimumStock ?? 10)
  ).length;

  const outOfStockProducts = products.filter(
    (item) => Number(item.stock) === 0
  ).length;

  const inventoryValue = products.reduce(
    (sum, item) =>
      sum +
      Number(item.purchasePrice || item.price || 0) *
        Number(item.stock || 0),
    0
  );

  /* ===========================================
      RETURN
  =========================================== */

  return (
    <div className="inventory-page">

      {error && (
        <div className="inventory-error">
          {error}
        </div>
      )}

      <InventoryHeader
        onAddProduct={openAddModal}
      />

      <InventoryStats
        totalProducts={totalProducts}
        totalStock={totalStock}
        lowStockProducts={lowStockProducts}
        outOfStockProducts={outOfStockProducts}
        inventoryValue={inventoryValue}
      />

      <InventoryFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        products={products}
      />

      {loading ? (
        <div className="loading-container">
          <h3>Loading products...</h3>
        </div>
      ) : (
        <ProductTable
          filteredProducts={filteredProducts}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />
      )}

      <ProductModal
        show={showModal}
        onClose={closeModal}
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editing={editing}
      />

    </div>
  );
}

export default Inventory;