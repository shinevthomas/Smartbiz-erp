import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;