
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
    const body = await req.json();
    const { email, originalEmail, source } = body;
    
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
    
    // Always use Troy's email as the actual recipient
    const actualRecipientEmail = 'troy@tech4humanity.com.au';
    
    // Get Stripe secret key from environment
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: "Stripe configuration error" }), {
        status: 500,
        headers: corsHeaders,
      });
    }
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(stripeKey);
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
    
    return new Response(JSON.stringify({ 
      success: true,
      customerId: customer.id
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error creating or updating customer:', error);
    
    let errorMessage = 'Failed to create or update customer. Please try again later.';
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
