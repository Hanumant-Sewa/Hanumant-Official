import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { t } = useTranslation();

  const { user, loading } = useAuth();
  const location = useLocation();

  const alertShown = useRef(false);

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  useEffect(() => {
    if (!loading && !user && !alertShown.current) {
      alertShown.current = true;

      Swal.fire({
        title: t("protectedRoute.loginRequired.title"),
        text: t("protectedRoute.loginRequired.text"),
        icon: "warning",
        confirmButtonText: t("protectedRoute.loginRequired.login"),

        // Hanumat Seva theme
        background: "#fffaf3",
        color: "#3b2a1f",

        confirmButtonColor: "#e87524",

        buttonsStyling: true,

        customClass: {
          popup: "hanumat-swal-popup",
          title: "hanumat-swal-title",
          htmlContainer: "hanumat-swal-text",
          confirmButton: "hanumat-swal-confirm",
        },
      });
    }
  }, [loading, user, t]);

  // =====================================================
  // ROLE ACCESS DENIED
  // =====================================================

  useEffect(() => {
    if (
      !loading &&
      user &&
      allowedRoles &&
      !allowedRoles.includes(user.role) &&
      !alertShown.current
    ) {
      alertShown.current = true;

      const isAdmin = user.role === "ADMIN";

      Swal.fire({
        title: isAdmin
          ? t("protectedRoute.access.adminTitle")
          : t("protectedRoute.access.restrictedTitle"),

        text: isAdmin
          ? t("protectedRoute.access.adminText")
          : t("protectedRoute.access.restrictedText"),

        icon: "info",

        confirmButtonText: isAdmin
          ? t("protectedRoute.access.adminButton")
          : t("protectedRoute.access.dashboardButton"),

        background: "#fffaf3",
        color: "#3b2a1f",

        confirmButtonColor: "#e87524",

        buttonsStyling: true,

        customClass: {
          popup: "hanumat-swal-popup",
          title: "hanumat-swal-title",
          htmlContainer: "hanumat-swal-text",
          confirmButton: "hanumat-swal-confirm",
        },
      });
    }
  }, [loading, user, allowedRoles, t]);

  // =====================================================
  // WAIT FOR AUTHENTICATION CHECK
  // =====================================================

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>

        <p>{t("protectedRoute.checkingAuthentication")}</p>
      </div>
    );
  }

  // =====================================================
  // USER NOT LOGGED IN
  // =====================================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  // =====================================================
  // ROLE CHECK
  // =====================================================

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirectPath =
      user.role === "ADMIN" ? "/admin" : "/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  // =====================================================
  // USER AUTHENTICATED + AUTHORIZED
  // =====================================================

  return children;
};

export default ProtectedRoute;