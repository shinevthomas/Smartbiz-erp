import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiTag,
} from "react-icons/fi";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#2563eb",
    status: "Active",
  });

  // ==========================================================
  // FETCH CATEGORIES
  // ==========================================================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(response.data);

    } catch (error) {
      console.error("Fetch Categories Error:", error);

      alert("Unable to load categories.");

    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD CATEGORIES
  // ==========================================================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // OPEN ADD MODAL
  // ==========================================================

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      color: "#2563eb",
      status: "Active",
    });

    setShowModal(true);
  };

  // ==========================================================
  // OPEN EDIT MODAL
  // ==========================================================

  const openEditModal = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name || "",
      description: category.description || "",
      color: category.color || "#2563eb",
      status: category.status || "Active",
    });

    setShowModal(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const closeModal = () => {
    setShowModal(false);

    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      color: "#2563eb",
      status: "Active",
    });
  };

  // ==========================================================
  // SAVE CATEGORY
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name is required.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/categories/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/categories",
          formData
        );
      }

      await fetchCategories();

      closeModal();

    } catch (error) {
      console.error("Save Category Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to save category."
      );
    }
  };

  // ==========================================================
  // DELETE CATEGORY
  // ==========================================================

  const deleteCategory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      await fetchCategories();

    } catch (error) {
      console.error("Delete Category Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to delete category."
      );
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="category-management">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="category-header">

        <div className="category-header-left">

          <div className="category-icon">
            <FiTag />
          </div>

          <div>
            <h2>Categories</h2>

            <p>
              Manage your inventory categories.
            </p>
          </div>

        </div>

        <button
          className="category-add-btn"
          onClick={openAddModal}
        >
          <FiPlus />

          Add Category
        </button>

      </div>


      {/* ======================================================
          CATEGORY LIST
      ====================================================== */}

      {loading ? (

        <div className="category-loading">
          Loading categories...
        </div>

      ) : categories.length === 0 ? (

        <div className="category-empty">

          <FiTag />

          <h3>No Categories Yet</h3>

          <p>
            Create your first inventory category.
          </p>

          <button
            onClick={openAddModal}
            className="category-empty-btn"
          >
            <FiPlus />

            Add Category
          </button>

        </div>

      ) : (

        <div className="category-grid">

          {categories.map((category) => (

            <div
              className="category-card"
              key={category._id}
            >

              <div
                className="category-card-icon"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                }}
              >
                <FiTag />
              </div>

              <div className="category-card-content">

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.description ||
                    "No description"}
                </p>

                <span
                  className={
                    category.status === "Active"
                      ? "category-status active"
                      : "category-status inactive"
                  }
                >
                  {category.status}
                </span>

              </div>

              <div className="category-card-actions">

                <button
                  className="category-edit-btn"
                  onClick={() =>
                    openEditModal(category)
                  }
                  title="Edit category"
                >
                  <FiEdit2 />
                </button>

                <button
                  className="category-delete-btn"
                  onClick={() =>
                    deleteCategory(category._id)
                  }
                  title="Delete category"
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* ======================================================
          MODAL
      ====================================================== */}

      {showModal && (

        <div
          className="category-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="category-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="category-modal-header">

              <div>

                <h2>
                  {editingId
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p>
                  {editingId
                    ? "Update category information."
                    : "Create a new inventory category."}
                </p>

              </div>

              <button
                className="category-close-btn"
                onClick={closeModal}
              >
                <FiX />
              </button>

            </div>


            {/* FORM */}

            <form
              className="category-form"
              onSubmit={handleSubmit}
            >

              <div className="category-form-group">

                <label>
                  Category Name *
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Example: Electronics"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="category-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe this category..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />

              </div>


              <div className="category-form-row">

                <div className="category-form-group">

                  <label>
                    Category Color
                  </label>

                  <div className="color-input-wrapper">

                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                    />

                    <span>
                      {formData.color}
                    </span>

                  </div>

                </div>


                <div className="category-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              {/* FOOTER */}

              <div className="category-modal-footer">

                <button
                  type="button"
                  className="category-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="category-save-btn"
                >
                  {editingId
                    ? "Update Category"
                    : "Save Category"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default CategoryManagement;