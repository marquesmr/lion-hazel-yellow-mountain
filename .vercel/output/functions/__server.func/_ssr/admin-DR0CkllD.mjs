import { s as daysUntil, y as todayIso } from "./prazos-DFCxt5b1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DR0CkllD.js
var MODALIDADES = [
	"Pregão",
	"Concorrência",
	"Concurso",
	"Leilão",
	"Diálogo Competitivo",
	"Dispensa de Licitação",
	"Inexigibilidade de Licitação",
	"Pronto Pagamento",
	"Doação",
	"Outros"
];
var MODALIDADES_ANTIGAS = {
	"Diálogo competitivo": "Diálogo Competitivo",
	"Dispensa de licitação": "Dispensa de Licitação",
	"Inexigibilidade de licitação": "Inexigibilidade de Licitação",
	"Compra direta por pronto pagamento": "Pronto Pagamento"
};
function normalizarModalidade(raw) {
	if (MODALIDADES.includes(raw)) return raw;
	return MODALIDADES_ANTIGAS[raw] ?? null;
}
function rotuloTipo(tipo, numero, ano) {
	if (numero == null || ano == null) return tipo;
	return `${tipo} ${String(numero).padStart(2, "0")}/${ano}`;
}
var STATUS_ADMIN = [
	"proposta",
	"pareceres",
	"assinatura",
	"execucao",
	"encerrado",
	"cancelado"
];
function exigeLinks(tipo) {
	return tipo !== "Outros" && tipo !== "Doação" && tipo !== "Pronto Pagamento" && tipo !== "Inexigibilidade de Licitação";
}
function normalizarLink(valor) {
	const texto = valor.trim();
	if (!texto) return null;
	const comProtocolo = /^https?:\/\//i.test(texto) ? texto : `https://${texto}`;
	try {
		const url = new URL(comProtocolo);
		if (url.protocol !== "http:" && url.protocol !== "https:") return null;
		if (!url.hostname.includes(".")) return null;
		return url.toString();
	} catch {
		return null;
	}
}
function tipoSimples(tipo) {
	return tipo === "Outros" || tipo === "Doação";
}
function modoValor(tipo, status) {
	if (status === "execucao" && !tipoSimples(tipo)) return "contrato";
	if (status === "encerrado" && !tipoSimples(tipo)) return "total";
	if (status === "execucao" || status === "encerrado") return "nenhum";
	return "estimado";
}
function pedePrevisao(status) {
	return status === "proposta" || status === "pareceres" || status === "assinatura";
}
function normalizarStatus(raw) {
	if (raw === "concluido" || raw === "encerrado") return "encerrado";
	if (raw === "cancelado") return "cancelado";
	if (raw === "execucao") return "execucao";
	if (raw === "pareceres" || raw === "assinatura" || raw === "proposta") return raw;
	return "proposta";
}
function statusAdminLabel(status) {
	if (status === "proposta") return "Recebendo proposta";
	if (status === "pareceres") return "Pareceres";
	if (status === "assinatura") return "Assinatura de contrato";
	if (status === "execucao") return "Execução";
	if (status === "cancelado") return "Cancelado";
	return "Encerrado";
}
var MESES = [
	"janeiro",
	"fevereiro",
	"março",
	"abril",
	"maio",
	"junho",
	"julho",
	"agosto",
	"setembro",
	"outubro",
	"novembro",
	"dezembro"
];
function dataAlvo(p) {
	if (p.status === "execucao" && p.vigenciaFim) return p.vigenciaFim;
	if (p.status === "encerrado" && p.encerramento) return p.encerramento;
	if (pedePrevisao(p.status) && p.previsaoEtapa) return p.previsaoEtapa;
	return p.encerramento || p.dataInicio;
}
function marcoAdmin(p) {
	if (tipoSimples(p.tipo)) return {
		rotulo: "Status",
		data: null
	};
	if (p.status === "cancelado") return {
		rotulo: "Cancelado",
		data: null
	};
	if (p.status === "encerrado") return {
		rotulo: "Encerramento",
		data: p.encerramento
	};
	if (p.status === "execucao") return {
		rotulo: "Fim da vigência",
		data: p.vigenciaFim
	};
	return {
		rotulo: "Previsão da etapa",
		data: p.previsaoEtapa ?? p.encerramento
	};
}
function urgenciaAdmin(p, now = /* @__PURE__ */ new Date()) {
	if (p.status === "encerrado") return "encerrado";
	if (p.status === "cancelado") return "cancelado";
	if (tipoSimples(p.tipo)) return "ok";
	const dias = daysUntil(dataAlvo(p), now);
	if (dias < 0) return "vencido";
	if (dias === 0) return "hoje";
	if (dias <= p.alertaDias) return "proximo";
	return "ok";
}
function prazoAdminLabel(p, now = /* @__PURE__ */ new Date()) {
	if (tipoSimples(p.tipo)) return statusAdminLabel(p.status);
	if (p.status === "encerrado") return "Encerrado";
	if (p.status === "cancelado") return "Cancelado";
	const dias = daysUntil(dataAlvo(p), now);
	const qual = p.status === "execucao" ? "Vigência" : "Previsão";
	if (dias < 0) {
		const n = Math.abs(dias);
		return n === 1 ? `${qual} vencida há 1 dia` : `${qual} vencida há ${n} dias`;
	}
	if (dias === 0) return `${qual} encerra hoje`;
	if (dias === 1) return `${qual} encerra amanhã`;
	return `${qual} em ${dias} dias`;
}
function precisaAvisoAdmin(p, now = /* @__PURE__ */ new Date()) {
	if (tipoSimples(p.tipo)) return false;
	const u = urgenciaAdmin(p, now);
	return u === "vencido" || u === "hoje" || u === "proximo";
}
function reaisParaCentavos(texto) {
	const bruto = texto.trim();
	if (!bruto) return null;
	const normal = bruto.includes(",") ? bruto.replace(/\./g, "").replace(",", ".") : bruto;
	if (!/^\d+(\.\d{1,2})?$/.test(normal)) return null;
	const n = Number(normal);
	if (!Number.isFinite(n) || n < 0 || n > 1e9) return null;
	return Math.round(n * 100);
}
function formatarReais(centavos) {
	if (centavos == null) return "—";
	return (centavos / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function centavosParaCampo(centavos) {
	if (centavos == null) return "";
	return (centavos / 100).toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
/** Preenche a pontuação de reais a partir dos dígitos: 123456 vira 1.234,56. */
function mascaraReais(texto) {
	const digitos = texto.replace(/\D/g, "").slice(0, 11);
	if (!digitos) return "";
	const completo = digitos.padStart(3, "0");
	return `${completo.slice(0, -2).replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${completo.slice(-2)}`;
}
/** CPF até 11 dígitos; a partir daí, CNPJ. */
function mascaraDocumento(texto) {
	const d = texto.replace(/\D/g, "").slice(0, 14);
	if (d.length <= 11) {
		if (d.length <= 3) return d;
		if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
		if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
		return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
	}
	const base = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}`;
	return d.length > 12 ? `${base}-${d.slice(12)}` : base;
}
/** Número da peça no formato 12/2026. */
function formatarPeca(numero, ano) {
	if (numero == null || ano == null) return "—";
	return `${numero}/${ano}`;
}
/** Número do processo no formato 02/2026. Sem ano, devolve o número com duas casas. */
function rotuloNumero(numero, ano) {
	const casa = (valor) => /^\d+$/.test(valor) ? valor.padStart(2, "0") : valor;
	const bruto = numero.trim();
	const jaComAno = /^(\d+)\/(\d{4})$/.exec(bruto);
	if (jaComAno) return `${jaComAno[1].padStart(2, "0")}/${jaComAno[2]}`;
	if (ano == null) return casa(bruto);
	return `${casa(bruto)}/${ano}`;
}
function numeroPeca(texto) {
	const bruto = texto.trim();
	if (!/^\d{1,6}$/.test(bruto)) return null;
	const n = Number(bruto);
	return n >= 1 ? n : null;
}
/** Anos oferecidos no lançamento, do próximo ano até 2016. */
function anosDePeca(agora = /* @__PURE__ */ new Date()) {
	const fim = agora.getFullYear() + 1;
	const anos = [];
	for (let ano = fim; ano >= 2016; ano -= 1) anos.push(ano);
	return anos;
}
function fimDoMes(ano, mes) {
	const dia = new Date(ano, mes, 0).getDate();
	return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}
function intervaloPeriodo(ancora, periodo) {
	const match = /^(\d{4})-(\d{2})$/.exec(ancora);
	if (!match) return null;
	const ano = Number(match[1]);
	const mes = Number(match[2]);
	if (mes < 1 || mes > 12) return null;
	if (periodo === "mensal") return {
		inicio: `${match[1]}-${match[2]}-01`,
		fim: fimDoMes(ano, mes),
		rotulo: `${MESES[mes - 1]} de ${ano}`
	};
	if (periodo === "trimestral") {
		const inicioMes = Math.floor((mes - 1) / 3) * 3 + 1;
		const trimestre = Math.floor((mes - 1) / 3) + 1;
		return {
			inicio: `${ano}-${String(inicioMes).padStart(2, "0")}-01`,
			fim: fimDoMes(ano, inicioMes + 2),
			rotulo: `${trimestre}º trimestre de ${ano}`
		};
	}
	if (periodo === "semestral") {
		const primeiro = mes <= 6;
		return {
			inicio: primeiro ? `${ano}-01-01` : `${ano}-07-01`,
			fim: primeiro ? `${ano}-06-30` : `${ano}-12-31`,
			rotulo: `${primeiro ? "1" : "2"}º semestre de ${ano}`
		};
	}
	return {
		inicio: `${ano}-01-01`,
		fim: `${ano}-12-31`,
		rotulo: String(ano)
	};
}
function cruzaPeriodo(p, inicio, fim) {
	return p.dataInicio <= fim && dataAlvo(p) >= inicio;
}
function avisoAdminKey(p, now = /* @__PURE__ */ new Date()) {
	return `admin|${p.id}|${urgenciaAdmin(p, now)}|${todayIso(now)}`;
}
var SENT_KEY = "prazos.avisos.admin.v1";
function avisosAdminEnviados() {
	try {
		const raw = JSON.parse(localStorage.getItem(SENT_KEY) || "[]");
		return Array.isArray(raw) ? raw.filter((item) => typeof item === "string") : [];
	} catch {
		return [];
	}
}
function marcarAvisosAdmin(keys) {
	const next = [...avisosAdminEnviados(), ...keys].slice(-300);
	localStorage.setItem(SENT_KEY, JSON.stringify(next));
}
//#endregion
export { prazoAdminLabel as C, rotuloTipo as D, rotuloNumero as E, statusAdminLabel as O, pedePrevisao as S, reaisParaCentavos as T, modoValor as _, avisosAdminEnviados as a, normalizarStatus as b, dataAlvo as c, formatarReais as d, intervaloPeriodo as f, mascaraReais as g, mascaraDocumento as h, avisoAdminKey as i, urgenciaAdmin as k, exigeLinks as l, marcoAdmin as m, STATUS_ADMIN as n, centavosParaCampo as o, marcarAvisosAdmin as p, anosDePeca as r, cruzaPeriodo as s, MODALIDADES as t, formatarPeca as u, normalizarLink as v, precisaAvisoAdmin as w, numeroPeca as x, normalizarModalidade as y };
