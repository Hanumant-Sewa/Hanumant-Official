import { useState } from "react";
import Swal from "sweetalert2";

function Contact() {
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
        title: "Message Sent!",
        text: data.message || "Thank you for contacting Hanumant Seva.",
        confirmButtonText: "Okay",
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
        title: "Something went wrong",
        text:
          error.message ||
          "Unable to send your message. Please try again later.",
        confirmButtonText: "Try Again",
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
          <span>CONTACT</span>

          <h2>We'd Love To Hear From You</h2>

          <p>Have questions or want to support our mission? Reach out to us.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-box">
              <i className="fa-solid fa-location-dot"></i>

              <div>
                <h3>Address</h3>

                <p>Kanpur, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="contact-box">
              <i className="fa-solid fa-phone"></i>

              <div>
                <h3>Phone</h3>

                <p>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="contact-box">
              <i className="fa-solid fa-envelope"></i>

              <div>
                <h3>Email</h3>

                <p>info@hanumantseva.org</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
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
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
