function CategoryTable({
  categories,
  editCategory,
  deleteCategory,
}) {
  return (
    <div className="category-table-wrapper">

      <table className="category-table">

        <thead>

          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th>Color</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {categories.length > 0 ? (

            categories.map((category, index) => (

              <tr key={category._id}>

                <td>{index + 1}</td>

                <td>
                  <strong>{category.name}</strong>
                </td>

                <td>{category.description}</td>

                <td>

                  <div
                    className="color-badge"
                    style={{
                      background: category.color,
                    }}
                  />

                </td>

                <td>

                  <span
                    className={
                      category.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {category.status}
                  </span>

                </td>

                <td>

                  {new Date(
                    category.createdAt
                  ).toLocaleDateString("en-GB")}

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editCategory(category)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteCategory(category._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No Categories Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default CategoryTable;