
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
// This key is safe to expose in frontend code
export const stripePromise = loadStripe('pk_test_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in');

// Define the product IDs and details
export const PRODUCTS = {
  ASSESSMENT: {
    name: 'Assessment',
    isSubscription: false,
    price: 'Free',
    period: 'One-time',
    description: 'Get a free market assessment for your business and understand your Australian opportunity.',
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      'Australian Market Overview',
      'Basic Regulatory Guidance',
      '30-minute Strategy Call',
      'Access to Resource Library'
    ]
  },
  ENTRY_KIT: {
    priceId: 'price_1R6NDED6fFdhmypRzqX57oPS',
    name: 'Entry Kit',
    isSubscription: false,
    price: '$5K',
    period: 'One-time payment',
    description: 'One-time payment to establish your Australian presence and get your first government introduction.',
    features: [
      'Australian Business Number (ABN) registration',
      'Virtual office in strategic location',
      'Localized marketing materials',
      'Introduction to one government department',
      'Capability brief development',
      '30-day initial market entry support',
      '7-10 business days turnaround'
    ]
  },
  GROWTH: {
    priceId: 'price_1R7DVLD6fFdhmypRyEkK3z52',
    name: 'Growth Plan',
    isSubscription: true,
    price: '$5K',
    period: 'per month',
    description: 'Monthly service to develop your Australian market presence with targeted government introductions.',
    features: [
      'Up to 2 govt department introductions monthly',
      'Virtual office in premium location',
      'Up to 2 in-person govt meetings monthly',
      '1 tender response support monthly',
      '1 local partner coordination',
      'Basic compliance guidance',
      'Monthly progress reporting'
    ]
  },
  PREMIUM: {
    priceId: 'price_1R6NEHD6fFdhmypRg6CN1BuQ',
    name: 'Premium Retainer',
    isSubscription: true,
    price: '$15K',
    period: 'per month',
    description: 'Comprehensive monthly service to actively pursue and win Australian government contracts.',
    features: [
      'Up to 5 govt department introductions monthly',
      'Physical office presence when needed',
      'Up to 4 in-person govt meetings monthly',
      'Up to 2 tender responses monthly',
      'Up to 3 local partner coordination',
      'Tech & cybersecurity compliance support'
    ],
    featured: true
  },
  ENTERPRISE: {
    name: 'Enterprise',
    isSubscription: true,
    price: 'Custom',
    period: 'Tailored',
    description: 'Custom solution for large organizations requiring extensive support and dedicated resources.',
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      'Weekly Calls + On-site Support',
      'Unlimited Partnerships + Co-sell',
      'As Needed On-site Support',
      'Full R&D Program + Admin',
      'Unlimited GovTech Tenders',
      'Custom Integrations',
      'Dedicated Account Team'
    ]
  }
};
