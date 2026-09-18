import { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I donate?",
      answer:
        "You can donate online through our donation page or contribute groceries and food materials during our food drives.",
    },
    {
      question: "Can I volunteer on weekends?",
      answer:
        "Yes. Most of our food distribution programs are conducted on weekends and public holidays.",
    },
    {
      question: "Where are your food drives conducted?",
      answer:
        "We organize food drives across different communities, orphanages, old age homes, and public locations where support is needed.",
    },
    {
      question: "Is my donation tax deductible?",
      answer:
        "Once your NGO is registered under the applicable Indian regulations (such as 80G), eligible donations may qualify for tax benefits.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq section" id="faq">
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
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}

                <i className="fa-solid fa-plus"></i>
              </button>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
