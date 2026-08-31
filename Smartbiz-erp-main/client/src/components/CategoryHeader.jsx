function CategoryHeader({ openModal }) {
  return (
    <div className="category-header">

      <div className="category-header-left">

        <h1>Categories</h1>

        <p>
          Organize your inventory with product categories.
        </p>

      </div>

      <button
        className="add-category-btn"
        onClick={openModal}
      >
        + Add Category
      </button>

    </div>
  );
}

export default CategoryHeader;