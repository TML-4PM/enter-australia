import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.1";

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
    const { name, email, company, service, message }: ContactEmailRequest = await req.json();
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