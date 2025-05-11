
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
    // Always use Troy's email as the customer email
    const customerEmail = 'troy@tech4humanity.com.au';
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Find the customer by email
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });
    
    if (customers.data.length === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'No customer found with this email' })
      };
    }
    
    const customerId = customers.data[0].id;
    
    // Create a customer portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${event.headers.origin || 'https://your-site.com'}/pricing`,
    });
    
    // Return the session URL
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        url: session.url
      })
    };
    
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    
    let errorMessage = 'Failed to create customer portal session. Please try again later.';
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
