create table if not exists conta_excluida (
  user_id text primary key,
  email text not null,
  criado_em timestamptz not null default now()
);

create index if not exists conta_excluida_email_idx on conta_excluida (lower(email));
