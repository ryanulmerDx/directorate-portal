-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Create the table
create table if not exists public.clue_state (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  clue_key   text not null,            -- e.g. "M1C1", "M1C2"
  solved     boolean not null default false,
  solved_at  timestamptz,
  next_page_unlocked boolean not null default false,
  created_at timestamptz not null default now(),

  unique (user_id, clue_key)
);

-- 2. Enable RLS
alter table public.clue_state enable row level security;

-- 3. Policies — users can only touch their own rows
create policy "Users can read own clue state"
  on public.clue_state for select
  using (auth.uid() = user_id);

create policy "Users can insert own clue state"
  on public.clue_state for insert
  with check (auth.uid() = user_id);

create policy "Users can update own clue state"
  on public.clue_state for update
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────
-- 4. Agents table
-- ─────────────────────────────────────────────────────────
create table if not exists public.agents (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid not null unique references auth.users(id) on delete cascade,
  agent_id   text not null,              -- first 4 chars of email, uppercase
  email      text not null,
  created_at timestamptz not null default now()
);

-- 5. Enable RLS
alter table public.agents enable row level security;

-- 6. Policies — users can only read/update their own agent row
create policy "Users can read own agent"
  on public.agents for select
  using (auth.uid() = user_id);

create policy "Users can insert own agent"
  on public.agents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own agent"
  on public.agents for update
  using (auth.uid() = user_id);
