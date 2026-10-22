//#region node_modules/.nitro/vite/services/ssr/assets/prazos-D4IqLRaN.js
var TIPOS = [
	"Requerimentos",
	"Projetos de Lei",
	"Indicações",
	"Outros"
];
var STORAGE_KEY = "prazos.processos.v1";
var SENT_KEY = "prazos.avisos.v1";
function todayIso(now = /* @__PURE__ */ new Date()) {
	return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}
function addDaysIso(days, now = /* @__PURE__ */ new Date()) {
	return todayIso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + days));
}
function parseDate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y || 1970, (m || 1) - 1, d || 1);
}
function daysUntil(iso, now = /* @__PURE__ */ new Date()) {
	const hoje = parseDate(todayIso(now)).getTime();
	const alvo = parseDate(iso).getTime();
	return Math.round((alvo - hoje) / 864e5);
}
function formatDate(iso) {
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(parseDate(iso));
}
function urgencia(p, now = /* @__PURE__ */ new Date()) {
	if (p.status === "concluido") return "concluido";
	const dias = daysUntil(p.prazo, now);
	if (dias < 0) return "vencido";
	if (dias === 0) return "hoje";
	if (dias <= p.alertaDias) return "proximo";
	return "ok";
}
function prazoLabel(p, now = /* @__PURE__ */ new Date()) {
	if (p.status === "concluido") return "Concluído";
	const dias = daysUntil(p.prazo, now);
	if (dias < 0) {
		const n = Math.abs(dias);
		return n === 1 ? "Vencido há 1 dia" : `Vencido há ${n} dias`;
	}
	if (dias === 0) return "Vence hoje";
	if (dias === 1) return "Vence amanhã";
	return `Vence em ${dias} dias`;
}
function precisaAviso(p, now = /* @__PURE__ */ new Date()) {
	const u = urgencia(p, now);
	return u === "vencido" || u === "hoje" || u === "proximo";
}
var RANK = {
	vencido: 0,
	hoje: 1,
	proximo: 2,
	ok: 3,
	concluido: 4
};
function ordenar(lista, now = /* @__PURE__ */ new Date()) {
	return [...lista].sort((a, b) => {
		const diff = RANK[urgencia(a, now)] - RANK[urgencia(b, now)];
		if (diff !== 0) return diff;
		return a.prazo.localeCompare(b.prazo);
	});
}
function lerProcessosLocais() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isProcesso).map(normalizarProcesso);
	} catch {
		return [];
	}
}
function isProcesso(value) {
	if (!value || typeof value !== "object") return false;
	const p = value;
	return typeof p.id === "string" && typeof p.numero === "string" && typeof p.prazo === "string";
}
var EXEMPLO_TIPO = {
	"5001234-12.2026.8.13.0024": "Requerimentos",
	"0009876-33.2025.5.03.0028": "Projetos de Lei",
	"1004321-09.2026.4.01.3800": "Indicações",
	"ADM-2026/0412": "Outros"
};
function normalizarProcesso(p) {
	const tipo = TIPOS.includes(p.tipo) ? p.tipo : EXEMPLO_TIPO[p.numero] ?? "Outros";
	return {
		...p,
		tipo,
		equipeId: p.equipeId ?? null
	};
}
function avisoKey(p, now = /* @__PURE__ */ new Date()) {
	return `${p.id}|${urgencia(p, now)}|${todayIso(now)}`;
}
function avisosJaEnviados() {
	try {
		const raw = JSON.parse(localStorage.getItem(SENT_KEY) || "[]");
		return Array.isArray(raw) ? raw.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
function marcarAvisos(keys) {
	const next = [...avisosJaEnviados(), ...keys].slice(-300);
	localStorage.setItem(SENT_KEY, JSON.stringify(next));
}
//#endregion
export { daysUntil as a, marcarAvisos as c, precisaAviso as d, todayIso as f, avisosJaEnviados as i, ordenar as l, addDaysIso as n, formatDate as o, urgencia as p, avisoKey as r, lerProcessosLocais as s, TIPOS as t, prazoLabel as u };
