import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
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

              <Link to="/transparency">
                View Transparency
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. FOLLOW YOUR CONTRIBUTION
      ===================================================== */}

      <section className="about" id="about">
        <div className="container about-container">
          {/* ================= LEFT - CONTENT ================= */}

          <div className="about-content">
            <span className="section-badge">YOUR CONTRIBUTION</span>

            <h2>
              Follow Your
              <span> Contribution.</span>
            </h2>

            <p className="about-intro">
              We believe every contribution deserves a visible journey. You
              should know where your support goes and what it helps create.
            </p>

            <p>
              From contribution to campaign, purchase, distribution, and impact
              — Hanumat Seva is built around transparency and responsible
              service.
            </p>

            {/* ================= HIGHLIGHTS ================= */}

            <div className="about-highlights">
              <div className="about-highlight">
                <strong>01</strong>
                <span>Your Support</span>
              </div>

              <div className="about-highlight">
                <strong>02</strong>
                <span>Campaign</span>
              </div>

              <div className="about-highlight">
                <strong>03</strong>
                <span>Distribution</span>
              </div>

              <div className="about-highlight">
                <strong>04</strong>
                <span>Impact</span>
              </div>
            </div>

            {/* ================= BUTTON ================= */}

            <Link to="/transparency" className="about-btn">
              Follow Your Contribution
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* ================= RIGHT - VISUAL ================= */}

          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="about-image-badge">
                <Heart size={20} fill="currentColor" />

                <span>Small acts. Big impact.</span>
              </div>

              <div className="about-image-placeholder">
                <ShieldCheck size={70} />

                <span>Every contribution has a journey.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

            <Link
              to="/login"
              state={{
                from: "/donate",
              }}
              className="about-btn"
            >
              Start Monthly Support
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. FOUNDER SECTION
      ===================================================== */}

      <section className="founder-section">
        <div className="container">
          {/* ================= FOUNDER HEADING ================= */}

          <div className="founder-heading">
            <span className="section-badge">OUR FOUNDER</span>

            <h2>
              A Simple Belief.
              <span> A Meaningful Mission.</span>
            </h2>

            <p>
              Hanumat Seva was founded with the belief that service does not
              have to be complicated. Sometimes, meaningful change begins with
              one simple act of kindness.
            </p>
          </div>

          {/* ================= FOUNDER CARD ================= */}

          <div className="founder-card">
            {/* ================= CARD HEADER ================= */}

            <div className="founder-card-top">
              {/* FOUNDER MARK */}

              <div className="founder-mark">
                <span>HS</span>
              </div>

              {/* FOUNDER INFORMATION */}

              <div className="founder-intro">
                <span className="founder-label">FOUNDER — HANUMAT SEVA</span>

                <h3>Manisha Nigam</h3>

                <span className="founder-role">Founder &amp; Visionary</span>
              </div>

              {/* ESTABLISHED YEAR */}

              <div className="founder-year">
                <span>EST.</span>

                <strong>2026</strong>
              </div>
            </div>

            {/* ================= DIVIDER ================= */}

            <div className="founder-divider"></div>

            {/* ================= FOUNDER MESSAGE ================= */}

            <div className="founder-message">
              <span className="founder-quote-mark">“</span>

              <p>
                I believe service should not be complicated. Sometimes helping
                someone begins with something as simple as sharing a meal.
              </p>

              <p>
                Hanumat Seva was started to bring people together around that
                simple idea and build a transparent, compassionate community
                where every contribution can create meaningful impact.
              </p>
            </div>

            {/* ================= FOUNDER FOOTER ================= */}

            <div className="founder-footer">
              <div className="founder-footer-item">
                <span>OUR BELIEF</span>

                <strong>Service with compassion</strong>
              </div>

              <div className="founder-footer-item">
                <span>OUR APPROACH</span>

                <strong>Simple, transparent &amp; meaningful</strong>
              </div>

              <div className="founder-footer-item">
                <span>FOUNDED</span>

                <strong>2026</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
