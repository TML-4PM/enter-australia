
import React from 'react';

const CookiePolicyPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Cookie Policy</h1>
        <p className="last-updated">Last updated: January 30, 2025</p>
        
        <div className="legal-content">
          <section>
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device 
              when you visit our website. They help us provide you with a better experience 
              by remembering your preferences and understanding how you use our site.
            </p>
          </section>

          <section>
            <h2>Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Most browsers allow you to 
              block or delete cookies. However, if you do this, some parts of our website 
              may not work properly.
            </p>
          </section>

          <section>
            <h2>Third-Party Cookies</h2>
            <p>
              We may use third-party services such as Google Analytics, which may place 
              cookies on your device. These services have their own cookie policies.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{' '}
              <a href="mailto:info@enteraustralia.tech">info@enteraustralia.tech</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
