-- Fix Critical Security Issues: PII Exposure and Missing RLS Policies
-- Uses DROP IF EXISTS to handle existing policies gracefully

-- ============================================================================
-- 1. FIX PROFILES TABLE - Add missing RLS policies
-- ============================================================================

-- Drop all existing policies to start clean
DROP POLICY IF EXISTS "Public can view profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Recreate policies with proper security
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));


-- ============================================================================
-- 2. FIX LEADS TABLE - Restrict PII access to admins only
-- ============================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can view leads" ON leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON leads;
DROP POLICY IF EXISTS "Admins can update leads" ON leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON leads;

-- Recreate with proper security
CREATE POLICY "Admins can view all leads"
ON leads FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit leads"
ON leads FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update leads"
ON leads FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete leads"
ON leads FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));


-- ============================================================================
-- 3. FIX EMAIL_SUBSCRIPTIONS TABLE - Protect subscriber PII
-- ============================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Public can view email subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Admins can manage email subscriptions" ON email_subscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe" ON email_subscriptions;

-- Recreate with proper security
CREATE POLICY "Admins can view email subscriptions"
ON email_subscriptions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can subscribe"
ON email_subscriptions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update email subscriptions"
ON email_subscriptions FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete email subscriptions"
ON email_subscriptions FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));


-- ============================================================================
-- 4. FIX CONTACT_SUBMISSIONS TABLE - Protect contact form PII
-- ============================================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON contact_submissions;

-- Recreate with proper security
CREATE POLICY "Admins can view contact submissions"
ON contact_submissions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit contact forms"
ON contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update contact submissions"
ON contact_submissions FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions"
ON contact_submissions FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));