-- HOW TO RUN THIS FILE IN SUPABASE
-- 1. Run supabase/schema.sql first. It creates public.is_admin(), used below.
-- 2. Open your Supabase project dashboard, then go to SQL Editor -> New query.
-- 3. Paste the entire contents of this file and click Run.
--
-- This script is idempotent. It is safe to run again.
-- Existing RLS policies with the same names are dropped and recreated.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  category text not null,
  message text not null,
  created_at timestamptz not null default now(),
  constraint support_requests_name_length
    check (char_length(btrim(name)) between 1 and 120),
  constraint support_requests_email_length
    check (char_length(btrim(email)) between 3 and 254),
  constraint support_requests_category_length
    check (char_length(btrim(category)) between 1 and 80),
  constraint support_requests_message_length
    check (char_length(btrim(message)) between 10 and 5000)
);

create index if not exists support_requests_created_at_idx
  on public.support_requests (created_at desc);

comment on table public.support_requests is
  'Messages submitted through the public contact form.';

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.support_requests enable row level security;

revoke all on table public.support_requests from anon, authenticated;

grant usage on schema public to anon, authenticated;
grant insert on table public.support_requests to anon, authenticated;
grant select on table public.support_requests to authenticated;

-- Anyone can submit a request. No one can read them back without admin access.
drop policy if exists "Anyone can submit support requests"
  on public.support_requests;

create policy "Anyone can submit support requests"
  on public.support_requests
  for insert
  to anon, authenticated
  with check (true);

-- Only registered admins can read submissions.
drop policy if exists "Admins can read support requests"
  on public.support_requests;

create policy "Admins can read support requests"
  on public.support_requests
  for select
  to authenticated
  using ((select public.is_admin()));
