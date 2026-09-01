import { useEffect, useState } from "react";
import api from "../api";

import "./CategoryHeader.css";
import "./Categories.css";
import "./CategoryStats.css";
import "./CategoryTable.css";
import "./CategoryModal.css";

import CategoryHeader from "./CategoryHeader";
import CategoryStats from "./CategoryStats";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";

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

  // ================================
  // FETCH CATEGORIES
  // ================================

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get("/categories");

      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // SAVE / UPDATE CATEGORY
  // ================================

  const saveCategory = async () => {
    try {
      if (editingId) {
        await api.put(
          `/categories/${editingId}`,
          newCategory
        );
      } else {
        await api.post(
          "/categories",
          newCategory
        );
      }

      await fetchCategories();

      setShowModal(false);
      setEditingId(null);

      setNewCategory({
        name: "",
        description: "",
        color: "#2563eb",
        status: "Active",
      });
    } catch (err) {
      console.log("Error saving category:", err);
    }
  };

  // ================================
  // EDIT CATEGORY
  // ================================

  const editCategory = (category) => {
    setEditingId(category._id);

    setShowModal(true);

    setNewCategory({
      name: category.name || "",
      description: category.description || "",
      color: category.color || "#2563eb",
      status: category.status || "Active",
    });
  };

  // ================================
  // DELETE CATEGORY
  // ================================

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    try {
      await api.delete(`/categories/${id}`);

      await fetchCategories();
    } catch (err) {
      console.log("Error deleting category:", err);
    }
  };

  // ================================
  // FILTER CATEGORIES
  // ================================

  const filteredCategories = categories.filter((category) =>
    category.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return <h2>Loading Categories...</h2>;
  }

  // ================================
  // UI
  // ================================

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
        search={search}
        setSearch={setSearch}
      />

      <CategoryStats categories={categories} />

      <CategoryTable
        categories={filteredCategories}
        onEdit={editCategory}
        onDelete={deleteCategory}
      />

      {showModal && (
        <CategoryModal
          category={newCategory}
          editingId={editingId}
          handleChange={handleChange}
          saveCategory={saveCategory}
          closeModal={() => {
            setShowModal(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}

export default Categories;