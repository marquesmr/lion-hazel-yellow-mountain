alter table processos add column if not exists autor_id text;
alter table processos add column if not exists autor_nome text not null default '';
