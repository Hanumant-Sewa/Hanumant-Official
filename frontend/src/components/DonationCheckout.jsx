import { CheckCircle, Heart, ArrowRight } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DonationCheckout() {
  const { t } = useTranslation();

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
                {t("donationCheckout.titleFirst")}{" "}
                <span>
                  {t("donationCheckout.titleHighlight")}
                </span>
              </h1>

              <p>
                {t("donationCheckout.thankYou")}
              </p>
            </div>

            {/* DONATION SUMMARY */}

            <div className="checkout-summary">
              <div className="checkout-summary-box">
                <span>
                  {t("donationCheckout.amount")}
                </span>

                <strong>₹{amount}</strong>
              </div>

              <div className="checkout-summary-box">
                <span>
                  {t("donationCheckout.contribution")}
                </span>

                <strong>
                  {frequency === "monthly"
                    ? t("donationCheckout.monthly")
                    : t("donationCheckout.oneTime")}
                </strong>
              </div>
            </div>

            {/* PAYMENT DETAILS */}

            <div className="selected-payment">
              {t("donationCheckout.paymentMethod")}:{" "}
              <strong>
                {paymentMethod === "UPI"
                  ? "UPI"
                  : paymentMethod === "CARD"
                    ? t("donationCheckout.card")
                    : paymentMethod === "NET_BANKING"
                      ? t("donationCheckout.netBanking")
                      : paymentMethod}
              </strong>
            </div>

            <div className="selected-payment">
              {t("donationCheckout.paymentStatus")}:{" "}
              <strong>
                {status === "SUCCESS"
                  ? t("donationCheckout.successful")
                  : status}
              </strong>
            </div>

            {transactionId && (
              <div className="selected-payment">
                {t("donationCheckout.transactionId")}:{" "}
                <strong>{transactionId}</strong>
              </div>
            )}

            {receiptNumber && (
              <div className="selected-payment">
                {t("donationCheckout.receiptNumber")}:{" "}
                <strong>{receiptNumber}</strong>
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

                {t("donationCheckout.viewReceipt")}

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