import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DRaEGDvO.mjs";
import { a as daysUntil, c as marcarAvisos, d as precisaAviso, f as todayIso, i as avisosJaEnviados, l as ordenar, n as addDaysIso, o as formatDate, p as urgencia, r as avisoKey, s as lerProcessosLocais, t as TIPOS, u as prazoLabel } from "./prazos-3B5T3wUv.mjs";
import { a as cruzaPeriodo, c as intervaloPeriodo, d as precisaAvisoAdmin, f as reaisParaCentavos, i as centavosParaCampo, l as marcarAvisosAdmin, m as urgenciaAdmin, n as avisoAdminKey, o as dataAlvo, p as statusAdminLabel, r as avisosAdminEnviados, s as formatarReais, t as MODALIDADES, u as prazoAdminLabel } from "./admin-IuBP2pNS.mjs";
import { i as signOut, t as authClient } from "./client-1vAx-gM_.mjs";
import { a as hasGateSessionMarker } from "./server--HD7F-dx.mjs";
import { a as Search, c as Printer, d as FileText, f as Check, g as BellOff, h as Bell, i as Trash2, l as Plus, m as CalendarClock, n as Users, p as ChartColumn, s as RotateCcw, t as X, u as Pencil } from "../_libs/lucide-react.mjs";
import { n as useCurrentUser, r as useCurrentUserState, t as TelaConta } from "./tela-conta-UdGJ6nK8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_ErdCwJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-pine-soft text-sm font-medium text-pine",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Saindo…" : "Sair"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
	if (!dataOk$1(bruto.dataLancamento) || !dataOk$1(bruto.prazo)) throw new Error("Data inválida");
	const alerta = Number(bruto.alertaDias);
	if (!Number.isInteger(alerta) || alerta < 0 || alerta > 60) throw new Error("Antecedência inválida");
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
		historico: historicoOk$1(bruto.historico),
		equipeId: equipeIdOk(bruto.equipeId),
		autorId: typeof bruto.autorId === "string" && bruto.autorId.trim() ? bruto.autorId.trim().slice(0, 80) : null,
		autorNome: typeof bruto.autorNome === "string" ? bruto.autorNome.trim().slice(0, 80) : ""
	};
}
function equipeIdOk(value) {
	if (typeof value !== "string") return null;
	const id = value.trim();
	return id ? id.slice(0, 80) : null;
}
function dataOk$1(value) {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function historicoOk$1(value) {
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
var listarProcessos = createServerFn({ method: "GET" }).validator((equipeId) => {
	if (equipeId == null || equipeId === "") return null;
	if (typeof equipeId !== "string" || !equipeId.trim()) throw new Error("Dados inválidos");
	return equipeId.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(createSsrRpc("92ad57039e395614bdf510b5ecf891bacc79d73b74d206cb1af4325aa6d9814b"));
var salvarProcesso = createServerFn({ method: "POST" }).validator(exigirProcesso).middleware([authMiddleware]).handler(createSsrRpc("e4a33f55c323e5c3b5cbf4bc1c1a04536f5065d08e3f032e07bac301a3b0d591"));
var apagarProcesso = createServerFn({ method: "POST" }).validator((id) => {
	if (typeof id !== "string" || !id.trim()) throw new Error("Dados inválidos");
	return id.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(createSsrRpc("15545f4cb2624558bb806ffea6883a6b542d2a70601624bb6c153a0eb923e13a"));
function emailOk(value) {
	if (typeof value !== "string") throw new Error("E-mail inválido.");
	const email = value.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) throw new Error("E-mail inválido.");
	return email;
}
var listarEquipes = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9ec6aee1e2f22500f0fa0dc638592322b03a1f0ec0cba58ce9bc8fc56368ea5a"));
var criarEquipe = createServerFn({ method: "POST" }).validator((nome) => {
	if (typeof nome !== "string" || nome.trim().length < 2) throw new Error("Dê um nome para a equipe.");
	return nome.trim().slice(0, 60);
}).middleware([authMiddleware]).handler(createSsrRpc("e6dc25ba786305a5cb1a3bbe4bd376ca6026cb7d0df1371c6e9c2ecd1c1958dd"));
var adicionarNaEquipe = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	if (typeof bruto.equipeId !== "string" || !bruto.equipeId.trim()) throw new Error("Dados inválidos");
	return {
		equipeId: bruto.equipeId.trim().slice(0, 80),
		email: emailOk(bruto.email)
	};
}).middleware([authMiddleware]).handler(createSsrRpc("e5fce7c652feb353592153b100b938223bdbf2da0d4d4c138ca9905e7941e8a0"));
var removerDaEquipe = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	if (typeof bruto.equipeId !== "string" || !bruto.equipeId.trim()) throw new Error("Dados inválidos");
	return {
		equipeId: bruto.equipeId.trim().slice(0, 80),
		email: emailOk(bruto.email)
	};
}).middleware([authMiddleware]).handler(createSsrRpc("f2310c1977299419f856ebb7e928b0ec4ae301e0341553426bdd0f2d860302af"));
var ORDEM_TIPO = [
	"Requerimentos",
	"Indicações",
	"Projetos de Lei",
	"Outros"
];
function PainelEstatisticas({ processos }) {
	const porTipo = ORDEM_TIPO.map((tipo) => ({
		tipo,
		n: processos.filter((p) => p.tipo === tipo).length
	}));
	const situacao = [
		{
			label: "Vencidos",
			n: processos.filter((p) => urgencia(p) === "vencido").length,
			cor: "#9a2e2e"
		},
		{
			label: "Vencem hoje",
			n: processos.filter((p) => urgencia(p) === "hoje").length,
			cor: "#9a2e2e"
		},
		{
			label: "Vencendo",
			n: processos.filter((p) => urgencia(p) === "proximo").length,
			cor: "#7a4510"
		},
		{
			label: "No prazo",
			n: processos.filter((p) => urgencia(p) === "ok").length,
			cor: "#1c4738"
		},
		{
			label: "Concluídos",
			n: processos.filter((p) => p.status === "concluido").length,
			cor: "#6d665c"
		}
	];
	const maiorTipo = Math.max(1, ...porTipo.map((item) => item.n));
	const total = processos.length;
	const abertos = processos.filter((p) => p.status === "andamento").length;
	if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-ink",
			children: "Ainda sem números"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-sm text-sm text-muted",
			children: "Lance um processo para ver a distribuição por tipo e por prazo."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-4 lg:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "Situação"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						abertos,
						" em aberto de ",
						total
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut$1, {
					fatias: situacao,
					total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2",
					children: situacao.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 rounded-full",
								style: { background: item.cor }
							}), item.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: item.n
						})]
					}, item.label))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-sheet p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Por tipo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 flex flex-col gap-4",
				children: porTipo.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-ink",
						children: item.tipo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: item.n
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-3 overflow-hidden rounded-full bg-paper",
					role: "presentation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-pine",
						style: { width: `${Math.max(item.n ? 6 : 0, item.n / maiorTipo * 100)}%` }
					})
				})] }, item.tipo))
			})]
		})]
	});
}
function Donut$1({ fatias, total }) {
	const r = 46;
	const c = 2 * Math.PI * r;
	let offset = 0;
	const usadas = fatias.filter((f) => f.n > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 140 140",
		className: "mx-auto mt-2 size-40",
		role: "img",
		"aria-label": `${total} processos no gráfico`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "70",
				cy: "70",
				r,
				fill: "none",
				stroke: "#e3dcd0",
				strokeWidth: "16"
			}),
			usadas.map((fatia) => {
				const len = fatia.n / total * c;
				const el = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: fatia.cor,
					strokeWidth: "16",
					strokeDasharray: `${len} ${c - len}`,
					strokeDashoffset: -offset,
					transform: "rotate(-90 70 70)"
				}, fatia.label);
				offset += len;
				return el;
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "66",
				textAnchor: "middle",
				fill: "#1b1915",
				fontSize: "28",
				fontFamily: "Fraunces, Georgia, serif",
				children: total
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "84",
				textAnchor: "middle",
				fill: "#6d665c",
				fontSize: "11",
				fontFamily: "Outfit, sans-serif",
				children: "processos"
			})
		]
	});
}
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
var listarAdmin = createServerFn({ method: "GET" }).validator((equipeId) => {
	if (equipeId == null || equipeId === "") return null;
	if (typeof equipeId !== "string" || !equipeId.trim()) throw new Error("Dados inválidos");
	return equipeId.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(createSsrRpc("9c3cd48009e26a3d89b603f4512f6197b0b87556253eeed07b03cecbe4cda6a7"));
var salvarAdmin = createServerFn({ method: "POST" }).validator(exigirAdmin).middleware([authMiddleware]).handler(createSsrRpc("db083dc179b05d89d9de0b0d0f51291084e663740b86483240dbd3a75b90d223"));
var apagarAdmin = createServerFn({ method: "POST" }).validator((id) => {
	if (typeof id !== "string" || !id.trim()) throw new Error("Dados inválidos");
	return id.trim().slice(0, 80);
}).middleware([authMiddleware]).handler(createSsrRpc("ba0c35872738aec5f444f599f8200030875f38ec589f4fbd155335e689bc9aaf"));
function GraficoAdmin({ processos }) {
	const porTipo = MODALIDADES.map((tipo) => ({
		tipo,
		n: processos.filter((p) => p.tipo === tipo).length
	})).filter((item) => item.n > 0);
	const situacao = [
		{
			label: "Vencidos",
			n: processos.filter((p) => urgenciaAdmin(p) === "vencido").length,
			cor: "#9a2e2e"
		},
		{
			label: "Encerram hoje",
			n: processos.filter((p) => urgenciaAdmin(p) === "hoje").length,
			cor: "#9a2e2e"
		},
		{
			label: "Vencendo",
			n: processos.filter((p) => urgenciaAdmin(p) === "proximo").length,
			cor: "#7a4510"
		},
		{
			label: "No prazo",
			n: processos.filter((p) => urgenciaAdmin(p) === "ok").length,
			cor: "#1c4738"
		},
		{
			label: "Concluídos",
			n: processos.filter((p) => p.status === "concluido").length,
			cor: "#6d665c"
		}
	];
	const maiorTipo = Math.max(1, ...porTipo.map((item) => item.n));
	const total = processos.length;
	const abertos = processos.filter((p) => p.status === "aberto").length;
	const execucao = processos.filter((p) => p.status === "execucao").length;
	const concluidos = processos.filter((p) => p.status === "concluido").length;
	if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-ink",
			children: "Ainda sem números"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-sm text-sm text-muted",
			children: "Lance um processo administrativo para ver a distribuição por modalidade e por prazo."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "Situação"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						abertos,
						" ",
						abertos === 1 ? "aberto" : "abertos",
						" · ",
						execucao,
						" em execução · ",
						concluidos,
						" ",
						concluidos === 1 ? "concluído" : "concluídos"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut, {
					fatias: situacao,
					total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2",
					children: situacao.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 rounded-full",
								style: { background: item.cor }
							}), item.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: item.n
						})]
					}, item.label))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink",
					children: "Por modalidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-4",
					children: (porTipo.length ? porTipo : MODALIDADES.map((tipo) => ({
						tipo,
						n: 0
					}))).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: item.tipo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: item.n
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-3 overflow-hidden rounded-full bg-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-pine",
							style: { width: `${Math.max(item.n ? 6 : 0, item.n / maiorTipo * 100)}%` }
						})
					})] }, item.tipo))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted",
					children: [
						"Aberto, em execução e concluído: ",
						abertos,
						" · ",
						execucao,
						" · ",
						concluidos,
						" (",
						statusAdminLabel("concluido").toLowerCase(),
						")."
					]
				})
			]
		})]
	});
}
function Donut({ fatias, total }) {
	const r = 46;
	const c = 2 * Math.PI * r;
	let offset = 0;
	const usadas = fatias.filter((f) => f.n > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 140 140",
		className: "mx-auto mt-2 size-40",
		role: "img",
		"aria-label": `${total} processos no gráfico`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "70",
				cy: "70",
				r,
				fill: "none",
				stroke: "#e3dcd0",
				strokeWidth: "16"
			}),
			usadas.map((fatia) => {
				const len = fatia.n / total * c;
				const el = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: fatia.cor,
					strokeWidth: "16",
					strokeDasharray: `${len} ${c - len}`,
					strokeDashoffset: -offset,
					transform: "rotate(-90 70 70)"
				}, fatia.label);
				offset += len;
				return el;
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "66",
				textAnchor: "middle",
				fill: "#1b1915",
				fontSize: "28",
				fontFamily: "Fraunces, Georgia, serif",
				children: total
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "84",
				textAnchor: "middle",
				fill: "#6d665c",
				fontSize: "11",
				fontFamily: "Outfit, sans-serif",
				children: "processos"
			})
		]
	});
}
var FILTROS$1 = [
	{
		id: "andamento",
		label: "Em curso"
	},
	{
		id: "aberto",
		label: "Abertos"
	},
	{
		id: "execucao",
		label: "Em execução"
	},
	{
		id: "atencao",
		label: "Vencendo"
	},
	{
		id: "concluidos",
		label: "Concluídos"
	},
	{
		id: "todos",
		label: "Todos"
	}
];
var ALERTAS = [
	1,
	3,
	5,
	7,
	10,
	15,
	30,
	60,
	90
];
var TOM$1 = {
	vencido: {
		badge: "bg-seal-soft text-seal",
		bar: "bg-seal"
	},
	hoje: {
		badge: "bg-seal-soft text-seal",
		bar: "bg-seal"
	},
	proximo: {
		badge: "bg-brass-soft text-brass",
		bar: "bg-brass"
	},
	ok: {
		badge: "bg-pine-soft text-pine",
		bar: "bg-pine"
	},
	concluido: {
		badge: "bg-line text-muted",
		bar: "bg-line"
	}
};
var inputCls$1 = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted";
function useGradeTresColunas$1() {
	const [tres, setTres] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const aplicar = () => setTres(mq.matches);
		aplicar();
		mq.addEventListener("change", aplicar);
		return () => mq.removeEventListener("change", aplicar);
	}, []);
	return tres;
}
function evento$1(texto, autorNome) {
	return {
		id: crypto.randomUUID(),
		em: (/* @__PURE__ */ new Date()).toISOString(),
		texto,
		autorNome
	};
}
function vazio() {
	return {
		numero: "",
		referencia: "",
		objeto: "",
		tipo: "Pregão",
		dataInicio: todayIso(),
		encerramento: addDaysIso(30),
		alertaDias: 15,
		possuiContrato: false,
		vigenciaInicio: todayIso(),
		vigenciaFim: addDaysIso(365),
		contratado: "",
		documento: "",
		valorTotal: "",
		valorMensal: "",
		status: "aberto",
		nota: ""
	};
}
function doProcesso(p) {
	return {
		numero: p.numero,
		referencia: p.referencia,
		objeto: p.objeto,
		tipo: p.tipo,
		dataInicio: p.dataInicio,
		encerramento: p.encerramento,
		alertaDias: p.alertaDias,
		possuiContrato: p.possuiContrato,
		vigenciaInicio: p.vigenciaInicio ?? todayIso(),
		vigenciaFim: p.vigenciaFim ?? p.encerramento,
		contratado: p.contratado,
		documento: p.documento,
		valorTotal: centavosParaCampo(p.valorTotalCentavos),
		valorMensal: centavosParaCampo(p.valorMensalCentavos),
		status: p.status,
		nota: ""
	};
}
function validar(form) {
	const erros = [];
	if (!form.numero.trim()) erros.push("Informe o número do processo.");
	if (!form.objeto.trim()) erros.push("Informe o objeto.");
	if (!form.dataInicio || !form.encerramento) erros.push("Informe início e encerramento.");
	if (form.encerramento < form.dataInicio) erros.push("O encerramento não pode ser antes do início.");
	if (form.possuiContrato) {
		if (!form.contratado.trim()) erros.push("Informe os dados do contratado.");
		if (!form.vigenciaInicio || !form.vigenciaFim) erros.push("Informe a vigência do contrato.");
		else if (form.vigenciaFim < form.vigenciaInicio) erros.push("A vigência termina antes de começar.");
		if (form.valorTotal.trim() && reaisParaCentavos(form.valorTotal) == null) erros.push("Valor total inválido.");
		if (form.valorMensal.trim() && reaisParaCentavos(form.valorMensal) == null) erros.push("Valor mensal inválido.");
	}
	return erros;
}
function mudancas(antes, form) {
	const partes = [];
	if (antes.numero !== form.numero.trim()) partes.push("o número");
	if (antes.referencia !== form.referencia.trim()) partes.push("a referência");
	if (antes.objeto !== form.objeto.trim()) partes.push("o objeto");
	if (antes.tipo !== form.tipo) partes.push(`o tipo para ${form.tipo}`);
	if (antes.dataInicio !== form.dataInicio) partes.push("a data de início");
	if (antes.encerramento !== form.encerramento) partes.push(`o encerramento para ${formatDate(form.encerramento)}`);
	if (antes.status !== form.status) partes.push(`a situação para ${statusAdminLabel(form.status).toLowerCase()}`);
	if (antes.possuiContrato !== form.possuiContrato) partes.push(form.possuiContrato ? "o contrato" : "a retirada do contrato");
	if (antes.alertaDias !== form.alertaDias) partes.push("a antecedência do aviso");
	if (!partes.length) return null;
	if (partes.length === 1) return `Alterou ${partes[0]}.`;
	const ultimo = partes.pop();
	return `Alterou ${partes.join(", ")} e ${ultimo}.`;
}
function montar(form, base) {
	const contrato = form.possuiContrato;
	return {
		id: base.id,
		numero: form.numero.trim(),
		referencia: form.referencia.trim(),
		objeto: form.objeto.trim(),
		tipo: form.tipo,
		dataInicio: form.dataInicio,
		encerramento: form.encerramento,
		alertaDias: form.alertaDias,
		possuiContrato: contrato,
		vigenciaInicio: contrato ? form.vigenciaInicio : null,
		vigenciaFim: contrato ? form.vigenciaFim : null,
		contratado: contrato ? form.contratado.trim() : "",
		documento: contrato ? form.documento.trim() : "",
		valorTotalCentavos: contrato ? reaisParaCentavos(form.valorTotal) : null,
		valorMensalCentavos: contrato ? reaisParaCentavos(form.valorMensal) : null,
		status: form.status,
		historico: base.historico,
		equipeId: base.equipeId,
		autorId: base.autorId,
		autorNome: base.autorNome
	};
}
function AdminPainel({ equipeAtual, meuNome, sinalNovo, onToast, children }) {
	const { user } = useCurrentUserState();
	const [lista, setLista] = (0, import_react.useState)([]);
	const [pronto, setPronto] = (0, import_react.useState)(false);
	const [guia, setGuia] = (0, import_react.useState)("lista");
	const [filtro, setFiltro] = (0, import_react.useState)("andamento");
	const [tipoAba, setTipoAba] = (0, import_react.useState)("todos");
	const [busca, setBusca] = (0, import_react.useState)("");
	const [ordemCampo, setOrdemCampo] = (0, import_react.useState)("encerramento");
	const [ordemDir, setOrdemDir] = (0, import_react.useState)("asc");
	const [parte, setParte] = (0, import_react.useState)(0);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(vazio);
	const [erros, setErros] = (0, import_react.useState)([]);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [andamentoId, setAndamentoId] = (0, import_react.useState)(null);
	const [notaAndamento, setNotaAndamento] = (0, import_react.useState)("");
	const [novoEncerramento, setNovoEncerramento] = (0, import_react.useState)("");
	const [periodo, setPeriodo] = (0, import_react.useState)("mensal");
	const [ancora, setAncora] = (0, import_react.useState)(() => todayIso().slice(0, 7));
	const [statusRelatorio, setStatusRelatorio] = (0, import_react.useState)("todos");
	const [relatorio, setRelatorio] = (0, import_react.useState)(null);
	const tresColunas = useGradeTresColunas$1();
	const sinalVisto = (0, import_react.useRef)(sinalNovo);
	(0, import_react.useEffect)(() => {
		if (sinalNovo === sinalVisto.current) return;
		sinalVisto.current = sinalNovo;
		setEditing(null);
		setForm(vazio());
		setErros([]);
		setFormOpen(true);
		setGuia("lista");
	}, [sinalNovo]);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let cancelado = false;
		setPronto(false);
		listarAdmin({ data: equipeAtual }).then((itens) => {
			if (!cancelado) setLista(itens);
		}).catch(() => {
			if (!cancelado) {
				setLista([]);
				onToast("Não foi possível carregar os processos administrativos.");
			}
		}).finally(() => {
			if (!cancelado) setPronto(true);
		});
		return () => {
			cancelado = true;
		};
	}, [
		user?.id,
		equipeAtual,
		onToast
	]);
	(0, import_react.useEffect)(() => {
		setParte(0);
	}, [
		filtro,
		busca,
		tipoAba,
		ordemCampo,
		ordemDir,
		equipeAtual,
		tresColunas
	]);
	(0, import_react.useEffect)(() => {
		if (!pronto || typeof Notification === "undefined" || Notification.permission !== "granted") return;
		const disparar = () => {
			const enviados = new Set(avisosAdminEnviados());
			const novos = [];
			let mostrados = 0;
			for (const item of lista.filter((p) => precisaAvisoAdmin(p))) {
				const key = avisoAdminKey(item);
				if (enviados.has(key)) continue;
				novos.push(key);
				if (mostrados < 3) try {
					new Notification("Processo administrativo", {
						body: `${item.numero} — ${item.objeto}. ${prazoAdminLabel(item)}.`,
						tag: item.id
					});
					mostrados += 1;
				} catch {}
			}
			if (novos.length) marcarAvisosAdmin(novos);
		};
		disparar();
		const id = window.setInterval(disparar, 6e4);
		return () => window.clearInterval(id);
	}, [pronto, lista]);
	const filtrados = (0, import_react.useMemo)(() => {
		const q = busca.trim().toLowerCase();
		const itens = lista.filter((p) => {
			if (!(filtro === "todos" || filtro === "andamento" && p.status !== "concluido" || filtro === "aberto" && p.status === "aberto" || filtro === "execucao" && p.status === "execucao" || filtro === "concluidos" && p.status === "concluido" || filtro === "atencao" && precisaAvisoAdmin(p)) || tipoAba !== "todos" && p.tipo !== tipoAba) return false;
			if (!q) return true;
			return [
				p.numero,
				p.referencia,
				p.objeto,
				p.tipo,
				p.contratado,
				p.autorNome
			].join(" ").toLowerCase().includes(q);
		});
		const fator = ordemDir === "asc" ? 1 : -1;
		return [...itens].sort((a, b) => {
			const numero = a.numero.localeCompare(b.numero, "pt-BR", { numeric: true });
			return (ordemCampo === "numero" ? numero : ordemCampo === "tipo" ? a.tipo.localeCompare(b.tipo, "pt-BR") || numero : dataAlvo(a).localeCompare(dataAlvo(b)) || numero) * fator;
		});
	}, [
		lista,
		filtro,
		busca,
		tipoAba,
		ordemCampo,
		ordemDir
	]);
	const porParte = (tresColunas ? 3 : 1) * 5;
	const totalPartes = Math.max(1, Math.ceil(filtrados.length / porParte));
	const parteAtual = Math.min(parte, totalPartes - 1);
	const daParte = filtrados.slice(parteAtual * porParte, parteAtual * porParte + porParte);
	const atencao = lista.filter((p) => precisaAvisoAdmin(p));
	const contagem = {
		vencidos: lista.filter((p) => urgenciaAdmin(p) === "vencido").length,
		hoje: lista.filter((p) => urgenciaAdmin(p) === "hoje").length,
		proximos: lista.filter((p) => urgenciaAdmin(p) === "proximo").length,
		execucao: lista.filter((p) => p.status === "execucao").length
	};
	async function persistir(proximo, salvo, apagado, ok) {
		const anterior = lista;
		setLista(proximo);
		try {
			if (apagado) await apagarAdmin({ data: apagado });
			if (salvo) await salvarAdmin({ data: salvo });
			onToast(ok);
			return true;
		} catch (err) {
			setLista(anterior);
			onToast(err instanceof Error ? err.message : "Não foi possível salvar. Tente de novo.");
			return false;
		}
	}
	async function salvarForm() {
		const problemas = validar(form);
		setErros(problemas);
		if (problemas.length) return;
		const nota = form.nota.trim();
		if (editing) {
			const texto = mudancas(editing, form);
			const extra = [];
			if (texto) extra.push(evento$1(texto, meuNome));
			if (nota) extra.push(evento$1(nota, meuNome));
			const atualizado = montar(form, {
				...editing,
				historico: [...editing.historico, ...extra]
			});
			if (await persistir(lista.map((item) => item.id === atualizado.id ? atualizado : item), atualizado, null, "Processo atualizado")) setFormOpen(false);
			return;
		}
		const criado = montar(form, {
			id: crypto.randomUUID(),
			historico: nota ? [evento$1("Lançou o processo administrativo.", meuNome), evento$1(nota, meuNome)] : [evento$1("Lançou o processo administrativo.", meuNome)],
			equipeId: equipeAtual,
			autorId: user?.id ?? null,
			autorNome: meuNome
		});
		if (await persistir([criado, ...lista], criado, null, "Processo administrativo lançado")) setFormOpen(false);
	}
	function mudarStatus(id, status, texto, aviso) {
		const atual = lista.find((item) => item.id === id);
		if (!atual) return;
		const atualizado = {
			...atual,
			status,
			historico: [...atual.historico, evento$1(texto, meuNome)]
		};
		persistir(lista.map((item) => item.id === id ? atualizado : item), atualizado, null, aviso);
	}
	async function registrarAndamento() {
		if (!andamentoId) return;
		const texto = notaAndamento.trim();
		if (!texto) return;
		const atual = lista.find((item) => item.id === andamentoId);
		if (!atual) return;
		const atualizado = {
			...atual,
			encerramento: novoEncerramento || atual.encerramento,
			historico: [...atual.historico, evento$1(texto, meuNome)]
		};
		if (!await persistir(lista.map((item) => item.id === atualizado.id ? atualizado : item), atualizado, null, "Andamento registrado")) return;
		setAndamentoId(null);
		setNotaAndamento("");
		setNovoEncerramento("");
	}
	function gerarRelatorio() {
		const intervalo = intervaloPeriodo(ancora, periodo);
		if (!intervalo) {
			onToast("Escolha um mês de referência.");
			return;
		}
		const itens = lista.filter((item) => cruzaPeriodo(item, intervalo.inicio, intervalo.fim)).filter((item) => statusRelatorio === "todos" || item.status === statusRelatorio).sort((a, b) => dataAlvo(a).localeCompare(dataAlvo(b)) || a.numero.localeCompare(b.numero, "pt-BR", { numeric: true }));
		setRelatorio({
			...intervalo,
			itens
		});
	}
	const totalRelatorio = relatorio?.itens.reduce((soma, item) => soma + (item.valorTotalCentavos ?? 0), 0) ?? 0;
	const mensalRelatorio = relatorio?.itens.reduce((soma, item) => soma + (item.valorMensalCentavos ?? 0), 0) ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-6 md:grid-cols-[16rem_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex flex-col gap-4 md:sticky md:top-6 md:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
							valor: contagem.vencidos,
							rotulo: "Vencidos",
							tom: "seal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
							valor: contagem.hoje,
							rotulo: "Encerram hoje",
							tom: "seal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
							valor: contagem.proximos,
							rotulo: "Vencendo",
							tom: "brass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
							valor: contagem.execucao,
							rotulo: "Em execução",
							tom: "pine"
						})
					]
				}), children]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuiaBotao, {
							ativo: guia === "lista",
							onClick: () => setGuia("lista"),
							children: "Lista"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GuiaBotao, {
							ativo: guia === "estatisticas",
							onClick: () => setGuia("estatisticas"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }), "Estatísticas"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GuiaBotao, {
							ativo: guia === "relatorio",
							onClick: () => setGuia("relatorio"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Relatório"]
						})
					]
				}), !pronto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Carregando processos administrativos…"
				}) : guia === "estatisticas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraficoAdmin, { processos: lista }) : guia === "relatorio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "no-print rounded-2xl border border-line bg-sheet p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl text-ink",
								children: "Gerar relatório"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Entram os processos cujo início e encerramento cruzam o período. O gráfico acompanha o recorte."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Período",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: periodo,
											onChange: (e) => setPeriodo(e.target.value),
											className: inputCls$1,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "mensal",
													children: "Mensal"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "trimestral",
													children: "Trimestral"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "semestral",
													children: "Semestral"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "anual",
													children: "Anual"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Mês de referência",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "month",
											value: ancora,
											onChange: (e) => setAncora(e.target.value),
											className: inputCls$1
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Situação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: statusRelatorio,
											onChange: (e) => setStatusRelatorio(e.target.value),
											className: inputCls$1,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "todos",
													children: "Todos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "aberto",
													children: "Abertos"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "execucao",
													children: "Em execução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "concluido",
													children: "Concluídos"
												})
											]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: gerarRelatorio,
								className: "mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Gerar relatório"]
							})
						]
					}), relatorio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "relatorio-folha rounded-2xl border border-line bg-sheet p-4 md:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-pine",
										children: "Processos administrativos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "font-display text-3xl text-ink",
										children: ["Relatório · ", relatorio.rotulo]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											formatDate(relatorio.inicio),
											" a ",
											formatDate(relatorio.fim),
											" ·",
											" ",
											statusRelatorio === "todos" ? "todas as situações" : statusAdminLabel(statusRelatorio).toLowerCase(),
											" ·",
											" ",
											relatorio.itens.length,
											" ",
											relatorio.itens.length === 1 ? "processo" : "processos"
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.print(),
									className: "no-print inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-medium text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Imprimir ou salvar PDF"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-ink",
								children: [
									"Valor total dos contratos no recorte: ",
									formatarReais(totalRelatorio || null),
									" · mensal:",
									" ",
									formatarReais(mensalRelatorio || null)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraficoAdmin, { processos: relatorio.itens })
							}),
							relatorio.itens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: "Nenhum processo neste período."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[46rem] border-collapse text-left text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-line text-xs text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Número"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Referência"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Objeto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Tipo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Situação"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Encerramento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 pr-3 font-medium",
												children: "Contratado"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2 font-medium",
												children: "Valores"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-line align-top",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 font-medium text-ink",
												children: item.numero
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: item.referencia || "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: item.objeto
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: item.tipo
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: statusAdminLabel(item.status)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: formatDate(item.encerramento)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 pr-3 text-ink",
												children: item.possuiContrato ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [item.contratado, item.documento ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-muted",
													children: item.documento
												}) : null] }) : "Sem contrato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 text-ink",
												children: item.possuiContrato ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [formatarReais(item.valorTotalCentavos), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "block text-xs text-muted",
													children: [formatarReais(item.valorMensalCentavos), " / mês"]
												})] }) : "—"
											})
										]
									}, item.id)) })]
								})
							})
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					atencao.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "status",
						className: "mb-4 rounded-2xl border border-line bg-sheet p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: atencao.length === 1 ? "1 encerramento precisa de atenção" : `${atencao.length} encerramentos precisam de atenção`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 flex flex-col gap-2",
							children: atencao.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-ink",
										children: item.numero
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-pine",
										children: [" · ", item.tipo]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-ink",
										children: item.objeto
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: prazoAdminLabel(item)
									})
								]
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aba, {
									ativo: tipoAba === "todos",
									onClick: () => setTipoAba("todos"),
									children: "Todos"
								}), MODALIDADES.map((tipo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aba, {
									ativo: tipoAba === tipo,
									onClick: () => setTipoAba(tipo),
									children: tipo
								}, tipo))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: FILTROS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aba, {
									ativo: filtro === item.id,
									ink: true,
									onClick: () => setFiltro(item.id),
									children: item.label
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row sm:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: busca,
										onChange: (e) => setBusca(e.target.value),
										placeholder: "Buscar número, objeto, referência ou contratado",
										className: inputCls$1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-muted",
										children: ["Ordenar", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: ordemCampo,
											onChange: (e) => setOrdemCampo(e.target.value),
											className: "h-10 rounded-full border border-line bg-sheet px-3 text-sm text-ink",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "numero",
													children: "Número"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "tipo",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "encerramento",
													children: "Encerramento"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOrdemDir((dir) => dir === "asc" ? "desc" : "asc"),
										className: "h-10 rounded-full border border-line bg-sheet px-3 text-sm font-medium text-ink",
										children: ordemDir === "asc" ? "Crescente" : "Decrescente"
									})
								]
							})
						]
					}),
					filtrados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-ink",
							children: "Nenhum processo administrativo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-sm text-sm text-muted",
							children: lista.length === 0 ? "Lance o primeiro com número, objeto, modalidade e encerramento." : "Nada corresponde a este filtro ou à busca."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 " + (tresColunas ? "grid-cols-3" : "grid-cols-1"),
						children: daParte.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAdmin, {
							processo: item,
							onEditar: () => {
								setEditing(item);
								setForm(doProcesso(item));
								setErros([]);
								setFormOpen(true);
							},
							onAndamento: () => {
								setAndamentoId(item.id);
								setNotaAndamento("");
								setNovoEncerramento("");
							},
							onExecucao: () => mudarStatus(item.id, "execucao", "Marcou como em execução.", "Em execução"),
							onConcluir: () => mudarStatus(item.id, "concluido", "Marcou como concluído.", "Marcado como concluído"),
							onReabrir: () => mudarStatus(item.id, "aberto", "Reabriu o processo.", "Processo reaberto"),
							onExcluir: () => setDeleteId(item.id)
						}, item.id))
					}),
					filtrados.length > porParte && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mt-4 flex flex-col items-center gap-3",
						"aria-label": "Páginas da lista",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								parteAtual + 1,
								" de ",
								totalPartes,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									" · ",
									filtrados.length,
									" processos"
								] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex max-w-full gap-2 overflow-x-auto pb-1",
							children: Array.from({ length: totalPartes }, (_, indice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setParte(indice),
								"aria-current": indice === parteAtual ? "page" : void 0,
								className: "grid size-10 shrink-0 place-items-center rounded-full text-sm font-medium " + (indice === parteAtual ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
								children: indice + 1
							}, indice))
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-10 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-4 bottom-4 z-10 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: editing ? "Editar processo administrativo" : "Lançar processo administrativo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "Modalidades da Lei 14.133, com contrato e aviso antes do encerramento."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							className: "grid size-10 place-items-center rounded-lg text-muted",
							"aria-label": "Fechar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex min-h-0 flex-1 flex-col",
						onSubmit: (e) => {
							e.preventDefault();
							salvarForm();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 overflow-y-auto px-5 py-4",
							children: [
								erros.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
									children: erros.map((erro) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: erro }, erro))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "Número do processo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.numero,
										onChange: (e) => setForm({
											...form,
											numero: e.target.value
										}),
										className: inputCls$1,
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "Referência",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.referencia,
										onChange: (e) => setForm({
											...form,
											referencia: e.target.value
										}),
										className: inputCls$1,
										placeholder: "PA, contrato ou memorando"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "Objeto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.objeto,
										onChange: (e) => setForm({
											...form,
											objeto: e.target.value
										}),
										className: inputCls$1,
										placeholder: "O que será contratado ou comprado",
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Tipo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: form.tipo,
											onChange: (e) => setForm({
												...form,
												tipo: e.target.value
											}),
											className: inputCls$1,
											children: MODALIDADES.map((tipo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: tipo }, tipo))
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Situação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.status,
											onChange: (e) => setForm({
												...form,
												status: e.target.value
											}),
											className: inputCls$1,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "aberto",
													children: "Aberto"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "execucao",
													children: "Em execução"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "concluido",
													children: "Concluído"
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Data de início",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: form.dataInicio,
											onChange: (e) => setForm({
												...form,
												dataInicio: e.target.value
											}),
											className: inputCls$1,
											required: true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Encerramento",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: form.encerramento,
											onChange: (e) => setForm({
												...form,
												encerramento: e.target.value
											}),
											className: inputCls$1,
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "Avisar dias antes do encerramento",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.alertaDias,
										onChange: (e) => setForm({
											...form,
											alertaDias: Number(e.target.value)
										}),
										className: inputCls$1,
										children: ALERTAS.map((dias) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: dias,
											children: dias === 1 ? "1 dia" : `${dias} dias`
										}, dias))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm font-medium text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: form.possuiContrato,
										onChange: (e) => setForm({
											...form,
											possuiContrato: e.target.checked
										}),
										className: "size-4 accent-pine"
									}), "Possui contrato"]
								}),
								form.possuiContrato && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 rounded-2xl border border-line bg-paper p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: "O aviso passa a contar do fim da vigência."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
												label: "Vigência — início",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: form.vigenciaInicio,
													onChange: (e) => setForm({
														...form,
														vigenciaInicio: e.target.value
													}),
													className: inputCls$1,
													required: true
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
												label: "Vigência — fim",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: form.vigenciaFim,
													onChange: (e) => setForm({
														...form,
														vigenciaFim: e.target.value
													}),
													className: inputCls$1,
													required: true
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Contratado",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.contratado,
												onChange: (e) => setForm({
													...form,
													contratado: e.target.value
												}),
												className: inputCls$1,
												placeholder: "Nome ou razão social",
												required: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "CPF ou CNPJ",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.documento,
												onChange: (e) => setForm({
													...form,
													documento: e.target.value
												}),
												className: inputCls$1,
												placeholder: "Opcional"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
												label: "Valor total",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: form.valorTotal,
													onChange: (e) => setForm({
														...form,
														valorTotal: e.target.value
													}),
													className: inputCls$1,
													inputMode: "decimal",
													placeholder: "0,00"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
												label: "Valor mensal",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: form.valorMensal,
													onChange: (e) => setForm({
														...form,
														valorMensal: e.target.value
													}),
													className: inputCls$1,
													inputMode: "decimal",
													placeholder: "0,00"
												})
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "Nota do lançamento",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: form.nota,
										onChange: (e) => setForm({
											...form,
											nota: e.target.value
										}),
										className: "min-h-20 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 border-t border-line px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								type: "button",
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-pine text-sm font-medium text-sheet",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Salvar"]
							})]
						})]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: andamentoId !== null,
				onOpenChange: (open) => !open && setAndamentoId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-10 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-1/2 z-10 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl text-ink",
						children: "Andamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 flex flex-col gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							registrarAndamento();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
								label: "O que aconteceu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notaAndamento,
									onChange: (e) => setNotaAndamento(e.target.value),
									className: "min-h-24 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
								label: "Novo encerramento, se mudou",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: novoEncerramento,
									onChange: (e) => setNovoEncerramento(e.target.value),
									className: inputCls$1
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet",
								children: "Registrar"
							})
						]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteId !== null,
				onOpenChange: (open) => !open && setDeleteId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-10 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-sm md:-translate-x-1/2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: "Excluir processo?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "O lançamento e o histórico saem da lista."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								type: "button",
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									if (!deleteId) return;
									const id = deleteId;
									setDeleteId(null);
									persistir(lista.filter((item) => item.id !== id), null, id, "Processo excluído");
								},
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-seal text-sm font-medium text-sheet",
								children: "Excluir"
							})]
						})
					]
				})] })
			})
		]
	});
}
function CardAdmin({ processo, onEditar, onAndamento, onExecucao, onConcluir, onReabrir, onExcluir }) {
	const [aberto, setAberto] = (0, import_react.useState)(false);
	const tom = TOM$1[urgenciaAdmin(processo)];
	const ultimo = processo.historico[processo.historico.length - 1];
	const alvo = dataAlvo(processo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inset-y-0 left-0 w-1.5 ${tom.bar}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-4 py-4 pl-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `w-fit rounded-full px-2 py-1 text-xs font-medium ${tom.badge}`,
					children: prazoAdminLabel(processo)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl leading-none tracking-tight text-ink",
					children: processo.numero
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold text-pine",
					children: processo.tipo
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-base font-semibold text-ink",
					children: processo.objeto
				}),
				processo.referencia && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Ref. ", processo.referencia]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						statusAdminLabel(processo.status),
						" · lançado por ",
						processo.autorNome || "sem nome"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Início"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: formatDate(processo.dataInicio)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3" }), "Encerramento"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: formatDate(processo.encerramento)
					})] })]
				}),
				processo.possuiContrato && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-ink",
					children: [processo.contratado, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted",
						children: [
							"Vigência ",
							processo.vigenciaInicio ? formatDate(processo.vigenciaInicio) : "—",
							" a",
							" ",
							processo.vigenciaFim ? formatDate(processo.vigenciaFim) : "—",
							" · ",
							formatarReais(processo.valorTotalCentavos),
							" · ",
							formatarReais(processo.valorMensalCentavos),
							" / mês",
							processo.status !== "concluido" && daysUntil(alvo) > 0 ? ` · aviso ${processo.alertaDias} dias antes` : ""
						]
					})]
				}),
				ultimo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"Último · ",
							ultimo.autorNome || "sem nome",
							" · "
						]
					}), ultimo.texto]
				}),
				processo.historico.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setAberto((v) => !v),
					className: "mt-2 text-left text-sm font-medium text-pine",
					children: aberto ? "Ocultar histórico" : `Ver histórico (${processo.historico.length})`
				}),
				aberto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 flex flex-col gap-2 border-t border-line pt-2",
					children: [...processo.historico].reverse().map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								new Intl.DateTimeFormat("pt-BR", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit"
								}).format(new Date(item.em)),
								" · ",
								item.autorNome || "sem nome"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-ink",
							children: item.texto
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap gap-2 pt-4",
					children: [
						processo.status !== "concluido" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onAndamento,
							className: "inline-flex h-10 items-center rounded-lg bg-pine-soft px-3 text-sm font-medium text-pine",
							children: "Andamento"
						}),
						processo.status === "aberto" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onExecucao,
							className: "inline-flex h-10 items-center rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: "Em execução"
						}),
						processo.status !== "concluido" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onConcluir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Concluir"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onReabrir,
							className: "inline-flex h-10 items-center rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: "Reabrir"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onEditar,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onExcluir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-seal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Excluir"]
						})
					]
				})
			]
		})]
	});
}
function Campo$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1 text-sm font-medium text-ink",
		children: [label, children]
	});
}
function Resumo$1({ valor, rotulo, tom }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-sheet px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `font-display text-3xl leading-none ${tom === "seal" ? "text-seal" : tom === "brass" ? "text-brass" : "text-pine"}`,
			children: valor
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: rotulo
		})]
	});
}
function GuiaBotao({ ativo, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium " + (ativo ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
		children
	});
}
function Aba({ ativo, onClick, children, ink }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "h-10 shrink-0 rounded-full px-3 text-sm font-medium " + (ativo ? ink ? "bg-ink text-sheet" : "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
		children
	});
}
var FILTROS = [
	{
		id: "abertos",
		label: "Abertos"
	},
	{
		id: "atencao",
		label: "Atenção"
	},
	{
		id: "vencidos",
		label: "Vencidos"
	},
	{
		id: "prazo",
		label: "No prazo"
	},
	{
		id: "concluidos",
		label: "Concluídos"
	},
	{
		id: "todos",
		label: "Todos"
	}
];
var ALERTA_OPCOES = [
	1,
	2,
	3,
	5,
	7,
	10,
	15,
	30
];
var ABAS_TIPO = [
	{
		id: "todos",
		label: "Todos"
	},
	{
		id: "Requerimentos",
		label: "Requerimentos"
	},
	{
		id: "Indicações",
		label: "Indicações"
	},
	{
		id: "Projetos de Lei",
		label: "Projetos de Lei"
	},
	{
		id: "Outros",
		label: "Outros"
	}
];
function evento(texto, autorNome) {
	return {
		id: crypto.randomUUID(),
		em: (/* @__PURE__ */ new Date()).toISOString(),
		texto,
		autorNome
	};
}
function textoMudanca(antes, form) {
	const partes = [];
	if (antes.numero !== form.numero.trim()) partes.push("o número");
	if (antes.parte !== form.parte.trim()) partes.push("a parte");
	if (antes.assunto !== form.assunto.trim()) partes.push("o assunto");
	if (antes.tipo !== form.tipo) partes.push(`o tipo para ${form.tipo}`);
	if (antes.dataLancamento !== form.dataLancamento) partes.push("a data de lançamento");
	if (antes.prazo !== form.prazo) partes.push(`o prazo para ${formatDate(form.prazo)}`);
	if (antes.alertaDias !== form.alertaDias) partes.push("a antecedência do aviso");
	if (!partes.length) return null;
	if (partes.length === 1) return `Alterou ${partes[0]}.`;
	const ultimo = partes.pop();
	return `Alterou ${partes.join(", ")} e ${ultimo}.`;
}
function classificar(lista, campo, dir) {
	const fator = dir === "asc" ? 1 : -1;
	return [...lista].sort((a, b) => {
		const numero = a.numero.localeCompare(b.numero, "pt-BR", { numeric: true });
		return (campo === "numero" ? numero : campo === "tipo" ? a.tipo.localeCompare(b.tipo, "pt-BR") || numero : a.prazo.localeCompare(b.prazo) || numero) * fator;
	});
}
function useGradeTresColunas() {
	const [tres, setTres] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const aplicar = () => setTres(mq.matches);
		aplicar();
		mq.addEventListener("change", aplicar);
		return () => mq.removeEventListener("change", aplicar);
	}, []);
	return tres;
}
function emptyForm() {
	return {
		numero: "",
		parte: "",
		assunto: "",
		tipo: "Requerimentos",
		dataLancamento: todayIso(),
		prazo: addDaysIso(15),
		alertaDias: 3,
		nota: ""
	};
}
function formFrom(p) {
	return {
		numero: p.numero,
		parte: p.parte,
		assunto: p.assunto,
		tipo: p.tipo,
		dataLancamento: p.dataLancamento,
		prazo: p.prazo,
		alertaDias: p.alertaDias,
		nota: ""
	};
}
var TOM = {
	vencido: {
		badge: "bg-seal-soft text-seal",
		bar: "bg-seal",
		label: "Vencido"
	},
	hoje: {
		badge: "bg-seal-soft text-seal",
		bar: "bg-seal",
		label: "Hoje"
	},
	proximo: {
		badge: "bg-brass-soft text-brass",
		bar: "bg-brass",
		label: "Vencendo"
	},
	ok: {
		badge: "bg-pine-soft text-pine",
		bar: "bg-pine",
		label: "No prazo"
	},
	concluido: {
		badge: "bg-line text-muted",
		bar: "bg-line",
		label: "Concluído"
	}
};
function PrazosApp() {
	const { user, isPending } = useCurrentUserState();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [contaId, setContaId] = (0, import_react.useState)(null);
	const [processos, setProcessos] = (0, import_react.useState)([]);
	const [filtro, setFiltro] = (0, import_react.useState)("abertos");
	const [busca, setBusca] = (0, import_react.useState)("");
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [erros, setErros] = (0, import_react.useState)([]);
	const [andamentoId, setAndamentoId] = (0, import_react.useState)(null);
	const [notaAndamento, setNotaAndamento] = (0, import_react.useState)("");
	const [novoPrazo, setNovoPrazo] = (0, import_react.useState)("");
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [perm, setPerm] = (0, import_react.useState)("unsupported");
	const [toast, setToast] = (0, import_react.useState)("");
	const [equipes, setEquipes] = (0, import_react.useState)([]);
	const [equipeAtual, setEquipeAtual] = (0, import_react.useState)(null);
	const [tipoAba, setTipoAba] = (0, import_react.useState)("todos");
	const [ordemCampo, setOrdemCampo] = (0, import_react.useState)("prazo");
	const [ordemDir, setOrdemDir] = (0, import_react.useState)("asc");
	const [guia, setGuia] = (0, import_react.useState)("lista");
	const [perfilOpen, setPerfilOpen] = (0, import_react.useState)(false);
	const [nomePerfil, setNomePerfil] = (0, import_react.useState)("");
	const [salvandoPerfil, setSalvandoPerfil] = (0, import_react.useState)(false);
	const [parte, setParte] = (0, import_react.useState)(0);
	const [area, setArea] = (0, import_react.useState)("legislativo");
	const [sinalNovoAdmin, setSinalNovoAdmin] = (0, import_react.useState)(0);
	const tresColunas = useGradeTresColunas();
	const meuNome = user?.displayName?.trim() || "Sem nome";
	(0, import_react.useEffect)(() => {
		if (typeof Notification === "undefined") setPerm("unsupported");
		else setPerm(Notification.permission);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let cancelado = false;
		const usuarioId = user.id;
		const equipeId = equipeAtual;
		if (contaId !== usuarioId) setReady(false);
		setProcessos([]);
		(async () => {
			try {
				const minhas = await listarEquipes();
				if (cancelado) return;
				setEquipes(minhas);
				const aindaExiste = equipeId === null || minhas.some((equipe) => equipe.id === equipeId);
				const alvo = aindaExiste ? equipeId : null;
				if (!aindaExiste) setEquipeAtual(null);
				let lista = await listarProcessos({ data: alvo });
				const marca = `prazos.importado.${usuarioId}`;
				if (!alvo && lista.length === 0 && localStorage.getItem(marca) !== "1") {
					const locais = lerProcessosLocais();
					for (const item of locais) await salvarProcesso({ data: {
						...item,
						equipeId: null
					} });
					if (locais.length) lista = await listarProcessos({ data: null });
					localStorage.setItem(marca, "1");
					if (!cancelado && locais.length) setToast("Processos deste navegador foram salvos na sua conta.");
				}
				if (cancelado) return;
				setProcessos(lista);
				setContaId(usuarioId);
				setReady(true);
			} catch {
				if (cancelado) return;
				setProcessos([]);
				setContaId(usuarioId);
				setToast("Não foi possível carregar seus processos.");
				setReady(true);
			}
		})();
		return () => {
			cancelado = true;
		};
	}, [user?.id, equipeAtual]);
	const atencao = (0, import_react.useMemo)(() => ordenar(processos.filter((p) => precisaAviso(p))), [processos]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const n = atencao.length;
		document.title = n > 0 ? `(${n}) Controle de Prazos` : "Controle de Prazos";
	}, [atencao.length, ready]);
	(0, import_react.useEffect)(() => {
		if (!ready || perm !== "granted") return;
		const disparar = () => {
			if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
			const enviados = new Set(avisosJaEnviados());
			const novos = [];
			let mostrados = 0;
			for (const p of ordenar(processos).filter((p) => precisaAviso(p))) {
				const key = avisoKey(p);
				if (enviados.has(key)) continue;
				novos.push(key);
				if (mostrados < 3) {
					const titulo = urgencia(p) === "vencido" ? "Prazo vencido" : urgencia(p) === "hoje" ? "Prazo vence hoje" : "Prazo vencendo";
					try {
						new Notification(titulo, {
							body: `${p.numero} — ${p.assunto}. ${prazoLabel(p)}.`,
							tag: p.id
						});
						mostrados += 1;
					} catch {}
				}
			}
			if (novos.length) marcarAvisos(novos);
		};
		disparar();
		const id = window.setInterval(disparar, 6e4);
		const aoVoltar = () => {
			if (document.visibilityState === "visible") disparar();
		};
		document.addEventListener("visibilitychange", aoVoltar);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", aoVoltar);
		};
	}, [
		ready,
		perm,
		processos
	]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => setToast(""), 2400);
		return () => window.clearTimeout(id);
	}, [toast]);
	const filtrados = (0, import_react.useMemo)(() => {
		const q = busca.trim().toLowerCase();
		return classificar(processos.filter((p) => {
			const u = urgencia(p);
			const passaFiltro = filtro === "todos" || filtro === "abertos" && p.status === "andamento" || filtro === "atencao" && precisaAviso(p) || filtro === "vencidos" && u === "vencido" || filtro === "prazo" && u === "ok" || filtro === "concluidos" && p.status === "concluido";
			const passaTipo = tipoAba === "todos" || p.tipo === tipoAba;
			if (!passaFiltro || !passaTipo) return false;
			if (!q) return true;
			return [
				p.numero,
				p.parte,
				p.assunto,
				p.tipo,
				p.autorNome
			].join(" ").toLowerCase().includes(q);
		}), ordemCampo, ordemDir);
	}, [
		processos,
		filtro,
		busca,
		tipoAba,
		ordemCampo,
		ordemDir
	]);
	const porParte = (tresColunas ? 3 : 1) * 5;
	const totalPartes = Math.max(1, Math.ceil(filtrados.length / porParte));
	const parteAtual = Math.min(parte, totalPartes - 1);
	const daParte = filtrados.slice(parteAtual * porParte, parteAtual * porParte + porParte);
	(0, import_react.useEffect)(() => {
		setParte(0);
	}, [
		filtro,
		busca,
		tipoAba,
		ordemCampo,
		ordemDir,
		equipeAtual,
		tresColunas
	]);
	const contagem = (0, import_react.useMemo)(() => {
		let vencidos = 0;
		let hoje = 0;
		let proximos = 0;
		let abertos = 0;
		for (const p of processos) {
			const u = urgencia(p);
			if (p.status === "andamento") abertos += 1;
			if (u === "vencido") vencidos += 1;
			if (u === "hoje") hoje += 1;
			if (u === "proximo") proximos += 1;
		}
		return {
			vencidos,
			hoje,
			proximos,
			abertos
		};
	}, [processos]);
	function abrirNovo() {
		setEditing(null);
		setForm(emptyForm());
		setErros([]);
		setFormOpen(true);
	}
	function abrirEdicao(p) {
		setEditing(p);
		setForm(formFrom(p));
		setErros([]);
		setFormOpen(true);
	}
	function validar(f) {
		const lista = [];
		if (!f.numero.trim()) lista.push("Informe o número do processo.");
		if (!f.parte.trim()) lista.push("Informe a parte ou o cliente.");
		if (!f.assunto.trim()) lista.push("Informe o assunto.");
		if (!f.dataLancamento) lista.push("Informe a data de lançamento.");
		if (!f.prazo) lista.push("Informe o prazo de resposta ou andamento.");
		return lista;
	}
	async function persistir(proximo, salvo, apagado, ok) {
		const anterior = processos;
		setProcessos(proximo);
		try {
			if (apagado) await apagarProcesso({ data: apagado });
			if (salvo) await salvarProcesso({ data: salvo });
			setToast(ok);
			return true;
		} catch {
			setProcessos(anterior);
			setToast("Não foi possível salvar. Tente de novo.");
			return false;
		}
	}
	async function salvarForm() {
		const problemas = validar(form);
		setErros(problemas);
		if (problemas.length) return;
		const nota = form.nota.trim();
		if (editing) {
			const mudou = textoMudanca(editing, form);
			const extra = [];
			if (mudou) extra.push(evento(mudou, meuNome));
			if (nota) extra.push(evento(nota, meuNome));
			const atualizado = {
				...editing,
				numero: form.numero.trim(),
				parte: form.parte.trim(),
				assunto: form.assunto.trim(),
				tipo: form.tipo,
				dataLancamento: form.dataLancamento,
				prazo: form.prazo,
				alertaDias: form.alertaDias,
				historico: [...editing.historico, ...extra]
			};
			if (await persistir(processos.map((p) => p.id === atualizado.id ? atualizado : p), atualizado, null, "Processo atualizado")) setFormOpen(false);
			return;
		}
		const criado = {
			id: crypto.randomUUID(),
			numero: form.numero.trim(),
			parte: form.parte.trim(),
			assunto: form.assunto.trim(),
			tipo: form.tipo,
			dataLancamento: form.dataLancamento,
			prazo: form.prazo,
			alertaDias: form.alertaDias,
			status: "andamento",
			historico: nota ? [evento("Lançou o processo.", meuNome), evento(nota, meuNome)] : [evento("Lançou o processo.", meuNome)],
			equipeId: equipeAtual,
			autorId: user?.id ?? null,
			autorNome: meuNome
		};
		if (await persistir([criado, ...processos], criado, null, "Processo lançado")) setFormOpen(false);
	}
	async function registrarAndamento() {
		if (!andamentoId) return;
		const texto = notaAndamento.trim();
		if (!texto) return;
		const atual = processos.find((p) => p.id === andamentoId);
		if (!atual) return;
		const atualizado = {
			...atual,
			prazo: novoPrazo || atual.prazo,
			historico: [...atual.historico, evento(texto, meuNome)]
		};
		if (!await persistir(processos.map((p) => p.id === atualizado.id ? atualizado : p), atualizado, null, "Andamento registrado")) return;
		setAndamentoId(null);
		setNotaAndamento("");
		setNovoPrazo("");
	}
	function concluir(id) {
		const atual = processos.find((p) => p.id === id);
		if (!atual) return;
		const atualizado = {
			...atual,
			status: "concluido",
			historico: [...atual.historico, {
				id: crypto.randomUUID(),
				em: (/* @__PURE__ */ new Date()).toISOString(),
				texto: "Marcou como concluído.",
				autorNome: meuNome
			}]
		};
		persistir(processos.map((p) => p.id === id ? atualizado : p), atualizado, null, "Marcado como concluído");
	}
	function reabrir(id) {
		const atual = processos.find((p) => p.id === id);
		if (!atual) return;
		const atualizado = {
			...atual,
			status: "andamento",
			historico: [...atual.historico, {
				id: crypto.randomUUID(),
				em: (/* @__PURE__ */ new Date()).toISOString(),
				texto: "Reabriu o processo.",
				autorNome: meuNome
			}]
		};
		persistir(processos.map((p) => p.id === id ? atualizado : p), atualizado, null, "Processo reaberto");
	}
	function excluir() {
		if (!deleteId) return;
		const id = deleteId;
		setDeleteId(null);
		persistir(processos.filter((p) => p.id !== id), null, id, "Processo excluído");
	}
	const equipeSelecionada = equipes.find((equipe) => equipe.id === equipeAtual) ?? null;
	async function criarNovaEquipe(nome) {
		try {
			const criada = await criarEquipe({ data: nome });
			setEquipeAtual(criada.id);
			setToast(`Equipe ${criada.nome} criada`);
		} catch (err) {
			setToast(err instanceof Error ? err.message : "Não foi possível criar a equipe.");
		}
	}
	async function incluirNaEquipe(email) {
		if (!equipeAtual) return;
		try {
			const resultado = await adicionarNaEquipe({ data: {
				equipeId: equipeAtual,
				email
			} });
			setEquipes(await listarEquipes());
			setToast(resultado.entrou ? `${resultado.nome} agora vê os processos desta equipe.` : "Convite guardado. A pessoa entra quando criar a conta com este e-mail.");
		} catch (err) {
			setToast(err instanceof Error ? err.message : "Não foi possível adicionar.");
		}
	}
	async function tirarDaEquipe(email) {
		if (!equipeAtual) return;
		try {
			await removerDaEquipe({ data: {
				equipeId: equipeAtual,
				email
			} });
			const minhas = await listarEquipes();
			setEquipes(minhas);
			if (!minhas.some((equipe) => equipe.id === equipeAtual)) setEquipeAtual(null);
			setToast("Equipe atualizada");
		} catch (err) {
			setToast(err instanceof Error ? err.message : "Não foi possível atualizar a equipe.");
		}
	}
	async function salvarPerfil() {
		const nome = nomePerfil.trim();
		if (nome.length < 2) {
			setToast("Informe seu nome.");
			return;
		}
		setSalvandoPerfil(true);
		try {
			if ((await authClient.updateUser({ name: nome })).error) {
				setToast("Não foi possível atualizar o perfil.");
				return;
			}
			setPerfilOpen(false);
			setToast("Perfil atualizado");
		} catch {
			setToast("Não foi possível atualizar o perfil.");
		} finally {
			setSalvandoPerfil(false);
		}
	}
	async function ativarAvisos() {
		if (typeof Notification === "undefined") {
			setPerm("unsupported");
			return;
		}
		try {
			const resultado = await Notification.requestPermission();
			setPerm(resultado);
			if (resultado === "granted") setToast("Avisos do navegador ativados");
		} catch {
			setPerm("denied");
		}
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl text-ink",
			children: "Prazos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Verificando sua conta…"
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelaConta, {});
	if (!ready || contaId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl text-ink",
			children: "Prazos"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Carregando seus processos…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-8 md:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/favicon.svg",
						alt: "",
						className: "size-11 shrink-0 rounded-xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-pine",
						children: "Controle de prazos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-none text-ink",
						children: "Prazos"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setNomePerfil(user.displayName ?? "");
								setPerfilOpen(true);
							},
							className: "inline-flex h-11 items-center justify-center rounded-xl border border-line bg-sheet px-4 text-sm font-medium text-ink",
							children: "Perfil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								if (area === "administrativo") setSinalNovoAdmin((n) => n + 1);
								else abrirNovo();
							},
							className: "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Novo processo"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2",
				role: "tablist",
				"aria-label": "Área",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": area === "legislativo",
					onClick: () => setArea("legislativo"),
					className: "h-12 rounded-xl px-4 text-sm font-medium " + (area === "legislativo" ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
					children: "Processos legislativos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": area === "administrativo",
					onClick: () => setArea("administrativo"),
					className: "h-12 rounded-xl px-4 text-sm font-medium " + (area === "administrativo" ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
					children: "Processos administrativos"
				})]
			}),
			area === "administrativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminPainel, {
				equipeAtual,
				meuNome,
				sinalNovo: sinalNovoAdmin,
				onToast: setToast,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainelEquipe, {
					equipes,
					atual: equipeAtual,
					meuEmail: user.primaryEmail ?? "",
					onEscolher: setEquipeAtual,
					onCriar: criarNovaEquipe,
					onAdicionar: incluirNaEquipe,
					onRemover: tirarDaEquipe
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaixaAvisos, {
					perm,
					onAtivar: ativarAvisos
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-6 md:grid-cols-[16rem_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex flex-col gap-4 md:sticky md:top-6 md:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo, {
									valor: contagem.vencidos,
									rotulo: "Vencidos",
									tom: "seal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo, {
									valor: contagem.hoje,
									rotulo: "Vencem hoje",
									tom: "seal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo, {
									valor: contagem.proximos,
									rotulo: "Vencendo",
									tom: "brass"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo, {
									valor: contagem.abertos,
									rotulo: "Em aberto",
									tom: "pine"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainelEquipe, {
							equipes,
							atual: equipeAtual,
							meuEmail: user.primaryEmail ?? "",
							onEscolher: setEquipeAtual,
							onCriar: criarNovaEquipe,
							onAdicionar: incluirNaEquipe,
							onRemover: tirarDaEquipe
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-line bg-sheet p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm font-medium text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-pine" }), "Avisos"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextoAvisos, {
								perm,
								onAtivar: ativarAvisos
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setGuia("lista"),
							className: "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium " + (guia === "lista" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
							children: "Lista"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setGuia("estatisticas"),
							className: "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium " + (guia === "estatisticas" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }), "Estatísticas"]
						})]
					}), guia === "estatisticas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainelEstatisticas, { processos }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						atencao.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "status",
							"aria-live": "polite",
							className: "mb-4 rounded-2xl border border-line bg-sheet p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-ink",
									children: atencao.length === 1 ? "1 prazo precisa de atenção" : `${atencao.length} prazos precisam de atenção`
								}),
								equipeSelecionada && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										"A equipe ",
										equipeSelecionada.nome,
										" acompanha estes prazos junta — ",
										equipeSelecionada.membros.length,
										" ",
										equipeSelecionada.membros.length === 1 ? "pessoa" : "pessoas",
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 flex flex-col gap-2",
									children: atencao.slice(0, 4).map((p) => {
										const u = urgencia(p);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${TOM[u].bar}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-ink",
														children: p.numero
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-pine",
														children: [" · ", p.tipo]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-ink",
														children: p.parte
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted",
														children: [" · ", p.assunto]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-muted",
														children: [
															prazoLabel(p),
															" · ",
															formatDate(p.prazo)
														]
													})
												]
											})]
										}, p.id);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Buscar processo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: busca,
											onChange: (e) => setBusca(e.target.value),
											placeholder: "Buscar número, parte ou assunto",
											className: "h-12 w-full rounded-xl border border-line bg-sheet pr-3 pl-10 text-sm text-ink placeholder:text-muted"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-1",
									role: "tablist",
									"aria-label": "Tipo de processo",
									children: ABAS_TIPO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										role: "tab",
										"aria-selected": tipoAba === item.id,
										onClick: () => setTipoAba(item.id),
										className: "h-10 shrink-0 rounded-full px-3 text-sm font-medium " + (tipoAba === item.id ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
										children: item.label
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 overflow-x-auto pb-1",
									children: FILTROS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFiltro(item.id),
										className: "h-10 shrink-0 rounded-full px-3 text-sm font-medium " + (filtro === item.id ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
										children: item.label
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm text-muted",
										children: ["Ordenar", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: ordemCampo,
											onChange: (e) => setOrdemCampo(e.target.value),
											className: "h-10 rounded-full border border-line bg-sheet px-3 text-sm text-ink",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "numero",
													children: "Número"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "tipo",
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "prazo",
													children: "Prazo"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setOrdemDir((dir) => dir === "asc" ? "desc" : "asc"),
										className: "h-10 rounded-full border border-line bg-sheet px-3 text-sm font-medium text-ink",
										children: ordemDir === "asc" ? "Crescente" : "Decrescente"
									})]
								})
							]
						}),
						filtrados.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-ink",
									children: "Nenhum processo aqui"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-2 max-w-sm text-sm text-muted",
									children: processos.length === 0 ? equipeSelecionada ? "Nenhum processo nesta equipe. Lance um para todos acompanharem o prazo." : "Lance o primeiro processo com a data e o prazo de resposta." : "Nada corresponde a este filtro ou à busca."
								}),
								processos.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: abrirNovo,
									className: "mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Lançar processo"]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-3 " + (tresColunas ? "grid-cols-3" : "grid-cols-1"),
							children: daParte.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessoCard, {
								processo: p,
								onEditar: () => abrirEdicao(p),
								onAndamento: () => {
									setAndamentoId(p.id);
									setNotaAndamento("");
									setNovoPrazo("");
								},
								onConcluir: () => concluir(p.id),
								onReabrir: () => reabrir(p.id),
								onExcluir: () => setDeleteId(p.id)
							}, p.id))
						}),
						filtrados.length > porParte && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "mt-4 flex flex-col items-center gap-3",
							"aria-label": "Páginas da lista",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									parteAtual + 1,
									" de ",
									totalPartes,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [
											" · ",
											filtrados.length,
											" processos"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex max-w-full gap-2 overflow-x-auto pb-1",
								children: Array.from({ length: totalPartes }, (_, indice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setParte(indice),
									"aria-current": indice === parteAtual ? "page" : void 0,
									className: "grid size-10 shrink-0 place-items-center rounded-full text-sm font-medium " + (indice === parteAtual ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
									children: indice + 1
								}, indice))
							})]
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-4 bottom-4 z-10 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: editing ? "Editar processo" : "Lançar processo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "Data do lançamento e prazo de resposta ou andamento."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							className: "grid size-10 place-items-center rounded-lg text-muted",
							"aria-label": "Fechar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex min-h-0 flex-1 flex-col",
						onSubmit: (e) => {
							e.preventDefault();
							salvarForm();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 overflow-y-auto px-5 py-4",
							children: [
								erros.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
									children: erros.map((erro) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: erro }, erro))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Número do processo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.numero,
										onChange: (e) => setForm({
											...form,
											numero: e.target.value
										}),
										className: inputCls,
										placeholder: "0000000-00.0000.0.00.0000",
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Parte ou cliente",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.parte,
										onChange: (e) => setForm({
											...form,
											parte: e.target.value
										}),
										className: inputCls,
										placeholder: "Nome da parte",
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Assunto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.assunto,
										onChange: (e) => setForm({
											...form,
											assunto: e.target.value
										}),
										className: inputCls,
										placeholder: "O que precisa de resposta",
										required: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Tipo",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.tipo,
										onChange: (e) => setForm({
											...form,
											tipo: e.target.value
										}),
										className: inputCls,
										children: ABAS_TIPO.filter((item) => item.id !== "todos").map((tipo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: tipo.label }, tipo.id))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
										label: "Data de lançamento",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: form.dataLancamento,
											onChange: (e) => setForm({
												...form,
												dataLancamento: e.target.value
											}),
											className: inputCls,
											required: true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
										label: "Prazo de resposta",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: form.prazo,
											onChange: (e) => setForm({
												...form,
												prazo: e.target.value
											}),
											className: inputCls,
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Avisar com antecedência",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.alertaDias,
										onChange: (e) => setForm({
											...form,
											alertaDias: Number(e.target.value)
										}),
										className: inputCls,
										children: ALERTA_OPCOES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: n,
											children: n === 1 ? "1 dia antes" : `${n} dias antes`
										}, n))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: editing ? "Nota (opcional)" : "Andamento inicial (opcional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: form.nota,
										onChange: (e) => setForm({
											...form,
											nota: e.target.value
										}),
										className: `${inputCls} min-h-20 py-2`,
										placeholder: "O que já foi feito"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 border-t border-line px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								type: "button",
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium text-ink",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet",
								children: "Salvar"
							})]
						})]
					})]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: andamentoId !== null,
				onOpenChange: (open) => !open && setAndamentoId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: "Registrar andamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "Anote o que foi feito. Se o prazo mudou, informe a nova data."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 flex flex-col gap-3",
							onSubmit: (e) => {
								e.preventDefault();
								registrarAndamento();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Andamento",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: notaAndamento,
										onChange: (e) => setNotaAndamento(e.target.value),
										className: `${inputCls} min-h-24 py-2`,
										required: true,
										placeholder: "Ex.: contestação protocolada"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Novo prazo (opcional)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: novoPrazo,
										onChange: (e) => setNovoPrazo(e.target.value),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
										type: "button",
										className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet",
										children: "Registrar"
									})]
								})
							]
						})
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: deleteId !== null,
				onOpenChange: (open) => !open && setDeleteId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-sm md:-translate-x-1/2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: "Excluir processo?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "O lançamento e o histórico saem da lista. Não dá para desfazer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								type: "button",
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: excluir,
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-seal text-sm font-medium text-sheet",
								children: "Excluir"
							})]
						})
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: perfilOpen,
				onOpenChange: setPerfilOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-1/2 z-10 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: "Seu perfil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-1 text-sm text-muted",
							children: "O nome aparece como autor dos lançamentos e andamentos."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 flex flex-col gap-3",
							onSubmit: (event) => {
								event.preventDefault();
								salvarPerfil();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
								label: "Nome",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: nomePerfil,
									onChange: (event) => setNomePerfil(event.target.value),
									className: inputCls,
									required: true,
									minLength: 2,
									maxLength: 80
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
									type: "button",
									className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium",
									children: "Cancelar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: salvandoPerfil,
									className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
									children: "Salvar perfil"
								})]
							})]
						})
					]
				})] })
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-sheet",
				children: toast
			})
		]
	});
}
var inputCls = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted";
function CaixaAvisos({ perm, onAtivar }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-sheet p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm font-medium text-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-pine" }), "Avisos"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextoAvisos, {
			perm,
			onAtivar
		})]
	});
}
function TextoAvisos({ perm, onAtivar }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm leading-relaxed text-muted",
		children: "Os prazos vencidos e os que entram na antecedência escolhida ficam destacados no topo. Com a página aberta, o navegador também notifica — uma vez por dia para cada prazo."
	}), perm === "granted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm font-medium text-pine",
		children: "Avisos do navegador ativos."
	}) : perm === "denied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 flex items-start gap-2 text-sm text-brass",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellOff, { className: "mt-0.5 size-4 shrink-0" }), "Bloqueados neste navegador. Os alertas continuam nesta tela."]
	}) : perm === "default" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onAtivar,
		className: "mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper text-sm font-medium text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), "Ativar avisos"]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm text-muted",
		children: "Este navegador não mostra notificações do sistema."
	})] });
}
function Campo({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1 text-sm font-medium text-ink",
		children: [label, children]
	});
}
function Resumo({ valor, rotulo, tom }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-sheet px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `font-display text-3xl leading-none ${tom === "seal" ? "text-seal" : tom === "brass" ? "text-brass" : "text-pine"}`,
			children: valor
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: rotulo
		})]
	});
}
function ProcessoCard({ processo, onEditar, onAndamento, onConcluir, onReabrir, onExcluir }) {
	const [aberto, setAberto] = (0, import_react.useState)(false);
	const tom = TOM[urgencia(processo)];
	const ultimo = processo.historico[processo.historico.length - 1];
	const dias = daysUntil(processo.prazo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `absolute inset-y-0 left-0 w-1.5 ${tom.bar}`,
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-4 py-4 pl-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2 py-1 text-xs font-medium ${tom.badge}`,
						children: prazoLabel(processo)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-2xl leading-none tracking-tight text-ink",
					children: processo.numero
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold text-pine",
					children: processo.tipo
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-base font-semibold text-ink",
					children: processo.parte
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: processo.assunto
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: ["Lançado por ", processo.autorNome || "sem nome"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Lançamento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: formatDate(processo.dataLancamento)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3" }), "Prazo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-ink",
							children: formatDate(processo.prazo)
						}),
						processo.status === "andamento" && dias > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"Aviso ",
								processo.alertaDias,
								" dias antes"
							]
						})
					] })]
				}),
				ultimo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							"Último · ",
							ultimo.autorNome || "sem nome",
							" · "
						]
					}), ultimo.texto]
				}),
				processo.historico.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setAberto((v) => !v),
					className: "mt-2 text-sm font-medium text-pine",
					children: aberto ? "Ocultar histórico" : `Ver histórico (${processo.historico.length})`
				}),
				aberto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 flex flex-col gap-2 border-t border-line pt-2",
					children: [...processo.historico].reverse().map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								new Intl.DateTimeFormat("pt-BR", {
									day: "2-digit",
									month: "short",
									hour: "2-digit",
									minute: "2-digit"
								}).format(new Date(item.em)),
								" · ",
								item.autorNome || "sem nome"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-ink",
							children: item.texto
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap gap-2 pt-4",
					children: [
						processo.status === "andamento" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onAndamento,
							className: "inline-flex h-10 items-center gap-1 rounded-lg bg-pine-soft px-3 text-sm font-medium text-pine",
							children: "Andamento"
						}),
						processo.status === "andamento" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onConcluir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Concluir"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onReabrir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reabrir"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onEditar,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							"aria-label": `Editar ${processo.numero}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onExcluir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-seal",
							"aria-label": `Excluir ${processo.numero}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Excluir"]
						})
					]
				})
			]
		})]
	});
}
function PainelEquipe({ equipes, atual, meuEmail, onEscolher, onCriar, onAdicionar, onRemover }) {
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [ocupado, setOcupado] = (0, import_react.useState)(false);
	const selecionada = equipes.find((equipe) => equipe.id === atual) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-sheet p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-medium text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-pine" }), "Equipe"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Quem entra na equipe vê os mesmos processos e os prazos que precisam de atenção."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onEscolher(null),
					className: "h-10 rounded-xl px-3 text-left text-sm font-medium " + (atual === null ? "bg-ink text-sheet" : "border border-line text-ink"),
					children: "Só meus"
				}), equipes.map((equipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onEscolher(equipe.id),
					className: "h-10 rounded-xl px-3 text-left text-sm font-medium " + (atual === equipe.id ? "bg-ink text-sheet" : "border border-line text-ink"),
					children: equipe.nome
				}, equipe.id))]
			}),
			!selecionada ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-col gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					if (ocupado || nome.trim().length < 2) return;
					setOcupado(true);
					onCriar(nome.trim()).finally(() => {
						setNome("");
						setOcupado(false);
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex flex-col gap-1 text-sm font-medium text-ink",
					children: ["Nova equipe", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: nome,
						onChange: (event) => setNome(event.target.value),
						placeholder: "Ex.: Gabinete",
						className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm font-normal"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: ocupado,
					className: "inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
					children: "Criar equipe"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-1",
					children: [selecionada.membros.map((membro) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 items-center gap-2 text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-8 shrink-0 place-items-center rounded-full bg-pine-soft text-xs font-medium text-pine",
									children: (membro.nome || "?").charAt(0).toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 truncate",
									children: [membro.nome, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" · ", membro.papel === "dono" ? "criou" : "membro"]
									})]
								})]
							}),
							selecionada.papel === "dono" && membro.papel !== "dono" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void onRemover(membro.email),
								className: "inline-flex h-11 items-center text-sm font-medium text-seal",
								children: "Remover"
							}),
							selecionada.papel !== "dono" && membro.email.toLowerCase() === meuEmail.toLowerCase() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void onRemover(membro.email),
								className: "inline-flex h-11 items-center text-sm font-medium text-seal",
								children: "Sair"
							})
						]
					}, membro.userId)), selecionada.convites.map((convite) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 truncate",
							children: [convite, " · convite"]
						}), selecionada.papel === "dono" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void onRemover(convite),
							className: "inline-flex h-11 items-center text-sm font-medium text-seal",
							children: "Remover"
						})]
					}, convite))]
				}), selecionada.papel === "dono" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2",
					onSubmit: (event) => {
						event.preventDefault();
						if (ocupado || !email.trim()) return;
						setOcupado(true);
						onAdicionar(email.trim()).finally(() => {
							setEmail("");
							setOcupado(false);
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-sm font-medium text-ink",
						children: ["Adicionar por e-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							placeholder: "pessoa@email.com",
							className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm font-normal"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: ocupado,
						className: "inline-flex h-11 items-center justify-center rounded-xl border border-line text-sm font-medium text-ink disabled:opacity-60",
						children: "Adicionar"
					})]
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrazosApp, {});
}
//#endregion
export { Home as component };
