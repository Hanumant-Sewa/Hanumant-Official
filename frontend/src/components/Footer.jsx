import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container footer-grid">
        {/* About */}
        <div className="footer-col">
          <h2>Hanumant Seva</h2>

          <p>{t("footer.about.description")}</p>

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
          <h3>{t("footer.quickLinks.title")}</h3>

          <ul>
            <li>
              <a href="#home">{t("footer.quickLinks.home")}</a>
            </li>

            <li>
              <a href="#about">{t("footer.quickLinks.about")}</a>
            </li>

            <li>
              <a href="#services">{t("footer.quickLinks.services")}</a>
            </li>

            <li>
              <a href="#gallery">{t("footer.quickLinks.gallery")}</a>
            </li>

            <li>
              <a href="#contact">{t("footer.quickLinks.contact")}</a>
            </li>
          </ul>
        </div>

        {/* Programs */}
        <div className="footer-col">
          <h3>{t("footer.programs.title")}</h3>

          <ul>
            <li>{t("footer.programs.foodDistribution")}</li>

            <li>{t("footer.programs.communityKitchen")}</li>

            <li>{t("footer.programs.volunteerProgram")}</li>

            <li>{t("footer.programs.foodDonationDrive")}</li>

            <li>{t("footer.programs.emergencyRelief")}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}

export default Footer;
