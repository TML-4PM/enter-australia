
import React, { useState } from 'react';

function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const toggleLeadForm = () => {
    setShowLeadForm(!showLeadForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setShowLeadForm(false);
    alert("Thanks! Your 2025 Bid Forecast has been sent to your email.");
  };

  return (
    <div className="app">
      <header>
        <nav>
            <div className="logo">Enter Australia</div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#opportunities">Opportunities</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button className="menu-toggle" aria-label="Toggle menu">☰</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Unlock Australia's <span className="highlight">$10B</span> Government Tech Market—<span className="highlight">$5K</span> Starts It</h1>
                <p>No Aussie office? No problem. We're your boots on the ground for 2025 bids.</p>
                <a href="#pricing" className="cta">Get Started – $5K Entry Kit</a>
                <button onClick={toggleLeadForm} className="secondary-cta">Download 2025 Bid Forecast</button>
            </div>
            <div className="social-proof">
                <p>Trusted by US tech firms eyeing AUKUS</p>
                <div className="logo-placeholder">
                    <div className="placeholder-item"></div>
                    <div className="placeholder-item"></div>
                    <div className="placeholder-item"></div>
                </div>
            </div>
        </section>

        {showLeadForm && (
            <div className="lead-form-overlay">
                <div className="lead-form-container">
                    <button className="close-btn" onClick={toggleLeadForm}>×</button>
                    <h2>Download 2025 Bid Forecast</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="company" placeholder="Company Name" required />
                        </div>
                        <button type="submit" className="submit-btn">Get Access Now</button>
                    </form>
                </div>
            </div>
        )}

        <section id="value-props" className="value-props-section">
            <div className="value-grid">
                <div className="value-card">
                    <h3>Person</h3>
                    <p>Your pitch to Defence in 30 days.</p>
                </div>
                <div className="value-card">
                    <h3>Place</h3>
                    <p>Office + ABN, instant legitimacy.</p>
                </div>
                <div className="value-card">
                    <h3>Kill</h3>
                    <p>Win tenders—$20M RAAF, $200M AUKUS.</p>
                </div>
            </div>
        </section>

        <section id="how-it-works" className="how-it-works-section">
            <h2>From Zero to Aussie Wins in 30 Days</h2>
            <div className="steps-grid">
                <div className="step-card">
                    <div className="step-number">1</div>
                    <h3>Sign Up</h3>
                    <p>$5K Kit—ABN, virtual office, intro pitch.</p>
                </div>
                <div className="step-card">
                    <div className="step-number">2</div>
                    <h3>Launch</h3>
                    <p>We pitch Defence, ASIO, or Space Command.</p>
                </div>
                <div className="step-card">
                    <div className="step-number">3</div>
                    <h3>Win</h3>
                    <p>Upgrade to $15K/month—lock in the contract.</p>
                </div>
            </div>
            <div className="example-box">
                <h3>Success Story</h3>
                <p>Red 6: $5K got them RAAF-ready; $15K aims for $20M.</p>
            </div>
            <a href="#pricing" className="cta">Start Now – $5K</a>
        </section>

        <section id="opportunities" className="opportunities-section">
            <h2>Your Tech + Australia's 2025 Tenders = Millions</h2>
            <div className="opportunity-tabs">
                <button className="tab active">Defence</button>
                <button className="tab">Cyber/AI</button>
                <button className="tab">Training/Sim</button>
            </div>
            <div className="opportunity-content">
                <div className="opportunity-tab-content active">
                    <div className="opportunity-card">
                        <h3>$200M AUKUS autonomy</h3>
                        <p>Q3 2025</p>
                    </div>
                    <div className="opportunity-card">
                        <h3>$30M ADF simulation</h3>
                        <p>Q4 2025</p>
                    </div>
                </div>
            </div>
            <a href="#" className="secondary-cta">Get Full 2025 Forecast</a>
            <a href="#pricing" className="cta">Claim Your Spot – $5K</a>
        </section>

        <section id="pricing" className="pricing-section">
            <h2>Your Australian Edge, Priced to Win</h2>
            <div className="pricing-grid">
                <div className="pricing-card">
                    <h3>Entry Kit</h3>
                    <div className="price">$5K</div>
                    <p className="price-period">One-time</p>
                    <ul className="features">
                        <li>ABN registration</li>
                        <li>Virtual office</li>
                        <li>1 government pitch</li>
                    </ul>
                    <a href="#contact" className="pricing-cta">Buy Now</a>
                </div>
                <div className="pricing-card featured">
                    <h3>Retainer</h3>
                    <div className="price">$15K</div>
                    <p className="price-period">per month</p>
                    <ul className="features">
                        <li>Full proxy representation</li>
                        <li>Ongoing meetings & bids</li>
                        <li>Contract win support</li>
                    </ul>
                    <a href="#contact" className="pricing-cta">Book a Call</a>
                </div>
            </div>
            <div className="comparison">
                <h3>Comparison</h3>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Entry Kit ($5K)</th>
                            <th>Retainer ($15K/mo)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Office</td>
                            <td>Virtual</td>
                            <td>Physical</td>
                        </tr>
                        <tr>
                            <td>Government Meetings</td>
                            <td>1</td>
                            <td>Unlimited</td>
                        </tr>
                        <tr>
                            <td>Bid Support</td>
                            <td>Basic</td>
                            <td>Comprehensive</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section id="contact" className="contact-section">
            <h2>Ready to Crack Australia? Let's Talk</h2>
            <p className="contact-intro">Fill out the form below, and our team will get back to you within 24 hours.</p>
            <form id="contact-form">
                <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                    <input type="text" name="company" placeholder="Company Name" required />
                </div>
                <div className="form-group">
                    <select name="service" required defaultValue="">
                        <option value="" disabled>Interested In</option>
                        <option value="entry-kit">Entry Kit ($5K)</option>
                        <option value="retainer">Retainer ($15K/month)</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea name="message" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
            <div className="contact-details">
                <p>Email: info@enterautsralia.tech</p>
                <p>Phone: +61 2 1234 5678</p>
                <p>Twitter: @EnterAustralia</p>
            </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
            <div className="footer-section">
                <h3>Enter Australia</h3>
                <p>Your trusted partner for Australian market entry and government contracts.</p>
            </div>
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#opportunities">Opportunities</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@enterautsralia.tech</p>
                <p>Phone: +61 2 1234 5678</p>
            </div>
        </div>
        <div className="copyright">
            <p>© 2025 Enter Australia. All rights reserved. | enterautsralia.tech</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
