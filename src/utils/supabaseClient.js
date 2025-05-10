
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your Supabase URL and anon key
// Make sure these values are correct for your project
const supabaseUrl = 'https://lzfgigiyqpuuxslsygjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZmdpZ2l5cXB1dXhzbHN5Z2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM1ODMwMjcsImV4cCI6MTk5OTE1OTAyN30.xjG8aNO-mSiNLUfL-lBw4BwhkQlfXPZJxXfIkwgKLQo';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Database operations helpers

// Opportunities helpers - for ETL operations
export const insertOpportunities = async (opportunities) => {
  const { data, error } = await supabase
    .from('opportunities')
    .upsert(opportunities, { 
      onConflict: 'id', // Assuming each opportunity has a unique id
      ignoreDuplicates: false // Update existing records
    });
  return { data, error };
};

// Resources helpers
export const insertResources = async (resources) => {
  const { data, error } = await supabase
    .from('resources')
    .upsert(resources, {
      onConflict: 'id',
      ignoreDuplicates: false
    });
  return { data, error };
};

// Get opportunities with pagination
export const getOpportunities = async (page = 0, pageSize = 10) => {
  const { data, error, count } = await supabase
    .from('opportunities')
    .select('*', { count: 'exact' })
    .eq('active', true)
    .order('deadline', { ascending: true })
    .range(page * pageSize, (page + 1) * pageSize - 1);
  
  return { data, error, count };
};

// Get resources with pagination
export const getResources = async (type, page = 0, pageSize = 10) => {
  const query = supabase
    .from('resources')
    .select('*', { count: 'exact' });
  
  if (type) {
    query.eq('type', type);
  }
  
  const { data, error, count } = await query
    .order('published_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);
  
  return { data, error, count };
};

// Case studies helpers
export const getFeaturedCaseStudies = async (limit = 3) => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('featured', true)
    .limit(limit);
  
  return { data, error };
};

// Testimonials helpers
export const getRandomTestimonials = async (limit = 3) => {
  // Note: RANDOM() is PostgreSQL specific
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  return { data, error };
};

// Pricing tiers helpers
export const getPricingTiers = async () => {
  const { data, error } = await supabase
    .from('pricing_tiers')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true });
  
  return { data, error };
};

// ETL status tracking
export const logETLRun = async (source, status, details = {}) => {
  const { data, error } = await supabase
    .from('etl_logs')
    .insert([
      {
        source,
        status,
        details,
        run_at: new Date().toISOString()
      }
    ]);
  
  return { data, error };
};

// Get the last successful ETL run for a specific source
export const getLastETLRun = async (source) => {
  const { data, error } = await supabase
    .from('etl_logs')
    .select('*')
    .eq('source', source)
    .eq('status', 'success')
    .order('run_at', { ascending: false })
    .limit(1);
  
  return { data, error };
};
