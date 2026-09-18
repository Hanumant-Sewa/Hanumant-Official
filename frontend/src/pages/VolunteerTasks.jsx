import React, { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  Circle,
  CalendarDays,
  MapPin,
} from "lucide-react";

import "../css/VolunteerTasks.css";

const VolunteerTasks = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // =====================================================
  // TASK STATE
  // =====================================================

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD TASKS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/volunteer-tasks`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load volunteer tasks."
          );
        }

        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Load tasks error:", error);

        setError(
          error.message || "Unable to load tasks. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // =====================================================
  // TASK COUNTS
  // =====================================================

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "TODO"
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  );

  // =====================================================
  // FILTER TASKS
  // =====================================================

  const filteredTasks = useMemo(() => {
    if (activeFilter === "ALL") {
      return tasks;
    }

    return tasks.filter(
      (task) => task.status === activeFilter
    );
  }, [tasks, activeFilter]);

  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = (status) => {
    switch (status) {
      case "TODO":
        return "Pending";

      case "IN_PROGRESS":
        return "In Progress";

      case "COMPLETED":
        return "Completed";

      case "CANCELLED":
        return "Cancelled";

      default:
        return status;
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "TODO":
        return "task-status-pending";

      case "IN_PROGRESS":
        return "task-status-progress";

      case "COMPLETED":
        return "task-status-completed";

      case "CANCELLED":
        return "task-status-cancelled";

      default:
        return "";
    }
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status) {
      case "TODO":
        return <Circle size={16} />;

      case "IN_PROGRESS":
        return <Clock3 size={16} />;

      case "COMPLETED":
        return <CheckCircle2 size={16} />;

      case "CANCELLED":
        return <Circle size={16} />;

      default:
        return <Circle size={16} />;
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =====================================================
  // GET LOCATION
  // =====================================================

  const getLocation = (task) => {
    if (task.event) {
      const locationParts = [
        task.event.location,
        task.event.city,
        task.event.state,
      ].filter(Boolean);

      if (locationParts.length > 0) {
        return locationParts.join(", ");
      }
    }

    return "Location not specified";
  };

  // =====================================================
  // GET EVENT NAME
  // =====================================================

  const getEventName = (task) => {
    if (task.event?.title) {
      return task.event.title;
    }

    return "General Volunteer Task";
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="volunteer-tasks-page">
        <div className="tasks-empty">
          <ClipboardList size={48} />

          <h3>Loading tasks...</h3>

          <p>
            Please wait while we load your volunteer tasks.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="volunteer-tasks-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="volunteer-tasks-header">

        <div>
          <div className="tasks-title-row">

            <div className="tasks-title-icon">
              <ClipboardList size={28} />
            </div>

            <div>
              <h1>My Tasks</h1>

              <p>
                View and manage your volunteer tasks
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="tasks-error">
          <p>{error}</p>
        </div>
      )}

      {/* =================================================
          TASK SUMMARY
      ================================================= */}

      <div className="task-summary-grid">

        {/* TOTAL */}

        <div className="task-summary-card">

          <div className="task-summary-icon total">
            <ClipboardList size={22} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

        </div>

        {/* PENDING */}

        <div className="task-summary-card">

          <div className="task-summary-icon pending">
            <Circle size={22} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks.length}</strong>
          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="task-summary-card">

          <div className="task-summary-icon progress">
            <Clock3 size={22} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks.length}</strong>
          </div>

        </div>

        {/* COMPLETED */}

        <div className="task-summary-card">

          <div className="task-summary-icon completed">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks.length}</strong>
          </div>

        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="task-filter-section">

        <button
          type="button"
          className={
            activeFilter === "ALL"
              ? "task-filter active"
              : "task-filter"
          }
          onClick={() => setActiveFilter("ALL")}
        >
          All Tasks
        </button>

        <button
          type="button"
          className={
            activeFilter === "TODO"
              ? "task-filter active"
              : "task-filter"
          }
          onClick={() => setActiveFilter("TODO")}
        >
          Pending
        </button>

        <button
          type="button"
          className={
            activeFilter === "IN_PROGRESS"
              ? "task-filter active"
              : "task-filter"
          }
          onClick={() =>
            setActiveFilter("IN_PROGRESS")
          }
        >
          In Progress
        </button>

        <button
          type="button"
          className={
            activeFilter === "COMPLETED"
              ? "task-filter active"
              : "task-filter"
          }
          onClick={() =>
            setActiveFilter("COMPLETED")
          }
        >
          Completed
        </button>

      </div>

      {/* =================================================
          TASK LIST
      ================================================= */}

      <div className="tasks-list">

        {filteredTasks.length === 0 ? (

          <div className="tasks-empty">

            <ClipboardList size={48} />

            <h3>No tasks found</h3>

            <p>
              There are no tasks in this category.
            </p>

          </div>

        ) : (

          filteredTasks.map((task) => (

            <div
              className="task-card"
              key={task.id}
            >

              {/* =================================================
                  TASK ICON
              ================================================= */}

              <div className="task-card-icon">
                <ClipboardList size={24} />
              </div>

              {/* =================================================
                  TASK CONTENT
              ================================================= */}

              <div className="task-card-content">

                <div className="task-card-top">

                  <h3>
                    {task.title}
                  </h3>

                  <span
                    className={`task-status ${getStatusClass(
                      task.status
                    )}`}
                  >
                    {getStatusIcon(task.status)}

                    {getStatusText(task.status)}
                  </span>

                </div>

                {/* DESCRIPTION */}

                <p className="task-description">
                  {task.description ||
                    "No description provided."}
                </p>

                {/* META */}

                <div className="task-meta">

                  {/* DUE DATE */}

                  <div className="task-meta-item">

                    <CalendarDays size={16} />

                    <span>
                      Due: {formatDate(task.dueDate)}
                    </span>

                  </div>

                  {/* LOCATION */}

                  <div className="task-meta-item">

                    <MapPin size={16} />

                    <span>
                      {getLocation(task)}
                    </span>

                  </div>

                  {/* EVENT */}

                  <div className="task-meta-item">

                    <ClipboardList size={16} />

                    <span>
                      {getEventName(task)}
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  TASK ACTION
              ================================================= */}

              <div className="task-card-action">

                {task.status === "TODO" && (

                  <button
                    type="button"
                    className="task-action-button start"
                  >
                    Start Task
                  </button>

                )}

                {task.status === "IN_PROGRESS" && (

                  <button
                    type="button"
                    className="task-action-button complete"
                  >
                    Mark Complete
                  </button>

                )}

                {task.status === "COMPLETED" && (

                  <div className="task-completed-label">

                    <CheckCircle2 size={18} />

                    Completed

                  </div>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default VolunteerTasks;