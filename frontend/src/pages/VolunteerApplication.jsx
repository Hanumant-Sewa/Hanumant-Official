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
  ChevronDown,
} from "lucide-react";

import "../css/Volunteer.css";

const VolunteerApplication = () => {
  const navigate = useNavigate();

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    ageGroup: "",
    skills: "",
    availability: "",
    preferredActivity: [],
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preferred Activities dropdown state
  const [activityOpen, setActivityOpen] = useState(false);

  // =====================================================
  // NORMAL INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // MULTIPLE ACTIVITY CHECKBOX CHANGE
  // =====================================================

  const handleActivityChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      let updatedActivities = [...prev.preferredActivity];

      if (checked) {
        updatedActivities.push(value);
      } else {
        updatedActivities = updatedActivities.filter(
          (activity) => activity !== value,
        );
      }

      return {
        ...prev,
        preferredActivity: updatedActivities,
      };
    });
  };

  // =====================================================
  // ACTIVITY DISPLAY TEXT
  // =====================================================

  const getActivityText = () => {
    if (formData.preferredActivity.length === 0) {
      return "Select activities";
    }

    if (formData.preferredActivity.length === 1) {
      const selected = formData.preferredActivity[0];

      const names = {
        "food-distribution": "Food Distribution",
        "food-preparation": "Food Preparation",
        "food-rescue": "Food Rescue",
        "community-support": "Community Support",
        documentation: "Documentation",
        awareness: "Awareness",
      };

      return names[selected];
    }

    return `${formData.preferredActivity.length} activities selected`;
  };

  // =====================================================
  // SUBMIT APPLICATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // At least one activity
    if (formData.preferredActivity.length === 0) {
      alert("Please select at least one preferred activity.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/volunteer-applications/apply`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Send authentication cookie
          credentials: "include",

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      console.log("Volunteer Application Response:", data);

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        // Existing application
        if (data.message === "You already have a volunteer application") {
          navigate("/volunteer/application-status");
          return;
        }

        alert(data.message || "Failed to submit volunteer application.");

        return;
      }

      // =================================================
      // APPLICATION ALREADY EXISTS
      // =================================================

      if (data.alreadyApplied) {
        navigate("/volunteer/application-status");
        return;
      }

      // =================================================
      // SUCCESS
      // =================================================

      navigate("/volunteer/application-status");
    } catch (error) {
      console.error("Volunteer Application Error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="volunteer-application-page">
      {/* =================================================
          HERO SECTION
      ================================================= */}

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

          <span className="application-label">HANUMANT SEVA</span>

          <h1>
            Become a <span>Volunteer</span>
          </h1>

          <p>
            Your time and skills can create meaningful change. Fill in the
            application below to start your volunteering journey.
          </p>
        </div>
      </section>

      {/* =================================================
          APPLICATION SECTION
      ================================================= */}

      <section className="application-section">
        <div className="application-layout">
          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <div className="application-info">
            <div className="application-image">
              <img
                src="/images/volunteer-group.jpeg"
                alt="Volunteers helping the community"
              />
            </div>

            <span className="section-label">JOIN OUR COMMUNITY</span>

            <h2>
              Give Your Time.
              <span>Create Impact.</span>
            </h2>

            <p>
              Join Hanumant Seva and become part of a community working together
              to serve people and make a positive difference.
            </p>

            <div className="info-points">
              {/* POINT 1 */}

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

              {/* POINT 2 */}

              <div className="info-point">
                <div className="info-point-icon">
                  <Clock size={20} />
                </div>

                <div>
                  <h3>Choose Your Availability</h3>

                  <p>Tell us when you are available to volunteer.</p>
                </div>
              </div>

              {/* POINT 3 */}

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

          {/* =================================================
              RIGHT APPLICATION FORM
          ================================================= */}

          <div className="application-form-card">
            <div className="form-heading">
              <span className="form-label">VOLUNTEER APPLICATION</span>

              <h2>Tell Us About Yourself</h2>

              <p>
                Please provide your details to submit your volunteer
                application.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>
              {/* =================================================
                  FULL NAME + EMAIL
              ================================================= */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">
                    Full Name <span>*</span>
                  </label>

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

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span>*</span>
                  </label>

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
              </div>

              {/* =================================================
                  PHONE + CITY
              ================================================= */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone <span>*</span>
                  </label>

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

                <div className="form-group">
                  <label htmlFor="city">
                    City <span>*</span>
                  </label>

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
              </div>

              {/* =================================================
                  AGE GROUP + AVAILABILITY
              ================================================= */}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ageGroup">
                    Age Group <span>*</span>
                  </label>

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

                <div className="form-group">
                  <label htmlFor="availability">
                    Availability <span>*</span>
                  </label>

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
              </div>

              {/* =================================================
                  SKILLS
              ================================================= */}

              <div className="form-group">
                <label htmlFor="skills">
                  Skills <span>*</span>
                </label>

                <div className="input-wrapper textarea-wrapper">
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

              {/* =================================================
                  PREFERRED ACTIVITIES
              ================================================= */}

              <div className="form-group">
                <label className="activity-main-label">
                  <Heart size={17} />
                  Preferred Activities <span>*</span>
                </label>

                <p className="activity-help">Select all that apply</p>

                {/* =================================================
                    SINGLE MULTI-SELECT
                ================================================= */}

                <div className="activity-select-container">
                  {/* MAIN BOX */}

                  <button
                    type="button"
                    className={`activity-select-button ${
                      activityOpen ? "activity-select-open" : ""
                    }`}
                    onClick={() => setActivityOpen((prev) => !prev)}
                  >
                    <div className="activity-select-left">
                      <Heart size={18} />

                      <span>{getActivityText()}</span>
                    </div>

                    <ChevronDown
                      size={19}
                      className={`activity-chevron ${
                        activityOpen ? "rotate-chevron" : ""
                      }`}
                    />
                  </button>

                  {/* =================================================
                      OPTIONS OPEN ONLY AFTER CLICK
                  ================================================= */}

                  {activityOpen && (
                    <div className="activity-dropdown">
                      {/* FOOD DISTRIBUTION */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="food-distribution"
                          checked={formData.preferredActivity.includes(
                            "food-distribution",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">
                          Food Distribution
                        </span>
                      </label>

                      {/* FOOD PREPARATION */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="food-preparation"
                          checked={formData.preferredActivity.includes(
                            "food-preparation",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">
                          Food Preparation
                        </span>
                      </label>

                      {/* FOOD RESCUE */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="food-rescue"
                          checked={formData.preferredActivity.includes(
                            "food-rescue",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">
                          Food Rescue
                        </span>
                      </label>

                      {/* COMMUNITY SUPPORT */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="community-support"
                          checked={formData.preferredActivity.includes(
                            "community-support",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">
                          Community Support
                        </span>
                      </label>

                      {/* DOCUMENTATION */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="documentation"
                          checked={formData.preferredActivity.includes(
                            "documentation",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">
                          Documentation
                        </span>
                      </label>

                      {/* AWARENESS */}

                      <label className="activity-option">
                        <input
                          type="checkbox"
                          value="awareness"
                          checked={formData.preferredActivity.includes(
                            "awareness",
                          )}
                          onChange={handleActivityChange}
                        />

                        <span className="activity-checkmark"></span>

                        <span className="activity-option-text">Awareness</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  REASON
              ================================================= */}

              <div className="form-group">
                <label htmlFor="reason">
                  Why do you want to volunteer? <span>*</span>
                </label>

                <div className="input-wrapper textarea-wrapper">
                  <Heart size={18} />

                  <textarea
                    id="reason"
                    name="reason"
                    placeholder="Tell us why you would like to volunteer with Hanumant Seva..."
                    value={formData.reason}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="submit-application-button"
                disabled={isSubmitting}
              >
                <Send size={18} />

                {isSubmitting ? "Submitting..." : "Submit Application"}

                {!isSubmitting && <ArrowRight size={18} />}
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
