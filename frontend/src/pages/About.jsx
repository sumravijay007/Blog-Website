

function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "15px",
            }}
          >
            About Us
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#cbd5e1",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Welcome to BlogSphere, a platform where ideas, stories, and
            knowledge come together. We help writers share their voices and
            readers discover valuable content.
          </p>
        </div>

        {/* Mission Section */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2> Our Mission</h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
            Our mission is to provide a simple and engaging platform where
            anyone can create, publish, and discover meaningful content. We
            believe that every person has a story worth sharing.
          </p>
        </div>

        {/* What We Offer */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2> What We Offer</h2>

          <ul
            style={{
              color: "#cbd5e1",
              lineHeight: "2",
              paddingLeft: "20px",
            }}
          >
            <li>Create and publish blogs easily.</li>
            <li>Explore articles from multiple categories.</li>
            <li>Comment and engage with other users.</li>
            <li>Share your thoughts with the community.</li>
            <li>Discover trending and popular content.</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2> Why Choose Us?</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#334155",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Easy to Use</h3>
              <p>Simple and clean interface for writers and readers.</p>
            </div>

            <div
              style={{
                background: "#334155",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Community Driven</h3>
              <p>Connect with people who share your interests.</p>
            </div>

            <div
              style={{
                background: "#334155",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>Secure Platform</h3>
              <p>Your content and account are protected and managed safely.</p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h2> Our Vision</h2>

          <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
            We aim to build a global community where knowledge, creativity, and
            experiences are shared freely. Our vision is to inspire learning,
            collaboration, and meaningful conversations.
          </p>
        </div>

        {/* Contact Section */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
          }}
        >
          <h2> Contact Us</h2>

          <p style={{ color: "#cbd5e1" }}>
            Have questions or suggestions? We'd love to hear from you.
          </p>

          <p>Email: support@blogsphere.com</p>
          <p>Website: www.blogsphere.com</p>
        </div>
      </div>
    </div>
  );
}

export default About;