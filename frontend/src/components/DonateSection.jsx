import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DonateSection() {
  const { t } = useTranslation();

  return (
    <section className="donate section" id="donate">
      <div className="container">
        <div className="section-title">
          <span>{t("donateSection.badge")}</span>

          <h2>
            {t("donateSection.titleFirst")}{" "}
            <span>{t("donateSection.titleHighlight")}</span>
          </h2>

          <p>{t("donateSection.description")}</p>
        </div>

        <div className="donation-grid">
          {/* Basic Meal */}
          <div className="donation-card">
            <h3>₹100</h3>

            <h4>{t("donateSection.cards.basic.title")}</h4>

            <p>{t("donateSection.cards.basic.description")}</p>

            <Link to="/login" className="btn donate-btn">
              {t("donateSection.cards.donateButton")}
            </Link>
          </div>

          {/* Family Support */}
          <div className="donation-card featured">
            <span className="popular">
              {t("donateSection.cards.popular")}
            </span>

            <h3>₹500</h3>

            <h4>{t("donateSection.cards.family.title")}</h4>

            <p>{t("donateSection.cards.family.description")}</p>

            <Link to="/login" className="btn donate-btn">
              {t("donateSection.cards.donateButton")}
            </Link>
          </div>

          {/* Community Support */}
          <div className="donation-card">
            <h3>₹1000</h3>

            <h4>{t("donateSection.cards.community.title")}</h4>

            <p>{t("donateSection.cards.community.description")}</p>

            <Link to="/login" className="btn donate-btn">
              {t("donateSection.cards.donateButton")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonateSection;