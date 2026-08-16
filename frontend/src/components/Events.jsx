import { Link } from "react-router-dom";

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

            <a href="#volunteer" className="btn btn-primary">
              Join Event
            </a>
          </div>

          <div className="event-card">
            <span className="event-date">30 AUG</span>

            <h3>Community Kitchen</h3>

            <p>
              Volunteers prepare and distribute fresh meals for people in need.
            </p>

            <a href="#volunteer" className="btn btn-primary">
              Join Event
            </a>
          </div>

          <div className="event-card">
            <span className="event-date">10 SEP</span>

            <h3>Food Donation Camp</h3>

            <p>
              Donate groceries and essential food items for our monthly hunger
              relief campaign.
            </p>

            <a href="#volunteer" className="btn btn-primary">
              Join Event
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;
