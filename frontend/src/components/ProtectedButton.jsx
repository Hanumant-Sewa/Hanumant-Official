import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ProtectedButton({ to, className, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");

      navigate("/login", {
        state: {
          intendedPage: to,
        },
      });
      return;
    }

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
  )
}

export default ProtectedButton;