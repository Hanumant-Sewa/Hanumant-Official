import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* ================= ₹50 MONTHLY MISSION ================= */}

      <section className="about" id="about">
        <div className="container about-container">
          {/* LEFT - IMAGE */}
          <div className="about-image">
            <div className="about-image-wrapper">
              <img
                src="/images/about.jpg"
                alt="Hanumat Seva community service"
              />

              <div className="about-image-badge">
                <Heart size={20} fill="currentColor" />
                <span>Small acts. Big impact.</span>
              </div>
            </div>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="about-content">
            <span className="section-badge">₹50 MONTHLY MISSION</span>

            <h2>
              One Person.
              <span> One Meal. One Month.</span>
            </h2>

            <p className="about-intro">
              You don't have to do everything to help someone. Sometimes, one
              small contribution can become someone's meal.
            </p>

            <p>
              A simple ₹50 monthly contribution can become part of a collective
              effort to support food-related initiatives and people who need
              support.
            </p>

            {/* CONTRIBUTION OPTIONS */}
            <div className="about-highlights">
              <div className="about-highlight">
                <strong>₹50</strong>
                <span>1 Person</span>
              </div>

              <div className="about-highlight">
                <strong>₹100</strong>
                <span>2 People</span>
              </div>

              <div className="about-highlight">
                <strong>₹250</strong>
                <span>5 People</span>
              </div>

              <div className="about-highlight">
                <strong>₹500</strong>
                <span>10 People</span>
              </div>
            </div>

            <Link to="/donate" className="about-btn">
              Start Monthly Support
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCY PROMISE ================= */}

      <section className="transparency">
        <div className="container">
          <div className="section-title">
            <span>OUR TRANSPARENCY PROMISE</span>

            <h2>
              Show The Work.
              <span> Build The Trust.</span>
            </h2>

            <p>
              We don't ask you to blindly trust us. We invite you to understand
              how your contribution moves through the journey and what impact it
              creates.
            </p>
          </div>

          {/* TRANSPARENCY CARD */}

          <div className="transparency-card">
            <div className="transparency-header">
              <div>
                <span className="transparency-label">YOUR CONTRIBUTION</span>

                <h3>Follow Your Contribution</h3>
              </div>

              <div className="transparency-icon">
                <ShieldCheck size={28} />
              </div>
            </div>

            {/* FLOW */}

            <div className="transparency-flow">
              <div className="transparency-step active">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>Contribution</strong>

                <span>Your support</span>
              </div>

              <div className="flow-line"></div>

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Users size={22} />
                </div>

                <strong>Campaign</strong>

                <span>Where it goes</span>
              </div>

              <div className="flow-line"></div>

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ShieldCheck size={22} />
                </div>

                <strong>Purchase</strong>

                <span>Recorded use</span>
              </div>

              <div className="flow-line"></div>

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>Distribution</strong>

                <span>People reached</span>
              </div>

              <div className="flow-line"></div>

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ArrowRight size={22} />
                </div>

                <strong>Impact</strong>

                <span>Visible results</span>
              </div>
            </div>

            <div className="transparency-footer">
              <p>Every contribution should have a visible journey.</p>

              <Link to="/transparency">
                View Transparency
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
