import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";
import { z } from "npm:zod@3.22.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().min(1, "Company is required").max(200, "Company must be less than 200 characters"),
  service: z.string().trim().min(1, "Service is required").max(100, "Service must be less than 100 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message must be less than 5000 characters"),
});

interface ContactEmailRequest {
  name: string;
  email: string;
  company: string;  
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client IP address (with fallback chain for different hosting providers)
    const ipAddress = req.headers.get('cf-connecting-ip') ||
                     req.headers.get('x-real-ip') || 
                     req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     '0.0.0.0';
    
    console.log("Contact form submission from IP:", ipAddress);
    
    // Check if IP is blocked
    const { data: isBlocked, error: blockError } = await supabase.rpc('is_ip_blocked', { _ip: ipAddress });
    
    if (blockError) {
      console.error("Error checking IP blocklist:", blockError);
    }
    
    if (isBlocked) {
      console.warn("Blocked IP attempted submission:", ipAddress);
      await supabase.rpc('log_rate_limit_violation', { 
        _ip: ipAddress, 
        _endpoint: 'contact-email'
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Too many requests from this IP address. Please try again later or contact us directly at troy@enteraustralia.tech" 
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": "3600",
            ...corsHeaders 
          },
        }
      );
    }
    
    // Check form rate limit (3 submissions per hour per IP)
    const { data: canSubmit, error: rateLimitError } = await supabase.rpc('check_form_rate_limit', {
      _ip: ipAddress,
      _form_type: 'contact_submission',
      _max_submissions: 3,
      _window_hours: 1
    });
    
    if (rateLimitError) {
      console.error("Error checking rate limit:", rateLimitError);
    }
    
    if (!canSubmit) {
      console.warn("Rate limit exceeded for IP:", ipAddress);
      await supabase.rpc('log_rate_limit_violation', { 
        _ip: ipAddress, 
        _endpoint: 'contact-email'
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded. Please wait 1 hour before submitting again, or email us directly at troy@enteraustralia.tech",
          retryAfter: 3600
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": "3600",
            ...corsHeaders 
          },
        }
      );
    }

    const body = await req.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: "Validation failed", 
          details: validationResult.error.flatten().fieldErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, company, service, message } = validationResult.data;
    const timestamp = new Date().toISOString();
    
    console.log("Processing contact form submission:", { name, email, company, service });

    // 1. Save to email_subscriptions table
    const { error: subscriptionError } = await supabase
      .from('email_subscriptions')
      .upsert({
        email,
        target_email: 'troy@enteraustralia.tech',
        source: 'contact_form',
        subscribed_at: timestamp
      }, { onConflict: 'email' });

    if (subscriptionError) {
      console.error("Error saving to email_subscriptions:", subscriptionError);
    }

    // 2. Save full form data to storage as JSON file
    const submissionData = {
      name,
      email,
      company,
      service,
      message,
      timestamp,
      source: 'contact_form'
    };

    const fileName = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.json`;
    
    const { error: storageError } = await supabase.storage
      .from('form-archives')
      .upload(fileName, JSON.stringify(submissionData, null, 2), {
        contentType: 'application/json'
      });

    if (storageError) {
      console.error("Error saving to storage:", storageError);
    }
    
    // Track form submission for rate limiting
    const { error: trackingError } = await supabase
      .from('form_submission_tracking')
      .insert({
        ip_address: ipAddress,
        form_type: 'contact_submission',
        user_id: null
      });
    
    if (trackingError) {
      console.error("Error tracking submission:", trackingError);
    }

    // 3. Send email to troy@enteraustralia.tech
    const emailResponse = await resend.emails.send({
      from: "Tech4Humanity Contact <onboarding@resend.dev>",
      to: ["troy@enteraustralia.tech"],
      subject: `New ${service} inquiry from ${name} at ${company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>Sent via Tech4Humanity contact form | Archived as ${fileName}</em></p>
      `,
    });

    console.log("Form submission processed successfully:", { fileName, emailSent: !!emailResponse.id });

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse,
      archived: !storageError,
      fileName 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);