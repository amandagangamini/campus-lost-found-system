import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
const [openFaq, setOpenFaq] = useState(null);

const faqs = [
  {
    question: "Who can use this lost and found system?",
    answer:
      "Students and campus staff can use this system to report lost items, submit found items, and search approved item reports.",
  },
  {
    question: "Can I upload an image of a lost or found item?",
    answer:
      "Yes. Users can upload an item image when submitting a lost or found item report. This helps others identify the item easily.",
  },
  {
    question: "Why is my report not showing on the public page?",
    answer:
      "New reports are first saved as pending. The admin must approve the report before it appears on the Lost Items or Found Items page.",
  },
  {
    question: "How can I claim a found item?",
    answer:
      "Open the Found Items page, click the Claim Item button, and submit a message with proof details. The admin will review the claim.",
  },
  {
    question: "Can the admin reject or resolve reports?",
    answer:
      "Yes. Admins can approve, reject, resolve, or delete lost and found item reports from the admin panel.",
  },
];
  return (
    <div className="home-page">
      <section className="home-hero">
       <div className="floating-card id-card">🪪</div>
<div className="floating-card phone-card">📱</div>
<div className="floating-card bag-card">🎒</div>

        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-badge">Campus Lost & Found Platform</span>

<h1>
  Recover Campus <br />
  Belongings Faster
</h1>

<p>
  Report lost items, submit found belongings, search approved campus
  reports, and send claim requests through one secure and organized
  platform.
</p>

            <div className="hero-buttons">
              <Link to="/lost-items" className="primary-btn">
                View Lost Items
              </Link>

              <Link to="/found-items" className="secondary-btn">
                View Found Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>About This System</h2>
          <p>
            Students often lose ID cards, phones, calculators, books, keys and
            other personal belongings inside the campus. This system provides a
            modern and organized way to manage lost and found reports.
          </p>

          <p>
            Users can upload item images, view approved reports, and send claim
            requests with proof. Admins can verify reports, approve or reject
            claims, and manage the full process efficiently.
          </p>
        </div>

        <div className="about-image">
          <img src="/images/lost-found.jpg" alt="Lost and found items" />
        </div>
      </section>

      <section className="features">
        <h2>System Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Search Items</h3>
            <p>Search lost and found items by item name and location.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h3>Report Lost Items</h3>
            <p>Submit lost item details with image and contact information.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎒</div>
            <h3>Report Found Items</h3>
            <p>Report items found inside the campus and help owners recover them.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Admin Verification</h3>
            <p>Admins can approve, reject, resolve, and delete item reports.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Claim Requests</h3>
            <p>Students can claim found items by submitting proof details.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h3>Image Upload</h3>
            <p>Item images make identification easier and faster.</p>
          </div>
        </div>
      </section>
<section className="how-section">
  <h2>How It Works</h2>

  <div className="how-grid">
    <div className="how-card">
      <span>01</span>
      <h3>Report Item</h3>
      <p>Students submit lost or found item details with an image.</p>
    </div>

    <div className="how-card">
      <span>02</span>
      <h3>Admin Verification</h3>
      <p>Admin checks the report and approves valid item posts.</p>
    </div>

    <div className="how-card">
      <span>03</span>
      <h3>Search Items</h3>
      <p>Users search approved lost and found reports from the system.</p>
    </div>

    <div className="how-card">
      <span>04</span>
      <h3>Claim Request</h3>
      <p>Owners submit claim requests with proof details.</p>
    </div>

    <div className="how-card">
      <span>05</span>
      <h3>Admin Decision</h3>
      <p>Admin approves or rejects the claim request after verification.</p>
    </div>
  </div>
</section>
      {!token && (
        <section className="cta-box">
          <h2>Lost something on campus?</h2>
          <p>Create an account and start using the system today.</p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </section>
      )}<section className="faq-section">
  <h2>
    Frequently Asked <span>Questions</span>
  </h2>

  <div className="faq-list">
    {faqs.map((faq, index) => (
      <div className="faq-item" key={index}>
        <button
          className="faq-question"
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
        >
          <span>{faq.question}</span>
          <strong>{openFaq === index ? "−" : "+"}</strong>
        </button>

        {openFaq === index && (
          <p className="faq-answer">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</section>

<footer className="site-footer">
  <div className="footer-grid">
    <div>
      <h3>Campus Lost & Found</h3>
      <p>
        A modern platform designed to help students report, search,
        and recover lost belongings inside the campus.
      </p>
    </div>

    <div>
      <h3>Quick Links</h3>
      <Link to="/lost-items">Lost Items</Link>
      <Link to="/found-items">Found Items</Link>
      <Link to="/report-lost">Report Lost</Link>
      <Link to="/report-found">Report Found</Link>
    </div>

    <div>
      <h3>Student Services</h3>
      <p>Report lost items</p>
      <p>Submit found items</p>
      <p>Send claim requests</p>
      <p>Track my reports</p>
    </div>

    <div>
      <h3>Admin Panel</h3>
      <p>Approve reports</p>
      <p>Manage claims</p>
      <p>Resolve item cases</p>
      <p>Monitor dashboard</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>
      This system is developed for educational purposes as a full-stack
      Software Engineering project.
    </p>
    <p>© 2026 Campus Lost & Found Management System</p>
  </div>
</footer><div className="help-widget">
  <div className="help-text">Need help?</div>
  <button
    className="help-floating"
    onClick={() =>
      document
        .querySelector(".faq-section")
        ?.scrollIntoView({ behavior: "smooth" })
    }
  >
    💬
  </button>
</div> </div>
  );
}

export default Home;