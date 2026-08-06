function CategoryStats({ categories }) {
  const total = categories.length;

  const active = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const inactive = categories.filter(
    (category) => category.status === "Inactive"
  ).length;

  const colorsUsed = new Set(
    categories.map((category) => category.color)
  ).size;

  return (
    <div className="category-stats">

      <div className="category-stat-card">
        <span>📁</span>
        <h2>{total}</h2>
        <p>Total Categories</p>
      </div>

      <div className="category-stat-card">
        <span>✅</span>
        <h2>{active}</h2>
        <p>Active</p>
      </div>

      <div className="category-stat-card">
        <span>❌</span>
        <h2>{inactive}</h2>
        <p>Inactive</p>
      </div>

      <div className="category-stat-card">
        <span>🎨</span>
        <h2>{colorsUsed}</h2>
        <p>Colors Used</p>
      </div>

    </div>
  );
}

export default CategoryStats;