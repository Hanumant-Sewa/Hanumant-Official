import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock3,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  UserRound,
  LayoutDashboard,
} from "lucide-react";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const applicationData = JSON.parse(
    localStorage.getItem("volunteerApplication") || "{}"
  );

  // ADDED: Get latest application status
  const applicationStatus =
    localStorage.getItem("volunteerApplicationStatus") || "Pending";

  // ADDED: Check whether application was submitted
  const applicationSubmitted =
    localStorage.getItem("volunteerApplicationSubmitted") === "true";

  const isPending = applicationStatus === "Pending";
  const isApproved = applicationStatus === "Approved";
  const isRejected = applicationStatus === "Rejected";

  // ADDED: Demo dashboard access
  const canAccessDashboard =
    applicationSubmitted && isApproved;

  return (
    <div className="application-status-page">

      {/* =========================================
          HERO
      ========================================== */}

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

          <span className="application-label">
            HANUMAT SEVA
          </span>

          <h1>
            Application
            <span> Status</span>
          </h1>

          <p>
            Track the current status of your volunteer
            application and your next steps.
          </p>

        </div>

      </section>


      {/* =========================================
          STATUS SECTION
      ========================================== */}

      <section className="application-section">

        <div className="status-container">


          {/* =====================================
              STATUS CARD
          ====================================== */}

          <div className="status-card">

            {/* Pending */}

            {isPending && (
              <>
                <div className="status-icon pending">
                  <Clock3 size={42} />
                </div>

                <span className="status-label">
                  APPLICATION RECEIVED
                </span>

                <h2>
                  Your Application is
                  <span> Pending</span>
                </h2>

                <p>
                  Thank you for applying to become a
                  Hanumat Seva volunteer. Your application
                  has been successfully submitted and is
                  currently waiting for review.
                </p>

                <div className="status-badge pending-badge">
                  <Clock3 size={16} />
                  Pending Review
                </div>
              </>
            )}


            {/* Approved */}

            {isApproved && (
              <>
                <div className="status-icon approved">
                  <CheckCircle size={42} />
                </div>

                <span className="status-label">
                  APPLICATION APPROVED
                </span>

                <h2>
                  Welcome to
                  <span> Hanumat Seva!</span>
                </h2>

                <p>
                  Congratulations! Your volunteer
                  application has been approved. You can
                  now access your volunteer dashboard and
                  explore available activities.
                </p>

                <div className="status-badge approved-badge">
                  <CheckCircle size={16} />
                  Application Approved
                </div>

                <button
                  type="button"
                  className="orange-button status-action"
                  onClick={() =>
                    navigate("/volunteer/dashboard")
                  }
                >
                  <LayoutDashboard size={18} />
                  Open Dashboard
                  <ArrowRight size={18} />
                </button>
              </>
            )}


            {/* Rejected */}

            {isRejected && (
              <>
                <div className="status-icon rejected">
                  <XCircle size={42} />
                </div>

                <span className="status-label">
                  APPLICATION UPDATE
                </span>

                <h2>
                  Application
                  <span> Not Approved</span>
                </h2>

                <p>
                  Unfortunately, your volunteer
                  application was not approved at this
                  time. You may review your details and
                  contact the Hanumant Seva team for more
                  information.
                </p>

                <div className="status-badge rejected-badge">
                  <XCircle size={16} />
                  Application Rejected
                </div>

                <button
                  type="button"
                  className="outline-button status-action"
                  onClick={() =>
                    navigate("/volunteer/application")
                  }
                >
                  <ArrowLeft size={18} />
                  Back to Application
                </button>
              </>
            )}

          </div>


          {/* =====================================
              APPLICATION DETAILS
          ====================================== */}

          {Object.keys(applicationData).length > 0 && (
            <div className="application-details-card">

              <div className="details-heading">

                <div className="details-heading-icon">
                  <UserRound size={20} />
                </div>

                <div>
                  <span>
                    APPLICATION DETAILS
                  </span>

                  <h3>
                    Submitted Information
                  </h3>
                </div>

              </div>


              <div className="details-grid">

                <div className="detail-item">
                  <small>Full Name</small>
                  <strong>
                    {applicationData.fullName || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <small>Email</small>
                  <strong>
                    {applicationData.email || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <small>Phone</small>
                  <strong>
                    {applicationData.phone || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <small>City</small>
                  <strong>
                    {applicationData.city || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <small>Age Group</small>
                  <strong>
                    {applicationData.ageGroup || "-"}
                  </strong>
                </div>

                <div className="detail-item">
                  <small>Availability</small>
                  <strong>
                    {applicationData.availability || "-"}
                  </strong>
                </div>

                <div className="detail-item full-width">
                  <small>Preferred Activity</small>
                  <strong>
                    {applicationData.preferredActivity || "-"}
                  </strong>
                </div>

              </div>

            </div>
          )}


          {/* =====================================
              WHAT HAPPENS NEXT
          ====================================== */}

          <div className="status-next-card">

            <span className="section-label">
              WHAT HAPPENS NEXT?
            </span>

            <h2>
              Your Volunteer Journey
            </h2>

            <div className="journey-steps">

              <div className="journey-step active">

                <div className="journey-number">
                  01
                </div>

                <div>
                  <h3>
                    Application Submitted
                  </h3>

                  <p>
                    Your volunteer application has been
                    successfully received.
                  </p>
                </div>

              </div>


              <div className="journey-line"></div>


              <div
                className={`journey-step ${
                  isApproved ? "active" : ""
                }`}
              >

                <div className="journey-number">
                  02
                </div>

                <div>
                  <h3>
                    Admin Review
                  </h3>

                  <p>
                    The Hanumat Seva team reviews your
                    application.
                  </p>
                </div>

              </div>


              <div className="journey-line"></div>


              <div
                className={`journey-step ${
                  isApproved ? "active" : ""
                }`}
              >

                <div className="journey-number">
                  03
                </div>

                <div>
                  <h3>
                    Volunteer Access
                  </h3>

                  <p>
                    Once approved, you can access your
                    volunteer dashboard.
                  </p>
                </div>

              </div>

            </div>

          </div>


                 {/* BUTTON ACTIONS */}
        <div className="status-bottom-actions">

          {/* DEMO DASHBOARD ACCESS */}
          {canAccessDashboard && (
            <div className="status-bottom-action">
              <button
                type="button"
                className="orange-button status-action"
                onClick={() => navigate("/volunteer/dashboard")}
              >
                <LayoutDashboard size={18} />
                Go to Volunteer Dashboard
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* BACK HOME BUTTON */}
          <div className="status-bottom-action">
            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/volunteer")}
            >
              <ArrowLeft size={17} />
              Back to Volunteer Page
            </button>
          </div>

        </div>
      </div>
    </section>
  </div>
);
};

export default ApplicationStatus;