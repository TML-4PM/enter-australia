
/**
 * AI Service utilities for error handling, rate limiting, and security
 */

// Rate limiting state
let apiCallCount = 0;
let lastResetTime = Date.now();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_CALLS_PER_MINUTE = 30;

/**
 * Check if we're hitting rate limits
 */
export const checkRateLimit = () => {
  const now = Date.now();
  
  // Reset counter if window has passed
  if (now - lastResetTime > RATE_LIMIT_WINDOW) {
    apiCallCount = 0;
    lastResetTime = now;
  }
  
  if (apiCallCount >= MAX_CALLS_PER_MINUTE) {
    throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
  }
  
  apiCallCount++;
  return true;
};

/**
 * Sanitize AI prompts to prevent injection attacks
 */
export const sanitizeAIPrompt = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return '';
  }
  
  // Remove potential injection patterns
  const sanitized = prompt
    .replace(/system:/gi, 'system_')
    .replace(/assistant:/gi, 'assistant_')
    .replace(/user:/gi, 'user_')
    .replace(/<\|.*?\|>/g, '') // Remove special tokens
    .replace(/\[INST\].*?\[\/INST\]/g, '') // Remove instruction patterns
    .trim();
  
  // Limit length to prevent abuse
  return sanitized.substring(0, 2000);
};

/**
 * Filter inappropriate content from AI outputs
 */
export const filterAIContent = (content) => {
  if (!content || typeof content !== 'string') {
    return content;
  }
  
  // Basic content filtering - in production, use a proper content moderation service
  const inappropriatePatterns = [
    /\b(hate|violence|harmful)\b/gi,
    // Add more patterns as needed
  ];
  
  let filtered = content;
  inappropriatePatterns.forEach(pattern => {
    filtered = filtered.replace(pattern, '[content filtered]');
  });
  
  return filtered;
};

/**
 * Handle AI API calls with retry logic
 */
export const callAIServiceWithRetry = async (apiCall, maxRetries = 3) => {
  checkRateLimit();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return filterAIContent(result);
    } catch (error) {
      console.error(`AI API call attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw new Error(`AI service unavailable after ${maxRetries} attempts. Please try again later.`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Check AI service health
 */
export const checkAIServiceHealth = async () => {
  try {
    // In a real implementation, this would ping your AI service health endpoint
    await new Promise(resolve => setTimeout(resolve, 100));
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date().toISOString() };
  }
};
