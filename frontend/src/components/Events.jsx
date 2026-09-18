import { Link } from "react-router-dom";
import ProtectedLink from "../components/ProtectedLink";
function Events() {
  return (
    <section className="events section">
      <div className="container">
        <div className="section-title">
          <span>UPCOMING EVENTS</span>

          <h2>
            Join Our Next <span>Food Drive</span>
          </h2>
        </div>

        <div className="events-grid">
          <div className="event-card">
            <span className="event-date">15 AUG</span>

            <h3>Independence Day Food Drive</h3>

            <p>
              Food distribution for underprivileged families across the city.
            </p>
            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              Join Event
            </ProtectedLink>
          </div>

          <div className="event-card">
            <span className="event-date">30 AUG</span>

            <h3>Community Kitchen</h3>

            <p>
              Volunteers prepare and distribute fresh meals for people in need.
            </p>
            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              Join Event
            </ProtectedLink>
          </div>

          <div className="event-card">
            <span className="event-date">10 SEP</span>

            <h3>Food Donation Camp</h3>

            <p>
              Donate groceries and essential food items for our monthly hunger
              relief campaign.
            </p>
            <ProtectedLink
              to="/dashboard"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="btn btn-primary"
            >
              Join Event
            </ProtectedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;
