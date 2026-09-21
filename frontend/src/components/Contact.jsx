import { useState } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      await Swal.fire({
        icon: "success",
        title: t("contact.alert.successTitle"),
        text:
          data.message ||
          t("contact.alert.successMessage"),
        confirmButtonText: t("contact.alert.okay"),
        customClass: {
          popup: "swal-popup",
          confirmButton: "swal-confirm-btn",
        },
      });

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      Swal.fire({
        icon: "error",
        title: t("contact.alert.errorTitle"),
        text:
          error.message ||
          t("contact.alert.errorMessage"),
        confirmButtonText: t("contact.alert.tryAgain"),
        customClass: {
          popup: "swal-popup",
          confirmButton: "swal-confirm-btn",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="section-title">
          <span>{t("contact.badge")}</span>

          <h2>{t("contact.title")}</h2>

          <p>{t("contact.description")}</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-box">
              <i className="fa-solid fa-location-dot"></i>

              <div>
                <h3>{t("contact.info.address.title")}</h3>

                <p>Kanpur, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="contact-box">
              <i className="fa-solid fa-phone"></i>

              <div>
                <h3>{t("contact.info.phone.title")}</h3>

                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="contact-box">
              <i className="fa-solid fa-envelope"></i>

              <div>
                <h3>{t("contact.info.email.title")}</h3>

                <p>info@hanumantseva.org</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("contact.form.name")}
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <input
              type="email"
              name="email"
              placeholder={t("contact.form.email")}
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              name="subject"
              placeholder={t("contact.form.subject")}
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <textarea
              name="message"
              rows="6"
              placeholder={t("contact.form.message")}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            ></textarea>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("contact.form.sending")
                : t("contact.form.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;