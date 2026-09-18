import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Users,
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname === "/admin";
  const isAdmin = user?.role === "ADMIN";

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const profileRef = useRef(null);

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
  // HOME PAGE SCROLL SPY
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
  // SCROLL TO SECTION AFTER NAVIGATING FROM OTHER PAGES
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
          element.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        setActiveSection(section);
      }

      navigate("/", {
        replace: true,
        state: {},
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [isHomePage, location.state, navigate]);

  // =====================================================
  // HOME BUTTON
  // =====================================================
  const handleHomeClick = (event) => {
    event.preventDefault();

    setMenuOpen(false);
    setProfileOpen(false);
    setActiveSection("home");

    if (!isHomePage) {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SECTION NAVIGATION
  // =====================================================
  const handleSectionClick = (event, section) => {
    event.preventDefault();

    setMenuOpen(false);
    setProfileOpen(false);

    if (isHomePage) {
      const element = document.getElementById(section);

      if (element) {
        const navbarHeight = 100;

        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        setActiveSection(section);
      }

      return;
    }

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
  // ADMIN PANEL NAVIGATION
  // =====================================================
  const handleAdminNavigation = () => {
    setMenuOpen(false);
    setProfileOpen(false);

    if (!user) {
      navigate("/login", {
        state: {
          from: "/admin",
        },
      });

      return;
    }

    if (user.role !== "ADMIN") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Administrator access is required.",
        confirmButtonText: "OK",
      });

      return;
    }

    navigate("/admin");
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
  const renderDesktopNavigation = () => (
    <>
      {/* HOME */}
      <a
        href="/"
        className={isHomePage && activeSection === "home" ? "active" : ""}
        onClick={handleHomeClick}
      >
        Home
      </a>

      {/* ABOUT */}
      <a
        href="/#about"
        className={isHomePage && activeSection === "about" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "about")}
      >
        About
      </a>

      {/* PROGRAMS */}
      <a
        href="/#programs"
        className={isHomePage && activeSection === "programs" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "programs")}
      >
        Programs
      </a>

      {/* IMPACT */}
      <a
        href="/#impact"
        className={isHomePage && activeSection === "impact" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "impact")}
      >
        Impact
      </a>

      {/* CAMPAIGNS */}
      <a
        href="/#campaigns"
        className={isHomePage && activeSection === "campaigns" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "campaigns")}
      >
        Campaigns
      </a>

      {/* COMMUNITY */}
      <Link
        to="/community"
        className={location.pathname === "/community" ? "active" : ""}
        onClick={() => {
          setMenuOpen(false);
          setProfileOpen(false);
        }}
      >
        Community
      </Link>
    </>
  );

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================
  const renderMobileNavigation = () => (
    <>
      {/* HOME */}
      <a
        href="/"
        className={isHomePage && activeSection === "home" ? "active" : ""}
        onClick={handleHomeClick}
      >
        Home
      </a>

      {/* ABOUT */}
      <a
        href="/#about"
        className={isHomePage && activeSection === "about" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "about")}
      >
        About
      </a>

      {/* PROGRAMS */}
      <a
        href="/#programs"
        className={isHomePage && activeSection === "programs" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "programs")}
      >
        Programs
      </a>

      {/* IMPACT */}
      <a
        href="/#impact"
        className={isHomePage && activeSection === "impact" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "impact")}
      >
        Impact
      </a>

      {/* CAMPAIGNS */}
      <a
        href="/#campaigns"
        className={isHomePage && activeSection === "campaigns" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "campaigns")}
      >
        Campaigns
      </a>

      {/* COMMUNITY */}
      <Link
        to="/community"
        className={location.pathname === "/community" ? "active" : ""}
        onClick={() => {
          setMenuOpen(false);
          setProfileOpen(false);
        }}
      >
        Community
      </Link>
    </>
  );

  // =====================================================
  // DO NOT SHOW NORMAL NAVBAR ON ADMIN PANEL
  // =====================================================
  if (isAdminPage) {
    return null;
  }

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
  // MAIN NAVBAR
  // =====================================================
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* =================================================
            LOGO
        ================================================= */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {
            setMenuOpen(false);
            setProfileOpen(false);
          }}
        >
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
            RIGHT SIDE ACTIONS
        ================================================= */}
        <div className="navbar-actions">
          {/* ==============================
              LOGGED IN
          ============================== */}
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
              <div className="profile-dropdown-container" ref={profileRef}>
                <button
                  type="button"
                  className="navbar-profile-button"
                  onClick={() => setProfileOpen((previous) => !previous)}
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                >
                  {isAdmin ? (
                    <ShieldCheck size={22} />
                  ) : (
                    <UserCircle size={22} />
                  )}

                  <span className="profile-name">{user.name}</span>
                </button>

                {/* PROFILE DROPDOWN */}
                {profileOpen && (
                  <div className="profile-dropdown">
                    {/* ADMIN OPTIONS */}
                    {isAdmin ? (
                      <>
                        {/* ADMIN PANEL */}
                        <button type="button" onClick={handleAdminNavigation}>
                          <ShieldCheck size={19} />
                          <span>Admin Panel</span>
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
                      </>
                    ) : (
                      <>
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
                            handleProtectedNavigation(
                              "/volunteer/profile",
                              "Profile",
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
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ==============================
               LOGGED OUT
            ============================== */
            <>
              {/* VOLUNTEER */}
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

              {/* DONATE */}
              <Link
                to="/login"
                state={{
                  from: "/donate",
                }}
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
          onClick={() => setMenuOpen((previous) => !previous)}
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
            {/* MAIN NAVIGATION */}
            {renderMobileNavigation()}

            {/* =================================================
                LOGGED-IN MOBILE OPTIONS
            ================================================= */}
            {user ? (
              <>
                {/* ADMIN MOBILE OPTIONS */}
                {isAdmin ? (
                  <>
                    {/* ADMIN PANEL */}
                    <button type="button" onClick={handleAdminNavigation}>
                      <ShieldCheck size={19} />
                      Admin Panel
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
                  <>
                    {/* DASHBOARD */}
                    <button
                      type="button"
                      onClick={() =>
                        handleProtectedNavigation("/dashboard", "Dashboard")
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
                          "/volunteer/profile",
                          "Profile",
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
                        handleProtectedNavigation("/volunteer", "Volunteer")
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
                )}
              </>
            ) : (
              /* ==============================
                 MOBILE LOGGED OUT
              ============================== */
              <>
                {/* VOLUNTEER */}
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

                {/* DONATE */}
                <Link
                  to="/login"
                  state={{
                    from: "/donate",
                  }}
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
