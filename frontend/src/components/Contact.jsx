function Contact() {
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

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />

            <input type="email" placeholder="Your Email" required />

            <input type="text" placeholder="Subject" required />

            <textarea rows="6" placeholder="Your Message" required></textarea>

            <button className="btn btn-primary" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
