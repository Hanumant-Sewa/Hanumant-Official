import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function ProtectedButton({
  to,
  className,
  children,
  allowedRoles,
  ...props
}) {
  const { t } = useTranslation();

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
        title: t("protectedButton.loginRequired.title"),
        text: t("protectedButton.loginRequired.text"),
        icon: "warning",
        confirmButtonText: t("protectedButton.loginRequired.login"),
        showCancelButton: true,
        cancelButtonText: t("protectedButton.loginRequired.cancel"),

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
        title: isAdmin
          ? t("protectedButton.access.adminTitle")
          : t("protectedButton.access.restrictedTitle"),

        text: isAdmin
          ? t("protectedButton.access.adminText")
          : t("protectedButton.access.restrictedText"),

        icon: "info",

        confirmButtonText: isAdmin
          ? t("protectedButton.access.adminButton")
          : t("protectedButton.access.dashboardButton"),

        showCancelButton: true,
        cancelButtonText: t("protectedButton.access.stayHere"),

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