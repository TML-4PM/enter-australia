
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

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
    const { priceId, productName, paymentType } = body;
    
    // Always use Troy's email regardless of user input
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Validate the price ID is one of the allowed values
    const validPriceIds = [
      'price_1R6NDED6fFdhmypRzqX57oPS', // Entry Kit
      'price_1R6NEHD6fFdhmypRg6CN1BuQ', // Premium Retainer
      'price_1R7DVLD6fFdhmypRyEkK3z52'  // Growth Plan
    ];
    
    if (!validPriceIds.includes(priceId)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid price ID' })
      };
    }
    
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
      success_url: `${event.headers.origin || 'https://your-site.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || 'https://your-site.com'}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        product: productDetails[priceId]?.name || productName,
        paymentType: isSubscription ? 'subscription' : 'one-time'
      }
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        id: session.id,
        url: session.url
      })
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages based on error type
    let errorMessage = 'Failed to create checkout session. Please try again later.';
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
