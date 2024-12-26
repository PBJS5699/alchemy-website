import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="home-title">
          Easily integrate AI into your research and get higher quality data, 10x faster
        </h1>
        <p className="hero-subtitle">
          No more repetitive, manual, subjective image analysis. With our easy drag-and-drop solution, 
          create custom image analysis programs for your research you can share with your peers and 
          cite in your research - all without writing a single line of code.
        </p>
        <div className="download-buttons">
          <button className="download-btn">Download for Mac</button>
          <button className="download-btn">Download for Windows</button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h2>1. Node-Based Workflows</h2>
          <p>
            Design custom analysis pipelines without coding. Our intuitive node system lets you 
            fine-tune every parameter. Not sure where to start? Let our AI suggest an optimal 
            workflow, then adjust it to your needs.
          </p>
        </div>

        <div className="feature">
          <h2>2. Automatic AI Training</h2>
          <p>
            Eliminate repetitive manual work. Our AI learns from your manual processes and 
            recommends the same application for subsequent images. Focus on research, not repetition.
          </p>
        </div>

        <div className="feature">
          <h2>3. Fully Reproducible</h2>
          <p>
            Ensure consistency and credibility. Generate reproducible code for every analysis, 
            ready to cite in publications or share with peers. Boost transparency and eliminate 
            result variations between analysts.
          </p>
        </div>
      </section>

      <section className="cta">
        <button className="cta-button">Request Demo</button>
      </section>

      <footer className="footer">
        <p>Copyright © 2024 Alchemy A.I. | All Rights Reserved</p>
        <div className="footer-links">
          <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default Home; 