import { Link } from "react-router-dom";
function Login() {
  return (
    <section className="login">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to SmartBiz ERP</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;