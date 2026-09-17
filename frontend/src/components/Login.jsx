import { useState } from "react";
import { Heart, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [loginType, setLoginType] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminKey: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HANDLE LOGIN TYPE
  // =====================================================

  const handleLoginTypeChange = (type) => {
    if (loading) return;

    setLoginType(type);

    if (type === "user") {
      setFormData((prev) => ({
        ...prev,
        adminKey: "",
      }));
    }
  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      // ===================================================
      // LOGIN THROUGH AUTH CONTEXT
      // ===================================================

      const data = await login(
        formData.email,
        formData.password,
        loginType,
        formData.adminKey,
      );

      // ===================================================
      // SAFETY CHECK
      // ===================================================

      if (!data?.user) {
        throw new Error("Invalid response received from server.");
      }

      // ===================================================
      // ADMIN SAFETY CHECK
      // ===================================================

      if (loginType === "admin" && data.user.role !== "ADMIN") {
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "This account does not have administrator access.",
          confirmButtonText: "OK",
        });

        return;
      }

      // ===================================================
      // SUCCESS MESSAGE
      // ===================================================

      await Swal.fire({
        icon: "success",
        title:
          loginType === "admin" ? "Admin Login Successful" : "Login Successful",
        text: `Welcome back, ${data.user.name}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      // ===================================================
      // ADMIN
      // ===================================================

      if (loginType === "admin") {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      // ===================================================
      // NORMAL USER
      // ===================================================

      const redirectPath = location.state?.from;

      if (redirectPath) {
        navigate(redirectPath, {
          replace: true,
        });

        return;
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.message ||
          "Unable to login. Please check your credentials and try again.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div className="auth-info">
          <Link to="/" className="auth-back">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="auth-heart">
            {loginType === "admin" ? (
              <ShieldCheck size={42} />
            ) : (
              <Heart size={42} />
            )}
          </div>

          <h1>
            {loginType === "admin" ? (
              <>
                Admin <span>Access</span>
              </>
            ) : (
              <>
                Welcome <span>Back</span>
              </>
            )}
          </h1>

          <p>
            {loginType === "admin"
              ? "Sign in securely to manage Hanumant Seva and monitor our initiatives."
              : "Sign in to continue your journey of service with Hanumant Seva."}
          </p>

          <div className="auth-quote">
            {loginType === "admin"
              ? '"Responsible service begins with responsible management."'
              : '"One small contribution can become someone\'s meal."'}
          </div>
        </div>

        {/* =================================================
            RIGHT SECTION
        ================================================= */}

        <div className="auth-card">
          <h2>{loginType === "admin" ? "Admin Login" : "Login"}</h2>

          <p className="auth-subtitle">
            {loginType === "admin"
              ? "Sign in to access the administration panel."
              : "Sign in to continue with Hanumant Seva."}
          </p>

          {/* =================================================
              LOGIN TYPE
          ================================================= */}

          <div className="login-type">
            <button
              type="button"
              className={loginType === "user" ? "active" : ""}
              onClick={() => handleLoginTypeChange("user")}
              disabled={loading}
            >
              User / Volunteer
            </button>

            <button
              type="button"
              className={loginType === "admin" ? "active" : ""}
              onClick={() => handleLoginTypeChange("admin")}
              disabled={loading}
            >
              Admin
            </button>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>
            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className="input-box">
                <Mail size={20} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* =================================================
                ADMIN KEY
            ================================================= */}

            {loginType === "admin" && (
              <div className="form-group">
                <label htmlFor="adminKey">Admin Key</label>

                <div className="input-box">
                  <ShieldCheck size={20} />

                  <input
                    id="adminKey"
                    type="password"
                    name="adminKey"
                    placeholder="Enter admin key"
                    value={formData.adminKey}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="off"
                  />
                </div>

                <small className="admin-key-note">
                  Administrator access is verified using your account role.
                </small>
              </div>
            )}

            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <div className="forgot-row">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : loginType === "admin"
                  ? "Login as Admin"
                  : "Login"}
            </button>
          </form>

          {/* =================================================
              USER REGISTRATION
          ================================================= */}

          {loginType === "user" && (
            <>
              <div className="auth-divider">
                <span>OR</span>
              </div>

              <p className="register-text">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  state={{
                    from: location.state?.from,
                  }}
                >
                  Create Account
                </Link>
              </p>
            </>
          )}

          {/* =================================================
              ADMIN MESSAGE
          ================================================= */}

          {loginType === "admin" && (
            <div className="admin-login-note">
              <ShieldCheck size={18} />

              <span>
                Administrator access is restricted to authorized Hanumant Seva
                members.
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;
