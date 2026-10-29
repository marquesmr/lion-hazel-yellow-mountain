alter table processos_admin add column if not exists link_abertura text not null default '';
alter table processos_admin add column if not exists link_homologacao text not null default '';
alter table processos_admin add column if not exists link_pncp text not null default '';
