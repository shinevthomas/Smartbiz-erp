import "./Login.css";

import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
  "/auth/login",
        formData
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save logged in user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-brand-section">

        <div className="login-brand">

          <div className="login-logo">
            SB
          </div>

          <div>
            <h2>SmartBiz ERP</h2>
            <span>Business Management</span>
          </div>

        </div>

        <div className="brand-content">

          <span className="brand-badge">
            SMART BUSINESS MANAGEMENT
          </span>

          <h1>
            Run your business
            <br />
            <span>smarter & faster.</span>
          </h1>

          <p>
            Manage inventory, sales, customers, invoices and
            business reports from one powerful platform.
          </p>

          <div className="brand-features">

            <div>
              <span className="feature-check">✓</span>
              <span>Complete business management</span>
            </div>

            <div>
              <span className="feature-check">✓</span>
              <span>Real-time inventory tracking</span>
            </div>

            <div>
              <span className="feature-check">✓</span>
              <span>Secure and centralized data</span>
            </div>

          </div>

        </div>

        <div className="brand-footer">
          © 2026 SmartBiz ERP. All rights reserved.
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-box">

          <div className="mobile-logo">

            <div className="login-logo">
              SB
            </div>

            <div>
              <h2>SmartBiz ERP</h2>
              <span>Business Management</span>
            </div>

          </div>

          <div className="login-heading">

            <h1>Welcome Back 👋</h1>

            <p>
              Sign in to continue to your SmartBiz ERP account.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <FiMail className="input-icon" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <a href="#forgot">
                  Forgot password?
                </a>

              </div>

              <div className="input-wrapper">

                <FiLock className="input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>

              </div>

            </div>


            {/* REMEMBER */}
            <div className="remember-row">

              <label className="remember-label">

                <input
                  type="checkbox"
                  name="remember"
                />

                <span>Remember me</span>

              </label>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading ? "Signing in..." : "Sign In"}

              {!loading && <FiArrowRight />}

            </button>

          </form>


          {/* REGISTER */}
          <div className="register-text">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </div>


          {/* SECURITY */}
          <div className="login-security">

            <span>🔒</span>

            <div>
              <strong>Secure Login</strong>
              <p>Your account information is protected.</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;