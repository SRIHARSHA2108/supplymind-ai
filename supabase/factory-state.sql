-- Run this once in the Supabase SQL editor.
create table if not exists public.factory_state (
  id text primary key default 'current',
  supplier_delay numeric not null default 6,
  inventory_buffer numeric not null default 42,
  demand_surge numeric not null default 28,
  transport_capacity numeric not null default 74,
  production_availability numeric not null default 88,
  machine_downtime numeric not null default 8,
  updated_at timestamptz not null default now()
);

alter table public.factory_state enable row level security;

drop policy if exists "Public can read factory state" on public.factory_state;
create policy "Public can read factory state"
  on public.factory_state for select
  using (true);

insert into public.factory_state (id)
values ('current')
on conflict (id) do nothing;

do $$
begin
  alter publication supabase_realtime add table public.factory_state;
exception
  when duplicate_object then null;
end $$;
