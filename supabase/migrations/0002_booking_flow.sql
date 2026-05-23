-- Filter Fresh booking flow tables
-- zips: server-side service-area validation
-- waitlist: out-of-area email capture for future expansion

create table if not exists public.zips (
  zip        text primary key,
  city_slug  text not null references public.cities(slug) on delete cascade
);
create index if not exists zips_city_slug_idx on public.zips (city_slug);

alter table public.zips enable row level security;
drop policy if exists "zips are publicly readable" on public.zips;
create policy "zips are publicly readable"
  on public.zips for select
  to anon, authenticated
  using (true);

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  zip         text not null,
  created_at  timestamptz not null default now()
);
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_zip_idx on public.waitlist (zip);

alter table public.waitlist enable row level security;
-- No anon policies. Writes happen via the service-role server route.
