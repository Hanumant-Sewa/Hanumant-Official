import { Link } from "react-router-dom";
import ProtectedLink from "../components/ProtectedLink";
import { useTranslation } from "react-i18next";

function Events() {
  const { t } = useTranslation();

  return (
    <section className="events section">
      <div className="container">
        <div className="section-title">
          <span>{t("events.badge")}</span>

          <h2>
            {t("events.titleFirst")}{" "}
            <span>{t("events.titleHighlight")}</span>
          </h2>
        </div>

        <div className="events-grid">

          <div className="event-card">
            <span className="event-date">15 AUG</span>

            <h3>{t("events.event1.title")}</h3>

            <p>
              {t("events.event1.description")}
            </p>

            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              {t("events.joinEvent")}
            </ProtectedLink>
          </div>

          <div className="event-card">
            <span className="event-date">30 AUG</span>

            <h3>{t("events.event2.title")}</h3>

            <p>
              {t("events.event2.description")}
            </p>

            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              {t("events.joinEvent")}
            </ProtectedLink>
          </div>

          <div className="event-card">
            <span className="event-date">10 SEP</span>

            <h3>{t("events.event3.title")}</h3>

            <p>
              {t("events.event3.description")}
            </p>

            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              {t("events.joinEvent")}
            </ProtectedLink>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Events;