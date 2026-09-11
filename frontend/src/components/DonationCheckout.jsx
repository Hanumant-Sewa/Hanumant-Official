import {
  CheckCircle,
  Heart,
  ArrowRight,
} from "lucide-react";

<<<<<<< HEAD
import { Heart, CreditCard, Smartphone, Building2 } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
=======
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96

function DonationCheckout() {
  const location = useLocation();
  const navigate = useNavigate();

<<<<<<< HEAD
  // Get donation details from Donate.jsx
  const amount = location.state?.amount || 50;
  const frequency = location.state?.frequency || "monthly";

  const selectedPaymentMethod = location.state?.paymentMethod || "upi";

  const [paymentMethod, setPaymentMethod] = useState(selectedPaymentMethod);
=======
  const donation =
    location.state?.donation || {};

  const amount =
    location.state?.amount ||
    donation.amount ||
    0;

  const frequency =
    location.state?.frequency ||
    donation.frequency ||
    "one-time";

  const paymentMethod =
    location.state?.paymentMethod ||
    donation.paymentMethod ||
    "UPI";

  const status =
    location.state?.status ||
    donation.status ||
    "SUCCESS";
>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96

  const transactionId =
    location.state?.transactionId ||
    donation.transactionId ||
    "";

  const receiptNumber =
    location.state?.receiptNumber ||
    donation.receiptNumber ||
    "";

<<<<<<< HEAD
  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Get token if your login stores it
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/donations`,
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
        },
      );

      const data = await response.json();

      // =================================================
      // ERROR FROM BACKEND
      // =================================================

      if (!response.ok) {
        throw new Error(data.message || "Donation failed");
      }

      // =================================================
      // SUCCESS
      // =================================================

      console.log("Donation created successfully:", data);

      // Go to receipt page
      navigate(`/donate/receipt/${data.donation.id}`, {
        state: {
          amount: data.donation.amount,
          frequency: data.donation.frequency,
          paymentMethod: data.donation.paymentMethod,
          status: data.donation.status,
          transactionId: data.donation.transactionId,
          receiptNumber: data.donation.receiptNumber,
        },
      });
    } catch (error) {
      console.error("Donation Error:", error);

      setError(
        error.message || "Something went wrong while processing the donation.",
      );
    } finally {
      setLoading(false);
=======
  const handleViewReceipt = () => {
    if (!donation.id) {
      navigate("/donate");
      return;
>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96
    }

    navigate(
      `/donate/receipt/${donation.id}`,
      {
        state: {
          amount,
          frequency,
          paymentMethod,
          status,
          transactionId,
          receiptNumber,
          paymentId:
            location.state?.paymentId ||
            donation.paymentId ||
            "",
          orderId:
            location.state?.orderId ||
            donation.orderId ||
            "",
          donatedAt:
            location.state?.donatedAt ||
            donation.donatedAt ||
            "",
        },
      }
    );
  };

  return (
    <main className="checkout-page">
      <section className="internal-section">
        <div className="checkout-container">
          <div className="checkout-card">
<<<<<<< HEAD
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="checkout-header">
              <div className="checkout-heart">
                <Heart size={45} />
              </div>

              <h1>
                Complete Your <span>Contribution</span>
              </h1>

              <p>
                Thank you for supporting Hanumat Seva. Please confirm your
                contribution details below.
=======

            {/* SUCCESS ICON */}

            <div className="checkout-heart">
              <CheckCircle size={65} />
            </div>

            {/* HEADER */}

            <div className="checkout-header">

              <h1>
                Payment <span>Successful</span>
              </h1>

              <p>
                Thank you for supporting
                Hanumant Seva Foundation.
>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96
              </p>
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

<<<<<<< HEAD
            <div className="payment-section">
              <h3>Select Payment Method</h3>

              <div className="payment-methods">
                {/* UPI */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod === "upi" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <Smartphone size={20} />
                  UPI
                </button>

                {/* CARD */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard size={20} />
                  Card
                </button>

                {/* NET BANKING */}

                <button
                  type="button"
                  className={`payment-method ${
                    paymentMethod === "netbanking" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("netbanking")}
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
=======
            <div className="selected-payment">

              Payment Method:{" "}

              <strong>
                {paymentMethod === "UPI"
                  ? "UPI"
                  : paymentMethod === "CARD"
                  ? "Card"
                  : paymentMethod ===
                    "NET_BANKING"
                  ? "Net Banking"
                  : paymentMethod}
              </strong>

>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96
            </div>

            <div className="selected-payment">

              Payment Status:{" "}

              <strong>
                {status === "SUCCESS"
                  ? "Successful"
                  : status}
              </strong>

            </div>

            {transactionId && (
              <div className="selected-payment">

                Transaction ID:{" "}

                <strong>
                  {transactionId}
                </strong>

<<<<<<< HEAD
            {error && <div className="checkout-error">{error}</div>}
=======
              </div>
            )}
>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96

            {receiptNumber && (
              <div className="selected-payment">

                Receipt Number:{" "}

                <strong>
                  {receiptNumber}
                </strong>

              </div>
            )}

            {/* ACTION */}

            <div className="checkout-actions">
              <button
                type="button"
                className="checkout-pay-button"
                onClick={handleViewReceipt}
              >
<<<<<<< HEAD
                {loading ? "Processing..." : `Confirm Donation ₹${amount}`}
=======

                <Heart size={18} />

                View Donation Receipt

                <ArrowRight size={18} />

>>>>>>> f8f2faeb5da95bcb915c5b3b7b7b5655a218be96
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DonationCheckout;
