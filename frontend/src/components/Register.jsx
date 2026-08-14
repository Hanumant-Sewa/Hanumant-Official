import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Frontend demo
    navigate("/donate");

  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* LEFT */}
        <div className="auth-info">

          <Link to="/" className="auth-back">
            ← Back to Home
          </Link>

          <div className="auth-heart">
            <Heart size={42} />
          </div>

          <h1>
            Join <span>Hanumat Seva</span>
          </h1>

          <p>
            Create your account and become part of a
            community built around service and compassion.
          </p>

          <div className="auth-points">

            <div>✓ Support food-related initiatives</div>
            <div>✓ Track your contribution</div>
            <div>✓ Build your impact profile</div>
            <div>✓ Join the community</div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="auth-card register-card">

          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Create your Hanumat Seva account.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Full Name</label>

              <div className="input-box">

                <User size={20} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

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

              <label>Phone Number</label>

              <div className="input-box">

                <Phone size={20} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label>Confirm Password</label>

              <div className="input-box">

                <Lock size={20} />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
            >
              Create Account
            </button>

          </form>

          <p className="register-text">
            Already have an account?
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;