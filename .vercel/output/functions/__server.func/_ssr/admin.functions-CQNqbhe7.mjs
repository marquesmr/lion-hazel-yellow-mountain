import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-f_0AD5V1.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
import { y as todayIso } from "./prazos-DFCxt5b1.mjs";
import { S as pedePrevisao, _ as modoValor, b as normalizarStatus, l as exigeLinks, v as normalizarLink, y as normalizarModalidade } from "./admin-DR0CkllD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CQNqbhe7.js
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
			autorNome: typeof nota.autorNome === "string" ? nota.autorNome.trim().slice(0, 80) : "",
			...typeof nota.link === "string" && normalizarLink(nota.link) ? { link: normalizarLink(nota.link).slice(0, 500) } : {}
		}];
	});
}
function linkCampo(value, nome, obrigatorio) {
	const texto = typeof value === "string" ? value.trim() : "";
	if (!texto) {
		if (obrigatorio) throw new Error(`Informe o ${nome}.`);
		return "";
	}
	const url = normalizarLink(texto);
	if (!url) throw new Error(`O ${nome} está inválido.`);
	return url.slice(0, 500);
}
function centavosOk(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	if (!Number.isInteger(n) || n < 0 || n > 1e11) throw new Error("Valor inválido");
	return n;
}
function anoOpcional(value) {
	if (value == null || value === "") return null;
	const ano = Number(value);
	if (!Number.isInteger(ano) || ano < 2e3 || ano > 2100) throw new Error("Ano do processo inválido.");
	return ano;
}
function pecaOpcional(numero, ano, nome) {
	if ((numero == null || numero === "") && (ano == null || ano === "")) return {
		numero: null,
		ano: null
	};
	const n = Number(numero);
	const a = Number(ano);
	if (!Number.isInteger(n) || n < 1 || n > 999999) throw new Error(`Número da ${nome} inválido.`);
	if (!Number.isInteger(a) || a < 2e3 || a > 2100) throw new Error(`Ano da ${nome} inválido.`);
	return {
		numero: n,
		ano: a
	};
}
function exigirAdmin(input) {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	const id = typeof bruto.id === "string" ? bruto.id.trim() : "";
	const numero = typeof bruto.numero === "string" ? bruto.numero.trim() : "";
	const objeto = typeof bruto.objeto === "string" ? bruto.objeto.trim() : "";
	const referencia = typeof bruto.referencia === "string" ? bruto.referencia.trim() : "";
	if (!id) throw new Error("Dados inválidos");
	const numeroAno = anoOpcional(bruto.numeroAno);
	const tipo = normalizarModalidade(String(bruto.tipo));
	if (!tipo) throw new Error("Tipo inválido");
	const simples = tipo === "Outros" || tipo === "Doação";
	if (!numero) throw new Error("Informe o número do processo.");
	const tipoPeca = pecaOpcional(bruto.tipoNumero, bruto.tipoAno, "tipo");
	const status = normalizarStatus(String(bruto.status ?? ""));
	const hoje = todayIso();
	if (!simples && !dataOk(bruto.dataInicio)) throw new Error("Data inválida");
	const previsaoEtapa = dataOpcional(bruto.previsaoEtapa);
	const encerramentoInformado = dataOpcional(bruto.encerramento);
	const alerta = Number(bruto.alertaDias);
	if (!Number.isInteger(alerta) || alerta < 0 || alerta > 365) throw new Error("Antecedência inválida");
	const possuiContrato = status === "execucao";
	const vigenciaInicio = dataOpcional(bruto.vigenciaInicio);
	const vigenciaFim = dataOpcional(bruto.vigenciaFim);
	const contratado = typeof bruto.contratado === "string" ? bruto.contratado.trim() : "";
	const documento = typeof bruto.documento === "string" ? bruto.documento.trim() : "";
	const valorTotalCentavos = centavosOk(bruto.valorTotalCentavos);
	const valorMensalCentavos = centavosOk(bruto.valorMensalCentavos);
	const valorEstimadoCentavos = centavosOk(bruto.valorEstimadoCentavos);
	const ci = pecaOpcional(bruto.ciNumero, bruto.ciAno, "comunicação interna");
	const parecer = pecaOpcional(bruto.parecerNumero, bruto.parecerAno, "parecer");
	const ciOrigem = typeof bruto.ciOrigem === "string" ? bruto.ciOrigem.trim() : "";
	const linkAbertura = linkCampo(bruto.linkAbertura, "link de publicação", exigeLinks(tipo));
	const linkHomologacao = linkCampo(bruto.linkHomologacao, "link de homologação", false);
	const linkPncp = linkCampo(bruto.linkPncp, "link do PNCP", false);
	const linkRetificacao = bruto.linkRetificacao ? linkCampo(bruto.linkRetificacao, "link da retificação", true) : "";
	const linkCancelamento = linkCampo(bruto.linkCancelamento, "link de cancelamento", status === "cancelado");
	if (tipo !== "Outros" && tipoPeca.numero == null) throw new Error("Informe o número do tipo.");
	if (ci.numero == null) throw new Error("Informe o número da comunicação interna.");
	if (!ciOrigem) throw new Error("Informe de onde veio a comunicação interna.");
	if (simples) {
		if (!referencia) throw new Error("Informe a referência.");
		if (!objeto) throw new Error("Informe o objeto.");
	} else if (status !== "cancelado") {
		if (!objeto) throw new Error("Informe o objeto.");
		if (parecer.numero == null) throw new Error("Informe o número do parecer.");
	}
	if (!simples && pedePrevisao(status) && !previsaoEtapa) throw new Error("Informe a previsão de conclusão da etapa.");
	if (!simples && status === "encerrado" && !encerramentoInformado) throw new Error("Informe a data de encerramento.");
	const modo = modoValor(tipo, status);
	if (modo === "contrato") {
		if (!contratado) throw new Error("Informe os dados do contratado.");
		if (!vigenciaInicio || !vigenciaFim) throw new Error("Informe a vigência do contrato.");
		if (vigenciaFim < vigenciaInicio) throw new Error("A vigência termina antes de começar.");
		if (valorTotalCentavos == null) throw new Error("Informe o valor anual do contrato.");
		if (valorMensalCentavos == null) throw new Error("Informe o valor mensal do contrato.");
	} else if (modo === "total" && valorTotalCentavos == null) throw new Error("Informe o valor total.");
	const encerramento = simples ? hoje : status === "encerrado" && encerramentoInformado ? encerramentoInformado : status === "execucao" && vigenciaFim ? vigenciaFim : previsaoEtapa || bruto.dataInicio || hoje;
	const equipeId = typeof bruto.equipeId === "string" && bruto.equipeId.trim() ? bruto.equipeId.trim().slice(0, 80) : null;
	return {
		id: id.slice(0, 80),
		numero: numero.slice(0, 80),
		numeroAno,
		referencia: referencia.slice(0, 120),
		objeto: objeto.slice(0, 400),
		tipo,
		tipoNumero: tipo === "Outros" ? null : tipoPeca.numero,
		tipoAno: tipo === "Outros" ? null : tipoPeca.ano,
		dataInicio: simples ? hoje : bruto.dataInicio,
		previsaoEtapa: !simples && pedePrevisao(status) ? previsaoEtapa : null,
		encerramento,
		alertaDias: alerta,
		possuiContrato: !simples && possuiContrato,
		vigenciaInicio: !simples && possuiContrato ? vigenciaInicio : null,
		vigenciaFim: !simples && possuiContrato ? vigenciaFim : null,
		contratado: !simples && possuiContrato ? contratado.slice(0, 160) : "",
		documento: !simples && possuiContrato ? documento.slice(0, 24) : "",
		valorTotalCentavos: modo === "contrato" || modo === "total" ? valorTotalCentavos : null,
		valorMensalCentavos: modo === "contrato" ? valorMensalCentavos : null,
		valorEstimadoCentavos: modo === "estimado" ? valorEstimadoCentavos : null,
		ciNumero: ci.numero,
		ciAno: ci.ano,
		ciOrigem: ciOrigem.slice(0, 160),
		linkAbertura,
		linkHomologacao,
		linkPncp,
		linkRetificacao,
		linkCancelamento,
		parecerNumero: simples || status === "cancelado" ? null : parecer.numero,
		parecerAno: simples || status === "cancelado" ? null : parecer.ano,
		status,
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
function inteiroOuNulo(value) {
	if (value == null || value === "") return null;
	const n = Number(value);
	return Number.isInteger(n) ? n : null;
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
	const tipo = normalizarModalidade(linha.tipo) ?? "Pregão";
	const status = normalizarStatus(linha.status);
	const possui = bool(linha.possui_contrato);
	const encerramento = String(linha.encerramento).slice(0, 10);
	const previsao = dia(linha.previsao_etapa) ?? (pedePrevisao(status) ? encerramento : null);
	return {
		id: linha.id,
		numero: linha.numero,
		numeroAno: inteiroOuNulo(linha.numero_ano),
		referencia: linha.referencia ?? "",
		objeto: linha.objeto,
		tipo,
		tipoNumero: inteiroOuNulo(linha.tipo_numero),
		tipoAno: inteiroOuNulo(linha.tipo_ano),
		dataInicio: String(linha.data_inicio).slice(0, 10),
		previsaoEtapa: previsao,
		encerramento,
		alertaDias: Number(linha.alerta_dias),
		possuiContrato: status === "execucao" && possui,
		vigenciaInicio: possui ? dia(linha.vigencia_inicio) : null,
		vigenciaFim: possui ? dia(linha.vigencia_fim) : null,
		contratado: possui ? linha.contratado ?? "" : "",
		documento: possui ? linha.documento ?? "" : "",
		valorTotalCentavos: linha.valor_total_centavos != null ? Number(linha.valor_total_centavos) : null,
		valorMensalCentavos: possui && linha.valor_mensal_centavos != null ? Number(linha.valor_mensal_centavos) : null,
		valorEstimadoCentavos: linha.valor_estimado_centavos != null ? Number(linha.valor_estimado_centavos) : null,
		ciNumero: inteiroOuNulo(linha.ci_numero),
		ciAno: inteiroOuNulo(linha.ci_ano),
		ciOrigem: linha.ci_origem ?? "",
		linkAbertura: linha.link_abertura ?? "",
		linkHomologacao: linha.link_homologacao ?? "",
		linkPncp: linha.link_pncp ?? "",
		linkRetificacao: linha.link_retificacao ?? "",
		linkCancelamento: linha.link_cancelamento ?? "",
		parecerNumero: inteiroOuNulo(linha.parecer_numero),
		parecerAno: inteiroOuNulo(linha.parecer_ano),
		status,
		historico,
		equipeId: linha.team_id,
		autorId: linha.autor_id,
		autorNome: linha.autor_nome ?? ""
	};
}
var schemaPronto = null;
var SCHEMA_ADMIN = 7;
/** Garante as colunas novas mesmo se a migração ainda não tiver rodado nesta instância. */
async function garantirColunas(sql) {
	if (!schemaPronto || schemaPronto.versao !== SCHEMA_ADMIN) schemaPronto = {
		versao: SCHEMA_ADMIN,
		pendente: (async () => {
			for (const comando of [
				"alter table processos_admin add column if not exists ci_numero integer",
				"alter table processos_admin add column if not exists ci_ano integer",
				"alter table processos_admin add column if not exists ci_origem text not null default ''",
				"alter table processos_admin add column if not exists parecer_numero integer",
				"alter table processos_admin add column if not exists parecer_ano integer",
				"alter table processos_admin add column if not exists numero_ano integer",
				"alter table processos_admin add column if not exists tipo_numero integer",
				"alter table processos_admin add column if not exists tipo_ano integer",
				"alter table processos_admin add column if not exists previsao_etapa date",
				"alter table processos_admin add column if not exists valor_estimado_centavos integer",
				"alter table processos_admin add column if not exists link_abertura text not null default ''",
				"alter table processos_admin add column if not exists link_homologacao text not null default ''",
				"alter table processos_admin add column if not exists link_pncp text not null default ''",
				"alter table processos_admin add column if not exists link_retificacao text not null default ''",
				"alter table processos_admin add column if not exists link_cancelamento text not null default ''"
			]) await sql.query(comando);
		})().catch((err) => {
			schemaPronto = null;
			throw err;
		})
	};
	await schemaPronto.pendente;
}
var SELECT_ADMIN = `
  p.id, p.numero, p.numero_ano, p.referencia, p.objeto, p.tipo, p.tipo_numero, p.tipo_ano, p.data_inicio, p.previsao_etapa, p.encerramento,
  p.alerta_dias, p.possui_contrato, p.vigencia_inicio, p.vigencia_fim, p.contratado,
  p.documento, p.valor_total_centavos, p.valor_mensal_centavos, p.valor_estimado_centavos,
  p.ci_numero, p.ci_ano, p.ci_origem, p.link_abertura, p.link_homologacao, p.link_pncp, p.link_retificacao, p.link_cancelamento, p.parecer_numero, p.parecer_ano,
  p.status, p.historico, p.team_id,
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
	await garantirColunas(sql);
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
	await garantirColunas(sql);
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
            numero_ano = ${data.numeroAno},
            referencia = ${data.referencia},
            objeto = ${data.objeto},
            tipo = ${data.tipo},
            tipo_numero = ${data.tipoNumero},
            tipo_ano = ${data.tipoAno},
            data_inicio = ${data.dataInicio},
            previsao_etapa = ${data.previsaoEtapa},
            encerramento = ${data.encerramento},
            alerta_dias = ${data.alertaDias},
            possui_contrato = ${data.possuiContrato},
            vigencia_inicio = ${data.vigenciaInicio},
            vigencia_fim = ${data.vigenciaFim},
            contratado = ${data.contratado},
            documento = ${data.documento},
            valor_total_centavos = ${data.valorTotalCentavos},
            valor_mensal_centavos = ${data.valorMensalCentavos},
            valor_estimado_centavos = ${data.valorEstimadoCentavos},
            ci_numero = ${data.ciNumero},
            ci_ano = ${data.ciAno},
            ci_origem = ${data.ciOrigem},
            link_abertura = ${data.linkAbertura},
            link_homologacao = ${data.linkHomologacao},
            link_pncp = ${data.linkPncp},
            link_retificacao = ${data.linkRetificacao},
            link_cancelamento = ${data.linkCancelamento},
            parecer_numero = ${data.parecerNumero},
            parecer_ano = ${data.parecerAno},
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
            id, user_id, team_id, numero, numero_ano, referencia, objeto, tipo, tipo_numero, tipo_ano, data_inicio, previsao_etapa, encerramento,
            alerta_dias, possui_contrato, vigencia_inicio, vigencia_fim, contratado, documento,
            valor_total_centavos, valor_mensal_centavos, valor_estimado_centavos, ci_numero, ci_ano, ci_origem,
            link_abertura, link_homologacao, link_pncp, link_retificacao, link_cancelamento,
            parecer_numero, parecer_ano, status, historico, autor_id, autor_nome
          ) values (
            ${data.id}, ${context.userId}, ${data.equipeId}, ${data.numero}, ${data.numeroAno}, ${data.referencia},
            ${data.objeto}, ${data.tipo}, ${data.tipoNumero}, ${data.tipoAno}, ${data.dataInicio}, ${data.previsaoEtapa}, ${data.encerramento}, ${data.alertaDias},
            ${data.possuiContrato}, ${data.vigenciaInicio}, ${data.vigenciaFim}, ${data.contratado},
            ${data.documento}, ${data.valorTotalCentavos}, ${data.valorMensalCentavos}, ${data.valorEstimadoCentavos},
            ${data.ciNumero}, ${data.ciAno}, ${data.ciOrigem}, ${data.linkAbertura}, ${data.linkHomologacao}, ${data.linkPncp}, ${data.linkRetificacao}, ${data.linkCancelamento}, ${data.parecerNumero}, ${data.parecerAno},
            ${data.status},
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
var moverAdmin_createServerFn_handler = createServerRpc({
	id: "8a8d5e5c641fd769ee3db776337a4c8fe726578f035d73fbc70d4a7202b02947",
	name: "moverAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => moverAdmin.__executeServer(opts));
var moverAdmin = createServerFn({ method: "POST" }).validator((input) => {
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
}).middleware([authMiddleware]).handler(moverAdmin_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await garantirColunas(sql);
	if (data.equipeId) {
		if (!(await sql`
        select 1 as ok from equipe_membros where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `).length) throw new Error("Você não faz parte desta equipe.");
	}
	const existente = await sql`
      select historico, user_id, team_id from processos_admin where id = ${data.id}
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
		historico = historicoOk(JSON.parse(row.historico || "[]"));
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
      update processos_admin
      set team_id = ${data.equipeId}, user_id = ${dono}, historico = ${JSON.stringify(historico)}
      where id = ${data.id}
      returning id
    `;
	if (!salvos.length) throw new Error("Não foi possível mover");
	return { id: salvos[0].id };
});
//#endregion
export { apagarAdmin_createServerFn_handler, listarAdmin_createServerFn_handler, moverAdmin_createServerFn_handler, salvarAdmin_createServerFn_handler };
