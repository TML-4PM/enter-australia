
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';

const AIContentModerator = ({ content, onModerated, children }) => {
  const [moderationResult, setModerationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    moderateContent(content);
  }, [content]);

  const moderateContent = async (text) => {
    setIsLoading(true);
    
    try {
      // Basic content moderation - in production, use a proper service
      const moderationChecks = {
        hasInappropriateLanguage: checkInappropriateLanguage(text),
        hasSpam: checkSpamPatterns(text),
        hasMisinformation: checkMisinformationPatterns(text),
        hasPersonalInfo: checkPersonalInformation(text)
      };
      
      const issues = Object.entries(moderationChecks)
        .filter(([_, hasIssue]) => hasIssue)
        .map(([issue, _]) => issue);
      
      const result = {
        isClean: issues.length === 0,
        issues,
        confidence: 0.8, // Simulated confidence score
        suggestions: generateSuggestions(issues)
      };
      
      setModerationResult(result);
      
      if (onModerated) {
        onModerated(result);
      }
      
    } catch (error) {
      console.error('Content moderation error:', error);
      setModerationResult({ isClean: true, issues: [], confidence: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const checkInappropriateLanguage = (text) => {
    const inappropriatePatterns = [
      /\b(hate|violence|harmful)\b/gi,
      // Add more patterns as needed
    ];
    return inappropriatePatterns.some(pattern => pattern.test(text));
  };

  const checkSpamPatterns = (text) => {
    const spamPatterns = [
      /click here now/gi,
      /100% guaranteed/gi,
      /urgent.*action.*required/gi
    ];
    return spamPatterns.some(pattern => pattern.test(text));
  };

  const checkMisinformationPatterns = (text) => {
    // Basic checks for potential misinformation keywords
    const misinfoPatterns = [
      /doctors don't want you to know/gi,
      /secret.*they.*don't.*want/gi
    ];
    return misinfoPatterns.some(pattern => pattern.test(text));
  };

  const checkPersonalInformation = (text) => {
    const piiPatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/, // Email
      /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/ // Credit card pattern
    ];
    return piiPatterns.some(pattern => pattern.test(text));
  };

  const generateSuggestions = (issues) => {
    const suggestionMap = {
      hasInappropriateLanguage: 'Consider using more professional language',
      hasSpam: 'Remove promotional language and focus on valuable content',
      hasMisinformation: 'Verify claims with reliable sources',
      hasPersonalInfo: 'Remove personal information for privacy protection'
    };
    
    return issues.map(issue => suggestionMap[issue]).filter(Boolean);
  };

  if (isLoading) {
    return (
      <div className="ai-content-moderator loading">
        <Shield className="animate-spin" size={20} />
        <span>Checking content...</span>
      </div>
    );
  }

  if (!moderationResult?.isClean) {
    return (
      <div className="ai-content-moderator warning">
        <div className="moderation-warning">
          <AlertTriangle size={24} className="text-orange-500" />
          <div className="warning-content">
            <h4>Content Review Required</h4>
            <p>This content may need review before displaying:</p>
            <ul>
              {moderationResult.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="moderation-actions">
          <button 
            onClick={() => setModerationResult({ ...moderationResult, isClean: true })}
            className="btn secondary small"
          >
            Show Anyway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-content-moderator clean">
      <div className="moderation-status">
        <CheckCircle size={16} className="text-green-500" />
        <span className="status-text">Content verified</span>
      </div>
      {children}
    </div>
  );
};

export default AIContentModerator;
