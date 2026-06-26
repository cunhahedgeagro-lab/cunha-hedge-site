create extension if not exists pgcrypto;

create table if not exists public.viabilidade_pecuaria_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  cpf text not null unique,
  whatsapp text not null,
  email text,
  city text not null,
  state text not null,
  herd_size_range text not null,
  herd_size_exact integer,
  cattle_roles text[] not null default '{}',
  other_role text
);

create index if not exists viabilidade_pecuaria_leads_cpf_idx
  on public.viabilidade_pecuaria_leads (cpf);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_viabilidade_pecuaria_leads_updated_at
  on public.viabilidade_pecuaria_leads;

create trigger set_viabilidade_pecuaria_leads_updated_at
before update on public.viabilidade_pecuaria_leads
for each row
execute function public.set_updated_at();

alter table public.viabilidade_pecuaria_leads enable row level security;
