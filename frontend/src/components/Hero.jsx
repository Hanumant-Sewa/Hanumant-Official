import {
  Heart,
  Users,
  ShieldCheck,
  Clock3,
  Infinity,
  HandHeart,
  Star,
} from "lucide-react";
import ProtectedButton from "./ProtectedButton";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* =========================
            LEFT SIDE
        ========================== */}

        <div className="hero-content">
          <div className="hero-badge">{t("home.hero.badge")}</div>

          <h1>
            सेवा से बड़ा
            <br />
            <span className="second-line">
              कोई <span className="orange">धर्म</span> नहीं
            </span>
          </h1>

          <div className="hero-divider">
            <span></span>✧<span></span>
          </div>

          <h3 className="hero-theme">{t("home.hero.theme")}</h3>

          <p>{t("home.hero.description")}</p>

          {/* =========================
              HERO BUTTONS
          ========================== */}

          <div className="hero-buttons">
            <ProtectedButton
              to="/donate"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="hero-btn hero-btn-primary"
            >
              <Heart size={20} />
              {t("home.hero.supportButton")}
            </ProtectedButton>

            <ProtectedButton
              to="/community"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="hero-btn hero-btn-outline"
            >
              <Users size={25} />
              {t("home.hero.communityButton")}
            </ProtectedButton>
          </div>

          <p className="hero-founder">{t("home.hero.founded")}</p>

          {/* =========================
              TRUST FEATURES
          ========================== */}

          <div className="hero-features">
            <div className="hero-feature">
              <ShieldCheck size={43} />

              <div>
                <strong>{t("home.hero.features.transparent.value")}</strong>

                <span>{t("home.hero.features.transparent.label")}</span>
              </div>
            </div>

            <div className="hero-feature">
              <Clock3 size={43} />

              <div>
                <strong>{t("home.hero.features.support.value")}</strong>

                <span>{t("home.hero.features.support.label")}</span>
              </div>
            </div>

            <div className="hero-feature">
              <Infinity size={45} />

              <div>
                <span>{t("home.hero.features.hope")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div className="hero-art">
          <img
            src="/images/hero-art.png"
            alt="HanumantSeva community service"
          />
        </div>
      </div>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="stats-card">
        <div className="stat">
          <Users size={45} />

          <div>
            <strong>50K+</strong>
            <span>{t("home.hero.stats.lives")}</span>
          </div>
        </div>

        <div className="stat">
          <HandHeart size={45} />

          <div>
            <strong>500+</strong>
            <span>{t("home.hero.stats.volunteers")}</span>
          </div>
        </div>

        <div className="stat">
          <Star size={45} />

          <div>
            <strong>20+</strong>
            <span>{t("home.hero.stats.cities")}</span>
          </div>
        </div>

        <div className="stat">
          <Users size={45} />

          <div>
            <strong>1000+</strong>
            <span>{t("home.hero.stats.families")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
