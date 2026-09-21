import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;

          let current = 0;
          const duration = 1800;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
              current = target;
              clearInterval(timer);
            }

            setCount(Math.floor(current));
          }, 16);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target]);

  return <h3 ref={counterRef}>{count}+</h3>;
}

function Impact() {
  const { t } = useTranslation();

  const impactData = [
    {
      icon: "fa-solid fa-bowl-food",
      target: 1500,
      label: t("impact.stats.meals"),
    },
    {
      icon: "fa-solid fa-user-group",
      target: 500,
      label: t("impact.stats.volunteers"),
    },
    {
      icon: "fa-solid fa-location-dot",
      target: 20,
      label: t("impact.stats.cities"),
    },
    {
      icon: "fa-solid fa-heart",
      target: 1000,
      label: t("impact.stats.families"),
    },
  ];

  return (
    <section className="impact section" id="impact">
      <div className="container">
        <div className="section-title">
          <span>{t("impact.heading.badge")}</span>

          <h2>
            {t("impact.heading.titleFirst")}{" "}
            <span>{t("impact.heading.titleSecond")}</span>
          </h2>
        </div>

        <div className="impact-grid">
          {impactData.map((item) => (
            <div className="impact-card" key={item.label}>
              <i className={item.icon}></i>

              <Counter target={item.target} />

              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Impact;