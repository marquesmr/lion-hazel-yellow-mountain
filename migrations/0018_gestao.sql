create table if not exists gestao_acesso (
  id text primary key,
  email text not null unique,
  senha_hash text not null,
  troca_pendente boolean not null default true,
  atualizado_em timestamptz not null default now()
);

create table if not exists gestao_sessoes (
  token text primary key,
  expira_em timestamptz not null
);

create table if not exists uso_registros (
  id text primary key,
  user_id text,
  nome text not null default '',
  email text not null default '',
  acao text not null,
  detalhe text not null default '',
  criado_em timestamptz not null default now()
);

create index if not exists uso_registros_em_idx on uso_registros (criado_em desc);

create table if not exists presenca (
  user_id text primary key,
  nome text not null default '',
  email text not null default '',
  visto_em timestamptz not null default now()
);

create table if not exists abas_catalogo (
  id text primary key,
  area text not null,
  nome text not null,
  ordem int not null default 100,
  ativa boolean not null default true,
  fixa boolean not null default false,
  unique (area, nome)
);

insert into abas_catalogo (id, area, nome, ordem, ativa, fixa) values
  ('leg-req', 'legislativo', 'Requerimentos', 1, true, true),
  ('leg-ind', 'legislativo', 'Indicações', 2, true, true),
  ('leg-pl', 'legislativo', 'Projetos de Lei', 3, true, true),
  ('leg-out', 'legislativo', 'Outros', 4, true, true),
  ('adm-pre', 'administrativo', 'Pregão', 1, true, true),
  ('adm-con', 'administrativo', 'Concorrência', 2, true, true),
  ('adm-cs', 'administrativo', 'Concurso', 3, true, true),
  ('adm-lei', 'administrativo', 'Leilão', 4, true, true),
  ('adm-dia', 'administrativo', 'Diálogo Competitivo', 5, true, true),
  ('adm-dis', 'administrativo', 'Dispensa de Licitação', 6, true, true),
  ('adm-ine', 'administrativo', 'Inexigibilidade de Licitação', 7, true, true),
  ('adm-pp', 'administrativo', 'Pronto Pagamento', 8, true, true),
  ('adm-doa', 'administrativo', 'Doação', 9, true, true),
  ('adm-out', 'administrativo', 'Outros', 10, true, true)
on conflict (area, nome) do nothing;
