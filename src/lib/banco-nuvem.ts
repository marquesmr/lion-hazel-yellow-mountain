import { get, put } from "@vercel/blob";

/**
 * Cópia durável do PGLite. Sem DATABASE_URL cada função da Vercel nascia com o
 * banco vazio, então o backup restaurado (e o login) desaparecia no pedido seguinte.
 * Produção, prévia e o computador local usam pastas diferentes para não se apagarem.
 */
const PASTA =
  process.env.VERCEL_ENV === "production"
    ? "prod"
    : process.env.VERCEL_ENV === "preview"
      ? "preview"
      : "local";
const CAMINHO = `auxilia-legis/${PASTA}/banco.tgz`;

function token() {
  const valor = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return valor || undefined;
}

export function nuvemConfigurada() {
  return Boolean(token());
}

function nomeDoErro(err: unknown) {
  return err && typeof err === "object" && "name" in err ? String(err.name) : "";
}

function statusDoErro(err: unknown) {
  return err && typeof err === "object" && "status" in err ? Number(err.status) : 0;
}

function naoAchei(err: unknown) {
  return nomeDoErro(err) === "BlobNotFoundError" || statusDoErro(err) === 404;
}

export function conflitoDeGravacao(err: unknown) {
  return nomeDoErro(err) === "BlobPreconditionFailedError" || statusDoErro(err) === 412;
}

export type CopiaNuvem =
  | { tipo: "ausente" }
  | { tipo: "igual" }
  | { tipo: "nova"; etag: string; blob: Blob };

export async function buscarCopia(etag: string | null): Promise<CopiaNuvem> {
  const chave = token();
  if (!chave) return { tipo: "ausente" };
  try {
    const resposta = await get(CAMINHO, {
      access: "private",
      token: chave,
      useCache: false,
      ...(etag ? { ifNoneMatch: etag } : {}),
    });
    if (!resposta) return { tipo: "ausente" };
    if (resposta.statusCode === 304) return { tipo: "igual" };
    const bytes = new Uint8Array(await new Response(resposta.stream).arrayBuffer());
    if (!bytes.byteLength) return { tipo: "ausente" };
    return { tipo: "nova", etag: resposta.blob.etag, blob: new Blob([bytes]) };
  } catch (err) {
    if (naoAchei(err)) return { tipo: "ausente" };
    throw err;
  }
}

export async function gravarCopia(arquivo: Blob, etag: string | null): Promise<string> {
  const chave = token();
  if (!chave) throw new Error("Armazenamento não configurado.");
  const salvo = await put(CAMINHO, arquivo, {
    access: "private",
    token: chave,
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/gzip",
    cacheControlMaxAge: 60,
    ...(etag ? { ifMatch: etag } : {}),
  });
  return salvo.etag;
}
