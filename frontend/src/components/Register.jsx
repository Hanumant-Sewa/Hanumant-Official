import { useState } from "react";
import { User, Mail, Phone, Lock, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     REGISTER
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* =========================
       PASSWORD CHECK
    ========================= */

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Don't Match",
        text: "Please make sure both passwords are the same.",
      });

      return;
    }

    /* =========================
       BASIC PHONE VALIDATION
    ========================= */

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
      });

      return;
    }

    setLoading(true);

    try {
      /* =========================
         SEND DATA TO BACKEND
      ========================= */

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      /* =========================
         REGISTRATION FAILED
      ========================= */

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            data.message || "Unable to create your account. Please try again.",
        });

        return;
      }

      /* =========================
         REGISTRATION SUCCESS
      ========================= */

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your Hanumat Seva account has been created successfully.",
        confirmButtonText: "Continue to Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error("Registration Error:", error);

      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Unable to connect to the server. Please make sure the backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        {/* ================= LEFT ================= */}

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
            Create your account and become part of a community built around
            service and compassion.
          </p>

          <div className="auth-points">
            <div>✓ Support food-related initiatives</div>
            <div>✓ Track your contribution</div>
            <div>✓ Build your impact profile</div>
            <div>✓ Join the community</div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="auth-card register-card">
          <h2>Create Account</h2>

          <p className="auth-subtitle">Create your Hanumat Seva account.</p>

          <form onSubmit={handleSubmit}>
            {/* ================= NAME ================= */}

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

            {/* ================= EMAIL ================= */}

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

            {/* ================= PHONE ================= */}

            <div className="form-group">
              <label>Phone Number</label>

              <div className="input-box">
                <Phone size={20} />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

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

            {/* ================= CONFIRM PASSWORD ================= */}

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

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* ================= LOGIN ================= */}

          <p className="register-text">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
