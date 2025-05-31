/**
 * AI-specific analytics and monitoring utilities
 */

/**
 * Track AI interactions and usage patterns
 */
export const trackAIInteraction = (interactionType, details = {}) => {
  if (window.gtag) {
    window.gtag('event', 'ai_interaction', {
      'event_category': 'AI Usage',
      'event_label': interactionType,
      'custom_parameters': {
        feature: details.feature || 'unknown',
        response_time: details.responseTime || 0,
        success: details.success !== false,
        user_satisfaction: details.satisfaction || null
      }
    });
  }
  
  // Store for local analytics
  const interactions = JSON.parse(localStorage.getItem('ai_interactions') || '[]');
  interactions.push({
    type: interactionType,
    timestamp: new Date().toISOString(),
    ...details
  });
  
  // Keep only last 100 interactions
  if (interactions.length > 100) {
    interactions.splice(0, interactions.length - 100);
  }
  
  localStorage.setItem('ai_interactions', JSON.stringify(interactions));
};

/**
 * Track AI response quality and user feedback
 */
export const trackAIFeedback = (responseId, feedback, details = {}) => {
  if (window.gtag) {
    window.gtag('event', 'ai_feedback', {
      'event_category': 'AI Quality',
      'event_label': feedback, // 'positive', 'negative', 'neutral'
      'value': feedback === 'positive' ? 1 : (feedback === 'negative' ? -1 : 0)
    });
  }
  
  trackAIInteraction('feedback_submitted', {
    responseId,
    feedback,
    ...details
  });
};

/**
 * Monitor AI API costs and usage
 */
export const trackAICost = (operation, tokens = 0, cost = 0) => {
  const costData = JSON.parse(localStorage.getItem('ai_cost_tracking') || '{}');
  const today = new Date().toISOString().split('T')[0];
  
  if (!costData[today]) {
    costData[today] = { totalTokens: 0, totalCost: 0, operations: {} };
  }
  
  costData[today].totalTokens += tokens;
  costData[today].totalCost += cost;
  
  if (!costData[today].operations[operation]) {
    costData[today].operations[operation] = { count: 0, tokens: 0, cost: 0 };
  }
  
  costData[today].operations[operation].count++;
  costData[today].operations[operation].tokens += tokens;
  costData[today].operations[operation].cost += cost;
  
  localStorage.setItem('ai_cost_tracking', JSON.stringify(costData));
  
  if (window.gtag) {
    window.gtag('event', 'ai_cost_tracking', {
      'event_category': 'AI Cost',
      'event_label': operation,
      'value': cost
    });
  }
};

/**
 * Get AI usage analytics summary
 */
export const getAIUsageAnalytics = () => {
  const interactions = JSON.parse(localStorage.getItem('ai_interactions') || '[]');
  const costData = JSON.parse(localStorage.getItem('ai_cost_tracking') || '{}');
  
  const today = new Date().toISOString().split('T')[0];
  const todayInteractions = interactions.filter(i => i.timestamp.startsWith(today));
  
  return {
    totalInteractions: interactions.length,
    todayInteractions: todayInteractions.length,
    successRate: interactions.filter(i => i.success !== false).length / Math.max(interactions.length, 1),
    averageResponseTime: interactions.reduce((sum, i) => sum + (i.responseTime || 0), 0) / Math.max(interactions.length, 1),
    costData: costData[today] || { totalTokens: 0, totalCost: 0, operations: {} },
    popularFeatures: todayInteractions.reduce((acc, i) => {
      acc[i.feature || 'unknown'] = (acc[i.feature || 'unknown'] || 0) + 1;
      return acc;
    }, {})
  };
};
