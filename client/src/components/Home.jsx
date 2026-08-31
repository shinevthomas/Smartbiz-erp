import "./Home.css";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import WhyChoose from "./WhyChoose";
import Footer from "./Footer";

function Home() {
  return (
    <div className="home">

      <Navbar />

      <Hero />

      <Features />

      <WhyChoose />

      {/* ================= PRICING ================= */}

      <section className="pricing" id="pricing">

        <div className="section-label">
          SIMPLE PRICING
        </div>

        <h2>
          Choose the right plan for your business
        </h2>

        <p className="section-description">
          Start managing your business with SmartBiz ERP
          using a plan that fits your needs.
        </p>

        <div className="pricing-container">

          {/* STARTER */}

          <div className="pricing-card">

            <h3>Starter</h3>

            <p className="pricing-subtitle">
              For small businesses
            </p>

            <div className="price">
              ₹0
              <span>/month</span>
            </div>

            <button>
              Get Started →
            </button>

            <ul>
              <li>✓ Inventory Management</li>
              <li>✓ Customer Management</li>
              <li>✓ Sales Management</li>
              <li>✓ Basic Reports</li>
            </ul>

          </div>

          {/* PROFESSIONAL */}

          <div className="pricing-card popular">

            <div className="popular-badge">
              MOST POPULAR
            </div>

            <h3>Professional</h3>

            <p className="pricing-subtitle">
              For growing businesses
            </p>

            <div className="price">
              ₹999
              <span>/month</span>
            </div>

            <button>
              Start Free Trial →
            </button>

            <ul>
              <li>✓ Everything in Starter</li>
              <li>✓ Advanced Reports</li>
              <li>✓ Invoice Management</li>
              <li>✓ Business Analytics</li>
              <li>✓ Priority Support</li>
            </ul>

          </div>

          {/* BUSINESS */}

          <div className="pricing-card">

            <h3>Business</h3>

            <p className="pricing-subtitle">
              For larger organizations
            </p>

            <div className="price">
              ₹2499
              <span>/month</span>
            </div>

            <button>
              Contact Sales →
            </button>

            <ul>
              <li>✓ Everything in Professional</li>
              <li>✓ Multiple Users</li>
              <li>✓ Advanced Permissions</li>
              <li>✓ Custom Reports</li>
              <li>✓ Dedicated Support</li>
            </ul>

          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section className="contact" id="contact">

        <div className="contact-container">

          <div className="contact-info">

            <div className="section-label">
              GET IN TOUCH
            </div>

            <h2>
              Let's grow your business together.
            </h2>

            <p>
              Have questions about SmartBiz ERP?
              Our team is ready to help you understand
              how SmartBiz can simplify your business operations.
            </p>

            <div className="contact-details">

              <div>
                <strong>📧 Email</strong>
                <span>support@smartbizerp.com</span>
              </div>

              <div>
                <strong>📞 Phone</strong>
                <span>+91 00000 00000</span>
              </div>

              <div>
                <strong>📍 Location</strong>
                <span>India</span>
              </div>

            </div>

          </div>


          <div className="contact-form">

            <h3>
              Send us a message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="text"
              placeholder="Company Name"
            />

            <textarea
              rows="5"
              placeholder="How can we help you?"
            />

            <button>
              Send Message →
            </button>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}

export default Home;