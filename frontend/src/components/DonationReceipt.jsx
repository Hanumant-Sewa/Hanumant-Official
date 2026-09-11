import {
  CheckCircle,
  Download,
  Heart,
  Home,
} from "lucide-react";

import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

function DonationReceipt() {
  const { id } = useParams();
  const location = useLocation();

  const amount =
    location.state?.amount || 50;

  const frequency =
    location.state?.frequency ||
    "one-time";

  const paymentMethod =
    location.state?.paymentMethod ||
    "UPI";

  const status =
    location.state?.status ||
    "SUCCESS";

  const transactionId =
    location.state?.transactionId ||
    "N/A";

  const paymentId =
    location.state?.paymentId ||
    "N/A";

  const orderId =
    location.state?.orderId ||
    "N/A";

  const receiptNumber =
    location.state?.receiptNumber ||
    id ||
    "N/A";

  const getPaymentMethodName = () => {
    if (paymentMethod === "UPI") {
      return "UPI";
    }

    if (paymentMethod === "CARD") {
      return "Card";
    }

    if (paymentMethod === "NET_BANKING") {
      return "Net Banking";
    }

    if (paymentMethod === "upi") {
      return "UPI";
    }

    if (paymentMethod === "card") {
      return "Card";
    }

    if (paymentMethod === "netbanking") {
      return "Net Banking";
    }

    return paymentMethod;
  };

  return (
    <main className="receipt-page">

      <section className="internal-section">

        <div className="container">

          <div className="receipt-card">

            {/* =========================
                SUCCESS ICON
            ========================== */}

            <div className="receipt-success">

              <CheckCircle size={75} />

            </div>

            {/* =========================
                HEADER
            ========================== */}

            <h1>

              Thank You for Your{" "}

              <span>
                Contribution!
              </span>

            </h1>

            <p className="receipt-message">

              Your contribution has been recorded
              successfully. Thank you for supporting
              the work of Hanumant Seva.

            </p>

            {/* =========================
                DONATION ID
            ========================== */}

            <div className="receipt-id">

              <span>
                Donation ID
              </span>

              <strong>
                {id || "N/A"}
              </strong>

            </div>

            {/* =========================
                RECEIPT DETAILS
            ========================== */}

            <div className="receipt-details">

              {/* AMOUNT */}

              <div>

                <span>
                  Amount
                </span>

                <strong>
                  ₹{amount}
                </strong>

              </div>

              {/* FREQUENCY */}

              <div>

                <span>
                  Contribution
                </span>

                <strong>

                  {frequency === "monthly"
                    ? "Monthly"
                    : "One Time"}

                </strong>

              </div>

              {/* CAMPAIGN */}

              <div>

                <span>
                  Campaign
                </span>

                <strong>
                  Food Support
                </strong>

              </div>

              {/* PAYMENT METHOD */}

              <div>

                <span>
                  Payment Method
                </span>

                <strong>
                  {getPaymentMethodName()}
                </strong>

              </div>

              {/* PAYMENT STATUS */}

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

              {/* RECEIPT NUMBER */}

              <div>

                <span>
                  Receipt Number
                </span>

                <strong>
                  {receiptNumber}
                </strong>

              </div>

              {/* TRANSACTION ID */}

              <div>

                <span>
                  Transaction ID
                </span>

                <strong>
                  {transactionId}
                </strong>

              </div>

              {/* PAYMENT ID */}

              <div>

                <span>
                  Razorpay Payment ID
                </span>

                <strong>
                  {paymentId}
                </strong>

              </div>

              {/* ORDER ID */}

              <div>

                <span>
                  Razorpay Order ID
                </span>

                <strong>
                  {orderId}
                </strong>

              </div>

            </div>

            {/* =========================
                HEART
            ========================== */}

            <div className="receipt-heart">

              <Heart size={45} />

            </div>

            {/* =========================
                ACTIONS
            ========================== */}

            <div className="receipt-actions">

              <button
                className="btn btn-primary"
                onClick={() =>
                  window.print()
                }
              >

                <Download size={20} />

                Download Receipt

              </button>

              <Link
                to="/"
                className="btn btn-outline"
              >

                <Home size={20} />

                Back to Home

              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default DonationReceipt;