function Testimonials() {
  return (
    <section className="testimonials section" id="stories">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-title">
          <span>REAL STORIES</span>

          <h2>
            Stories Of <span>Service & Impact</span>
          </h2>

          <p>
            Behind every contribution, volunteer hour and food distribution is a
            real person, a real experience and a real moment of impact.
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
              "I joined Hanumat Seva as a volunteer because I wanted to do
              something meaningful with my time. Serving meals and meeting
              people in the community showed me that even a small effort can
              make someone's day better."
            </p>

            <div className="testimonial-user">
              <img
                src="/images/story-volunteer.jpeg"
                alt="Hanumat Seva volunteer"
              />

              <div>
                <h4>Volunteer Story</h4>
                <span>Community Volunteer</span>
              </div>
            </div>
          </div>

          {/* STORY 2 */}
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-heart"></i>
            </div>

            <p>
              "What stood out to me was the focus on transparency. I wanted my
              contribution to become something useful, and seeing how support
              reaches food-related initiatives made the experience meaningful."
            </p>

            <div className="testimonial-user">
              <img src="/images/story-donor.jpeg" alt="Hanumat Seva donor" />

              <div>
                <h4>Supporter Story</h4>
                <span>Community Supporter</span>
              </div>
            </div>
          </div>

          {/* STORY 3 */}
          <div className="testimonial-card">
            <div className="stars">
              <i className="fa-solid fa-heart"></i>
            </div>

            <p>
              "Food is more than just a meal. It can bring dignity, comfort and
              hope. Being part of a food distribution activity reminded me that
              genuine service begins with caring for others."
            </p>

            <div className="testimonial-user">
              <img
                src="/images/story-community.jpeg"
                alt="Hanumat Seva community"
              />

              <div>
                <h4>Community Story</h4>
                <span>Food Distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="stories-bottom">
          <p>
            Every story is a reminder that{" "}
            <strong>genuine service matters.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
