
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: January 30, 2025</p>
        
        <div className="legal-content">
          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              contact us, or use our services. This may include your name, email address, company 
              information, and communication preferences.
            </p>
            <h3>AI-Related Data Collection</h3>
            <p>
              When you interact with our AI-powered features, we may collect and process:
            </p>
            <ul>
              <li>Your prompts, queries, and inputs to AI systems</li>
              <li>AI-generated responses and recommendations</li>
              <li>Usage patterns and interaction data with AI features</li>
              <li>Feedback on AI-generated content quality</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and improve our services</li>
              <li>To communicate with you about our services</li>
              <li>To send you updates and marketing communications</li>
              <li>To comply with legal obligations</li>
              <li><strong>To train and improve our AI models and algorithms</strong></li>
              <li><strong>To personalize AI-generated content and recommendations</strong></li>
              <li><strong>To detect and prevent misuse of AI features</strong></li>
            </ul>
          </section>

          <section>
            <h2>AI Data Processing and Model Training</h2>
            <p>
              <strong>Important:</strong> Your interactions with our AI features may be used to improve 
              our services, including training and refining our AI models. We implement the following 
              safeguards:
            </p>
            <ul>
              <li>Personal identifiers are removed or anonymized before model training</li>
              <li>Sensitive business information is filtered out of training datasets</li>
              <li>You can opt-out of AI model training by contacting us</li>
              <li>AI-generated content is not stored indefinitely and follows our data retention policy</li>
            </ul>
          </section>

          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with trusted service providers who assist us 
              in operating our website and conducting our business.
            </p>
            <h3>AI Service Providers</h3>
            <p>
              We work with third-party AI service providers (such as OpenAI, Google, or similar) 
              to deliver AI features. These providers may process your data according to their 
              own privacy policies. We ensure all AI partners meet our data protection standards.
            </p>
          </section>

          <section>
            <h2>Your Rights Under GDPR</h2>
            <p>
              If you are located in the European Union, you have the following rights regarding 
              your personal data:
            </p>
            <ul>
              <li><strong>Right to Access:</strong> Request copies of your personal data</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
              <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              <li><strong>Right to Opt-out of AI Training:</strong> Prevent use of your data for AI model training</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@enteraustralia.tech">privacy@enteraustralia.tech</a>
            </p>
          </section>

          <section>
            <h2>Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to provide our services 
              and comply with legal obligations:
            </p>
            <ul>
              <li>Account information: Until account deletion or 3 years of inactivity</li>
              <li>AI interaction data: 12 months, unless opted out sooner</li>
              <li>Training data (anonymized): Up to 24 months for model improvement</li>
              <li>Support communications: 5 years for legal compliance</li>
            </ul>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication for AI systems</li>
              <li>Monitoring for unusual AI usage patterns</li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>General inquiries: <a href="mailto:info@enteraustralia.tech">info@enteraustralia.tech</a></li>
              <li>Privacy matters: <a href="mailto:privacy@enteraustralia.tech">privacy@enteraustralia.tech</a></li>
              <li>Data protection officer: <a href="mailto:dpo@enteraustralia.tech">dpo@enteraustralia.tech</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
