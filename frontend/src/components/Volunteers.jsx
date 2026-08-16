function Volunteers() {
  return (
    <section className="volunteer section" id="volunteer">
      <div className="container">
        <div className="volunteer-wrapper">
          <div className="volunteer-content">
            <span>JOIN OUR TEAM</span>

            <h2>Become A Volunteer</h2>

            <p>
              Join us in making a difference. Whether you have one hour or one
              day, your time can change someone's life.
            </p>
          </div>

          <div className="volunteer-form">
            <form>
              <input type="text" placeholder="Full Name" required />

              <input type="email" placeholder="Email Address" required />

              <input type="tel" placeholder="Phone Number" required />

              <textarea
                rows="5"
                placeholder="Why do you want to volunteer?"
              ></textarea>

              <button className="btn btn-primary" type="submit">
                Join Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Volunteers;
