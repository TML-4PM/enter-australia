
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the publishable key
// Replace 'YOUR_PUBLISHABLE_KEY' with your actual publishable key
// This key is safe to expose in frontend code
export const stripePromise = loadStripe('pk_live_51QdfYbD6fFdhmypR798NoSCJ4G9TGCkqw9QTuiDTkyvmn9cTHxjFG6GYDlcoBClLWsDN5Mgjb0tIfII00oVKQ67in');

// Define the product IDs and details
export const PRODUCTS = {
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
  GROWTH_PLAN: {
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
  PREMIUM_RETAINER: {
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
      'Tech & cybersecurity compliance support',
      'Weekly & monthly progress reporting'
    ],
    featured: true
  }
};
