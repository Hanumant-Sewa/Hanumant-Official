import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function ProtectedLink({ to, children, ...props }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (loading) {
      e.preventDefault();
      return;
    }

    if (!user) {
      e.preventDefault();

      Swal.fire({
        title: "Login Required",
        text: "Please login to view your contribution history.",
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
    }
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default ProtectedLink;
