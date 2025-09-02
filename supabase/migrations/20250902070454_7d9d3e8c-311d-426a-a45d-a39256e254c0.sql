-- Create leads table for contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  target_email TEXT NOT NULL DEFAULT 'troy@tech4humanity.com.au',
  display_email TEXT DEFAULT 'info@enteraustralia.tech',
  company TEXT,
  service TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (contact form is public)
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy to restrict reading leads (only authenticated users can read)
CREATE POLICY "Authenticated users can read leads" 
ON public.leads 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create index for email lookups
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();