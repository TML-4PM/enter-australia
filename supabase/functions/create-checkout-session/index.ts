
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Verify method is POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }
  
  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Extract client IP for rate limiting
    const ipAddress = req.headers.get('cf-connecting-ip') ||
                     req.headers.get('x-real-ip') || 
                     req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     'unknown';
    
    // Check API rate limit (5 requests per minute for checkout)
    const { data: canProceed, error: rateLimitError } = await supabase.rpc('check_api_rate_limit', {
      _identifier: ipAddress,
      _endpoint: 'create-checkout-session',
      _max_requests: 5,
      _window_minutes: 1
    });
    
    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }
    
    if (!canProceed) {
      console.warn("Rate limit exceeded for create-checkout:", ipAddress);
      await supabase.rpc('log_rate_limit_violation', { 
        _ip: ipAddress, 
        _endpoint: 'create-checkout-session'
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Too many checkout attempts. Please try again in a minute.",
          retryAfter: 60
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json",
            "Retry-After": "60",
            ...corsHeaders 
          },
        }
      );
    }
    
    const body = await req.json();
    const { priceId, productName, paymentType } = body;
    
    // Always use Troy's email regardless of user input
    const actualRecipientEmail = 'troy@enteraustralia.tech';
    
    // Validate the price ID is one of the allowed values
    const validPriceIds = [
      'price_1R6NDED6fFdhmypRzqX57oPS', // Entry Kit
      'price_1R6NEHD6fFdhmypRg6CN1BuQ', // Premium Retainer
      'price_1R7DVLD6fFdhmypRyEkK3z52'  // Growth Plan
    ];
    
    if (!validPriceIds.includes(priceId)) {
      return new Response(JSON.stringify({ error: "Invalid price ID" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
    
    // Get Stripe secret key from Supabase secrets
    const { data: secretData, error: secretError } = await supabase
      .from('vault.secrets')
      .select('secret')
      .eq('name', 'STRIPE_SECRET_KEY')
      .single();
    
    if (secretError || !secretData?.secret) {
      console.error('Failed to retrieve Stripe secret key:', secretError);
      return new Response(JSON.stringify({ 
        error: 'Stripe configuration error. Please contact support.' 
      }), {
        status: 500,
        headers: corsHeaders,
      });
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
    
    // Get origin from request headers
    const origin = req.headers.get("origin") || 'https://your-site.com';
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        product: productDetails[priceId]?.name || productName,
        paymentType: isSubscription ? 'subscription' : 'one-time'
      }
    });
    
    return new Response(JSON.stringify({ 
      id: session.id,
      url: session.url
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: corsHeaders,
    });
  }
});
