import { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/products");

      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId === null) {
        await axios.post(
          "http://localhost:5000/api/products",
          newProduct
        );

        alert("✅ Product Added Successfully");
      } else {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          newProduct
        );

        alert("✅ Product Updated Successfully");
      }

      setNewProduct({
        name: "",
        price: "",
        stock: "",
      });

      setEditingId(null);
      setShowForm(false);

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("🗑 Product Deleted Successfully");

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setShowForm(true);

    setNewProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(keyword) ||
      String(product.price).includes(keyword) ||
      String(product.stock).includes(keyword)
    );
  });

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price) * Number(product.stock),
    0
  );

  const lowStock = products.filter(
    (product) => product.stock <= 20
  ).length;

  const availableStock = products.filter(
    (product) => product.stock > 20
  ).length;

  if (loading) {
    return (
      <div className="inventory-container">
        <h2 className="loading-text">
          Loading Products...
        </h2>
      </div>
    );
  }

  return (
    <div className="inventory-container">

      {/* Page Header */}

      <div className="page-header">

        <div className="page-title">

          <h1>Inventory</h1>

          <p>
            Manage your products, stock levels and pricing.
          </p>

        </div>

        <button
          className="add-btn"
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setEditingId(null);

              setNewProduct({
                name: "",
                price: "",
                stock: "",
              });
            }
          }}
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <h2>{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <h2>
            ₹{inventoryValue.toLocaleString("en-IN")}
          </h2>
          <p>Inventory Value</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⚠️</span>
          <h2>{lowStock}</h2>
          <p>Low Stock</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <h2>{availableStock}</h2>
          <p>Available</p>
        </div>

      </div>

      {/* Search */}

      <div className="toolbar">

        <input
          className="search-box"
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <p className="results-text">
        Showing {filteredProducts.length} Products
      </p>

      {/* Form */}

      {showForm && (
        <div className="form-container">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleChange}
          />

          <button onClick={saveProduct}>
            {editingId ? "Update Product" : "Save Product"}
          </button>

        </div>
      )}

      {/* Table */}

      <table className="inventory-table">

        <thead>

          <tr>

            <th>#</th>

            <th>Name</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Created</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product, index) => (

              <tr key={product._id}>

                <td>{index + 1}</td>

                <td>{product.name}</td>

                <td>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>

                <td>{product.stock}</td>

                <td>
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  fontWeight: "600",
                }}
              >
                📦 No Products Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Inventory;