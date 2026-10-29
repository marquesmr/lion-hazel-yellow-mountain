import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-f_0AD5V1.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
import { n as TIPOS_LEI, t as TIPOS } from "./prazos-DFCxt5b1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/processos.functions-CgQp1lRt.js
function exigirProcesso(input) {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	const numero = typeof bruto.numero === "string" ? bruto.numero.trim() : "";
	const parte = typeof bruto.parte === "string" ? bruto.parte.trim() : "";
	const assunto = typeof bruto.assunto === "string" ? bruto.assunto.trim() : "";
	const id = typeof bruto.id === "string" ? bruto.id.trim() : "";
	if (!id || !numero || !parte || !assunto) throw new Error("Dados inválidos");
	if (!TIPOS.includes(String(bruto.tipo))) throw new Error("Tipo inválido");
	if (bruto.status !== "andamento" && bruto.status !== "concluido") throw new Error("Status inválido");
	if (!dataOk(bruto.dataLancamento) || !dataOk(bruto.prazo)) throw new Error("Data inválida");
	const alerta = Number(bruto.alertaDias);
	if (!Number.isInteger(alerta) || alerta < 0 || alerta > 60) throw new Error("Antecedência inválida");
	const retorno = retornoOk(bruto.retorno);
	const vetoAlcance = alcanceOk(bruto.vetoAlcance);
	const leiTipo = leiTipoOk(bruto.leiTipo);
	const leiNumero = numeroOk(bruto.leiNumero);
	const leiAno = anoOk(bruto.leiAno);
	const apreciacaoPrazo = dataOpcional(bruto.apreciacaoPrazo);
	if (retorno === "veto") {
		if (!vetoAlcance) throw new Error("Informe se o veto é integral ou parcial.");
		if (leiNumero == null || leiAno == null) throw new Error("Informe o número e o ano do veto.");
		if (!apreciacaoPrazo) throw new Error("Informe o prazo de apreciação do veto.");
	}
	if (retorno === "sancionada") {
		if (!leiTipo) throw new Error("Informe o tipo de lei.");
		if (leiNumero == null || leiAno == null) throw new Error("Informe o número e o ano da lei.");
	}
	return {
		id: id.slice(0, 80),
		numero: numero.slice(0, 80),
		parte: parte.slice(0, 160),
		assunto: assunto.slice(0, 240),
		tipo: bruto.tipo,
		dataLancamento: bruto.dataLancamento,
		prazo: bruto.prazo,
		alertaDias: alerta,
		status: bruto.status,
		historico: historicoOk(bruto.historico),
		equipeId: equipeIdOk(bruto.equipeId),
		autorId: typeof bruto.autorId === "string" && bruto.autorId.trim() ? bruto.autorId.trim().slice(0, 80) : null,
		autorNome: typeof bruto.autorNome === "string" ? bruto.autorNome.trim().slice(0, 80) : "",
		retorno,
		vetoAlcance: retorno === "veto" ? vetoAlcance : null,
		leiTipo: retorno === "sancionada" ? leiTipo : null,
		leiNumero: retorno ? leiNumero : null,
		leiAno: retorno ? leiAno : null,
		apreciacaoPrazo: retorno === "veto" ? apreciacaoPrazo : null
	};
}
function equipeIdOk(value) {
	if (typeof value !== "string") return null;
	const id = value.trim();
	return id ? id.slice(0, 80) : null;
}
function dataOk(value) {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function dataOpcional(value) {
	if (value == null || value === "") return null;
	if (!dataOk(value)) throw new Error("Data inválida");
	return value;
}
function retornoOk(value) {
	if (value == null || value === "") return null;
	if (value === "veto" || value === "sancionada") return value;
	throw new Error("Retorno inválido");
}
function alcanceOk(value) {
	if (value == null || value === "") return null;
	if (value === "integral" || value === "parcial") return value;
	return null;
}
function leiTipoOk(value) {
	if (typeof value !== "string" || !value.trim()) return null;
	return TIPOS_LEI.includes(value) ? value : null;
}
function numeroOk(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	if (!Number.isInteger(n) || n < 1 || n > 999999) throw new Error("Número inválido");
	return n;
}
function anoOk(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	if (!Number.isInteger(n) || n < 2e3 || n > 2100) throw new Error("Ano inválido");
	return n;
}
var schemaPronto = null;
async function garantirColunas(sql) {
	if (!schemaPronto) schemaPronto = (async () => {
		for (const comando of [
			"alter table processos add column if not exists retorno text",
			"alter table processos add column if not exists veto_alcance text",
			"alter table processos add column if not exists lei_tipo text",
			"alter table processos add column if not exists lei_numero integer",
			"alter table processos add column if not exists lei_ano integer",
			"alter table processos add column if not exists apreciacao_prazo date"
		]) await sql.query(comando);
	})().catch((err) => {
		schemaPronto = null;
		throw err;
	});
	await schemaPronto;
}
var SELECT_PROC = `
  p.id, p.numero, p.parte, p.assunto, p.tipo, p.data_lancamento, p.prazo,
  p.alerta_dias, p.status, p.historico, p.team_id, p.retorno, p.veto_alcance,
  p.lei_tipo, p.lei_numero, p.lei_ano, p.apreciacao_prazo,
  coalesce(nullif(p.autor_id, ''), p.user_id) as autor_id,
  coalesce(nullif(p.autor_nome, ''), u.name, '') as autor_nome
`;
function historicoOk(value) {
	if (!Array.isArray(value)) return [];
	return value.slice(0, 200).flatMap((item) => {
		if (!item || typeof item !== "object") return [];
		const nota = item;
		if (typeof nota.id !== "string" || typeof nota.texto !== "string") return [];
		const texto = nota.texto.trim();
		if (!texto) return [];
		return [{
			id: nota.id.slice(0, 80),
			em: typeof nota.em === "string" ? nota.em.slice(0, 40) : (/* @__PURE__ */ new Date()).toISOString(),
			texto: texto.slice(0, 2e3),
			autorNome: typeof nota.autorNome === "string" ? nota.autorNome.trim().slice(0, 80) : "",
			...typeof nota.link === "string" && /^https?:\/\//i.test(nota.link.trim()) ? { link: nota.link.trim().slice(0, 500) } : {}
		}];
	});
}
function linhaParaProcesso(linha) {
	let historico = [];
	try {
		historico = historicoOk(JSON.parse(linha.historico));
	} catch {
		historico = [];
	}
	const tipo = TIPOS.includes(linha.tipo) ? linha.tipo : "Outros";
	const status = linha.status === "concluido" ? "concluido" : "andamento";
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
		retorno: linha.retorno === "veto" || linha.retorno === "sancionada" ? linha.retorno : null,
		vetoAlcance: linha.veto_alcance === "integral" || linha.veto_alcance === "parcial" ? linha.veto_alcance : null,
		leiTipo: leiTipoOk(linha.lei_tipo),
		leiNumero: linha.lei_numero,
		leiAno: linha.lei_ano,
		apreciacaoPrazo: linha.apreciacao_prazo ? String(linha.apreciacao_prazo).slice(0, 10) : null
	};
}
var listarProcessos_createServerFn_handler = createServerRpc({
	id: "92ad57039e395614bdf510b5ecf891bacc79d73b74d206cb1af4325aa6d9814b",
	name: "listarProcessos",
	filename: "src/lib/processos.functions.ts"
}, (opts) => listarProcessos.__executeServer(opts));
var listarProcessos = createServerFn({ method: "GET" }).validator((equipeId) => {
	if (equipeId == null || equipeId === "") return null;
	if (typeof equipeId !== "string" || !equipeId.trim()) throw new Error("Dados inválidos");
	return equipeId.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(listarProcessos_createServerFn_handler, async ({ context, data: equipeId }) => {
	const sql = await getSql();
	await garantirColunas(sql);
	if (!equipeId) return (await sql.query(`select ${SELECT_PROC}
         from processos p
         left join "user" u on u.id = p.user_id
         where p.user_id = $1 and p.team_id is null
         order by p.prazo asc`, [context.userId])).map(linhaParaProcesso);
	if (!(await sql`
      select 1 as ok from equipe_membros where equipe_id = ${equipeId} and user_id = ${context.userId}
    `).length) throw new Error("Você não faz parte desta equipe.");
	return (await sql.query(`select ${SELECT_PROC}
       from processos p
       left join "user" u on u.id = p.user_id
       where p.team_id = $1
       order by p.prazo asc`, [equipeId])).map(linhaParaProcesso);
});
var salvarProcesso_createServerFn_handler = createServerRpc({
	id: "e4a33f55c323e5c3b5cbf4bc1c1a04536f5065d08e3f032e07bac301a3b0d591",
	name: "salvarProcesso",
	filename: "src/lib/processos.functions.ts"
}, (opts) => salvarProcesso.__executeServer(opts));
var salvarProcesso = createServerFn({ method: "POST" }).validator(exigirProcesso).middleware([authMiddleware]).handler(salvarProcesso_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await garantirColunas(sql);
	const autorNome = ((await sql`select name from "user" where id = ${context.userId}`)[0]?.name || "Sem nome").trim().slice(0, 80) || "Sem nome";
	if (data.equipeId) {
		if (!(await sql`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `).length) throw new Error("Você não faz parte desta equipe.");
	}
	const existente = await sql`
      select historico, user_id, team_id from processos where id = ${data.id}
    `;
	let anterior = [];
	if (existente.length) try {
		anterior = historicoOk(JSON.parse(existente[0].historico || "[]"));
	} catch {
		anterior = [];
	}
	const conhecidos = new Map(anterior.map((item) => [item.id, item.autorNome]));
	let historico = data.historico.map((item) => ({
		...item,
		autorNome: conhecidos.get(item.id) || autorNome
	}));
	if (!existente.length && historico.length === 0) historico = [{
		id: crypto.randomUUID(),
		em: (/* @__PURE__ */ new Date()).toISOString(),
		texto: "Lançou o processo.",
		autorNome
	}];
	if (existente.length) {
		const row = existente[0];
		if (!(row.team_id ? row.team_id === data.equipeId : !data.equipeId && row.user_id === context.userId)) throw new Error("Não foi possível salvar");
	}
	const historicoJson = JSON.stringify(historico);
	const salvos = existente.length ? await sql`
          update processos set
            numero = ${data.numero},
            parte = ${data.parte},
            assunto = ${data.assunto},
            tipo = ${data.tipo},
            data_lancamento = ${data.dataLancamento},
            prazo = ${data.prazo},
            alerta_dias = ${data.alertaDias},
            status = ${data.status},
            historico = ${historicoJson},
            retorno = ${data.retorno},
            veto_alcance = ${data.vetoAlcance},
            lei_tipo = ${data.leiTipo},
            lei_numero = ${data.leiNumero},
            lei_ano = ${data.leiAno},
            apreciacao_prazo = ${data.apreciacaoPrazo}
          where id = ${data.id}
            and (
              (${data.equipeId}::text is not null and team_id = ${data.equipeId})
              or (${data.equipeId}::text is null and team_id is null and user_id = ${context.userId})
            )
          returning id
        ` : await sql`
          insert into processos (
            id, user_id, numero, parte, assunto, tipo, data_lancamento, prazo, alerta_dias, status, historico, team_id, autor_id, autor_nome,
            retorno, veto_alcance, lei_tipo, lei_numero, lei_ano, apreciacao_prazo
          ) values (
            ${data.id}, ${context.userId}, ${data.numero}, ${data.parte}, ${data.assunto}, ${data.tipo},
            ${data.dataLancamento}, ${data.prazo}, ${data.alertaDias}, ${data.status}, ${historicoJson},
            ${data.equipeId}, ${context.userId}, ${autorNome},
            ${data.retorno}, ${data.vetoAlcance}, ${data.leiTipo}, ${data.leiNumero}, ${data.leiAno}, ${data.apreciacaoPrazo}
          )
          returning id
        `;
	if (!salvos.length) throw new Error("Não foi possível salvar");
	return { id: salvos[0].id };
});
var apagarProcesso_createServerFn_handler = createServerRpc({
	id: "15545f4cb2624558bb806ffea6883a6b542d2a70601624bb6c153a0eb923e13a",
	name: "apagarProcesso",
	filename: "src/lib/processos.functions.ts"
}, (opts) => apagarProcesso.__executeServer(opts));
var apagarProcesso = createServerFn({ method: "POST" }).validator((id) => {
	if (typeof id !== "string" || !id.trim()) throw new Error("Dados inválidos");
	return id.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(apagarProcesso_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      delete from processos
      where id = ${id}
        and (
          (team_id is null and user_id = ${context.userId})
          or team_id in (select equipe_id from equipe_membros where user_id = ${context.userId})
        )
    `;
	return { id };
});
var moverProcesso_createServerFn_handler = createServerRpc({
	id: "b27888c47cc6d2221e7b28a9e2ef72c9418bff9bb769d7b355e6d95e5b9fb745",
	name: "moverProcesso",
	filename: "src/lib/processos.functions.ts"
}, (opts) => moverProcesso.__executeServer(opts));
var moverProcesso = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	const id = typeof bruto.id === "string" ? bruto.id.trim() : "";
	if (!id) throw new Error("Dados inválidos");
	const equipeId = bruto.equipeId == null || bruto.equipeId === "" ? null : typeof bruto.equipeId === "string" && bruto.equipeId.trim() ? bruto.equipeId.trim().slice(0, 80) : null;
	if (bruto.equipeId && !equipeId) throw new Error("Dados inválidos");
	return {
		id: id.slice(0, 80),
		equipeId
	};
}).middleware([authMiddleware]).handler(moverProcesso_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (data.equipeId) {
		if (!(await sql`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `).length) throw new Error("Você não faz parte desta equipe.");
	}
	const existente = await sql`
      select historico, user_id, team_id from processos where id = ${data.id}
    `;
	if (!existente.length) throw new Error("Não foi possível mover");
	const row = existente[0];
	if (row.team_id) {
		if (!(await sql`
        select 1 as ok from equipe_membros where equipe_id = ${row.team_id} and user_id = ${context.userId}
      `).length) throw new Error("Não foi possível mover");
	} else if (row.user_id !== context.userId) throw new Error("Não foi possível mover");
	if ((row.team_id ?? null) === data.equipeId) return { id: data.id };
	const autorNome = ((await sql`select name from "user" where id = ${context.userId}`)[0]?.name || "Sem nome").trim().slice(0, 80) || "Sem nome";
	let historico = [];
	try {
		const lido = JSON.parse(row.historico || "[]");
		historico = Array.isArray(lido) ? lido : [];
	} catch {
		historico = [];
	}
	let texto = "Moveu o processo para os seus.";
	if (data.equipeId) texto = `Moveu o processo para a equipe ${(await sql`select nome from equipes where id = ${data.equipeId}`)[0]?.nome?.trim() || "equipe"}.`;
	historico.push({
		id: crypto.randomUUID(),
		em: (/* @__PURE__ */ new Date()).toISOString(),
		texto,
		autorNome
	});
	const dono = data.equipeId ? row.user_id : context.userId;
	const salvos = await sql`
      update processos
      set team_id = ${data.equipeId}, user_id = ${dono}, historico = ${JSON.stringify(historico)}
      where id = ${data.id}
      returning id
    `;
	if (!salvos.length) throw new Error("Não foi possível mover");
	return { id: salvos[0].id };
});
//#endregion
export { apagarProcesso_createServerFn_handler, listarProcessos_createServerFn_handler, moverProcesso_createServerFn_handler, salvarProcesso_createServerFn_handler };
