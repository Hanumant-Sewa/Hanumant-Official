import { useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/UpcomingEvent.css";

function UpcomingEvent() {
  const { t } = useTranslation();

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
        aria-label={t("upcomingEvent.close")}
      >
        <X size={15} />
      </button>

      {/* IMAGE */}
      <div className="upcoming-event-image">
        <img
          src="/images/about.jpg"
          alt={t("upcomingEvent.imageAlt")}
        />
      </div>

      {/* CONTENT */}
      <div className="upcoming-event-content">
        <span className="upcoming-event-label">
          {t("upcomingEvent.label")}
        </span>

        <h3>{t("upcomingEvent.title")}</h3>

        <div className="upcoming-event-date">
          <CalendarDays size={14} />
          <span>{t("upcomingEvent.date")}</span>
        </div>

        <p>{t("upcomingEvent.description")}</p>
      </div>

      {/* CTA */}
      <Link to="/events" className="upcoming-event-button">
        {t("upcomingEvent.view")}
      </Link>
    </div>
  );
}

export default UpcomingEvent;