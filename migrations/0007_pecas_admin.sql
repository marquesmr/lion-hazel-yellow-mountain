alter table processos_admin add column if not exists ci_numero integer;
alter table processos_admin add column if not exists ci_ano integer;
alter table processos_admin add column if not exists ci_origem text not null default '';
alter table processos_admin add column if not exists parecer_numero integer;
alter table processos_admin add column if not exists parecer_ano integer;
