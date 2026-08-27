import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  Download,
  Eye,
  Medal,
  Trophy,
  Star,
  CheckCircle2,
} from "lucide-react";

import "../css/Volunteer.css";

function VolunteerCertificates() {
  const navigate = useNavigate();

  const certificates = [
    {
      id: 1,
      title: "Community Service Certificate",
      event: "Community Food Distribution",
      date: "22 August 2026",
      type: "Service Certificate",
      image: "/images/certificate-community.jpg",
    },
    {
      id: 2,
      title: "Volunteer Appreciation Certificate",
      event: "Donation Collection Drive",
      date: "20 September 2026",
      type: "Appreciation Certificate",
      image: "/images/certificate-appreciation.jpg",
    },
    {
      id: 3,
      title: "Community Outreach Certificate",
      event: "Community Outreach Program",
      date: "27 September 2026",
      type: "Participation Certificate",
      image: "/images/certificate-outreach.jpg",
    },
  ];

  const handleViewCertificate = (certificate) => {
    alert(`Viewing: ${certificate.title}`);
  };

  const handleDownloadCertificate = (certificate) => {
    alert(`Certificate download started for ${certificate.title}`);
  };

  return (
    <div className="volunteer-certificates-page">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="certificates-page-hero">
        <div className="certificates-hero-content">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>

          <span className="application-label">VOLUNTEER ACHIEVEMENTS</span>

          <h1>
            My
            <span> Certificates</span>
          </h1>

          <p>
            Your service, dedication and contribution are recognized through
            certificates and appreciation awards.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="certificates-page-main">
        {/* =================================================
            STATISTICS
        ================================================== */}

        <section className="certificate-stat-grid">
          <div className="certificate-stat-card">
            <div className="certificate-stat-icon">
              <Award size={23} />
            </div>

            <div>
              <span>TOTAL CERTIFICATES</span>
              <strong>{certificates.length}</strong>
            </div>
          </div>

          <div className="certificate-stat-card">
            <div className="certificate-stat-icon">
              <Trophy size={23} />
            </div>

            <div>
              <span>ACHIEVEMENTS</span>
              <strong>{certificates.length}</strong>
            </div>
          </div>

          <div className="certificate-stat-card">
            <div className="certificate-stat-icon">
              <Star size={23} />
            </div>

            <div>
              <span>VOLUNTEER STATUS</span>
              <strong>Active</strong>
            </div>
          </div>
        </section>

        {/* =================================================
            PAGE INTRO
        ================================================== */}

        <section className="certificates-intro">
          <div className="certificates-intro-icon">
            <Medal size={30} />
          </div>

          <div>
            <span>YOUR CONTRIBUTION</span>

            <h2>
              Every certificate represents
              <strong> a meaningful contribution.</strong>
            </h2>

            <p>
              Keep your certificates as a record of the time, effort and service
              you have contributed to the community.
            </p>
          </div>
        </section>

        {/* =================================================
            CERTIFICATES
        ================================================== */}

        <section className="certificates-section">
          <div className="certificates-section-heading">
            <div>
              <span>YOUR RECORD</span>

              <h2>Earned Certificates</h2>
            </div>

            <div className="certificate-count">{certificates.length}</div>
          </div>

          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.id}>
                {/* Certificate Image */}

                <div className="certificate-image">
                  <img src={certificate.image} alt={certificate.title} />

                  <div className="certificate-image-overlay">
                    <Award size={30} />
                  </div>
                </div>

                {/* Certificate Content */}

                <div className="certificate-content">
                  <span className="certificate-type">{certificate.type}</span>

                  <h3>{certificate.title}</h3>

                  <div className="certificate-event">
                    <CheckCircle2 size={15} />

                    <span>{certificate.event}</span>
                  </div>

                  <div className="certificate-date">
                    <CalendarDays size={15} />

                    <span>{certificate.date}</span>
                  </div>

                  {/* Buttons */}

                  <div className="certificate-actions">
                    <button
                      type="button"
                      className="certificate-view-button"
                      onClick={() => handleViewCertificate(certificate)}
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      type="button"
                      className="certificate-download-button"
                      onClick={() => handleDownloadCertificate(certificate)}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            MOTIVATION SECTION
        ================================================== */}

        <section className="certificates-motivation">
          <div className="certificates-motivation-image">
            <img src="/images/volunteer-certificate.jpeg" />
          </div>

          <div className="certificates-motivation-content">
            <span>KEEP SERVING</span>

            <h2>
              Your service
              <strong> inspires others.</strong>
            </h2>

            <p>
              Continue participating in volunteer activities and create a
              positive impact in the community.
            </p>

            <button
              type="button"
              className="orange-button"
              onClick={() => navigate("/volunteer/events")}
            >
              Explore Events
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* =================================================
            BOTTOM BUTTON
        ================================================== */}

        <div className="certificates-bottom-action">
          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/volunteer/dashboard")}
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default VolunteerCertificates;
