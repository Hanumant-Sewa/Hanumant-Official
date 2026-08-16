import {
  Heart,
  Users,
  ShieldCheck,
  Clock3,
  Infinity,
  HandHeart,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-container">

        {/* =========================
            LEFT SIDE
        ========================== */}

        <div className="hero-content">

          <div className="hero-badge">
            🙏 सेवा • समर्पण • संस्कार
          </div>

          <h1>
            सेवा से बड़ा
            <br />
            कोई <span>धर्म</span> नहीं
          </h1>

          <div className="hero-divider">
            <span></span>
            ✧
            <span></span>
          </div>

          <p>
            HanumantSeva Foundation is dedicated to serving
            humanity, supporting communities, and creating a
            better tomorrow through compassion and selfless service.
          </p>


          {/* =========================
              BUTTONS
          ========================== */}

          <div className="hero-buttons">

            {/* DONATE BUTTON */}

            <Link
              to="/login"
              className="hero-btn hero-btn-primary"
            >
              <Heart size={25} />
              Donate Now
            </Link>


            {/* VOLUNTEER BUTTON */}

            <Link
              to="/volunteer"
              className="hero-btn hero-btn-outline"
            >
              <Users size={25} />
              Become a Volunteer
            </Link>

          </div>


          {/* =========================
              TRUST FEATURES
          ========================== */}

          <div className="hero-features">

            <div className="hero-feature">

              <ShieldCheck size={43} />

              <div>
                <strong>100%</strong>
                <span>Transparent</span>
              </div>

            </div>


            <div className="hero-feature">

              <Clock3 size={43} />

              <div>
                <strong>24/7</strong>
                <span>Community Support</span>
              </div>

            </div>


            <div className="hero-feature">

              <Infinity size={45} />

              <div>
                <span>Hope &amp; Service</span>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div className="hero-art">

          <img
            src="/images/hero-art.png"
            alt="HanumantSeva community service"
          />

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================== */}

      <div className="stats-card">

        <div className="stat">

          <Users size={45} />

          <div>
            <strong>50K+</strong>
            <span>Lives Touched</span>
          </div>

        </div>


        <div className="stat">

          <HandHeart size={45} />

          <div>
            <strong>500+</strong>
            <span>Volunteers</span>
          </div>

        </div>


        <div className="stat">

          <Star size={45} />

          <div>
            <strong>20+</strong>
            <span>Cities</span>
          </div>

        </div>


        <div className="stat">

          <Users size={45} />

          <div>
            <strong>1000+</strong>
            <span>Families Helped</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
