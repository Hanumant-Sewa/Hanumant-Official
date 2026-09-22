import { Mail, ArrowLeft, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();

  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (method === "email") {
      alert(t("forgotPassword.alerts.email"));
    } else {
      alert(t("forgotPassword.alerts.mobile"));
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

          <p>
            {t("forgotPassword.description")}
          </p>

        </div>

        <div className="auth-card">

          <h2>{t("forgotPassword.cardTitle")}</h2>

          <p className="auth-subtitle">
            {t("forgotPassword.subtitle")}
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
              {t("forgotPassword.email")}
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
                      ? t("forgotPassword.emailPlaceholder")
                      : t("forgotPassword.mobilePlaceholder")
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
                ? t("forgotPassword.sendResetLink")
                : t("forgotPassword.sendOtp")}
            </button>

          </form>

          <p className="register-text">

            {t("forgotPassword.rememberPassword")}{" "}

            <Link to="/login">
              {t("forgotPassword.login")}
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default ForgotPassword;