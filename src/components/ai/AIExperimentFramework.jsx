
import React, { useState, useEffect } from 'react';
import { trackAIInteraction } from '../../utils/aiAnalyticsUtils';

const AIExperimentFramework = ({ 
  experimentName, 
  variants, 
  children, 
  onVariantSelected 
}) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [experimentData, setExperimentData] = useState(null);

  useEffect(() => {
    initializeExperiment();
  }, [experimentName]);

  const initializeExperiment = () => {
    // Get or create experiment assignment
    const storageKey = `experiment_${experimentName}`;
    let assignment = localStorage.getItem(storageKey);
    
    if (!assignment) {
      // Randomly assign user to a variant
      const variantIndex = Math.floor(Math.random() * variants.length);
      assignment = variants[variantIndex].id;
      localStorage.setItem(storageKey, assignment);
      
      // Track experiment assignment
      trackAIInteraction('experiment_assigned', {
        experimentName,
        variant: assignment,
        timestamp: new Date().toISOString()
      });
    }
    
    const variant = variants.find(v => v.id === assignment) || variants[0];
    setSelectedVariant(variant);
    setExperimentData({ experimentName, variant: variant.id });
    
    if (onVariantSelected) {
      onVariantSelected(variant);
    }
  };

  const trackExperimentEvent = (eventType, data = {}) => {
    if (experimentData) {
      trackAIInteraction('experiment_event', {
        experimentName: experimentData.experimentName,
        variant: experimentData.variant,
        eventType,
        ...data
      });
    }
  };

  // Provide experiment context to children
  const experimentContext = {
    variant: selectedVariant,
    trackEvent: trackExperimentEvent,
    isExperimentActive: !!selectedVariant
  };

  return (
    <div className="ai-experiment-framework" data-experiment={experimentName}>
      {selectedVariant && children(experimentContext)}
    </div>
  );
};

export default AIExperimentFramework;
