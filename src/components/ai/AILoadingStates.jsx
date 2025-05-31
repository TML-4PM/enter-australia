
import React from 'react';
import { Brain, Loader, Sparkles } from 'lucide-react';

export const AIThinkingLoader = ({ message = "AI is thinking..." }) => (
  <div className="ai-thinking-loader">
    <div className="thinking-animation">
      <Brain className="brain-icon" size={32} />
      <div className="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <p className="thinking-message">{message}</p>
  </div>
);

export const AIGeneratingLoader = ({ progress = 0, message = "Generating response..." }) => (
  <div className="ai-generating-loader">
    <div className="generating-header">
      <Sparkles className="sparkles-icon" size={24} />
      <span>{message}</span>
    </div>
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
    </div>
    {progress > 0 && (
      <div className="progress-text">{Math.round(progress)}% complete</div>
    )}
  </div>
);

export const AISkeletonContent = ({ lines = 3 }) => (
  <div className="ai-skeleton-content">
    {Array.from({ length: lines }, (_, i) => (
      <div 
        key={i} 
        className="skeleton-line"
        style={{ 
          width: i === lines - 1 ? '70%' : '100%',
          animationDelay: `${i * 0.1}s`
        }}
      ></div>
    ))}
  </div>
);

export const AIStreamingLoader = ({ streamedContent = "", isComplete = false }) => (
  <div className="ai-streaming-loader">
    <div className="streamed-content">
      {streamedContent}
      {!isComplete && <span className="cursor-blink">|</span>}
    </div>
    {!isComplete && (
      <div className="streaming-indicator">
        <Loader className="animate-spin" size={16} />
        <span>Streaming response...</span>
      </div>
    )}
  </div>
);
