import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>SmartBiz ERP</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </div>

      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;