import { Link } from "react-router-dom";

function DonateSection() {
  return (
    <section className="donate section" id="donate">
      <div className="container">
        <div className="section-title">
          <span>DONATE TODAY</span>

          <h2>
            Your Contribution <span>Feeds Someone</span>
          </h2>

          <p>
            Every donation, regardless of size, helps provide nutritious meals
            and hope to people who need it most.
          </p>
        </div>

        <div className="donation-grid">
          {/* Basic Meal */}
          <div className="donation-card">
            <h3>₹100</h3>

            <h4>Basic Meal</h4>

            <p>Provides meals for 2 people.</p>

            <Link to="/login" className="btn donate-btn">
              Donate Now
            </Link>
          </div>

          {/* Family Support */}
          <div className="donation-card featured">
            <span className="popular">Most Popular</span>

            <h3>₹500</h3>

            <h4>Family Support</h4>

            <p>Provides meals for 10 people.</p>

            <Link to="/login" className="btn donate-btn">
              Donate Now
            </Link>
          </div>

          {/* Community Support */}
          <div className="donation-card">
            <h3>₹1000</h3>

            <h4>Community Support</h4>

            <p>Provides meals for 25+ people.</p>

            <Link to="/login" className="btn donate-btn">
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonateSection;
