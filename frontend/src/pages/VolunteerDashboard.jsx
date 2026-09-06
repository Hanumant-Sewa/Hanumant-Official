import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  CalendarDays,
  CheckCircle,
  Clock3,
  Heart,
  ArrowRight,
  ClipboardCheck,
  Award,
  TrendingUp,
  MapPin,
  ChevronRight,
} from "lucide-react";

import "../css/Volunteer.css";

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // FETCH DASHBOARD DATA
  // =========================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/volunteer-dashboard`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log("Volunteer Dashboard Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load volunteer dashboard");
      }

      setDashboardData(data);
    } catch (error) {
      console.error("Volunteer Dashboard Error:", error);

      setError(error.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD DASHBOARD
  // =========================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="volunteer-dashboard-page">
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2>Loading Dashboard...</h2>

          <p>Please wait while we load your volunteer information.</p>
        </div>
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="volunteer-dashboard-page">
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2>Unable to Load Dashboard</h2>

          <p>{error}</p>

          <button type="button" onClick={fetchDashboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================
  // DATA
  // =========================================

  const user = dashboardData?.user || {};

  const volunteerProfile = dashboardData?.volunteerProfile || {};

  const application = dashboardData?.application || {};

  const statistics = dashboardData?.statistics || {};

  const upcomingEvents = dashboardData?.upcomingEvents || [];

  const tasks = dashboardData?.tasks || [];

  // =========================================
  // VOLUNTEER NAME
  // =========================================

  const volunteerName = user.name || "Volunteer";

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================
  // FORMAT DATE PARTS
  // =========================================

  const getMonth = (date) => {
    if (!date) return "";

    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase();
  };

  const getDay = (date) => {
    if (!date) return "";

    return new Date(date).getDate();
  };

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================
  // TASK STATUS
  // =========================================

  const isTaskCompleted = (status) => {
    return status?.toUpperCase() === "COMPLETED";
  };

  return (
    <div className="volunteer-dashboard-page">
      {/* =========================================
          DASHBOARD HEADER
      ========================================== */}

      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-welcome">
            <span className="dashboard-label">VOLUNTEER DASHBOARD</span>

            <h1>
              Welcome,
              <span> {volunteerName}</span>
            </h1>

            <p>
              Thank you for being part of Hanumant Seva. Together, we can create
              a meaningful impact.
            </p>
          </div>

          <div className="dashboard-profile-button">
            <button
              type="button"
              onClick={() => navigate("/volunteer/profile")}
            >
              <UserRound size={18} />
              My Profile
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          DASHBOARD MAIN
      ========================================== */}

      <main className="dashboard-main">
        {/* =====================================
            QUICK STATS
        ====================================== */}

        <section className="dashboard-stats">
          {/* EVENTS */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>EVENTS</span>

              <h3>{statistics.totalEvents || 0}</h3>

              <p>Events joined</p>
            </div>
          </div>

          {/* TASKS */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CheckCircle size={22} />
            </div>

            <div>
              <span>TASKS</span>

              <h3>{statistics.completedTasks || 0}</h3>

              <p>Tasks completed</p>
            </div>
          </div>

          {/* HOURS */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>HOURS</span>

              <h3>{statistics.totalHours || 0}</h3>

              <p>Hours contributed</p>
            </div>
          </div>

          {/* IMPACT */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Heart size={22} />
            </div>

            <div>
              <span>IMPACT</span>

              <h3>{statistics.peopleSupported || 0}</h3>

              <p>People supported</p>
            </div>
          </div>
        </section>

        {/* =====================================
            MAIN DASHBOARD GRID
        ====================================== */}

        <section className="dashboard-grid">
          {/* ===================================
              LEFT COLUMN
          ==================================== */}

          <div className="dashboard-left">
            {/* =================================
                UPCOMING EVENTS
            ================================== */}

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <span className="card-small-label">YOUR SCHEDULE</span>

                  <h2>Upcoming Events</h2>
                </div>

                <button
                  type="button"
                  className="view-all-button"
                  onClick={() => navigate("/volunteer/events")}
                >
                  View All
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* =================================
                  NO EVENTS
              ================================== */}

              {upcomingEvents.length === 0 ? (
                <div
                  style={{
                    padding: "30px 10px",
                    textAlign: "center",
                  }}
                >
                  <CalendarDays size={35} />

                  <p>No upcoming events.</p>

                  <button
                    type="button"
                    onClick={() => navigate("/volunteer/events")}
                  >
                    Explore Events
                  </button>
                </div>
              ) : (
                /* =================================
                   EVENTS FROM DATABASE
                ================================= */

                upcomingEvents.slice(0, 3).map((registration) => {
                  const event = registration.event;

                  return (
                    <div className="dashboard-event" key={event.id}>
                      <div className="event-date">
                        <span>{getMonth(event.startDate)}</span>

                        <strong>{getDay(event.startDate)}</strong>
                      </div>

                      <div className="event-information">
                        <h3>{event.title}</h3>

                        <p>
                          <MapPin size={14} />

                          {event.location ||
                            event.city ||
                            "Location not specified"}
                        </p>

                        <p>
                          <Clock3 size={14} />

                          {formatTime(event.startDate)}

                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="event-arrow"
                        onClick={() =>
                          navigate(`/volunteer/events/${event.id}`)
                        }
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* =================================
                CURRENT TASKS
            ================================== */}

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <span className="card-small-label">YOUR WORK</span>

                  <h2>Current Tasks</h2>
                </div>

                <button
                  type="button"
                  className="view-all-button"
                  onClick={() => navigate("/volunteer/tasks")}
                >
                  View Tasks
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* =================================
                  NO TASKS
              ================================== */}

              {tasks.length === 0 ? (
                <div
                  style={{
                    padding: "30px 10px",
                    textAlign: "center",
                  }}
                >
                  <ClipboardCheck size={35} />

                  <p>No tasks assigned yet.</p>
                </div>
              ) : (
                /* =================================
                   TASKS FROM DATABASE
                ================================= */

                tasks.slice(0, 3).map((task) => {
                  const completed = isTaskCompleted(task.status);

                  return (
                    <div className="task-item" key={task.id}>
                      <div
                        className={`task-icon ${completed ? "completed" : ""}`}
                      >
                        {completed ? (
                          <CheckCircle size={19} />
                        ) : (
                          <ClipboardCheck size={19} />
                        )}
                      </div>

                      <div className="task-information">
                        <h3>{task.title}</h3>

                        <p>
                          {completed
                            ? `Completed: ${formatDate(task.completedAt)}`
                            : task.dueDate
                              ? `Due: ${formatDate(task.dueDate)}`
                              : "No due date"}
                        </p>
                      </div>

                      <span
                        className={`task-status ${
                          completed ? "completed-status" : ""
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ===================================
              RIGHT COLUMN
          ==================================== */}

          <div className="dashboard-right">
            {/* =================================
                PROFILE CARD
            ================================== */}

            <div className="dashboard-profile-card">
              <div className="profile-card-top">
                <div className="profile-avatar">
                  <UserRound size={32} />
                </div>

                <div>
                  <span>VOLUNTEER</span>

                  <h3>{volunteerName}</h3>

                  <p>
                    {volunteerProfile.isVerified
                      ? "Verified Volunteer"
                      : "Active Volunteer"}
                  </p>
                </div>
              </div>

              <div className="profile-card-info">
                <div>
                  <small>Email</small>

                  <strong>{user.email || "Not available"}</strong>
                </div>

                <div>
                  <small>City</small>

                  <strong>{volunteerProfile.city || "Not specified"}</strong>
                </div>
              </div>

              <button
                type="button"
                className="outline-button profile-button"
                onClick={() => navigate("/volunteer/profile")}
              >
                View Profile
                <ArrowRight size={17} />
              </button>
            </div>

            {/* =================================
                IMPACT CARD
            ================================== */}

            <div className="dashboard-impact-card">
              <div className="impact-icon">
                <TrendingUp size={25} />
              </div>

              <span>YOUR IMPACT</span>

              <h2>{statistics.peopleSupported || 0}</h2>

              <p>people supported through your volunteer activities</p>

              <button
                type="button"
                onClick={() => navigate("/volunteer/impact")}
              >
                View My Impact
                <ArrowRight size={16} />
              </button>
            </div>

            {/* =================================
                CERTIFICATE CARD
            ================================== */}

            <div className="dashboard-certificate-card">
              <div className="certificate-icon">
                <Award size={25} />
              </div>

              <div>
                <span>CERTIFICATES</span>

                <h3>{statistics.certificates || 0} Certificates</h3>

                <p>Keep serving and unlock more achievements.</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/volunteer/certificates")}
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* =================================
                QUICK ACTIONS
            ================================== */}

            <div className="dashboard-quick-card">
              <span className="card-small-label">QUICK ACCESS</span>

              <h2>Explore</h2>

              <button
                type="button"
                onClick={() => navigate("/volunteer/events")}
              >
                <CalendarDays size={18} />
                Events
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/volunteer/tasks")}
              >
                <ClipboardCheck size={18} />
                My Tasks
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/volunteer/impact")}
              >
                <TrendingUp size={18} />
                My Impact
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/volunteer/certificates")}
              >
                <Award size={18} />
                Certificates
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================
            MOTIVATIONAL BANNER
        ====================================== */}

        <section className="dashboard-motivation">
          <div className="motivation-image">
            <img
              src="/images/volunteer-dashboard.png"
              alt="Volunteers working together"
            />
          </div>

          <div className="motivation-content">
            <span>EVERY ACTION MATTERS</span>

            <h2>
              Your time can
              <strong> change a life.</strong>
            </h2>

            <p>
              Every hour you contribute, every task you complete and every
              person you help brings us one step closer to a stronger community.
            </p>

            <button
              type="button"
              className="orange-button"
              onClick={() => navigate("/volunteer/events")}
            >
              Explore Events
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
