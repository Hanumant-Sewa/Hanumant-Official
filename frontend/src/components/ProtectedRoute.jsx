import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
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
        title: "Login Required",
        text: "Please login to access this page.",
        icon: "warning",
        confirmButtonText: "Go to Login",

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
  }, [loading, user]);

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
        title: isAdmin ? "Admin Access" : "Access Restricted",

        text: isAdmin
          ? "This page is not available for administrators. You can manage this section from the Admin Dashboard."
          : "You do not have permission to access this page.",

        icon: "info",

        confirmButtonText: isAdmin
          ? "Go to Admin Dashboard"
          : "Go to Dashboard",

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
  }, [loading, user, allowedRoles]);

  // =====================================================
  // WAIT FOR AUTHENTICATION CHECK
  // =====================================================

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>
        <p>Checking authentication...</p>
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
    const redirectPath = user.role === "ADMIN" ? "/admin" : "/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  // =====================================================
  // USER AUTHENTICATED + AUTHORIZED
  // =====================================================

  return children;
};

export default ProtectedRoute;
