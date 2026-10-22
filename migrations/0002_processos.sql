create table if not exists processos (
  id text primary key,
  user_id text not null,
  numero text not null,
  parte text not null,
  assunto text not null,
  tipo text not null,
  data_lancamento date not null,
  prazo date not null,
  alerta_dias integer not null,
  status text not null,
  historico text not null default '[]',
  created_at timestamptz not null default now()
);

create index if not exists processos_user_id_idx on processos (user_id);
