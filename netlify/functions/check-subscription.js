
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
  
  try {
    // Always check subscriptions for Troy's email
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
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          hasActiveSubscription: false,
          subscriptionData: null
        })
      };
    }
    
    const customerId = customers.data[0].id;
    
    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price.product']
    });
    
    if (subscriptions.data.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          hasActiveSubscription: false,
          subscriptionData: null
        })
      };
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        hasActiveSubscription: true,
        subscriptionData: {
          id: subscription.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          planName: planName,
          priceId: priceId
        }
      })
    };
    
  } catch (error) {
    console.error('Error checking subscription status:', error);
    
    let errorMessage = 'Failed to check subscription status. Please try again later.';
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
