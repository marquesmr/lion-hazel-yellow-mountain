import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-DIgiGYu6.mjs";
import { t as authMiddleware } from "./middleware-DRaEGDvO.mjs";
import { t as MODALIDADES } from "./admin-IuBP2pNS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-jQi5F9ne.js
function dataOk(value) {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function dataOpcional(value) {
	if (value == null || value === "") return null;
	if (!dataOk(value)) throw new Error("Data inválida");
	return value;
}
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
			autorNome: typeof nota.autorNome === "string" ? nota.autorNome.trim().slice(0, 80) : ""
		}];
	});
}
function centavosOk(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	if (!Number.isInteger(n) || n < 0 || n > 1e11) throw new Error("Valor inválido");
	return n;
}
function exigirAdmin(input) {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	const id = typeof bruto.id === "string" ? bruto.id.trim() : "";
	const numero = typeof bruto.numero === "string" ? bruto.numero.trim() : "";
	const objeto = typeof bruto.objeto === "string" ? bruto.objeto.trim() : "";
	const referencia = typeof bruto.referencia === "string" ? bruto.referencia.trim() : "";
	if (!id || !numero || !objeto) throw new Error("Informe número e objeto.");
	if (!MODALIDADES.includes(String(bruto.tipo))) throw new Error("Tipo inválido");
	if (bruto.status !== "aberto" && bruto.status !== "execucao" && bruto.status !== "concluido") throw new Error("Status inválido");
	if (!dataOk(bruto.dataInicio) || !dataOk(bruto.encerramento)) throw new Error("Data inválida");
	const alerta = Number(bruto.alertaDias);
	if (!Number.isInteger(alerta) || alerta < 0 || alerta > 365) throw new Error("Antecedência inválida");
	const possuiContrato = bruto.possuiContrato === true;
	const vigenciaInicio = dataOpcional(bruto.vigenciaInicio);
	const vigenciaFim = dataOpcional(bruto.vigenciaFim);
	const contratado = typeof bruto.contratado === "string" ? bruto.contratado.trim() : "";
	const documento = typeof bruto.documento === "string" ? bruto.documento.trim() : "";
	const valorTotalCentavos = centavosOk(bruto.valorTotalCentavos);
	const valorMensalCentavos = centavosOk(bruto.valorMensalCentavos);
	if (possuiContrato) {
		if (!contratado) throw new Error("Informe os dados do contratado.");
		if (!vigenciaInicio || !vigenciaFim) throw new Error("Informe a vigência do contrato.");
		if (vigenciaFim < vigenciaInicio) throw new Error("A vigência termina antes de começar.");
	}
	const equipeId = typeof bruto.equipeId === "string" && bruto.equipeId.trim() ? bruto.equipeId.trim().slice(0, 80) : null;
	return {
		id: id.slice(0, 80),
		numero: numero.slice(0, 80),
		referencia: referencia.slice(0, 120),
		objeto: objeto.slice(0, 400),
		tipo: bruto.tipo,
		dataInicio: bruto.dataInicio,
		encerramento: bruto.encerramento,
		alertaDias: alerta,
		possuiContrato,
		vigenciaInicio: possuiContrato ? vigenciaInicio : null,
		vigenciaFim: possuiContrato ? vigenciaFim : null,
		contratado: possuiContrato ? contratado.slice(0, 160) : "",
		documento: possuiContrato ? documento.slice(0, 24) : "",
		valorTotalCentavos: possuiContrato ? valorTotalCentavos : null,
		valorMensalCentavos: possuiContrato ? valorMensalCentavos : null,
		status: bruto.status,
		historico: historicoOk(bruto.historico),
		equipeId,
		autorId: typeof bruto.autorId === "string" && bruto.autorId.trim() ? bruto.autorId.trim().slice(0, 80) : null,
		autorNome: typeof bruto.autorNome === "string" ? bruto.autorNome.trim().slice(0, 80) : ""
	};
}
function dia(value) {
	if (!value) return null;
	return String(value).slice(0, 10);
}
function bool(value) {
	return value === true || value === 1 || value === "t" || value === "true";
}
function linhaParaAdmin(linha) {
	let historico = [];
	try {
		historico = historicoOk(JSON.parse(linha.historico));
	} catch {
		historico = [];
	}
	const tipo = MODALIDADES.includes(linha.tipo) ? linha.tipo : "Pregão";
	const status = linha.status === "execucao" || linha.status === "concluido" ? linha.status : "aberto";
	const possui = bool(linha.possui_contrato);
	return {
		id: linha.id,
		numero: linha.numero,
		referencia: linha.referencia ?? "",
		objeto: linha.objeto,
		tipo,
		dataInicio: String(linha.data_inicio).slice(0, 10),
		encerramento: String(linha.encerramento).slice(0, 10),
		alertaDias: Number(linha.alerta_dias),
		possuiContrato: possui,
		vigenciaInicio: possui ? dia(linha.vigencia_inicio) : null,
		vigenciaFim: possui ? dia(linha.vigencia_fim) : null,
		contratado: possui ? linha.contratado ?? "" : "",
		documento: possui ? linha.documento ?? "" : "",
		valorTotalCentavos: possui && linha.valor_total_centavos != null ? Number(linha.valor_total_centavos) : null,
		valorMensalCentavos: possui && linha.valor_mensal_centavos != null ? Number(linha.valor_mensal_centavos) : null,
		status,
		historico,
		equipeId: linha.team_id,
		autorId: linha.autor_id,
		autorNome: linha.autor_nome ?? ""
	};
}
var SELECT_ADMIN = `
  p.id, p.numero, p.referencia, p.objeto, p.tipo, p.data_inicio, p.encerramento,
  p.alerta_dias, p.possui_contrato, p.vigencia_inicio, p.vigencia_fim, p.contratado,
  p.documento, p.valor_total_centavos, p.valor_mensal_centavos, p.status, p.historico, p.team_id,
  coalesce(nullif(p.autor_id, ''), p.user_id) as autor_id,
  coalesce(nullif(p.autor_nome, ''), u.name, '') as autor_nome
`;
var listarAdmin_createServerFn_handler = createServerRpc({
	id: "9c3cd48009e26a3d89b603f4512f6197b0b87556253eeed07b03cecbe4cda6a7",
	name: "listarAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listarAdmin.__executeServer(opts));
var listarAdmin = createServerFn({ method: "GET" }).validator((equipeId) => {
	if (equipeId == null || equipeId === "") return null;
	if (typeof equipeId !== "string" || !equipeId.trim()) throw new Error("Dados inválidos");
	return equipeId.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(listarAdmin_createServerFn_handler, async ({ context, data: equipeId }) => {
	const sql = await getSql();
	if (!equipeId) return (await sql.query(`select ${SELECT_ADMIN}
         from processos_admin p
         left join "user" u on u.id = p.user_id
         where p.user_id = $1 and p.team_id is null
         order by p.encerramento asc`, [context.userId])).map(linhaParaAdmin);
	if (!(await sql`
      select 1 as ok from equipe_membros where equipe_id = ${equipeId} and user_id = ${context.userId}
    `).length) throw new Error("Você não faz parte desta equipe.");
	return (await sql.query(`select ${SELECT_ADMIN}
       from processos_admin p
       left join "user" u on u.id = p.user_id
       where p.team_id = $1
       order by p.encerramento asc`, [equipeId])).map(linhaParaAdmin);
});
var salvarAdmin_createServerFn_handler = createServerRpc({
	id: "db083dc179b05d89d9de0b0d0f51291084e663740b86483240dbd3a75b90d223",
	name: "salvarAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => salvarAdmin.__executeServer(opts));
var salvarAdmin = createServerFn({ method: "POST" }).validator(exigirAdmin).middleware([authMiddleware]).handler(salvarAdmin_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const autorNome = ((await sql`select name from "user" where id = ${context.userId}`)[0]?.name || "Sem nome").trim().slice(0, 80) || "Sem nome";
	if (data.equipeId) {
		if (!(await sql`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `).length) throw new Error("Você não faz parte desta equipe.");
	}
	const existente = await sql`
      select historico, user_id, team_id from processos_admin where id = ${data.id}
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
		texto: "Lançou o processo administrativo.",
		autorNome
	}];
	if (existente.length) {
		const row = existente[0];
		if (!(row.team_id ? row.team_id === data.equipeId : !data.equipeId && row.user_id === context.userId)) throw new Error("Não foi possível salvar");
	}
	const historicoJson = JSON.stringify(historico);
	const salvos = existente.length ? await sql`
          update processos_admin set
            numero = ${data.numero},
            referencia = ${data.referencia},
            objeto = ${data.objeto},
            tipo = ${data.tipo},
            data_inicio = ${data.dataInicio},
            encerramento = ${data.encerramento},
            alerta_dias = ${data.alertaDias},
            possui_contrato = ${data.possuiContrato},
            vigencia_inicio = ${data.vigenciaInicio},
            vigencia_fim = ${data.vigenciaFim},
            contratado = ${data.contratado},
            documento = ${data.documento},
            valor_total_centavos = ${data.valorTotalCentavos},
            valor_mensal_centavos = ${data.valorMensalCentavos},
            status = ${data.status},
            historico = ${historicoJson}
          where id = ${data.id}
            and (
              (${data.equipeId}::text is not null and team_id = ${data.equipeId})
              or (${data.equipeId}::text is null and team_id is null and user_id = ${context.userId})
            )
          returning id
        ` : await sql`
          insert into processos_admin (
            id, user_id, team_id, numero, referencia, objeto, tipo, data_inicio, encerramento,
            alerta_dias, possui_contrato, vigencia_inicio, vigencia_fim, contratado, documento,
            valor_total_centavos, valor_mensal_centavos, status, historico, autor_id, autor_nome
          ) values (
            ${data.id}, ${context.userId}, ${data.equipeId}, ${data.numero}, ${data.referencia},
            ${data.objeto}, ${data.tipo}, ${data.dataInicio}, ${data.encerramento}, ${data.alertaDias},
            ${data.possuiContrato}, ${data.vigenciaInicio}, ${data.vigenciaFim}, ${data.contratado},
            ${data.documento}, ${data.valorTotalCentavos}, ${data.valorMensalCentavos}, ${data.status},
            ${historicoJson}, ${context.userId}, ${autorNome}
          )
          returning id
        `;
	if (!salvos.length) throw new Error("Não foi possível salvar");
	return { id: salvos[0].id };
});
var apagarAdmin_createServerFn_handler = createServerRpc({
	id: "ba0c35872738aec5f444f599f8200030875f38ec589f4fbd155335e689bc9aaf",
	name: "apagarAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => apagarAdmin.__executeServer(opts));
var apagarAdmin = createServerFn({ method: "POST" }).validator((id) => {
	if (typeof id !== "string" || !id.trim()) throw new Error("Dados inválidos");
	return id.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(apagarAdmin_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      delete from processos_admin
      where id = ${id}
        and (
          (team_id is null and user_id = ${context.userId})
          or team_id in (select equipe_id from equipe_membros where user_id = ${context.userId})
        )
    `;
	return { id };
});
//#endregion
export { apagarAdmin_createServerFn_handler, listarAdmin_createServerFn_handler, salvarAdmin_createServerFn_handler };
