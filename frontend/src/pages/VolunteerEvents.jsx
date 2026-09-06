import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ArrowLeft,
  ArrowRight,
  Heart,
  Search,
} from "lucide-react";

import "../css/Volunteer.css";

const VolunteerEvents = () => {
  const navigate = useNavigate();

  // =========================================
  // STATES
  // =========================================

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Events");

  // =========================================
  // FETCH EVENTS FROM BACKEND
  // =========================================

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/volunteer-events",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Volunteer Events Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load volunteer events"
        );
      }

      setEvents(data.events || []);
      setFilteredEvents(data.events || []);
    } catch (error) {
      console.error("Volunteer Events Error:", error);

      setError(
        error.message || "Unable to load volunteer events"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOAD EVENTS
  // =========================================

  useEffect(() => {
    fetchEvents();
  }, []);

  // =========================================
  // SEARCH + FILTER
  // =========================================

  useEffect(() => {
    let result = [...events];

    // Search
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((event) => {
        return (
          event.title?.toLowerCase().includes(search) ||
          event.description?.toLowerCase().includes(search) ||
          event.location?.toLowerCase().includes(search) ||
          event.city?.toLowerCase().includes(search) ||
          event.state?.toLowerCase().includes(search) ||
          event.category?.toLowerCase().includes(search)
        );
      });
    }

    // Category filter
    if (activeFilter !== "All Events") {
      result = result.filter(
        (event) =>
          event.category?.toLowerCase() ===
          activeFilter.toLowerCase()
      );
    }

    setFilteredEvents(result);
  }, [searchTerm, activeFilter, events]);

  // =========================================
  // GET MONTH
  // =========================================

  const getMonth = (date) => {
    if (!date) return "";

    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase();
  };

  // =========================================
  // GET DAY
  // =========================================

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
  // EVENT TIME
  // =========================================

  const formatEventTime = (event) => {
    if (!event.startDate) {
      return "Time not specified";
    }

    const startTime = formatTime(event.startDate);

    if (event.endDate) {
      return `${startTime} - ${formatTime(event.endDate)}`;
    }

    return startTime;
  };

  // =========================================
  // EVENT LOCATION
  // =========================================

  const getLocation = (event) => {
    if (event.location) {
      return event.location;
    }

    if (event.city && event.state) {
      return `${event.city}, ${event.state}`;
    }

    if (event.city) {
      return event.city;
    }

    return "Location not specified";
  };

  // =========================================
  // VOLUNTEER CAPACITY
  // =========================================

  const getVolunteerText = (event) => {
    if (!event.capacity) {
      return "Open volunteering";
    }

    return `${event.capacity} Volunteers`;
  };

  // =========================================
  // EVENT CATEGORY
  // =========================================

  const getCategory = (event) => {
    return event.category || "Community";
  };

  // =========================================
  // LOADING SCREEN
  // =========================================

  if (loading) {
    return (
      <div className="volunteer-events-page">

        {/* HERO */}

        <section className="events-page-hero">
          <div className="events-hero-content">

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
              VOLUNTEER ACTIVITIES
            </span>

            <h1>
              Upcoming
              <span> Events</span>
            </h1>

            <p>
              Find meaningful opportunities to volunteer,
              serve the community and make an impact.
            </p>

          </div>
        </section>

        {/* LOADING */}

        <main className="events-page-main">

          <div
            style={{
              minHeight: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <CalendarDays size={40} />

            <h2>
              Loading Events...
            </h2>

            <p>
              Please wait while we load available
              volunteer events.
            </p>

          </div>

        </main>

      </div>
    );
  }

  // =========================================
  // ERROR SCREEN
  // =========================================

  if (error) {
    return (
      <div className="volunteer-events-page">

        {/* HERO */}

        <section className="events-page-hero">
          <div className="events-hero-content">

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
              VOLUNTEER ACTIVITIES
            </span>

            <h1>
              Upcoming
              <span> Events</span>
            </h1>

            <p>
              Find meaningful opportunities to volunteer,
              serve the community and make an impact.
            </p>

          </div>
        </section>

        {/* ERROR */}

        <main className="events-page-main">

          <div
            style={{
              minHeight: "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h2>
              Unable to Load Events
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={fetchEvents}
            >
              Try Again
            </button>

          </div>

        </main>

      </div>
    );
  }

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <div className="volunteer-events-page">

      {/* =========================================
          HERO
      ========================================== */}

      <section className="events-page-hero">

        <div className="events-hero-content">

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
            VOLUNTEER ACTIVITIES
          </span>

          <h1>
            Upcoming
            <span> Events</span>
          </h1>

          <p>
            Find meaningful opportunities to volunteer,
            serve the community and make an impact.
          </p>

        </div>

      </section>

      {/* =========================================
          EVENTS MAIN
      ========================================== */}

      <main className="events-page-main">

        {/* =====================================
            TOP BAR
        ====================================== */}

        <div className="events-top-bar">

          <div>

            <span className="card-small-label">
              FIND YOUR OPPORTUNITY
            </span>

            <h2>
              Available Events
            </h2>

          </div>

          <div className="events-count">

            <CalendarDays size={17} />

            {filteredEvents.length} Events Available

          </div>

        </div>

        {/* =====================================
            SEARCH / FILTER
        ====================================== */}

        <div className="events-filter-bar">

          {/* SEARCH */}

          <div className="events-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          {/* ALL EVENTS */}

          <button
            type="button"
            className={`event-filter ${
              activeFilter === "All Events"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("All Events")
            }
          >
            All Events
          </button>

          {/* FOOD SUPPORT */}

          <button
            type="button"
            className={`event-filter ${
              activeFilter === "Food Support"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Food Support")
            }
          >
            Food Support
          </button>

          {/* AWARENESS */}

          <button
            type="button"
            className={`event-filter ${
              activeFilter === "Awareness"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveFilter("Awareness")
            }
          >
            Awareness
          </button>

        </div>

        {/* =====================================
            NO EVENTS
        ====================================== */}

        {filteredEvents.length === 0 ? (

          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >

            <CalendarDays size={40} />

            <h2>
              No Events Found
            </h2>

            <p>
              Try another search or category.
            </p>

          </div>

        ) : (

          /* =====================================
             EVENT CARDS
          ====================================== */

          <div className="events-grid">

            {filteredEvents.map((event) => (

              <article
                className="volunteer-event-card"
                key={event.id}
              >

                {/* =================================
                    EVENT IMAGE
                ================================== */}

                <div className="event-card-image">

                  <img
                    src={
                      event.image ||
                      "/images/volunteer-event-food.jpeg"
                    }
                    alt={event.title}
                  />

                  {/* CATEGORY */}

                  <span className="event-category">
                    {getCategory(event)}
                  </span>

                  {/* DATE */}

                  <div className="event-card-date">

                    <span>
                      {getMonth(event.startDate)}
                    </span>

                    <strong>
                      {getDay(event.startDate)}
                    </strong>

                  </div>

                </div>

                {/* =================================
                    EVENT CONTENT
                ================================== */}

                <div className="event-card-content">

                  <h3>
                    {event.title}
                  </h3>

                  <p className="event-description">

                    {event.description ||
                      "Join us and make a meaningful contribution to the community."}

                  </p>

                  {/* EVENT META */}

                  <div className="event-meta">

                    {/* LOCATION */}

                    <div>

                      <MapPin size={15} />

                      <span>
                        {getLocation(event)}
                      </span>

                    </div>

                    {/* TIME */}

                    <div>

                      <Clock3 size={15} />

                      <span>
                        {formatEventTime(event)}
                      </span>

                    </div>

                    {/* CAPACITY */}

                    <div>

                      <Users size={15} />

                      <span>
                        {getVolunteerText(event)}
                      </span>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div className="event-card-footer">

                    {/* VIEW DETAILS */}

                    <button
                      type="button"
                      className="event-details-button"
                      onClick={() =>
                        navigate(
                          `/volunteer/events/${event.id}`
                        )
                      }
                    >
                      View Details

                      <ArrowRight size={16} />

                    </button>

                    {/* SAVE */}

                    <button
                      type="button"
                      className="event-heart-button"
                      aria-label="Save event"
                    >
                      <Heart size={17} />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

        {/* =====================================
            MOTIVATION SECTION
        ====================================== */}

        <section className="events-motivation">

          <div className="events-motivation-image">

            <img
              src="/images/volunteer-group.jpeg"
              alt="Volunteers helping community"
            />

          </div>

          <div className="events-motivation-content">

            <span>
              SERVE WITH PURPOSE
            </span>

            <h2>
              There is always
              <strong>
                {" "}a way to help.
              </strong>
            </h2>

            <p>
              Choose an event that matches your
              interests and availability. Your time
              and effort can create a real difference
              in someone's life.
            </p>

            <button
              type="button"
              className="orange-button"
              onClick={() =>
                navigate("/volunteer/dashboard")
              }
            >
              Back to Dashboard

              <ArrowRight size={17} />

            </button>

          </div>

        </section>

        {/* =====================================
            BOTTOM BUTTON
        ====================================== */}

        <div className="events-bottom-action">

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

export default VolunteerEvents;
