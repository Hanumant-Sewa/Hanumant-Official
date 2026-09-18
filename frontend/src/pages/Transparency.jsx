import "../css/Transparency.css";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  HandHeart,
  Package,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Utensils,
} from "lucide-react";

import { Link } from "react-router-dom";

function Transparency() {
  const summary = [
    {
      icon: HandHeart,
      label: "Total Contributions",
      value: "₹2,45,000",
    },
    {
      icon: ShoppingCart,
      label: "Food & Grocery",
      value: "₹1,72,000",
    },
    {
      icon: Truck,
      label: "Logistics",
      value: "₹28,000",
    },
    {
      icon: Package,
      label: "Packaging",
      value: "₹15,000",
    },
    {
      icon: Receipt,
      label: "Program Expenses",
      value: "₹18,000",
    },
    {
      icon: FileText,
      label: "Other",
      value: "₹5,000",
    },
  ];

  const transactions = [
    {
      date: "Aug 12",
      type: "Purchase",
      description: "Rice & Dal",
      amount: "₹8,500",
    },
    {
      date: "Aug 14",
      type: "Logistics",
      description: "Transport",
      amount: "₹2,000",
    },
    {
      date: "Aug 15",
      type: "Purchase",
      description: "Vegetables",
      amount: "₹4,200",
    },
  ];

  const journey = [
    {
      icon: HandHeart,
      title: "Contribution",
      text: "Your support",
    },
    {
      icon: FileText,
      title: "Campaign",
      text: "Where it goes",
    },
    {
      icon: ShoppingCart,
      title: "Purchase",
      text: "What is purchased",
    },
    {
      icon: Utensils,
      title: "Food Preparation",
      text: "Meals prepared",
    },
    {
      icon: Truck,
      title: "Distribution",
      text: "People reached",
    },
    {
      icon: CheckCircle2,
      title: "Impact",
      text: "Verified result",
    },
  ];

  return (
    <main className="transparency-page">
      {/* =====================================================
                          PAGE HERO
      ===================================================== */}

      <section className="transparency-hero">
        <div className="container transparency-hero-container">
          <div className="transparency-hero-content">
            <span className="section-badge">OUR TRANSPARENCY PROMISE</span>

            <h1>
              Show The Work.
              <span> Build The Trust.</span>
            </h1>

            <p>
              We don't want people to support Hanumat Seva simply because we ask
              them to trust us. We want to earn that trust by making the journey
              of every contribution easier to understand.
            </p>

            <div className="transparency-philosophy">
              <ShieldCheck size={22} />

              <div>
                <strong>We invite you to watch us work.</strong>

                <span>Donate. Track. Participate. Verify. Impact.</span>
              </div>
            </div>
          </div>

          <div className="transparency-hero-card">
            <div className="transparency-hero-icon">
              <ShieldCheck size={42} />
            </div>

            <span>OUR COMMITMENT</span>

            <h3>
              Every contribution should have
              <strong> a visible journey.</strong>
            </h3>

            <p>
              From contribution to campaign, purchase, distribution and verified
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
                      TRANSPARENCY DASHBOARD
      ===================================================== */}

      <section className="transparency-dashboard">
        <div className="container">
          <div className="section-title transparency-section-title">
            <span>TRANSPARENCY DASHBOARD</span>

            <h2>
              See Where The
              <span> Money Goes.</span>
            </h2>

            <p>
              A clear view of contributions and how resources are being directed
              toward food, logistics, packaging and program work.
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="transparency-summary-grid">
            {summary.map((item) => {
              const Icon = item.icon;

              return (
                <div className="transparency-summary-card" key={item.label}>
                  <div className="transparency-summary-icon">
                    <Icon size={23} />
                  </div>

                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RECENT TRANSACTIONS */}

          <div className="transactions-card">
            <div className="transactions-header">
              <div>
                <span>RECENT ACTIVITY</span>
                <h3>Recent Transactions</h3>
              </div>

              <div className="verified-label">
                <CheckCircle2 size={17} />
                Verified Records
              </div>
            </div>

            <div className="transactions-table">
              <div className="transaction-row transaction-heading">
                <span>Date</span>
                <span>Type</span>
                <span>Description</span>
                <span>Amount</span>
                <span></span>
              </div>

              {transactions.map((transaction) => (
                <div
                  className="transaction-row"
                  key={`${transaction.date}-${transaction.description}`}
                >
                  <span>{transaction.date}</span>

                  <span>
                    <small className="transaction-type">
                      {transaction.type}
                    </small>
                  </span>

                  <strong>{transaction.description}</strong>

                  <strong>{transaction.amount}</strong>

                  <button className="transaction-details">
                    View Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
                    HOW CONTRIBUTION TRAVELS
      ===================================================== */}

      <section className="contribution-journey">
        <div className="container">
          <div className="section-title">
            <span>HOW YOUR CONTRIBUTION TRAVELS</span>

            <h2>
              Follow Your
              <span> Contribution.</span>
            </h2>

            <p>
              Your support does not simply disappear after a donation. It moves
              through a journey that can be connected to real activities and
              outcomes.
            </p>
          </div>

          <div className="journey-card">
            <div className="journey-flow">
              {journey.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div className="journey-wrapper" key={step.title}>
                    <div className="journey-step">
                      <div className="journey-icon">
                        <Icon size={25} />
                      </div>

                      <strong>{step.title}</strong>

                      <span>{step.text}</span>
                    </div>

                    {index < journey.length - 1 && (
                      <ArrowRight className="journey-arrow" size={22} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* EXAMPLE */}

            <div className="journey-example">
              <div className="journey-example-header">
                <div>
                  <span>EXAMPLE CAMPAIGN</span>

                  <h3>Campaign #HS-2026-001</h3>
                </div>

                <span className="campaign-verified">
                  <CheckCircle2 size={16} />
                  Verified
                </span>
              </div>

              <div className="journey-money-flow">
                <div>
                  <span>Received</span>
                  <strong>₹25,000</strong>
                </div>

                <ArrowRight size={20} />

                <div>
                  <span>Food Purchase</span>
                  <strong>₹18,500</strong>
                </div>

                <ArrowRight size={20} />

                <div>
                  <span>Transportation</span>
                  <strong>₹2,000</strong>
                </div>

                <ArrowRight size={20} />

                <div>
                  <span>Packaging</span>
                  <strong>₹1,500</strong>
                </div>

                <ArrowRight size={20} />

                <div>
                  <span>Remaining / Allocated</span>
                  <strong>₹3,000</strong>
                </div>
              </div>

              <div className="journey-result">
                <div className="journey-result-icon">
                  <Utensils size={24} />
                </div>

                <div>
                  <span>VERIFIED OUTCOME</span>
                  <strong>500 meals distributed</strong>
                </div>
              </div>

              <Link to="/campaigns" className="journey-report-link">
                View Campaign Report
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
                      TRANSPARENCY AREAS
      ===================================================== */}

      <section className="transparency-areas">
        <div className="container">
          <div className="section-title">
            <span>EXPLORE TRANSPARENCY</span>

            <h2>
              Look Closer.
              <span> Understand More.</span>
            </h2>

            <p>
              Transparency is not one report. It is a complete view of
              contributions, purchases, expenses and campaign activity.
            </p>
          </div>

          <div className="transparency-area-grid">
            <Link
              to="/transparency/purchases"
              className="transparency-area-card"
            >
              <div className="area-icon">
                <ShoppingCart size={27} />
              </div>

              <div>
                <span>PURCHASE TRANSPARENCY</span>

                <h3>Purchases</h3>

                <p>
                  Review approved purchases, vendors, quantities, campaign
                  association and payment status.
                </p>
              </div>

              <ArrowRight size={20} />
            </Link>

            <Link
              to="/transparency/expenses"
              className="transparency-area-card"
            >
              <div className="area-icon">
                <Receipt size={27} />
              </div>

              <div>
                <span>EXPENSE TRANSPARENCY</span>

                <h3>Expenses</h3>

                <p>
                  Understand expenses across food, grocery, transportation,
                  packaging, events and other categories.
                </p>
              </div>

              <ArrowRight size={20} />
            </Link>

            <Link to="/campaigns" className="transparency-area-card">
              <div className="area-icon">
                <FileText size={27} />
              </div>

              <div>
                <span>CAMPAIGN REPORTS</span>

                <h3>Campaign Activity</h3>

                <p>
                  Follow campaign progress and understand how support
                  contributes toward real community work.
                </p>
              </div>

              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
                            CTA
      ===================================================== */}

      <section className="transparency-cta">
        <div className="container">
          <div className="transparency-cta-card">
            <div>
              <span>OUR PHILOSOPHY</span>

              <h2>
                Trust Should Be
                <span> Visible.</span>
              </h2>

              <p>
                Donate because you care. Volunteer because you can. Join because
                you believe. And trust us because you can see the work.
              </p>
            </div>

            <Link to="/donate" className="transparency-cta-button">
              Support the Mission
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Transparency;
