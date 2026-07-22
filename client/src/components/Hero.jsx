import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Smart Business Management System</h1>

      <p>
        Manage Inventory, Sales, Customers, Invoices and Reports
        from one place.
      </p>

      <button onClick={() => navigate("/dashboard")}>
        Get Started
      </button>
    </main>
  );
}

export default Hero;