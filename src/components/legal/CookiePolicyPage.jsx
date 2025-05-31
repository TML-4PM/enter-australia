
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
            
            <h3>Essential Cookies (Always Active)</h3>
            <p>These cookies are necessary for the website to function and cannot be switched off:</p>
            <ul>
              <li><strong>Authentication Cookies:</strong> Keep you logged in during your session</li>
              <li><strong>Security Cookies:</strong> Protect against cross-site request forgery</li>
              <li><strong>Load Balancing:</strong> Ensure optimal server performance</li>
              <li><strong>GDPR Consent:</strong> Remember your cookie preferences</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>Help us understand how visitors interact with our website and AI features:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Track page views, user flows, and engagement metrics</li>
              <li><strong>AI Usage Analytics:</strong> Monitor AI feature adoption and performance</li>
              <li><strong>Conversion Tracking:</strong> Measure effectiveness of our services</li>
              <li><strong>Error Tracking:</strong> Identify and fix technical issues</li>
              <li><strong>A/B Testing:</strong> Compare different versions of AI features</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>Remember your preferences and settings to enhance your experience:</p>
            <ul>
              <li><strong>Language Preference:</strong> Remember your selected language (English, Arabic, Chinese, Hindi)</li>
              <li><strong>AI Settings:</strong> Store your AI model preferences and settings</li>
              <li><strong>Dashboard Layout:</strong> Remember your customized interface layout</li>
              <li><strong>Notification Preferences:</strong> Store your communication preferences</li>
              <li><strong>Theme Settings:</strong> Remember dark/light mode preferences</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>Used to deliver relevant advertisements and track marketing performance:</p>
            <ul>
              <li><strong>LinkedIn Insight Tag:</strong> Track professional engagement</li>
              <li><strong>Facebook Pixel:</strong> Measure social media advertising effectiveness</li>
              <li><strong>Google Ads:</strong> Deliver targeted advertisements</li>
              <li><strong>Remarketing Tags:</strong> Show relevant content to returning visitors</li>
            </ul>

            <h3>AI-Specific Cookies</h3>
            <p>Support our artificial intelligence features and personalization:</p>
            <ul>
              <li><strong>AI Session State:</strong> Maintain context during AI conversations</li>
              <li><strong>Model Preferences:</strong> Remember your preferred AI models and settings</li>
              <li><strong>Usage Patterns:</strong> Optimize AI recommendations based on your behavior</li>
              <li><strong>Performance Optimization:</strong> Cache AI responses to improve speed</li>
            </ul>
          </section>

          <section>
            <h2>Detailed Cookie Information</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Cookie Name</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Purpose</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Duration</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>_ga</td>
                    <td style={{ padding: '0.5rem' }}>Google Analytics user identification</td>
                    <td style={{ padding: '0.5rem' }}>2 years</td>
                    <td style={{ padding: '0.5rem' }}>Analytics</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>auth_token</td>
                    <td style={{ padding: '0.5rem' }}>User authentication</td>
                    <td style={{ padding: '0.5rem' }}>Session</td>
                    <td style={{ padding: '0.5rem' }}>Essential</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>ai_preferences</td>
                    <td style={{ padding: '0.5rem' }}>AI model and feature preferences</td>
                    <td style={{ padding: '0.5rem' }}>1 year</td>
                    <td style={{ padding: '0.5rem' }}>Functional</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>language</td>
                    <td style={{ padding: '0.5rem' }}>Selected interface language</td>
                    <td style={{ padding: '0.5rem' }}>1 year</td>
                    <td style={{ padding: '0.5rem' }}>Functional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            
            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to block or delete cookies. However, if you do this, 
              some parts of our website may not work properly, especially AI features that 
              rely on session state.
            </p>
            
            <h3>Cookie Consent Manager</h3>
            <p>
              You can update your cookie preferences at any time using our consent manager. 
              Look for the "Cookie Settings" link in the footer or{' '}
              <button 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--primary-color)', 
                  textDecoration: 'underline', 
                  cursor: 'pointer' 
                }}
                onClick={() => {
                  // This would trigger the cookie consent manager
                  console.log('Cookie consent manager would open here');
                }}
              >
                click here to manage your preferences
              </button>.
            </p>

            <h3>Opt-Out Links</h3>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li><a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
              <li><a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer">LinkedIn Opt-out</a></li>
            </ul>
          </section>

          <section>
            <h2>Third-Party Cookies</h2>
            <p>
              We may use third-party services such as Google Analytics, AI service providers, 
              and marketing platforms, which may place cookies on your device. These services 
              have their own cookie policies:
            </p>
            <ul>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer">OpenAI Privacy Policy</a></li>
              <li><a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">Facebook Privacy Policy</a></li>
              <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">LinkedIn Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our 
              practices or for other operational, legal, or regulatory reasons. We will notify 
              you of any material changes by posting the updated policy on our website.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{' '}
              <a href="mailto:privacy@enteraustralia.tech">privacy@enteraustralia.tech</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
