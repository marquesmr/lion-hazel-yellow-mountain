create table if not exists acesso_direto (
  token_hash text primary key,
  user_id text not null,
  expira_em timestamptz not null
);
