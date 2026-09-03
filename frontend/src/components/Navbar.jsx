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

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const profileRef = useRef(null);

  // =====================================================
  // CHECK CURRENT PAGE
  // =====================================================

  const isHomePage = location.pathname === "/";

  // =====================================================
  // CLOSE MENUS WHEN ROUTE CHANGES
  // =====================================================

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // =====================================================
  // CLOSE PROFILE DROPDOWN WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // =====================================================
  // HOME SECTION SCROLL SPY
  // =====================================================

  useEffect(() => {
    if (!isHomePage) return;

    const sections = [
      "home",
      "about",
      "programs",
      "impact",
      "campaigns",
    ];

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
  // SCROLL TO SECTION AFTER NAVIGATING FROM ANOTHER PAGE
  // =====================================================

  useEffect(() => {
    if (!isHomePage) return;

    const section = location.state?.scrollTo;

    if (!section) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(section);

      if (element) {
        const navbarHeight = 100;

        const elementPosition =
          element.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        setActiveSection(section);
      }

      // Remove navigation state so refresh does not scroll again
      navigate("/", {
        replace: true,
        state: {},
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isHomePage, location.state, navigate]);

  // =====================================================
  // HOME CLICK
  // =====================================================

  const handleHomeClick = (event) => {
    event.preventDefault();

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

  const handleSectionClick = (event, section) => {
    event.preventDefault();

    setMenuOpen(false);
    setProfileOpen(false);

    // Already on Home
    if (location.pathname === "/") {
      const element = document.getElementById(section);

      if (element) {
        const navbarHeight = 100;

        const elementPosition =
          element.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        setActiveSection(section);
      }

      return;
    }

    // Coming from another page
    navigate("/", {
      state: {
        scrollTo: section,
      },
    });
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
          navigate("/login", {
            state: {
              from: path,
            },
          });
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
      await logout();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);

      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "Unable to logout. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // =====================================================
  // DESKTOP NAVIGATION
  // =====================================================

  const renderDesktopNavigation = () => {
    return (
      <>
        {/* HOME */}

        <a
          href="/"
          className={
            activeSection === "home" && isHomePage ? "active" : ""
          }
          onClick={handleHomeClick}
        >
          Home
        </a>

        {/* ABOUT */}

        <a
          href="/#about"
          className={
            activeSection === "about" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "about")}
        >
          About
        </a>

        {/* PROGRAMS */}

        <a
          href="/#programs"
          className={
            activeSection === "programs" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "programs")}
        >
          Programs
        </a>

        {/* IMPACT */}

        <a
          href="/#impact"
          className={
            activeSection === "impact" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "impact")}
        >
          Impact
        </a>

        {/* CAMPAIGNS */}

        <a
          href="/#campaigns"
          className={
            activeSection === "campaigns" && isHomePage
              ? "active"
              : ""
          }
          onClick={(event) =>
            handleSectionClick(event, "campaigns")
          }
        >
          Campaigns
        </a>

        {/* COMMUNITY */}

        <Link
          to="/community"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
          className={
            location.pathname === "/community" ? "active" : ""
          }
        >
          Community
        </Link>
      </>
    );
  };

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  const renderMobileNavigation = () => {
    return (
      <>
        {/* HOME */}

        <a
          href="/"
          className={
            activeSection === "home" && isHomePage ? "active" : ""
          }
          onClick={handleHomeClick}
        >
          Home
        </a>

        {/* ABOUT */}

        <a
          href="/#about"
          className={
            activeSection === "about" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "about")}
        >
          About
        </a>

        {/* PROGRAMS */}

        <a
          href="/#programs"
          className={
            activeSection === "programs" && isHomePage ? "active" : ""
          }
          onClick={(event) =>
            handleSectionClick(event, "programs")
          }
        >
          Programs
        </a>

        {/* IMPACT */}

        <a
          href="/#impact"
          className={
            activeSection === "impact" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "impact")}
        >
          Impact
        </a>

        {/* CAMPAIGNS */}

        <a
          href="/#campaigns"
          className={
            activeSection === "campaigns" && isHomePage
              ? "active"
              : ""
          }
          onClick={(event) =>
            handleSectionClick(event, "campaigns")
          }
        >
          Campaigns
        </a>

        {/* COMMUNITY */}

        <Link
          to="/community"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
          className={
            location.pathname === "/community" ? "active" : ""
          }
        >
          Community
        </Link>
      </>
    );
  };

  // =====================================================
  // AUTH LOADING
  // =====================================================

  if (loading) {
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

        <nav className="nav-links">
          {renderDesktopNavigation()}
        </nav>

        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="navbar-actions">

          {/* =================================================
              LOGGED IN
          ================================================= */}

          {user ? (
            <>
              {/* DONATE */}

              <Link
                to="/donate"
                className="navbar-donate"
                onClick={() => {
                  setMenuOpen(false);
                  setProfileOpen(false);
                }}
              >
                <Heart size={20} />
                Donate
              </Link>

              {/* PROFILE */}

              <div
                className="profile-dropdown-container"
                ref={profileRef}
              >
                <button
                  type="button"
                  className="navbar-profile-button"
                  onClick={() =>
                    setProfileOpen((prev) => !prev)
                  }
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                >
                  <UserCircle size={22} />

                  <span className="profile-name">
                    {user.name}
                  </span>
                </button>

                {/* PROFILE DROPDOWN */}

                {profileOpen && (
                  <div className="profile-dropdown">

                    {/* DASHBOARD */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation(
                          "/dashboard",
                          "Dashboard"
                        )
                      }
                    >
                      <LayoutDashboard size={19} />
                      <span>Dashboard</span>
                    </button>

                    {/* PROFILE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation(
                          "/profile",
                          "Profile"
                        )
                      }
                    >
                      <UserCircle size={19} />
                      <span>Profile</span>
                    </button>

                    {/* VOLUNTEER */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation(
                          "/volunteer",
                          "Volunteer"
                        )
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

            /* =================================================
               LOGGED OUT
            ================================================= */

            <>
              {/* VOLUNTEER */}

              <button
                type="button"
                className="navbar-community"
                onClick={() =>
                  handleProtectedNavigation(
                    "/volunteer",
                    "Volunteer"
                  )
                }
              >
                <Users size={20} />
                Volunteer
              </button>

              {/* DONATE */}

              <Link
                to="/login"
                className="navbar-donate"
                onClick={() => {
                  setMenuOpen(false);
                  setProfileOpen(false);
                }}
              >
                <Heart size={20} />
                Donate
              </Link>
            </>
          )}
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="mobile-menu">

            {renderMobileNavigation()}

            {/* =================================================
                MOBILE LOGGED IN
            ================================================= */}

            {user ? (
              <>
                {/* DASHBOARD */}

                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation(
                      "/dashboard",
                      "Dashboard"
                    )
                  }
                >
                  <LayoutDashboard size={19} />
                  Dashboard
                </button>

                {/* PROFILE */}

                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation(
                      "/profile",
                      "Profile"
                    )
                  }
                >
                  <UserCircle size={19} />
                  Profile
                </button>

                {/* VOLUNTEER */}

                <button
                  type="button"
                  onClick={() =>
                    handleProtectedNavigation(
                      "/volunteer",
                      "Volunteer"
                    )
                  }
                >
                  <Users size={19} />
                  Volunteer
                </button>

                {/* DONATE */}

                <Link
                  to="/donate"
                  className="mobile-donate"
                  onClick={() => setMenuOpen(false)}
                >
                  <Heart size={19} />
                  Donate
                </Link>

                {/* LOGOUT */}

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

              /* =================================================
                 MOBILE LOGGED OUT
              ================================================= */

              <>
                {/* VOLUNTEER */}

                <button
                  type="button"
                  className="mobile-volunteer"
                  onClick={() =>
                    handleProtectedNavigation(
                      "/volunteer",
                      "Volunteer"
                    )
                  }
                >
                  <Users size={19} />
                  Volunteer
                </button>

                {/* DONATE */}

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

