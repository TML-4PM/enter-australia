
// This endpoint checks if a customer has an active subscription
// In production, deploy this as a secure serverless function

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Always check subscriptions for Troy's email
    const customerEmail = 'troy@tech4humanity.com.au';
    
    // Initialize Stripe with the secret key
    const stripeKey = process.env.STRIPE_SECRET_KEY || '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';
    const stripe = new Stripe(stripeKey);
    
    // Find the customer by email
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });
    
    if (customers.data.length === 0) {
      return res.status(200).json({ 
        hasActiveSubscription: false,
        subscriptionData: null
      });
    }
    
    const customerId = customers.data[0].id;
    
    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price.product']
    });
    
    if (subscriptions.data.length === 0) {
      return res.status(200).json({ 
        hasActiveSubscription: false,
        subscriptionData: null
      });
    }
    
    // Get details of the active subscription
    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    
    // Map price IDs to plan names
    const planNames = {
      'price_1R6NEHD6fFdhmypRg6CN1BuQ': 'Premium Retainer',
      'price_1R7DVLD6fFdhmypRyEkK3z52': 'Growth Plan'
    };
    
    const planName = planNames[priceId] || 'Subscription';
    
    // Return subscription details
    return res.status(200).json({
      hasActiveSubscription: true,
      subscriptionData: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planName: planName,
        priceId: priceId
      }
    });
    
  } catch (error) {
    console.error('Error checking subscription status:', error);
    
    if (error.type === 'StripeAuthenticationError') {
      return res.status(401).json({ 
        error: 'Invalid API key or insufficient permissions.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to check subscription status. Please try again later.' 
    });
  }
}
