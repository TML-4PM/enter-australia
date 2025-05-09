
-- Create ETL logs table to track data sync operations
CREATE TABLE IF NOT EXISTS public.etl_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,   -- API source name (e.g., 'austender', 'business_gov_au')
  status TEXT NOT NULL,   -- 'success', 'failure', 'partial'
  details JSONB,         -- Additional information like record counts, errors
  run_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index for faster querying
CREATE INDEX IF NOT EXISTS etl_logs_source_status_idx ON public.etl_logs (source, status);

-- Add RLS policy - Only authenticated users can view logs
ALTER TABLE public.etl_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view ETL logs" ON public.etl_logs FOR SELECT USING (auth.role() = 'authenticated');
