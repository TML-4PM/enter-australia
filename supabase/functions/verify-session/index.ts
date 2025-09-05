
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
  
  // Verify method is GET
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  // Parse query parameters
  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  
  if (!sessionId) {
    return new Response(JSON.stringify({ error: "Session ID is required" }), {
      status: 400,
      headers: corsHeaders,
    });
  }
  
  try {
    // Initialize Supabase client to get the Stripe secret
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
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
    
    console.log("Retrieving session:", sessionId);
    
    // Retrieve the session from Stripe with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer']
    });
    
    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found" }), {
        status: 404,
        headers: corsHeaders,
      });
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
    const customerEmail = 'troy@enteraustralia.tech';
    
    // Update subscribers table if this is a subscription
    if (isSubscription && session.payment_status === 'paid') {
      try {
        // Get subscription details
        const subscriptions = await stripe.subscriptions.list({
          customer: session.customer,
          status: 'active',
          limit: 1
        });
        
        if (subscriptions.data.length > 0) {
          const subscription = subscriptions.data[0];
          
          // Determine subscription tier based on price
          let subscriptionTier = 'Basic';
          if (amount >= 15000) {
            subscriptionTier = 'Premium';
          } else if (amount >= 5000) {
            subscriptionTier = 'Growth';
          }
          
          // Update subscribers table
          await supabase.from('subscribers').upsert({
            email: customerEmail,
            stripe_customer_id: session.customer,
            subscribed: true,
            subscription_tier: subscriptionTier,
            subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
            stripe_subscription_id: subscription.id,
            payment_status: session.payment_status,
            billing_cycle: interval,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'email' });
        }
      } catch (dbError) {
        console.error('Error updating subscribers table:', dbError);
        // Don't fail the response if DB update fails
      }
    }
    
    // Return details about the successful payment
    return new Response(JSON.stringify({
      success: true,
      productName,
      customerEmail,
      paymentStatus: session.payment_status,
      amount: amount,
      currency: session.currency,
      isSubscription,
      interval
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: corsHeaders,
    });
  }
});
