-- Filter Fresh initial schema
-- Tables: cities (programmatic SEO data), leads (form submissions), bookings (scheduled jobs)

create extension if not exists "pgcrypto";

-- ---------- cities ----------
create table if not exists public.cities (
  slug              text primary key,
  name              text not null,
  county            text not null,
  tier              smallint not null default 2,
  lat               double precision,
  lng               double precision,
  population        integer,
  neighborhoods     text[] not null default '{}',
  zips              text[] not null default '{}',
  content_overrides jsonb
);

create index if not exists cities_county_idx on public.cities (county);
create index if not exists cities_tier_idx on public.cities (tier);
create index if not exists cities_zips_gin on public.cities using gin (zips);

-- ---------- leads ----------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text,
  phone        text not null,
  address      text,
  city         text,
  zip          text,
  filter_type  text check (filter_type in ('cartridge','de','sand','unknown')),
  message      text,
  source_page  text,
  created_at   timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_zip_idx on public.leads (zip);

-- ---------- bookings ----------
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references public.leads (id) on delete cascade,
  scheduled_date  timestamptz,
  status          text not null default 'pending'
                    check (status in ('pending','confirmed','completed','canceled')),
  notes           text,
  total           numeric(8,2) not null default 75.00,
  created_at      timestamptz not null default now()
);

create index if not exists bookings_lead_id_idx on public.bookings (lead_id);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_scheduled_date_idx on public.bookings (scheduled_date);

-- ---------- RLS ----------
-- cities: world-readable (used by SSR/SSG fallbacks); writes are server-side only via service role.
alter table public.cities enable row level security;
drop policy if exists "cities are publicly readable" on public.cities;
create policy "cities are publicly readable"
  on public.cities for select
  to anon, authenticated
  using (true);

-- leads & bookings: no anon access. Service role bypasses RLS, so the lead API can insert.
alter table public.leads enable row level security;
alter table public.bookings enable row level security;
