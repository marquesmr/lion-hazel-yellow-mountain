alter table gestao_sessoes add column if not exists user_id text;
alter table processos add column if not exists em_manutencao boolean not null default false;
alter table processos_admin add column if not exists em_manutencao boolean not null default false;
