const About = () => {
  return (
    <section className="about" id="about">
      <div className="container about-container">
        <div className="about-image">
          <img src="/images/about.jpg" alt="Hanumat Seva community service" />
        </div>

        <div className="about-content">
          <span className="section-badge">Who We Are</span>

          <h2>
            Serving Humanity with
            <span> Compassion & Seva</span>
          </h2>

          <p>
            Hanumat Seva is a community built around a simple belief: helping
            someone can begin with something as simple as sharing a meal.
          </p>

          <p>
            Founded in 2026 by Manisha Nigam, Hanumat Seva brings people
            together to support food-related initiatives, volunteer their time,
            participate in community activities, and create meaningful impact
            through selfless service.
          </p>

          <p>
            We believe that service should be genuine, compassionate, and
            transparent. Our goal is to grow together as a community while
            showing people where their support goes and what it helps
            accomplish.
          </p>

          <button className="about-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default About;
