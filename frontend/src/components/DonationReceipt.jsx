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
import jsPDF from "jspdf";

import "../css/DonationReceipt.css";


function DonationReceipt() {
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
      return "Card";
    }

    if (
      paymentMethod === "NET_BANKING" ||
      paymentMethod === "netbanking"
    ) {
      return "Net Banking";
    }

    return paymentMethod;
  };


  /* =========================================================
     FREQUENCY
     ========================================================= */

  const getFrequencyName = () => {
    if (frequency === "monthly") {
      return "Monthly";
    }

    return "One Time";
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
        "DONATION RECEIPT",
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
        "Receipt Information",
        margin + 5,
        y
      );

      y += 6;

      /*
        Three small columns
      */

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
        "Receipt Number",
        column1,
        y
      );

      doc.text(
        "Donation ID",
        column2,
        y
      );

      doc.text(
        "Date",
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
        "Donor Information",
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
        "Name",
        margin + 10,
        y + 9
      );

      doc.text(
        "Email",
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
        "Donation Details",
        margin + 5,
        y
      );

      y += 6;

      /*
        Table header
      */

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
        "DETAIL",
        margin + 9,
        y + 1
      );

      doc.text(
        "INFORMATION",
        pageWidth - margin - 55,
        y + 1
      );


      /* =====================================================
         DONATION ROWS
         ===================================================== */

      const donationRows = [
        [
          "Amount",
          `INR ${amount.toFixed(2)}`,
        ],
        [
          "Contribution",
          getFrequencyName(),
        ],
        [
          "Campaign",
          "Food Support",
        ],
        [
          "Payment Method",
          getPaymentMethodName(),
        ],
        [
          "Payment Status",
          status === "SUCCESS"
            ? "Successful"
            : status,
        ],
        [
          "Donation Date",
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

          /*
            Alternate background
          */

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
            "Payment Status"
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
        "Payment Information",
        margin + 5,
        y
      );

      y += 6;


      const paymentRows = [
        [
          "Transaction ID",
          transactionId,
        ],
        [
          "Razorpay Payment ID",
          paymentId,
        ],
        [
          "Razorpay Order ID",
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

          /*
            Keep long IDs inside the page
          */

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
        "TOTAL DONATION",
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
        "Thank you for supporting Hanumant Seva Foundation.",
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
        "Your contribution helps us serve people and communities in need.",
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
        "Unable to generate receipt. Please try again."
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
            Thank You for Your{" "}
            <span>Contribution!</span>
          </h1>


          {/* MESSAGE */}

          <p className="receipt-message">
            Your contribution has been recorded
            successfully. Thank you for supporting
            the work of Hanumant Seva Foundation.
          </p>


          {/* DONOR NAME */}

          <div className="receipt-id">

            <span>
              Donor Name
            </span>

            <strong>
              {donorName}
            </strong>

          </div>


          {/* DONATION ID */}

          <div className="receipt-id">

            <span>
              Donation ID
            </span>

            <strong>
              {id || "N/A"}
            </strong>

          </div>


          {/* DETAILS */}

          <div className="receipt-details">

            <div>

              <span>
                Amount
              </span>

              <strong>
                ₹{amount.toFixed(2)}
              </strong>

            </div>


            <div>

              <span>
                Contribution
              </span>

              <strong>
                {getFrequencyName()}
              </strong>

            </div>


            <div>

              <span>
                Campaign
              </span>

              <strong>
                Food Support
              </strong>

            </div>


            <div>

              <span>
                Payment Method
              </span>

              <strong>
                {getPaymentMethodName()}
              </strong>

            </div>


            <div>

              <span>
                Payment Status
              </span>

              <strong className="success-text">
                {status === "SUCCESS"
                  ? "Successful"
                  : status}
              </strong>

            </div>


            <div>

              <span>
                Receipt Number
              </span>

              <strong>
                {receiptNumber}
              </strong>

            </div>


            <div>

              <span>
                Donation Date
              </span>

              <strong>
                {getFormattedDate()}
              </strong>

            </div>


            <div>

              <span>
                Transaction ID
              </span>

              <strong>
                {transactionId}
              </strong>

            </div>


            <div>

              <span>
                Razorpay Payment ID
              </span>

              <strong>
                {paymentId}
              </strong>

            </div>


            <div>

              <span>
                Razorpay Order ID
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

            <Download
              size={18}
            />

            {downloading
              ? "Generating Receipt..."
              : "Download Receipt"}

          </button>


          <Link
            to="/"
            className="btn btn-outline"
          >

            <Home
              size={18}
            />

            Back to Home

          </Link>

        </div>

      </div>

    </main>
  );
}


export default DonationReceipt;