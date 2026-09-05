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

  const isHomePage = location.pathname === "/";

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
<<<<<<< HEAD
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
=======
  // HOME PAGE SCROLL SPY
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
  // =====================================================

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

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
  // HANDLE SCROLLING TO SECTION FROM OTHER PAGES
  // =====================================================

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const section = location.state?.scrollTo;

    if (!section) {
      return;
    }

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

<<<<<<< HEAD
    if (location.pathname !== "/") {
=======
    if (!isHomePage) {
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
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

    // USER IS NOT LOGGED IN
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

    // USER IS LOGGED IN
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

  const renderDesktopNavigation = () => (
    <>
      {/* HOME */}

<<<<<<< HEAD
        <a
          href="/"
          className={
            activeSection === "home" && isHomePage ? "active" : ""
          }
          onClick={handleHomeClick}
        >
          Home
        </a>
=======
      <a
        href="/"
        className={isHomePage && activeSection === "home" ? "active" : ""}
        onClick={handleHomeClick}
      >
        Home
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* ABOUT */}

<<<<<<< HEAD
        <a
          href="/#about"
          className={
            activeSection === "about" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "about")}
        >
          About
        </a>
=======
      <a
        href="/#about"
        className={isHomePage && activeSection === "about" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "about")}
      >
        About
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* PROGRAMS */}

<<<<<<< HEAD
        <a
          href="/#programs"
          className={
            activeSection === "programs" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "programs")}
        >
          Programs
        </a>
=======
      <a
        href="/#programs"
        className={isHomePage && activeSection === "programs" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "programs")}
      >
        Programs
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* IMPACT */}

<<<<<<< HEAD
        <a
          href="/#impact"
          className={
            activeSection === "impact" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "impact")}
        >
          Impact
        </a>
=======
      <a
        href="/#impact"
        className={isHomePage && activeSection === "impact" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "impact")}
      >
        Impact
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* CAMPAIGNS */}

<<<<<<< HEAD
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
=======
      <a
        href="/#campaigns"
        className={isHomePage && activeSection === "campaigns" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "campaigns")}
      >
        Campaigns
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* COMMUNITY */}

<<<<<<< HEAD
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
=======
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
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  const renderMobileNavigation = () => (
    <>
      {/* HOME */}

<<<<<<< HEAD
        <a
          href="/"
          className={
            activeSection === "home" && isHomePage ? "active" : ""
          }
          onClick={handleHomeClick}
        >
          Home
        </a>
=======
      <a
        href="/"
        className={isHomePage && activeSection === "home" ? "active" : ""}
        onClick={handleHomeClick}
      >
        Home
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* ABOUT */}

<<<<<<< HEAD
        <a
          href="/#about"
          className={
            activeSection === "about" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "about")}
        >
          About
        </a>
=======
      <a
        href="/#about"
        className={isHomePage && activeSection === "about" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "about")}
      >
        About
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* PROGRAMS */}

<<<<<<< HEAD
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
=======
      <a
        href="/#programs"
        className={isHomePage && activeSection === "programs" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "programs")}
      >
        Programs
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* IMPACT */}

<<<<<<< HEAD
        <a
          href="/#impact"
          className={
            activeSection === "impact" && isHomePage ? "active" : ""
          }
          onClick={(event) => handleSectionClick(event, "impact")}
        >
          Impact
        </a>
=======
      <a
        href="/#impact"
        className={isHomePage && activeSection === "impact" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "impact")}
      >
        Impact
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* CAMPAIGNS */}

<<<<<<< HEAD
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
=======
      <a
        href="/#campaigns"
        className={isHomePage && activeSection === "campaigns" ? "active" : ""}
        onClick={(event) => handleSectionClick(event, "campaigns")}
      >
        Campaigns
      </a>
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

      {/* COMMUNITY */}

<<<<<<< HEAD
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
=======
      <Link
        to="/community"
        className={location.pathname === "/community" ? "active" : ""}
        onClick={() => setMenuOpen(false)}
      >
        Community
      </Link>
    </>
  );
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

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

        <nav className="nav-links">
          {renderDesktopNavigation()}
        </nav>

        {/* =================================================
            RIGHT SIDE ACTIONS
        ================================================= */}

        <div className="navbar-actions">
<<<<<<< HEAD

          {/* =================================================
              LOGGED IN
          ================================================= */}

=======
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
          {user ? (
            <>
              {/* ==============================
                  LOGGED-IN DONATE
              ============================== */}

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

              {/* ==============================
                  PROFILE
              ============================== */}

              <div
                className="profile-dropdown-container"
                ref={profileRef}
              >
                <button
                  type="button"
                  className="navbar-profile-button"
<<<<<<< HEAD
                  onClick={() =>
                    setProfileOpen((prev) => !prev)
                  }
=======
                  onClick={() => setProfileOpen((previous) => !previous)}
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                >
                  <UserCircle size={22} />

                  <span className="profile-name">
                    {user.name}
                  </span>
                </button>

                {/* ==============================
                    PROFILE DROPDOWN
                ============================== */}

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
<<<<<<< HEAD

            /* =================================================
               LOGGED OUT
            ================================================= */

=======
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
            <>
              {/* ==============================
                  LOGGED-OUT VOLUNTEER
              ============================== */}

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

              {/* ==============================
                  LOGGED-OUT DONATE
                  
                  IMPORTANT:
                  We remember /donate so after
                  login the user can continue
                  to donation.
              ============================== */}

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
<<<<<<< HEAD
=======
            {/* MAIN NAVIGATION */}
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68

            {renderMobileNavigation()}

            {/* =================================================
                LOGGED-IN MOBILE OPTIONS
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
<<<<<<< HEAD

              /* =================================================
                 MOBILE LOGGED OUT
              ================================================= */

=======
>>>>>>> 986eaac6e31296adeef79929d43d379a8d77ed68
              <>
                {/* =================================================
                    LOGGED-OUT MOBILE VOLUNTEER
                ================================================= */}

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

                {/* =================================================
                    LOGGED-OUT MOBILE DONATE

                    IMPORTANT:
                    Remember /donate after login.
                ================================================= */}

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
