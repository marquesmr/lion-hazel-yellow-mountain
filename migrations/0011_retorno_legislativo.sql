alter table processos add column if not exists retorno text;
alter table processos add column if not exists veto_alcance text;
alter table processos add column if not exists lei_tipo text;
alter table processos add column if not exists lei_numero integer;
alter table processos add column if not exists lei_ano integer;
alter table processos add column if not exists apreciacao_prazo date;
