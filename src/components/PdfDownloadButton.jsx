
import React, { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { saveLead } from '../utils/leadUtils';
import '../styles/pdf-download.css';

const PdfDownloadButton = ({ tierName, setErrorMessage }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleDownloadRequest = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the download event
      if (window.gtag) {
        window.gtag('event', 'pdf_download', {
          'event_category': 'Downloads',
          'event_label': tierName,
          'value': 1
        });
      }
      
      // Save the lead
      const result = await saveLead({
        ...formData, 
        source: `pdf_download_${tierName.toLowerCase().replace(/\s+/g, '_')}`
      });

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          // Simulate PDF download - in production replace with actual PDF file
          const pdfUrl = `/pdfs/${tierName.toLowerCase().replace(/\s+/g, '-')}-blueprint.pdf`;
          
          // Create an anchor element and trigger download
          const a = document.createElement('a');
          a.href = pdfUrl;
          a.download = `${tierName} Blueprint.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          setShowForm(false);
          setFormData({ name: '', email: '', company: '' });
          setSubmitted(false);
        }, 1500);
      } else {
        setErrorMessage('There was an issue processing your request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pdf-download-container">
      {!showForm ? (
        <button 
          onClick={handleDownloadRequest} 
          className="pdf-download-btn"
        >
          <DownloadIcon size={18} />
          <span>Download {tierName} Blueprint PDF</span>
        </button>
      ) : (
        <div className="pdf-form-container">
          {!submitted ? (
            <>
              <h4>Complete to Download Your {tierName} Blueprint</h4>
              <form onSubmit={handleSubmit}>
                <div className="pdf-form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pdf-form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="pdf-form-group">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="pdf-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Download Now'}
                </button>
              </form>
            </>
          ) : (
            <div className="pdf-success-message">
              <div className="checkmark">✓</div>
              <p>Thank you! Your PDF is downloading now.</p>
              <p className="email-note">We've sent a copy to your email as well.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfDownloadButton;
