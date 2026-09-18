function Gallery() {
  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="section-title">
          <span>OUR GALLERY</span>

          <h2>
            Moments Of <span>Compassion</span>
          </h2>

          <p>
            Every picture tells the story of hope, kindness, teamwork and smiles
            shared through service.
          </p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item large">
            <img src="/images/gallery1.jpg" alt="Food distribution" />
          </div>

          <div className="gallery-item">
            <img src="/images/gallry2.jpg" alt="Community service" />
          </div>

          <div className="gallery-item">
            <img src="/images/gallery3.jpg" alt="Volunteer activity" />
          </div>

          <div className="gallery-item">
            <img src="/images/gallery4.jpg" alt="Food drive" />
          </div>

          <div className="gallery-item large">
            <img src="/images/gallery5.jpg" alt="Community support" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
