import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Users,
  HandHeart,
  Clock3,
  MapPin,
  CalendarDays,
  TrendingUp,
  Award,
  Star,
  CheckCircle2,
} from "lucide-react";

import "../css/Volunteer.css";

function VolunteerImpact() {
  const navigate = useNavigate();

  const impactStats = [
    {
      icon: Heart,
      value: "25",
      label: "People Helped",
      description: "People directly supported through your service.",
    },
    {
      icon: Users,
      value: "8",
      label: "Events Joined",
      description: "Community events where you contributed.",
    },
    {
      icon: Clock3,
      value: "42",
      label: "Hours Served",
      description: "Total volunteer hours contributed.",
    },
    {
      icon: HandHeart,
      value: "12",
      label: "Tasks Completed",
      description: "Volunteer tasks successfully completed.",
    },
  ];

  const activities = [
    {
      title: "Community Food Distribution",
      date: "22 August 2026",
      location: "Solapur",
      hours: "5 Hours",
      impact: "Helped distribute food to families.",
    },
    {
      title: "Donation Collection Drive",
      date: "20 September 2026",
      location: "Solapur",
      hours: "4 Hours",
      impact: "Supported donation collection activities.",
    },
    {
      title: "Community Outreach Program",
      date: "27 September 2026",
      location: "Solapur",
      hours: "6 Hours",
      impact: "Participated in community awareness activities.",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Active Volunteer",
      description: "Completed multiple volunteer activities.",
    },
    {
      icon: Star,
      title: "Community Contributor",
      description: "Made a positive contribution to the community.",
    },
    {
      icon: TrendingUp,
      title: "Consistent Service",
      description: "Regularly participated in volunteer activities.",
    },
  ];

  return (
    <div className="volunteer-impact-page">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="impact-page-hero">
        <div className="impact-hero-content">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <span className="application-label">VOLUNTEER IMPACT</span>

          <h1>
            My
            <span> Impact</span>
          </h1>

          <p>
            See how your time, effort and dedication are helping create a
            positive change in the community.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="impact-page-main">
        {/* =================================================
            IMPACT INTRO
        ================================================== */}

        <section className="impact-intro">
          <div className="impact-intro-image">
            <img
              src="/images/benefit-community.jpeg"
              alt="Volunteer community impact"
            />
          </div>

          <div className="impact-intro-content">
            <span>YOUR CONTRIBUTION</span>

            <h2>
              Every act of service
              <strong> creates an impact.</strong>
            </h2>

            <p>
              Your volunteer journey is more than numbers. Every hour you spend,
              every task you complete and every person you help contributes to a
              stronger and more caring community.
            </p>

            <div className="impact-highlight">
              <CheckCircle2 size={20} />

              <span>Thank you for making a difference.</span>
            </div>
          </div>
        </section>

        {/* =================================================
            IMPACT STATISTICS
        ================================================== */}

        <section className="impact-statistics">
          <div className="impact-section-heading">
            <div>
              <span>YOUR JOURNEY</span>

              <h2>Your Impact at a Glance</h2>
            </div>
          </div>

          <div className="impact-stat-grid">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div className="impact-stat-card" key={index}>
                  <div className="impact-stat-icon">
                    <Icon size={25} />
                  </div>

                  <div className="impact-stat-number">{stat.value}</div>

                  <h3>{stat.label}</h3>

                  <p>{stat.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            IMPACT PROGRESS
        ================================================== */}

        <section className="impact-progress-section">
          <div className="impact-progress-content">
            <span>VOLUNTEER GOAL</span>

            <h2>Keep Growing Your Impact</h2>

            <p>
              Continue participating in events and completing tasks to increase
              your contribution.
            </p>

            <div className="impact-progress-info">
              <span>Volunteer Hours</span>

              <strong>42 / 50 Hours</strong>
            </div>

            <div className="impact-progress-bar">
              <div
                className="impact-progress-fill"
                style={{ width: "84%" }}
              ></div>
            </div>

            <small>8 more hours to reach your current goal.</small>
          </div>

          <div className="impact-progress-icon">
            <TrendingUp size={70} />

            <strong>84%</strong>

            <span>Goal Completed</span>
          </div>
        </section>

        {/* =================================================
            RECENT ACTIVITIES
        ================================================== */}

        <section className="impact-activities-section">
          <div className="impact-section-heading">
            <div>
              <span>SERVICE HISTORY</span>

              <h2>Recent Contributions</h2>
            </div>

            <button
              type="button"
              className="impact-view-button"
              onClick={() => navigate("/volunteer/events")}
            >
              View Events
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="impact-activities">
            {activities.map((activity, index) => (
              <article className="impact-activity-card" key={index}>
                <div className="impact-activity-icon">
                  <HandHeart size={24} />
                </div>

                <div className="impact-activity-content">
                  <h3>{activity.title}</h3>

                  <p>{activity.impact}</p>

                  <div className="impact-activity-meta">
                    <span>
                      <CalendarDays size={14} />
                      {activity.date}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {activity.location}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {activity.hours}
                    </span>
                  </div>
                </div>

                <div className="impact-completed">
                  <CheckCircle2 size={18} />

                  <span>Completed</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            ACHIEVEMENTS
        ================================================== */}

        <section className="impact-achievements-section">
          <div className="impact-section-heading">
            <div>
              <span>RECOGNITION</span>

              <h2>Your Achievements</h2>
            </div>
          </div>

          <div className="impact-achievements-grid">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;

              return (
                <div className="impact-achievement-card" key={index}>
                  <div className="impact-achievement-icon">
                    <Icon size={25} />
                  </div>

                  <div>
                    <h3>{achievement.title}</h3>

                    <p>{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================
            MOTIVATION SECTION
        ================================================== */}

        <section className="impact-motivation">
          <div className="impact-motivation-content">
            <span>SERVICE • COMPASSION • IMPACT</span>

            <h2>
              Your small effort can
              <strong> create a big change.</strong>
            </h2>

            <p>
              Continue your journey of service and inspire more people to become
              part of the community.
            </p>

            <button
              type="button"
              className="orange-button"
              onClick={() => navigate("/volunteer/events")}
            >
              Explore More Events
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="impact-motivation-image">
            <img src="/images/volunteer-service.jpeg" alt="Volunteer service" />
          </div>
        </section>

        {/* =================================================
            BOTTOM BUTTON
        ================================================== */}

        <div className="impact-bottom-action">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default VolunteerImpact;
