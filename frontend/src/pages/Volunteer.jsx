import React from "react";

import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Users,
  CalendarCheck,
  HandHeart,
  Utensils,
  Recycle,
  GraduationCap,
  Camera,
  Megaphone,
} from "lucide-react";

import "../css/Volunteer.css";

function Volunteer() {
  const navigate = useNavigate();

  const activities = [
    {
      icon: <Utensils size={28} />,
      title: "Food Distribution",
      text: "Help distribute nutritious meals to people in need.",
      image: "/images/food-distribution.png",
    },
    {
      icon: <HandHeart size={28} />,
      title: "Food Preparation",
      text: "Support our community kitchen and meal preparation.",
      image: "/images/food-preparation.png",
    },
    {
      icon: <Recycle size={28} />,
      title: "Food Rescue",
      text: "Help rescue surplus food and reduce food wastage.",
      image: "/images/food-rescue.png",
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Community Support",
      text: "Take part in activities that support local communities.",
      image: "/images/community-support.jpeg",
    },
    {
      icon: <Camera size={28} />,
      title: "Documentation",
      text: "Capture and document meaningful volunteer activities.",
      image: "/images/documentation.jpeg",
    },
    {
      icon: <Megaphone size={28} />,
      title: "Awareness",
      text: "Spread awareness and encourage others to serve.",
      image: "/images/awareness.jpeg",
    },
  ];

  return (
    <div className="volunteer-page">
      {/* =========================================
          HERO SECTION
      ========================================== */}
      <section className="volunteer-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-small-title">HANUMANT SEVA</span>

            <h1>
              Become a<span> Volunteer</span>
            </h1>

            <h2>Give your time. Create real impact.</h2>

            <p>
              Join Hanumant Seva and become a part of a community that serves
              people, supports families and spreads kindness.
            </p>

            <button
              className="orange-button hero-button"
              onClick={() => navigate("/volunteer/application")}
            >
              Apply as Volunteer
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        {/* Hero Bottom Stats */}
        <div className="hero-stats">
          <div className="stat-box">
            <div className="stat-icon">
              <Users size={28} />
            </div>

            <div>
              <h3>500+</h3>
              <p>Active Volunteers</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">
              <CalendarCheck size={28} />
            </div>

            <div>
              <h3>50+</h3>
              <p>Events Completed</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">
              <Heart size={28} />
            </div>

            <div>
              <h3>20K+</h3>
              <p>Lives Impacted</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon">
              <HandHeart size={28} />
            </div>

            <div>
              <h3>100+</h3>
              <p>Campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          INTRODUCTION SECTION
      ========================================== */}
      <section className="volunteer-intro">
        <div className="section-image">
          <img
            src="/images/volunteer-service.jpeg"
            alt="Volunteers serving the community"
          />
        </div>

        <div className="section-content">
          <span className="section-label">MAKE A DIFFERENCE</span>

          <h2>
            Your Time Can
            <span> Change a Life</span>
          </h2>

          <p>
            Volunteering with Hanumant Seva is an opportunity to give your time,
            skills and energy towards meaningful community service.
          </p>

          <p>
            Whether you help with food distribution, community activities,
            awareness campaigns or documentation, every contribution matters.
          </p>

          <button
            className="outline-button"
            onClick={() => navigate("/volunteer/application")}
          >
            Start Your Journey
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* =========================================
          WHY VOLUNTEER SECTION
      ========================================== */}
      <section className="why-volunteer">
        <div className="section-heading">
          <span className="section-label">WHY VOLUNTEER?</span>

          <h2>
            Serve With
            <span> Purpose</span>
          </h2>

          <p>
            Become part of a community where your efforts create visible and
            meaningful impact.
          </p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-image">
              <img src="/images/benefit-impact.jpeg" alt="Community impact" />
            </div>

            <div className="benefit-content">
              <div className="benefit-icon">
                <Heart size={25} />
              </div>

              <h3>Create Impact</h3>

              <p>
                Make a real difference in the lives of people and communities.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-image">
              <img
                src="/images/benefit-community.jpeg"
                alt="Volunteers together"
              />
            </div>

            <div className="benefit-content">
              <div className="benefit-icon">
                <Users size={25} />
              </div>

              <h3>Meet People</h3>

              <p>Connect with people who share the same spirit of service.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-image">
              <img src="/images/benefit-skills.jpeg" alt="Volunteer skills" />
            </div>

            <div className="benefit-content">
              <div className="benefit-icon">
                <GraduationCap size={25} />
              </div>

              <h3>Build Skills</h3>

              <p>
                Develop teamwork, leadership and practical community skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          ACTIVITIES SECTION
      ========================================== */}
      <section className="volunteer-activities">
        <div className="section-heading">
          <span className="section-label">VOLUNTEER ACTIVITIES</span>

          <h2>
            Choose How You Want
            <span> To Serve</span>
          </h2>

          <p>
            Select activities according to your interests, skills and
            availability.
          </p>
        </div>

        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div className="activity-card" key={index}>
              <div className="activity-image">
                <img src={activity.image} alt={activity.title} />
              </div>

              <div className="activity-body">
                <div className="activity-icon">{activity.icon}</div>

                <h3>{activity.title}</h3>

                <p>{activity.text}</p>

                <button onClick={() => navigate("/volunteer/application")}>
                  Join Activity
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          CTA SECTION
      ========================================== */}
      <section className="volunteer-cta">
        <div className="cta-image">
          <img
            src="/images/volunteer-group.jpeg"
            alt="Hanumat Seva volunteers"
          />
        </div>

        <div className="cta-content">
          <span className="section-label">JOIN HANUMAT SEVA</span>

          <h2>
            Ready to Make a<span> Difference?</span>
          </h2>

          <p>
            Your time, skills and kindness can become someone's reason to smile.
          </p>

          <button
            className="orange-button"
            onClick={() => navigate("/volunteer/application")}
          >
            Become a Volunteer
            <ArrowRight size={19} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Volunteer;
