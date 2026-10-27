create table if not exists autenticador (
  user_id text primary key references "user" (id) on delete cascade,
  segredo text not null,
  confirmado boolean not null default false,
  atualizado_em timestamptz not null default now()
);
