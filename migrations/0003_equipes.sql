alter table processos add column if not exists team_id text;

create table if not exists equipes (
  id text primary key,
  nome text not null,
  owner_id text not null references "user" (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists equipe_membros (
  equipe_id text not null references equipes (id) on delete cascade,
  user_id text not null references "user" (id) on delete cascade,
  papel text not null,
  primary key (equipe_id, user_id)
);

create index if not exists equipe_membros_user_idx on equipe_membros (user_id);

create table if not exists equipe_convites (
  equipe_id text not null references equipes (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  primary key (equipe_id, email)
);
