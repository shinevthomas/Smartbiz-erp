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

      /*
        Backend may return:
        { products: [...] }

        or directly:
        [...]
      */

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
      files,
    } = e.target;

    // IMAGE UPLOAD

    if (name === "image") {
      if (files && files.length > 0) {
        setProduct((prev) => ({
          ...prev,

          imageFile: files[0],

          image:
            URL.createObjectURL(files[0]),
        }));
      }

      return;
    }

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
      // FORM DATA
      // =========================================

      const formData = new FormData();

      formData.append(
        "name",
        product.name
      );

      formData.append(
        "sku",
        product.sku || ""
      );

      formData.append(
        "category",
        product.category
      );

      formData.append(
        "supplier",
        product.supplier || ""
      );

      formData.append(
        "barcode",
        product.barcode || ""
      );

      formData.append(
        "price",
        product.price
      );

      formData.append(
        "purchasePrice",
        product.purchasePrice
      );

      formData.append(
        "stock",
        product.stock
      );

      formData.append(
        "minimumStock",
        product.minimumStock
      );

      formData.append(
        "description",
        product.description || ""
      );

      formData.append(
        "status",
        product.status || "Active"
      );

      // =========================================
      // IMAGE
      // =========================================

      if (product.imageFile) {
        formData.append(
          "image",
          product.imageFile
        );
      } else if (
        editing &&
        product.image
      ) {
        formData.append(
          "existingImage",
          product.image
        );
      }

      // =========================================
      // UPDATE
      // =========================================

      if (editing) {
        await api.put(
          `/products/${selectedProductId}`,
          formData,
          {
            ...getAuthConfig(),

            headers: {
              ...getAuthConfig().headers,

              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      // =========================================
      // CREATE
      // =========================================

      else {
        await api.post(
          "/products",
          formData,
          {
            ...getAuthConfig(),

            headers: {
              ...getAuthConfig().headers,

              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      // =========================================
      // REFRESH
      // =========================================

      await fetchProducts();

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

    if (!confirmed) return;

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
            Number(item.stock) === 0
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