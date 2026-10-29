create table if not exists usuario_perfil (
  user_id text primary key references "user" (id) on delete cascade,
  papel text not null default 'operador',
  bloqueado boolean not null default false
);

create table if not exists feriados (
  id text primary key,
  inicio date not null,
  fim date not null,
  nome text not null,
  tipo text not null default 'feriado'
);

create table if not exists gestao_config (
  id text primary key,
  manutencao boolean not null default false,
  backup_em timestamptz,
  backup_auto_em timestamptz
);

create table if not exists gestao_backups (
  id text primary key,
  criado_em timestamptz not null default now(),
  automatico boolean not null default false,
  conteudo text not null
);

insert into gestao_config (id) values ('principal') on conflict (id) do nothing;
