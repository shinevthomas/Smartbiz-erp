import "./Inventory.css";

import { useEffect, useState } from "react";
import axios from "axios";

import InventoryHeader from "./InventoryHeader";
import InventoryStats from "./InventoryStats";
import InventoryFilters from "./InventoryFilters";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

function Inventory() {

  /* ===========================================
      STATES
  =========================================== */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);

  /* ===========================================
      FILTER STATES
  =========================================== */

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [stockFilter, setStockFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  /* ===========================================
      PRODUCT FORM
  =========================================== */

  const emptyProduct = {

    name: "",

    sku: "",

    category: "",

    supplier: "",

    price: "",

    stock: "",

    image: "",

    description: "",

  };

  const [product, setProduct] =
    useState(emptyProduct);

  /* ===========================================
      FETCH PRODUCTS
  =========================================== */

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } catch (err) {

      console.error(err);

      alert("Unable to fetch products.");

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
      PART 2 STARTS HERE
      (ADD / UPDATE / DELETE)
  =========================================== */
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

      category: item.category || "",

      supplier: item.supplier || "",

      price: item.price || "",

      stock: item.stock || "",

      image: item.image || "",

      description: item.description || "",

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

      if (editing) {

        await axios.put(

          `http://localhost:5000/api/products/${selectedProductId}`,

          product

        );

      } else {

        await axios.post(

          "http://localhost:5000/api/products",

          product

        );

      }

      fetchProducts();

      closeModal();

    } catch (err) {

      console.error(err);

      alert("Unable to save product.");

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

      await axios.delete(

        `http://localhost:5000/api/products/${id}`

      );

      fetchProducts();

    } catch (err) {

      console.error(err);

      alert("Unable to delete product.");

    }

  };

  /* ===========================================
      PART 3 STARTS HERE
      Search + Filters + Sorting
  =========================================== */
    /* ===========================================
      SEARCH + FILTER + SORT
  =========================================== */

  let filteredProducts = [...products];

  /* ---------- SEARCH ---------- */

  if (search.trim() !== "") {

    filteredProducts = filteredProducts.filter((item) =>

      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.sku
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.supplier
        ?.toLowerCase()
        .includes(search.toLowerCase())

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

        (item) => Number(item.stock) > 5

      );

      break;

    case "Low Stock":

      filteredProducts = filteredProducts.filter(

        (item) =>
          Number(item.stock) > 0 &&
          Number(item.stock) <= 5

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

  /* ---------- PRICE SORT ---------- */

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
      Number(item.stock) <= 5

  ).length;

  const outOfStockProducts = products.filter(

    (item) => Number(item.stock) === 0

  ).length;

  const inventoryValue = products.reduce(

    (sum, item) =>

      sum +

      Number(item.price || 0) *

      Number(item.stock || 0),

    0

  );

  /* ===========================================
      PART 4 STARTS HERE
      RETURN JSX
  =========================================== */
    /* ===========================================
      RETURN
  =========================================== */

  return (

    <div className="inventory-page">

      {/* ==========================
          HEADER
      ========================== */}

      <InventoryHeader
        onAddProduct={openAddModal}
      />

      {/* ==========================
          STATS
      ========================== */}

      <InventoryStats

        totalProducts={totalProducts}

        totalStock={totalStock}

        lowStockProducts={lowStockProducts}

        outOfStockProducts={outOfStockProducts}

        inventoryValue={inventoryValue}

      />

      {/* ==========================
          FILTERS
      ========================== */}

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

      {/* ==========================
          TABLE
      ========================== */}

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

      {/* ==========================
          MODAL
      ========================== */}

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