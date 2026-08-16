function FAQ() {
  return (
    <section className="faq section">
      <div className="container">
        <div className="section-title">
          <span>FAQ</span>

          <h2>Frequently Asked Questions</h2>

          <p>
            Find answers to the most common questions about Hanumant Seva and
            our initiatives.
          </p>
        </div>

        <div className="faq-container">
          <div className="faq-item">
            <button className="faq-question">
              How can I donate?
              <i className="fa-solid fa-plus"></i>
            </button>

            <div className="faq-answer">
              <p>
                You can donate online through our donation page or contribute
                groceries and food materials during our food drives.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Can I volunteer on weekends?
              <i className="fa-solid fa-plus"></i>
            </button>

            <div className="faq-answer">
              <p>
                Yes. Most of our food distribution programs are conducted on
                weekends and public holidays.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Where are your food drives conducted?
              <i className="fa-solid fa-plus"></i>
            </button>

            <div className="faq-answer">
              <p>
                We organize food drives across different communities,
                orphanages, old age homes, and public locations where support is
                needed.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <button className="faq-question">
              Is my donation tax deductible?
              <i className="fa-solid fa-plus"></i>
            </button>

            <div className="faq-answer">
              <p>
                Once your NGO is registered under the applicable Indian
                regulations (such as 80G), eligible donations may qualify for
                tax benefits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
