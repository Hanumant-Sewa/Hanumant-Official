import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function ProtectedButton({ to, className, children, allowedRoles, ...props }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();

    // =====================================================
    // WAIT FOR AUTHENTICATION CHECK
    // =====================================================

    if (loading) {
      return;
    }

    // =====================================================
    // USER NOT LOGGED IN
    // =====================================================

    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login first to continue.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",

        // Hanumat Seva theme
        background: "#fffaf3",
        color: "#3b2a1f",

        confirmButtonColor: "#e87524",
        cancelButtonColor: "#8b6f5a",

        buttonsStyling: true,

        customClass: {
          popup: "hanumat-swal-popup",
          title: "hanumat-swal-title",
          htmlContainer: "hanumat-swal-text",
          confirmButton: "hanumat-swal-confirm",
          cancelButton: "hanumat-swal-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: {
              intendedPage: to,
            },
          });
        }
      });

      return;
    }

    // =====================================================
    // ROLE CHECK
    // =====================================================

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      const isAdmin = user.role === "ADMIN";

      Swal.fire({
        title: isAdmin ? "Admin Access" : "Access Restricted",

        text: isAdmin
          ? "This action is not available for administrators. Please use the Admin Dashboard to manage the organization."
          : "You do not have permission to access this section.",

        icon: "info",

        confirmButtonText: isAdmin
          ? "Go to Admin Dashboard"
          : "Go to Dashboard",

        showCancelButton: true,
        cancelButtonText: "Stay Here",

        background: "#fffaf3",
        color: "#3b2a1f",

        confirmButtonColor: "#e87524",
        cancelButtonColor: "#8b6f5a",

        buttonsStyling: true,

        customClass: {
          popup: "hanumat-swal-popup",
          title: "hanumat-swal-title",
          htmlContainer: "hanumat-swal-text",
          confirmButton: "hanumat-swal-confirm",
          cancelButton: "hanumat-swal-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(isAdmin ? "/admin" : "/dashboard");
        }
      });

      return;
    }

    // =====================================================
    // USER AUTHENTICATED + AUTHORIZED
    // =====================================================

    navigate(to);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default ProtectedButton;
