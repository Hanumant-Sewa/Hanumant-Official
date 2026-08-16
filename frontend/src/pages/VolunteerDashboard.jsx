import React from "react";
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
  Bell,
  ChevronRight,
} from "lucide-react";

import "../Volunteer.css";

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  const applicationData = JSON.parse(
    localStorage.getItem("volunteerApplication") || "{}",
  );

  const volunteerName = applicationData.fullName || "Volunteer";

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
          {/* Events */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>EVENTS</span>

              <h3>12</h3>

              <p>Events joined</p>
            </div>
          </div>

          {/* Tasks */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CheckCircle size={22} />
            </div>

            <div>
              <span>TASKS</span>

              <h3>28</h3>

              <p>Tasks completed</p>
            </div>
          </div>

          {/* Hours */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>HOURS</span>

              <h3>46</h3>

              <p>Hours contributed</p>
            </div>
          </div>

          {/* Impact */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Heart size={22} />
            </div>

            <div>
              <span>IMPACT</span>

              <h3>125</h3>

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

              {/* Event 1 */}

              <div className="dashboard-event">
                <div className="event-date">
                  <span>AUG</span>

                  <strong>22</strong>
                </div>

                <div className="event-information">
                  <h3>Community Food Distribution</h3>

                  <p>
                    <MapPin size={14} />
                    Solapur Community Center
                  </p>

                  <p>
                    <Clock3 size={14} />
                    09:00 AM - 01:00 PM
                  </p>
                </div>

                <button
                  type="button"
                  className="event-arrow"
                  onClick={() => navigate("/volunteer/events/1")}
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Event 2 */}

              <div className="dashboard-event">
                <div className="event-date">
                  <span>AUG</span>

                  <strong>28</strong>
                </div>

                <div className="event-information">
                  <h3>Food Rescue Drive</h3>

                  <p>
                    <MapPin size={14} />
                    Hanumat Seva Center
                  </p>

                  <p>
                    <Clock3 size={14} />
                    10:00 AM - 02:00 PM
                  </p>
                </div>

                <button
                  type="button"
                  className="event-arrow"
                  onClick={() => navigate("/volunteer/events/2")}
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Event 3 */}

              <div className="dashboard-event">
                <div className="event-date">
                  <span>SEP</span>

                  <strong>05</strong>
                </div>

                <div className="event-information">
                  <h3>Community Awareness Program</h3>

                  <p>
                    <MapPin size={14} />
                    City Hall
                  </p>

                  <p>
                    <Clock3 size={14} />
                    11:00 AM - 03:00 PM
                  </p>
                </div>

                <button
                  type="button"
                  className="event-arrow"
                  onClick={() => navigate("/volunteer/events/3")}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
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

              {/* Task 1 */}

              <div className="task-item">
                <div className="task-icon">
                  <ClipboardCheck size={19} />
                </div>

                <div className="task-information">
                  <h3>Prepare Food Distribution List</h3>

                  <p>Due: August 20, 2026</p>
                </div>

                <span className="task-status">Pending</span>
              </div>

              {/* Task 2 */}

              <div className="task-item">
                <div className="task-icon completed">
                  <CheckCircle size={19} />
                </div>

                <div className="task-information">
                  <h3>Volunteer Orientation</h3>

                  <p>Completed: August 12, 2026</p>
                </div>

                <span className="task-status completed-status">Completed</span>
              </div>

              {/* Task 3 */}

              <div className="task-item">
                <div className="task-icon">
                  <ClipboardCheck size={19} />
                </div>

                <div className="task-information">
                  <h3>Community Visit Report</h3>

                  <p>Due: August 25, 2026</p>
                </div>

                <span className="task-status">Pending</span>
              </div>
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

                  <p>Active Volunteer</p>
                </div>
              </div>

              <div className="profile-card-info">
                <div>
                  <small>Email</small>

                  <strong>
                    {applicationData.email || "volunteer@example.com"}
                  </strong>
                </div>

                <div>
                  <small>City</small>

                  <strong>{applicationData.city || "Solapur"}</strong>
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

              <h2>125</h2>

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

                <h3>2 Certificates</h3>

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
