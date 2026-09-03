```jsx
import "./Inventory.css";

import { useEffect, useState } from "react";
import api from "../api";

import InventoryHeader from "../components/InventoryHeader";
import InventoryStats from "../components/InventoryStats";
import InventoryFilters from "../components/InventoryFilters";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

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
  // ===========================================
  // STATES
  // ===========================================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedProductId, setSelectedProductId] =
    useState(null);

  const [error, setError] = useState("");

  // ===========================================
  // FILTER STATES
  // ===========================================

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [stockFilter, setStockFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  // ===========================================
  // EMPTY PRODUCT
  // ===========================================

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
    imageFile: null,
    description: "",
    status: "Active",
  };

  const [product, setProduct] =
    useState(emptyProduct);

  // ===========================================
  // FETCH PRODUCTS
  // ===========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Please log in to access inventory."
        );

        setProducts([]);

        return;
      }

      const response = await api.get(
        "/products",
        getAuthConfig()
      );

      // Backend returns:
      // {
      //   success: true,
      //   count: ...,
      //   products: [...]
      // }

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts(
          response.data?.products || []
        );
      }
    } catch (error) {
      console.error(
        "Fetch Products Error:",
        error
      );

      setProducts([]);

      if (error.response?.status === 401) {
        setError(
          "Your session has expired. Please log in again."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Unable to fetch products."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ===========================================
  // LOAD PRODUCTS
  // ===========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===========================================
  // HANDLE INPUT CHANGE
  // ===========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================================
  // OPEN ADD PRODUCT MODAL
  // ===========================================

  const openAddModal = () => {
    setEditing(false);

    setSelectedProductId(null);

    setProduct({
      ...emptyProduct,
    });

    setError("");

    setShowModal(true);
  };

  // ===========================================
  // OPEN EDIT PRODUCT MODAL
  // ===========================================

  const editProduct = (item) => {
    setEditing(true);

    setSelectedProductId(item._id);

    setProduct({
      name: item.name || "",

      sku: item.sku || "",

      category:
        item.category || "General",

      supplier:
        item.supplier || "",

      barcode:
        item.barcode || "",

      price:
        item.price ?? "",

      purchasePrice:
        item.purchasePrice ?? "",

      stock:
        item.stock ?? "",

      minimumStock:
        item.minimumStock ?? 10,

      image:
        item.image || "",

      imageFile: null,

      description:
        item.description || "",

      status:
        item.status || "Active",
    });

    setError("");

    setShowModal(true);
  };

  // ===========================================
  // CLOSE MODAL
  // ===========================================

  const closeModal = () => {
    setShowModal(false);

    setEditing(false);

    setSelectedProductId(null);

    setProduct({
      ...emptyProduct,
    });
  };

  // ===========================================
  // SAVE PRODUCT
  // ===========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Please log in before making changes."
        );

        return;
      }

      // =========================================
      // PREPARE JSON DATA
      // =========================================

      const productData = {
        name: product.name?.trim() || "",

        sku: product.sku?.trim() || "",

        category:
          product.category?.trim() ||
          "General",

        supplier:
          product.supplier?.trim() || "",

        barcode:
          product.barcode?.trim() || "",

        price:
          product.price === ""
            ? 0
            : Number(product.price),

        purchasePrice:
          product.purchasePrice === ""
            ? 0
            : Number(product.purchasePrice),

        stock:
          product.stock === ""
            ? 0
            : Number(product.stock),

        minimumStock:
          product.minimumStock === ""
            ? 10
            : Number(product.minimumStock),

        description:
          product.description?.trim() || "",

        image:
          product.image?.trim() || "",

        status:
          product.status || "Active",
      };

      // =========================================
      // BASIC FRONTEND VALIDATION
      // =========================================

      if (!productData.name) {
        setError(
          "Product name is required."
        );

        alert(
          "Product name is required."
        );

        return;
      }

      if (
        Number.isNaN(productData.price) ||
        productData.price < 0
      ) {
        setError(
          "Selling price must be a valid non-negative number."
        );

        alert(
          "Selling price must be a valid non-negative number."
        );

        return;
      }

      if (
        Number.isNaN(productData.purchasePrice) ||
        productData.purchasePrice < 0
      ) {
        setError(
          "Purchase price must be a valid non-negative number."
        );

        alert(
          "Purchase price must be a valid non-negative number."
        );

        return;
      }

      if (
        Number.isNaN(productData.stock) ||
        productData.stock < 0
      ) {
        setError(
          "Stock must be a valid non-negative number."
        );

        alert(
          "Stock must be a valid non-negative number."
        );

        return;
      }

      if (
        Number.isNaN(productData.minimumStock) ||
        productData.minimumStock < 0
      ) {
        setError(
          "Minimum stock must be a valid non-negative number."
        );

        alert(
          "Minimum stock must be a valid non-negative number."
        );

        return;
      }

      // =========================================
      // DEBUG
      // =========================================

      console.log(
        "Sending product data:",
        productData
      );

      // =========================================
      // UPDATE PRODUCT
      // =========================================

      if (editing) {
        await api.put(
          `/products/${selectedProductId}`,
          productData,
          getAuthConfig()
        );
      }

      // =========================================
      // CREATE PRODUCT
      // =========================================

      else {
        await api.post(
          "/products",
          productData,
          getAuthConfig()
        );
      }

      // =========================================
      // REFRESH PRODUCTS
      // =========================================

      await fetchProducts();

      // =========================================
      // CLOSE MODAL
      // =========================================

      closeModal();

    } catch (error) {
      console.error(
        "Save Product Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to save product.";

      setError(message);

      alert(message);
    }
  };

  // ===========================================
  // DELETE PRODUCT
  // ===========================================

  const deleteProduct = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/products/${id}`,
        getAuthConfig()
      );

      await fetchProducts();

    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Unable to delete product.";

      setError(message);

      alert(message);
    }
  };

  // ===========================================
  // SEARCH + FILTER + SORT
  // ===========================================

  let filteredProducts = [
    ...products,
  ];

  // ===========================================
  // SEARCH
  // ===========================================

  if (search.trim()) {
    const searchTerm =
      search.toLowerCase();

    filteredProducts =
      filteredProducts.filter(
        (item) =>
          item.name
            ?.toLowerCase()
            .includes(searchTerm) ||

          item.category
            ?.toLowerCase()
            .includes(searchTerm) ||

          item.sku
            ?.toLowerCase()
            .includes(searchTerm) ||

          item.supplier
            ?.toLowerCase()
            .includes(searchTerm) ||

          item.barcode
            ?.toLowerCase()
            .includes(searchTerm)
      );
  }

  // ===========================================
  // CATEGORY FILTER
  // ===========================================

  if (
    categoryFilter !== "All"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (item) =>
          item.category ===
          categoryFilter
      );
  }

  // ===========================================
  // STOCK FILTER
  // ===========================================

  switch (stockFilter) {
    case "In Stock":
      filteredProducts =
        filteredProducts.filter(
          (item) =>
            Number(item.stock) >
            Number(
              item.minimumStock ??
                10
            )
        );

      break;

    case "Low Stock":
      filteredProducts =
        filteredProducts.filter(
          (item) =>
            Number(item.stock) >
              0 &&
            Number(item.stock) <=
              Number(
                item.minimumStock ??
                  10
              )
        );

      break;

    case "Out of Stock":
      filteredProducts =
        filteredProducts.filter(
          (item) =>
            Number(item.stock) ===
            0
        );

      break;

    default:
      break;
  }

  // ===========================================
  // SORT
  // ===========================================

  switch (sortBy) {
    case "Price Low":
      filteredProducts.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

      break;

    case "Price High":
      filteredProducts.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

      break;

    case "Stock High":
      filteredProducts.sort(
        (a, b) =>
          Number(b.stock) -
          Number(a.stock)
      );

      break;

    case "Stock Low":
      filteredProducts.sort(
        (a, b) =>
          Number(a.stock) -
          Number(b.stock)
      );

      break;

    case "Oldest":
      filteredProducts.sort(
        (a, b) =>
          new Date(
            a.createdAt || 0
          ) -
          new Date(
            b.createdAt || 0
          )
      );

      break;

    case "Newest":
    default:
      filteredProducts.sort(
        (a, b) =>
          new Date(
            b.createdAt || 0
          ) -
          new Date(
            a.createdAt || 0
          )
      );

      break;
  }

  // ===========================================
  // DASHBOARD STATS
  // ===========================================

  const totalProducts =
    products.length;

  const totalStock =
    products.reduce(
      (sum, item) =>
        sum +
        Number(item.stock || 0),
      0
    );

  const lowStockProducts =
    products.filter(
      (item) =>
        Number(item.stock) >
          0 &&
        Number(item.stock) <=
          Number(
            item.minimumStock ??
              10
          )
    ).length;

  const outOfStockProducts =
    products.filter(
      (item) =>
        Number(item.stock) === 0
    ).length;

  const inventoryValue =
    products.reduce(
      (sum, item) =>
        sum +
        Number(
          item.purchasePrice ||
            item.price ||
            0
        ) *
          Number(
            item.stock || 0
          ),
      0
    );

  // ===========================================
  // RETURN
  // ===========================================

  return (
    <div className="inventory-page">

      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="inventory-error">
          {error}
        </div>
      )}

      {/* =========================================
          HEADER
      ========================================= */}

      <InventoryHeader
        onAddProduct={
          openAddModal
        }
      />

      {/* =========================================
          STATS
      ========================================= */}

      <InventoryStats
        totalProducts={
          totalProducts
        }
        totalStock={
          totalStock
        }
        lowStockProducts={
          lowStockProducts
        }
        outOfStockProducts={
          outOfStockProducts
        }
        inventoryValue={
          inventoryValue
        }
      />

      {/* =========================================
          FILTERS
      ========================================= */}

      <InventoryFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={
          categoryFilter
        }
        setCategoryFilter={
          setCategoryFilter
        }
        stockFilter={
          stockFilter
        }
        setStockFilter={
          setStockFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
        products={products}
      />

      {/* =========================================
          TABLE
      ========================================= */}

      {loading ? (
        <div className="loading-container">
          <h3>
            Loading products...
          </h3>
        </div>
      ) : (
        <ProductTable
          filteredProducts={
            filteredProducts
          }
          editProduct={
            editProduct
          }
          deleteProduct={
            deleteProduct
          }
        />
      )}

      {/* =========================================
          PRODUCT MODAL
      ========================================= */}

      <ProductModal
        show={showModal}
        onClose={closeModal}
        product={product}
        handleChange={
          handleChange
        }
        handleSubmit={
          handleSubmit
        }
        editing={editing}
      />

    </div>
  );
}

export default Inventory;
```
