import { useState } from "react";
import { Heart, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { t } = useTranslation();

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
        throw new Error(t("login.errors.invalidResponse"));
      }

      // ===================================================
      // ADMIN SAFETY CHECK
      // ===================================================

      if (loginType === "admin" && data.user.role !== "ADMIN") {
        await Swal.fire({
          icon: "error",
          title: t("login.alerts.accessDenied.title"),
          text: t("login.alerts.accessDenied.text"),
          confirmButtonText: t("login.alerts.ok"),
        });

        return;
      }

      // ===================================================
      // SUCCESS MESSAGE
      // ===================================================

      await Swal.fire({
        icon: "success",
        title:
          loginType === "admin"
            ? t("login.alerts.adminSuccess.title")
            : t("login.alerts.loginSuccess.title"),
        text: t("login.alerts.welcome", {
          name: data.user.name,
        }),
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
      // =====================================================

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
        title: t("login.alerts.loginFailed.title"),
        text:
          error.message ||
          t("login.alerts.loginFailed.text"),
        confirmButtonText: t("login.alerts.tryAgain"),
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
            {t("login.backToHome")}
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
                {t("login.adminAccess.first")}{" "}
                <span>{t("login.adminAccess.highlight")}</span>
              </>
            ) : (
              <>
                {t("login.welcome.first")}{" "}
                <span>{t("login.welcome.highlight")}</span>
              </>
            )}
          </h1>

          <p>
            {loginType === "admin"
              ? t("login.adminDescription")
              : t("login.userDescription")}
          </p>

          <div className="auth-quote">
            {loginType === "admin"
              ? t("login.adminQuote")
              : t("login.userQuote")}
          </div>
        </div>

        {/* =================================================
            RIGHT SECTION
        ================================================= */}

        <div className="auth-card">
          <h2>
            {loginType === "admin"
              ? t("login.adminLogin")
              : t("login.login")}
          </h2>

          <p className="auth-subtitle">
            {loginType === "admin"
              ? t("login.adminSubtitle")
              : t("login.userSubtitle")}
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
              {t("login.userVolunteer")}
            </button>

            <button
              type="button"
              className={loginType === "admin" ? "active" : ""}
              onClick={() => handleLoginTypeChange("admin")}
              disabled={loading}
            >
              {t("login.admin")}
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
              <label htmlFor="email">
                {t("login.emailAddress")}
              </label>

              <div className="input-box">
                <Mail size={20} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t("login.emailPlaceholder")}
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
              <label htmlFor="password">
                {t("login.password")}
              </label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder={t("login.passwordPlaceholder")}
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
                <label htmlFor="adminKey">
                  {t("login.adminKey")}
                </label>

                <div className="input-box">
                  <ShieldCheck size={20} />

                  <input
                    id="adminKey"
                    type="password"
                    name="adminKey"
                    placeholder={t("login.adminKeyPlaceholder")}
                    value={formData.adminKey}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    autoComplete="off"
                  />
                </div>

                <small className="admin-key-note">
                  {t("login.adminKeyNote")}
                </small>
              </div>
            )}

            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <div className="forgot-row">
              <Link to="/forgot-password">
                {t("login.forgotPassword")}
              </Link>
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
                ? t("login.loggingIn")
                : loginType === "admin"
                  ? t("login.loginAsAdmin")
                  : t("login.login")}
            </button>
          </form>

          {/* =================================================
              USER REGISTRATION
          ================================================= */}

          {loginType === "user" && (
            <>
              <div className="auth-divider">
                <span>{t("login.or")}</span>
              </div>

              <p className="register-text">
                {t("login.noAccount")}{" "}

                <Link
                  to="/register"
                  state={{
                    from: location.state?.from,
                  }}
                >
                  {t("login.createAccount")}
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
                {t("login.adminRestricted")}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;