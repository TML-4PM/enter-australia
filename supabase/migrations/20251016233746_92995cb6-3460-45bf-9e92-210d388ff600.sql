-- ============================================================================
-- RATE LIMITING INFRASTRUCTURE
-- ============================================================================

-- Create rate limit violations tracking table
CREATE TABLE IF NOT EXISTS public.rate_limit_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  endpoint text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  violation_count integer DEFAULT 1,
  first_violation_at timestamptz DEFAULT now(),
  last_violation_at timestamptz DEFAULT now(),
  is_blocked boolean DEFAULT false,
  blocked_until timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for rate limit violations
CREATE INDEX IF NOT EXISTS idx_violations_ip ON public.rate_limit_violations(ip_address);
CREATE INDEX IF NOT EXISTS idx_violations_endpoint ON public.rate_limit_violations(endpoint);
CREATE INDEX IF NOT EXISTS idx_violations_blocked ON public.rate_limit_violations(is_blocked, blocked_until);
CREATE INDEX IF NOT EXISTS idx_violations_timestamp ON public.rate_limit_violations(last_violation_at);

-- Create IP blocklist table for persistent bad actors
CREATE TABLE IF NOT EXISTS public.ip_blocklist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL UNIQUE,
  reason text NOT NULL,
  blocked_at timestamptz DEFAULT now(),
  blocked_by uuid REFERENCES auth.users(id),
  expires_at timestamptz,
  is_permanent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for IP blocklist lookups
CREATE INDEX IF NOT EXISTS idx_blocklist_ip ON public.ip_blocklist(ip_address);
CREATE INDEX IF NOT EXISTS idx_blocklist_expires ON public.ip_blocklist(expires_at) WHERE expires_at IS NOT NULL;

-- Enable RLS on new tables
ALTER TABLE public.rate_limit_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ip_blocklist ENABLE ROW LEVEL SECURITY;

-- RLS policies for rate_limit_violations
CREATE POLICY "Admins can view all violations"
  ON public.rate_limit_violations
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert violations"
  ON public.rate_limit_violations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update violations"
  ON public.rate_limit_violations
  FOR UPDATE
  USING (true);

-- RLS policies for ip_blocklist
CREATE POLICY "Admins can manage blocklist"
  ON public.ip_blocklist
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to check if IP is blocked
CREATE OR REPLACE FUNCTION public.is_ip_blocked(_ip inet)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.ip_blocklist
    WHERE ip_address = _ip
      AND (is_permanent = true OR expires_at > now())
  )
$$;

-- Function to log rate limit violation
CREATE OR REPLACE FUNCTION public.log_rate_limit_violation(
  _ip inet,
  _endpoint text,
  _user_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert or update violation record
  INSERT INTO public.rate_limit_violations (ip_address, endpoint, user_id, violation_count, first_violation_at, last_violation_at)
  VALUES (_ip, _endpoint, _user_id, 1, now(), now())
  ON CONFLICT (ip_address, endpoint) 
  DO UPDATE SET
    violation_count = rate_limit_violations.violation_count + 1,
    last_violation_at = now();
    
  -- Auto-block IPs with excessive violations (50+ in 24 hours)
  UPDATE public.rate_limit_violations
  SET is_blocked = true,
      blocked_until = now() + interval '6 hours'
  WHERE ip_address = _ip
    AND violation_count >= 50
    AND first_violation_at > now() - interval '24 hours'
    AND is_blocked = false;
END;
$$;

-- Add unique constraint for better upsert performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_violations_ip_endpoint 
  ON public.rate_limit_violations(ip_address, endpoint);