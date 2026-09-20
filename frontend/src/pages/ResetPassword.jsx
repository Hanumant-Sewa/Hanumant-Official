import { ArrowLeft, Heart, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check token
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Invalid Reset Link",
        text: "This password reset link is invalid or incomplete.",
        confirmButtonColor: "#d97706",
      });

      return;
    }

    // Password length validation
    if (password.length < 8) {
      Swal.fire({
        icon: "warning",
        title: "Password Too Short",
        text: "Your password must be at least 8 characters long.",
        confirmButtonColor: "#d97706",
      });

      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        text: "Please make sure both passwords are the same.",
        confirmButtonColor: "#d97706",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset your password.");
      }

      await Swal.fire({
        icon: "success",
        title: "Password Reset Successfully",
        text: "Your password has been updated. You can now login with your new password.",
        confirmButtonColor: "#d97706",
      });

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);

      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#d97706",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        {/* LEFT SIDE */}

        <div className="auth-info">
          <Link to="/login" className="auth-back">
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <div className="auth-heart">
            <Heart size={42} />
          </div>

          <h1>
            Create New <span>Password</span>
          </h1>

          <p>
            Choose a strong password to keep your Hanumant Seva account secure.
          </p>
        </div>

        {/* RIGHT SIDE */}

        <div className="auth-card">
          <h2>Reset Password</h2>

          <p className="auth-subtitle">Enter your new password below.</p>

          <form onSubmit={handleSubmit}>
            {/* NEW PASSWORD */}

            <div className="form-group">
              <label>New Password</label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* PASSWORD REQUIREMENT */}

            <p
              style={{
                fontSize: "13px",
                color: "#777",

                marginBottom: "18px",
              }}
            >
              Password must be at least 8 characters long.
            </p>

            {/* SUBMIT */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          <p className="register-text">
            Remember your password?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
