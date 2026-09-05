import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // =====================================================
  // SHOW LOGIN ALERT
  // =====================================================

  useEffect(() => {
    if (!loading && !user) {
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
  // USER AUTHENTICATED
  // =====================================================

  return children;
};

export default ProtectedRoute;
