create table if not exists processos_admin (
  id text primary key,
  user_id text not null,
  team_id text,
  numero text not null,
  referencia text not null default '',
  objeto text not null,
  tipo text not null,
  data_inicio date not null,
  encerramento date not null,
  alerta_dias integer not null,
  possui_contrato boolean not null default false,
  vigencia_inicio date,
  vigencia_fim date,
  contratado text not null default '',
  documento text not null default '',
  valor_total_centavos integer,
  valor_mensal_centavos integer,
  status text not null,
  historico text not null default '[]',
  autor_id text,
  autor_nome text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists processos_admin_user_idx on processos_admin (user_id);
create index if not exists processos_admin_team_idx on processos_admin (team_id);
