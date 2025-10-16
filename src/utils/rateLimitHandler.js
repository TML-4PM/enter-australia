/**
 * Rate Limit Error Handler
 * Handles 429 (Too Many Requests) responses from API calls
 */

/**
 * Handle rate limit errors in Supabase function calls
 * @param {Error} error - The error from Supabase function invoke
 * @returns {Object} - Formatted error object with user message and retry info
 */
export const handleRateLimitError = (error) => {
  // Check if this is a rate limit error (429)
  if (error?.message?.includes('429') || error?.message?.includes('Rate limit') || error?.message?.includes('Too many')) {
    // Try to extract retry-after time from error message
    let retryAfter = 60; // default to 60 seconds
    let userMessage = 'Too many requests. Please try again in a minute.';
    
    // Parse retry time from error message if available
    const retryMatch = error.message.match(/try again in (\d+) (second|minute|hour)/i);
    if (retryMatch) {
      const amount = parseInt(retryMatch[1]);
      const unit = retryMatch[2].toLowerCase();
      
      if (unit === 'hour') {
        retryAfter = amount * 3600;
        userMessage = `Too many requests. Please try again in ${amount} ${amount > 1 ? 'hours' : 'hour'}.`;
      } else if (unit === 'minute') {
        retryAfter = amount * 60;
        userMessage = `Too many requests. Please try again in ${amount} ${amount > 1 ? 'minutes' : 'minute'}.`;
      } else {
        retryAfter = amount;
        userMessage = `Too many requests. Please try again in ${amount} seconds.`;
      }
    }
    
    // Check for contact form specific message
    if (error.message.includes('contact') || error.message.includes('troy@enteraustralia.tech')) {
      userMessage = 'Rate limit exceeded. Please wait before submitting again, or email us directly at troy@enteraustralia.tech';
    }
    
    return {
      isRateLimited: true,
      retryAfter,
      userMessage,
      timestamp: Date.now()
    };
  }
  
  // Not a rate limit error
  return {
    isRateLimited: false,
    userMessage: error?.message || 'An error occurred. Please try again.'
  };
};

/**
 * Calculate time remaining until retry is allowed
 * @param {number} rateLimitTimestamp - Timestamp when rate limit was hit
 * @param {number} retryAfter - Seconds to wait before retry
 * @returns {Object} - Remaining time info
 */
export const calculateRetryTime = (rateLimitTimestamp, retryAfter) => {
  const now = Date.now();
  const retryTime = rateLimitTimestamp + (retryAfter * 1000);
  const remainingMs = Math.max(0, retryTime - now);
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  
  return {
    canRetry: remainingMs === 0,
    remainingSeconds,
    remainingMinutes: minutes,
    displayText: minutes > 0 
      ? `${minutes}:${seconds.toString().padStart(2, '0')} minutes`
      : `${seconds} seconds`
  };
};

/**
 * Create a user-friendly error message component
 * @param {string} message - The error message
 * @param {number} retryAfter - Seconds until retry allowed
 * @returns {string} - Formatted HTML error message
 */
export const formatRateLimitMessage = (message, retryAfter) => {
  const minutes = Math.floor(retryAfter / 60);
  const timeText = minutes > 0 
    ? `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
    : `${retryAfter} seconds`;
  
  return `${message}\n\nPlease wait ${timeText} before trying again.`;
};

/**
 * Store rate limit state in sessionStorage
 * @param {string} endpoint - The endpoint that was rate limited
 * @param {number} retryAfter - Seconds to wait
 */
export const storeRateLimitState = (endpoint, retryAfter) => {
  try {
    const state = {
      endpoint,
      retryAfter,
      timestamp: Date.now()
    };
    sessionStorage.setItem(`rateLimit_${endpoint}`, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not store rate limit state:', e);
  }
};

/**
 * Get rate limit state from sessionStorage
 * @param {string} endpoint - The endpoint to check
 * @returns {Object|null} - Rate limit state or null
 */
export const getRateLimitState = (endpoint) => {
  try {
    const stored = sessionStorage.getItem(`rateLimit_${endpoint}`);
    if (!stored) return null;
    
    const state = JSON.parse(stored);
    const retryInfo = calculateRetryTime(state.timestamp, state.retryAfter);
    
    // Clear if retry time has passed
    if (retryInfo.canRetry) {
      sessionStorage.removeItem(`rateLimit_${endpoint}`);
      return null;
    }
    
    return {
      ...state,
      ...retryInfo
    };
  } catch (e) {
    console.warn('Could not retrieve rate limit state:', e);
    return null;
  }
};

/**
 * Clear rate limit state
 * @param {string} endpoint - The endpoint to clear
 */
export const clearRateLimitState = (endpoint) => {
  try {
    sessionStorage.removeItem(`rateLimit_${endpoint}`);
  } catch (e) {
    console.warn('Could not clear rate limit state:', e);
  }
};
