create table if not exists termo_aceite (
  user_id text primary key references "user" (id) on delete cascade,
  versao text not null,
  aceito_em timestamptz not null default now()
);
