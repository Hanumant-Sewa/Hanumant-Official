function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        {/* About */}
        <div className="footer-col">
          <h2>Hanumant Seva</h2>

          <p>
            Serving humanity through compassion, food distribution and community
            support.
          </p>

          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fab fa-x-twitter"></i>
            </a>

            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <a href="#home">Home</a>
            </li>

            <li>
              <a href="#about">About</a>
            </li>

            <li>
              <a href="#services">Services</a>
            </li>

            <li>
              <a href="#gallery">Gallery</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div className="footer-col">
          <h3>Our Programs</h3>

          <ul>
            <li>Food Distribution</li>

            <li>Community Kitchen</li>

            <li>Volunteer Program</li>

            <li>Food Donation Drive</li>

            <li>Emergency Relief</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h3>Newsletter</h3>

          <p>Subscribe to receive updates about our food drives.</p>

          <form className="newsletter">
            <input type="email" placeholder="Email Address" />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Hanumant Seva. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
