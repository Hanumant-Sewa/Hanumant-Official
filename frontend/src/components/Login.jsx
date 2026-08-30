import { useState } from "react";
import { Heart, Lock, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
const navigate = useNavigate();
const location = useLocation();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const response = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    }
  );

  const data = await response.json();

  if (response.ok) {
    // Save JWT token and user information
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Login successful!");

    // Navigate to the page the user originally wanted to visit
    const intendedPage = location.state?.intendedPage || "/donate";

    navigate(intendedPage, { replace: true });
  } else {
    alert(data.message || "Invalid email or password");
  }
} catch (error) {
  console.error("Login error:", error);
  alert("Unable to connect to the backend server");
}

};

return ( <main className="auth-page"> <div className="auth-container">
    {/* LEFT */}
    <div className="auth-info">
      <Link to="/" className="auth-back">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      <div className="auth-heart">
        <Heart size={42} />
      </div>

      <h1>
        Welcome <span>Back</span>
      </h1>

      <p>
        Sign in to continue your journey of service
        with Hanumat Seva.
      </p>

      <div className="auth-quote">
        "One small contribution can become someone's meal."
      </div>
    </div>

    {/* RIGHT */}
    <div className="auth-card">
      <h2>Login</h2>

      <p className="auth-subtitle">
        Sign in to continue with your donation.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>

          <div className="input-box">
            <Mail size={20} />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>

          <div className="input-box">
            <Lock size={20} />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="forgot-row">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-primary auth-submit"
        >
          Login
        </button>
      </form>

      <div className="auth-divider">
        <span>OR</span>
      </div>

      <p className="register-text">
        Don't have an account?{" "}
        <Link to="/register">
          Create Account
        </Link>
      </p>
    </div>

  </div>
</main>

)
}

export default Login;
