
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
  
  try {
    // Always check subscriptions for Troy's email
    const customerEmail = 'troy@tech4humanity.com.au';
    
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
    
    // Find the customer by email
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });
    
    if (customers.data.length === 0) {
      // Update subscribers table to reflect no active subscription
      await supabase.from('subscribers').upsert({
        email: customerEmail,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        stripe_subscription_id: null,
        payment_status: 'inactive',
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ 
        hasActiveSubscription: false,
        subscriptionData: null
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
      
      return new Response(JSON.stringify({ 
        hasActiveSubscription: false,
        subscriptionData: null
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
    return new Response(JSON.stringify({
      hasActiveSubscription: true,
      subscriptionData: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planName: planName,
        priceId: priceId
      }
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error('Error checking subscription status:', error);
    
    let errorMessage = 'Failed to check subscription status. Please try again later.';
    let statusCode = 500;
    
    if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Invalid API key or insufficient permissions.';
      statusCode = 401;
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage
    }), {
      status: statusCode,
      headers: corsHeaders,
    });
  }
});
