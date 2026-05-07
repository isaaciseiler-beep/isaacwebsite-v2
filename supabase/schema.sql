-- Favorite Spots in New Taipei / Fulbright Map
-- Run this in the Supabase SQL editor, then create a public storage bucket
-- named `fulbrightmap-pin-images`.

create extension if not exists pgcrypto;

create table if not exists public.pins (
  id uuid primary key default gen_random_uuid(),
  lat double precision not null,
  lng double precision not null,
  author_name text not null check (char_length(author_name) between 1 and 120),
  place_name text not null check (char_length(place_name) between 1 and 160),
  caption text not null check (char_length(caption) between 1 and 180),
  image_url text not null,
  anonymous_user_id text not null,
  created_at timestamptz not null default now()
);

create index if not exists pins_created_at_idx on public.pins (created_at desc);
create index if not exists pins_anonymous_user_id_idx on public.pins (anonymous_user_id);

alter table public.pins enable row level security;

drop policy if exists "Anyone can read pins" on public.pins;
create policy "Anyone can read pins"
  on public.pins for select
  using (true);

drop policy if exists "Anonymous visitors can create pins" on public.pins;
create policy "Anonymous visitors can create pins"
  on public.pins for insert
  with check (
    anonymous_user_id is not null
    and char_length(caption) <= 180
  );

-- Storage setup:
-- 1. In Supabase Dashboard > Storage, create a bucket named
--    `fulbrightmap-pin-images`.
-- 2. Make it public, or use the SQL below if your project permits it.
-- 3. The app uploads compressed JPGs to:
--    fulbrightmap-pin-images/{anonymous_user_id}/{uuid}.jpg

insert into storage.buckets (id, name, public)
values ('fulbrightmap-pin-images', 'fulbrightmap-pin-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can read map images" on storage.objects;
create policy "Anyone can read map images"
  on storage.objects for select
  using (bucket_id = 'fulbrightmap-pin-images');

drop policy if exists "Anonymous visitors can upload map images" on storage.objects;
create policy "Anonymous visitors can upload map images"
  on storage.objects for insert
  with check (bucket_id = 'fulbrightmap-pin-images');
