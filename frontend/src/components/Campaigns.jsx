import {
  ArrowRight,
  Heart,
  Utensils,
  Users,
  GitBranch,
  Award,
} from "lucide-react";

import ProtectedButton from "./ProtectedButton";
import ProtectedLink from "./ProtectedLink";

import { useTranslation } from "react-i18next";

function Campaigns() {
  const { t } = useTranslation();

  const campaigns = [
    {
      icon: Utensils,
      title: t("campaigns.active.items.meals500.title"),
      description: t("campaigns.active.items.meals500.description"),
      target: 500,
      supported: 327,
      amount: "₹16,350",
    },

    {
      icon: Heart,
      title: t("campaigns.active.items.mealSupport.title"),
      description: t("campaigns.active.items.mealSupport.description"),
      target: 1000,
      supported: 640,
      amount: "₹32,000",
    },

    {
      icon: Utensils,
      title: t("campaigns.active.items.emergency.title"),
      description: t("campaigns.active.items.emergency.description"),
      target: 750,
      supported: 420,
      amount: "₹21,000",
    },
  ];

  const communityJourney = [
    {
      icon: Users,
      number: "01",
      title: t("campaigns.journey.items.volunteer.title"),
      text: t("campaigns.journey.items.volunteer.text"),
      link: "/volunteer",
    },

    {
      icon: GitBranch,
      number: "02",
      title: t("campaigns.journey.items.community.title"),
      text: t("campaigns.journey.items.community.text"),
      link: "/community",
    },

    {
      icon: Award,
      number: "03",
      title: t("campaigns.journey.items.leaders.title"),
      text: t("campaigns.journey.items.leaders.text"),
      link: "/community",
    },
  ];

  return (
    <section className="campaigns section" id="campaigns">
      <div className="container">
        {/* ================= SECTION HEADER ================= */}

        <div className="section-title">
          <span>{t("campaigns.active.heading.badge")}</span>

          <h2>
            {t("campaigns.active.heading.titleFirst")}
            <span> {t("campaigns.active.heading.titleSecond")}</span>
          </h2>

          <p>{t("campaigns.active.heading.description")}</p>
        </div>

        {/* ================= CAMPAIGN GRID ================= */}

        <div className="campaigns-grid">
          {campaigns.map((campaign) => {
            const Icon = campaign.icon;

            const percentage = Math.round(
              (campaign.supported / campaign.target) * 100,
            );

            return (
              <div className="campaign-card" key={campaign.title}>
                {/* TOP */}

                <div className="campaign-top">
                  <div className="campaign-icon">
                    <Icon size={28} strokeWidth={2} />
                  </div>

                  <span className="campaign-status">
                    {t("campaigns.active.status")}
                  </span>
                </div>

                {/* CONTENT */}

                <div className="campaign-content">
                  <h3>{campaign.title}</h3>

                  <p>{campaign.description}</p>
                </div>

                {/* PROGRESS */}

                <div className="campaign-progress">
                  <div className="campaign-progress-info">
                    <span>
                      {campaign.supported} / {campaign.target}{" "}
                      {t("campaigns.active.meals")}
                    </span>

                    <strong>{percentage}%</strong>
                  </div>

                  <div className="campaign-progress-bar">
                    <span
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></span>
                  </div>
                </div>

                {/* META */}

                <div className="campaign-meta">
                  <div>
                    <span>{t("campaigns.active.supported")}</span>

                    <strong>{campaign.amount}</strong>
                  </div>

                  <div>
                    <span>{t("campaigns.active.target")}</span>

                    <strong>
                      {campaign.target} {t("campaigns.active.meals")}
                    </strong>
                  </div>
                </div>

                {/* CAMPAIGN DETAILS */}

                <ProtectedLink
                  to="/dashboard"
                  allowedRoles={["USER", "VOLUNTEER"]}
                  className="campaign-link"
                >
                  {t("campaigns.active.viewCampaign")}
                  <ArrowRight size={17} />
                </ProtectedLink>
              </div>
            );
          })}
        </div>

        {/* ================= COMMUNITY JOURNEY ================= */}

        <div className="community-journey">
          <div className="community-journey-header">
            <div>
              <span>{t("campaigns.journey.badge")}</span>

              <h3>
                {t("campaigns.journey.titleFirst")}
                <span> {t("campaigns.journey.titleSecond")}</span>
              </h3>
            </div>

            <p>{t("campaigns.journey.description")}</p>
          </div>

          <div className="community-journey-flow">
            {communityJourney.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="community-journey-item" key={item.title}>
                  {/* ICON */}

                  <div className="community-journey-icon">
                    <Icon size={25} />
                  </div>

                  {/* NUMBER */}

                  <span className="community-journey-number">
                    {item.number}
                  </span>

                  {/* CONTENT */}

                  <div className="community-journey-content">
                    <h4>{item.title}</h4>

                    <p>{item.text}</p>

                    {/* PROTECTED LINK */}

                    <ProtectedLink
                      to="/dashboard"
                      allowedRoles={["USER", "VOLUNTEER"]}
                      className="community-journey-explore"
                    >
                      {t("campaigns.journey.explore")}
                      <ArrowRight size={15} />
                    </ProtectedLink>
                  </div>

                  {/* CONNECTING LINE */}

                  {index < communityJourney.length - 1 && (
                    <div className="community-journey-line"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM CTA ================= */}

        <div className="campaigns-cta">
          <div className="campaigns-cta-content">
            <span>{t("campaigns.cta.badge")}</span>

            <h3>{t("campaigns.cta.title")}</h3>
          </div>

          {/* PROTECTED DONATION ACTION */}

          <ProtectedButton
            to="/donate"
            allowedRoles={["USER", "VOLUNTEER"]}
            className="campaigns-cta-btn"
          >
            {t("campaigns.cta.button")}
            <Heart size={18} />
          </ProtectedButton>
        </div>
      </div>
    </section>
  );
}

export default Campaigns;
