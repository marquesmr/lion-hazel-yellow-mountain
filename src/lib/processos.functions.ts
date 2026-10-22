import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { TIPOS, type Andamento, type Processo, type StatusProcesso, type TipoProcesso } from "@/lib/prazos";

function exigirProcesso(input: unknown): Processo {
  if (!input || typeof input !== "object") throw new Error("Dados inválidos");
  const bruto = input as Partial<Processo>;
  const numero = typeof bruto.numero === "string" ? bruto.numero.trim() : "";
  const parte = typeof bruto.parte === "string" ? bruto.parte.trim() : "";
  const assunto = typeof bruto.assunto === "string" ? bruto.assunto.trim() : "";
  const id = typeof bruto.id === "string" ? bruto.id.trim() : "";
  if (!id || !numero || !parte || !assunto) throw new Error("Dados inválidos");
  if (!(TIPOS as readonly string[]).includes(String(bruto.tipo))) throw new Error("Tipo inválido");
  if (bruto.status !== "andamento" && bruto.status !== "concluido") throw new Error("Status inválido");
  if (!dataOk(bruto.dataLancamento) || !dataOk(bruto.prazo)) throw new Error("Data inválida");
  const alerta = Number(bruto.alertaDias);
  if (!Number.isInteger(alerta) || alerta < 0 || alerta > 60) throw new Error("Antecedência inválida");
  return {
    id: id.slice(0, 80),
    numero: numero.slice(0, 80),
    parte: parte.slice(0, 160),
    assunto: assunto.slice(0, 240),
    tipo: bruto.tipo as TipoProcesso,
    dataLancamento: bruto.dataLancamento as string,
    prazo: bruto.prazo as string,
    alertaDias: alerta,
    status: bruto.status,
    historico: historicoOk(bruto.historico),
    equipeId: equipeIdOk(bruto.equipeId),
  };
}

function equipeIdOk(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const id = value.trim();
  return id ? id.slice(0, 80) : null;
}

function dataOk(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function historicoOk(value: unknown): Andamento[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 200).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const nota = item as Partial<Andamento>;
    if (typeof nota.id !== "string" || typeof nota.texto !== "string") return [];
    const texto = nota.texto.trim();
    if (!texto) return [];
    return [
      {
        id: nota.id.slice(0, 80),
        em: typeof nota.em === "string" ? nota.em.slice(0, 40) : new Date().toISOString(),
        texto: texto.slice(0, 2000),
      },
    ];
  });
}

type Linha = {
  id: string;
  numero: string;
  parte: string;
  assunto: string;
  tipo: string;
  data_lancamento: string;
  prazo: string;
  alerta_dias: number;
  status: string;
  historico: string;
  team_id: string | null;
};

function linhaParaProcesso(linha: Linha): Processo {
  let historico: Andamento[] = [];
  try {
    historico = historicoOk(JSON.parse(linha.historico));
  } catch {
    historico = [];
  }
  const tipo = (TIPOS as readonly string[]).includes(linha.tipo) ? (linha.tipo as TipoProcesso) : "Outros";
  const status: StatusProcesso = linha.status === "concluido" ? "concluido" : "andamento";
  return {
    id: linha.id,
    numero: linha.numero,
    parte: linha.parte,
    assunto: linha.assunto,
    tipo,
    dataLancamento: String(linha.data_lancamento).slice(0, 10),
    prazo: String(linha.prazo).slice(0, 10),
    alertaDias: Number(linha.alerta_dias),
    status,
    historico,
    equipeId: linha.team_id,
  };
}

export const listarProcessos = createServerFn({ method: "GET" })
  .validator((equipeId: unknown) => {
    if (equipeId == null || equipeId === "") return null;
    if (typeof equipeId !== "string" || !equipeId.trim()) throw new Error("Dados inválidos");
    return equipeId.trim().slice(0, 80);
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data: equipeId }) => {
    const sql = await getSql();
    if (!equipeId) {
      const linhas = await sql<Linha>`
        select id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id
        from processos
        where user_id = ${context.userId} and team_id is null
        order by prazo asc
      `;
      return linhas.map(linhaParaProcesso);
    }
    const membro = await sql<{ ok: number }>`
      select 1 as ok from equipe_membros where equipe_id = ${equipeId} and user_id = ${context.userId}
    `;
    if (!membro.length) throw new Error("Você não faz parte desta equipe.");
    const linhas = await sql<Linha>`
      select id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id
      from processos
      where team_id = ${equipeId}
      order by prazo asc
    `;
    return linhas.map(linhaParaProcesso);
  });

export const salvarProcesso = createServerFn({ method: "POST" })
  .validator(exigirProcesso)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const historico = JSON.stringify(data.historico);
    if (data.equipeId) {
      const membro = await sql<{ ok: number }>`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `;
      if (!membro.length) throw new Error("Você não faz parte desta equipe.");
    }
    const salvos = data.equipeId
      ? await sql<{ id: string }>`
          insert into processos (
            id, user_id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id
          ) values (
            ${data.id}, ${context.userId}, ${data.numero}, ${data.parte}, ${data.assunto}, ${data.tipo},
            ${data.dataLancamento}, ${data.prazo}, ${data.alertaDias}, ${data.status}, ${historico}, ${data.equipeId}
          )
          on conflict (id) do update set
            numero = excluded.numero,
            parte = excluded.parte,
            assunto = excluded.assunto,
            tipo = excluded.tipo,
            data_lancamento = excluded.data_lancamento,
            prazo = excluded.prazo,
            alerta_dias = excluded.alerta_dias,
            status = excluded.status,
            historico = excluded.historico
          where processos.team_id = ${data.equipeId}
            and exists (
              select 1 from equipe_membros em
              where em.equipe_id = processos.team_id and em.user_id = ${context.userId}
            )
          returning id
        `
      : await sql<{ id: string }>`
          insert into processos (
            id, user_id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id
          ) values (
            ${data.id}, ${context.userId}, ${data.numero}, ${data.parte}, ${data.assunto}, ${data.tipo},
            ${data.dataLancamento}, ${data.prazo}, ${data.alertaDias}, ${data.status}, ${historico}, null
          )
          on conflict (id) do update set
            numero = excluded.numero,
            parte = excluded.parte,
            assunto = excluded.assunto,
            tipo = excluded.tipo,
            data_lancamento = excluded.data_lancamento,
            prazo = excluded.prazo,
            alerta_dias = excluded.alerta_dias,
            status = excluded.status,
            historico = excluded.historico
          where processos.team_id is null and processos.user_id = ${context.userId}
          returning id
        `;
    if (!salvos.length) throw new Error("Não foi possível salvar");
    return { id: salvos[0].id };
  });

export const apagarProcesso = createServerFn({ method: "POST" })
  .validator((id: unknown) => {
    if (typeof id !== "string" || !id.trim()) throw new Error("Dados inválidos");
    return id.trim().slice(0, 80);
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    await sql`
      delete from processos
      where id = ${id}
        and (
          (team_id is null and user_id = ${context.userId})
          or team_id in (select equipe_id from equipe_membros where user_id = ${context.userId})
        )
    `;
    return { id };
  });
