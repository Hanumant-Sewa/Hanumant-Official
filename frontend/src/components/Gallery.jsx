import { useTranslation } from "react-i18next";

function Gallery() {
  const { t } = useTranslation();

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-title">
          <span>{t("gallery.badge")}</span>

          <h2>
            {t("gallery.titleFirst")}{" "}
            <span>{t("gallery.titleHighlight")}</span>
          </h2>

          <p>{t("gallery.description")}</p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item large">
            <img
              src="/images/gallery1.jpg"
              alt={t("gallery.images.foodDistribution")}
            />
          </div>

          <div className="gallery-item">
            <img
              src="/images/gallry2.jpg"
              alt={t("gallery.images.communityService")}
            />
          </div>

          <div className="gallery-item">
            <img
              src="/images/gallery3.jpg"
              alt={t("gallery.images.volunteerActivity")}
            />
          </div>

          <div className="gallery-item">
            <img
              src="/images/gallery4.jpg"
              alt={t("gallery.images.foodDrive")}
            />
          </div>

          <div className="gallery-item large">
            <img
              src="/images/gallery5.jpg"
              alt={t("gallery.images.communitySupport")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;