-- Update default target_email addresses to troy@enteraustralia.tech

-- Update the email_subscriptions table default
ALTER TABLE public.email_subscriptions 
ALTER COLUMN target_email SET DEFAULT 'troy@enteraustralia.tech';

-- Update existing records in email_subscriptions
UPDATE public.email_subscriptions 
SET target_email = 'troy@enteraustralia.tech' 
WHERE target_email = 'troy@tech4humanity.com.au';

-- Update the leads table default
ALTER TABLE public.leads 
ALTER COLUMN target_email SET DEFAULT 'troy@enteraustralia.tech';

-- Update existing records in leads
UPDATE public.leads 
SET target_email = 'troy@enteraustralia.tech' 
WHERE target_email = 'troy@tech4humanity.com.au';