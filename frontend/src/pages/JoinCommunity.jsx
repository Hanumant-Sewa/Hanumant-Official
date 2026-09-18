import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Users,
  HandHeart,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/JoinCommunity.css";

function JoinCommunity() {
  const navigate = useNavigate();

  // Change this if your actual community ID is different
  const COMMUNITY_ID = 1;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    referredById: "",
  });

  const [referrers, setReferrers] = useState([]);
  const [loadingReferrers, setLoadingReferrers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);

  /* =====================================================
     LOAD COMMUNITY MEMBERS FOR REFERRER DROPDOWN
  ===================================================== */

  useEffect(() => {
    const loadReferrers = async () => {
      try {
        setLoadingReferrers(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/communities/${COMMUNITY_ID}/referrers`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load community members.");
        }

        setReferrers(data.members || []);
      } catch (error) {
        console.error("Load referrers error:", error);
        setError(error.message);
      } finally {
        setLoadingReferrers(false);
      }
    };

    loadReferrers();
  }, []);

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================================
     HANDLE FORM SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/communities/${COMMUNITY_ID}/join`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referredById: formData.referredById || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join community.");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Join community error:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (submitted) {
    return (
      <main className="join-community-page">
        <div className="join-success">
          <div className="join-success-icon">
            <CheckCircle size={42} />
          </div>

          <span>WELCOME TO THE COMMUNITY</span>

          <h1>
            Thank You, <strong>{formData.name}</strong>!
          </h1>

          <p>
            Your interest in joining Hanumat Seva has been received. We look
            forward to having you as part of our community of people committed
            to meaningful service.
          </p>

          <div className="join-success-actions">
            <Link to="/" className="join-secondary-btn">
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <Link to="/volunteer" className="join-primary-btn">
              Explore Volunteering
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <main className="join-community-page">
      {/* ================= HERO ================= */}

      <section className="join-community-hero">
        <div className="container join-community-hero-container">
          <div className="join-community-content">
            <Link to="/" className="join-back">
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="join-badge">
              <Users size={16} />
              JOIN OUR COMMUNITY
            </div>

            <h1>
              Be Part of
              <span>Something Meaningful</span>
            </h1>

            <p>
              Join Hanumat Seva and become part of a community that believes
              compassion, time and collective action can create meaningful
              change.
            </p>

            <div className="join-values">
              <div className="join-value">
                <div className="join-value-icon">
                  <Heart size={21} />
                </div>

                <div>
                  <strong>Serve With Compassion</strong>
                  <span>Turn your support into meaningful action.</span>
                </div>
              </div>

              <div className="join-value">
                <div className="join-value-icon">
                  <HandHeart size={21} />
                </div>

                <div>
                  <strong>Make a Difference</strong>
                  <span>
                    Contribute to initiatives that support communities.
                  </span>
                </div>
              </div>

              <div className="join-value">
                <div className="join-value-icon">
                  <Users size={21} />
                </div>

                <div>
                  <strong>Grow Together</strong>
                  <span>Connect with people who believe in service.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FORM ================= */}

          <div className="join-community-card">
            <div className="join-card-header">
              <div className="join-card-icon">
                <Users size={25} />
              </div>

              <div>
                <span>COMMUNITY</span>
                <h2>Join Hanumat Seva</h2>
              </div>
            </div>

            <p className="join-card-description">
              Tell us a little about yourself and how you would like to be
              involved.
            </p>

            {/* ================= ERROR MESSAGE ================= */}

            {error && (
              <p
                style={{
                  color: "#c0392b",
                  marginBottom: "15px",
                }}
              >
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="join-form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="join-form-row">
                <div className="join-form-group">
                  <label htmlFor="email">Email Address</label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="join-form-group">
                  <label htmlFor="phone">Phone Number</label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="join-form-group">
                <label htmlFor="interest">
                  How would you like to contribute?
                </label>

                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>

                  <option value="volunteering">Volunteering</option>

                  <option value="food-distribution">Food Distribution</option>

                  <option value="community-support">Community Support</option>

                  <option value="campaigns">Campaigns & Initiatives</option>

                  <option value="other">Other</option>
                </select>
              </div>

              {/* ================= REFERRER ================= */}

              <div className="join-form-group">
                <label htmlFor="referredById">Who referred you?</label>

                <select
                  id="referredById"
                  name="referredById"
                  value={formData.referredById}
                  onChange={handleChange}
                  disabled={loadingReferrers}
                >
                  <option value="">
                    {loadingReferrers
                      ? "Loading community members..."
                      : "Select a member (Optional)"}
                  </option>

                  {referrers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="join-form-group">
                <label htmlFor="message">
                  Message <span>(Optional)</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us how you would like to contribute..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="join-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Joining..." : "Join Our Community"}

                {!submitting && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="join-note">
              🙏 Together, small acts of service can become meaningful change.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default JoinCommunity;
