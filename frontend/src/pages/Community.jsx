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
import "../css/Community.css";

function Community() {
  const impactLevels = [
    {
      icon: Sparkles,
      level: "Seed",
      description: "New Community Member",
    },
    {
      icon: Users,
      level: "Volunteer",
      description: "Active Participant",
    },
    {
      icon: TreePine,
      level: "Community Builder",
      description: "Consistent Contributor",
    },
    {
      icon: Trophy,
      level: "Impact Leader",
      description: "High Verified Impact",
    },
    {
      icon: HandHeart,
      level: "Service Champion",
      description: "Exceptional Contribution",
    },
  ];

  const communityJourney = [
    {
      icon: Heart,
      title: "Support",
      text: "Support a meal, campaign or community initiative.",
    },
    {
      icon: Users,
      title: "Volunteer",
      text: "Give your time, skills and energy when you can.",
    },
    {
      icon: HandHeart,
      title: "Participate",
      text: "Take part in genuine community activities.",
    },
    {
      icon: Sparkles,
      title: "Inspire",
      text: "Encourage others to contribute through service.",
    },
    {
      icon: TreePine,
      title: "Build",
      text: "Help grow a community centered around meaningful service.",
    },
  ];

  const impactStats = [
    {
      icon: Utensils,
      value: "142",
      label: "Meals Supported",
    },
    {
      icon: Clock3,
      value: "34",
      label: "Volunteer Hours",
    },
    {
      icon: Heart,
      value: "8",
      label: "Campaigns Supported",
    },
    {
      icon: Users,
      value: "11",
      label: "People Inspired",
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
              OUR COMMUNITY
            </span>

            <h1>
              Don't Just Be a Donor.
              <span> Become Part of the Community.</span>
            </h1>

            <p>
              Hanumat Seva is being built around people who believe that
              meaningful change begins when we come together through genuine
              service.
            </p>

            <div className="community-hero-actions">
              <Link
                to="/community/join"
                className="community-btn community-btn-primary"
              >
                Join Our Community
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/volunteer"
                className="community-btn community-btn-outline"
              >
                Become a Volunteer
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

              <span>ONE COMMUNITY</span>

              <h3>
                Many Hands.
                <br />
                One Purpose.
              </h3>

              <p>Support → Volunteer → Participate → Inspire → Build</p>
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
            <span>THE COMMUNITY JOURNEY</span>

            <h2>
              From One Small Act to
              <span> Meaningful Service</span>
            </h2>

            <p>
              Every genuine contribution to the mission can become part of a
              growing community of people serving society.
            </p>
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
              <span className="section-badge">COMMUNITY TREE</span>

              <h2>
                One Person Can Start a<span> Chain of Service.</span>
              </h2>

              <p>
                If you introduce someone to Hanumat Seva and they genuinely want
                to participate, your community can grow.
              </p>

              <div className="community-principle">
                <ShieldCheck size={24} />

                <div>
                  <strong>We don't reward recruitment.</strong>

                  <span>We recognize service.</span>
                </div>
              </div>

              <p className="community-tree-description">
                Your community profile can show the people you introduced,
                participation in activities, meals supported, volunteer hours,
                campaigns supported and verified impact.
              </p>

              <Link to="/register" className="community-text-link">
                Build Your Community
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

                <strong>You</strong>

                <span>Community Member</span>
              </div>

              <div className="tree-branches">
                <div className="tree-branch branch-left">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <Heart size={20} />
                    </div>
                    <strong>Member</strong>

                    <span>Participating</span>
                  </div>
                </div>

                <div className="tree-branch branch-center">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <HandHeart size={20} />
                    </div>

                    <strong>Volunteer</strong>

                    <span>Serving</span>
                  </div>
                </div>

                <div className="tree-branch branch-right">
                  <div className="tree-node small-node">
                    <div className="tree-node-icon">
                      <Sparkles size={20} />
                    </div>

                    <strong>Inspired</strong>

                    <span>Growing</span>
                  </div>
                </div>
              </div>

              <div className="tree-impact">
                <TreePine size={22} />

                <span>Community Impact Tree</span>
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
            <span>COMMUNITY IMPACT</span>

            <h2>
              Your Contribution.
              <span> Your Impact. Your Journey.</span>
            </h2>

            <p>
              Every verified activity can contribute toward a community impact
              score. The score reflects service and verified impact, not simply
              how much someone donated.
            </p>
          </div>

          <div className="impact-profile">
            <div className="impact-profile-header">
              <div className="impact-user">
                <div className="impact-avatar">RS</div>

                <div>
                  <span>Example Community Profile</span>
                  <h3>Rahul Sharma</h3>
                </div>
              </div>

              <div className="impact-score">
                <span>IMPACT SCORE</span>

                <strong>780</strong>
              </div>
            </div>

            <div className="community-impact-stats">
              {impactStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="community-impact-stat" key={stat.label}>
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

              <span>
                Example values shown for demonstration. Actual impact will be
                generated from verified activity records.
              </span>
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
            <span>IMPACT LEVELS</span>

            <h2>
              Grow Through
              <span> Service</span>
            </h2>

            <p>
              Your level should reflect the genuine service and verified impact
              you create within the community.
            </p>
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
              <span>BE PART OF THE JOURNEY</span>

              <h2>
                Your Small Step Can Become
                <strong> Someone Else's Hope.</strong>
              </h2>

              <p>Support. Volunteer. Participate. Inspire. Build.</p>
            </div>

            <div className="community-cta-actions">
              <Link
                to="/register"
                className="community-btn community-btn-light"
              >
                Join Community
                <Users size={18} />
              </Link>

              <Link to="/donate" className="community-btn community-btn-ghost">
                Support a Meal
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
