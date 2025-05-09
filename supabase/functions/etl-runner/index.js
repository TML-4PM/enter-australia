
// ETL Runner Edge Function
// This function is designed to be invoked on a schedule to run ETL jobs

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { runAllETLJobs } from '../_shared/etlUtils.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    // Create a Supabase client with Admin privileges
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Parse configuration from request or use defaults
    let config = {};
    if (req.method === 'POST') {
      const requestData = await req.json();
      config = requestData.config || {};
    }
    
    // Add Supabase client to config
    config.supabase = supabaseClient;
    
    // Add API keys from environment variables
    config.youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    config.openCorpApiKey = Deno.env.get('OPENCORP_API_KEY');
    
    // Run ETL jobs
    const results = await runAllETLJobs(config);
    
    // Return results
    return new Response(
      JSON.stringify({
        success: true,
        message: 'ETL jobs completed',
        results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('ETL runner error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
