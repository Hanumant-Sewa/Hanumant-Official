import { Mail, ArrowLeft, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();

  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Currently only email password reset is implemented
    if (method !== "email") {
      Swal.fire({
        icon: "info",
        title: "Coming Soon",
        text: "Mobile OTP password reset is not available yet. Please use your email address.",
        confirmButtonColor: "#d97706",
      });
      return;
    }

    if (!value.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your registered email address.",
        confirmButtonColor: "#d97706",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: value.trim().toLowerCase(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to process password reset request.",
        );
      }

      Swal.fire({
        icon: "success",
        title: "Check Your Email",
        text:
          data.message ||
          "If an account exists with this email, a password reset link has been sent.",
        confirmButtonColor: "#d97706",
      });

      // Clear the input after successful request
      setValue("");
    } catch (error) {
      console.error("Forgot password error:", error);

      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text:
          error.message ||
          "Unable to send the password reset email. Please try again.",
        confirmButtonColor: "#d97706",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-info">
          <Link to="/login" className="auth-back">
            <ArrowLeft size={18} />
            {t("forgotPassword.backToLogin")}
          </Link>

          <div className="auth-heart">
            <Heart size={42} />
          </div>

          <h1>
            {t("forgotPassword.titleFirst")}{" "}
            <span>{t("forgotPassword.titleHighlight")}</span>
          </h1>

          <p>{t("forgotPassword.description")}</p>
        </div>

        <div className="auth-card">
          <h2>{t("forgotPassword.cardTitle")}</h2>

          <p className="auth-subtitle">{t("forgotPassword.subtitle")}</p>

          {/* EMAIL / MOBILE OPTION */}
          <div className="reset-methods">
            <button
              type="button"
              className={
                method === "email" ? "reset-method active" : "reset-method"
              }
              onClick={() => {
                setMethod("email");
                setValue("");
              }}
            >
              <Mail size={20} />
              {t("forgotPassword.email")}
            </button>

            <button
              type="button"
              className={
                method === "mobile" ? "reset-method active" : "reset-method"
              }
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "Coming Soon",
                  text: "Mobile OTP password reset is not available yet. Please use your email address.",
                  confirmButtonColor: "#d97706",
                });
              }}
            >
              <Phone size={20} />
              {t("forgotPassword.mobile")}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                {method === "email"
                  ? t("forgotPassword.emailAddress")
                  : t("forgotPassword.mobileNumber")}
              </label>

              <div className="input-box">
                {method === "email" ? <Mail size={20} /> : <Phone size={20} />}

                <input
                  type={method === "email" ? "email" : "tel"}
                  placeholder={
                    method === "email"
                      ? t("forgotPassword.emailPlaceholder")
                      : t("forgotPassword.mobilePlaceholder")
                  }
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : method === "email"
                  ? t("forgotPassword.sendResetLink")
                  : t("forgotPassword.sendOtp")}
            </button>
          </form>

          <p className="register-text">
            {t("forgotPassword.rememberPassword")}{" "}
            <Link to="/login">{t("forgotPassword.login")}</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
