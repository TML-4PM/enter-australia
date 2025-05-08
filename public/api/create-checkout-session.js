
// This is a serverless function for handling Stripe checkout sessions
// For development purposes, we're placing this in the public/api folder
// In production, this should be deployed to a proper serverless platform

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { priceId, productName, paymentType } = req.body;
    
    // Validate the price ID is one of the allowed values
    const validPriceIds = [
      'price_1R6NDED6fFdhmypRzqX57oPS', // Entry Kit
      'price_1R6NEHD6fFdhmypRg6CN1BuQ', // Premium Retainer
      'price_1R7DVLD6fFdhmypRyEkK3z52'  // Growth Plan
    ];
    
    if (!validPriceIds.includes(priceId)) {
      return res.status(400).json({ error: 'Invalid price ID' });
    }
    
    // Initialize Stripe with the secret key
    // The key can be either a standard secret key (sk_) or a restricted key (rk_)
    const stripeKey = process.env.STRIPE_SECRET_KEY || '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';
    console.log("Initializing Stripe with key type:", stripeKey.substring(0, 3));
    
    const stripe = new Stripe(stripeKey);
    
    // Determine if this is a one-time payment or subscription
    const isSubscription = paymentType === 'subscription';
    
    // Log checkout attempt
    console.log(`Creating ${isSubscription ? 'subscription' : 'one-time payment'} checkout session for ${productName}`);
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
    });
    
    console.log("Checkout session created successfully:", session.id);
    
    // Return the session ID and URL for the frontend to use
    return res.status(200).json({ 
      id: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages based on error type
    if (error.type === 'StripeAuthenticationError') {
      return res.status(401).json({ 
        error: 'Invalid API key or insufficient permissions. Please check your Stripe configuration.' 
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: `Stripe request error: ${error.message}`
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to create checkout session. Please try again later.' 
    });
  }
}
