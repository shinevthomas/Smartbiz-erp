import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <main className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          Smart Business Management
        </span>

        <h1>
          Run Your Business
          <br />
          <span>Smarter & Faster.</span>
        </h1>

        <p>
          SmartBiz ERP brings inventory, sales, customers,
          invoices and business reports together in one
          powerful platform.
        </p>

        <div className="hero-actions">

          <button
            className="hero-primary"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

          <button
            className="hero-secondary"
            onClick={() => navigate("/login")}
          >
            Login to ERP
          </button>

        </div>

        <div className="hero-points">

          <span>✓ Complete ERP</span>

          <span>✓ Real-time Management</span>

          <span>✓ Centralized Business Data</span>

        </div>

      </div>

    </main>
  );
}

export default Hero;