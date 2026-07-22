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

  const fetchProducts = () => {
    setLoading(true);

    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId === null) {
      axios
        .post("http://localhost:5000/products", newProduct)
        .then(() => {
          fetchProducts();

          alert("✅ Product Added Successfully");

          setNewProduct({
            name: "",
            price: "",
            stock: "",
          });

          setShowForm(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(
          `http://localhost:5000/products/${editingId}`,
          newProduct
        )
        .then(() => {
          fetchProducts();

          alert("✅ Product Updated Successfully");

          setEditingId(null);

          setNewProduct({
            name: "",
            price: "",
            stock: "",
          });

          setShowForm(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        fetchProducts();
        alert("🗑️ Product Deleted Successfully");
      })
      .catch((err) => console.log(err));
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

  if (loading) {
    return (
      <div className="inventory-container">
        <h2 style={{ textAlign: "center" }}>Loading Products...</h2>
      </div>
    );
  }

  return (
    <div className="inventory-container">

      <div className="inventory-header">
        <h1>Inventory Management</h1>

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

      <input
        type="text"
        className="search-box"
        placeholder="Search by Name, Price or Stock..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="product-count">
        Total Products : {filteredProducts.length}
      </h3>

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
                  {new Date(product.createdAt).toLocaleDateString()}
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
                  padding: "20px",
                  fontWeight: "bold",
                }}
              >
                No Products Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Inventory;