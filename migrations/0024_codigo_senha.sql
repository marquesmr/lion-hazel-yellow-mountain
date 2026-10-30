create table if not exists codigo_senha (
  email text primary key,
  codigo_hash text not null,
  expira_em timestamptz not null,
  tentativas int not null default 0,
  criado_em timestamptz not null default now()
);

alter table gestao_config add column if not exists smtp_senha text;
