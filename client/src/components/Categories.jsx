import { useEffect, useState } from "react";
import api from "../api";
import "./CategoryHeader.css";
import "./Categories.css";
import "./CategoryStats.css";
import CategoryHeader from "./CategoryHeader";
import CategoryStats from "./CategoryStats";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import "./CategoryTable.css";
import "./CategoryModal.css";


function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "#2563eb",
    status: "Active",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get("/categories")
      

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  const saveCategory = async () => {
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, ...)
      } else {
        await axios.post(
          "http://localhost:5000/api/categories",
          newCategory
        );
      }

      fetchCategories();

      setShowModal(false);

      setEditingId(null);

      setNewCategory({
        name: "",
        description: "",
        color: "#2563eb",
        status: "Active",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editCategory = (category) => {
    setEditingId(category._id);

    setShowModal(true);

    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color,
      status: category.status,
    });
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    await axios.delete(
      `http://localhost:5000/api/categories/${id}`
    );

    fetchCategories();
  };

  const filteredCategories = categories.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading Categories...</h2>;
  }

  return (
    <div className="categories-page">

      <CategoryHeader
        openModal={() => {
          setEditingId(null);

          setNewCategory({
            name: "",
            description: "",
            color: "#2563eb",
            status: "Active",
          });

          setShowModal(true);
        }}
      />

      <CategoryStats
        categories={categories}
      />

      <div className="category-search">

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <CategoryTable
        categories={filteredCategories}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
      />

      <CategoryModal
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);

          setEditingId(null);
        }}
        newCategory={newCategory}
        handleChange={handleChange}
        saveCategory={saveCategory}
        editingId={editingId}
      />

    </div>
  );
}

export default Categories;