
// Serverless function for creating a Stripe customer from an email subscription

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { email, originalEmail, source } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Always use Troy's email as the actual recipient
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Initialize Stripe with the secret key
    const stripeKey = process.env.STRIPE_SECRET_KEY || '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';
    console.log("Initializing Stripe for customer creation");
    
    const stripe = new Stripe(stripeKey);
    
    // Check if customer already exists with Troy's email
    const existingCustomers = await stripe.customers.list({
      email: actualRecipientEmail,
      limit: 1
    });
    
    let customer;
    
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log("Customer already exists:", customer.id);
      
      // Update metadata with new information from this subscription
      customer = await stripe.customers.update(customer.id, {
        metadata: {
          ...customer.metadata,
          originalEmail: originalEmail || email, // Store the original user input email
          last_subscription: source,
          updated_at: new Date().toISOString()
        }
      });
    } else {
      // Create a new customer with Troy's email
      customer = await stripe.customers.create({
        email: actualRecipientEmail, // Always use Troy's email
        metadata: {
          originalEmail: originalEmail || email, // Store the original user input email
          source,
          created_at: new Date().toISOString()
        }
      });
      console.log("Created new customer:", customer.id);
    }
    
    return res.status(200).json({ 
      success: true,
      customerId: customer.id
    });
  } catch (error) {
    console.error('Error creating or updating customer:', error);
    
    if (error.type === 'StripeAuthenticationError') {
      return res.status(401).json({ 
        error: 'Invalid API key or insufficient permissions.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to create or update customer. Please try again later.' 
    });
  }
}
