import { useState } from "react";

import {Heart,CreditCard,Smartphone,Building2,} from "lucide-react";

import {useLocation,useNavigate,} from "react-router-dom";

function DonationCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get donation details from Donate.jsx
  const amount = location.state?.amount || 50;
  const frequency =
    location.state?.frequency || "monthly";

  const selectedPaymentMethod =
    location.state?.paymentMethod || "upi";

  const [paymentMethod, setPaymentMethod] =
    useState(selectedPaymentMethod);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // CREATE DONATION
  // =====================================================

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Get token if your login stores it
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/donations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },

          // Important because your login uses HTTP-only cookie
          credentials: "include",

          body: JSON.stringify({
            amount: Number(amount),
            frequency: frequency,
            paymentMethod: paymentMethod,
          }),
        }
      );

      const data = await response.json();

      // =================================================
      // ERROR FROM BACKEND
      // =================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Donation failed"
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "Donation created successfully:",
        data
      );

      // Go to receipt page
      navigate(
        `/donate/receipt/${data.donation.id}`,
        {
          state: {
            amount: data.donation.amount,
            frequency: data.donation.frequency,
            paymentMethod:
              data.donation.paymentMethod,
            status: data.donation.status,
            transactionId:
              data.donation.transactionId,
            receiptNumber:
              data.donation.receiptNumber,
          },
        }
      );
    } catch (error) {
      console.error(
        "Donation Error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong while processing the donation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">

      <section className="internal-section">

        <div className="checkout-container">

          <div className="checkout-card">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="checkout-header">

              <div className="checkout-heart">
                <Heart size={45} />
              </div>

              <h1>
                Complete Your{" "}
                <span>Contribution</span>
              </h1>

              <p>
                Thank you for supporting
                Hanumat Seva. Please confirm
                your contribution details below.
              </p>

            </div>

            {/* =================================================
                DONATION SUMMARY
            ================================================= */}

            <div className="checkout-summary">

              <div className="checkout-summary-box">

                <span>
                  Donation Amount
                </span>

                <strong>
                  ₹{amount}
                </strong>

              </div>

              <div className="checkout-summary-box">

                <span>
                  Contribution
                </span>

                <strong>
                  {frequency === "monthly"
                    ? "Monthly"
                    : "One Time"}
                </strong>

              </div>

            </div>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <div className="payment-section">

              <h3>
                Select Payment Method
              </h3>

              <div className="payment-methods">

                {/* UPI */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod === "upi"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                >
                  <Smartphone size={20} />
                  UPI
                </button>

                {/* CARD */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod === "card"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                >
                  <CreditCard size={20} />
                  Card
                </button>

                {/* NET BANKING */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod ===
                    "netbanking"
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod(
                      "netbanking"
                    )
                  }
                >
                  <Building2 size={20} />
                  Net Banking
                </button>

              </div>

              {/* SELECTED PAYMENT */}

              <div className="selected-payment">

                Selected Payment Method:{" "}

                <strong>
                  {paymentMethod === "upi"
                    ? "UPI"
                    : paymentMethod === "card"
                    ? "Card"
                    : "Net Banking"}
                </strong>

              </div>

            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (
              <div className="checkout-error">
                {error}
              </div>
            )}

            {/* =================================================
                CONFIRM DONATION
            ================================================= */}

            <div className="checkout-actions">

              <button
                type="button"
                className="checkout-pay-button"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Confirm Donation ₹${amount}`}
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default DonationCheckout;