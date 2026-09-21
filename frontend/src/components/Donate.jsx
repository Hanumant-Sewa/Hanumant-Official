import {
  Heart,
  Check,
  Smartphone,
  CreditCard,
  Building2,
  Lock,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Donate() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [amount, setAmount] = useState(50);
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const amounts = [
    {
      value: 50,
      title: t("donate.amounts.support1"),
    },
    {
      value: 100,
      title: t("donate.amounts.support2"),
    },
    {
      value: 250,
      title: t("donate.amounts.support5"),
    },
    {
      value: 500,
      title: t("donate.amounts.support10"),
    },
  ];

  // ==========================================
  // LOAD RAZORPAY CHECKOUT
  // ==========================================

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // ==========================================
  // CREATE ORDER + OPEN RAZORPAY
  // ==========================================

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) < 50) {
      alert(t("donate.alerts.minimumAmount"));
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // LOAD RAZORPAY
      // ========================================

      const razorpayLoaded =
        await loadRazorpayScript();

      if (!razorpayLoaded) {
        alert(
          t("donate.alerts.razorpayLoadFailed"),
        );

        setLoading(false);
        return;
      }

      // ========================================
      // CREATE ORDER
      // ========================================

      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/donations/create-order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            amount: Number(amount),
            frequency,
            paymentMethod,
          }),
        },
      );

      // ========================================
      // CHECK RESPONSE TYPE
      // ========================================

      const contentType =
        orderResponse.headers.get("content-type");

      if (
        !contentType?.includes("application/json")
      ) {
        const text = await orderResponse.text();

        console.error(
          "Backend returned non-JSON response:",
          text,
        );

        throw new Error(
          t("donate.alerts.invalidBackendResponse"),
        );
      }

      const orderData =
        await orderResponse.json();

      console.log(
        "Create Order Response:",
        orderData,
      );

      // ========================================
      // CHECK ORDER RESPONSE
      // ========================================

      if (
        !orderResponse.ok ||
        !orderData.success
      ) {
        alert(
          orderData.message ||
            t("donate.alerts.orderFailed"),
        );

        setLoading(false);
        return;
      }

      // ========================================
      // RAZORPAY OPTIONS
      // ========================================

      const options = {
        key: orderData.keyId,

        amount: orderData.order.amount,

        currency: orderData.order.currency,

        name: "Hanumant Seva Foundation",

        description: "Food Support Donation",

        order_id: orderData.order.id,

        method: paymentMethod,

        // ======================================
        // CUSTOMER DETAILS
        // ======================================

        prefill: {
          name: orderData.user?.name || "",

          email: orderData.user?.email || "",

          contact: orderData.user?.phone || "",
        },

        // ======================================
        // NOTES
        // ======================================

        notes: {
          donationId: String(
            orderData.donation.id,
          ),

          frequency,

          paymentMethod,
        },

        // ======================================
        // THEME
        // ======================================

        theme: {
          color: "#D97706",
        },

        // ======================================
        // PAYMENT SUCCESS
        // ======================================

        handler: async function (response) {
          console.log(
            "Razorpay Payment Response:",
            response,
          );

          try {
            // ==================================
            // VERIFY PAYMENT
            // ==================================

            const verifyResponse =
              await fetch(
                `${import.meta.env.VITE_API_URL}/api/donations/verify-payment`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  credentials: "include",

                  body: JSON.stringify({
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    donationId:
                      orderData.donation.id,
                  }),
                },
              );

            // ==================================
            // CHECK RESPONSE TYPE
            // ==================================

            const verifyContentType =
              verifyResponse.headers.get(
                "content-type",
              );

            if (
              !verifyContentType?.includes(
                "application/json",
              )
            ) {
              const text =
                await verifyResponse.text();

              console.error(
                "Verification returned non-JSON:",
                text,
              );

              throw new Error(
                t("donate.alerts.invalidVerificationResponse"),
              );
            }

            const verifyData =
              await verifyResponse.json();

            console.log(
              "Payment Verification Response:",
              verifyData,
            );

            // ==================================
            // CHECK VERIFICATION
            // ==================================

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {
              alert(
                verifyData.message ||
                  t("donate.alerts.verificationFailed"),
              );

              setLoading(false);
              return;
            }

            // ==================================
            // PAYMENT SUCCESS
            // ==================================

            alert(
              t("donate.alerts.donationSuccessful"),
            );

            // ==================================
            // GO TO RECEIPT
            // ==================================

            navigate(
              `/donate/receipt/${verifyData.donation.id}`,
              {
                state: {
                  // ==============================
                  // DONOR DETAILS
                  // ==============================

                  donorName:
                    verifyData.donation
                      .donorName ||
                    orderData.user?.name ||
                    "Donor",

                  donorEmail:
                    verifyData.donation
                      .donorEmail ||
                    orderData.user?.email ||
                    "",

                  donorPhone:
                    verifyData.donation
                      .donorPhone ||
                    orderData.user?.phone ||
                    "",

                  // ==============================
                  // DONATION DETAILS
                  // ==============================

                  amount: Number(
                    verifyData.donation.amount,
                  ),

                  frequency:
                    verifyData.donation
                      .frequency,

                  paymentMethod:
                    verifyData.donation
                      .paymentMethod,

                  status:
                    verifyData.donation
                      .status,

                  // ==============================
                  // PAYMENT DETAILS
                  // ==============================

                  transactionId:
                    verifyData.donation
                      .transactionId,

                  paymentId:
                    verifyData.donation
                      .paymentId,

                  orderId:
                    verifyData.donation
                      .orderId,

                  // ==============================
                  // RECEIPT DETAILS
                  // ==============================

                  receiptNumber:
                    verifyData.donation
                      .receiptNumber,

                  donatedAt:
                    verifyData.donation
                      .donatedAt,

                  donationId:
                    verifyData.donation.id,
                },
              },
            );
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error,
            );

            alert(
              t("donate.alerts.paymentVerificationContact"),
            );
          } finally {
            setLoading(false);
          }
        },

        // ========================================
        // PAYMENT MODAL CLOSED
        // ========================================

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed.",
            );

            setLoading(false);
          },
        },
      };

      // ========================================
      // CHECK RAZORPAY
      // ========================================

      if (!window.Razorpay) {
        throw new Error(
          t("donate.alerts.razorpayUnavailable"),
        );
      }

      // ========================================
      // CREATE RAZORPAY INSTANCE
      // ========================================

      const razorpay =
        new window.Razorpay(options);

      // ========================================
      // PAYMENT FAILED
      // ========================================

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay Payment Failed:",
            response.error,
          );

          alert(
            response.error?.description ||
              t("donate.alerts.paymentFailed"),
          );

          setLoading(false);
        },
      );

      // ========================================
      // OPEN RAZORPAY
      // ========================================

      razorpay.open();
    } catch (error) {
      console.error(
        "Donation Payment Error:",
        error,
      );

      alert(
        error.message ||
          t("donate.alerts.paymentStartFailed"),
      );

      setLoading(false);
    }
  };

  return (
    <main className="donate-page">

      {/* PAGE HEADER */}

      <section className="internal-hero">
        <div className="container">

          <span className="section-badge">
            {t("donate.header.badge")}
          </span>

          <h1>
            {t("donate.header.titleFirst")}{" "}
            <span>{t("donate.header.titleHighlight")}</span>
          </h1>

          <p>
            {t("donate.header.description")}
          </p>

        </div>
      </section>

      {/* DONATION CONTENT */}

      <section className="donation-section">

        <div className="donation-container">

          {/* LEFT SIDE */}

          <aside className="donation-summary">

            <span className="summary-label">
              {t("donate.summary.contribution")}
            </span>

            <strong className="summary-amount">
              ₹{amount || 0}
            </strong>

            <div className="summary-line">
              <span>
                {t("donate.summary.contributionLabel")}
              </span>

              <b>
                {frequency === "monthly"
                  ? t("donate.frequency.monthly")
                  : t("donate.frequency.oneTime")}
              </b>
            </div>

            <div className="summary-line">
              <span>
                {t("donate.summary.paymentLabel")}
              </span>

              <b>
                {paymentMethod === "upi"
                  ? "UPI"
                  : paymentMethod === "card"
                  ? t("donate.paymentMethods.card")
                  : t("donate.paymentMethods.netBanking")}
              </b>
            </div>

            <div className="summary-line">
              <span>
                {t("donate.summary.purposeLabel")}
              </span>

              <b>
                {t("donate.summary.purpose")}
              </b>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-icon">
              <Heart size={28} />
            </div>

            <h3>
              {t("donate.summary.impactFirst")}
              <span>
                {t("donate.summary.impactSecond")}
              </span>
            </h3>

            <p>
              {t("donate.summary.description")}
            </p>

            <div className="summary-security">

              <Lock size={15} />

              <div>
                <strong>
                  {t("donate.security.title")}
                </strong>

                <span>
                  {t("donate.security.description")}
                </span>
              </div>

            </div>

          </aside>

          {/* RIGHT SIDE */}

          <div className="donation-left">

            <div className="donation-header">

              <h2>
                {t("donate.header.titleFirst")}{" "}
                <span>
                  {t("donate.header.titleHighlight")}
                </span>
              </h2>

              <p>
                {t("donate.header.shortDescription")}
              </p>

            </div>

            {/* CONTRIBUTION TYPE */}

            <div className="contribution-type">

              <button
                type="button"
                className={
                  frequency === "one-time"
                    ? "frequency-button active"
                    : "frequency-button"
                }
                onClick={() =>
                  setFrequency("one-time")
                }
              >
                {t("donate.frequency.oneTime")}
              </button>

              <button
                type="button"
                className={
                  frequency === "monthly"
                    ? "frequency-button active"
                    : "frequency-button"
                }
                onClick={() =>
                  setFrequency("monthly")
                }
              >
                {t("donate.frequency.monthly")}
              </button>

            </div>

            {/* AMOUNT SECTION */}

            <div className="amount-section">

              <h3>
                {t("donate.amounts.title")}
              </h3>

              <div className="donation-options">

                {amounts.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={
                      amount === item.value
                        ? "donation-card selected"
                        : "donation-card"
                    }
                    onClick={() =>
                      setAmount(item.value)
                    }
                  >

                    {amount === item.value && (
                      <Check
                        className="donation-check"
                        size={16}
                      />
                    )}

                    <Heart size={21} />

                    <strong>
                      ₹{item.value}
                    </strong>

                    <span>
                      {item.title}
                    </span>

                  </button>
                ))}

              </div>

              {/* CUSTOM AMOUNT */}

              <div className="custom-donation">

                <label>
                  {t("donate.customAmount.label")}
                </label>

                <div className="amount-input">

                  <span>₹</span>

                  <input
                    type="number"
                    min="50"
                    max="1000000"
                    value={amount}
                    onChange={(e) => {

                      const value =
                        e.target.value;

                      if (value === "") {
                        setAmount("");
                        return;
                      }

                      const numberValue =
                        Number(value);

                      if (
                        numberValue >= 50 &&
                        numberValue <= 1000000
                      ) {
                        setAmount(numberValue);
                      }

                    }}
                  />

                </div>

                <small>
                  {t("donate.customAmount.range")}
                </small>

              </div>

            </div>

            {/* PAYMENT SECTION */}

            <div className="payment-section">

              <div className="payment-title">

                <div>

                  <h3>
                    {t("donate.payment.title")}
                  </h3>

                  <p>
                    {t("donate.payment.description")}
                  </p>

                </div>

                <span className="secure-payment">

                  <Lock size={14} />

                  {t("donate.payment.secure")}

                </span>

              </div>

              {/* PAYMENT METHODS */}

              <div className="payment-methods">

                <button
                  type="button"
                  className={
                    paymentMethod === "upi"
                      ? "payment-method active"
                      : "payment-method"
                  }
                  onClick={() =>
                    setPaymentMethod("upi")
                  }
                >
                  <Smartphone size={19} />
                  UPI
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "card"
                      ? "payment-method active"
                      : "payment-method"
                  }
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                >
                  <CreditCard size={19} />
                  {t("donate.paymentMethods.card")}
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "netbanking"
                      ? "payment-method active"
                      : "payment-method"
                  }
                  onClick={() =>
                    setPaymentMethod("netbanking")
                  }
                >
                  <Building2 size={19} />
                  {t("donate.paymentMethods.netBanking")}
                </button>

              </div>

              {/* PAYMENT INFORMATION */}

              <div className="payment-form">

                <div className="form-group">

                  <label>
                    {t("donate.paymentInfo.label")}
                  </label>

                  <div className="payment-input">

                    {paymentMethod === "upi" && (
                      <Smartphone size={18} />
                    )}

                    {paymentMethod === "card" && (
                      <CreditCard size={18} />
                    )}

                    {paymentMethod === "netbanking" && (
                      <Building2 size={18} />
                    )}

                    <span>
                      {paymentMethod === "upi"
                        ? t("donate.paymentInfo.upi")
                        : paymentMethod === "card"
                        ? t("donate.paymentInfo.card")
                        : t("donate.paymentInfo.netBanking")}
                    </span>

                  </div>

                  <small>
                    {t("donate.paymentInfo.secureDetails")}
                  </small>

                </div>

                {/* CONTINUE BUTTON */}

                <button
                  type="button"
                  className="btn btn-primary payment-submit"
                  onClick={handleContinue}
                  disabled={loading}
                >

                  <Heart size={18} />

                  {loading
                    ? t("donate.payment.opening")
                    : t("donate.payment.continue")}

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Donate;