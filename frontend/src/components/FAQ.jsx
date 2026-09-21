import { useState } from "react";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: t("faq.questions.donate.question"),
      answer: t("faq.questions.donate.answer"),
    },
    {
      question: t("faq.questions.volunteer.question"),
      answer: t("faq.questions.volunteer.answer"),
    },
    {
      question: t("faq.questions.foodDrives.question"),
      answer: t("faq.questions.foodDrives.answer"),
    },
    {
      question: t("faq.questions.tax.question"),
      answer: t("faq.questions.tax.answer"),
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="section-title">
          <span>{t("faq.badge")}</span>

          <h2>{t("faq.title")}</h2>

          <p>{t("faq.description")}</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
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