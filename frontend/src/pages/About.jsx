import "./About.css";

function About() {
  return (
    <section className="about">

      {/* Hero */}
      <div className="about-container">

        <div className="about-hero">
          <h1>About BlogSphere</h1>

          <p>
            Welcome to BlogSphere, a platform where ideas, stories and
            knowledge come together. We help writers share their voices and
            readers discover meaningful content.
          </p>
        </div>

        {/* Mission */}

        <div className="about-card">
          <h2>Our Mission</h2>

          <p>
            Our mission is to provide a simple and engaging platform where
            anyone can create, publish and discover meaningful blogs.
            Every person has a story worth sharing.
          </p>
        </div>

        {/* Offer */}

        <div className="about-card">

          <h2>What We Offer</h2>

          <ul>
            <li>Create and publish blogs easily.</li>
            <li>Explore articles from multiple categories.</li>
            <li>Comment and engage with other users.</li>
            <li>Share ideas with the community.</li>
            <li>Discover trending content.</li>
          </ul>

        </div>

        {/* Features */}

        <div className="about-card">

          <h2>Why Choose Us?</h2>

          <div className="features">

            <div className="feature-box">
              <h3>Easy to Use</h3>
              <p>Simple, modern and clean interface.</p>
            </div>

            <div className="feature-box">
              <h3>Community Driven</h3>
              <p>Connect with writers and readers worldwide.</p>
            </div>

            <div className="feature-box">
              <h3>Secure Platform</h3>
              <p>Your account and content stay protected.</p>
            </div>

          </div>

        </div>

        {/* Vision */}

        <div className="about-card">

          <h2>Our Vision</h2>

          <p>
            We aim to build a global community where creativity,
            knowledge and experiences are shared freely to inspire
            millions of readers.
          </p>

        </div>

        {/* Contact */}

        <div className="about-card contact">

          <h2>Contact Us</h2>

          <p>Have questions or suggestions? We'd love to hear from you.</p>

          <h3>support@blogsphere.com</h3>

          <span>www.blogsphere.com</span>

        </div>

      </div>

    </section>
  );
}

export default About;