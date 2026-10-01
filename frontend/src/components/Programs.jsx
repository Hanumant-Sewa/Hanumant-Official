import {
  Utensils,
  Recycle,
  CookingPot,
  ShoppingBasket,
  Ambulance,
  HandHeart,
  Users,
  Megaphone,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import ProtectedButton from "./ProtectedButton";
import { useTranslation } from "react-i18next";

function Programs() {
  const { t } = useTranslation();

  const programs = [
    {
      icon: Utensils,
      title: t("programs.items.foodDistribution.title"),
      text: t("programs.items.foodDistribution.text"),
    },
    {
      icon: Recycle,
      title: t("programs.items.foodRescue.title"),
      text: t("programs.items.foodRescue.text"),
    },
    {
      icon: CookingPot,
      title: t("programs.items.communityKitchen.title"),
      text: t("programs.items.communityKitchen.text"),
    },
    {
      icon: ShoppingBasket,
      title: t("programs.items.grocerySupport.title"),
      text: t("programs.items.grocerySupport.text"),
    },
    {
      icon: Ambulance,
      title: t("programs.items.emergencyRelief.title"),
      text: t("programs.items.emergencyRelief.text"),
    },
    {
      icon: HandHeart,
      title: t("programs.items.communityCare.title"),
      text: t("programs.items.communityCare.text"),
    },
    {
      icon: Users,
      title: t("programs.items.volunteerProgram.title"),
      text: t("programs.items.volunteerProgram.text"),
    },
    {
      icon: Megaphone,
      title: t("programs.items.awareness.title"),
      text: t("programs.items.awareness.text"),
    },
  ];

  return (
    <section className="programs section" id="programs">
      <div className="container">
        {/* SECTION HEADER */}

        <div className="section-title">
          <span>{t("programs.heading.badge")}</span>

          <h2>
            {t("programs.heading.titleFirst")}{" "}
            <span>{t("programs.heading.titleSecond")}</span>
          </h2>

          <p>{t("programs.heading.description")}</p>
        </div>

        {/* =====================================================
                    DESKTOP / TABLET PROGRAM GRID
            ===================================================== */}

        <div className="programs-grid programs-grid-desktop">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <div className="program-card" key={program.title}>
                {/* ICON */}

                <div className="program-icon">
                  <Icon size={32} strokeWidth={2} />
                </div>

                {/* NUMBER */}

                <span className="program-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* TITLE */}

                <h3>{program.title}</h3>

                {/* DESCRIPTION */}

                <p>{program.text}</p>
              </div>
            );
          })}
        </div>

        {/* =====================================================
                    MOBILE PROGRAM ACCORDION
            ===================================================== */}

        <div className="programs-grid-mobile">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <details className="program-mobile-card" key={program.title}>
                <summary className="program-mobile-header">
                  {/* ICON */}

                  <div className="program-mobile-icon">
                    <Icon strokeWidth={2} />
                  </div>

                  {/* TITLE */}

                  <h3>{program.title}</h3>

                  {/* NUMBER */}

                  <span className="program-mobile-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* ARROW */}

                  <span className="program-mobile-toggle">
                    <ChevronDown />
                  </span>
                </summary>

                {/* DESCRIPTION */}

                <div className="program-mobile-content">
                  <p>{program.text}</p>
                </div>
              </details>
            );
          })}
        </div>

        {/* =====================================================
                            BOTTOM CTA
            ===================================================== */}

        <div className="programs-cta">
          <div>
            <span>{t("programs.cta.badge")}</span>

            <h3>{t("programs.cta.title")}</h3>
          </div>

          <ProtectedButton
            to="/community"
            allowedRoles={["USER", "VOLUNTEER"]}
            className="programs-cta-btn"
          >
            {t("programs.cta.button")}
            <ArrowRight size={18} />
          </ProtectedButton>
        </div>
      </div>
    </section>
  );
}

export default Programs;
