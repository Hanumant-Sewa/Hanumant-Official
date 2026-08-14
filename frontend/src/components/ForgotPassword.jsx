import { Mail, ArrowLeft, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {

  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "email") {
      alert("Password reset link sent to your email.");
    } else {
      alert("Password reset OTP sent to your mobile number.");
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-info">

          <Link to="/login" className="auth-back">
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <div className="auth-heart">
            <Heart size={42} />
          </div>

          <h1>
            Reset Your <span>Password</span>
          </h1>

          <p>
            Enter your registered email address or mobile
            number to reset your password.
          </p>

        </div>

        <div className="auth-card">

          <h2>Forgot Password?</h2>

          <p className="auth-subtitle">
            Choose email or mobile number to reset your password.
          </p>

          {/* EMAIL / MOBILE OPTION */}

          <div className="reset-methods">

            <button
              type="button"
              className={
                method === "email"
                  ? "reset-method active"
                  : "reset-method"
              }
              onClick={() => {
                setMethod("email");
                setValue("");
              }}
            >
              <Mail size={20} />
              Email
            </button>

            <button
              type="button"
              className={
                method === "mobile"
                  ? "reset-method active"
                  : "reset-method"
              }
              onClick={() => {
                setMethod("mobile");
                setValue("");
              }}
            >
              <Phone size={20} />
              Mobile Number
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                {method === "email"
                  ? "Email Address"
                  : "Mobile Number"}
              </label>

              <div className="input-box">

                {method === "email" ? (
                  <Mail size={20} />
                ) : (
                  <Phone size={20} />
                )}

                <input
                  type={
                    method === "email"
                      ? "email"
                      : "tel"
                  }
                  placeholder={
                    method === "email"
                      ? "Enter your email"
                      : "Enter your mobile number"
                  }
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
            >
              {method === "email"
                ? "Send Reset Link"
                : "Send OTP"}
            </button>

          </form>

          <p className="register-text">

            Remember your password?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default ForgotPassword;