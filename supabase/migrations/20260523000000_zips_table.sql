-- Rebuild the zips table with a richer schema (city, county, region, in_service_area)
-- and add the leads_outside_area capture table used by the booking flow.
--
-- The previous zips table held only (zip, city_slug) with an FK to cities; we drop it
-- cascade-style and rebuild from scratch. The 122-entry seed is loaded by
-- supabase/seed/seed-zips.ts (or via MCP for environments without a service role).

drop table if exists public.zips cascade;

create table public.zips (
  zip              text primary key,
  city             text not null,
  county           text not null,
  region           text not null,
  in_service_area  boolean not null default true,
  created_at       timestamptz default now()
);

create index idx_zips_in_service_area on public.zips(in_service_area);

alter table public.zips enable row level security;
drop policy if exists "zips are publicly readable" on public.zips;
create policy "zips are publicly readable"
  on public.zips for select
  to anon, authenticated
  using (true);

-- Captures for ZIPs outside the service area, used to plan future route expansion.
create table if not exists public.leads_outside_area (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  zip         text not null,
  created_at  timestamptz not null default now()
);

create index if not exists leads_outside_area_zip_idx on public.leads_outside_area (zip);
create index if not exists leads_outside_area_created_at_idx on public.leads_outside_area (created_at desc);

alter table public.leads_outside_area enable row level security;
-- No anon policies; writes go through the service-role API route at /api/leads-outside-area.
