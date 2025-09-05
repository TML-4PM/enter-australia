
# API Reference

## Overview

Tech4Humanity Australia uses Supabase Edge Functions for backend API endpoints. All functions are serverless and automatically scaled.

## Base URL
```
https://lzfgigiyqpuuxslsygjt.supabase.co/functions/v1/
```

## Authentication

### Headers
```javascript
{
  'Authorization': 'Bearer <supabase_anon_key>',
  'Content-Type': 'application/json',
  'apikey': '<supabase_anon_key>'
}
```

### User Authentication
```javascript
// Get user token for authenticated requests
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;

// Include in request headers
headers: {
  'Authorization': `Bearer ${token}`
}
```

## Edge Functions API

### Payment Processing

#### Create Checkout Session
**Endpoint:** `POST /create-checkout-session`

Creates a Stripe checkout session for payment processing.

**Request Body:**
```typescript
{
  priceId: string;           // Stripe price ID
  productName: string;       // Product display name
  paymentType: 'subscription' | 'one-time';
  recipientEmail?: string;   // Defaults to troy@enteraustralia.tech
}
```

**Response:**
```typescript
{
  url: string;              // Stripe checkout URL
}
```

**Example:**
```javascript
const { data, error } = await supabase.functions.invoke('create-checkout-session', {
  body: {
    priceId: 'price_1234567890',
    productName: 'Market Entry Assessment',
    paymentType: 'one-time',
    recipientEmail: 'troy@enteraustralia.tech'
  }
});

if (!error) {
  window.location.href = data.url;
}
```

#### Create Stripe Customer
**Endpoint:** `POST /create-stripe-customer`

Creates a Stripe customer record for email subscribers.

**Request Body:**
```typescript
{
  email: string;            // Customer email
  originalEmail?: string;   // Original form email for tracking
  source: string;           // Lead source (e.g., 'website', 'tools')
}
```

**Response:**
```typescript
{
  customerId: string;       // Stripe customer ID
}
```

**Example:**
```javascript
const { data, error } = await supabase.functions.invoke('create-stripe-customer', {
  body: {
    email: 'troy@enteraustralia.tech',
    originalEmail: 'user@example.com',
    source: 'roi_calculator'
  }
});
```

#### Customer Portal
**Endpoint:** `POST /customer-portal`

Creates a Stripe customer portal session for subscription management.

**Request Body:**
```typescript
{
  customerId?: string;      // Optional: specific customer ID
}
```

**Response:**
```typescript
{
  url: string;              // Customer portal URL
}
```

#### Check Subscription
**Endpoint:** `GET /check-subscription`

Checks user's current subscription status.

**Response:**
```typescript
{
  hasActiveSubscription: boolean;
  subscriptionData: {
    id: string;
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
  } | null;
}
```

### Session Management

#### Verify Session
**Endpoint:** `POST /verify-session`

Verifies and refreshes user session tokens.

**Request Body:**
```typescript
{
  refresh_token: string;
}
```

**Response:**
```typescript
{
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: UserObject;
}
```

## Database API (via Supabase Client)

### Opportunities

#### Get Opportunities
```javascript
// Get paginated opportunities
const { data, error, count } = await supabase
  .from('opportunities')
  .select('*', { count: 'exact' })
  .eq('active', true)
  .order('deadline', { ascending: true })
  .range(0, 9); // First 10 items

// With filters
const { data, error } = await supabase
  .from('opportunities')
  .select('*')
  .eq('active', true)
  .gte('value_aud', 100000)
  .ilike('description', '%technology%')
  .order('deadline', { ascending: true });
```

#### Search Opportunities
```javascript
// Full-text search
const { data, error } = await supabase
  .from('opportunities')
  .select('*')
  .textSearch('description', 'artificial intelligence', {
    type: 'websearch',
    config: 'english'
  });
```

### Email Subscriptions

#### Subscribe Email
```javascript
const { data, error } = await supabase
  .from('email_subscriptions')
  .insert({
    email: 'user@example.com',
    target_email: 'troy@enteraustralia.tech',
    source: 'footer_signup'
  });
```

#### Get Subscription Status
```javascript
const { data, error } = await supabase
  .from('email_subscriptions')
  .select('*')
  .eq('email', 'user@example.com')
  .single();
```

### Case Studies

#### Get Featured Case Studies
```javascript
const { data, error } = await supabase
  .from('case_studies')
  .select('*')
  .eq('featured', true)
  .order('created_at', { ascending: false })
  .limit(3);
```

#### Get Case Study by ID
```javascript
const { data, error } = await supabase
  .from('case_studies')
  .select('*')
  .eq('id', caseStudyId)
  .single();
```

### Pricing Tiers

#### Get All Pricing Tiers
```javascript
const { data, error } = await supabase
  .from('pricing_tiers')
  .select('*')
  .eq('active', true)
  .order('display_order', { ascending: true });
```

