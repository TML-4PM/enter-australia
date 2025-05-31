
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class AIServiceErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      isAIServiceDown: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Check if it's an AI service error
    const isAIServiceDown = error.message?.includes('AI') || 
                           error.message?.includes('OpenAI') || 
                           error.message?.includes('API');
    
    return { 
      hasError: true,
      isAIServiceDown
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    console.error('AI Service Error Boundary caught an error:', error, errorInfo);
    
    // Track AI service errors
    if (window.gtag) {
      window.gtag('event', 'ai_service_error', {
        'event_category': 'AI Error',
        'event_label': error.message,
        'value': 1
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, isAIServiceDown: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="ai-error-boundary">
          <div className="ai-error-container">
            <div className="ai-error-content">
              <AlertTriangle size={48} className="error-icon text-orange-500" />
              
              {this.state.isAIServiceDown ? (
                <>
                  <h2>AI Services Temporarily Unavailable</h2>
                  <p>
                    Our AI features are currently experiencing issues. Don't worry - 
                    all other features of enterAustralia.tech are still working perfectly.
                  </p>
                  <div className="fallback-content">
                    <h3>In the meantime, you can:</h3>
                    <ul>
                      <li>Browse our pricing plans and services</li>
                      <li>Contact our team directly for assistance</li>
                      <li>Download our market entry blueprints</li>
                      <li>Schedule a consultation call</li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <h2>Something went wrong</h2>
                  <p>
                    We encountered an unexpected error. Our team has been notified 
                    and we're working to resolve this quickly.
                  </p>
                </>
              )}
              
              <div className="error-actions">
                <button onClick={this.handleRetry} className="btn primary">
                  <RefreshCw size={20} />
                  Try Again
                </button>
                <Link to="/" className="btn secondary">
                  <Home size={20} />
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AIServiceErrorBoundary;
