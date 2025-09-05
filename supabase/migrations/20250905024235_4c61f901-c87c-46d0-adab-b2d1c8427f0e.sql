
-- 1) Create email_subscriptions table (used by saveEmailSubscription)
create table if not exists public.email_subscriptions (
  email text primary key,
  target_email text not null default 'troy@tech4humanity.com.au',
  source text,
  subscribed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.email_subscriptions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'email_subscriptions' 
      and policyname = 'Anyone can insert email subscriptions'
  ) then
    create policy "Anyone can insert email subscriptions"
      on public.email_subscriptions
      for insert
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'email_subscriptions' 
      and policyname = 'Anyone can update email subscriptions'
  ) then
    create policy "Anyone can update email subscriptions"
      on public.email_subscriptions
      for update
      using (true);
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'public' and tablename = 'email_subscriptions' 
      and policyname = 'Authenticated users can read email subscriptions'
  ) then
    create policy "Authenticated users can read email subscriptions"
      on public.email_subscriptions
      for select
      using (auth.role() = 'authenticated');
  end if;
end
$$;

-- 2) Storage bucket for file archives
insert into storage.buckets (id, name, public)
values ('form-archives', 'form-archives', false)
on conflict (id) do nothing;

-- Policies on storage.objects for the bucket
do $$
begin
  if not exists (
    select 1 from pg_policies 
    where schemaname = 'storage' and tablename = 'objects' 
      and policyname = 'Allow insert into form-archives for anon and authenticated'
  ) then
    create policy "Allow insert into form-archives for anon and authenticated"
      on storage.objects
      for insert
      to anon, authenticated
      with check (bucket_id = 'form-archives');
  end if;

  if not exists (
    select 1 from pg_policies 
    where schemaname = 'storage' and tablename = 'objects' 
      and policyname = 'Allow read form-archives to authenticated'
  ) then
    create policy "Allow read form-archives to authenticated"
      on storage.objects
      for select
      to authenticated
      using (bucket_id = 'form-archives');
  end if;
end
$$;