#### Get Pricing Tier by Slug
```javascript
const { data, error } = await supabase
  .from('pricing_tiers')
  .select('*')
  .eq('slug', 'premium-assessment')
  .single();
```

## Real-time API

### Subscribe to Changes

#### Opportunities Updates
```javascript
const subscription = supabase
  .channel('opportunities-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'opportunities'
    },
    (payload) => {
      console.log('Change received!', payload);
    }
  )
  .subscribe();

// Cleanup
supabase.removeChannel(subscription);
```

#### New Subscriptions
```javascript
const subscription = supabase
  .channel('new-subscriptions')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'email_subscriptions'
    },
    (payload) => {
      console.log('New subscription:', payload.new);
    }
  )
  .subscribe();
```

## Storage API

### Upload Files

#### Upload Image
```javascript
const file = event.target.files[0];
const fileExt = file.name.split('.').pop();
const fileName = `${Math.random()}.${fileExt}`;
const filePath = `case-studies/${fileName}`;

const { data, error } = await supabase.storage
  .from('images')
  .upload(filePath, file);

if (data) {
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);
  
  console.log('Image URL:', publicUrl);
}
```

#### Download File
```javascript
const { data, error } = await supabase.storage
  .from('images')
  .download('case-studies/image.jpg');

if (data) {
  const url = URL.createObjectURL(data);
  // Use the URL for display
}
```

#### Delete File
```javascript
const { data, error } = await supabase.storage
  .from('images')
  .remove(['case-studies/image.jpg']);
```

## Authentication API

### Sign Up
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
  options: {
    data: {
      company: 'Tech Company',
      industry: 'Software'
    }
  }
});
```

### Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123'
});
```

### Sign Out
```javascript
const { error } = await supabase.auth.signOut();
```

### Get Current User
```javascript
const { data: { user } } = await supabase.auth.getUser();
```

### Update User Profile
```javascript
const { data, error } = await supabase.auth.updateUser({
  data: {
    company: 'Updated Company Name',
    phone: '+61 400 000 000'
  }
});
```

## Error Handling

### Standard Error Response
```typescript
{
  error: {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
  }
}
```

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `PGRST116` | No rows found | Check query parameters |
| `23505` | Unique constraint violation | Use upsert or check existing data |
| `42501` | Insufficient privileges | Check RLS policies |
| `PGRST301` | JSON object requested, multiple rows returned | Use `.single()` or expect array |

### Error Handling Example
```javascript
const handleApiCall = async () => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific error codes
    switch (error.code) {
      case 'PGRST116':
        return [];
      case '42501':
        throw new Error('Access denied');
      default:
        throw new Error('An unexpected error occurred');
    }
  }
};
```

## Rate Limiting

### Limits
- **Database queries**: 200 requests per minute per IP
- **Edge functions**: 50 requests per minute per IP
- **Storage operations**: 100 requests per minute per IP
- **Auth operations**: 30 requests per minute per IP

### Rate Limit Headers
```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 150
X-RateLimit-Reset: 1640995200
```

### Handling Rate Limits
```javascript
const makeRequestWithRetry = async (requestFn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

// Usage
const data = await makeRequestWithRetry(() => 
  supabase.from('opportunities').select('*')
);
```

## Performance Optimization

### Query Optimization
```javascript
// Use select to limit columns
.select('id, title, deadline') // Better than .select('*')

// Use indexes for filtering
.eq('active', true)           // Indexed column
.order('deadline')            // Indexed column

// Limit results
.limit(20)                    // Prevent large result sets

// Use count only when needed
.select('*', { count: 'exact' }) // Only if you need total count
```

### Batch Operations
```javascript
// Insert multiple records
const { data, error } = await supabase
  .from('opportunities')
  .insert([
    { title: 'Opportunity 1', description: '...' },
    { title: 'Opportunity 2', description: '...' },
    { title: 'Opportunity 3', description: '...' }
  ]);

// Update multiple records
const { data, error } = await supabase
  .from('opportunities')
  .update({ active: false })
  .in('id', ['id1', 'id2', 'id3']);
```

## Testing API Endpoints

### Using JavaScript/Fetch
```javascript
// Test edge function
const testCreateCustomer = async () => {
  const response = await fetch(
    'https://lzfgigiyqpuuxslsygjt.supabase.co/functions/v1/create-stripe-customer',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer <anon_key>',
        'Content-Type': 'application/json',
        'apikey': '<anon_key>'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'api_test'
      })
    }
  );
  
  const data = await response.json();
  console.log('Response:', data);
};
```

### Using cURL
```bash
# Test edge function
curl -X POST \
  'https://lzfgigiyqpuuxslsygjt.supabase.co/functions/v1/create-stripe-customer' \
  -H 'Authorization: Bearer <anon_key>' \
  -H 'Content-Type: application/json' \
  -H 'apikey: <anon_key>' \
  -d '{
    "email": "test@example.com",
    "source": "api_test"
  }'
```

This API reference provides comprehensive documentation for all backend services and database operations used in the Tech4Humanity Australia platform.
