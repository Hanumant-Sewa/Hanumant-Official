import React, { useEffect, useState } from "react";
import { Award, CalendarDays, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Certificate from "../components/Certificate";

const VolunteerCertificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* =========================================
     FETCH CERTIFICATES FROM BACKEND
  ========================================= */

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/certificates`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch certificates"
          );
        }

        setCertificates(data.certificates || []);
      } catch (error) {
        console.error("Certificate Fetch Error:", error);

        setError(
          error.message || "Something went wrong while loading certificates."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="volunteer-certificates-page">

        <button
          type="button"
          className="certificate-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="certificates-empty">

          <Award size={50} />

          <h2>
            Loading Certificates...
          </h2>

          <p>
            Please wait while we load your certificates.
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error) {
    return (
      <div className="volunteer-certificates-page">

        <button
          type="button"
          className="certificate-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="certificates-empty">

          <Award size={50} />

          <h2>
            Unable to Load Certificates
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     OPEN FULL CERTIFICATE
  ========================================= */

  if (selectedCertificate) {
    return (
      <div className="volunteer-certificates-page">

        <div className="certificate-page-header">

          <button
            type="button"
            className="certificate-back-button"
            onClick={() => setSelectedCertificate(null)}
          >
            ← Back to My Certificates
          </button>

          <h1>
            My Certificate
          </h1>

          <p>
            View and download your certificate.
          </p>

        </div>

        <Certificate
          volunteerName={selectedCertificate.volunteerName}
          certificateType={selectedCertificate.certificateType}
          issueDate={new Date(
            selectedCertificate.issueDate
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          certificateNumber={selectedCertificate.certificateNumber}
        />

      </div>
    );
  }

  /* =========================================
     CERTIFICATE LIST
  ========================================= */

  return (
    <div className="volunteer-certificates-page">

      {/* Back to Dashboard */}

      <button
        type="button"
        className="certificate-back-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="certificates-page-header">

        <div>

          <span className="card-eyebrow">
            My Achievements
          </span>

          <h1>
            My Certificates
          </h1>

          <p>
            View certificates you have earned through your volunteer work.
          </p>

        </div>

        <div className="certificates-count">

          <Award size={24} />

          <div>

            <strong>
              {certificates.length}
            </strong>

            <span>
              Certificates
            </span>

          </div>

        </div>

      </div>

      {/* =========================================
          NO CERTIFICATES
      ========================================= */}

      {certificates.length === 0 ? (

        <div className="certificates-empty">

          <Award size={50} />

          <h2>
            No Certificates Yet
          </h2>

          <p>
            Your certificates will appear here after you complete
            eligible volunteer activities.
          </p>

        </div>

      ) : (

        /* =========================================
           CERTIFICATE CARDS
        ========================================= */

        <div className="certificates-grid">

          {certificates.map((certificate) => (

            <div
              className="certificate-card"
              key={certificate.id}
              onClick={() =>
                setSelectedCertificate(certificate)
              }
            >

              {/* Small certificate preview */}

              <div className="certificate-card-preview">

                <div className="mini-certificate">

                  <Award size={32} />

                  <h3>
                    CERTIFICATE
                  </h3>

                  <span>
                    OF APPRECIATION
                  </span>

                  <strong>
                    {certificate.volunteerName}
                  </strong>

                </div>

              </div>

              {/* Certificate information */}

              <div className="certificate-card-content">

                <div className="certificate-card-title">

                  <div className="certificate-card-icon">
                    <Award size={20} />
                  </div>

                  <div>

                    <h3>
                      {certificate.certificateType}
                    </h3>

                    <span>
                      {certificate.certificateNumber}
                    </span>

                  </div>

                </div>

                <div className="certificate-card-date">

                  <CalendarDays size={16} />

                  <span>
                    Issued on{" "}
                    {new Date(
                      certificate.issueDate
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                </div>

                <button
                  type="button"
                  className="certificate-view-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCertificate(certificate);
                  }}
                >

                  <Eye size={17} />

                  View Certificate

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default VolunteerCertificates;