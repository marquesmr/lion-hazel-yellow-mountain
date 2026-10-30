create table if not exists navegador_confiado (
  id text primary key,
  user_id text not null references "user" (id) on delete cascade,
  token_hash text not null unique,
  expira_em timestamptz not null,
  criado_em timestamptz not null default now()
);

create index if not exists navegador_confiado_user_idx on navegador_confiado (user_id);
