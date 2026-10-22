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
    autorId: typeof bruto.autorId === "string" && bruto.autorId.trim() ? bruto.autorId.trim().slice(0, 80) : null,
    autorNome: typeof bruto.autorNome === "string" ? bruto.autorNome.trim().slice(0, 80) : "",
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
        autorNome: typeof nota.autorNome === "string" ? nota.autorNome.trim().slice(0, 80) : "",
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
  autor_id: string | null;
  autor_nome: string;
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
    autorId: linha.autor_id,
    autorNome: linha.autor_nome ?? "",
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
        select p.id, p.numero, p.parte, p.assunto, p.tipo, p.data_lancamento, p.prazo,
               p.alerta_dias, p.status, p.historico, p.team_id,
               coalesce(nullif(p.autor_id, ''), p.user_id) as autor_id,
               coalesce(nullif(p.autor_nome, ''), u.name, '') as autor_nome
        from processos p
        left join "user" u on u.id = p.user_id
        where p.user_id = ${context.userId} and p.team_id is null
        order by p.prazo asc
      `;
      return linhas.map(linhaParaProcesso);
    }
    const membro = await sql<{ ok: number }>`
      select 1 as ok from equipe_membros where equipe_id = ${equipeId} and user_id = ${context.userId}
    `;
    if (!membro.length) throw new Error("Você não faz parte desta equipe.");
    const linhas = await sql<Linha>`
      select p.id, p.numero, p.parte, p.assunto, p.tipo, p.data_lancamento, p.prazo,
             p.alerta_dias, p.status, p.historico, p.team_id,
             coalesce(nullif(p.autor_id, ''), p.user_id) as autor_id,
             coalesce(nullif(p.autor_nome, ''), u.name, '') as autor_nome
      from processos p
      left join "user" u on u.id = p.user_id
      where p.team_id = ${equipeId}
      order by p.prazo asc
    `;
    return linhas.map(linhaParaProcesso);
  });

export const salvarProcesso = createServerFn({ method: "POST" })
  .validator(exigirProcesso)
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const eu = await sql<{ name: string | null }>`select name from "user" where id = ${context.userId}`;
    const autorNome = (eu[0]?.name || "Sem nome").trim().slice(0, 80) || "Sem nome";
    if (data.equipeId) {
      const membro = await sql<{ ok: number }>`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `;
      if (!membro.length) throw new Error("Você não faz parte desta equipe.");
    }
    const existente = await sql<{ historico: string; user_id: string; team_id: string | null }>`
      select historico, user_id, team_id from processos where id = ${data.id}
    `;
    let anterior: Andamento[] = [];
    if (existente.length) {
      try {
        anterior = historicoOk(JSON.parse(existente[0].historico || "[]"));
      } catch {
        anterior = [];
      }
    }
    const conhecidos = new Map(anterior.map((item) => [item.id, item.autorNome]));
    let historico = data.historico.map((item) => ({
      ...item,
      autorNome: conhecidos.get(item.id) || autorNome,
    }));
    if (!existente.length && historico.length === 0) {
      historico = [
        { id: crypto.randomUUID(), em: new Date().toISOString(), texto: "Lançou o processo.", autorNome },
      ];
    }
    if (existente.length) {
      const row = existente[0];
      const permitido = row.team_id
        ? row.team_id === data.equipeId
        : !data.equipeId && row.user_id === context.userId;
      if (!permitido) throw new Error("Não foi possível salvar");
    }
    const historicoJson = JSON.stringify(historico);
    const salvos = existente.length
      ? await sql<{ id: string }>`
          update processos set
            numero = ${data.numero},
            parte = ${data.parte},
            assunto = ${data.assunto},
            tipo = ${data.tipo},
            data_lancamento = ${data.dataLancamento},
            prazo = ${data.prazo},
            alerta_dias = ${data.alertaDias},
            status = ${data.status},
            historico = ${historicoJson}
          where id = ${data.id}
            and (
              (${data.equipeId}::text is not null and team_id = ${data.equipeId})
              or (${data.equipeId}::text is null and team_id is null and user_id = ${context.userId})
            )
          returning id
        `
      : await sql<{ id: string }>`
          insert into processos (
            id, user_id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id, autor_id, autor_nome
          ) values (
            ${data.id}, ${context.userId}, ${data.numero}, ${data.parte}, ${data.assunto}, ${data.tipo},
            ${data.dataLancamento}, ${data.prazo}, ${data.alertaDias}, ${data.status}, ${historicoJson},
            ${data.equipeId}, ${context.userId}, ${autorNome}
          )
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
