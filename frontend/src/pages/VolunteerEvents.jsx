import React from "react";
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

import "../Volunteer.css";

const VolunteerEvents = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      month: "AUG",
      date: "22",
      title: "Community Food Distribution",
      description:
        "Help distribute food and essential supplies to families in need.",
      location: "Solapur Community Center",
      time: "09:00 AM - 01:00 PM",
      volunteers: "25 Volunteers",
      category: "Food Support",
      image: "/images/volunteer-event-food.jpg",
    },
    {
      id: 2,
      month: "AUG",
      date: "28",
      title: "Food Rescue Drive",
      description:
        "Join the team in collecting surplus food and delivering it to communities.",
      location: "Hanumant Seva Center",
      time: "10:00 AM - 02:00 PM",
      volunteers: "18 Volunteers",
      category: "Food Rescue",
      image: "/images/volunteer-event-rescue.jpg",
    },
    {
      id: 3,
      month: "SEP",
      date: "05",
      title: "Community Awareness Program",
      description:
        "Spread awareness about food support and community welfare programs.",
      location: "City Hall",
      time: "11:00 AM - 03:00 PM",
      volunteers: "30 Volunteers",
      category: "Awareness",
      image: "/images/volunteer-event-awareness.jpg",
    },
    {
      id: 4,
      month: "SEP",
      date: "12",
      title: "Community Kitchen Support",
      description:
        "Support our kitchen team with food preparation and distribution.",
      location: "Hanumant Seva Kitchen",
      time: "08:00 AM - 12:00 PM",
      volunteers: "20 Volunteers",
      category: "Community Kitchen",
      image: "/images/volunteer-event-kitchen.jpg",
    },
    {
      id: 5,
      month: "SEP",
      date: "20",
      title: "Donation Collection Drive",
      description:
        "Help collect and organize essential donations for families.",
      location: "Central Collection Point",
      time: "09:30 AM - 01:30 PM",
      volunteers: "15 Volunteers",
      category: "Donation",
      image: "/images/volunteer-event-donation.jpg",
    },
    {
      id: 6,
      month: "SEP",
      date: "27",
      title: "Community Outreach",
      description:
        "Visit local communities and understand their needs and challenges.",
      location: "Solapur Community Area",
      time: "10:00 AM - 02:00 PM",
      volunteers: "22 Volunteers",
      category: "Outreach",
      image: "/images/volunteer-event-outreach.jpg",
    },
  ];

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
            onClick={() => navigate("/volunteer/dashboard")}
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
            {events.length} Events Available
          </div>

        </div>


        {/* =====================================
            SEARCH / FILTER
        ====================================== */}

        <div className="events-filter-bar">

          <div className="events-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search events..."
            />

          </div>

          <button
            type="button"
            className="event-filter active"
          >
            All Events
          </button>

          <button
            type="button"
            className="event-filter"
          >
            Food Support
          </button>

          <button
            type="button"
            className="event-filter"
          >
            Awareness
          </button>

        </div>


        {/* =====================================
            EVENT CARDS
        ====================================== */}

        <div className="events-grid">

          {events.map((event) => (

            <article
              className="volunteer-event-card"
              key={event.id}
            >

              {/* Image */}

              <div className="event-card-image">

                <img
                  src={event.image}
                  alt={event.title}
                />

                <span className="event-category">
                  {event.category}
                </span>

                <div className="event-card-date">

                  <span>
                    {event.month}
                  </span>

                  <strong>
                    {event.date}
                  </strong>

                </div>

              </div>


              {/* Content */}

              <div className="event-card-content">

                <h3>
                  {event.title}
                </h3>

                <p className="event-description">
                  {event.description}
                </p>


                <div className="event-meta">

                  <div>
                    <MapPin size={15} />

                    <span>
                      {event.location}
                    </span>
                  </div>

                  <div>
                    <Clock3 size={15} />

                    <span>
                      {event.time}
                    </span>
                  </div>

                  <div>
                    <Users size={15} />

                    <span>
                      {event.volunteers}
                    </span>
                  </div>

                </div>


                <div className="event-card-footer">

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


        {/* =====================================
            MOTIVATION SECTION
        ====================================== */}

        <section className="events-motivation">

          <div className="events-motivation-image">

            <img
              src="/images/volunteer-events.jpg"
              alt="Volunteers helping community"
            />

          </div>

          <div className="events-motivation-content">

            <span>
              SERVE WITH PURPOSE
            </span>

            <h2>
              There is always
              <strong> a way to help.</strong>
            </h2>

            <p>
              Choose an event that matches your interests
              and availability. Your time and effort can
              create a real difference in someone's life.
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