import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK CURRENT LOGIN SESSION
  // =====================================================

  const checkAuth = async () => {
    try {
      if (!API_URL) {
        console.error(
          "VITE_API_URL is not defined. Check frontend/.env"
        );

        setUser(null);
        return;
      }

      const response = await fetch(
        `${API_URL}/api/auth/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Auth profile returned non-JSON response:",
          text
        );

        setUser(null);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setUser(null);
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (
    email,
    password,
    loginType = "user",
    adminKey = ""
  ) => {
    try {
      if (!API_URL) {
        throw new Error(
          "VITE_API_URL is not defined. Check frontend/.env"
        );
      }

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email,
            password,
            loginType,
            adminKey,
          }),
        }
      );

      // ================================================
      // CHECK RESPONSE TYPE
      // ================================================

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Login returned non-JSON response:",
          text
        );

        throw new Error(
          "Server returned an invalid response. Please check that the backend is running on port 5000."
        );
      }

      const data = await response.json();

      console.log("Login Response:", data);

      // ================================================
      // LOGIN ERROR
      // ================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // ================================================
      // LOGIN SUCCESS
      // ================================================

      setUser(data.user);

      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      if (!API_URL) {
        throw new Error(
          "VITE_API_URL is not defined. Check frontend/.env"
        );
      }

      const response = await fetch(
        `${API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Logout returned non-JSON response:",
          text
        );

        throw new Error(
          "Server returned an invalid response."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Logout failed"
        );
      }

      setUser(null);

      return data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // =====================================================
  // CHECK SESSION WHEN APP LOADS
  // =====================================================

  useEffect(() => {
    checkAuth();
  }, []);

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};