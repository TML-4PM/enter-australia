
const Stripe = require('stripe');

exports.handler = async (event, context) => {
  // Setup CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }
  
  // Verify method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    const body = JSON.parse(event.body);
    const { email, originalEmail, source } = body;
    
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email is required' })
      };
    }
    
    // Always use Troy's email as the actual recipient
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log("Initializing Stripe for customer creation");
    
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
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        customerId: customer.id
      })
    };
  } catch (error) {
    console.error('Error creating or updating customer:', error);
    
    let errorMessage = 'Failed to create or update customer. Please try again later.';
    let statusCode = 500;
    
    if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Invalid API key or insufficient permissions.';
      statusCode = 401;
    }
    
    return {
      statusCode,
      headers,
      body: JSON.stringify({ 
        error: errorMessage
      })
    };
  }
};
