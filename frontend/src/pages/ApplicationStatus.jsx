import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Clock3,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  UserRound,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

import "../css/volunteer.css";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // GET APPLICATION STATUS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/volunteer-applications/status`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        console.log("Application Status Response:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch application status");
        }

        setApplication(data.application);
      } catch (error) {
        console.error("Application Status Error:", error);

        setError(error.message || "Unable to fetch application status");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, []);

  // =====================================================
  // FORMAT PREFERRED ACTIVITIES
  // =====================================================

  const formatActivities = (activities) => {
    if (!activities) {
      return "-";
    }

    const activityNames = {
      "food-distribution": "Food Distribution",
      "food-preparation": "Food Preparation",
      "food-rescue": "Food Rescue",
      "community-support": "Community Support",
      documentation: "Documentation",
      awareness: "Awareness",
    };

    return activities
      .split(",")
      .map((activity) => activity.trim())
      .map((activity) => activityNames[activity] || activity)
      .join(", ");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="application-status-page">
        <section className="application-section">
          <div className="status-container">
            <div className="status-card">
              <div className="status-icon pending">
                <Loader2 size={42} className="loading-icon" />
              </div>

              <h2>
                Loading
                <span> Application Status...</span>
              </h2>

              <p>
                Please wait while we fetch your volunteer application status.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
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

            <span className="application-label">HANUMAT SEVA</span>

            <h1>
              Application
              <span> Status</span>
            </h1>

            <p>
              Track the current status of your volunteer application and your
              next steps.
            </p>
          </div>
        </section>

        {/* =========================================
            ERROR CARD
        ========================================== */}

        <section className="application-section">
          <div className="status-container">
            <div className="status-card">
              <div className="status-icon rejected">
                <XCircle size={42} />
              </div>

              <span className="status-label">APPLICATION STATUS</span>

              <h2>
                Unable to Load
                <span> Application</span>
              </h2>

              <p>{error}</p>

              <button
                type="button"
                className="orange-button status-action"
                onClick={() => window.location.reload()}
              >
                Try Again
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // =====================================================
  // APPLICATION STATUS
  // =====================================================

  const status = application?.status?.toUpperCase();

  const isPending = status === "PENDING";
  const isApproved = status === "APPROVED";
  const isRejected = status === "REJECTED";

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="application-status-page">
      {/* =========================================
          HERO SECTION
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

          <span className="application-label">HANUMAT SEVA</span>

          <h1>
            Application
            <span> Status</span>
          </h1>

          <p>
            Track the current status of your volunteer application and your next
            steps.
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
            {/* =================================
                PENDING
            ================================== */}

            {isPending && (
              <>
                <div className="status-icon pending">
                  <Clock3 size={42} />
                </div>

                <span className="status-label">APPLICATION RECEIVED</span>

                <h2>
                  Your Application is
                  <span> Pending</span>
                </h2>

                <p>
                  Thank you for applying to become a Hanumat Seva volunteer.
                  Your application has been successfully submitted and is
                  currently waiting for review.
                </p>

                <div className="status-badge pending-badge">
                  <Clock3 size={16} />
                  Pending Review
                </div>
              </>
            )}

            {/* =================================
                APPROVED
            ================================== */}

            {isApproved && (
              <>
                <div className="status-icon approved">
                  <CheckCircle size={42} />
                </div>

                <span className="status-label">APPLICATION APPROVED</span>

                <h2>
                  Welcome to
                  <span> Hanumat Seva!</span>
                </h2>

                <p>
                  Congratulations! Your volunteer application has been approved.
                  You can now access your volunteer dashboard and explore
                  available activities.
                </p>

                <div className="status-badge approved-badge">
                  <CheckCircle size={16} />
                  Application Approved
                </div>

                <button
                  type="button"
                  className="orange-button status-action"
                  onClick={() => navigate("/volunteer/dashboard")}
                >
                  <LayoutDashboard size={18} />
                  Open Dashboard
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {/* =================================
                REJECTED
            ================================== */}

            {isRejected && (
              <>
                <div className="status-icon rejected">
                  <XCircle size={42} />
                </div>

                <span className="status-label">APPLICATION UPDATE</span>

                <h2>
                  Application
                  <span> Not Approved</span>
                </h2>

                <p>
                  Unfortunately, your volunteer application was not approved at
                  this time. You may review your details and contact the Hanumat
                  Seva team for more information.
                </p>

                <div className="status-badge rejected-badge">
                  <XCircle size={16} />
                  Application Rejected
                </div>

                {application?.adminRemarks && (
                  <div className="admin-remarks">
                    <strong>Admin Remarks:</strong>

                    <p>{application.adminRemarks}</p>
                  </div>
                )}

                <button
                  type="button"
                  className="outline-button status-action"
                  onClick={() => navigate("/volunteer/application")}
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

          {application && (
            <div className="application-details-card">
              {/* =================================
                  DETAILS HEADING
              ================================== */}

              <div className="details-heading">
                <div className="details-heading-icon">
                  <UserRound size={20} />
                </div>

                <div>
                  <span>APPLICATION DETAILS</span>

                  <h3>Submitted Information</h3>
                </div>
              </div>

              {/* =================================
                  DETAILS GRID
              ================================== */}

              <div className="details-grid">
                {/* APPLICATION ID */}

                <div className="detail-item">
                  <small>Application ID</small>

                  <strong>#{application.id || "-"}</strong>
                </div>

                {/* STATUS */}

                <div className="detail-item">
                  <small>Status</small>

                  <strong>{application.status || "-"}</strong>
                </div>

                {/* PREFERRED ACTIVITIES */}

                <div className="detail-item">
                  <small>Preferred Activities</small>

                  <strong>{formatActivities(application.preferredArea)}</strong>
                </div>

                {/* AVAILABILITY */}

                <div className="detail-item">
                  <small>Availability</small>

                  <strong>{application.availability || "-"}</strong>
                </div>

                {/* APPLICATION DATE */}

                <div className="detail-item">
                  <small>Application Date</small>

                  <strong>
                    {application.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : "-"}
                  </strong>
                </div>

                {/* LAST UPDATED */}

                <div className="detail-item">
                  <small>Last Updated</small>

                  <strong>
                    {application.updatedAt
                      ? new Date(application.updatedAt).toLocaleDateString()
                      : "-"}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* =====================================
              WHAT HAPPENS NEXT
          ====================================== */}

          <div className="status-next-card">
            <span className="section-label">WHAT HAPPENS NEXT?</span>

            <h2>Your Volunteer Journey</h2>

            <div className="journey-steps">
              {/* =================================
                  STEP 1
              ================================== */}

              <div className="journey-step active">
                <div className="journey-number">01</div>

                <div>
                  <h3>Application Submitted</h3>

                  <p>
                    Your volunteer application has been successfully received.
                  </p>
                </div>
              </div>

              <div className="journey-line"></div>

              {/* =================================
                  STEP 2
              ================================== */}

              <div
                className={`journey-step ${
                  isApproved || isRejected ? "active" : ""
                }`}
              >
                <div className="journey-number">02</div>

                <div>
                  <h3>Admin Review</h3>

                  <p>The Hanumat Seva team reviews your application.</p>
                </div>
              </div>

              <div className="journey-line"></div>

              {/* =================================
                  STEP 3
              ================================== */}

              <div className={`journey-step ${isApproved ? "active" : ""}`}>
                <div className="journey-number">03</div>

                <div>
                  <h3>Volunteer Access</h3>

                  <p>Once approved, you can access your volunteer dashboard.</p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================
              BOTTOM ACTIONS
          ====================================== */}

          <div className="status-bottom-actions">
            {/* =================================
                APPROVED → DASHBOARD
            ================================== */}

            {isApproved && (
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

            {/* =================================
                BACK TO VOLUNTEER
            ================================== */}

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
