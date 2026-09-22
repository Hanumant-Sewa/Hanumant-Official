import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProtectedLink({ to, children, allowedRoles, ...props }) {
  const { t } = useTranslation();

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
        title: t("protectedLink.loginRequired.title"),
        text: t("protectedLink.loginRequired.text"),
        icon: "warning",
        confirmButtonText: t("protectedLink.loginRequired.login"),
        showCancelButton: true,
        cancelButtonText: t("protectedLink.loginRequired.cancel"),

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
        title: isAdmin
          ? t("protectedLink.access.adminTitle")
          : t("protectedLink.access.restrictedTitle"),

        text: isAdmin
          ? t("protectedLink.access.adminText")
          : t("protectedLink.access.restrictedText"),

        icon: "info",

        confirmButtonText: isAdmin
          ? t("protectedLink.access.adminButton")
          : t("protectedLink.access.dashboardButton"),

        showCancelButton: true,
        cancelButtonText: t("protectedLink.access.stayHere"),

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