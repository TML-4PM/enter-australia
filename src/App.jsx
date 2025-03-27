
import React from 'react';

function App() {
  return (
    <div className="app">
      <header>
        <nav>
            <div className="logo">Enter Australia</div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <button className="menu-toggle" aria-label="Toggle menu">☰</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
            <div className="hero-content">
                <h1>Your Gateway to <span className="highlight">Australia</span></h1>
                <p>We make your journey to Australia simple, smooth, and successful.</p>
                <a href="#contact" className="cta">Start Your Journey</a>
            </div>
        </section>

        <section id="services">
            <h2>Our Services</h2>
            <div className="services-grid">
                <article className="service-card">
                    <div className="service-icon visa-icon"></div>
                    <h3>Visa Assistance</h3>
                    <p>Expert guidance through the complex visa application process, ensuring the highest chance of success.</p>
                    <a href="#contact" className="service-link">Learn More</a>
                </article>
                <article className="service-card">
                    <div className="service-icon job-icon"></div>
                    <h3>Job Placement</h3>
                    <p>Connect with top Australian employers through our extensive network and secure your dream job.</p>
                    <a href="#contact" className="service-link">Learn More</a>
                </article>
                <article className="service-card">
                    <div className="service-icon relocation-icon"></div>
                    <h3>Relocation Support</h3>
                    <p>Comprehensive support for a seamless transition to Australia, from housing to banking setup.</p>
                    <a href="#contact" className="service-link">Learn More</a>
                </article>
            </div>
        </section>

        <section id="about" className="about-section">
            <div className="about-content">
                <h2>About Us</h2>
                <p>At Enter Australia, we understand that moving to a new country is one of life's biggest decisions. Our team of immigration experts and relocation specialists has helped thousands of individuals and families successfully make Australia their new home.</p>
                <p>With over 15 years of experience, we pride ourselves on our personalized approach, ensuring each client receives tailored guidance throughout their journey.</p>
            </div>
            <div className="about-image"></div>
        </section>

        <section id="testimonials" className="testimonials-section">
            <h2>Success Stories</h2>
            <div className="testimonial-slider">
                <div className="testimonial">
                    <p>"Enter Australia made my dream come true. Their visa assistance was exceptional, and I received my PR in just 6 months!"</p>
                    <div className="testimonial-author">- Sarah K., UK</div>
                </div>
            </div>
        </section>

        <section id="contact" className="contact-section">
            <h2>Start Your Australian Journey</h2>
            <p className="contact-intro">Fill out the form below, and our immigration experts will get back to you within 24 hours.</p>
            <form id="contact-form">
                <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                    <select name="service" required defaultValue="">
                        <option value="" disabled>Select Service</option>
                        <option value="visa">Visa Assistance</option>
                        <option value="job">Job Placement</option>
                        <option value="relocation">Relocation Support</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea name="message" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </section>
      </main>

      <footer>
        <div className="footer-content">
            <div className="footer-section">
                <h3>Enter Australia</h3>
                <p>Your trusted partner for Australian immigration and relocation.</p>
            </div>
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@enteraustralia.com</p>
                <p>Phone: +61 2 1234 5678</p>
            </div>
        </div>
        <div className="copyright">
            <p>© 2025 Enter Australia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
