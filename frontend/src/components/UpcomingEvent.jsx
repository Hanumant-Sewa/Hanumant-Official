import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "../css/UpcomingEvent.css";

function UpcomingEvent() {
  const [visible, setVisible] = useState(true);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/upcoming`);

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming event");
        }

        const data = await response.json();

        setEvent(data.event || null);
      } catch (error) {
        console.error("Error fetching upcoming event:", error);

        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvent();
  }, [API_URL]);

  const handleViewEvent = () => {
    if (user) {
      navigate("dashboard");
      return;
    }

    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to view the event and participate in volunteering.",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#D97706",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  if (loading) {
    return null;
  }

  if (!visible || !event) {
    return null;
  }

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="upcoming-event">
      {/* CLOSE */}
      <button
        className="upcoming-event-close"
        onClick={() => setVisible(false)}
        aria-label="Close event"
      >
        <X size={15} />
      </button>

      {/* IMAGE */}
      <div className="upcoming-event-image">
        <img src={event.image || "/images/about.jpg"} alt={event.title} />
      </div>

      {/* CONTENT */}
      <div className="upcoming-event-content">
        <span className="upcoming-event-label">Upcoming Event</span>

        <h3>{event.title}</h3>

        <div className="upcoming-event-date">
          <CalendarDays size={14} />
          <span>{formattedDate}</span>
        </div>

        <p>
          {event.description || "Join us in serving meals and spreading hope."}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="upcoming-event-button"
        onClick={handleViewEvent}
      >
        View
      </button>
    </div>
  );
}

export default UpcomingEvent;
