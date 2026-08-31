import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link to="/" className="logo">

          <div className="logo-icon">
            SB
          </div>

          <div className="logo-text">
            <h2>SmartBiz ERP</h2>
            <span>Business Management</span>
          </div>

        </Link>

        {/* Navigation */}

        <nav className="nav-links">

          <a href="#features">Features</a>

          <a href="#solutions">Solutions</a>

          <a href="#pricing">Pricing</a>

          <a href="#about">About</a>

          <a href="#contact">Contact</a>

        </nav>

        {/* Right Side */}

        <div className="nav-actions">

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="start-btn">
            Get Started
            <FiArrowRight />
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;