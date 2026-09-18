import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import ProtectedButton from "./ProtectedButton";
import ProtectedLink from "./ProtectedLink";

const About = () => {
  return (
    <>
      {/* =====================================================
          3. ONE PERSON. ONE MEAL. ONE MONTH.
      ===================================================== */}

      <section className="about">
        <div className="container about-container">
          {/* ================= LEFT - IMAGE ================= */}

          <div className="about-image">
            <div className="about-image-wrapper">
              <img src="/images/about.jpg" alt="Hanumat Seva food service" />

              <div className="about-image-badge">
                <Heart size={20} fill="currentColor" />

                <span>Small acts. Big impact.</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT - CONTENT ================= */}

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

            {/* ================= CONTRIBUTION OPTIONS ================= */}

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

            {/* ================= MONTHLY SUPPORT ================= */}

            <ProtectedButton
              to="/donate"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="about-btn"
            >
              Start Monthly Support
              <ArrowRight size={18} />
            </ProtectedButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          1. TRANSPARENCY PROMISE
      ===================================================== */}

      <section className="transparency">
        <div className="container">
          {/* ================= SECTION TITLE ================= */}

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

          {/* ================= TRANSPARENCY CARD ================= */}

          <div className="transparency-card">
            {/* ================= HEADER ================= */}

            <div className="transparency-header">
              <div>
                <span className="transparency-label">YOUR CONTRIBUTION</span>

                <h3>Follow Your Contribution</h3>
              </div>

              <div className="transparency-icon">
                <ShieldCheck size={28} />
              </div>
            </div>

            {/* ================= FLOW ================= */}

            <div className="transparency-flow">
              {/* CONTRIBUTION */}

              <div className="transparency-step active">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>Contribution</strong>

                <span>Your support</span>
              </div>

              <div className="flow-line"></div>

              {/* CAMPAIGN */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Users size={22} />
                </div>

                <strong>Campaign</strong>

                <span>Where it goes</span>
              </div>

              <div className="flow-line"></div>

              {/* PURCHASE */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ShieldCheck size={22} />
                </div>

                <strong>Purchase</strong>

                <span>Recorded use</span>
              </div>

              <div className="flow-line"></div>

              {/* DISTRIBUTION */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>Distribution</strong>

                <span>People reached</span>
              </div>

              <div className="flow-line"></div>

              {/* IMPACT */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ArrowRight size={22} />
                </div>

                <strong>Impact</strong>

                <span>Visible results</span>
              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div className="transparency-footer">
              <p>Every contribution should have a visible journey.</p>

              <ProtectedLink
                to="/transparency"
                allowedRoles={["USER", "VOLUNTEER"]}
                state={{
                  from: "/transparency",
                }}
                className="transparency-link"
              >
                View Transparency
                <ArrowRight size={17} />
              </ProtectedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="founder-section" id="about">
        <div className="container">
          <div className="founder-heading">
            <span className="section-badge">OUR FOUNDER</span>
            <h2>
              Meet the <span>Founder</span>
            </h2>
            <p>
              A simple belief in helping others grew into a vision for building
              a transparent and compassionate food-support movement.
            </p>
          </div>

          <div className="founder-profile">
            <div className="founder-photo">
              <img
                src="/images/founder.png"
                alt="Manisha Nigam, Founder of Hanumat Seva Foundation"
              />
              <div className="founder-photo-badge">
                <span>FOUNDER</span>
                <strong>Hanumat Seva Foundation</strong>
              </div>
            </div>

            <div className="founder-profile-content">
              <span className="founder-label">MANISHA NIGAM</span>
              <h3>Founder, Hanumat Seva Foundation</h3>

              <p>
                For over a decade, Manisha Nigam has been personally involved in
                helping people and supporting communities in need in Kanpur.
              </p>

              <p>
                Her journey has been driven not by the idea of building an
                organization, but by a simple human responsibility — if we can
                help someone, we should.
              </p>

              <p>
                Seeing the everyday reality of hunger and food wastage inspired
                her to think beyond individual acts of help and create a system
                that could allow many more people to participate.
              </p>

              <p>
                Hanumat Seva Foundation is an effort to turn that belief into a
                larger, organized movement.
              </p>
            </div>
          </div>

          <div className="founder-quote">
            <span className="founder-quote-mark">“</span>
            <p>
              Seva does not begin with how much we have. It begins with how much
              we are willing to share.
            </p>
          </div>

          <div className="founder-vision">
            <div className="founder-vision-content">
              <span className="founder-label">OUR VISION</span>
              <h3>What We Want to Build</h3>

              <p>
                We don't want to be just another organization that distributes
                food.
              </p>

              <p>
                We want to build an ecosystem where food rescue becomes simple,
                transparent, and scalable.
              </p>

              <div className="founder-vision-points">
                <div className="founder-vision-point">
                  <span>01</span>
                  <p>
                    A restaurant should be able to report surplus food in
                    seconds.
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>02</span>
                  <p>A volunteer should be able to find a nearby pickup.</p>
                </div>

                <div className="founder-vision-point">
                  <span>03</span>
                  <p>An organization should be able to request meals.</p>
                </div>

                <div className="founder-vision-point">
                  <span>04</span>
                  <p>
                    A donor should be able to see the impact of their
                    contribution.
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>05</span>
                  <p>
                    Every meal should have a journey that can be understood and
                    trusted.
                  </p>
                </div>
              </div>
            </div>

            <div className="founder-journey">
              <span>THE JOURNEY</span>
              <strong>One Meal</strong>
              <i>↓</i>
              <strong>One Community</strong>
              <i>↓</i>
              <strong>One City</strong>
              <i>↓</i>
              <strong>An Entire Movement</strong>
            </div>
          </div>

          <div className="founder-promise">
            <div className="founder-promise-heading">
              <span className="founder-label">OUR PROMISE</span>
              <h3>Simple words. A serious commitment.</h3>
            </div>

            <div className="founder-promise-list">
              <div>Rescue what can be saved.</div>
              <div>Share what can be shared.</div>
              <div>Serve with dignity.</div>
              <div>Waste less.</div>
              <div>Feed more.</div>
            </div>
          </div>

          <div className="founder-signature">
            <strong>Hanumat Seva Foundation</strong>
            <span>Serving Humanity. One Meal at a Time.</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
