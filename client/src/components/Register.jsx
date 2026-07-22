import { Link } from "react-router-dom";
function Register() {
  return (
    <section className="login">
      <div className="login-box">
        <h2>Create Account 📝</h2>
        <p>Register for SmartBiz ERP</p>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <input type="password" placeholder="Confirm Password" />

        <button>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;