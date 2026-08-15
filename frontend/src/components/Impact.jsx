function Impact() {
  return (
    <section className="impact section" id="impact">
      <div className="container">
        <div className="section-title">
          <span>OUR IMPACT</span>

          <h2>
            Together We Are <span>Making A Difference</span>
          </h2>
        </div>

        <div className="impact-grid">
          <div className="impact-card">
            <i className="fa-solid fa-bowl-food"></i>

            <h3 className="counter" data-target="1500">
              0
            </h3>

            <p>Meals Served</p>
          </div>

          <div className="impact-card">
            <i className="fa-solid fa-user-group"></i>

            <h3 className="counter" data-target="500">
              0
            </h3>

            <p>Active Volunteers</p>
          </div>

          <div className="impact-card">
            <i className="fa-solid fa-location-dot"></i>

            <h3 className="counter" data-target="20">
              0
            </h3>

            <p>Cities Reached</p>
          </div>

          <div className="impact-card">
            <i className="fa-solid fa-heart"></i>

            <h3 className="counter" data-target="1000">
              0
            </h3>

            <p>Families Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Impact;
