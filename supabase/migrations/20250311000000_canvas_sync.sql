-- CANVAS ICS SYNC
-- New tables and columns for Canvas calendar sync via ICS link

-- 1. user_canvas_sync: store ICS URL per user
create table user_canvas_sync (
  user_id text primary key,
  canvas_ics_url text not null,
  last_synced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table user_canvas_sync enable row level security;

create policy "Users can view own canvas sync"
  on user_canvas_sync for select to authenticated
  using ((select auth.jwt()->>'sub') = user_id);

create policy "Users can insert own canvas sync"
  on user_canvas_sync for insert to authenticated
  with check ((select auth.jwt()->>'sub') = user_id);

create policy "Users can update own canvas sync"
  on user_canvas_sync for update to authenticated
  using ((select auth.jwt()->>'sub') = user_id);

create policy "Users can delete own canvas sync"
  on user_canvas_sync for delete to authenticated
  using ((select auth.jwt()->>'sub') = user_id);


-- 2. canvas_import_pending: orphan events (no matching course yet)
create table canvas_import_pending (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  canvas_uid text not null,
  name text not null,
  due_date timestamptz,
  canvas_course_id text,
  canvas_course_name text,
  canvas_url text,
  raw_event jsonb,
  created_at timestamptz default now(),
  unique (user_id, canvas_uid)
);

alter table canvas_import_pending enable row level security;

create policy "Users can view own pending imports"
  on canvas_import_pending for select to authenticated
  using ((select auth.jwt()->>'sub') = user_id);

create policy "Users can insert own pending imports"
  on canvas_import_pending for insert to authenticated
  with check ((select auth.jwt()->>'sub') = user_id);

create policy "Users can update own pending imports"
  on canvas_import_pending for update to authenticated
  using ((select auth.jwt()->>'sub') = user_id);

create policy "Users can delete own pending imports"
  on canvas_import_pending for delete to authenticated
  using ((select auth.jwt()->>'sub') = user_id);


-- 3. assignments: add canvas_uid and source
alter table assignments
  add column if not exists canvas_uid text,
  add column if not exists source text default 'syllabus';

-- Unique constraint: one assignment per canvas UID (NULLs allowed, multiple NULLs ok)
create unique index if not exists assignments_canvas_uid_key
  on assignments (canvas_uid)
  where canvas_uid is not null;

-- Backfill existing rows (in case default didn't apply)
update assignments set source = 'syllabus' where source is null;


-- 4. courses: add canvas_course_id for matching
alter table courses
  add column if not exists canvas_course_id text;
