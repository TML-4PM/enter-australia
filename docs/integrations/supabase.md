
# Supabase Integration Guide

## Overview

Tech4Humanity Australia uses Supabase as the primary backend service, providing authentication, database, edge functions, and storage capabilities through Lovable's native integration.

## Integration Architecture

### Connection Setup
1. **Lovable Integration**: Connected via the green Supabase button in Lovable interface
2. **Automatic Configuration**: Environment variables managed automatically
3. **Real-time Sync**: Database schema and functions synchronized with Lovable

### Client Configuration

```javascript
// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lzfgigiyqpuuxslsygjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Test connection on initialization
supabase.from('_test').select('*').limit(1).then(() => {
  console.log('✅ Supabase connection successful');
}).catch((error) => {
  console.warn('⚠️ Supabase connection issue:', error.message);
});
```

## Database Schema

### Core Tables

#### email_subscriptions
```sql
CREATE TABLE public.email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  target_email TEXT NOT NULL DEFAULT 'troy@tech4humanity.com.au',
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  active BOOLEAN DEFAULT true
);

-- Row Level Security
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions" ON public.email_subscriptions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert subscriptions" ON public.email_subscriptions
  FOR INSERT WITH CHECK (true);
```

#### opportunities
```sql
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  organization TEXT,
  value_aud DECIMAL(15,2),
  deadline TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_opportunities_active ON public.opportunities(active);
CREATE INDEX idx_opportunities_deadline ON public.opportunities(deadline);
CREATE INDEX idx_opportunities_tags ON public.opportunities USING GIN(tags);
```

#### case_studies
```sql
CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  testimonial TEXT,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### pricing_tiers
```sql
CREATE TABLE public.pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_aud DECIMAL(10,2),
  billing_period TEXT, -- 'one-time', 'monthly', 'yearly'
  features JSONB,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Authentication Implementation

### User Registration and Login

```javascript
// Authentication helper functions
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
```

### Authentication Context

```javascript
// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp: (email, password) => supabase.auth.signUp({ email, password }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Database Operations

### CRUD Operations

```javascript
// Opportunities management
export const getOpportunities = async (page = 0, pageSize = 10, filters = {}) => {
  let query = supabase
    .from('opportunities')
    .select('*', { count: 'exact' })
    .eq('active', true);

  // Apply filters
  if (filters.industry) {
    query = query.ilike('description', `%${filters.industry}%`);
  }
  
  if (filters.minValue) {
    query = query.gte('value_aud', filters.minValue);
  }

  if (filters.deadline) {
    query = query.gte('deadline', filters.deadline);
  }

  // Pagination and ordering
  const { data, error, count } = await query
    .order('deadline', { ascending: true })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  return { data, error, count };
};

// Lead capture
export const saveEmailSubscription = async (email, source = 'website') => {
  const { data, error } = await supabase
    .from('email_subscriptions')
    .upsert({
      email,
      target_email: 'troy@tech4humanity.com.au',
      source,
      subscribed_at: new Date().toISOString()
    }, { onConflict: 'email' });

  return { data, error };
};

// Case studies
export const getFeaturedCaseStudies = async (limit = 3) => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
};
```

### Real-time Subscriptions

```javascript
// Real-time opportunities updates
export const subscribeToOpportunities = (callback) => {
  return supabase
    .channel('opportunities-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'opportunities'
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
};

// Usage in component
useEffect(() => {
  const subscription = subscribeToOpportunities((payload) => {
    console.log('Opportunity updated:', payload);
    // Update local state
    refreshOpportunities();
  });

  return () => {
    supabase.removeChannel(subscription);
  };
}, []);
```

## Edge Functions

### Function Structure

```typescript
// supabase/functions/create-stripe-customer/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize clients
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get request body
    const { email, source } = await req.json();

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        source: source,
        created_via: "tech4humanity_website"
      }
    });

    // Update subscription record
    const { error: updateError } = await supabaseClient
      .from('email_subscriptions')
      .update({ stripe_customer_id: customer.id })
      .eq('email', email);

    if (updateError) {
      console.error('Error updating subscription:', updateError);
    }

    return new Response(
      JSON.stringify({ customerId: customer.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
```

### Payment Processing

```typescript
// supabase/functions/create-checkout-session/index.ts
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId, productName, paymentType, recipientEmail } = await req.json();

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: recipientEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: paymentType === 'subscription' ? 'subscription' : 'payment',
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      metadata: {
        product_name: productName,
        payment_type: paymentType
      }
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
```

### Client-side Function Calls

```javascript
// Call edge functions from client
export const createStripeCustomer = async (email, source) => {
  const { data, error } = await supabase.functions.invoke('create-stripe-customer', {
    body: { email, source }
  });

  if (error) {
    console.error('Error creating Stripe customer:', error);
    return { success: false, error };
  }

  return { success: true, customerId: data.customerId };
};

export const createCheckoutSession = async (productData) => {
  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: productData
  });

  if (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error };
  }

  return { success: true, url: data.url };
};
```

## Row Level Security (RLS)

### Security Policies

```sql
-- Email subscriptions policies
CREATE POLICY "Users can view own subscriptions"
  ON email_subscriptions FOR SELECT
  USING (auth.uid()::text = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert subscriptions"
  ON email_subscriptions FOR INSERT
  WITH CHECK (true);

-- Opportunities policies (public read)
CREATE POLICY "Anyone can view active opportunities"
  ON opportunities FOR SELECT
  USING (active = true);

-- Case studies policies (public read)
CREATE POLICY "Anyone can view case studies"
  ON case_studies FOR SELECT
  USING (true);

-- Admin-only policies for content management
CREATE POLICY "Admins can manage content"
  ON opportunities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );
