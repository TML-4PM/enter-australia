
-- Create table for email subscriptions
CREATE TABLE IF NOT EXISTS public.email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'website',
  stripe_customer_id TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_email ON public.email_subscriptions (email);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_stripe_customer_id ON public.email_subscriptions (stripe_customer_id);

-- Add RLS policies
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anon and authenticated users to insert new subscriptions
CREATE POLICY "Allow inserts for everyone" ON public.email_subscriptions
  FOR INSERT WITH CHECK (true);
  
-- Only allow admins to view and update subscriptions
CREATE POLICY "Allow admins to select subscriptions" ON public.email_subscriptions
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_active = true
  ));

CREATE POLICY "Allow admins to update subscriptions" ON public.email_subscriptions
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM admin_users WHERE is_active = true
  ));
  
-- Functions to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_email_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_subscriptions_updated_at
BEFORE UPDATE ON public.email_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_email_subscriptions_updated_at();
