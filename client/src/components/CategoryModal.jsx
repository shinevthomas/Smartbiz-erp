function CategoryModal({
  showModal,
  closeModal,
  newCategory,
  handleChange,
  saveCategory,
  editingId,
}) {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">

      <div className="category-modal">

        <div className="modal-header">

          <h2>
            {editingId ? "Edit Category" : "Add Category"}
          </h2>

          <button
            className="close-btn"
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          <div className="form-group">

            <label>Category Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={newCategory.name}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter description"
              rows="4"
              value={newCategory.description}
              onChange={handleChange}
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Color</label>

              <input
                type="color"
                name="color"
                value={newCategory.color}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={newCategory.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

          </div>

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={saveCategory}
          >
            {editingId ? "Update Category" : "Save Category"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CategoryModal;