
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { trackAIFeedback } from '../../utils/aiAnalyticsUtils';

const AIFeedbackWidget = ({ responseId, content, onFeedback }) => {
  const [feedback, setFeedback] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
    trackAIFeedback(responseId, type, { content_length: content?.length || 0 });
    
    if (onFeedback) {
      onFeedback(type, comment);
    }
    
    // Show comment option for negative feedback
    if (type === 'negative') {
      setShowComment(true);
    } else {
      setSubmitted(true);
    }
  };

  const handleCommentSubmit = () => {
    trackAIFeedback(responseId, 'negative_with_comment', { 
      comment,
      content_length: content?.length || 0 
    });
    
    if (onFeedback) {
      onFeedback('negative', comment);
    }
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ai-feedback-widget submitted">
        <span className="feedback-thanks">Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="ai-feedback-widget">
      {!feedback ? (
        <div className="feedback-buttons">
          <span className="feedback-label">Was this helpful?</span>
          <button 
            onClick={() => handleFeedback('positive')}
            className="feedback-btn positive"
            aria-label="Thumbs up"
          >
            <ThumbsUp size={16} />
          </button>
          <button 
            onClick={() => handleFeedback('negative')}
            className="feedback-btn negative"
            aria-label="Thumbs down"
          >
            <ThumbsDown size={16} />
          </button>
        </div>
      ) : showComment ? (
        <div className="feedback-comment">
          <div className="comment-input">
            <MessageSquare size={16} />
            <textarea
              placeholder="How can we improve this response?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
            />
          </div>
          <div className="comment-actions">
            <button onClick={handleCommentSubmit} className="btn primary small">
              Submit
            </button>
            <button onClick={() => setSubmitted(true)} className="btn secondary small">
              Skip
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AIFeedbackWidget;
