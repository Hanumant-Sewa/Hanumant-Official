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
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/dashboard",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard");
        }

        setDashboard(data);
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(error.message);

        // Authentication failed
        if (
          error.message.includes("Authentication") ||
          error.message.includes("Invalid") ||
          error.message.includes("expired")
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="dashboard-page dashboard-loading">
        <LoaderCircle size={42} className="dashboard-spinner" />

        <p>Loading your dashboard...</p>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !dashboard) {
    return (
      <main className="dashboard-page dashboard-error">
        <div className="dashboard-error-card">
          <AlertCircle size={45} />

          <h2>Unable to load dashboard</h2>

          <p>{error || "Something went wrong."}</p>

          <button
            onClick={() => window.location.reload()}
            className="dashboard-primary-button"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const { user, stats } = dashboard;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <main className="dashboard-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="dashboard-hero">
        <div className="dashboard-container">
          <div className="dashboard-welcome">
            <div className="dashboard-avatar">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <span className="dashboard-label">Welcome back</span>

              <h1>{user.name}</h1>

              <p>Continue your journey of seva and compassion.</p>
            </div>
          </div>

          <div className="dashboard-status">
            <span className="status-dot"></span>

            {user.status}
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="dashboard-content">
        <div className="dashboard-container">
          {/* =================================================
              STATS
          ================================================= */}

          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <Heart size={24} />
              </div>

              <div>
                <span>Donations</span>
                <strong>{stats.donations}</strong>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>

              <div>
                <span>Volunteer Applications</span>
                <strong>{stats.volunteerApplications}</strong>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>

              <div>
                <span>Communities</span>
                <strong>{stats.communities}</strong>
              </div>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-icon">
                <CalendarDays size={24} />
              </div>

              <div>
                <span>Events</span>
                <strong>{stats.events}</strong>
              </div>
            </div>
          </div>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="dashboard-grid">
            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <div className="dashboard-card profile-summary">
              <div className="dashboard-card-header">
                <div>
                  <span className="card-eyebrow">Account</span>

                  <h2>Your Profile</h2>
                </div>

                <User size={24} />
              </div>

              <div className="profile-details">
                <div className="profile-detail">
                  <User size={19} />

                  <div>
                    <span>Name</span>
                    <strong>{user.name}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <Mail size={19} />

                  <div>
                    <span>Email</span>
                    <strong>{user.email}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <Phone size={19} />

                  <div>
                    <span>Phone</span>
                    <strong>{user.phone || "Not provided"}</strong>
                  </div>
                </div>

                <div className="profile-detail">
                  <HandHeart size={19} />

                  <div>
                    <span>Account Role</span>
                    <strong>{user.role}</strong>
                  </div>
                </div>
              </div>

              <p className="joined-date">Member since {joinedDate}</p>

              <Link to="/profile" className="dashboard-outline-button">
                View Profile
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <div>
                  <span className="card-eyebrow">Get involved</span>

                  <h2>Quick Actions</h2>
                </div>

                <HandHeart size={24} />
              </div>

              <div className="quick-actions">
                <Link to="/volunteer" className="quick-action">
                  <div className="quick-action-icon">
                    <Users size={21} />
                  </div>

                  <div>
                    <strong>Become a Volunteer</strong>

                    <span>Join our service initiatives</span>
                  </div>

                  <ArrowRight size={18} />
                </Link>

                <Link to="/donate" className="quick-action">
                  <div className="quick-action-icon">
                    <Heart size={21} />
                  </div>

                  <div>
                    <strong>Make a Donation</strong>

                    <span>Support our community</span>
                  </div>

                  <ArrowRight size={18} />
                </Link>

                <Link to="/community" className="quick-action">
                  <div className="quick-action-icon">
                    <Users size={21} />
                  </div>

                  <div>
                    <strong>Community</strong>

                    <span>Connect with other members</span>
                  </div>

                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* =================================================
              ACTIVITY
          ================================================= */}

          <div className="dashboard-card dashboard-activity">
            <div className="dashboard-card-header">
              <div>
                <span className="card-eyebrow">Your activity</span>

                <h2>Account Overview</h2>
              </div>

              <Bell size={24} />
            </div>

            <div className="activity-grid">
              <div className="activity-item">
                <ClipboardList size={23} />

                <div>
                  <strong>{stats.tasks}</strong>
                  <span>Assigned Tasks</span>
                </div>
              </div>

              <div className="activity-item">
                <Award size={23} />

                <div>
                  <strong>{stats.certificates}</strong>
                  <span>Certificates</span>
                </div>
              </div>

              <div className="activity-item">
                <Bell size={23} />

                <div>
                  <strong>{stats.notifications}</strong>
                  <span>Notifications</span>
                </div>
              </div>

              <div className="activity-item">
                <CalendarDays size={23} />

                <div>
                  <strong>{stats.events}</strong>
                  <span>Event Registrations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
