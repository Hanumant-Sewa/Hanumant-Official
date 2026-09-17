import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "../css/Certificate.css";
import logo from "../assets/hanumant-logo.png";

const Certificate = ({
  volunteerName = "Aashiya Mulla",
  certificateType = "Volunteer Appreciation",
  issueDate = "16 September 2026",
  certificateNumber = "HSF-VA-2026-001",
}) => {
  const certificateRef = useRef(null);

  const downloadCertificate = async () => {
    try {
      const certificate = certificateRef.current;

      if (!certificate) {
        return;
      }

      const canvas = await html2canvas(certificate, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fffdf8",
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height,
      );

      pdf.save(`${certificateNumber}.pdf`);
    } catch (error) {
      console.error("Certificate PDF Error:", error);
      alert("Unable to download certificate.");
    }
  };

  return (
    <div className="certificate-page">

      {/* Certificate */}
      <div
        ref={certificateRef}
        className="certificate"
        id="certificate"
      >

        {/* Top decorative corner */}
        <div className="certificate-corner top-right"></div>

        {/* Header */}
        <div className="certificate-header">

          <div className="certificate-logo">
            <img
              src={logo}
              alt="Hanumant Foundation Logo"
            />
          </div>

          <div className="certificate-quote">
            <p>
              "Small Acts
              <br />
              Create Big Changes"
            </p>
          </div>

        </div>

        {/* Main heading */}
        <div className="certificate-title">

          <h1>CERTIFICATE</h1>

          <div className="certificate-subtitle">
            <span></span>
            <h2>OF APPRECIATION</h2>
            <span></span>
          </div>

        </div>

        {/* Presented to */}
        <div className="presented-section">

          <p className="presented-text">
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>

          <h3>{volunteerName}</h3>

          <div className="name-line"></div>

        </div>

        {/* Appreciation message */}
        <div className="certificate-message">

          <p>
            In recognition of your valuable contribution and dedicated
            service as a Volunteer with Hanumant Seva Foundation.
          </p>

          <p>
            Your efforts have made a positive impact in our mission to
            serve the community and create a better tomorrow.
          </p>

          <strong>
            Thank you for being a part of our journey!
          </strong>

        </div>

        {/* Certificate information */}
        <div className="certificate-details">

          <div className="certificate-detail">

            <div className="detail-icon">
              ★
            </div>

            <span>
              Certificate Type
            </span>

            <strong>
              {certificateType}
            </strong>

          </div>

          <div className="detail-divider"></div>

          <div className="certificate-detail">

            <div className="detail-icon">
              ▣
            </div>

            <span>
              Issued On
            </span>

            <strong>
              {issueDate}
            </strong>

          </div>

          <div className="detail-divider"></div>

          <div className="certificate-detail">

            <div className="detail-icon">
              ▤
            </div>

            <span>
              Certificate ID
            </span>

            <strong>
              {certificateNumber}
            </strong>

          </div>

          <div className="detail-divider"></div>

          <div className="certificate-detail">

            <div className="detail-icon">
              ★
            </div>

            <span>
              Issued By
            </span>

            <strong>
              Hanumant Seva Foundation
            </strong>

          </div>

        </div>

        {/* Bottom section */}
        <div className="certificate-footer">

          <div className="signature-section">

            <div className="signature">
              Manisha Nigam
            </div>

            <div className="signature-line"></div>

          </div>

          <div className="footer-text">

            <span>—</span>

            Together We Serve

            <span>—</span>

          </div>

        </div>

      </div>

      {/* Download button */}
      <button
        type="button"
        className="certificate-download-button"
        onClick={downloadCertificate}
      >
        Download Certificate PDF
      </button>

    </div>
  );
};

export default Certificate;