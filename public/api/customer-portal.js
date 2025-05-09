
// This endpoint creates a Stripe Customer Portal session for subscription management
// In production, deploy this as a secure serverless function

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Always use Troy's email as the customer email
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
      return res.status(404).json({ error: 'No customer found with this email' });
    }
    
    const customerId = customers.data[0].id;
    
    // Create a customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${req.headers.origin}/pricing`,
    });
    
    // Return the session URL
    return res.status(200).json({
      url: session.url
    });
    
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    
    if (error.type === 'StripeAuthenticationError') {
      return res.status(401).json({ 
        error: 'Invalid API key or insufficient permissions.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to create customer portal session. Please try again later.' 
    });
  }
}
