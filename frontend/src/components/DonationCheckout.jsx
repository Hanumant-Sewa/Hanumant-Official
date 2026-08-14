import {
  CheckCircle,
  Download,
  Heart,
  Home
} from "lucide-react";

import {
  Link,
  useLocation,
  useParams
} from "react-router-dom";

function DonationReceipt() {

  const { id } = useParams();
  const location = useLocation();

  const amount = location.state?.amount || 50;
  const frequency = location.state?.frequency || "monthly";

  return (
    <main className="receipt-page">

      <section className="internal-section">

        <div className="container">

          <div className="receipt-card">

            <div className="receipt-success">

              <CheckCircle size={75} />

            </div>

            <h1>
              Thank You for Your <span>Contribution!</span>
            </h1>

            <p className="receipt-message">
              Your contribution has been recorded successfully.
              Thank you for supporting the work of Hanumat Seva.
            </p>

            <div className="receipt-id">

              <span>
                Donation ID
              </span>

              <strong>
                {id || "HS20260001"}
              </strong>

            </div>

            <div className="receipt-details">

              <div>
                <span>
                  Amount
                </span>

                <strong>
                  ₹{amount}
                </strong>
              </div>

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
                  Payment Status
                </span>

                <strong className="success-text">
                  Successful
                </strong>
              </div>

            </div>

            <div className="receipt-heart">
              <Heart size={45} />
            </div>

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