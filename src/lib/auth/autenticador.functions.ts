import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { NOME_APLICACAO } from "@/lib/nome-aplicacao";

const ISSUER = NOME_APLICACAO;

const tentativas = new Map<string, { n: number; ate: number }>();

function limitar(email: string) {
  const agora = Date.now();
  const item = tentativas.get(email);
  if (item && item.ate > agora && item.n >= 5) {
    throw new Error("Muitas tentativas. Espere alguns minutos e tente de novo.");
  }
  if (!item || item.ate <= agora) tentativas.set(email, { n: 1, ate: agora + 10 * 60 * 1000 });
  else item.n += 1;
}

function codigoOk(value: unknown): string {
  const codigo = String(value ?? "").replace(/\D/g, "");
  if (!/^\d{6}$/.test(codigo)) throw new Error("Informe o código de 6 dígitos do aplicativo.");
  return codigo;
}

export const estadoAutenticador = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const linhas = await sql<{ confirmado: boolean; obrigatorio: boolean }>`
      select confirmado, obrigatorio from autenticador where user_id = ${context.userId}
    `;
    return { ativo: linhas[0]?.confirmado === true, obrigatorio: linhas[0]?.obrigatorio === true };
  });

export const marcarAutenticadorObrigatorio = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`
      insert into autenticador (user_id, segredo, confirmado, obrigatorio)
      values (${context.userId}, '', false, true)
      on conflict (user_id) do update
      set obrigatorio = true, atualizado_em = now()
    `;
    return { ok: true };
  });

export const registrarAceiteTermo = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`
      insert into termo_aceite (user_id, versao)
      values (${context.userId}, '2026-10-29')
      on conflict (user_id) do update set versao = excluded.versao, aceito_em = now()
    `;
    return { ok: true };
  });

export const dispensarAutenticador = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`
      insert into autenticador (user_id, segredo, confirmado, obrigatorio)
      values (${context.userId}, '', false, false)
      on conflict (user_id) do update
      set obrigatorio = false, atualizado_em = now()
      where autenticador.confirmado = false
    `;
    return { ok: true };
  });

export const iniciarAutenticador = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const usuarios = await sql<{ email: string }>`select email from "user" where id = ${context.userId}`;
    const email = usuarios[0]?.email;
    if (!email) throw new Error("Esta conta não tem e-mail.");
    const { randomBytes } = await import("node:crypto");
    const { createOTP } = await import("@better-auth/utils/otp");
    const { base32 } = await import("@better-auth/utils/base32");
    const QRCode = await import("qrcode");
    const segredo = randomBytes(20).toString("hex");
    await sql`
      insert into autenticador (user_id, segredo, confirmado, pendente, atualizado_em)
      values (${context.userId}, ${segredo}, false, ${segredo}, now())
      on conflict (user_id) do update
      set pendente = excluded.pendente, atualizado_em = now()
    `;
    const otp = createOTP(segredo, { digits: 6, period: 30 });
    const uri = otp.url(ISSUER, email);
    const chave = base32.encode(segredo, { padding: false });
    const svg = await QRCode.toString(uri, { type: "svg", margin: 1, width: 196, errorCorrectionLevel: "M" });
    return { chave, svg: svg.replace(/<\?xml[^>]*>/, "") };
  });

export const confirmarAutenticador = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Dados inválidos");
    return { codigo: codigoOk((input as { codigo?: unknown }).codigo) };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const linhas = await sql<{ segredo: string; pendente: string | null }>`
      select segredo, pendente from autenticador where user_id = ${context.userId}
    `;
    const alvo = linhas[0]?.pendente || linhas[0]?.segredo;
    if (!alvo) throw new Error("Gere o código do aplicativo antes de confirmar.");
    const { createOTP } = await import("@better-auth/utils/otp");
    const ok = await createOTP(alvo, { digits: 6, period: 30 }).verify(data.codigo, { window: 1 });
    if (!ok) throw new Error("Código do aplicativo incorreto.");
    await sql`
      update autenticador
      set segredo = ${alvo}, confirmado = true, pendente = null, atualizado_em = now()
      where user_id = ${context.userId}
    `;
    return { ativo: true, navegador: await emitirNavegador(sql, context.userId) };
  });

