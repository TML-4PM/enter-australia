
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
    
    // Always use Troy's email regardless of user input
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Validate the price ID is one of the allowed values
    const validPriceIds = [
      'price_1R6NDED6fFdhmypRzqX57oPS', // Entry Kit
      'price_1R6NEHD6fFdhmypRg6CN1BuQ', // Premium Retainer
      'price_1R7DVLD6fFdhmypRyEkK3z52'  // Growth Plan
    ];
    
    if (!validPriceIds.includes(priceId)) {
      return res.status(400).json({ error: 'Invalid price ID' });
    }
    
    // Determine if this is a one-time payment or subscription
    const isSubscription = paymentType === 'subscription';
    
    // Map priceIds to product details for better checkout experience
    const productDetails = {
      'price_1R6NDED6fFdhmypRzqX57oPS': {
        name: 'Entry Kit',
        description: 'One-time payment to establish your Australian presence'
      },
      'price_1R6NEHD6fFdhmypRg6CN1BuQ': {
        name: 'Premium Retainer',
        description: 'Monthly service to actively pursue Australian government contracts'
      },
      'price_1R7DVLD6fFdhmypRyEkK3z52': {
        name: 'Growth Plan',
        description: 'Monthly service to develop your Australian market presence'
      }
    };
    
    // Create or retrieve customer
    let customer;
    const customers = await stripe.customers.list({
      email: actualRecipientEmail,
      limit: 1
    });
    
    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log("Using existing customer:", customer.id);
    } else {
      customer = await stripe.customers.create({
        email: actualRecipientEmail,
        metadata: {
          source: 'pricing_page'
        }
      });
      console.log("Created new customer:", customer.id);
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
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
      metadata: {
        product: productDetails[priceId]?.name || productName,
        paymentType: isSubscription ? 'subscription' : 'one-time'
      }
    });
    
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
