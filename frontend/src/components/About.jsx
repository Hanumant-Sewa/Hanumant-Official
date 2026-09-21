import { Heart, Users, ShieldCheck, ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

import ProtectedButton from "./ProtectedButton";
import ProtectedLink from "./ProtectedLink";

import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* =====================================================
          3. ONE PERSON. ONE MEAL. ONE MONTH.
      ===================================================== */}

      <section className="about">
        <div className="container about-container">
          {/* ================= LEFT - IMAGE ================= */}

          <div className="about-image">
            <div className="about-image-wrapper">
              <img
                src="/images/about.jpg"
                alt={t("about.monthlyMission.imageAlt")}
              />

              <div className="about-image-badge">
                <Heart size={20} fill="currentColor" />

                <span>{t("about.monthlyMission.imageBadge")}</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT - CONTENT ================= */}

          <div className="about-content">
            <span className="section-badge">
              {t("about.monthlyMission.badge")}
            </span>

            <h2>
              {t("about.monthlyMission.titleFirst")}
              <span> {t("about.monthlyMission.titleSecond")}</span>
            </h2>

            <p className="about-intro">
              {t("about.monthlyMission.intro")}
            </p>

            <p>
              {t("about.monthlyMission.description")}
            </p>

            {/* ================= CONTRIBUTION OPTIONS ================= */}

            <div className="about-highlights">
              <div className="about-highlight">
                <strong>₹50</strong>
                <span>{t("about.monthlyMission.people.one")}</span>
              </div>

              <div className="about-highlight">
                <strong>₹100</strong>
                <span>{t("about.monthlyMission.people.two")}</span>
              </div>

              <div className="about-highlight">
                <strong>₹250</strong>
                <span>{t("about.monthlyMission.people.five")}</span>
              </div>

              <div className="about-highlight">
                <strong>₹500</strong>
                <span>{t("about.monthlyMission.people.ten")}</span>
              </div>
            </div>

            {/* ================= MONTHLY SUPPORT ================= */}

            <ProtectedButton
              to="/donate"
              allowedRoles={["USER", "VOLUNTEER"]}
              className="about-btn"
            >
              {t("about.monthlyMission.button")}
              <ArrowRight size={18} />
            </ProtectedButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          1. TRANSPARENCY PROMISE
      ===================================================== */}

      <section className="transparency">
        <div className="container">
          {/* ================= SECTION TITLE ================= */}

          <div className="section-title">
            <span>{t("about.transparency.badge")}</span>

            <h2>
              {t("about.transparency.titleFirst")}
              <span> {t("about.transparency.titleSecond")}</span>
            </h2>

            <p>
              {t("about.transparency.description")}
            </p>
          </div>

          {/* ================= TRANSPARENCY CARD ================= */}

          <div className="transparency-card">
            {/* ================= HEADER ================= */}

            <div className="transparency-header">
              <div>
                <span className="transparency-label">
                  {t("about.transparency.contributionLabel")}
                </span>

                <h3>{t("about.transparency.followTitle")}</h3>
              </div>

              <div className="transparency-icon">
                <ShieldCheck size={28} />
              </div>
            </div>

            {/* ================= FLOW ================= */}

            <div className="transparency-flow">
              {/* CONTRIBUTION */}

              <div className="transparency-step active">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>
                  {t("about.transparency.steps.contribution.title")}
                </strong>

                <span>
                  {t("about.transparency.steps.contribution.description")}
                </span>
              </div>

              <div className="flow-line"></div>

              {/* CAMPAIGN */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Users size={22} />
                </div>

                <strong>
                  {t("about.transparency.steps.campaign.title")}
                </strong>

                <span>
                  {t("about.transparency.steps.campaign.description")}
                </span>
              </div>

              <div className="flow-line"></div>

              {/* PURCHASE */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ShieldCheck size={22} />
                </div>

                <strong>
                  {t("about.transparency.steps.purchase.title")}
                </strong>

                <span>
                  {t("about.transparency.steps.purchase.description")}
                </span>
              </div>

              <div className="flow-line"></div>

              {/* DISTRIBUTION */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <Heart size={22} />
                </div>

                <strong>
                  {t("about.transparency.steps.distribution.title")}
                </strong>

                <span>
                  {t("about.transparency.steps.distribution.description")}
                </span>
              </div>

              <div className="flow-line"></div>

              {/* IMPACT */}

              <div className="transparency-step">
                <div className="transparency-step-icon">
                  <ArrowRight size={22} />
                </div>

                <strong>
                  {t("about.transparency.steps.impact.title")}
                </strong>

                <span>
                  {t("about.transparency.steps.impact.description")}
                </span>
              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <div className="transparency-footer">
              <p>{t("about.transparency.footer")}</p>

              <ProtectedLink
                to="/transparency"
                allowedRoles={["USER", "VOLUNTEER"]}
                state={{
                  from: "/transparency",
                }}
                className="transparency-link"
              >
                {t("about.transparency.viewButton")}
                <ArrowRight size={17} />
              </ProtectedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="founder-section" id="about">
        <div className="container">
          <div className="founder-heading">
            <span className="section-badge">
              {t("about.founder.badge")}
            </span>

            <h2>
              {t("about.founder.headingFirst")}{" "}
              <span>{t("about.founder.headingSecond")}</span>
            </h2>

            <p>
              {t("about.founder.headingDescription")}
            </p>
          </div>

          <div className="founder-profile">
            <div className="founder-photo">
              <img
                src="/images/founder.png"
                alt={t("about.founder.imageAlt")}
              />

              <div className="founder-photo-badge">
                <span>{t("about.founder.photoBadge")}</span>
                <strong>Hanumat Seva Foundation</strong>
              </div>
            </div>

            <div className="founder-profile-content">
              <span className="founder-label">
                MANISHA NIGAM
              </span>

              <h3>{t("about.founder.role")}</h3>

              <p>
                {t("about.founder.paragraph1")}
              </p>

              <p>
                {t("about.founder.paragraph2")}
              </p>

              <p>
                {t("about.founder.paragraph3")}
              </p>

              <p>
                {t("about.founder.paragraph4")}
              </p>
            </div>
          </div>

          <div className="founder-quote">
            <span className="founder-quote-mark">“</span>

            <p>
              {t("about.founder.quote")}
            </p>
          </div>

          <div className="founder-vision">
            <div className="founder-vision-content">
              <span className="founder-label">
                {t("about.founder.vision.label")}
              </span>

              <h3>{t("about.founder.vision.title")}</h3>

              <p>
                {t("about.founder.vision.paragraph1")}
              </p>

              <p>
                {t("about.founder.vision.paragraph2")}
              </p>

              <div className="founder-vision-points">
                <div className="founder-vision-point">
                  <span>01</span>
                  <p>
                    {t("about.founder.vision.points.one")}
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>02</span>
                  <p>
                    {t("about.founder.vision.points.two")}
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>03</span>
                  <p>
                    {t("about.founder.vision.points.three")}
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>04</span>
                  <p>
                    {t("about.founder.vision.points.four")}
                  </p>
                </div>

                <div className="founder-vision-point">
                  <span>05</span>
                  <p>
                    {t("about.founder.vision.points.five")}
                  </p>
                </div>
              </div>
            </div>

            <div className="founder-journey">
              <span>{t("about.founder.journey.label")}</span>

              <strong>{t("about.founder.journey.one")}</strong>
              <i>↓</i>

              <strong>{t("about.founder.journey.two")}</strong>
              <i>↓</i>

              <strong>{t("about.founder.journey.three")}</strong>
              <i>↓</i>

              <strong>{t("about.founder.journey.four")}</strong>
            </div>
          </div>

          <div className="founder-promise">
            <div className="founder-promise-heading">
              <span className="founder-label">
                {t("about.founder.promise.label")}
              </span>

              <h3>
                {t("about.founder.promise.title")}
              </h3>
            </div>

            <div className="founder-promise-list">
              <div>{t("about.founder.promise.one")}</div>
              <div>{t("about.founder.promise.two")}</div>
              <div>{t("about.founder.promise.three")}</div>
              <div>{t("about.founder.promise.four")}</div>
              <div>{t("about.founder.promise.five")}</div>
            </div>
          </div>

          <div className="founder-signature">
            <strong>Hanumat Seva Foundation</strong>
            <span>
              {t("about.founder.signature")}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;