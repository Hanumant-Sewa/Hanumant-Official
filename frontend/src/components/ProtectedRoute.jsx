import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

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
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to access this page.",
      confirmButtonText: "Go to Login",
    });

    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // =====================================================
  // USER AUTHENTICATED
  // =====================================================

  return children;
};

export default ProtectedRoute;
