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

function Campaigns() {
  const campaigns = [
    {
      icon: Utensils,
      title: "500 Meals Community Drive",
      description:
        "Help us provide nutritious meals to people and families who need support through our community food drive.",
      target: 500,
      supported: 327,
      amount: "₹16,350",
    },

    {
      icon: Heart,
      title: "Community Meal Support",
      description:
        "Support our ongoing food initiatives and help us reach more people through regular meal distribution.",
      target: 1000,
      supported: 640,
      amount: "₹32,000",
    },

    {
      icon: Utensils,
      title: "Emergency Food Relief",
      description:
        "Help provide essential food support to communities facing difficult circumstances and emergencies.",
      target: 750,
      supported: 420,
      amount: "₹21,000",
    },
  ];

  const communityJourney = [
    {
      icon: Users,
      number: "01",
      title: "Volunteer",
      text: "Give your time, skills and energy to meaningful community activities.",
      link: "/volunteer",
    },

    {
      icon: GitBranch,
      number: "02",
      title: "Community Tree",
      text: "Grow together as a connected community of people serving a common purpose.",
      link: "/community",
    },

    {
      icon: Award,
      number: "03",
      title: "Impact Leaders",
      text: "Recognize people who create meaningful change through consistent service.",
      link: "/community",
    },
  ];

  return (
    <section className="campaigns section" id="campaigns">
      <div className="container">
        {/* ================= SECTION HEADER ================= */}

        <div className="section-title">
          <span>ACTIVE CAMPAIGNS</span>

          <h2>
            Together We Can Create
            <span> Real Impact</span>
          </h2>

          <p>
            Support an active Hanumat Seva campaign and help turn small
            contributions into meaningful action for people and communities that
            need support.
          </p>
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

                  <span className="campaign-status">Active</span>
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
                      {campaign.supported} / {campaign.target} meals
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
                    <span>Supported</span>

                    <strong>{campaign.amount}</strong>
                  </div>

                  <div>
                    <span>Target</span>

                    <strong>{campaign.target} meals</strong>
                  </div>
                </div>

                {/* CAMPAIGN DETAILS */}

                <ProtectedLink
                  to="/campaigns"
                  allowedRoles={["USER", "VOLUNTEER"]}
                  className="campaign-link"
                >
                  View Campaign
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
              <span>BEYOND A CAMPAIGN</span>

              <h3>
                From One Volunteer
                <span> To A Growing Community</span>
              </h3>
            </div>

            <p>
              Every contribution can become a connection, and every connection
              can become meaningful impact.
            </p>
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
                      Explore
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
            <span>YOUR CONTRIBUTION MATTERS</span>

            <h3>Every small contribution can help move a campaign forward.</h3>
          </div>

          {/* PROTECTED DONATION ACTION */}

          <ProtectedButton
            to="/donate"
            allowedRoles={["USER", "VOLUNTEER"]}
            className="campaigns-cta-btn"
          >
            Support a Campaign
            <Heart size={18} />
          </ProtectedButton>
        </div>
      </div>
    </section>
  );
}

export default Campaigns;
