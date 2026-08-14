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

function Donate() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(50);
  const [frequency, setFrequency] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const amounts = [
    {
      value: 50,
      title: "Support 1 Person",
    },
    {
      value: 100,
      title: "Support 2 People",
    },
    {
      value: 250,
      title: "Support 5 People",
    },
    {
      value: 500,
      title: "Support 10 People",
    },
  ];

  const handleContinue = (e) => {
    e.preventDefault();

    navigate("/donate/checkout", {
      state: {
        amount,
        frequency,
        paymentMethod,
      },
    });
  };

  return (
    <main className="donate-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="internal-hero">

        <div className="container">

          <span className="section-badge">
            Make a Difference
          </span>

          <h1>
            Choose Your <span>Impact</span>
          </h1>

          <p>
            Choose the amount you are comfortable contributing.
            Every contribution makes a difference.
          </p>

        </div>

      </section>


      {/* =========================
          DONATION CONTENT
      ========================== */}

      <section className="donation-section">

        <div className="donation-container">


          {/* =========================
              LEFT SIDE
              YOUR CONTRIBUTION
          ========================== */}

          <aside className="donation-summary">

            <span className="summary-label">
              YOUR CONTRIBUTION
            </span>

            <strong className="summary-amount">
              ₹{amount || 0}
            </strong>


            <div className="summary-line">

              <span>
                Contribution
              </span>

              <b>
                {frequency === "monthly"
                  ? "Monthly"
                  : "One Time"}
              </b>

            </div>


            <div className="summary-line">

              <span>
                Payment
              </span>

              <b>
                {paymentMethod === "upi"
                  ? "UPI"
                  : paymentMethod === "card"
                  ? "Card"
                  : "Net Banking"}
              </b>

            </div>


            <div className="summary-line">

              <span>
                Purpose
              </span>

              <b>
                Food Support
              </b>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-icon">
              <Heart size={28} />
            </div>


            <h3>
              Your support creates
              <span> meaningful impact.</span>
            </h3>


            <p>
              Your contribution helps support food-related
              service activities and community initiatives.
            </p>


            <div className="summary-security">

              <Lock size={15} />

              <div>

                <strong>
                  Secure Contribution
                </strong>

                <span>
                  Your payment information is protected.
                </span>

              </div>

            </div>

          </aside>


          {/* =========================
              RIGHT SIDE
              MAIN CONTRIBUTION
          ========================== */}

          <div className="donation-left">


            {/* DONATION HEADER */}

            <div className="donation-header">

              <h2>
                Choose Your <span>Impact</span>
              </h2>

              <p>
                Choose the amount you are comfortable contributing.
              </p>

            </div>


            {/* =========================
                CONTRIBUTION TYPE
            ========================== */}

            <div className="contribution-type">

              <button
                type="button"
                className={
                  frequency === "one-time"
                    ? "frequency-button active"
                    : "frequency-button"
                }
                onClick={() => setFrequency("one-time")}
              >
                One Time
              </button>


              <button
                type="button"
                className={
                  frequency === "monthly"
                    ? "frequency-button active"
                    : "frequency-button"
                }
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </button>

            </div>


            {/* =========================
                AMOUNT SECTION
            ========================== */}

            <div className="amount-section">

              <h3>
                Select Contribution Amount
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
                    onClick={() => setAmount(item.value)}
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


              {/* =========================
                  CUSTOM AMOUNT
              ========================== */}

              <div className="custom-donation">

                <label>
                  Custom Amount
                </label>


                <div className="amount-input">

                  <span>
                    ₹
                  </span>


                  <input
                    type="number"
                    min="50"
                    max="1000000"
                    value={amount}
                    onChange={(e) => {

                      const value = e.target.value;

                      if (value === "") {
                        setAmount("");
                        return;
                      }

                      const numberValue = Number(value);

                      if (numberValue >= 50) {
                        setAmount(numberValue);
                      }

                    }}
                  />

                </div>


                <small>
                  Choose an amount from ₹50 to ₹10,00,000.
                </small>

              </div>

            </div>


            {/* =========================
                PAYMENT SECTION
            ========================== */}

            <div className="payment-section">


              <div className="payment-title">

                <div>

                  <h3>
                    Payment Details
                  </h3>

                  <p>
                    Choose your preferred payment method.
                  </p>

                </div>


                <span className="secure-payment">

                  <Lock size={14} />

                  Secure Payment

                </span>

              </div>


              {/* =========================
                  PAYMENT METHODS
              ========================== */}

              <div className="payment-methods">


                {/* UPI */}

                <button
                  type="button"
                  className={
                    paymentMethod === "upi"
                      ? "payment-method active"
                      : "payment-method"
                  }
                  onClick={() => setPaymentMethod("upi")}
                >

                  <Smartphone size={19} />

                  UPI

                </button>


                {/* CARD */}

                <button
                  type="button"
                  className={
                    paymentMethod === "card"
                      ? "payment-method active"
                      : "payment-method"
                  }
                  onClick={() => setPaymentMethod("card")}
                >

                  <CreditCard size={19} />

                  Card

                </button>


                {/* NET BANKING */}

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

                  Net Banking

                </button>

              </div>


              {/* =========================
                  PAYMENT FORM
              ========================== */}

              <form
                className="payment-form"
                onSubmit={handleContinue}
              >


                {/* =====================
                    UPI FORM
                ====================== */}

                {paymentMethod === "upi" && (

                  <div className="form-group">

                    <label>
                      UPI ID
                    </label>


                    <div className="payment-input">

                      <Smartphone size={18} />

                      <input
                        type="text"
                        placeholder="example@upi"
                        required
                      />

                    </div>


                    <small>
                      Enter your registered UPI ID.
                    </small>

                  </div>

                )}


                {/* =====================
                    CARD FORM
                ====================== */}

                {paymentMethod === "card" && (

                  <>

                    <div className="form-group">

                      <label>
                        Card Number
                      </label>


                      <div className="payment-input">

                        <CreditCard size={18} />

                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />

                      </div>

                    </div>


                    <div className="card-row">

                      <div className="form-group">

                        <label>
                          Expiry Date
                        </label>


                        <div className="payment-input">

                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />

                        </div>

                      </div>


                      <div className="form-group">

                        <label>
                          CVV
                        </label>


                        <div className="payment-input">

                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength="3"
                            required
                          />

                        </div>

                      </div>

                    </div>

                  </>

                )}


                {/* =====================
                    NET BANKING FORM
                ====================== */}

                {paymentMethod === "netbanking" && (

                  <div className="form-group">

                    <label>
                      Select Your Bank
                    </label>


                    <div className="payment-input">

                      <Building2 size={18} />


                      <select
                        required
                        defaultValue=""
                      >

                        <option
                          value=""
                          disabled
                        >
                          Select your bank
                        </option>


                        <option value="sbi">
                          State Bank of India
                        </option>


                        <option value="hdfc">
                          HDFC Bank
                        </option>


                        <option value="icici">
                          ICICI Bank
                        </option>


                        <option value="axis">
                          Axis Bank
                        </option>


                        <option value="kotak">
                          Kotak Mahindra Bank
                        </option>


                        <option value="other">
                          Other Bank
                        </option>

                      </select>

                    </div>

                  </div>

                )}


                {/* =====================
                    CONTINUE BUTTON
                ====================== */}

                <button
                  type="submit"
                  className="btn btn-primary payment-submit"
                >

                  <Heart size={18} />

                  Continue to Payment

                  <ArrowRight size={18} />

                </button>


              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Donate;