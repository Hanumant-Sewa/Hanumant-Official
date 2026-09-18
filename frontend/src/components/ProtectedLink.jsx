import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function ProtectedLink({ to, children, allowedRoles, ...props }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    // =====================================================
    // WAIT FOR AUTHENTICATION CHECK
    // =====================================================

    if (loading) {
      e.preventDefault();
      return;
    }

    // =====================================================
    // USER NOT LOGGED IN
    // =====================================================

    if (!user) {
      e.preventDefault();

      Swal.fire({
        title: "Login Required",
        text: "Please login first to continue.",
        icon: "warning",
        confirmButtonText: "Go to Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",

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
              from: to,
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
      e.preventDefault();

      const isAdmin = user.role === "ADMIN";

      Swal.fire({
        title: isAdmin ? "Admin Access" : "Access Restricted",

        text: isAdmin
          ? "This section is not available for administrators. Please use the Admin Dashboard to manage the organization."
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
    }
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default ProtectedLink;
