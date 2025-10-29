
-- SQL to create tracks table (for Supabase)
create extension if not exists "pgcrypto";

create table if not exists tracks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  title text,
  artist text,
  genre text,
  tags text[],
  description text,
  file_path text,
  public_url text,
  duration_seconds integer,
  created_at timestamptz default now()
);

create index if not exists idx_tracks_user_id on tracks (user_id);
create index if not exists idx_tracks_genre on tracks (genre);
create index if not exists idx_tracks_created_at on tracks (created_at desc);

-- Recommended RLS policy (run manually in SQL editor) :
-- Enable RLS:
-- ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- Allow owners to insert/select/update/delete their own rows:
-- CREATE POLICY "user_is_owner" ON tracks
--   USING (auth.role() = 'authenticated' AND user_id = auth.uid());

-- For admin by email, you can create a function to check admin email, or manage via additional table.
