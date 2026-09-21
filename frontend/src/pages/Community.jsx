import {
  ArrowRight,
  Heart,
  Users,
  HandHeart,
  Sparkles,
  TreePine,
  ShieldCheck,
  Trophy,
  Utensils,
  Clock3,
  Megaphone,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/Community.css";

function Community() {
  const { t } = useTranslation();

  const impactLevels = [
    {
      icon: Sparkles,
      level: t("community.impactLevels.seed.title"),
      description: t("community.impactLevels.seed.description"),
    },
    {
      icon: Users,
      level: t("community.impactLevels.volunteer.title"),
      description: t("community.impactLevels.volunteer.description"),
    },
    {
      icon: TreePine,
      level: t("community.impactLevels.builder.title"),
      description: t("community.impactLevels.builder.description"),
    },
    {
      icon: Trophy,
      level: t("community.impactLevels.leader.title"),
      description: t("community.impactLevels.leader.description"),
    },
    {
      icon: HandHeart,
      level: t("community.impactLevels.champion.title"),
      description: t("community.impactLevels.champion.description"),
    },
  ];

  const communityJourney = [
    {
      icon: Heart,
      title: t("community.journey.steps.support.title"),
      text: t("community.journey.steps.support.text"),
    },
    {
      icon: Users,
      title: t("community.journey.steps.volunteer.title"),
      text: t("community.journey.steps.volunteer.text"),
    },
    {
      icon: HandHeart,
      title: t("community.journey.steps.participate.title"),
      text: t("community.journey.steps.participate.text"),
    },
    {
      icon: Sparkles,
      title: t("community.journey.steps.inspire.title"),
      text: t("community.journey.steps.inspire.text"),
    },
    {
      icon: TreePine,
      title: t("community.journey.steps.build.title"),
      text: t("community.journey.steps.build.text"),
    },
  ];

  const impactStats = [
    {
      icon: Utensils,
      value: "142",
      label: t("community.impact.stats.meals"),
    },
    {
      icon: Clock3,
      value: "34",
      label: t("community.impact.stats.hours"),
    },
    {
      icon: Heart,
      value: "8",
      label: t("community.impact.stats.campaigns"),
    },
    {
      icon: Users,
      value: "11",
      label: t("community.impact.stats.people"),
    },
  ];

  return (
    <main className="community-page">
      {/* =====================================================
                          COMMUNITY HERO
      ===================================================== */}

      <section className="community-hero">
        <div className="container community-hero-container">
          <div className="community-hero-content">
            <span className="community-badge">
              <Users size={17} />
              {t("community.hero.badge")}
            </span>

            <h1>
              {t("community.hero.titleFirst")}
              <span> {t("community.hero.titleSecond")}</span>
            </h1>

            <p>{t("community.hero.description")}</p>

            <div className="community-hero-actions">
              <Link
                to="/community/join"
                className="community-btn community-btn-primary"
              >
                {t("community.hero.joinButton")}
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/volunteer"
                className="community-btn community-btn-outline"
              >
                {t("community.hero.volunteerButton")}
                <Users size={18} />
              </Link>
            </div>
          </div>

          <div className="community-hero-art">
            <div className="community-orbit orbit-one"></div>
            <div className="community-orbit orbit-two"></div>

            <div className="community-hero-card">
              <div className="community-hero-icon">
                <Users size={42} />
              </div>

              <span>{t("community.hero.card.label")}</span>

              <h3>
                {t("community.hero.card.titleFirst")}
                <br />
                {t("community.hero.card.titleSecond")}
              </h3>

              <p>{t("community.hero.card.journey")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
                    COMMUNITY JOURNEY
      ===================================================== */}

      <section className="community-journey section">
        <div className="container">
          <div className="section-title">
            <span>{t("community.journey.badge")}</span>

            <h2>
              {t("community.journey.titleFirst")}
              <span> {t("community.journey.titleSecond")}</span>
            </h2>

            <p>{t("community.journey.description")}</p>
          </div>

          <div className="community-journey-grid">
            {communityJourney.map((step, index) => {
              const Icon = step.icon;

              return (
                <div className="community-journey-card" key={step.title}>
                  <span className="journey-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="journey-icon">
                    <Icon size={28} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>

                  {index < communityJourney.length - 1 && (
                    <ArrowRight className="journey-arrow" size={22} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
                        COMMUNITY TREE
      ===================================================== */}

      <section className="community-tree section">
        <div className="container">
          <div className="community-tree-wrapper">
            {/* LEFT */}

            <div className="community-tree-content">
              <span className="section-badge">
                {t("community.tree.badge")}
              </span>

              <h2>
                {t("community.tree.titleFirst")}
                <span> {t("community.tree.titleSecond")}</span>
              </h2>

              <p>{t("community.tree.description")}</p>

              <div className="community-principle">
                <ShieldCheck size={24} />

                <div>
                  <strong>{t("community.tree.principleTitle")}</strong>

                  <span>{t("community.tree.principleText")}</span>
                </div>
              </div>

              <p className="community-tree-description">
                {t("community.tree.details")}
              </p>

              <Link to="/register" className="community-text-link">
                {t("community.tree.button")}
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* RIGHT - TREE VISUAL */}

            <div className="community-tree-visual">
              <div className="tree-line tree-line-main"></div>

              <div className="tree-node tree-root">
                <div className="tree-node-icon">
                  <Users size={25} />
                </div>

                <strong>{t("community.tree.nodes.you.title")}</strong>

                <span>{t("community.tree.nodes.you.description")}</span>
              </div>

              <div className="tree-branches">
                <div className="tree-branch branch-left">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <Heart size={20} />
                    </div>

                    <strong>
                      {t("community.tree.nodes.member.title")}
                    </strong>

                    <span>
                      {t("community.tree.nodes.member.description")}
                    </span>
                  </div>
                </div>

                <div className="tree-branch branch-center">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <HandHeart size={20} />
                    </div>

                    <strong>
                      {t("community.tree.nodes.volunteer.title")}
                    </strong>

                    <span>
                      {t("community.tree.nodes.volunteer.description")}
                    </span>
                  </div>
                </div>

                <div className="tree-branch branch-right">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <Sparkles size={20} />
                    </div>

                    <strong>
                      {t("community.tree.nodes.inspired.title")}
                    </strong>

                    <span>
                      {t("community.tree.nodes.inspired.description")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tree-impact">
                <TreePine size={22} />

                <span>{t("community.tree.impact")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
                        COMMUNITY IMPACT
      ===================================================== */}

      <section className="community-impact section">
        <div className="container">
          <div className="section-title">
            <span>{t("community.impact.badge")}</span>

            <h2>
              {t("community.impact.titleFirst")}
              <span> {t("community.impact.titleSecond")}</span>
            </h2>

            <p>{t("community.impact.description")}</p>
          </div>

          <div className="impact-profile">
            <div className="impact-profile-header">
              <div className="impact-user">
                <div className="impact-avatar">RS</div>

                <div>
                  <span>{t("community.impact.profileLabel")}</span>
                  <h3>Rahul Sharma</h3>
                </div>
              </div>

              <div className="impact-score">
                <span>{t("community.impact.scoreLabel")}</span>

                <strong>780</strong>
              </div>
            </div>

            <div className="community-impact-stats">
              {impactStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    className="community-impact-stat"
                    key={stat.label}
                  >
                    <div className="impact-stat-icon">
                      <Icon size={22} />
                    </div>

                    <div>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="impact-note">
              <ShieldCheck size={19} />

              <span>{t("community.impact.note")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
                        IMPACT LEVELS
      ===================================================== */}

      <section className="community-levels section">
        <div className="container">
          <div className="section-title">
            <span>{t("community.levels.badge")}</span>

            <h2>
              {t("community.levels.titleFirst")}
              <span> {t("community.levels.titleSecond")}</span>
            </h2>

            <p>{t("community.levels.description")}</p>
          </div>

          <div className="impact-levels">
            {impactLevels.map((level, index) => {
              const Icon = level.icon;

              return (
                <div
                  className={`impact-level ${
                    index === 3 ? "impact-level-featured" : ""
                  }`}
                  key={level.level}
                >
                  <div className="impact-level-icon">
                    <Icon size={25} />
                  </div>

                  <span className="impact-level-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{level.level}</h3>

                  <p>{level.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
                        COMMUNITY CTA
      ===================================================== */}

      <section className="community-cta">
        <div className="container">
          <div className="community-cta-card">
            <div>
              <span>{t("community.cta.badge")}</span>

              <h2>
                {t("community.cta.titleFirst")}
                <strong> {t("community.cta.titleSecond")}</strong>
              </h2>

              <p>{t("community.cta.description")}</p>
            </div>

            <div className="community-cta-actions">
              <Link
                to="/register"
                className="community-btn community-btn-light"
              >
                {t("community.cta.joinButton")}
                <Users size={18} />
              </Link>

              <Link
                to="/donate"
                className="community-btn community-btn-ghost"
              >
                {t("community.cta.supportButton")}
                <Heart size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Community;