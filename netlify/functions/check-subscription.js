
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

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
    
    // Initialize Supabase client to get the Stripe secret
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Get Stripe secret key from Supabase secrets
    const { data: secretData, error: secretError } = await supabase
      .from('vault.secrets')
      .select('secret')
      .eq('name', 'STRIPE_SECRET_KEY')
      .single();
    
    if (secretError || !secretData?.secret) {
      console.error('Failed to retrieve Stripe secret key:', secretError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Stripe configuration error. Please contact support.' 
        })
      };
    }
    
    // Initialize Stripe with the secret key from Supabase
    const stripe = new Stripe(secretData.secret);
    
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
      // Update subscribers table to reflect no active subscription
      await supabase.from('subscribers').upsert({
        email: customerEmail,
        stripe_customer_id: customerId,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        stripe_subscription_id: null,
        payment_status: 'inactive',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
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
    
    // Update subscribers table with current subscription info
    await supabase.from('subscribers').upsert({
      email: customerEmail,
      stripe_customer_id: customerId,
      subscribed: true,
      subscription_tier: planName,
      subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
      stripe_subscription_id: subscription.id,
      payment_status: subscription.status,
      billing_cycle: subscription.items.data[0].price.recurring?.interval || 'month',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });
    
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
