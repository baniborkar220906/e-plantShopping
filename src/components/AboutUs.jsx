import './AboutUs.css';

export default function AboutUs() {
  return (
    <section className="about-section">
      <div className="about-us-container">
        <h2>About Paradise Nursery</h2>

        <div className="about-content">
          <div className="about-text">
            <h3>Welcome to Paradise Nursery</h3>
            <p>
              Paradise Nursery is an online plant shop dedicated to bringing
              the beauty of nature into homes and offices. We offer a variety
              of indoor plants to help customers create greener and more
              welcoming spaces.
            </p>

            <h3>Our Mission</h3>
            <p>
              Our mission is to make plants accessible to everyone. From
              beginners to experienced plant lovers, we aim to provide a
              convenient way to discover and choose plants for every space.
            </p>

            <h3>Why Choose Us?</h3>
            <ul className="features-list">
              <li>Healthy and carefully selected plants</li>
              <li>A variety of succulents, flowering plants, and foliage plants</li>
              <li>Convenient online plant shopping</li>
              <li>Plant selections for different spaces and preferences</li>
              <li>Simple browsing and shopping cart management</li>
              <li>A welcoming experience for new plant enthusiasts</li>
            </ul>

            <h3>Our Values</h3>
            <p>
              We value quality, sustainability, and customer satisfaction.
              We believe that adding plants to everyday spaces can help people
              connect with nature and create a refreshing environment.
            </p>
          </div>

          <div className="about-contact">
            <h3>Contact Us</h3>

            <div className="contact-info">
              <p>
                <strong>Email:</strong> info@paradisenursery.com
              </p>
              <p>
                <strong>Phone:</strong> Contact details coming soon
              </p>
              <p>
                <strong>Address:</strong> Paradise Nursery Online Store
              </p>
              <p>
                <strong>Hours:</strong> Online shopping available anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
