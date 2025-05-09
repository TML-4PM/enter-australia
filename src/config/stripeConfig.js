
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
  LAUNCH: {
    priceId: 'price_1R6NDED6fFdhmypRzqX57oPS',
    name: 'Launch',
    isSubscription: true,
    price: '$2.5K',
    period: 'per month',
    description: 'Begin your Australian market entry with essential support and monthly advisor calls.',
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      '1 Dedicated Advisor Call Monthly',
      '1 Partnership Introduction Quarterly',
      '1 Week On-site Launch Support',
      'Up to $25K R&D Grants Assistance'
    ]
  },
  GROWTH: {
    priceId: 'price_1R7DVLD6fFdhmypRyEkK3z52',
    name: 'Growth',
    isSubscription: true,
    price: '$5K',
    period: 'per month',
    description: 'Accelerate your Australian presence with increased support and tender response assistance.',
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      '2 Dedicated Advisor Calls Monthly',
      '3 Partnership Introductions Quarterly',
      '2 Weeks On-site Launch Support',
      'Up to $50K R&D Grants Assistance',
      '1 GovTech Tender Response Yearly'
    ],
    featured: true
  },
  SCALE: {
    priceId: 'price_1R6NEHD6fFdhmypRg6CN1BuQ',
    name: 'Scale',
    isSubscription: true,
    price: '$8.5K',
    period: 'per month',
    description: 'Maximize your Australian market potential with weekly support and unlimited partnership introductions.',
    features: [
      'Free Market Assessment',
      'Compliance Toolkit',
      'Weekly Dedicated Advisor Calls',
      'Unlimited Partnership Introductions',
      '1 Month On-site Launch Support',
      'Full R&D Program Assistance',
      '3 GovTech Tender Responses Yearly'
    ]
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
