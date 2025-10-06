-- =====================================================
-- SECURITY FIX: RLS Policies and Access Control
-- Fixes: Missing RLS, Infinite Recursion, Public Data Exposure
-- =====================================================

-- =====================================================
-- 1. FIX INFINITE RECURSION - CREATE HELPER FUNCTIONS
-- =====================================================

-- Function to check partner membership (already has user_id column)
CREATE OR REPLACE FUNCTION public.is_active_partner_member(_user_id uuid, _partner_org_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.partner_members
    WHERE user_id = _user_id 
      AND partner_org_id = _partner_org_id
      AND is_active = true
  )
$$;

-- Function to check if user is in a chat conversation
CREATE OR REPLACE FUNCTION public.is_in_conversation(_user_id uuid, _conversation_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.chat_participants
    WHERE user_id = _user_id 
      AND conversation_id = _conversation_id
  )
$$;

-- =====================================================
-- 2. DROP EXISTING RECURSIVE POLICIES
-- =====================================================

-- Drop recursive partner_members policies
DROP POLICY IF EXISTS "Partner members can view their own memberships" ON public.partner_members;
DROP POLICY IF EXISTS "Partner owners can manage memberships" ON public.partner_members;

-- Drop recursive chat_participants policies
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.chat_participants;

-- Drop recursive chat_conversations policies
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON public.chat_conversations;

-- Drop recursive chat_messages policies  
DROP POLICY IF EXISTS "Users can send messages to conversations they're in" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.chat_messages;

-- =====================================================
-- 3. CREATE NON-RECURSIVE POLICIES
-- =====================================================

-- Partner members: Users view their own memberships
CREATE POLICY "Users can view their own memberships"
ON public.partner_members
FOR SELECT
USING (auth.uid() = user_id);

-- Partner members: Admins manage all
CREATE POLICY "Admins manage all partner members"
ON public.partner_members
FOR ALL
USING (has_role(auth.uid(), 'consentx_admin'::app_role));

-- Chat participants: Users view their own participation
CREATE POLICY "Users view their own participation"
ON public.chat_participants
FOR SELECT
USING (auth.uid() = user_id);

-- Chat participants: Users can join conversations
CREATE POLICY "Users can join conversations"
ON public.chat_participants
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Chat conversations: Use helper function to avoid recursion
CREATE POLICY "Users view conversations they're in"
ON public.chat_conversations
FOR SELECT
USING (is_in_conversation(auth.uid(), id));

-- Chat messages: Use helper function for send policy
CREATE POLICY "Users send messages to their conversations"
ON public.chat_messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id 
  AND is_in_conversation(auth.uid(), conversation_id)
);

-- Chat messages: Use helper function for view policy
CREATE POLICY "Users view messages in their conversations"
ON public.chat_messages
FOR SELECT
USING (is_in_conversation(auth.uid(), conversation_id));

-- =====================================================
-- 4. ENABLE RLS FOR SYSTEM CONFIG TABLES
-- =====================================================

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin only access to app config" ON public.app_config;
DROP POLICY IF EXISTS "Admin only access to app settings" ON public.app_settings;
DROP POLICY IF EXISTS "Admin only access" ON public.app_config;
DROP POLICY IF EXISTS "Admin only access" ON public.app_settings;

CREATE POLICY "Admins only"
ON public.app_config
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins only"
ON public.app_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- 5. ENABLE RLS FOR BUSINESS OPERATIONS TABLES
-- =====================================================

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.reports;
CREATE POLICY "Admins only"
ON public.reports
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.trilogy_tracker ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.trilogy_tracker;
CREATE POLICY "Admins only"
ON public.trilogy_tracker
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.trilogy_subcomponents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.trilogy_subcomponents;
CREATE POLICY "Admins only"
ON public.trilogy_subcomponents
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.governance_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.governance_events;
CREATE POLICY "Admins only"
ON public.governance_events
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.dashboard_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.dashboard_snapshots;
CREATE POLICY "Admins only"
ON public.dashboard_snapshots
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.slack_delivery_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.slack_delivery_log;
CREATE POLICY "Admins only"
ON public.slack_delivery_log
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.slack_report_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.slack_report_log;
CREATE POLICY "Admins only"
ON public.slack_report_log
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.reports_outbox ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.reports_outbox;
CREATE POLICY "Admins only"
ON public.reports_outbox
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- 6. PROTECT PROPRIETARY CONTENT
-- =====================================================

ALTER TABLE public.file_library ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.file_library;
CREATE POLICY "Admins only"
ON public.file_library
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.family_agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.family_agents;
CREATE POLICY "Admins only"
ON public.family_agents
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.family_agents_ai_native ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.family_agents_ai_native;
CREATE POLICY "Admins only"
ON public.family_agents_ai_native
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

ALTER TABLE public.domains_map ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admin only access" ON public.domains_map;
CREATE POLICY "Admins only"
ON public.domains_map
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));