import { useTranslation } from "react-i18next";

function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="testimonials section" id="stories">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="section-title">
          <span>{t("testimonials.badge")}</span>

          <h2>
            {t("testimonials.titleFirst")}{" "}
            <span>{t("testimonials.titleHighlight")}</span>
          </h2>

          <p>
            {t("testimonials.description")}
          </p>
        </div>

        {/* STORIES */}
        <div className="testimonial-grid">

          {/* STORY 1 */}
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-heart"></i>
            </div>

            <p>
              "{t("testimonials.stories.volunteer.text")}"
            </p>

            <div className="testimonial-user">
              <img
                src="/images/story-volunteer.jpeg"
                alt={t("testimonials.stories.volunteer.imageAlt")}
              />

              <div>
                <h4>{t("testimonials.stories.volunteer.title")}</h4>
                <span>{t("testimonials.stories.volunteer.role")}</span>
              </div>
            </div>
          </div>

          {/* STORY 2 */}
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-heart"></i>
            </div>

            <p>
              "{t("testimonials.stories.supporter.text")}"
            </p>

            <div className="testimonial-user">
              <img
                src="/images/story-donor.jpeg"
                alt={t("testimonials.stories.supporter.imageAlt")}
              />

              <div>
                <h4>{t("testimonials.stories.supporter.title")}</h4>
                <span>{t("testimonials.stories.supporter.role")}</span>
              </div>
            </div>
          </div>

          {/* STORY 3 */}
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-heart"></i>
            </div>

            <p>
              "{t("testimonials.stories.community.text")}"
            </p>

            <div className="testimonial-user">
              <img
                src="/images/story-community.jpeg"
                alt={t("testimonials.stories.community.imageAlt")}
              />

              <div>
                <h4>{t("testimonials.stories.community.title")}</h4>
                <span>{t("testimonials.stories.community.role")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="stories-bottom">
          <p>
            {t("testimonials.bottomFirst")}{" "}
            <strong>{t("testimonials.bottomHighlight")}</strong>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;