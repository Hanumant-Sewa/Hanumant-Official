import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Heart,
  CheckCircle,
  Share2,
} from "lucide-react";

import "../css/Volunteer.css";

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const events = {
    1: {
      title: "Community Food Distribution",
      category: "Food Support",
      date: "22 August 2026",
      time: "09:00 AM - 01:00 PM",
      location: "Solapur Community Center",
      volunteers: "25 Volunteers",
      image: "/images/volunteer-event-food.jpg",
      description:
        "Join us for a community food distribution activity where volunteers work together to provide food and essential supplies to families in need.",
      about:
        "Volunteers will help organize food packages, manage distribution counters and support families during the event.",
    },

    2: {
      title: "Food Rescue Drive",
      category: "Food Rescue",
      date: "28 August 2026",
      time: "10:00 AM - 02:00 PM",
      location: "Hanumant Seva Center",
      volunteers: "18 Volunteers",
      image: "/images/volunteer-event-rescue.jpg",
      description:
        "Help collect surplus food and make sure it reaches people and communities who need it.",
      about:
        "Volunteers will assist with food collection, sorting, packaging and delivery coordination.",
    },

    3: {
      title: "Community Awareness Program",
      category: "Awareness",
      date: "05 September 2026",
      time: "11:00 AM - 03:00 PM",
      location: "City Hall",
      volunteers: "30 Volunteers",
      image: "/images/volunteer-event-awareness.jpg",
      description:
        "Spread awareness about community welfare, food support and the importance of helping people in need.",
      about:
        "Volunteers will interact with the community and help the team conduct awareness activities.",
    },

    4: {
      title: "Community Kitchen Support",
      category: "Community Kitchen",
      date: "12 September 2026",
      time: "08:00 AM - 12:00 PM",
      location: "Hanumat Seva Kitchen",
      volunteers: "20 Volunteers",
      image: "/images/volunteer-event-kitchen.jpg",
      description:
        "Support the community kitchen team with food preparation, packaging and distribution.",
      about:
        "Volunteers will assist the kitchen team with preparation and organization of food supplies.",
    },

    5: {
      title: "Donation Collection Drive",
      category: "Donation",
      date: "20 September 2026",
      time: "09:30 AM - 01:30 PM",
      location: "Central Collection Point",
      volunteers: "15 Volunteers",
      image: "/images/volunteer-event-donation.jpg",
      description:
        "Help collect and organize essential donations that will be distributed to families in need.",
      about:
        "Volunteers will receive donations, organize materials and help prepare them for distribution.",
    },

    6: {
      title: "Community Outreach",
      category: "Outreach",
      date: "27 September 2026",
      time: "10:00 AM - 02:00 PM",
      location: "Solapur Community Area",
      volunteers: "22 Volunteers",
      image: "/images/volunteer-event-outreach.jpg",
      description:
        "Visit local communities, understand their needs and connect people with available support.",
      about:
        "Volunteers will work with the outreach team and participate in community interaction activities.",
    },
  };

  const event = events[eventId] || events[1];

  const handleJoinEvent = () => {
    localStorage.setItem(
      `joinedEvent_${eventId}`,
      JSON.stringify({
        eventId,
        eventName: event.title,
        joined: true,
      }),
    );

    alert("You have successfully joined this event!");

    navigate("/volunteer/events");
  };

  return (
    <div className="event-details-page">
      {/* =========================================
          HERO IMAGE
      ========================================== */}

      <section className="event-details-hero">
        <img src={event.image} alt={event.title} />

        <div className="event-details-overlay"></div>

        <div className="event-details-hero-content">
          <button
            type="button"
            className="back-button event-back-button"
            onClick={() => navigate("/volunteer/events")}
          >
            <ArrowLeft size={17} />
            Back to Events
          </button>

          <span className="event-details-category">{event.category}</span>

          <h1>{event.title}</h1>
        </div>
      </section>

      {/* =========================================
          DETAILS MAIN
      ========================================== */}

      <main className="event-details-main">
        <div className="event-details-grid">
          {/* =====================================
              LEFT CONTENT
          ====================================== */}

          <section className="event-details-content">
            <div className="event-details-card">
              <span className="card-small-label">ABOUT THIS EVENT</span>

              <h2>Make a Difference Together</h2>

              <p>{event.description}</p>

              <p>{event.about}</p>
            </div>

            {/* =================================
                WHAT YOU WILL DO
            ================================== */}

            <div className="event-details-card">
              <span className="card-small-label">VOLUNTEER ROLE</span>

              <h2>What You Will Do</h2>

              <div className="event-role-list">
                <div>
                  <CheckCircle size={18} />
                  <span>Support the event team during the activity.</span>
                </div>

                <div>
                  <CheckCircle size={18} />
                  <span>Help organize materials and supplies.</span>
                </div>

                <div>
                  <CheckCircle size={18} />
                  <span>Assist people participating in the event.</span>
                </div>

                <div>
                  <CheckCircle size={18} />
                  <span>Follow instructions given by the coordinator.</span>
                </div>

                <div>
                  <CheckCircle size={18} />
                  <span>Work together with other volunteers.</span>
                </div>
              </div>
            </div>

            {/* =================================
                EVENT IMAGE
            ================================== */}

            <div className="event-details-image-card">
              <img src={event.image} alt={event.title} />

              <div>
                <Heart size={20} />

                <span>Your contribution matters.</span>
              </div>
            </div>
          </section>

          {/* =====================================
              RIGHT SIDEBAR
          ====================================== */}

          <aside className="event-details-sidebar">
            <div className="event-info-box">
              <span className="card-small-label">EVENT INFORMATION</span>

              <h2>Event Details</h2>

              {/* Date */}

              <div className="event-info-row">
                <div className="event-info-icon">
                  <CalendarDays size={19} />
                </div>

                <div>
                  <small>DATE</small>

                  <strong>{event.date}</strong>
                </div>
              </div>

              {/* Time */}

              <div className="event-info-row">
                <div className="event-info-icon">
                  <Clock3 size={19} />
                </div>

                <div>
                  <small>TIME</small>

                  <strong>{event.time}</strong>
                </div>
              </div>

              {/* Location */}

              <div className="event-info-row">
                <div className="event-info-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <small>LOCATION</small>

                  <strong>{event.location}</strong>
                </div>
              </div>

              {/* Volunteers */}

              <div className="event-info-row">
                <div className="event-info-icon">
                  <Users size={19} />
                </div>

                <div>
                  <small>VOLUNTEERS</small>

                  <strong>{event.volunteers}</strong>
                </div>
              </div>

              {/* Join */}

              <button
                type="button"
                className="orange-button join-event-button"
                onClick={handleJoinEvent}
              >
                <CheckCircle size={18} />
                Join This Event
                <ArrowRight size={17} />
              </button>

              {/* Share */}

              <button
                type="button"
                className="share-event-button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);

                  alert("Event link copied!");
                }}
              >
                <Share2 size={17} />
                Share Event
              </button>
            </div>

            {/* =================================
                REMINDER CARD
            ================================== */}

            <div className="event-reminder-card">
              <div className="event-reminder-icon">
                <Clock3 size={21} />
              </div>

              <h3>Be Prepared</h3>

              <p>
                Please arrive at least 15 minutes before the event starts and
                follow the coordinator's instructions.
              </p>
            </div>
          </aside>
        </div>

        {/* =========================================
            BOTTOM NAVIGATION
        ========================================== */}

        <div className="event-details-bottom">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/volunteer/events")}
          >
            <ArrowLeft size={17} />
            All Events
          </button>

          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            Dashboard
            <ArrowRight size={17} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
