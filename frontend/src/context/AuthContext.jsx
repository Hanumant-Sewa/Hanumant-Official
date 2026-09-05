import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK CURRENT LOGIN SESSION
  // =====================================================

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();

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

  const login = async (email, password, loginType = "user", adminKey = "") => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
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
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setUser(data.user);

    return data;
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Logout failed");
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
