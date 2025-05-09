
// This endpoint verifies a Stripe session and returns order details
// For production, deploy this as a secure serverless function

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const sessionId = req.query.session_id;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }
  
  try {
    // Initialize Stripe with the secret key - works with both sk_ and rk_ keys
    const stripeKey = process.env.STRIPE_SECRET_KEY || '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';
    console.log("Initializing Stripe with key type:", stripeKey.substring(0, 3));
    
    const stripe = new Stripe(stripeKey);
    
    console.log("Retrieving session:", sessionId);
    
    // Retrieve the session from Stripe with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer']
    });
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    console.log("Session retrieved successfully");
    
    // Determine the product name from the line items or metadata
    let productName = "Your Order";
    let isSubscription = session.mode === 'subscription';
    let amount = 0;
    let interval = null;
    
    if (session.line_items && session.line_items.data.length > 0) {
      const lineItem = session.line_items.data[0];
      // Get product details
      if (lineItem.price && lineItem.price.product) {
        productName = lineItem.price.product.name || "Your Order";
      }
      // Get amount
      if (lineItem.price) {
        amount = lineItem.price.unit_amount / 100; // Convert from cents to dollars
        if (lineItem.price.recurring) {
          interval = lineItem.price.recurring.interval;
        }
      }
    }
    
    // Use metadata if available
    if (session.metadata && session.metadata.product) {
      productName = session.metadata.product;
    }
    
    // The actual customer email will always be Troy's, but we'll refer to it generically for the UI
    const customerEmail = 'troy@tech4humanity.com.au';
    
    // Return details about the successful payment
    return res.status(200).json({
      success: true,
      productName,
      customerEmail,
      paymentStatus: session.payment_status,
      amount: amount,
      currency: session.currency,
      isSubscription,
      interval
    });
    
  } catch (error) {
    console.error('Error verifying session:', error);
    
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
      error: 'Failed to verify payment session. Please contact support.'
    });
  }
}
