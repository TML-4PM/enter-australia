
const Stripe = require('stripe');

exports.handler = async (event, context) => {
  // Setup CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };
  
  // Handle OPTIONS requests (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }
  
  // Verify method is GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Parse query parameters
  const queryParams = new URLSearchParams(event.queryStringParameters || {});
  const sessionId = queryParams.get('session_id') || event.queryStringParameters?.session_id;
  
  if (!sessionId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Session ID is required' })
    };
  }
  
  try {
    // Initialize Stripe with the secret key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    console.log("Retrieving session:", sessionId);
    
    // Retrieve the session from Stripe with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer']
    });
    
    if (!session) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Session not found' })
      };
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        productName,
        customerEmail,
        paymentStatus: session.payment_status,
        amount: amount,
        currency: session.currency,
        isSubscription,
        interval
      })
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to verify payment session. Please contact support.';
    let statusCode = 500;
    
    if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Invalid API key or insufficient permissions. Please check your Stripe configuration.';
      statusCode = 401;
    } else if (error.type === 'StripeInvalidRequestError') {
      errorMessage = `Stripe request error: ${error.message}`;
      statusCode = 400;
    }
    
    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};
