import { Heart, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Temporary until authentication is connected
  const isLoggedIn = false;

  return (
    <header className="navbar">
      <div className="navbar-container">
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
              <a href="#home" className="active">
                Home
              </a>

              <a href="#about">About</a>

              <a href="#programs">Programs</a>

              <a href="#impact">Impact</a>

              <a href="#campaigns">Campaigns</a>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>

              <Link to="/campaigns">Campaigns</Link>

              <Link to="/transparency">Transparency</Link>
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
              <Link to="/volunteer" className="navbar-community">
                <Users size={20} />
                Volunteer
              </Link>

              <Link to="/donate" className="navbar-donate">
                <Heart size={20} />
                Donate
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
