create table if not exists codigo_cadastro (
  email text primary key,
  codigo_hash text not null,
  expira_em timestamptz not null,
  tentativas int not null default 0,
  criado_em timestamptz not null default now()
);
