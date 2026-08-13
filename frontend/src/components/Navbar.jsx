import { Heart } from "lucide-react";
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <img
            src="/images/logo.png"
            alt="Hanumant Foundation"
            className="navbar-logo-image"
          />
        </a>

        <nav className="nav-links">
          <a href="#home" className="active">
            Home
          </a>

          <a href="#about">About</a>

          <a href="#services">Services</a>

          <a href="#impact">Impact</a>

          <a href="#gallery">Gallery</a>

          <a href="#contact">Contact</a>
        </nav>

        <a href="#donate" className="navbar-donate">
          <Heart size={25} />
          Donate Now
        </a>
      </div>
    </header>
  );
}

export default Navbar;
