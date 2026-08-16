import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Wrench,
  Clock,
  Heart,
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";

import "../Volunteer.css";

const VolunteerApplication = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    ageGroup: "",
    skills: "",
    availability: "",
    preferredActivity: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo ke liye application save
    localStorage.setItem("volunteerApplication", JSON.stringify(formData));

    // Initial application status
    localStorage.setItem("volunteerApplicationStatus", "Pending");

    // =========================================
    // ADDED: Demo ke liye application Approved
    // =========================================

    localStorage.setItem("volunteerApplicationStatus", "Approved");

    // =========================================
    // ADDED: Application submitted flag
    // =========================================

    localStorage.setItem("volunteerApplicationSubmitted", "true");

    // =========================================
    // ADDED: Application submission date/time
    // =========================================

    localStorage.setItem("volunteerApplicationDate", new Date().toISOString());

    // Next page
    navigate("/volunteer/status");
  };

  return (
    <div className="volunteer-application-page">
      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="application-hero">
        <div className="application-hero-overlay"></div>

        <div className="application-hero-content">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/volunteer")}
          >
            <ArrowLeft size={17} />
            Back to Volunteer
          </button>

          <span className="application-label">HANUMAT SEVA</span>

          <h1>
            Become a<span> Volunteer</span>
          </h1>

          <p>
            Your time and skills can create meaningful change. Fill in the
            application below to start your volunteering journey.
          </p>
        </div>
      </section>

      {/* ================================
          APPLICATION SECTION
      ================================= */}

      <section className="application-section">
        <div className="application-layout">
          {/* ================================
              LEFT INFORMATION
          ================================= */}

          <div className="application-info">
            {/* Image */}

            <div className="application-image">
              <img
                src="/images/volunteer-group.jpeg"
                alt="Volunteers helping the community"
              />
            </div>

            <span className="section-label">JOIN OUR COMMUNITY</span>

            <h2>
              Give Your Time.
              <span> Create Impact.</span>
            </h2>

            <p>
              Join Hanumant Seva and become part of a community working together
              to serve people and make a positive difference.
            </p>

            {/* Information Points */}

            <div className="info-points">
              {/* Point 1 */}

              <div className="info-point">
                <div className="info-point-icon">
                  <Heart size={20} />
                </div>

                <div>
                  <h3>Serve With Purpose</h3>

                  <p>
                    Contribute your time to meaningful community activities.
                  </p>
                </div>
              </div>

              {/* Point 2 */}

              <div className="info-point">
                <div className="info-point-icon">
                  <Clock size={20} />
                </div>

                <div>
                  <h3>Choose Your Availability</h3>

                  <p>Tell us when you are available to volunteer.</p>
                </div>
              </div>

              {/* Point 3 */}

              <div className="info-point">
                <div className="info-point-icon">
                  <Wrench size={20} />
                </div>

                <div>
                  <h3>Use Your Skills</h3>

                  <p>
                    Share your skills and support the activities where you can
                    help most.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================
              APPLICATION FORM
          ================================= */}

          <div className="application-form-card">
            {/* Form Heading */}

            <div className="form-heading">
              <span className="form-label">VOLUNTEER APPLICATION</span>

              <h2>Tell Us About Yourself</h2>

              <p>
                Please provide your details to submit your volunteer
                application.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>
              {/* ================================
                  FULL NAME
              ================================= */}

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>

                <div className="input-wrapper">
                  <User size={18} />

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ================================
                  EMAIL + PHONE
              ================================= */}

              <div className="form-row">
                {/* Email */}

                <div className="form-group">
                  <label htmlFor="email">Email</label>

                  <div className="input-wrapper">
                    <Mail size={18} />

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>

                  <div className="input-wrapper">
                    <Phone size={18} />

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ================================
                  CITY + AGE GROUP
              ================================= */}

              <div className="form-row">
                {/* City */}

                <div className="form-group">
                  <label htmlFor="city">City</label>

                  <div className="input-wrapper">
                    <MapPin size={18} />

                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Age */}

                <div className="form-group">
                  <label htmlFor="ageGroup">Age Group</label>

                  <div className="input-wrapper">
                    <CalendarDays size={18} />

                    <select
                      id="ageGroup"
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select age group</option>

                      <option value="under-18">Under 18</option>

                      <option value="18-25">18 - 25</option>

                      <option value="26-35">26 - 35</option>

                      <option value="36-50">36 - 50</option>

                      <option value="51+">51+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================================
                  SKILLS
              ================================= */}

              <div className="form-group">
                <label htmlFor="skills">Skills</label>

                <div className="input-wrapper">
                  <Wrench size={18} />

                  <textarea
                    id="skills"
                    name="skills"
                    placeholder="Example: Teaching, cooking, photography, social media..."
                    value={formData.skills}
                    onChange={handleChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>

              {/* ================================
                  AVAILABILITY
              ================================= */}

              <div className="form-group">
                <label htmlFor="availability">Availability</label>

                <div className="input-wrapper">
                  <Clock size={18} />

                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select availability</option>

                    <option value="weekdays">Weekdays</option>

                    <option value="weekends">Weekends</option>

                    <option value="both">Weekdays & Weekends</option>

                    <option value="occasionally">Occasionally</option>
                  </select>
                </div>
              </div>

              {/* ================================
                  PREFERRED ACTIVITY
              ================================= */}

              <div className="form-group">
                <label htmlFor="preferredActivity">Preferred Activities</label>

                <div className="input-wrapper">
                  <Heart size={18} />

                  <select
                    id="preferredActivity"
                    name="preferredActivity"
                    value={formData.preferredActivity}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select preferred activity</option>

                    <option value="food-distribution">Food Distribution</option>

                    <option value="food-preparation">Food Preparation</option>

                    <option value="food-rescue">Food Rescue</option>

                    <option value="community-support">Community Support</option>

                    <option value="documentation">Documentation</option>

                    <option value="awareness">Awareness</option>
                  </select>
                </div>
              </div>

              {/* ================================
                  REASON
              ================================= */}

              <div className="form-group">
                <label htmlFor="reason">Why do you want to volunteer?</label>

                <div className="input-wrapper">
                  <Heart size={18} />

                  <textarea
                    id="reason"
                    name="reason"
                    placeholder="Tell us why you would like to volunteer with Hanumat Seva..."
                    value={formData.reason}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>

              {/* ================================
                  SUBMIT BUTTON
              ================================= */}

              <button type="submit" className="submit-application-button">
                <Send size={18} />
                Submit Application
                <ArrowRight size={18} />
              </button>

              <p className="form-note">
                Your application will be reviewed by the Hanumant Seva volunteer
                team.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerApplication;
