import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Heart,
  Users,
  CalendarDays,
  Award,
  ClipboardList,
  Bell,
  ArrowRight,
  HandHeart,
  LoaderCircle,
  AlertCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Target,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [volunteerDashboard, setVolunteerDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/dashboard`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        const dashboardData = await response.json();

        if (!response.ok) {
          throw new Error(
            dashboardData.message || "Failed to load dashboard",
          );
        }

        setDashboard(dashboardData);

        // Volunteer Dashboard
        try {
          const volunteerResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/volunteer-dashboard`,
            {
              method: "GET",
              credentials: "include",
            },
          );

          if (volunteerResponse.ok) {
            const volunteerData = await volunteerResponse.json();
            setVolunteerDashboard(volunteerData);
          }
        } catch (volunteerError) {
          console.log(
            "Volunteer dashboard unavailable:",
            volunteerError,
          );
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <LoaderCircle className="loading-spinner" size={40} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <AlertCircle size={40} />

        <h2>Unable to load dashboard</h2>

        <p>{error}</p>

        <button
          className="dashboard-outline-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { user, stats = {} } = dashboard;

  const volunteerProfile =
    volunteerDashboard?.volunteerProfile || {};

  const application =
    volunteerDashboard?.application || {};

  const volunteerStats =
    volunteerDashboard?.statistics || {};

  const upcomingEvents =
    volunteerDashboard?.upcomingEvents || [];

  const tasks =
    volunteerDashboard?.tasks || [];

  return (
    <div className="dashboard-page">

      {/* ================= HERO SECTION ================= */}

      <section className="dashboard-hero">
        <div className="dashboard-container">

          <div className="dashboard-welcome">

            {/* User Avatar */}
            <div className="dashboard-avatar">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Welcome Content */}
            <div className="dashboard-welcome-content">

              <span className="dashboard-label">
                Welcome back
              </span>

              <h1>{user?.name}</h1>

              <p>
                Continue your journey of seva and compassion.
              </p>

            </div>

          </div>

          <div className="dashboard-status">
            <span className="status-dot"></span>
            {user?.status}
          </div>

        </div>
      </section>

      {/* ================= MAIN CONTAINER ================= */}

      <main className="dashboard-container">

        {/* ================= STATS ================= */}

        <section className="dashboard-stats">

          {/* Donations */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Heart size={22} />
            </div>

            <div>
              <span className="stat-label">
                Donations
              </span>

              <strong>
                {stats.donations || 0}
              </strong>
            </div>

          </div>

          {/* Volunteer Applications */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <HandHeart size={22} />
            </div>

            <div>
              <span className="stat-label">
                Volunteer Applications
              </span>

              <strong>
                {stats.volunteerApplications || 0}
              </strong>
            </div>

          </div>

          {/* Communities */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Users size={22} />
            </div>

            <div>
              <span className="stat-label">
                Communities
              </span>

              <strong>
                {stats.communities || 0}
              </strong>
            </div>

          </div>

          {/* Events */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span className="stat-label">
                Events
              </span>

              <strong>
                {stats.events || 0}
              </strong>
            </div>

          </div>

          {/* Volunteer Tasks */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <span className="stat-label">
                Tasks
              </span>

              <strong>
                {volunteerStats.tasksCompleted ||
                  volunteerStats.tasks ||
                  0}
              </strong>
            </div>

          </div>

          {/* Volunteer Hours */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Clock size={22} />
            </div>

            <div>
              <span className="stat-label">
                Hours
              </span>

              <strong>
                {volunteerProfile.totalHours || 0}
              </strong>
            </div>

          </div>

          {/* Volunteer Impact */}
          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <Target size={22} />
            </div>

            <div>
              <span className="stat-label">
                Impact
              </span>

              <strong>
                {volunteerStats.impact || 0}
              </strong>
            </div>

          </div>

        </section>

        {/* ================= MAIN GRID ================= */}

        <div className="dashboard-main-grid">

          {/* ================= PROFILE CARD ================= */}

          <section className="dashboard-card profile-card">

            <div className="dashboard-card-header">

              <div>

                <span className="card-eyebrow">
                  My Profile
                </span>

                <h2>
                  Personal Information
                </h2>

              </div>

              <User size={22} />

            </div>

            <div className="profile-details">

              <div className="profile-detail-item">

                <div className="profile-detail-icon">
                  <User size={18} />
                </div>

                <div>
                  <span>Name</span>

                  <strong>
                    {user?.name || "-"}
                  </strong>
                </div>

              </div>

              <div className="profile-detail-item">

                <div className="profile-detail-icon">
                  <Mail size={18} />
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {user?.email || "-"}
                  </strong>
                </div>

              </div>

              <div className="profile-detail-item">

                <div className="profile-detail-icon">
                  <Phone size={18} />
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {user?.phone || "-"}
                  </strong>
                </div>

              </div>

              <div className="profile-detail-item">

                <div className="profile-detail-icon">
                  <Award size={18} />
                </div>

                <div>
                  <span>Role</span>

                  <strong>
                    {user?.role || "-"}
                  </strong>
                </div>

              </div>

            </div>

            {/* FIXED PROFILE ROUTE */}
            <Link
              to="/volunteer/profile"
              className="dashboard-outline-button"
            >
              View Profile

              <ArrowRight size={17} />
            </Link>

          </section>

          {/* ================= QUICK ACTIONS ================= */}

          <section className="dashboard-card">

            <div className="dashboard-card-header">

              <div>

                <span className="card-eyebrow">
                  Quick Access
                </span>

                <h2>
                  What would you like to do?
                </h2>

              </div>

              <ArrowRight size={22} />

            </div>

            <div className="quick-actions">

              {/* Volunteer */}
              <Link
                to="/volunteer"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  <HandHeart size={21} />
                </div>

                <div>
                  <strong>
                    Become a Volunteer
                  </strong>

                  <span>
                    Join our seva activities
                  </span>
                </div>

                <ArrowRight size={17} />

              </Link>

              {/* Donate */}
              <Link
                to="/donate"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  <Heart size={21} />
                </div>

                <div>
                  <strong>
                    Make a Donation
                  </strong>

                  <span>
                    Support our mission
                  </span>
                </div>

                <ArrowRight size={17} />

              </Link>

              {/* Community */}
              <Link
                to="/community"
                className="quick-action"
              >

                <div className="quick-action-icon">
                  <Users size={21} />
                </div>

                <div>
                  <strong>
                    Join Community
                  </strong>

                  <span>
                    Connect with others
                  </span>
                </div>

                <ArrowRight size={17} />

              </Link>

            </div>

          </section>

        </div>

        {/* ================= VOLUNTEER APPLICATION ================= */}

        {application?.status && (
          <section className="dashboard-card dashboard-full-card">

            <div className="dashboard-card-header">

              <div>

                <span className="card-eyebrow">
                  Volunteer Journey
                </span>

                <h2>
                  Application Status
                </h2>

              </div>

              {application.status === "APPROVED" ? (
                <CheckCircle2 size={24} />
              ) : (
                <Clock size={24} />
              )}

            </div>

            <div className="volunteer-application-status">

              <div className="application-status-content">

                <span>
                  Current Status
                </span>

                <strong>
                  {application.status}
                </strong>

                {application.preferredArea && (
                  <p>
                    Preferred Activities:{" "}
                    {application.preferredArea}
                  </p>
                )}

              </div>

              <Link
                to="/volunteer/application-status"
                className="dashboard-outline-button"
              >
                View Application

                <ArrowRight size={17} />
              </Link>

            </div>

          </section>
        )}

        {/* ================= UPCOMING EVENTS ================= */}

        <section className="dashboard-card dashboard-full-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                Volunteer Activities
              </span>

              <h2>
                Upcoming Events
              </h2>

            </div>

            <CalendarDays size={22} />

          </div>

          {upcomingEvents.length > 0 ? (

            <div className="dashboard-events">

              {upcomingEvents.map((event) => (

                <div
                  className="dashboard-event"
                  key={event.id}
                >

                  <div className="dashboard-event-icon">
                    <CalendarDays size={20} />
                  </div>

                  <div className="dashboard-event-content">

                    <h3>
                      {event.title}
                    </h3>

                    {event.description && (
                      <p>
                        {event.description}
                      </p>
                    )}

                    <div className="dashboard-event-meta">

                      {event.location && (
                        <span>
                          <MapPin size={15} />
                          {event.location}
                        </span>
                      )}

                      <span>

                        <CalendarDays size={15} />

                        {event.startDate
                          ? new Date(
                              event.startDate,
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "-"}

                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="dashboard-empty-state">

              <CalendarDays size={35} />

              <h3>
                No upcoming events
              </h3>

              <p>
                New volunteer opportunities will appear here.
              </p>

              {/* FIXED: /volunteer/events route was removed */}
              <Link
                to="/volunteer"
                className="dashboard-outline-button"
              >
                Explore Events

                <ArrowRight size={17} />
              </Link>

            </div>

          )}

        </section>

        {/* ================= CURRENT TASKS ================= */}

        <section className="dashboard-card dashboard-full-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                My Work
              </span>

              <h2>
                Current Tasks
              </h2>

            </div>

            <ClipboardList size={22} />

          </div>

          {tasks.length > 0 ? (

            <div className="dashboard-task-list">

              {tasks.map((task) => (

                <div
                  className="dashboard-task"
                  key={task.id}
                >

                  <div className="dashboard-task-icon">
                    <ClipboardList size={20} />
                  </div>

                  <div className="dashboard-task-content">

                    <h3>
                      {task.title}
                    </h3>

                    {task.description && (
                      <p>
                        {task.description}
                      </p>
                    )}

                    <span
                      className={`task-status task-${String(
                        task.status || "",
                      ).toLowerCase()}`}
                    >
                      {task.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="dashboard-empty-state">

              <ClipboardList size={35} />

              <h3>
                No current tasks
              </h3>

              <p>
                Your assigned volunteer tasks will appear here.
              </p>

            </div>

          )}

        </section>

        {/* ================= YOUR IMPACT ================= */}

        <section className="dashboard-card dashboard-full-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                Your Contribution
              </span>

              <h2>
                Your Impact
              </h2>

            </div>

            <Target size={22} />

          </div>

          <div className="activity-grid">

            <div className="activity-item">

              <div className="activity-icon">
                <Clock size={20} />
              </div>

              <div>

                <span>
                  Volunteer Hours
                </span>

                <strong>
                  {volunteerProfile.totalHours || 0}
                </strong>

              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                <CalendarDays size={20} />
              </div>

              <div>

                <span>
                  Events Participated
                </span>

                <strong>
                  {volunteerProfile.totalEvents || 0}
                </strong>

              </div>

            </div>

            {/* CERTIFICATE COUNT */}
            <div className="activity-item">

              <div className="activity-icon">
                <Award size={20} />
              </div>

              <div>

                <span>
                  Certificates
                </span>

                <strong>
                  {stats.certificates || 0}
                </strong>

              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                <Heart size={20} />
              </div>

              <div>

                <span>
                  Impact
                </span>

                <strong>
                  {volunteerStats.impact || 0}
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* ================= EXPLORE ================= */}

        <section className="dashboard-card dashboard-full-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                Discover
              </span>

              <h2>
                Explore Hanumant Seva
              </h2>

            </div>

            <Heart size={22} />

          </div>

          <div className="quick-actions">

            {/* MY CERTIFICATES */}
            <Link
              to="/volunteer/certificates"
              className="quick-action"
            >

              <div className="quick-action-icon">
                <Award size={21} />
              </div>

              <div>

                <strong>
                  My Certificates
                </strong>

                <span>
                  View your achievements
                </span>

              </div>

              <ArrowRight size={17} />

            </Link>

            {/* MY TASKS */}
            <Link
              to="/volunteer/tasks"
              className="quick-action"
            >

              <div className="quick-action-icon">
                <ClipboardList size={21} />
              </div>

              <div>

                <strong>
                  My Tasks
                </strong>

                <span>
                  Manage your volunteer work
                </span>

              </div>

              <ArrowRight size={17} />

            </Link>

          </div>

        </section>

        {/* ================= ACCOUNT OVERVIEW ================= */}

        <section className="dashboard-card dashboard-full-card">

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                Overview
              </span>

              <h2>
                Account Overview
              </h2>

            </div>

            <User size={22} />

          </div>

          <div className="activity-grid">

            <div className="activity-item">

              <div className="activity-icon">
                <ClipboardList size={20} />
              </div>

              <div>

                <span>
                  Tasks
                </span>

                <strong>
                  {stats.tasks || 0}
                </strong>

              </div>

            </div>

            {/* CERTIFICATE COUNT */}
            <div className="activity-item">

              <div className="activity-icon">
                <Award size={20} />
              </div>

              <div>

                <span>
                  Certificates
                </span>

                <strong>
                  {stats.certificates || 0}
                </strong>

              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                <Bell size={20} />
              </div>

              <div>

                <span>
                  Notifications
                </span>

                <strong>
                  {stats.notifications || 0}
                </strong>

              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">
                <CalendarDays size={20} />
              </div>

              <div>

                <span>
                  Events
                </span>

                <strong>
                  {stats.events || 0}
                </strong>

              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;