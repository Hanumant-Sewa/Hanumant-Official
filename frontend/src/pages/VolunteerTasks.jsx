import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Circle,
  CalendarDays,
  MapPin,
  ClipboardList,
  Trophy,
} from "lucide-react";

import "../Volunteer.css";

const VolunteerTasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Prepare Food Packages",
      description:
        "Help organize and pack food packages for community distribution.",
      event: "Community Food Distribution",
      date: "22 August 2026",
      location: "Solapur Community Center",
      status: "pending",
      image: "/images/volunteer-task-donation.jpeg",
    },
    {
      id: 2,
      title: "Organize Donation Materials",
      description:
        "Sort and organize the donated materials before distribution.",
      event: "Donation Collection Drive",
      date: "20 September 2026",
      location: "Central Collection Point",
      status: "progress",
      image: "/images/documentation.jpeg",
    },
    {
      id: 3,
      title: "Community Outreach Support",
      description:
        "Assist the outreach team during community interaction activities.",
      event: "Community Outreach",
      date: "27 September 2026",
      location: "Solapur Community Area",
      status: "completed",
      image: "/images/volunteer-event-food.jpeg",
    },
    {
      id: 4,
      title: "Food Distribution Assistance",
      description:
        "Assist the team at the food distribution counter.",
      event: "Food Rescue Drive",
      date: "28 August 2026",
      location: "Hanumat Seva Center",
      status: "pending",
      image: "/images/food-rescue.png",
    },
  ]);

  const updateTaskStatus = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "pending"
                  ? "progress"
                  : "completed",
            }
          : task
      )
    );
  };

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  const renderTaskCard = (task) => (
    <article
      className="volunteer-task-card"
      key={task.id}
    >
      <div className="task-card-image">

        <img
          src={task.image}
          alt={task.title}
        />

        <span
          className={`task-status-badge ${task.status}`}
        >
          {task.status === "pending" && "Pending"}

          {task.status === "progress" && "In Progress"}

          {task.status === "completed" && "Completed"}
        </span>

      </div>

      <div className="task-card-content">

        <span className="task-event-name">
          {task.event}
        </span>

        <h3>
          {task.title}
        </h3>

        <p>
          {task.description}
        </p>

        <div className="task-meta">

          <div>
            <CalendarDays size={14} />
            <span>{task.date}</span>
          </div>

          <div>
            <MapPin size={14} />
            <span>{task.location}</span>
          </div>

        </div>

        {task.status !== "completed" ? (
          <button
            type="button"
            className="task-action-button"
            onClick={() => updateTaskStatus(task.id)}
          >
            {task.status === "pending" ? (
              <>
                <Clock3 size={16} />
                Start Task
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                Mark Completed
              </>
            )}

            <ArrowRight size={15} />
          </button>
        ) : (
          <div className="task-completed-message">
            <CheckCircle2 size={16} />
            Task Completed
          </div>
        )}

      </div>
    </article>
  );

  return (
    <div className="volunteer-tasks-page">

      {/* =========================================
          HERO
      ========================================== */}

      <section className="tasks-page-hero">

        <div className="tasks-hero-content">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate("/volunteer/dashboard")
            }
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <span className="application-label">
            VOLUNTEER WORK
          </span>

          <h1>
            My
            <span> Tasks</span>
          </h1>

          <p>
            Keep track of your assigned work, ongoing
            activities and completed volunteer tasks.
          </p>

        </div>

      </section>


      {/* =========================================
          MAIN
      ========================================== */}

      <main className="tasks-page-main">

        {/* =====================================
            STATISTICS
        ====================================== */}

        <section className="tasks-stat-grid">

          <div className="task-stat-card">

            <div className="task-stat-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <span>
                TOTAL TASKS
              </span>

              <strong>
                {tasks.length}
              </strong>
            </div>

          </div>


          <div className="task-stat-card">

            <div className="task-stat-icon">
              <Circle size={22} />
            </div>

            <div>
              <span>
                PENDING
              </span>

              <strong>
                {pendingTasks.length}
              </strong>
            </div>

          </div>


          <div className="task-stat-card">

            <div className="task-stat-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>
                IN PROGRESS
              </span>

              <strong>
                {progressTasks.length}
              </strong>
            </div>

          </div>


          <div className="task-stat-card">

            <div className="task-stat-icon completed-icon">
              <Trophy size={22} />
            </div>

            <div>
              <span>
                COMPLETED
              </span>

              <strong>
                {completedTasks.length}
              </strong>
            </div>

          </div>

        </section>


        {/* =====================================
            PENDING TASKS
        ====================================== */}

        <section className="tasks-section">

          <div className="tasks-section-heading">

            <div>

              <span>
                TO DO
              </span>

              <h2>
                Pending Tasks
              </h2>

            </div>

            <div className="task-section-count">
              {pendingTasks.length}
            </div>

          </div>


          {pendingTasks.length > 0 ? (
            <div className="tasks-grid">
              {pendingTasks.map(renderTaskCard)}
            </div>
          ) : (
            <div className="empty-task-box">
              <CheckCircle2 size={28} />

              <h3>
                No pending tasks
              </h3>

              <p>
                Great job! You have completed all
                your pending tasks.
              </p>
            </div>
          )}

        </section>


        {/* =====================================
            IN PROGRESS
        ====================================== */}

        <section className="tasks-section">

          <div className="tasks-section-heading">

            <div>

              <span>
                CURRENTLY WORKING
              </span>

              <h2>
                In Progress
              </h2>

            </div>

            <div className="task-section-count">
              {progressTasks.length}
            </div>

          </div>


          {progressTasks.length > 0 ? (
            <div className="tasks-grid">
              {progressTasks.map(renderTaskCard)}
            </div>
          ) : (
            <div className="empty-task-box">

              <Clock3 size={28} />

              <h3>
                No tasks in progress
              </h3>

              <p>
                Start a pending task to see it here.
              </p>

            </div>
          )}

        </section>


        {/* =====================================
            COMPLETED
        ====================================== */}

        <section className="tasks-section">

          <div className="tasks-section-heading">

            <div>

              <span>
                YOUR ACHIEVEMENTS
              </span>

              <h2>
                Completed Tasks
              </h2>

            </div>

            <div className="task-section-count">
              {completedTasks.length}
            </div>

          </div>


          {completedTasks.length > 0 ? (
            <div className="tasks-grid">
              {completedTasks.map(renderTaskCard)}
            </div>
          ) : (
            <div className="empty-task-box">

              <Trophy size={28} />

              <h3>
                No completed tasks yet
              </h3>

              <p>
                Complete your first task and start
                building your volunteer impact.
              </p>

            </div>
          )}

        </section>


        {/* =====================================
            MOTIVATION
        ====================================== */}

        <section className="tasks-motivation">

          <div className="tasks-motivation-image">

            <img
              src="/images/volunteer-tasks.jpeg"
              alt="Volunteer helping community"
            />

          </div>

          <div className="tasks-motivation-content">

            <span>
              EVERY TASK MATTERS
            </span>

            <h2>
              Small actions,
              <strong> big impact.</strong>
            </h2>

            <p>
              Every completed task contributes to a
              stronger and more caring community.
            </p>

            <button
              type="button"
              className="orange-button"
              onClick={() =>
                navigate("/volunteer/events")
              }
            >
              Explore More Events
              <ArrowRight size={17} />
            </button>

          </div>

        </section>


        {/* =====================================
            BOTTOM
        ====================================== */}

        <div className="tasks-bottom-action">

          <button
            type="button"
            className="outline-button"
            onClick={() =>
              navigate("/volunteer/dashboard")
            }
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
};

export default VolunteerTasks;