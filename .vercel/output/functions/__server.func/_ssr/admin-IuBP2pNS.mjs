import { a as daysUntil, f as todayIso } from "./prazos-3B5T3wUv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-IuBP2pNS.js
var MODALIDADES = [
	"Pregão",
	"Concorrência",
	"Concurso",
	"Leilão",
	"Diálogo competitivo",
	"Dispensa de licitação",
	"Inexigibilidade de licitação",
	"Compra direta por pronto pagamento"
];
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
	if (p.possuiContrato && p.vigenciaFim) return p.vigenciaFim;
	return p.encerramento;
}
function urgenciaAdmin(p, now = /* @__PURE__ */ new Date()) {
	if (p.status === "concluido") return "concluido";
	const dias = daysUntil(dataAlvo(p), now);
	if (dias < 0) return "vencido";
	if (dias === 0) return "hoje";
	if (dias <= p.alertaDias) return "proximo";
	return "ok";
}
function prazoAdminLabel(p, now = /* @__PURE__ */ new Date()) {
	if (p.status === "concluido") return "Concluído";
	const dias = daysUntil(dataAlvo(p), now);
	const qual = p.possuiContrato && p.vigenciaFim ? "Vigência" : "Encerramento";
	if (dias < 0) {
		const n = Math.abs(dias);
		return n === 1 ? `${qual} vencida há 1 dia` : `${qual} vencida há ${n} dias`;
	}
	if (dias === 0) return `${qual} encerra hoje`;
	if (dias === 1) return `${qual} encerra amanhã`;
	return `${qual} em ${dias} dias`;
}
function precisaAvisoAdmin(p, now = /* @__PURE__ */ new Date()) {
	const u = urgenciaAdmin(p, now);
	return u === "vencido" || u === "hoje" || u === "proximo";
}
function statusAdminLabel(status) {
	if (status === "aberto") return "Aberto";
	if (status === "execucao") return "Em execução";
	return "Concluído";
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
	return p.dataInicio <= fim && p.encerramento >= inicio;
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
export { cruzaPeriodo as a, intervaloPeriodo as c, precisaAvisoAdmin as d, reaisParaCentavos as f, centavosParaCampo as i, marcarAvisosAdmin as l, urgenciaAdmin as m, avisoAdminKey as n, dataAlvo as o, statusAdminLabel as p, avisosAdminEnviados as r, formatarReais as s, MODALIDADES as t, prazoAdminLabel as u };
