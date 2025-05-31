
import React from 'react';

const TermsPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: January 30, 2025</p>
        
        <div className="legal-content">
          <section>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using Enter Australia's services, you accept and agree to be 
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2>Services</h2>
            <p>
              Enter Australia provides market entry consulting, government contract assistance, 
              and business advisory services for international companies seeking to enter the 
              Australian market. Our services may include AI-powered features for market analysis, 
              content generation, and business recommendations.
            </p>
          </section>

          <section>
            <h2>AI Services and Content Generation</h2>
            <p>
              Our platform incorporates artificial intelligence to enhance your experience. 
              By using these features, you acknowledge and agree to the following:
            </p>
            <h3>AI Usage Limitations</h3>
            <ul>
              <li>AI-generated content is for informational purposes only and should not be considered professional legal, financial, or business advice</li>
              <li>You are responsible for reviewing and verifying all AI-generated content before use</li>
              <li>AI responses may not always be accurate, complete, or up-to-date</li>
              <li>We do not guarantee the reliability or suitability of AI-generated content for your specific needs</li>
            </ul>
            
            <h3>Prohibited AI Usage</h3>
            <p>You agree not to use our AI features to:</p>
            <ul>
              <li>Generate harmful, illegal, defamatory, or inappropriate content</li>
              <li>Attempt to reverse-engineer or extract our AI models</li>
              <li>Overwhelm our systems with excessive requests (rate limiting applies)</li>
              <li>Share AI-generated content that could violate intellectual property rights</li>
              <li>Use AI outputs to compete directly with our services</li>
            </ul>

            <h3>Content Ownership and Licensing</h3>
            <ul>
              <li>You retain ownership of content you input into our AI systems</li>
              <li>AI-generated content is provided under a non-exclusive license for your business use</li>
              <li>We reserve the right to use anonymized interaction data to improve our AI models</li>
              <li>You grant us permission to process your inputs through third-party AI services as necessary</li>
            </ul>
          </section>

          <section>
            <h2>User Responsibilities</h2>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Use our services in accordance with applicable laws</li>
              <li>Respect intellectual property rights</li>
              <li><strong>Use AI features responsibly and ethically</strong></li>
              <li><strong>Verify AI-generated content before making business decisions</strong></li>
              <li><strong>Report any AI-generated content that appears harmful or inappropriate</strong></li>
            </ul>
          </section>

          <section>
            <h2>Payment Terms</h2>
            <p>
              Payment terms are specified in individual service agreements. All fees are 
              non-refundable unless otherwise stated in writing. AI feature usage may be 
              subject to additional charges based on consumption.
            </p>
          </section>

          <section>
            <h2>Service Availability and AI Performance</h2>
            <p>
              While we strive to provide reliable services, we cannot guarantee:
            </p>
            <ul>
              <li>Continuous availability of AI features (they may be temporarily unavailable for maintenance)</li>
              <li>Consistent response times for AI-generated content</li>
              <li>Accuracy or completeness of AI outputs</li>
              <li>That AI features will meet your specific requirements</li>
            </ul>
          </section>

          <section>
            <h2>Limitation of Liability</h2>
            <p>
              Enter Australia shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of our services, 
              including but not limited to:
            </p>
            <ul>
              <li>Reliance on AI-generated content or recommendations</li>
              <li>Business decisions made based on AI outputs</li>
              <li>Temporary unavailability of AI features</li>
              <li>Inaccuracies in AI-generated market analysis or business advice</li>
            </ul>
          </section>

          <section>
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Enter Australia from any claims, 
              damages, or expenses arising from your misuse of AI features or violation 
              of these terms.
            </p>
          </section>

          <section>
            <h2>Changes to AI Features</h2>
            <p>
              We reserve the right to modify, update, or discontinue AI features at any time. 
              We will provide reasonable notice of significant changes that may affect your 
              use of our services.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:legal@enteraustralia.tech">legal@enteraustralia.tech</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
