import React from "react";
import { useNavigate } from "react-router-dom";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Wrench,
  Clock3,
  Heart,
  ArrowLeft,
  ArrowRight,
  Edit3,
  ShieldCheck,
} from "lucide-react";

import "../css/Volunteer.css";

const VolunteerProfile = () => {
  const navigate = useNavigate();

  /* =========================================
     GET APPLICATION DATA
  ========================================== */

  const applicationData = JSON.parse(
    localStorage.getItem("volunteerApplication") || "{}"
  );

  const volunteerName = applicationData.fullName || "Volunteer";
  const email = applicationData.email || "volunteer@example.com";
  const phone = applicationData.phone || "Not provided";
  const city = applicationData.city || "Not provided";
  const ageGroup = applicationData.ageGroup || "Not provided";
  const skills = applicationData.skills || "Not provided";
  const availability = applicationData.availability || "Not provided";

  const preferredActivity =
    applicationData.preferredActivity || "Community Support";

  return (
    <div className="volunteer-profile-page">

      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <section className="profile-page-hero">

        <div className="profile-page-hero-content">

          {/* Back Button */}

          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>


          {/* Hero Heading */}

          <span className="application-label">
            VOLUNTEER ACCOUNT
          </span>

          <h1>
            My <span>Profile</span>
          </h1>

          <p className="profile-hero-description">
            View and manage your volunteer information, skills and
            availability.
          </p>


          {/* =================================================
              COMMUNITY SECTION INSIDE HERO
          ================================================= */}

          <div className="profile-hero-community">

            {/* Image */}

            <div className="profile-hero-community-image">

              <img
                src="/images/volunteer-profile.png"
                alt="Hanumat Seva volunteer community"
              />

            </div>


            {/* Content */}

            <div className="profile-hero-community-content">

              <span>
                HANUMAT SEVA COMMUNITY
              </span>

              <h2>
                Every volunteer
                <strong> makes a difference.</strong>
              </h2>

              <p>
                Continue your journey with Hanumat Seva and use your
                time, skills and compassion to support the community.
              </p>

              <button
                type="button"
                className="outline-button"
                onClick={() => navigate("/volunteer/events")}
              >
                Explore Events
                <ArrowRight size={17} />
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROFILE MAIN
      ===================================================== */}

      <main className="profile-page-main">

        <div className="profile-page-grid">


          {/* =================================================
              LEFT COLUMN — PROFILE CARD
          ================================================= */}

          <aside className="profile-main-card">

            <div className="profile-large-avatar">
              <UserRound size={48} />
            </div>

            <span className="profile-role">
              ACTIVE VOLUNTEER
            </span>

            <h2>
              {volunteerName}
            </h2>

            <p className="profile-location">
              <MapPin size={15} />
              {city}
            </p>

            <div className="profile-divider"></div>


            {/* Contact Information */}

            <div className="profile-mini-info">

              <div>
                <Mail size={17} />
                <span>{email}</span>
              </div>

              <div>
                <Phone size={17} />
                <span>{phone}</span>
              </div>

            </div>


            {/* Edit Button */}

            <button
              type="button"
              className="orange-button profile-edit-button"
            >
              <Edit3 size={17} />
              Edit Profile
            </button>


            {/* Account Information */}

            <div className="profile-verified">

              <ShieldCheck size={17} />

              <div>
                <strong>
                  Volunteer Account
                </strong>

                <span>
                  Your information is securely stored.
                </span>
              </div>

            </div>

          </aside>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <section className="profile-information">


            {/* =================================================
                ROW 1 — PERSONAL INFORMATION
            ================================================= */}

            <div className="profile-info-card">

              <div className="profile-info-heading">

                <div>
                  <span>
                    PERSONAL INFORMATION
                  </span>

                  <h2>
                    Basic Details
                  </h2>
                </div>

                <UserRound size={22} />

              </div>


              <div className="profile-detail-grid">

                <div className="profile-detail">
                  <small>Full Name</small>
                  <strong>{volunteerName}</strong>
                </div>

                <div className="profile-detail">
                  <small>Email Address</small>
                  <strong>{email}</strong>
                </div>

                <div className="profile-detail">
                  <small>Phone Number</small>
                  <strong>{phone}</strong>
                </div>

                <div className="profile-detail">
                  <small>City</small>
                  <strong>{city}</strong>
                </div>

                <div className="profile-detail">
                  <small>Age Group</small>
                  <strong>{ageGroup}</strong>
                </div>

              </div>

            </div>


            {/* =================================================
                ROW 2 — VOLUNTEER PREFERENCES
            ================================================= */}

            <div className="profile-info-card">

              <div className="profile-info-heading">

                <div>

                  <span>
                    VOLUNTEER INFORMATION
                  </span>

                  <h2>
                    Your Preferences
                  </h2>

                </div>

                <Heart size={22} />

              </div>


              <div className="profile-preference-grid">


                {/* Skills */}

                <div className="preference-box">

                  <div className="preference-icon">
                    <Wrench size={20} />
                  </div>

                  <div>
                    <small>
                      SKILLS
                    </small>

                    <h3>
                      {skills}
                    </h3>
                  </div>

                </div>


                {/* Availability */}

                <div className="preference-box">

                  <div className="preference-icon">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <small>
                      AVAILABILITY
                    </small>

                    <h3>
                      {availability}
                    </h3>
                  </div>

                </div>


                {/* Preferred Activity */}

                <div className="preference-box">

                  <div className="preference-icon">
                    <Heart size={20} />
                  </div>

                  <div>
                    <small>
                      PREFERRED ACTIVITY
                    </small>

                    <h3>
                      {preferredActivity}
                    </h3>
                  </div>

                </div>


                {/* Age Group */}

                <div className="preference-box">

                  <div className="preference-icon">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <small>
                      AGE GROUP
                    </small>

                    <h3>
                      {ageGroup}
                    </h3>
                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                ROW 3 — BACK TO DASHBOARD
            ================================================= */}

            <div className="profile-bottom-action">

              <button
                type="button"
                className="outline-button"
                onClick={() => navigate("/volunteer/dashboard")}
              >
                <ArrowLeft size={17} />
                Back to Dashboard
              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default VolunteerProfile;
