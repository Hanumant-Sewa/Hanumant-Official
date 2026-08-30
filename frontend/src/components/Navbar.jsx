import { useEffect, useState } from "react";
import { Heart, Users, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
const location = useLocation();
const navigate = useNavigate();

const isHomePage = location.pathname === "/";

// Check whether the user is logged in
const isLoggedIn = !!localStorage.getItem("token");

const [menuOpen, setMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState("home");

/* =========================
SCROLL SPY
========================= */

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

/* =========================
HOME CLICK
========================= */

const handleHomeClick = (e) => {
e.preventDefault();

setMenuOpen(false);
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

/* =========================
SECTION CLICK
========================= */

const handleSectionClick = () => {
setMenuOpen(false);
};

return ( <header className="navbar"> <div className="navbar-container">
{/* ================= LOGO ================= */}

    <Link to="/" className="navbar-logo">
      <img
        src="/images/logo.png"
        alt="Hanumat Seva"
        className="navbar-logo-image"
      />
    </Link>

    {/* ================= NAVIGATION ================= */}

    <nav className="nav-links">
      {isHomePage ? (
        <>
          {/* HOME */}

          <a
            href="/"
            className={activeSection === "home" ? "active" : ""}
            onClick={handleHomeClick}
          >
            Home
          </a>

          {/* ABOUT */}

          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={handleSectionClick}
          >
            About
          </a>

          {/* PROGRAMS */}

          <a
            href="#programs"
            className={activeSection === "programs" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Programs
          </a>

          {/* IMPACT */}

          <a
            href="#impact"
            className={activeSection === "impact" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Impact
          </a>

          {/* CAMPAIGNS */}

          <a
            href="#campaigns"
            className={activeSection === "campaigns" ? "active" : ""}
            onClick={handleSectionClick}
          >
            Campaigns
          </a>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>

          <Link to="/community">Community</Link>
        </>
      )}
    </nav>

    {/* ================= ACTIONS ================= */}

    <div className="navbar-actions">
      {isLoggedIn ? (
        <>
          <Link to="/dashboard" className="navbar-community">
            Dashboard
          </Link>

          <Link to="/profile" className="navbar-community">
            Profile
          </Link>

          <Link to="/donate" className="navbar-donate">
            <Heart size={20} />
            Donate
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/login"
            state={{ intendedPage: "/volunteer" }}
            className="navbar-community"
          >
            <Users size={20} />
            Volunteer
          </Link>

          <Link
            to="/login"
            state={{ intendedPage: "/donate" }}
            className="navbar-donate"
          >
            <Heart size={20} />
            Donate
          </Link>
        </>
      )}
    </div>

    {/* ================= MOBILE BUTTON ================= */}

    <button
      className="mobile-menu-button"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation menu"
    >
      {menuOpen ? <X size={26} /> : <Menu size={26} />}
    </button>

    {/* ================= MOBILE MENU ================= */}

    {menuOpen && (
      <div className="mobile-menu">
        {isHomePage ? (
          <>
            {/* HOME */}

            <a
              href="/"
              className={activeSection === "home" ? "active" : ""}
              onClick={handleHomeClick}
            >
              Home
            </a>

            {/* ABOUT */}

            <a
              href="#about"
              className={activeSection === "about" ? "active" : ""}
              onClick={handleSectionClick}
            >
              About
            </a>

            {/* PROGRAMS */}

            <a
              href="#programs"
              className={activeSection === "programs" ? "active" : ""}
              onClick={handleSectionClick}
            >
              Programs
            </a>

            {/* IMPACT */}

            <a
              href="#impact"
              className={activeSection === "impact" ? "active" : ""}
              onClick={handleSectionClick}
            >
              Impact
            </a>

            {/* CAMPAIGNS */}

            <a
              href="#campaigns"
              className={activeSection === "campaigns" ? "active" : ""}
              onClick={handleSectionClick}
            >
              Campaigns
            </a>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/community" onClick={() => setMenuOpen(false)}>
              Community
            </Link>
          </>
        )}

        {/* MOBILE VOLUNTEER */}

        {!isLoggedIn && (
          <Link
            to="/login"
            state={{ intendedPage: "/volunteer" }}
            className="mobile-volunteer"
            onClick={() => setMenuOpen(false)}
          >
            <Users size={19} />
            Volunteer
          </Link>
        )}

        {/* MOBILE DONATE */}

        {!isLoggedIn && (
          <Link
            to="/login"
            state={{ intendedPage: "/donate" }}
            className="mobile-donate"
            onClick={() => setMenuOpen(false)}
          >
            <Heart size={19} />
            Donate
          </Link>
        )}
      </div>
    )}
  </div>
</header>

)
}

export default Navbar;

