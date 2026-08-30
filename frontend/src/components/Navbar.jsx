import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Users,
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [activeSection, setActiveSection] = useState("home");

  const profileRef = useRef(null);

  // =====================================================
  // CHECK LOGIN STATUS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  // =====================================================
  // CLOSE PROFILE DROPDOWN WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // =====================================================
  // SCROLL SPY
  // =====================================================

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["home", "about", "programs", "impact", "campaigns"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element && scrollPosition >= element.offsetTop) {
          currentSection = section;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  // =====================================================
  // HOME CLICK
  // =====================================================

  const handleHomeClick = (e) => {
    e.preventDefault();

    setMenuOpen(false);
    setProfileOpen(false);
    setActiveSection("home");

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SECTION CLICK
  // =====================================================

  const handleSectionClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // =====================================================
  // PROTECTED NAVIGATION
  // =====================================================

  const handleProtectedNavigation = (path, pageName) => {
    setMenuOpen(false);
    setProfileOpen(false);

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: `Please login first to access ${pageName}.`,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      return;
    }

    navigate(path);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    setProfileOpen(false);
    setMenuOpen(false);

    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(null);

        await Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: data.message || "You have been logged out successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: data.message || "Unable to logout.",
        });
      }
    } catch (error) {
      console.error("Logout Error:", error);

      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Unable to connect to the server. Please try again.",
      });
    }
  };

  // =====================================================
  // RENDER NAVIGATION LINKS
  // =====================================================

  const renderDesktopNavigation = () => {
    if (isHomePage) {
      return (
        <>
          <a
            href="/"
            className={activeSection === "home" ? "active" : ""}
            onClick={handleHomeClick}
          >
            Home
          </a>

          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={handleSectionClick}
          >
            About
          </a>

          <a
            href="#programs"
            className={activeSection === "programs" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Programs
          </a>

          <a
            href="#impact"
            className={activeSection === "impact" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Impact
          </a>

          <a
            href="#campaigns"
            className={activeSection === "campaigns" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Campaigns
          </a>
        </>
      );
    }

    return (
      <>
        <Link to="/" onClick={() => setProfileOpen(false)}>
          Home
        </Link>

        <button
          type="button"
          className="nav-protected-link"
          onClick={() => handleProtectedNavigation("/community", "Community")}
        >
          Community
        </button>
      </>
    );
  };

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  const renderMobileNavigation = () => {
    if (isHomePage) {
      return (
        <>
          <a
            href="/"
            className={activeSection === "home" ? "active" : ""}
            onClick={handleHomeClick}
          >
            Home
          </a>

          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={handleSectionClick}
          >
            About
          </a>

          <a
            href="#programs"
            className={activeSection === "programs" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Programs
          </a>

          <a
            href="#impact"
            className={activeSection === "impact" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Impact
          </a>

          <a
            href="#campaigns"
            className={activeSection === "campaigns" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Campaigns
          </a>
        </>
      );
    }

    return (
      <>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <button
          type="button"
          className="mobile-protected-link"
          onClick={() => handleProtectedNavigation("/community", "Community")}
        >
          Community
        </button>
      </>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingUser) {
    return (
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              src="/images/logo.png"
              alt="Hanumat Seva"
              className="navbar-logo-image"
            />
          </Link>
        </div>
      </header>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* =================================================
            LOGO
        ================================================= */}

        <Link to="/" className="navbar-logo">
          <img
            src="/images/logo.png"
            alt="Hanumat Seva"
            className="navbar-logo-image"
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="nav-links">{renderDesktopNavigation()}</nav>

        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="navbar-actions">
          {/* ================= LOGGED IN ================= */}

          {user ? (
            <>
              {/* DONATE */}

              <Link to="/donate" className="navbar-donate">
                <Heart size={20} />
                Donate
              </Link>

              {/* PROFILE DROPDOWN */}

              <div className="profile-dropdown-container" ref={profileRef}>
                <button
                  type="button"
                  className="navbar-profile-button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  aria-expanded={profileOpen}
                >
                  <UserCircle size={22} />

                  <span className="profile-name">{user.name}</span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    {/* DASHBOARD */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation("/dashboard", "Dashboard")
                      }
                    >
                      <LayoutDashboard size={19} />
                      <span>Dashboard</span>
                    </button>

                    {/* PROFILE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation("/profile", "Profile")
                      }
                    >
                      <UserCircle size={19} />
                      <span>Profile</span>
                    </button>

                    {/* VOLUNTEER */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation("/volunteer", "Volunteer")
                      }
                    >
                      <Users size={19} />
                      <span>Volunteer</span>
                    </button>

                    <div className="profile-dropdown-divider" />

                    {/* LOGOUT */}

                    <button
                      type="button"
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      <LogOut size={19} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ================= LOGGED OUT ================= */

            <>
              <button
                type="button"
                className="navbar-community"
                onClick={() =>
                  handleProtectedNavigation("/volunteer", "Volunteer")
                }
              >
                <Users size={20} />
                Volunteer
              </button>

              <Link to="/login" className="navbar-donate">
                <Heart size={20} />
                Donate
              </Link>
            </>
          )}
        </div>

        {/* =================================================
            MOBILE BUTTON
        ================================================= */}

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="mobile-menu">
            {renderMobileNavigation()}

            {/* ================= MOBILE LOGGED IN ================= */}

            {user ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation("/dashboard", "Dashboard")
                  }
                >
                  <LayoutDashboard size={19} />
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation("/profile", "Profile")
                  }
                >
                  <UserCircle size={19} />
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation("/volunteer", "Volunteer")
                  }
                >
                  <Users size={19} />
                  Volunteer
                </button>

                <Link
                  to="/donate"
                  className="mobile-donate"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart size={19} />
                  Donate
                </Link>

                <button
                  type="button"
                  className="mobile-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={19} />
                  Logout
                </button>
              </>
            ) : (
              /* ================= MOBILE LOGGED OUT ================= */

              <>
                <button
                  type="button"
                  className="mobile-volunteer"
                  onClick={() =>
                    handleProtectedNavigation("/volunteer", "Volunteer")
                  }
                >
                  <Users size={19} />
                  Volunteer
                </button>

                <Link
                  to="/login"
                  className="mobile-donate"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart size={19} />
                  Donate
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
