
import React, { useState, useEffect } from 'react';
import { X, Gift, FileText, Calendar } from 'lucide-react';
import { trackCtaClick } from '../utils/analyticsUtils';

const ExitIntentPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [offer, setOffer] = useState(null);

  const offers = [
    {
      id: 'free-assessment',
      title: 'Wait! Get Your FREE Market Entry Assessment',
      subtitle: 'Before you go, discover your Australia market opportunity',
      description: 'Get a personalized 15-minute assessment of your Australian market potential - completely free.',
      buttonText: 'Get Free Assessment',
      icon: FileText,
      value: 'Assessment worth $500'
    },
    {
      id: 'strategy-guide',
      title: 'Download Our Complete AUKUS Strategy Guide',
      subtitle: 'The insider\'s guide to $368B in opportunities',
      description: 'Get the complete playbook that helped 50+ companies secure Australian government contracts.',
      buttonText: 'Download Guide',
      icon: Gift,
      value: 'Normally $99 - Free today'
    },
    {
      id: 'consultation',
      title: 'Book a FREE 30-Minute Strategy Call',
      subtitle: 'Speak directly with our Australia market experts',
      description: 'Get personalized advice on your market entry strategy from our team of specialists.',
      buttonText: 'Book Free Call',
      icon: Calendar,
      value: 'Consultation worth $300'
    }
  ];

  useEffect(() => {
    // Randomly select an offer for A/B testing
    const randomOffer = offers[Math.floor(Math.random() * offers.length)];
    setOffer(randomOffer);

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true);
        // Track exit intent trigger
        if (window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'Engagement',
            event_label: randomOffer.id
          });
        }
      }
    };

    // Only trigger on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
    // Track popup close
    if (window.gtag) {
      window.gtag('event', 'exit_intent_closed', {
        event_category: 'Engagement',
        event_label: offer?.id
      });
    }
  };

  const handleCtaClick = () => {
    trackCtaClick(offer.buttonText, offer.id);
    // Trigger lead form or redirect based on offer
    if (window.toggleLeadForm) {
      window.toggleLeadForm();
    }
    setIsVisible(false);
  };

  if (!isVisible || !offer) return null;

  const IconComponent = offer.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
              <IconComponent size={32} className="text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {offer.title}
          </h3>
          
          <p className="text-lg text-green-600 font-semibold mb-3">
            {offer.subtitle}
          </p>
          
          <p className="text-gray-600 mb-4">
            {offer.description}
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm font-semibold text-yellow-800">
              🎯 {offer.value}
            </p>
          </div>
          
          <button
            onClick={handleCtaClick}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-3"
          >
            {offer.buttonText}
          </button>
          
          <p className="text-xs text-gray-500">
            No spam. Unsubscribe anytime. Your data is secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
