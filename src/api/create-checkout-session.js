
// This is a serverless function for handling Stripe checkout sessions
// To be deployed to platforms like Vercel, Netlify Functions, or AWS Lambda

import Stripe from 'stripe';

// Initialize Stripe with the secret key (must be set in environment variables on your hosting platform)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { priceId, productName, paymentType } = req.body;
    
    // Validate the price ID is one of the allowed values
    const validPriceIds = ['price_1R6NDED6fFdhmypRzqX57oPS', 'price_1R6NEHD6fFdhmypRg6CN1BuQ'];
    if (!validPriceIds.includes(priceId)) {
      return res.status(400).json({ error: 'Invalid price ID' });
    }
    
    // Determine if this is a one-time payment or subscription
    const isSubscription = priceId === 'price_1R6NEHD6fFdhmypRg6CN1BuQ';
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });
    
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session. Please try again later.' 
    });
  }
}
