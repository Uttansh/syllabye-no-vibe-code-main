-- RATE LIMITS TABLE
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- or apply via: supabase db push (if using Supabase CLI)

create table rate_limits (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  endpoint text not null,
  window_start timestamptz not null,
  request_count integer not null default 1,
  created_at timestamptz default now()
);

-- Prevent duplicate rows per user+endpoint+window
create unique index rate_limit_unique_idx
on rate_limits (user_id, endpoint, window_start);

alter table rate_limits enable row level security;

-- Users can only access their own rate limits (Clerk sub = user_id in JWT)
create policy "Users can view own rate limits"
on rate_limits for select to authenticated
using ((select auth.jwt()->>'sub') = user_id);

create policy "Users can insert own rate limits"
on rate_limits for insert to authenticated
with check ((select auth.jwt()->>'sub') = user_id);

create policy "Users can update own rate limits"
on rate_limits for update to authenticated
using ((select auth.jwt()->>'sub') = user_id);
