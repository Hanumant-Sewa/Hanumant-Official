import {
  CheckCircle,
  Download,
  Home,
} from "lucide-react";

import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";

import "../css/DonationReceipt.css";

function DonationReceipt() {
  const { t } = useTranslation();

  const { id } = useParams();
  const location = useLocation();

  const [downloading, setDownloading] = useState(false);

  /* =========================================================
     DONATION DATA
     ========================================================= */

  const donorName =
    location.state?.donorName || "Donor";

  const donorEmail =
    location.state?.donorEmail || "N/A";

  const amount =
    Number(location.state?.amount) || 0;

  const frequency =
    location.state?.frequency || "one-time";

  const paymentMethod =
    location.state?.paymentMethod || "UPI";

  const status =
    location.state?.status || "SUCCESS";

  const transactionId =
    location.state?.transactionId || "N/A";

  const paymentId =
    location.state?.paymentId || "N/A";

  const orderId =
    location.state?.orderId || "N/A";

  const receiptNumber =
    location.state?.receiptNumber ||
    id ||
    "N/A";

  const donatedAt =
    location.state?.donatedAt || "";

  /* =========================================================
     PAYMENT METHOD
     ========================================================= */

  const getPaymentMethodName = () => {
    if (
      paymentMethod === "UPI" ||
      paymentMethod === "upi"
    ) {
      return "UPI";
    }

    if (
      paymentMethod === "CARD" ||
      paymentMethod === "card"
    ) {
      return t("donationReceipt.card");
    }

    if (
      paymentMethod === "NET_BANKING" ||
      paymentMethod === "netbanking"
    ) {
      return t("donationReceipt.netBanking");
    }

    return paymentMethod;
  };

  /* =========================================================
     FREQUENCY
     ========================================================= */

  const getFrequencyName = () => {
    if (frequency === "monthly") {
      return t("donationReceipt.monthly");
    }

    return t("donationReceipt.oneTime");
  };

  /* =========================================================
     DATE FORMAT
     ========================================================= */

  const getFormattedDate = () => {
    if (!donatedAt) {
      return "N/A";
    }

    const date = new Date(donatedAt);

    if (isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     DOWNLOAD PDF RECEIPT
     ========================================================= */

  const handleDownloadReceipt = () => {
    try {
      setDownloading(true);

      /*
        Create A4 PDF
      */
      const doc = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pageWidth =
        doc.internal.pageSize.getWidth();

      const pageHeight =
        doc.internal.pageSize.getHeight();

      const margin = 14;

      const contentWidth =
        pageWidth - margin * 2;

      /* =====================================================
         COLORS
         ===================================================== */

      const orange = [217, 119, 6];

      const dark = [35, 39, 42];

      const gray = [100, 105, 110];

      const lightGray = [247, 248, 249];

      const border = [220, 223, 226];

      const green = [22, 128, 61];

      const lightOrange = [255, 248, 239];

      const lightGreen = [240, 253, 244];

      /* =====================================================
         OUTER BORDER
         ===================================================== */

      doc.setDrawColor(...border);

      doc.setLineWidth(0.5);

      doc.roundedRect(
        margin,
        margin,
        contentWidth,
        pageHeight - margin * 2,
        2,
        2,
        "S"
      );

      /* =====================================================
         HEADER
         ===================================================== */

      let y = 24;

      doc.setTextColor(...dark);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(17);

      doc.text(
        "HANUMANT SEVA FOUNDATION",
        pageWidth / 2,
        y,
        {
          align: "center",
        }
      );

      y += 7;

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);

      doc.setTextColor(...gray);

      doc.text(
        t("donationReceipt.pdf.receiptTitle"),
        pageWidth / 2,
        y,
        {
          align: "center",
        }
      );

      /* =====================================================
         ORANGE DIVIDER
         ===================================================== */

      y += 6;

      doc.setDrawColor(...orange);

      doc.setLineWidth(1);

      doc.line(
        margin + 8,
        y,
        pageWidth - margin - 8,
        y
      );

      /* =====================================================
         RECEIPT INFORMATION
         ===================================================== */

      y += 10;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.receiptInformation"),
        margin + 5,
        y
      );

      y += 6;

      const column1 = margin + 5;

      const column2 = pageWidth / 2 - 10;

      const column3 = pageWidth - margin - 50;

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8.5);

      doc.setTextColor(...gray);

      doc.text(
        t("donationReceipt.pdf.receiptNumber"),
        column1,
        y
      );

      doc.text(
        t("donationReceipt.pdf.donationId"),
        column2,
        y
      );

      doc.text(
        t("donationReceipt.pdf.date"),
        column3,
        y
      );

      y += 5;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(...dark);

      doc.text(
        String(receiptNumber),
        column1,
        y
      );

      doc.text(
        String(id || "N/A"),
        column2,
        y
      );

      doc.text(
        getFormattedDate(),
        column3,
        y
      );

      /* =====================================================
         DONOR INFORMATION BOX
         ===================================================== */

      y += 10;

      doc.setFillColor(...lightGray);

      doc.roundedRect(
        margin + 5,
        y - 5,
        contentWidth - 10,
        25,
        2,
        2,
        "F"
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.donorInformation"),
        margin + 10,
        y + 2
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(...gray);

      doc.text(
        t("donationReceipt.donorName"),
        margin + 10,
        y + 9
      );

      doc.text(
        t("donationReceipt.email"),
        pageWidth / 2,
        y + 9
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setTextColor(...dark);

      doc.text(
        String(donorName),
        margin + 10,
        y + 15
      );

      doc.text(
        String(donorEmail),
        pageWidth / 2,
        y + 15
      );

      /* =====================================================
         DONATION DETAILS
         ===================================================== */

      y += 34;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.donationDetails"),
        margin + 5,
        y
      );

      y += 6;

      doc.setFillColor(...orange);

      doc.roundedRect(
        margin + 5,
        y - 4,
        contentWidth - 10,
        8,
        1.5,
        1.5,
        "F"
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(8.5);

      doc.setTextColor(
        255,
        255,
        255
      );

      doc.text(
        t("donationReceipt.pdf.detail"),
        margin + 9,
        y + 1
      );

      doc.text(
        t("donationReceipt.pdf.information"),
        pageWidth - margin - 55,
        y + 1
      );

      /* =====================================================
         DONATION ROWS
         ===================================================== */

      const donationRows = [
        [
          t("donationReceipt.amount"),
          `INR ${amount.toFixed(2)}`,
        ],
        [
          t("donationReceipt.contribution"),
          getFrequencyName(),
        ],
        [
          t("donationReceipt.campaign"),
          t("donationReceipt.foodSupport"),
        ],
        [
          t("donationReceipt.paymentMethod"),
          getPaymentMethodName(),
        ],
        [
          t("donationReceipt.paymentStatus"),
          status === "SUCCESS"
            ? t("donationReceipt.successful")
            : status,
        ],
        [
          t("donationReceipt.donationDate"),
          getFormattedDate(),
        ],
      ];

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8.5);

      donationRows.forEach(
        ([label, value], index) => {
          y += 7;

          if (index % 2 === 0) {
            doc.setFillColor(
              ...lightGray
            );

            doc.rect(
              margin + 5,
              y - 4.5,
              contentWidth - 10,
              7,
              "F"
            );
          }

          doc.setTextColor(...gray);

          doc.text(
            label,
            margin + 9,
            y
          );

          if (
            label ===
            t("donationReceipt.paymentStatus")
          ) {
            doc.setTextColor(
              ...green
            );

            doc.setFont(
              "helvetica",
              "bold"
            );
          } else {
            doc.setTextColor(
              ...dark
            );

            doc.setFont(
              "helvetica",
              "normal"
            );
          }

          doc.text(
            String(value),
            pageWidth - margin - 55,
            y
          );
        }
      );

      /* =====================================================
         PAYMENT INFORMATION
         ===================================================== */

      y += 12;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.paymentInformation"),
        margin + 5,
        y
      );

      y += 6;

      const paymentRows = [
        [
          t("donationReceipt.transactionId"),
          transactionId,
        ],
        [
          t("donationReceipt.razorpayPaymentId"),
          paymentId,
        ],
        [
          t("donationReceipt.razorpayOrderId"),
          orderId,
        ],
      ];

      paymentRows.forEach(
        ([label, value], index) => {
          y += 7;

          if (index % 2 === 0) {
            doc.setFillColor(
              ...lightGray
            );

            doc.rect(
              margin + 5,
              y - 4.5,
              contentWidth - 10,
              7,
              "F"
            );
          }

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(8);

          doc.setTextColor(...gray);

          doc.text(
            label,
            margin + 9,
            y
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setTextColor(...dark);

          const displayValue =
            String(value);

          const maxWidth = 105;

          let finalValue =
            displayValue;

          if (
            doc.getTextWidth(
              displayValue
            ) > maxWidth
          ) {
            finalValue =
              displayValue.substring(
                0,
                42
              ) + "...";
          }

          doc.text(
            finalValue,
            pageWidth - margin - 55,
            y
          );
        }
      );

      /* =====================================================
         TOTAL DONATION BOX
         ===================================================== */

      y += 12;

      doc.setFillColor(
        ...lightOrange
      );

      doc.setDrawColor(
        ...orange
      );

      doc.setLineWidth(0.5);

      doc.roundedRect(
        margin + 5,
        y - 6,
        contentWidth - 10,
        18,
        2,
        2,
        "FD"
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.totalDonation"),
        margin + 10,
        y + 5
      );

      doc.setFontSize(14);

      doc.setTextColor(...orange);

      doc.text(
        `INR ${amount.toFixed(2)}`,
        pageWidth - margin - 10,
        y + 5,
        {
          align: "right",
        }
      );

      /* =====================================================
         SMALL THANK YOU MESSAGE
         ===================================================== */

      y += 29;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(9);

      doc.setTextColor(...dark);

      doc.text(
        t("donationReceipt.pdf.thankYou"),
        pageWidth / 2,
        y,
        {
          align: "center",
        }
      );

      y += 5;

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(7.5);

      doc.setTextColor(...gray);

      doc.text(
        t("donationReceipt.pdf.impactMessage"),
        pageWidth / 2,
        y,
        {
          align: "center",
        }
      );

      /* =====================================================
         BOTTOM LINE
         ===================================================== */

      doc.setDrawColor(...border);

      doc.setLineWidth(0.4);

      doc.line(
        margin + 15,
        pageHeight - 20,
        pageWidth - margin - 15,
        pageHeight - 20
      );

      /* =====================================================
         FILE NAME
         ===================================================== */

      const safeName =
        donorName
          .replace(
            /[^a-zA-Z0-9]/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          );

      /* =====================================================
         DOWNLOAD
         ===================================================== */

      doc.save(
        `Hanumant-Seva-Donation-Receipt-${safeName}-${receiptNumber}.pdf`
      );

    } catch (error) {
      console.error(
        "Receipt download error:",
        error
      );

      alert(
        t("donationReceipt.downloadError")
      );

    } finally {
      setDownloading(false);
    }
  };

  /* =========================================================
     WEBPAGE RECEIPT
     ========================================================= */

  return (
    <main className="receipt-page">

      <div className="container">

        <div className="receipt-card">

          {/* SUCCESS ICON */}

          <div className="receipt-success">

            <div className="receipt-success-icon">

              <CheckCircle
                size={27}
                strokeWidth={2.5}
              />

            </div>

          </div>

          {/* TITLE */}

          <h1>
            {t("donationReceipt.titleFirst")}{" "}
            <span>
              {t("donationReceipt.titleHighlight")}
            </span>
          </h1>

          {/* MESSAGE */}

          <p className="receipt-message">
            {t("donationReceipt.message")}
          </p>

          {/* DONOR NAME */}

          <div className="receipt-id">

            <span>
              {t("donationReceipt.donorName")}
            </span>

            <strong>
              {donorName}
            </strong>

          </div>

          {/* DONATION ID */}

          <div className="receipt-id">

            <span>
              {t("donationReceipt.donationId")}
            </span>

            <strong>
              {id || "N/A"}
            </strong>

          </div>

          {/* DETAILS */}

          <div className="receipt-details">

            <div>
              <span>
                {t("donationReceipt.amount")}
              </span>

              <strong>
                ₹{amount.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.contribution")}
              </span>

              <strong>
                {getFrequencyName()}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.campaign")}
              </span>

              <strong>
                {t("donationReceipt.foodSupport")}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.paymentMethod")}
              </span>

              <strong>
                {getPaymentMethodName()}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.paymentStatus")}
              </span>

              <strong className="success-text">
                {status === "SUCCESS"
                  ? t("donationReceipt.successful")
                  : status}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.receiptNumber")}
              </span>

              <strong>
                {receiptNumber}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.donationDate")}
              </span>

              <strong>
                {getFormattedDate()}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.transactionId")}
              </span>

              <strong>
                {transactionId}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.razorpayPaymentId")}
              </span>

              <strong>
                {paymentId}
              </strong>
            </div>

            <div>
              <span>
                {t("donationReceipt.razorpayOrderId")}
              </span>

              <strong>
                {orderId}
              </strong>
            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="receipt-actions">

          <button
            type="button"
            className="btn btn-primary"
            onClick={
              handleDownloadReceipt
            }
            disabled={downloading}
          >

            <Download size={18} />

            {downloading
              ? t("donationReceipt.generating")
              : t("donationReceipt.download")}

          </button>

          <Link
            to="/"
            className="btn btn-outline"
          >

            <Home size={18} />

            {t("donationReceipt.backHome")}

          </Link>

        </div>

      </div>

    </main>
  );
}

export default DonationReceipt;