async function tabelaNavegador(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql`
    create table if not exists navegador_confiado (
      id text primary key,
      user_id text not null,
      token_hash text not null unique,
      expira_em timestamptz not null,
      criado_em timestamptz not null default now()
    )
  `;
}

async function emitirNavegador(sql: Awaited<ReturnType<typeof getSql>>, userId: string) {
  await tabelaNavegador(sql);
  const { randomBytes, createHash } = await import("node:crypto");
  const token = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(token).digest("hex");
  await sql`delete from navegador_confiado where expira_em <= now()`;
  await sql`
    insert into navegador_confiado (id, user_id, token_hash, expira_em)
    values (${crypto.randomUUID()}, ${userId}, ${hash}, now() + interval '30 days')
  `;
  return token;
}

export const situacaoNavegador = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const token = input && typeof input === "object" ? (input as { token?: unknown }).token : "";
    return { token: typeof token === "string" && /^[a-f0-9]{64}$/.test(token) ? token : "" };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await tabelaNavegador(sql);
    const linhas = await sql<{ confirmado: boolean }>`
      select confirmado from autenticador where user_id = ${context.userId}
    `;
    const ativo = linhas[0]?.confirmado === true;
    if (!data.token) return { confiado: false, ativo, expiraEm: null as string | null };
    const { createHash } = await import("node:crypto");
    const hash = createHash("sha256").update(data.token).digest("hex");
    const confianca = await sql<{ expira_em: string }>`
      select expira_em from navegador_confiado
      where user_id = ${context.userId} and token_hash = ${hash} and expira_em > now()
      limit 1
    `;
    return {
      confiado: confianca.length > 0,
      ativo,
      expiraEm: confianca[0] ? String(confianca[0].expira_em) : null,
    };
  });

export const autorizarNavegador = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Dados inválidos");
    return { codigo: codigoOk((input as { codigo?: unknown }).codigo) };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const linhas = await sql<{ segredo: string }>`
      select segredo from autenticador where user_id = ${context.userId} and confirmado = true
    `;
    if (!linhas[0]?.segredo) throw new Error("Cadastre o aplicativo autenticador antes de autorizar este navegador.");
    const { createOTP } = await import("@better-auth/utils/otp");
    const ok = await createOTP(linhas[0].segredo, { digits: 6, period: 30 }).verify(data.codigo, { window: 1 });
    if (!ok) throw new Error("Código do aplicativo incorreto.");
    return { navegador: await emitirNavegador(sql, context.userId) };
  });

export const redefinirSenhaAutenticador = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Dados inválidos");
    const bruto = input as { email?: unknown; codigo?: unknown; senha?: unknown };
    const email = typeof bruto.email === "string" ? bruto.email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido.");
    const senha = typeof bruto.senha === "string" ? bruto.senha : "";
    if (senha.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
    if (senha.length > 128) throw new Error("A senha está longa demais.");
    return { email, codigo: codigoOk(bruto.codigo), senha };
  })
  .handler(async ({ data }) => {
    limitar(data.email);
    const sql = await getSql();
    const usuarios = await sql<{ id: string }>`select id from "user" where lower(email) = ${data.email}`;
    const userId = usuarios[0]?.id;
    const segredos = userId
      ? await sql<{ segredo: string }>`
          select segredo from autenticador where user_id = ${userId} and confirmado = true
        `
      : [];
    if (!userId || !segredos[0]) {
      throw new Error("Esta conta não tem aplicativo autenticador. Configure no perfil enquanto souber a senha.");
    }
    const { createOTP } = await import("@better-auth/utils/otp");
    const ok = await createOTP(segredos[0].segredo, { digits: 6, period: 30 }).verify(data.codigo, { window: 1 });
    if (!ok) throw new Error("Código do aplicativo incorreto.");
    const { auth } = await import("./server");
    const ctx = await auth.$context;
    const hash = await ctx.password.hash(data.senha);
    const contas = await ctx.internalAdapter.findAccounts(userId);
    const credencial = contas?.find((conta) => conta.providerId === "credential");
    if (credencial) await ctx.internalAdapter.updatePassword(userId, hash);
    else {
      await ctx.internalAdapter.createAccount({
        userId,
        providerId: "credential",
        accountId: userId,
        password: hash,
      });
    }
    await sql`delete from "session" where "userId" = ${userId}`;
    return { ok: true };
  });
