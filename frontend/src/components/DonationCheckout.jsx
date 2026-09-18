import { CheckCircle, Heart, ArrowRight } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function DonationCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  const donation = location.state?.donation || {};

  const amount = location.state?.amount || donation.amount || 0;

  const frequency =
    location.state?.frequency || donation.frequency || "one-time";

  const paymentMethod =
    location.state?.paymentMethod || donation.paymentMethod || "UPI";

  const status = location.state?.status || donation.status || "SUCCESS";

  const transactionId =
    location.state?.transactionId || donation.transactionId || "";

  const receiptNumber =
    location.state?.receiptNumber || donation.receiptNumber || "";

  const handleViewReceipt = () => {
    if (!donation.id) {
      navigate("/donate");
      return;
    }

    navigate(`/donate/receipt/${donation.id}`, {
      state: {
        amount,
        frequency,
        paymentMethod,
        status,
        transactionId,
        receiptNumber,
        paymentId: location.state?.paymentId || donation.paymentId || "",
        orderId: location.state?.orderId || donation.orderId || "",
        donatedAt: location.state?.donatedAt || donation.donatedAt || "",
      },
    });
  };

  return (
    <main className="checkout-page">
      <section className="internal-section">
        <div className="checkout-container">
          <div className="checkout-card">
            {/* SUCCESS ICON */}

            <div className="checkout-heart">
              <CheckCircle size={65} />
            </div>

            {/* HEADER */}

            <div className="checkout-header">
              <h1>
                Payment <span>Successful</span>
              </h1>

              <p>Thank you for supporting Hanumant Seva Foundation.</p>
            </div>

            {/* DONATION SUMMARY */}

            <div className="checkout-summary">
              <div className="checkout-summary-box">
                <span>Donation Amount</span>

                <strong>₹{amount}</strong>
              </div>

              <div className="checkout-summary-box">
                <span>Contribution</span>

                <strong>
                  {frequency === "monthly" ? "Monthly" : "One Time"}
                </strong>
              </div>
            </div>

            {/* PAYMENT DETAILS */}

            <div className="selected-payment">
              Payment Method:{" "}
              <strong>
                {paymentMethod === "UPI"
                  ? "UPI"
                  : paymentMethod === "CARD"
                    ? "Card"
                    : paymentMethod === "NET_BANKING"
                      ? "Net Banking"
                      : paymentMethod}
              </strong>
            </div>

            <div className="selected-payment">
              Payment Status:{" "}
              <strong>{status === "SUCCESS" ? "Successful" : status}</strong>
            </div>

            {transactionId && (
              <div className="selected-payment">
                Transaction ID: <strong>{transactionId}</strong>
              </div>
            )}

            {receiptNumber && (
              <div className="selected-payment">
                Receipt Number: <strong>{receiptNumber}</strong>
              </div>
            )}

            {/* ACTION */}

            <div className="checkout-actions">
              <button
                type="button"
                className="checkout-pay-button"
                onClick={handleViewReceipt}
              >
                <Heart size={18} />
                View Donation Receipt
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DonationCheckout;
