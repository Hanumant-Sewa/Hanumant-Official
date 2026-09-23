import { useState } from "react";
import { User, Mail, Phone, Lock, Heart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Register() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     REGISTER
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    /* =========================
       PASSWORD CHECK
    ========================= */

    if (formData.password !== formData.confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: t("register.alerts.passwordMismatch.title"),
        text: t("register.alerts.passwordMismatch.text"),
        confirmButtonText: t("register.alerts.ok"),
      });

      return;
    }

    /* =========================
       PASSWORD LENGTH
    ========================= */

    if (formData.password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: t("register.alerts.passwordShort.title"),
        text: t("register.alerts.passwordShort.text"),
        confirmButtonText: t("register.alerts.ok"),
      });

      return;
    }

    /* =========================
       PHONE VALIDATION
    ========================= */

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      await Swal.fire({
        icon: "warning",
        title: t("register.alerts.invalidPhone.title"),
        text: t("register.alerts.invalidPhone.text"),
        confirmButtonText: t("register.alerts.ok"),
      });

      return;
    }

    setLoading(true);

    try {
      /* =========================
         SEND DATA TO BACKEND
      ========================= */

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Required for cookie-based authentication.
          credentials: "include",

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      /* =========================
         REGISTRATION FAILED
      ========================= */

      if (!response.ok) {
        await Swal.fire({
          icon: "error",
          title: t("register.alerts.registrationFailed.title"),
          text:
            data.message ||
            t("register.alerts.registrationFailed.text"),
          confirmButtonText: t("register.alerts.tryAgain"),
        });

        return;
      }

      /* =========================
         REGISTRATION SUCCESS
      ========================= */

      await Swal.fire({
        icon: "success",
        title: t("register.alerts.success.title"),
        text: t("register.alerts.success.text"),
        confirmButtonText: t("register.alerts.success.continue"),
      });

      /* =========================
         GO TO LOGIN
      ========================= */

      navigate("/login", {
        replace: true,
        state: {
          from: location.state?.from,
        },
      });
    } catch (error) {
      console.error("Registration Error:", error);

      await Swal.fire({
        icon: "error",
        title: t("register.alerts.connectionError.title"),
        text: t("register.alerts.connectionError.text"),
        confirmButtonText: t("register.alerts.ok"),
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
            ← {t("register.backToHome")}
          </Link>

          <div className="auth-heart">
            <Heart size={42} />
          </div>

          <h1>
            {t("register.join")}{" "}
            <span>{t("register.hanumatSeva")}</span>
          </h1>

          <p>
            {t("register.description")}
          </p>

          <div className="auth-points">
            <div>✓ {t("register.points.support")}</div>
            <div>✓ {t("register.points.track")}</div>
            <div>✓ {t("register.points.impact")}</div>
            <div>✓ {t("register.points.community")}</div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="auth-card register-card">
          <h2>{t("register.createAccount")}</h2>

          <p className="auth-subtitle">
            {t("register.subtitle")}
          </p>

          <form onSubmit={handleSubmit}>

            {/* ================= NAME ================= */}

            <div className="form-group">
              <label htmlFor="name">
                {t("register.fullName")}
              </label>

              <div className="input-box">
                <User size={20} />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder={t("register.fullNamePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* ================= EMAIL ================= */}

            <div className="form-group">
              <label htmlFor="email">
                {t("register.emailAddress")}
              </label>

              <div className="input-box">
                <Mail size={20} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t("register.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* ================= PHONE ================= */}

            <div className="form-group">
              <label htmlFor="phone">
                {t("register.phoneNumber")}
              </label>

              <div className="input-box">
                <Phone size={20} />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder={t("register.phonePlaceholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  required
                  disabled={loading}
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="form-group">
              <label htmlFor="password">
                {t("register.password")}
              </label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder={t("register.passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* ================= CONFIRM PASSWORD ================= */}

            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t("register.confirmPassword")}
              </label>

              <div className="input-box">
                <Lock size={20} />

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder={t("register.confirmPasswordPlaceholder")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* ================= SUBMIT ================= */}

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading
                ? t("register.creatingAccount")
                : t("register.createAccount")}
            </button>
          </form>

          {/* ================= LOGIN ================= */}

          <p className="register-text">
            {t("register.alreadyHaveAccount")}{" "}

            <Link
              to="/login"
              state={{
                from: location.state?.from,
              }}
            >
              {t("register.login")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;