import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { Link } from "react-router-dom";
import "../css/UpcomingEvent.css";
function UpcomingEvent() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

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
        <img src="/images/about.jpg" alt="Upcoming Hanumat Seva event" />
      </div>

      {/* CONTENT */}
      <div className="upcoming-event-content">
        <span className="upcoming-event-label">Upcoming Event</span>

        <h3>Community Food Drive</h3>

        <div className="upcoming-event-date">
          <CalendarDays size={14} />
          <span>15 September 2026</span>
        </div>

        <p>Join us in serving meals and spreading hope.</p>
      </div>

      {/* CTA */}
      <Link to="/events" className="upcoming-event-button">
        View
      </Link>
    </div>
  );
}

export default UpcomingEvent;