```

### Service Role Operations

```javascript
// Operations requiring service role key (bypassing RLS)
import { createClient } from '@supabase/supabase-js';

const supabaseService = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ETL operations
export const insertOpportunities = async (opportunities) => {
  const { data, error } = await supabaseService
    .from('opportunities')
    .upsert(opportunities, { 
      onConflict: 'id',
      ignoreDuplicates: false
    });
  
  return { data, error };
};
```

## Storage Implementation

### File Upload Setup

```javascript
// Image upload for case studies
export const uploadCaseStudyImage = async (file, caseStudyId) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${caseStudyId}-${Math.random()}.${fileExt}`;
  const filePath = `case-studies/${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) {
    return { error };
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return { data: { path: filePath, url: publicUrl } };
};

// Storage policies
-- Allow public read access to images
CREATE POLICY "Public read access for images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

## Performance Optimization

### Connection Pooling

```javascript
// Optimized client configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-my-custom-header': 'tech4humanity' },
  },
});
```

### Query Optimization

```javascript
// Efficient pagination with cursor-based approach
export const getOpportunitiesCursor = async (cursor = null, limit = 10) => {
  let query = supabase
    .from('opportunities')
    .select('id, title, description, deadline, value_aud')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;
  
  return {
    data,
    error,
    nextCursor: data?.length === limit ? data[data.length - 1].created_at : null
  };
};
```

### Caching Strategy

```javascript
// Client-side caching for static data
class SupabaseCache {
  constructor() {
    this.cache = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes
  }

  async get(key, fetcher) {
    const cached = this.cache.get(key);
    
    if (cached && (Date.now() - cached.timestamp) < this.ttl) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    return data;
  }
}

const cache = new SupabaseCache();

// Usage
export const getCachedCaseStudies = () => {
  return cache.get('case-studies', () => getFeaturedCaseStudies());
};
```

## Error Handling and Monitoring

### Error Tracking

```javascript
// Comprehensive error handling
export const handleSupabaseError = (error, context) => {
  console.error(`Supabase error in ${context}:`, error);

  // Track errors for monitoring
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: `Supabase: ${error.message}`,
      fatal: false,
      custom_parameters: {
        context,
        error_code: error.code,
        error_details: error.details
      }
    });
  }

  // Return user-friendly error message
  const userMessage = {
    'PGRST116': 'No data found',
    '23505': 'This record already exists',
    '42501': 'Permission denied',
    'default': 'An unexpected error occurred'
  };

  return userMessage[error.code] || userMessage.default;
};
```

### Health Monitoring

```javascript
// Monitor Supabase connection health
export const monitorSupabaseHealth = async () => {
  try {
    const start = Date.now();
    await supabase.from('_health').select('*').limit(1);
    const duration = Date.now() - start;

    // Track performance
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'supabase_query_time',
        value: duration
      });
    }

    return { healthy: true, responseTime: duration };
  } catch (error) {
    return { healthy: false, error: error.message };
  }
};
```

This comprehensive Supabase integration provides a robust backend foundation for the Tech4Humanity Australia platform with authentication, data management, real-time features, and scalable architecture.
