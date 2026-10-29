import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
import { _ as rotuloRetorno, a as avisosJaEnviados, b as urgencia, c as formatDate, d as marcarAvisos, f as numeroComAno, g as rotuloResposta, h as precisaAviso, i as avisoKey, l as juntarNumero, m as prazoLabel, n as TIPOS_LEI, o as classeResposta, p as ordenar, r as addDaysIso, s as daysUntil, t as TIPOS, u as lerProcessosLocais, v as separarNumero$1, y as todayIso } from "./prazos-DFCxt5b1.mjs";
import { C as prazoAdminLabel, D as rotuloTipo, E as rotuloNumero, O as statusAdminLabel, S as pedePrevisao, T as reaisParaCentavos, _ as modoValor, a as avisosAdminEnviados, b as normalizarStatus, c as dataAlvo, d as formatarReais, f as intervaloPeriodo, g as mascaraReais, h as mascaraDocumento, i as avisoAdminKey, k as urgenciaAdmin, l as exigeLinks, m as marcoAdmin, n as STATUS_ADMIN, o as centavosParaCampo, p as marcarAvisosAdmin, r as anosDePeca, s as cruzaPeriodo, t as MODALIDADES, u as formatarPeca, v as normalizarLink, w as precisaAvisoAdmin, x as numeroPeca, y as normalizarModalidade } from "./admin-DR0CkllD.mjs";
import { i as signOut, t as authClient } from "./client-1vAx-gM_.mjs";
import { i as hasGateSessionMarker } from "./server-CWSQxHiz.mjs";
import { C as Archive, S as BadgeCheck, _ as ChartColumn, a as Settings, b as BellOff, c as RotateCcw, d as Pencil, f as Megaphone, g as Check, h as FilePen, i as Trash2, l as Printer, m as FileText, n as Users, o as Search, p as Link2, t as X, u as Plus, v as CalendarClock, x as Ban, y as Bell } from "../_libs/lucide-react.mjs";
import { a as iniciarAutenticador, i as estadoAutenticador, n as confirmarAutenticador, o as useCurrentUser, r as createSsrRpc, s as useCurrentUserState, t as TelaConta } from "./tela-conta-CFmYQvpA.mjs";
import { n as gravarPreferencias, r as lerPreferencias } from "./router-WmrTG8JK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1Z1msQq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CarregandoTemis() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "temis-tela",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "temis-aviso",
			children: "Estamos preparando tudo para você"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "temis-centro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "temis-balanca",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 240 240",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M120 30v180M70 210h100" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "temis-haste",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 240 240",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M30 70h20c20 0 50-10 70-20 20 10 50 20 70 20h20" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "temis-prato temis-prato-esq",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 240 240",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 160l30-80 30 80c-8.7 6.5-19.2 10-30 10s-21.3-3.5-30-10z" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "temis-prato temis-prato-dir",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 240 240",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 160l30-80 30 80c-8.7 6.5-19.2 10-30 10s-21.3-3.5-30-10z" })
							})
						})
					]
				})]
			})
		})]
	});
}
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
	const retorno = retornoOk(bruto.retorno);
	const vetoAlcance = alcanceOk(bruto.vetoAlcance);
	const leiTipo = leiTipoOk(bruto.leiTipo);
	const leiNumero = numeroOk(bruto.leiNumero);
	const leiAno = anoOk(bruto.leiAno);
	const apreciacaoPrazo = dataOpcional$1(bruto.apreciacaoPrazo);
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
		historico: historicoOk$1(bruto.historico),
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
function dataOk$1(value) {
	return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function dataOpcional$1(value) {
	if (value == null || value === "") return null;
	if (!dataOk$1(value)) throw new Error("Data inválida");
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
			autorNome: typeof nota.autorNome === "string" ? nota.autorNome.trim().slice(0, 80) : "",
			...typeof nota.link === "string" && /^https?:\/\//i.test(nota.link.trim()) ? { link: nota.link.trim().slice(0, 500) } : {}
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
}).middleware([authMiddleware]).handler(createSsrRpc("b27888c47cc6d2221e7b28a9e2ef72c9418bff9bb769d7b355e6d95e5b9fb745"));
var SoltarProcessoContext = (0, import_react.createContext)(null);
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
var campo$1 = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";
function AutenticadorPerfil() {
	const [ativo, setAtivo] = (0, import_react.useState)(false);
	const [svg, setSvg] = (0, import_react.useState)("");
	const [chave, setChave] = (0, import_react.useState)("");
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [erro, setErro] = (0, import_react.useState)("");
	const [aviso, setAviso] = (0, import_react.useState)("");
	const [enviando, setEnviando] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let vivo = true;
		estadoAutenticador().then((estado) => {
			if (vivo) setAtivo(estado.ativo);
		}).catch(() => {
			if (vivo) setErro("Não foi possível verificar o autenticador.");
		});
		return () => {
			vivo = false;
		};
	}, []);
	async function gerar() {
		setErro("");
		setAviso("");
		setEnviando(true);
		try {
			const gerado = await iniciarAutenticador();
			setSvg(gerado.svg);
			setChave(gerado.chave);
			setAtivo(false);
			setCodigo("");
		} catch (err) {
			setErro(err instanceof Error ? err.message : "Não foi possível gerar o código.");
		} finally {
			setEnviando(false);
		}
	}
	async function confirmar(event) {
		event.preventDefault();
		setErro("");
		setEnviando(true);
		try {
			await confirmarAutenticador({ data: { codigo } });
			setAtivo(true);
			setSvg("");
			setChave("");
			setCodigo("");
			setAviso("Aplicativo autenticador ativo. Use o código dele se esquecer a senha.");
		} catch (err) {
			setErro(err instanceof Error ? err.message : "Não foi possível confirmar.");
		} finally {
			setEnviando(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 border-t border-line pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl text-ink",
				children: "Aplicativo autenticador"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: ativo ? "O Google Authenticator, ou outro aplicativo igual, já pode recuperar esta senha." : "Cadastre um aplicativo agora, enquanto souber a senha. Sem ele, a senha esquecida não é recuperada."
			}),
			aviso && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine",
				children: aviso
			}),
			erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
				children: erro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void gerar(),
				disabled: enviando,
				className: "mt-3 inline-flex h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-medium text-ink disabled:opacity-60",
				children: enviando && !svg ? "Gerando…" : ativo ? "Trocar aplicativo" : "Configurar aplicativo"
			}),
			svg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-col gap-3",
				onSubmit: (event) => void confirmar(event),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto w-48 rounded-xl bg-white p-2",
						dangerouslySetInnerHTML: { __html: svg }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["Se o aplicativo não ler a imagem, digite esta chave: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: chave
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1 text-sm font-medium text-ink",
						children: ["Código do aplicativo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: codigo,
							onChange: (event) => setCodigo(event.target.value.replace(/\D/g, "").slice(0, 6)),
							className: campo$1,
							inputMode: "numeric",
							autoComplete: "one-time-code",
							placeholder: "000000",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: enviando,
						className: "inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
						children: enviando ? "Confirmando…" : "Confirmar aplicativo"
					})
				]
			})
		]
	});
}
var campo = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";
function TrocaSenhaPerfil() {
	const [atual, setAtual] = (0, import_react.useState)("");
	const [nova, setNova] = (0, import_react.useState)("");
	const [repete, setRepete] = (0, import_react.useState)("");
	const [erro, setErro] = (0, import_react.useState)("");
	const [aviso, setAviso] = (0, import_react.useState)("");
	const [enviando, setEnviando] = (0, import_react.useState)(false);
	async function salvar(event) {
		event.preventDefault();
		setErro("");
		setAviso("");
		if (nova.length < 8) {
			setErro("A nova senha precisa ter pelo menos 8 caracteres.");
			return;
		}
		if (nova !== repete) {
			setErro("A repetição não é igual à nova senha.");
			return;
		}
		setEnviando(true);
		try {
			const resposta = await authClient.changePassword({
				currentPassword: atual,
				newPassword: nova,
				revokeOtherSessions: true
			});
			if (resposta.error) {
				const texto = (resposta.error.message ?? "").toLowerCase();
				if (texto.includes("invalid") || texto.includes("incorrect") || texto.includes("credential")) setErro("Senha atual incorreta. Se não lembrar, saia e use Esqueci minha senha com o aplicativo autenticador.");
				else setErro("Não foi possível trocar a senha.");
				return;
			}
			setAtual("");
			setNova("");
			setRepete("");
			setAviso("Senha atualizada.");
		} catch {
			setErro("Não foi possível trocar a senha.");
		} finally {
			setEnviando(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-5 flex flex-col gap-3 border-t border-line pt-4",
		onSubmit: (event) => void salvar(event),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl text-ink",
				children: "Senha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Informe a senha atual, a nova e a repetição."
			}),
			aviso && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine",
				children: aviso
			}),
			erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
				children: erro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["Senha atual", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: atual,
					onChange: (e) => setAtual(e.target.value),
					className: campo,
					autoComplete: "current-password",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["Nova senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: nova,
					onChange: (e) => setNova(e.target.value),
					className: campo,
					autoComplete: "new-password",
					minLength: 8,
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["Repetir nova senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: repete,
					onChange: (e) => setRepete(e.target.value),
					className: campo,
					autoComplete: "new-password",
					minLength: 8,
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: enviando,
				className: "inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
				children: enviando ? "Salvando…" : "Trocar senha"
			})
		]
	});
}
var ORDEM_TIPO = [
	"Requerimentos",
	"Indicações",
	"Projetos de Lei",
	"Outros"
];
var CORES_TIPO = [
	"var(--color-pine)",
	"var(--color-brass)",
	"var(--color-seal)",
	"var(--color-muted)"
];
var CORES_RETORNO = [
	"var(--color-muted)",
	"var(--color-seal)",
	"var(--color-brass)",
	"var(--color-pine)",
	"color-mix(in srgb, var(--color-pine) 55%, var(--color-ink))",
	"color-mix(in srgb, var(--color-brass) 55%, var(--color-ink))",
	"color-mix(in srgb, var(--color-seal) 55%, var(--color-ink))"
];
function PainelEstatisticas({ processos, className }) {
	const porTipo = ORDEM_TIPO.map((tipo) => ({
		tipo,
		n: processos.filter((p) => p.tipo === tipo).length
	}));
	const situacao = [
		{
			label: "Vencidos",
			n: processos.filter((p) => urgencia(p) === "vencido").length,
			cor: "var(--color-seal)"
		},
		{
			label: "Vencem hoje",
			n: processos.filter((p) => urgencia(p) === "hoje").length,
			cor: "var(--color-seal)"
		},
		{
			label: "Vencendo",
			n: processos.filter((p) => urgencia(p) === "proximo").length,
			cor: "var(--color-brass)"
		},
		{
			label: "No prazo",
			n: processos.filter((p) => urgencia(p) === "ok").length,
			cor: "var(--color-pine)"
		},
		{
			label: "Arquivados",
			n: processos.filter((p) => p.status === "concluido").length,
			cor: "var(--color-muted)"
		}
	];
	const retornos = processos.filter((p) => p.retorno);
	const labelsRetorno = [
		"Veto integral",
		"Veto parcial",
		...TIPOS_LEI.map((tipo) => `Sancionada · ${tipo}`)
	];
	for (const item of retornos) {
		const rotulo = rotuloRetorno(item);
		if (!labelsRetorno.includes(rotulo)) labelsRetorno.push(rotulo);
	}
	const fatiasRetorno = labelsRetorno.map((label, i) => ({
		label,
		n: retornos.filter((p) => rotuloRetorno(p) === label).length,
		cor: CORES_RETORNO[(i + 1) % CORES_RETORNO.length]
	}));
	const resposta = [
		{
			label: "Respondido no prazo",
			id: "no-prazo",
			cor: "var(--color-pine)"
		},
		{
			label: "Não respondido no prazo",
			id: "fora",
			cor: "var(--color-seal)"
		},
		{
			label: "Ainda no prazo",
			id: "aguardando",
			cor: "var(--color-brass)"
		}
	].map((item) => ({
		...item,
		n: processos.filter((p) => classeResposta(p) === item.id).length
	}));
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
		className: className ?? "mt-4 grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-sheet p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "Por tipo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut$1, {
						fatias: porTipo.map((item, i) => ({
							label: item.tipo,
							n: item.n,
							cor: CORES_TIPO[i]
						})),
						total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: porTipo.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 rounded-full",
									style: { background: CORES_TIPO[i] }
								}), item.tipo]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink",
								children: item.n
							})]
						}, item.tipo))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-sheet p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "Retorno do andamento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Veto integral, veto parcial ou sanção, pelo tipo de lei."
					}),
					retornos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Nenhum processo retornou do andamento ainda."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut$1, {
						fatias: fatiasRetorno,
						total: retornos.length,
						centro: "retornos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: fatiasRetorno.filter((item) => item.n > 0).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 shrink-0 rounded-full",
									style: { background: item.cor }
								}), item.label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink",
								children: item.n
							})]
						}, item.label))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-sheet p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: "Resposta ao prazo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Respondidos no prazo, fora dele, ou ainda dentro do prazo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut$1, {
						fatias: resposta,
						total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: resposta.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2.5 shrink-0 rounded-full",
									style: { background: item.cor }
								}), item.label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink",
								children: item.n
							})]
						}, item.label))
					})
				]
			})
		]
	});
}
function Donut$1({ fatias, total, centro = "processos" }) {
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
				stroke: "var(--color-line)",
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
					strokeLinecap: "round",
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
				fill: "var(--color-ink)",
				fontSize: "28",
				fontFamily: "Fraunces, Georgia, serif",
				children: total
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "70",
				y: "84",
				textAnchor: "middle",
				fill: "var(--color-muted)",
				fontSize: "11",
				fontFamily: "Outfit, sans-serif",
				children: centro
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
/** Garante as colunas novas mesmo se a migração ainda não tiver rodado nesta instância. */
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
}).middleware([authMiddleware]).handler(createSsrRpc("8a8d5e5c641fd769ee3db776337a4c8fe726578f035d73fbc70d4a7202b02947"));
var VISTAS = [
	{
		id: "situacao",
		label: "Situação"
	},
	{
		id: "tipo",
		label: "Por tipo"
	},
	{
		id: "anual",
		label: "Valor anual"
	},
	{
		id: "mensal",
		label: "Valor mensal"
	},
	{
		id: "valorTipo",
		label: "Valor por tipo"
	}
];
var CORES$1 = [
	"var(--color-pine)",
	"var(--color-brass)",
	"var(--color-seal)",
	"var(--color-muted)",
	"#3d5a4c",
	"#4a5568",
	"#8a6a32",
	"#2f5d50",
	"#a39b90"
];
function GraficoAdmin({ processos }) {
	const [vista, setVista] = (0, import_react.useState)("situacao");
	const total = processos.length;
	if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-ink",
			children: "Ainda sem números"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-sm text-sm text-muted",
			children: "Lance um processo administrativo para ver a estatística."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-sheet p-4 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: VISTAS.find((item) => item.id === vista)?.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					total,
					" ",
					total === 1 ? "processo" : "processos"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Visão da estatística",
				children: VISTAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setVista(item.id),
					className: "h-9 rounded-full px-3 text-sm font-medium " + (vista === item.id ? "bg-ink text-sheet" : "border border-line text-ink"),
					children: item.label
				}, item.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [
				vista === "situacao" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VistaSituacao, { processos }),
				vista === "tipo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VistaTipo, { processos }),
				vista === "anual" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VistaValores, {
					processos,
					mensal: false
				}),
				vista === "mensal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VistaValores, {
					processos,
					mensal: true
				}),
				vista === "valorTipo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VistaValorTipo, { processos })
			]
		})]
	});
}
function VistaSituacao({ processos }) {
	const cores = {
		proposta: "var(--color-pine)",
		pareceres: "var(--color-brass)",
		assinatura: "color-mix(in srgb, var(--color-pine) 55%, var(--color-ink))",
		execucao: "color-mix(in srgb, var(--color-brass) 55%, var(--color-ink))",
		encerrado: "var(--color-muted)",
		cancelado: "color-mix(in srgb, var(--color-muted) 45%, var(--color-line))"
	};
	const fatias = STATUS_ADMIN.map((status) => {
		const n = processos.filter((p) => p.status === status).length;
		return {
			label: statusAdminLabel(status),
			valor: n,
			texto: String(n),
			cor: cores[status]
		};
	}).filter((item) => item.valor > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rosca, {
		fatias,
		centro: String(processos.length),
		legenda: "processos"
	});
}
function VistaTipo({ processos }) {
	const fatias = MODALIDADES.map((tipo, i) => {
		const n = processos.filter((p) => p.tipo === tipo).length;
		return {
			label: tipo,
			valor: n,
			texto: String(n),
			cor: CORES$1[i % CORES$1.length]
		};
	}).filter((item) => item.valor > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rosca, {
		fatias,
		centro: String(processos.length),
		legenda: "processos"
	});
}
function rotuloProcesso(p) {
	const numero = p.numero ? rotuloNumero(p.numero, p.numeroAno) : "";
	const referencia = p.referencia.trim();
	if (numero && referencia) return `${numero} · ${referencia}`;
	return numero || referencia || p.tipo;
}
function valorAnualOuEstimado(p) {
	if ((p.valorTotalCentavos ?? 0) > 0) return {
		valor: p.valorTotalCentavos ?? 0,
		texto: formatarReais(p.valorTotalCentavos)
	};
	if ((p.valorEstimadoCentavos ?? 0) > 0) return {
		valor: p.valorEstimadoCentavos ?? 0,
		texto: `${formatarReais(p.valorEstimadoCentavos)} estimado`
	};
	return {
		valor: 0,
		texto: formatarReais(null)
	};
}
function VistaValores({ processos, mensal }) {
	const fatias = processos.map((p, i) => {
		const anual = valorAnualOuEstimado(p);
		const valor = mensal ? p.valorMensalCentavos ?? 0 : anual.valor;
		const texto = mensal ? formatarReais(p.valorMensalCentavos) : anual.texto;
		return {
			label: rotuloProcesso(p),
			valor,
			texto,
			cor: CORES$1[i % CORES$1.length]
		};
	}).filter((item) => item.valor > 0).sort((a, b) => b.valor - a.valor);
	const soma = fatias.reduce((total, item) => total + item.valor, 0);
	if (fatias.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nenhum valor lançado neste recorte."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rosca, {
		fatias,
		centro: formatarReais(soma),
		legenda: mensal ? "mensal" : "anual"
	});
}
function VistaValorTipo({ processos }) {
	const fatias = MODALIDADES.map((tipo, i) => {
		const valor = processos.filter((p) => p.tipo === tipo).reduce((soma, p) => soma + valorAnualOuEstimado(p).valor, 0);
		return {
			label: tipo,
			valor,
			texto: formatarReais(valor),
			cor: CORES$1[i % CORES$1.length]
		};
	}).filter((item) => item.valor > 0);
	const soma = fatias.reduce((total, item) => total + item.valor, 0);
	if (fatias.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nenhum valor lançado neste recorte."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rosca, {
		fatias,
		centro: formatarReais(soma),
		legenda: "por tipo"
	});
}
function Rosca({ fatias, centro, legenda }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-center gap-6 md:grid-cols-[15rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut, {
			fatias,
			centro,
			legenda
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2",
			children: fatias.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-start gap-2 text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1.5 size-2.5 shrink-0 rounded-full",
						style: { background: item.cor }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "break-words",
						children: item.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 font-medium text-ink",
					children: item.texto
				})]
			}, item.label))
		})]
	});
}
function Donut({ fatias, centro, legenda }) {
	const r = 58;
	const c = 2 * Math.PI * r;
	const total = fatias.reduce((soma, item) => soma + item.valor, 0);
	const folga = fatias.length > 1 ? 6 : 0;
	let offset = 0;
	const miudo = centro.length > 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 160 160",
		className: "mx-auto size-44 max-w-full sm:size-52",
		role: "img",
		"aria-label": legenda,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "80",
				cy: "80",
				r,
				fill: "var(--color-sheet)",
				stroke: "var(--color-line)",
				strokeWidth: "16"
			}),
			fatias.map((fatia) => {
				const bruto = total > 0 ? fatia.valor / total * c : 0;
				const len = Math.max(0, bruto - folga);
				const el = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "80",
					cy: "80",
					r,
					fill: "none",
					stroke: fatia.cor,
					strokeWidth: "16",
					strokeLinecap: "round",
					strokeDasharray: `${len} ${c - len}`,
					strokeDashoffset: -offset,
					transform: "rotate(-90 80 80)"
				}, fatia.label);
				offset += bruto;
				return el;
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "80",
				y: miudo ? 78 : 76,
				textAnchor: "middle",
				fill: "var(--color-ink)",
				fontSize: miudo ? 12 : 22,
				fontFamily: "Fraunces, Georgia, serif",
				children: centro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "80",
				y: miudo ? 96 : 98,
				textAnchor: "middle",
				fill: "var(--color-muted)",
				fontSize: "11",
				fontFamily: "Outfit, sans-serif",
				children: legenda
			})
		]
	});
}
var FILTROS$1 = [
	{
		id: "todos",
		label: "Todos"
	},
	{
		id: "andamento",
		label: "Em curso"
	},
	{
		id: "proposta",
		label: "Recebendo proposta"
	},
	{
		id: "pareceres",
		label: "Pareceres"
	},
	{
		id: "assinatura",
		label: "Assinatura"
	},
	{
		id: "execucao",
		label: "Execução"
	},
	{
		id: "atencao",
		label: "Vencendo"
	},
	{
		id: "encerrados",
		label: "Encerrados"
	},
	{
		id: "cancelados",
		label: "Cancelados"
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
	encerrado: {
		badge: "bg-line text-muted",
		bar: "bg-line"
	},
	cancelado: {
		badge: "bg-line text-muted",
		bar: "bg-line"
	}
};
var inputCls$1 = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted";
var TIPOS_LINK_ANDAMENTO = [
	{
		id: "publicacao",
		campo: "linkAbertura",
		rotulo: "Link de publicação",
		curto: "publicação"
	},
	{
		id: "homologacao",
		campo: "linkHomologacao",
		rotulo: "Link de homologação",
		curto: "homologação"
	},
	{
		id: "pncp",
		campo: "linkPncp",
		rotulo: "Link do PNCP",
		curto: "PNCP"
	},
	{
		id: "retificacao",
		campo: "linkRetificacao",
		rotulo: "Link da retificação",
		curto: "retificação"
	},
	{
		id: "cancelamento",
		campo: "linkCancelamento",
		rotulo: "Link de cancelamento",
		curto: "cancelamento"
	}
];
function evento$1(texto, autorNome, link) {
	return {
		id: crypto.randomUUID(),
		em: (/* @__PURE__ */ new Date()).toISOString(),
		texto,
		autorNome,
		...link ? { link } : {}
	};
}
function mensagemErro(err) {
	const bruto = err instanceof Error ? err.message.trim() : "";
	if (!bruto) return "Não foi possível salvar. Tente de novo.";
	if (/column|coluna|does not exist|não existe|syntax/i.test(bruto)) return "Não foi possível gravar o processo. Atualize a página e tente de novo.";
	return bruto.length < 180 ? bruto : "Não foi possível salvar. Tente de novo.";
}
function vazio() {
	return {
		numero: "",
		numeroAno: (/* @__PURE__ */ new Date()).getFullYear(),
		referencia: "",
		objeto: "",
		tipo: "Pregão",
		tipoNumero: "",
		tipoAno: (/* @__PURE__ */ new Date()).getFullYear(),
		dataInicio: todayIso(),
		previsao: addDaysIso(30),
		encerramento: addDaysIso(30),
		alertaDias: 15,
		possuiContrato: false,
		vigenciaInicio: todayIso(),
		vigenciaFim: addDaysIso(365),
		contratado: "",
		documento: "",
		valorTotal: "",
		valorMensal: "",
		valorEstimado: "",
		ciNumero: "",
		ciAno: (/* @__PURE__ */ new Date()).getFullYear(),
		ciOrigem: "",
		linkAbertura: "",
		linkHomologacao: "",
		linkPncp: "",
		houveRetificacao: false,
		linkRetificacao: "",
		linkCancelamento: "",
		parecerNumero: "",
		parecerAno: (/* @__PURE__ */ new Date()).getFullYear(),
		status: "proposta",
		nota: ""
	};
}
function separarNumero(numero, ano) {
	const composto = /^(\d{1,6})\/(\d{4})$/.exec(numero.trim());
	if (composto) return {
		numero: composto[1],
		ano: Number(composto[2])
	};
	return {
		numero: numero.replace(/\D/g, "").slice(0, 6),
		ano: ano ?? (/* @__PURE__ */ new Date()).getFullYear()
	};
}
function doProcesso(p) {
	const numero = separarNumero(p.numero, p.numeroAno);
	return {
		numero: numero.numero,
		numeroAno: numero.ano,
		referencia: p.referencia,
		objeto: p.objeto,
		tipo: p.tipo,
		tipoNumero: p.tipoNumero != null ? String(p.tipoNumero) : "",
		tipoAno: p.tipoAno ?? (/* @__PURE__ */ new Date()).getFullYear(),
		dataInicio: p.dataInicio,
		previsao: p.previsaoEtapa ?? p.encerramento,
		encerramento: p.encerramento,
		alertaDias: p.alertaDias,
		possuiContrato: p.status === "execucao" || p.possuiContrato,
		vigenciaInicio: p.vigenciaInicio ?? todayIso(),
		vigenciaFim: p.vigenciaFim ?? p.encerramento,
		contratado: p.contratado,
		documento: p.documento,
		valorTotal: centavosParaCampo(p.valorTotalCentavos),
		valorMensal: centavosParaCampo(p.valorMensalCentavos),
		valorEstimado: centavosParaCampo(p.valorEstimadoCentavos),
		ciNumero: p.ciNumero != null ? String(p.ciNumero) : "",
		ciAno: p.ciAno ?? (/* @__PURE__ */ new Date()).getFullYear(),
		ciOrigem: p.ciOrigem,
		linkAbertura: p.linkAbertura,
		linkHomologacao: p.linkHomologacao,
		linkPncp: p.linkPncp,
		houveRetificacao: Boolean(p.linkRetificacao),
		linkRetificacao: p.linkRetificacao,
		linkCancelamento: p.linkCancelamento,
		parecerNumero: p.parecerNumero != null ? String(p.parecerNumero) : "",
		parecerAno: p.parecerAno ?? (/* @__PURE__ */ new Date()).getFullYear(),
		status: p.status,
		nota: ""
	};
}
function errosDeLinks(form) {
	const erros = [];
	const campos = [
		[
			"link de publicação",
			form.linkAbertura,
			exigeLinks(form.tipo)
		],
		[
			"link de homologação",
			form.linkHomologacao,
			false
		],
		[
			"link do PNCP",
			form.linkPncp,
			false
		]
	];
	for (const [nome, valor, obrigatorio] of campos) {
		if (!valor.trim()) {
			if (obrigatorio) erros.push(`Informe o ${nome}.`);
			continue;
		}
		if (!normalizarLink(valor)) erros.push(`O ${nome} está inválido.`);
	}
	if (form.houveRetificacao) {
		if (!form.linkRetificacao.trim()) erros.push("Informe o link da retificação.");
		else if (!normalizarLink(form.linkRetificacao)) erros.push("O link da retificação está inválido.");
	}
	if (form.status === "cancelado") {
		if (!form.linkCancelamento.trim()) erros.push("Informe o link de cancelamento.");
		else if (!normalizarLink(form.linkCancelamento)) erros.push("O link de cancelamento está inválido.");
	}
	return erros;
}
function validar(form) {
	if (form.tipo === "Outros" || form.tipo === "Doação") {
		const erros = [];
		if (numeroPeca(form.numero) == null) erros.push("Informe o número do processo.");
		if (!form.referencia.trim()) erros.push("Informe a referência.");
		if (!form.objeto.trim()) erros.push("Informe o objeto.");
		if (numeroPeca(form.ciNumero) == null) erros.push("Informe o número da comunicação interna.");
		if (!form.ciOrigem.trim()) erros.push("Informe de onde veio a comunicação interna.");
		if (form.tipo === "Doação" && numeroPeca(form.tipoNumero) == null) erros.push("Informe o número do tipo.");
		erros.push(...errosDeLinks(form));
		return erros;
	}
	const erros = [];
	const cancelado = form.status === "cancelado";
	if (numeroPeca(form.numero) == null) erros.push("Informe o número do processo.");
	if (numeroPeca(form.tipoNumero) == null) erros.push("Informe o número do tipo.");
	if (numeroPeca(form.ciNumero) == null) erros.push("Informe o número da comunicação interna.");
	if (!form.ciOrigem.trim()) erros.push("Informe de onde veio a comunicação interna.");
	if (!form.dataInicio) erros.push("Informe a data de início.");
	if (!cancelado) {
		if (!form.objeto.trim()) erros.push("Informe o objeto.");
		if (numeroPeca(form.parecerNumero) == null) erros.push("Informe o número do parecer do agente de contratações.");
	}
	if (pedePrevisao(form.status) && !form.previsao) erros.push("Informe a previsão de conclusão da etapa.");
	if (form.status === "encerrado") {
		if (!form.encerramento) erros.push("Informe a data de encerramento.");
		else if (form.dataInicio && form.encerramento < form.dataInicio) erros.push("O encerramento não pode ser antes do início.");
	}
	if (form.status === "execucao") {
		if (!form.contratado.trim()) erros.push("Informe os dados do contratado.");
		if (!form.vigenciaInicio || !form.vigenciaFim) erros.push("Informe a vigência do contrato.");
		else if (form.vigenciaFim < form.vigenciaInicio) erros.push("A vigência termina antes de começar.");
		if (reaisParaCentavos(form.valorTotal) == null) erros.push("Informe o valor anual do contrato.");
		if (reaisParaCentavos(form.valorMensal) == null) erros.push("Informe o valor mensal do contrato.");
	} else if (form.status === "encerrado" && reaisParaCentavos(form.valorTotal) == null) erros.push("Informe o valor total.");
	else if (form.status !== "encerrado" && form.valorEstimado.trim() && reaisParaCentavos(form.valorEstimado) == null) erros.push("O valor estimado está inválido.");
	erros.push(...errosDeLinks(form));
	return erros;
}
function mudancas(antes, form) {
	const partes = [];
	const numeroNovo = rotuloNumero(String(numeroPeca(form.numero) ?? ""), form.numeroAno);
	if (rotuloNumero(antes.numero, antes.numeroAno) !== numeroNovo) partes.push(`o número para ${numeroNovo}`);
	if (antes.referencia !== form.referencia.trim()) partes.push("a referência");
	if (antes.objeto !== form.objeto.trim()) partes.push("o objeto");
	const tipoNovo = rotuloTipo(form.tipo, numeroPeca(form.tipoNumero), form.tipoAno);
	if (rotuloTipo(antes.tipo, antes.tipoNumero, antes.tipoAno) !== tipoNovo) partes.push(`o tipo para ${tipoNovo}`);
	if (antes.dataInicio !== form.dataInicio) partes.push("a data de início");
	if (antes.status !== form.status) partes.push(`o status para ${statusAdminLabel(form.status)}`);
	if (pedePrevisao(form.status) && (antes.previsaoEtapa ?? "") !== form.previsao) partes.push(`a previsão para ${formatDate(form.previsao)}`);
	if (form.status === "encerrado" && antes.encerramento !== form.encerramento) partes.push(`o encerramento para ${formatDate(form.encerramento)}`);
	if (form.status === "execucao" && !antes.possuiContrato) partes.push("o contrato");
	if (antes.alertaDias !== form.alertaDias) partes.push("a antecedência do aviso");
	const ciNova = formatarPeca(numeroPeca(form.ciNumero), form.ciAno);
	const parecerNovo = formatarPeca(numeroPeca(form.parecerNumero), form.parecerAno);
	if (formatarPeca(antes.ciNumero, antes.ciAno) !== ciNova) partes.push(`a comunicação interna para ${ciNova}`);
	if (antes.ciOrigem !== form.ciOrigem.trim()) partes.push("a origem da comunicação interna");
	if ((antes.linkAbertura || "") !== (normalizarLink(form.linkAbertura) || "")) partes.push("o link de publicação");
	if ((antes.linkHomologacao || "") !== (normalizarLink(form.linkHomologacao) || "")) partes.push("o link de homologação");
	if ((antes.linkPncp || "") !== (normalizarLink(form.linkPncp) || "")) partes.push("o link do PNCP");
	const retificacaoNova = form.houveRetificacao ? normalizarLink(form.linkRetificacao) || "" : "";
	if ((antes.linkRetificacao || "") !== retificacaoNova) partes.push(retificacaoNova ? "o link da retificação" : "a retificação");
	const cancelamentoNovo = form.status === "cancelado" ? normalizarLink(form.linkCancelamento) || "" : "";
	if ((antes.linkCancelamento || "") !== cancelamentoNovo) partes.push(cancelamentoNovo ? "o link de cancelamento" : "o cancelamento");
	if (formatarPeca(antes.parecerNumero, antes.parecerAno) !== parecerNovo) partes.push(`o parecer para ${parecerNovo}`);
	if (!partes.length) return null;
	if (partes.length === 1) return `Alterou ${partes[0]}.`;
	const ultimo = partes.pop();
	return `Alterou ${partes.join(", ")} e ${ultimo}.`;
}
function montar(form, base) {
	if (form.tipo === "Outros" || form.tipo === "Doação") {
		const hoje = todayIso();
		const doacao = form.tipo === "Doação";
		return {
			id: base.id,
			numero: String(numeroPeca(form.numero) ?? ""),
			numeroAno: form.numeroAno,
			referencia: form.referencia.trim(),
			objeto: form.objeto.trim(),
			tipo: form.tipo,
			tipoNumero: doacao ? numeroPeca(form.tipoNumero) : null,
			tipoAno: doacao ? form.tipoAno : null,
			dataInicio: hoje,
			previsaoEtapa: null,
			encerramento: hoje,
			alertaDias: form.alertaDias,
			possuiContrato: false,
			vigenciaInicio: null,
			vigenciaFim: null,
			contratado: "",
			documento: "",
			valorTotalCentavos: null,
			valorMensalCentavos: null,
			valorEstimadoCentavos: form.status === "execucao" || form.status === "encerrado" ? null : reaisParaCentavos(form.valorEstimado),
			ciNumero: numeroPeca(form.ciNumero),
			ciAno: form.ciAno,
			ciOrigem: form.ciOrigem.trim(),
			linkAbertura: normalizarLink(form.linkAbertura) || "",
			linkHomologacao: normalizarLink(form.linkHomologacao) || "",
			linkPncp: normalizarLink(form.linkPncp) || "",
			linkRetificacao: form.houveRetificacao ? normalizarLink(form.linkRetificacao) || "" : "",
			linkCancelamento: form.status === "cancelado" ? normalizarLink(form.linkCancelamento) || "" : "",
			parecerNumero: null,
			parecerAno: null,
			status: form.status,
			historico: base.historico,
			equipeId: base.equipeId,
			autorId: base.autorId,
			autorNome: base.autorNome
		};
	}
	const execucao = form.status === "execucao";
	const encerrado = form.status === "encerrado";
	const cancelado = form.status === "cancelado";
	const comValor = encerrado;
	const previsao = pedePrevisao(form.status) ? form.previsao : null;
	const encerramento = form.status === "encerrado" ? form.encerramento : execucao ? form.vigenciaFim || form.dataInicio : previsao || form.dataInicio;
	return {
		id: base.id,
		numero: String(numeroPeca(form.numero) ?? ""),
		numeroAno: form.numeroAno,
		referencia: form.referencia.trim(),
		objeto: form.objeto.trim(),
		tipo: form.tipo,
		tipoNumero: numeroPeca(form.tipoNumero),
		tipoAno: form.tipoAno,
		dataInicio: form.dataInicio,
		previsaoEtapa: previsao,
		encerramento,
		alertaDias: form.alertaDias,
		possuiContrato: execucao,
		vigenciaInicio: execucao ? form.vigenciaInicio : null,
		vigenciaFim: execucao ? form.vigenciaFim : null,
		contratado: execucao ? form.contratado.trim() : "",
		documento: execucao ? form.documento.trim() : "",
		valorTotalCentavos: comValor || execucao ? reaisParaCentavos(form.valorTotal) : null,
		valorMensalCentavos: execucao ? reaisParaCentavos(form.valorMensal) : null,
		valorEstimadoCentavos: !execucao && !encerrado ? reaisParaCentavos(form.valorEstimado) : null,
		ciNumero: numeroPeca(form.ciNumero),
		ciAno: form.ciAno,
		ciOrigem: form.ciOrigem.trim(),
		linkAbertura: normalizarLink(form.linkAbertura) || "",
		linkHomologacao: normalizarLink(form.linkHomologacao) || "",
		linkPncp: normalizarLink(form.linkPncp) || "",
		linkRetificacao: form.houveRetificacao ? normalizarLink(form.linkRetificacao) || "" : "",
		linkCancelamento: form.status === "cancelado" ? normalizarLink(form.linkCancelamento) || "" : "",
		parecerNumero: cancelado ? null : numeroPeca(form.parecerNumero),
		parecerAno: cancelado ? null : form.parecerAno,
		status: form.status,
		historico: base.historico,
		equipeId: base.equipeId,
		autorId: base.autorId,
		autorNome: base.autorNome
	};
}
function AdminPainel({ equipeAtual, equipes, meuNome, sinalNovo, onToast, children }) {
	const { user } = useCurrentUserState();
	const [lista, setLista] = (0, import_react.useState)([]);
	const [pronto, setPronto] = (0, import_react.useState)(false);
	const [guia, setGuia] = (0, import_react.useState)("lista");
	const [filtro, setFiltro] = (0, import_react.useState)("todos");
	const [tipoAba, setTipoAba] = (0, import_react.useState)("todos");
	const [busca, setBusca] = (0, import_react.useState)("");
	const [ordemCampo, setOrdemCampo] = (0, import_react.useState)("numero");
	const [ordemDir, setOrdemDir] = (0, import_react.useState)("asc");
	const [parte, setParte] = (0, import_react.useState)(0);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(vazio);
	const [erros, setErros] = (0, import_react.useState)([]);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [andamentoId, setAndamentoId] = (0, import_react.useState)(null);
	const [notaAndamento, setNotaAndamento] = (0, import_react.useState)("");
	const [statusAndamento, setStatusAndamento] = (0, import_react.useState)("proposta");
	const [novoEncerramento, setNovoEncerramento] = (0, import_react.useState)("");
	const [vigenciaInicioAnd, setVigenciaInicioAnd] = (0, import_react.useState)("");
	const [vigenciaFimAnd, setVigenciaFimAnd] = (0, import_react.useState)("");
	const [escolhaLink, setEscolhaLink] = (0, import_react.useState)(false);
	const [linksAndamento, setLinksAndamento] = (0, import_react.useState)({});
	const [periodo, setPeriodo] = (0, import_react.useState)("mensal");
	const [ancora, setAncora] = (0, import_react.useState)(() => todayIso().slice(0, 7));
	const [statusRelatorio, setStatusRelatorio] = (0, import_react.useState)("todos");
	const [relatorio, setRelatorio] = (0, import_react.useState)(null);
	const [modoRelatorio, setModoRelatorio] = (0, import_react.useState)("processos");
	const [anoPecas, setAnoPecas] = (0, import_react.useState)("todos");
	const [relatorioPecas, setRelatorioPecas] = (0, import_react.useState)(null);
	const sinalVisto = (0, import_react.useRef)(sinalNovo);
	const listaGeracao = (0, import_react.useRef)(0);
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
		let vivo = true;
		const carregar = (silencioso) => {
			const geracao = ++listaGeracao.current;
			if (!silencioso) setPronto(false);
			listarAdmin({ data: equipeAtual }).then((itens) => {
				if (!vivo || listaGeracao.current !== geracao) return;
				setLista(itens);
			}).catch(() => {
				if (!vivo || listaGeracao.current !== geracao || silencioso) return;
				setLista([]);
				onToast("Não foi possível carregar os processos administrativos.");
			}).finally(() => {
				if (vivo && listaGeracao.current === geracao && !silencioso) setPronto(true);
			});
		};
		carregar(false);
		const id = window.setInterval(() => carregar(true), 3e4);
		return () => {
			vivo = false;
			window.clearInterval(id);
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
		equipeAtual
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
						body: `${rotuloNumero(item.numero, item.numeroAno)} — ${item.objeto}. ${prazoAdminLabel(item)}.`,
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
			if (!(filtro === "todos" || filtro === "andamento" && p.status !== "encerrado" && p.status !== "cancelado" || filtro === "proposta" && p.status === "proposta" || filtro === "pareceres" && p.status === "pareceres" || filtro === "assinatura" && p.status === "assinatura" || filtro === "execucao" && p.status === "execucao" || filtro === "encerrados" && p.status === "encerrado" || filtro === "cancelados" && p.status === "cancelado" || filtro === "atencao" && precisaAvisoAdmin(p)) || tipoAba !== "todos" && p.tipo !== tipoAba) return false;
			if (!q) return true;
			return [
				rotuloNumero(p.numero, p.numeroAno),
				rotuloTipo(p.tipo, p.tipoNumero, p.tipoAno),
				p.referencia,
				p.objeto,
				p.tipo,
				p.contratado,
				p.autorNome,
				p.ciOrigem,
				formatarPeca(p.ciNumero, p.ciAno),
				formatarPeca(p.parecerNumero, p.parecerAno)
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
	const porParte = 12;
	const totalPartes = Math.max(1, Math.ceil(filtrados.length / porParte));
	const parteAtual = Math.min(parte, totalPartes - 1);
	const daParte = filtrados.slice(parteAtual * porParte, parteAtual * porParte + porParte);
	const atencao = lista.filter((p) => precisaAvisoAdmin(p));
	const porTipo = MODALIDADES.map((tipo) => ({
		rotulo: tipo,
		valor: lista.filter((p) => p.tipo === tipo).length
	})).filter((item) => item.valor > 0);
	const porStatus = STATUS_ADMIN.map((status) => ({
		rotulo: statusAdminLabel(status),
		valor: lista.filter((p) => p.status === status).length
	})).filter((item) => item.valor > 0);
	async function persistir(proximo, salvo, apagado, ok) {
		const anterior = lista;
		++listaGeracao.current;
		setLista(proximo);
		try {
			if (apagado) await apagarAdmin({ data: apagado });
			if (salvo) await salvarAdmin({ data: salvo });
			const confirmacao = ++listaGeracao.current;
			try {
				const frescos = await listarAdmin({ data: equipeAtual });
				if (listaGeracao.current === confirmacao) setLista(frescos);
			} catch {}
			onToast(ok);
			return true;
		} catch (err) {
			const confirmacao = ++listaGeracao.current;
			if (listaGeracao.current === confirmacao) setLista(anterior);
			const mensagem = mensagemErro(err);
			onToast(mensagem);
			return mensagem;
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
			const ok = await persistir(lista.map((item) => item.id === atualizado.id ? atualizado : item), atualizado, null, "Processo atualizado");
			if (ok === true) setFormOpen(false);
			else setErros([ok]);
			return;
		}
		const criado = montar(form, {
			id: crypto.randomUUID(),
			historico: nota ? [evento$1("Lançou o processo administrativo.", meuNome), evento$1(nota, meuNome)] : [evento$1("Lançou o processo administrativo.", meuNome)],
			equipeId: equipeAtual,
			autorId: user?.id ?? null,
			autorNome: meuNome
		});
		const ok = await persistir([criado, ...lista], criado, null, "Processo administrativo lançado");
		if (ok === true) setFormOpen(false);
		else setErros([ok]);
	}
	async function registrarAndamento() {
		if (!andamentoId) return;
		const texto = notaAndamento.trim();
		const atual = lista.find((item) => item.id === andamentoId);
		if (!atual) return;
		const escolhidos = TIPOS_LINK_ANDAMENTO.filter((item) => item.id in linksAndamento);
		const aplicados = [];
		for (const item of escolhidos) {
			const url = normalizarLink(linksAndamento[item.id] ?? "");
			if (!url) {
				onToast((linksAndamento[item.id] ?? "").trim() ? `O ${item.rotulo.toLowerCase()} está inválido.` : `Informe o ${item.rotulo.toLowerCase()}.`);
				return;
			}
			aplicados.push({
				curto: item.curto,
				url,
				campo: item.campo
			});
		}
		if (!texto && aplicados.length === 0 && statusAndamento === atual.status) return;
		const simples = atual.tipo === "Outros" || atual.tipo === "Doação";
		const statusMudou = statusAndamento !== atual.status;
		const atualizado = {
			...atual,
			status: statusAndamento
		};
		for (const item of aplicados) atualizado[item.campo] = item.url;
		if (statusAndamento === "cancelado" && !atualizado.linkCancelamento) {
			onToast("Informe o link de cancelamento.");
			setLinksAndamento((previo) => ({
				...previo,
				cancelamento: previo.cancelamento ?? ""
			}));
			return;
		}
		if (statusMudou && !simples && pedePrevisao(statusAndamento)) {
			if (!novoEncerramento) {
				onToast("Informe a nova previsão da etapa.");
				return;
			}
			atualizado.previsaoEtapa = novoEncerramento;
			atualizado.encerramento = novoEncerramento;
		}
		if (statusMudou && !simples && statusAndamento === "encerrado") {
			if (!novoEncerramento) {
				onToast("Informe a data de encerramento.");
				return;
			}
			atualizado.encerramento = novoEncerramento;
		}
		if (statusMudou && !simples && statusAndamento === "execucao") {
			if (!vigenciaInicioAnd || !vigenciaFimAnd) {
				onToast("Informe a vigência do contrato.");
				return;
			}
			if (!atual.contratado || atual.valorTotalCentavos == null || atual.valorMensalCentavos == null) {
				onToast("Complete contratado e valores em Editar antes de mudar para execução.");
				return;
			}
			atualizado.possuiContrato = true;
			atualizado.vigenciaInicio = vigenciaInicioAnd;
			atualizado.vigenciaFim = vigenciaFimAnd;
			atualizado.encerramento = vigenciaFimAnd;
		}
		const fraseLink = aplicados.length === 0 ? "" : aplicados.length === 1 ? `Adicionou o link de ${aplicados[0].curto}.` : `Adicionou os links de ${aplicados.slice(0, -1).map((item) => item.curto).join(", ")} e ${aplicados[aplicados.length - 1].curto}.`;
		const frase = [
			statusMudou ? `Status alterado para ${statusAdminLabel(statusAndamento)}.` : "",
			texto,
			fraseLink
		].filter(Boolean).join(" ");
		atualizado.historico = [...atual.historico, evento$1(frase, meuNome, aplicados.length === 1 ? aplicados[0].url : void 0)];
		if (await persistir(lista.map((item) => item.id === atualizado.id ? atualizado : item), atualizado, null, "Andamento registrado") !== true) return;
		setAndamentoId(null);
		setNotaAndamento("");
		setNovoEncerramento("");
		setLinksAndamento({});
		setEscolhaLink(false);
	}
	function gerarRelatorio() {
		const intervalo = intervaloPeriodo(ancora, periodo);
		if (!intervalo) {
			onToast("Escolha um mês de referência.");
			return;
		}
		const itens = lista.filter((item) => cruzaPeriodo(item, intervalo.inicio, intervalo.fim)).filter((item) => statusRelatorio === "todos" || item.status === statusRelatorio).sort((a, b) => (a.numeroAno ?? 0) - (b.numeroAno ?? 0) || a.numero.localeCompare(b.numero, "pt-BR", { numeric: true }));
		setRelatorio({
			...intervalo,
			itens
		});
	}
	function gerarPecas() {
		const ano = anoPecas === "todos" ? null : Number(anoPecas);
		const itens = lista.filter((item) => item.ciNumero != null || item.parecerNumero != null).filter((item) => ano == null || item.ciAno === ano || item.parecerAno === ano).sort((a, b) => (a.numeroAno ?? 0) - (b.numeroAno ?? 0) || a.numero.localeCompare(b.numero, "pt-BR", { numeric: true }));
		setRelatorioPecas({
			rotulo: ano == null ? "todos os anos" : String(ano),
			itens
		});
	}
	const totalRelatorio = relatorio?.itens.reduce((soma, item) => soma + (item.valorTotalCentavos ?? 0), 0) ?? 0;
	const mensalRelatorio = relatorio?.itens.reduce((soma, item) => soma + (item.valorMensalCentavos ?? 0), 0) ?? 0;
	const moverPara = (0, import_react.useCallback)(async (id, equipeId) => {
		const atual = lista.find((item) => item.id === id);
		if (!atual || (atual.equipeId ?? null) === equipeId) return;
		try {
			await moverAdmin({ data: {
				id,
				equipeId
			} });
			const frescos = await listarAdmin({ data: equipeAtual });
			setLista(frescos);
			onToast(equipeId ? "Processo movido para a equipe." : "Processo movido para os seus.");
		} catch (err) {
			onToast(mensagemErro(err));
		}
	}, [
		equipeAtual,
		lista,
		onToast
	]);
	function abrirFormulario() {
		setEditing(null);
		setForm(vazio());
		setErros([]);
		setFormOpen(true);
		setGuia("lista");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoltarProcessoContext.Provider, {
		value: moverPara,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-6 md:grid-cols-[16rem_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex flex-col gap-4 md:sticky md:top-6 md:self-start",
					children: [(porTipo.length > 0 || porStatus.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [porTipo.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-medium text-muted",
							children: "Tipo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: porTipo.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
								valor: item.valor,
								rotulo: item.rotulo,
								tom: "pine"
							}, item.rotulo))
						})] }), porStatus.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-medium text-muted",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: porStatus.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Resumo$1, {
								valor: item.valor,
								rotulo: item.rotulo,
								tom: "brass"
							}, item.rotulo))
						})] })]
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: abrirFormulario,
								className: "inline-flex h-11 items-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Novo processo"]
							})
						]
					}), !pronto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Carregando processos administrativos…"
					}) : guia === "estatisticas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraficoAdmin, { processos: lista }) : guia === "relatorio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-print flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setModoRelatorio("processos"),
								className: "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium " + (modoRelatorio === "processos" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
								children: "Processos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setModoRelatorio("pecas"),
								className: "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium " + (modoRelatorio === "pecas" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
								children: "Comunicações e pareceres"
							})]
						}), modoRelatorio === "pecas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatorioPecas, {
							ano: anoPecas,
							onAno: setAnoPecas,
							relatorio: relatorioPecas,
							onGerar: gerarPecas
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-print rounded-2xl border border-line bg-sheet p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl text-ink",
									children: "Gerar relatório"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: "Entram os processos cujo início e prazo cruzam o período. O gráfico acompanha o recorte."
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
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "todos",
													children: "Todos"
												}), STATUS_ADMIN.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: status,
													children: statusAdminLabel(status)
												}, status))]
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
											className: "font-display text-2xl text-ink sm:text-3xl",
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
										onClick: (evento) => imprimirRelatorio$1(evento.currentTarget),
										className: "no-print inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-medium text-ink sm:w-auto",
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
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "relatorio-cards mt-4 flex flex-col gap-3 md:hidden",
									children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartaoProcesso, { item }, item.id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relatorio-tabela-wrap mt-4 hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "relatorio-tabela w-full border-collapse text-left text-sm",
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
													children: "Tipo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-medium",
													children: "Situação"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-medium",
													children: "Prazo"
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
													className: "col-fixa py-2 pr-3 font-medium text-ink",
													children: rotuloNumero(item.numero, item.numeroAno)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3 text-ink",
													children: item.referencia || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3 text-ink",
													children: rotuloTipo(item.tipo, item.tipoNumero, item.tipoAno)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "col-fixa py-2 pr-3 text-ink",
													children: statusAdminLabel(item.status)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "col-fixa py-2 pr-3 text-ink",
													children: marcoAdmin(item).data ? formatDate(marcoAdmin(item).data) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 pr-3 text-ink",
													children: item.possuiContrato ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [item.contratado, item.documento ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-xs text-muted",
														children: item.documento
													}) : null] }) : "Sem contrato"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "col-fixa py-2 text-ink",
													children: item.valorTotalCentavos != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [formatarReais(item.valorTotalCentavos), item.valorMensalCentavos != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-xs text-muted",
														children: [formatarReais(item.valorMensalCentavos), " / mês"]
													}) : null] }) : "—"
												})
											]
										}, item.id)) })]
									})
								})] })
							]
						})] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						atencao.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "status",
							className: "mb-4 rounded-2xl border border-line bg-sheet p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-ink",
								children: atencao.length === 1 ? "1 prazo precisa de atenção" : `${atencao.length} prazos precisam de atenção`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-col gap-2",
								children: atencao.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-ink",
											children: rotuloNumero(item.numero, item.numeroAno)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-pine",
											children: [" · ", rotuloTipo(item.tipo, item.tipoNumero, item.tipoAno)]
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
											placeholder: "Buscar número, CI, parecer, objeto ou referência",
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
														children: "Prazo"
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
								children: lista.length === 0 ? "Lance o primeiro com número, status e a data da etapa." : "Nada corresponde a este filtro ou à busca."
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid grid-cols-3 gap-3",
							children: daParte.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAdmin, {
								processo: item,
								equipes,
								onMover: moverPara,
								onEditar: () => {
									setEditing(item);
									setForm(doProcesso(item));
									setErros([]);
									setFormOpen(true);
								},
								onAndamento: () => {
									setAndamentoId(item.id);
									setNotaAndamento("");
									setStatusAndamento(item.status);
									setNovoEncerramento(item.status === "encerrado" ? item.encerramento : item.previsaoEtapa ?? "");
									setVigenciaInicioAnd(item.vigenciaInicio ?? item.dataInicio);
									setVigenciaFimAnd(item.vigenciaFim ?? "");
									setLinksAndamento({});
									setEscolhaLink(false);
								},
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
								children: "Inclui comunicação interna, parecer do agente de contratações e, se houver, o contrato."
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
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
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Status",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: form.status,
											onChange: (e) => setForm({
												...form,
												status: e.target.value
											}),
											className: inputCls$1,
											children: STATUS_ADMIN.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: status,
												children: statusAdminLabel(status).toUpperCase()
											}, status))
										})
									}),
									form.tipo === "Outros" || form.tipo === "Doação" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Número do processo",
											numero: form.numero,
											ano: form.numeroAno,
											onNumero: (numero) => setForm({
												...form,
												numero
											}),
											onAno: (numeroAno) => setForm({
												...form,
												numeroAno
											}),
											rotulo: (numero, ano) => rotuloNumero(String(numero), ano)
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
												placeholder: "PA, contrato ou memorando",
												required: true
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
												placeholder: "O que será registrado",
												required: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Comunicação interna",
											numero: form.ciNumero,
											ano: form.ciAno,
											onNumero: (ciNumero) => setForm({
												...form,
												ciNumero
											}),
											onAno: (ciAno) => setForm({
												...form,
												ciAno
											}),
											obrigatorio: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "De onde veio a comunicação interna",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.ciOrigem,
												onChange: (e) => setForm({
													...form,
													ciOrigem: e.target.value
												}),
												className: inputCls$1,
												placeholder: "Secretaria, gabinete ou setor",
												required: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamposLinks, {
											form,
											onChange: setForm
										}),
										form.tipo === "Doação" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Número do tipo",
											numero: form.tipoNumero,
											ano: form.tipoAno,
											onNumero: (tipoNumero) => setForm({
												...form,
												tipoNumero
											}),
											onAno: (tipoAno) => setForm({
												...form,
												tipoAno
											}),
											rotulo: (numero, ano) => rotuloTipo(form.tipo, numero, ano),
											obrigatorio: true
										}),
										form.status !== "execucao" && form.status !== "encerrado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Valor estimado",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.valorEstimado,
												onChange: (e) => setForm({
													...form,
													valorEstimado: mascaraReais(e.target.value)
												}),
												className: inputCls$1,
												inputMode: "decimal",
												placeholder: "0,00"
											})
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Número do processo",
											numero: form.numero,
											ano: form.numeroAno,
											onNumero: (numero) => setForm({
												...form,
												numero
											}),
											onAno: (numeroAno) => setForm({
												...form,
												numeroAno
											}),
											rotulo: (numero, ano) => rotuloNumero(String(numero), ano)
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
												required: form.status !== "cancelado"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Comunicação interna",
											numero: form.ciNumero,
											ano: form.ciAno,
											onNumero: (ciNumero) => setForm({
												...form,
												ciNumero
											}),
											onAno: (ciAno) => setForm({
												...form,
												ciAno
											}),
											obrigatorio: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "De onde veio a comunicação interna",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.ciOrigem,
												onChange: (e) => setForm({
													...form,
													ciOrigem: e.target.value
												}),
												className: inputCls$1,
												placeholder: "Secretaria, gabinete ou setor",
												required: true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CamposLinks, {
											form,
											onChange: setForm
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Parecer do agente de contratações",
											numero: form.parecerNumero,
											ano: form.parecerAno,
											onNumero: (parecerNumero) => setForm({
												...form,
												parecerNumero
											}),
											onAno: (parecerAno) => setForm({
												...form,
												parecerAno
											}),
											obrigatorio: form.status !== "cancelado"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PecaCampos, {
											titulo: "Número do tipo",
											numero: form.tipoNumero,
											ano: form.tipoAno,
											onNumero: (tipoNumero) => setForm({
												...form,
												tipoNumero
											}),
											onAno: (tipoAno) => setForm({
												...form,
												tipoAno
											}),
											rotulo: (numero, ano) => rotuloTipo(form.tipo, numero, ano),
											obrigatorio: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
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
										}),
										form.status === "cancelado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: "No cancelamento, o número do processo, o número do tipo, a comunicação interna, a origem, a data de início e o link de cancelamento são obrigatórios."
										}),
										pedePrevisao(form.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Previsão de conclusão da etapa",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												value: form.previsao,
												onChange: (e) => setForm({
													...form,
													previsao: e.target.value
												}),
												className: inputCls$1,
												required: true
											})
										}),
										form.status === "encerrado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Data de encerramento",
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
										}),
										form.status !== "encerrado" && form.status !== "cancelado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: form.status === "execucao" ? "Avisar dias antes do fim da vigência" : "Avisar dias antes da previsão",
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
										form.status !== "execucao" && form.status !== "encerrado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Valor estimado",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.valorEstimado,
												onChange: (e) => setForm({
													...form,
													valorEstimado: mascaraReais(e.target.value)
												}),
												className: inputCls$1,
												inputMode: "decimal",
												placeholder: "0,00"
											})
										}),
										form.status === "encerrado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
											label: "Valor total",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.valorTotal,
												onChange: (e) => setForm({
													...form,
													valorTotal: mascaraReais(e.target.value)
												}),
												className: inputCls$1,
												inputMode: "decimal",
												placeholder: "0,00",
												required: true
											})
										}),
										form.status === "execucao" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-3 rounded-2xl border border-line bg-paper p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-muted",
													children: "A execução inclui o contrato. O aviso conta do fim da vigência."
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
															documento: mascaraDocumento(e.target.value)
														}),
														className: inputCls$1,
														inputMode: "numeric",
														placeholder: "000.000.000-00"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-3 sm:grid-cols-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
														label: "Valor anual",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: form.valorTotal,
															onChange: (e) => setForm({
																...form,
																valorTotal: mascaraReais(e.target.value)
															}),
															className: inputCls$1,
															inputMode: "decimal",
															placeholder: "0,00",
															required: true
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
														label: "Valor mensal",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															value: form.valorMensal,
															onChange: (e) => setForm({
																...form,
																valorMensal: mascaraReais(e.target.value)
															}),
															className: inputCls$1,
															inputMode: "decimal",
															placeholder: "0,00",
															required: true
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
									] })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 border-t border-line px-5 py-4",
								children: [erros.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
									children: erros.map((erro) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: erro }, erro))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
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
						})]
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open: andamentoId !== null,
					onOpenChange: (open) => {
						if (open) return;
						setAndamentoId(null);
						setLinksAndamento({});
						setEscolhaLink(false);
					},
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
									label: "Status",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: statusAndamento,
										onChange: (e) => setStatusAndamento(e.target.value),
										className: inputCls$1,
										children: STATUS_ADMIN.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: status,
											children: statusAdminLabel(status)
										}, status))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: "O que aconteceu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: notaAndamento,
										onChange: (e) => setNotaAndamento(e.target.value),
										className: "min-h-24 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink"
									})
								}),
								TIPOS_LINK_ANDAMENTO.filter((item) => item.id in linksAndamento).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: item.rotulo,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										inputMode: "url",
										value: linksAndamento[item.id] ?? "",
										onChange: (e) => setLinksAndamento({
											...linksAndamento,
											[item.id]: e.target.value
										}),
										className: inputCls$1,
										placeholder: "https://"
									})
								}, item.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setEscolhaLink(true),
									className: "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-medium text-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }), "Adicionar link"]
								}),
								statusAndamento !== lista.find((item) => item.id === andamentoId)?.status && statusAndamento !== "cancelado" && lista.find((item) => item.id === andamentoId)?.tipo !== "Outros" && lista.find((item) => item.id === andamentoId)?.tipo !== "Doação" && (statusAndamento === "execucao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Vigência — início",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: vigenciaInicioAnd,
											onChange: (e) => setVigenciaInicioAnd(e.target.value),
											className: inputCls$1
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
										label: "Vigência — fim",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: vigenciaFimAnd,
											onChange: (e) => setVigenciaFimAnd(e.target.value),
											className: inputCls$1
										})
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
									label: statusAndamento === "encerrado" ? "Data de encerramento" : "Previsão da etapa",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: novoEncerramento,
										onChange: (e) => setNovoEncerramento(e.target.value),
										className: inputCls$1
									})
								})),
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
					open: escolhaLink,
					onOpenChange: setEscolhaLink,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-30 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "fixed inset-x-3 top-1/2 z-30 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-sm md:-translate-x-1/2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-display text-2xl text-ink",
								children: "Qual link?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "mt-1 text-sm text-muted",
								children: "Escolha o link. O campo volta na tela de andamento."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-col gap-2",
								children: TIPOS_LINK_ANDAMENTO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										const processo = lista.find((atual) => atual.id === andamentoId);
										setLinksAndamento((previo) => ({
											...previo,
											[item.id]: previo[item.id] ?? (processo ? processo[item.campo] : "")
										}));
										setEscolhaLink(false);
									},
									className: "inline-flex h-11 items-center rounded-xl border border-line px-3 text-left text-sm font-medium text-ink",
									children: item.rotulo
								}, item.id))
							})
						]
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
		})
	});
}
function imprimirRelatorio$1(alvo) {
	const artigo = alvo instanceof HTMLElement ? alvo.closest("article") : null;
	if (!artigo) {
		window.print();
		return;
	}
	const marca = document.createElement("span");
	artigo.before(marca);
	document.body.appendChild(artigo);
	document.body.classList.add("imprimindo");
	const voltar = () => {
		marca.replaceWith(artigo);
		document.body.classList.remove("imprimindo");
	};
	window.addEventListener("afterprint", voltar, { once: true });
	window.print();
}
function CardAdmin({ processo, equipes, onMover, onEditar, onAndamento, onExcluir }) {
	const [detalhes, setDetalhes] = (0, import_react.useState)(false);
	const [moverAberto, setMoverAberto] = (0, import_react.useState)(false);
	const tom = TOM$1[urgenciaAdmin(processo)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		draggable: true,
		onDragStart: (evento) => {
			evento.dataTransfer.setData("text/plain", processo.id);
			evento.dataTransfer.effectAllowed = "move";
		},
		className: "relative flex h-full cursor-grab flex-col overflow-hidden rounded-2xl border border-line bg-sheet active:cursor-grabbing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute inset-y-0 left-0 w-1.5 ${tom.bar}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col px-3 py-3 pl-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${tom.badge}`,
						children: prazoAdminLabel(processo)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 truncate font-display text-xl leading-none tracking-tight text-ink",
						children: processo.numero ? rotuloNumero(processo.numero, processo.numeroAno) : statusAdminLabel(processo.status)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 truncate text-sm leading-tight text-pine",
						children: [processo.tipo, processo.tipo !== "Outros" && processo.tipoNumero != null && processo.tipoAno != null ? ` · ${String(processo.tipoNumero).padStart(2, "0")}/${processo.tipoAno}` : ""]
					}),
					processo.referencia && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-sm font-medium text-ink",
						children: processo.referencia
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-muted",
						children: statusAdminLabel(processo.status)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex flex-wrap gap-1.5 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onAndamento,
								className: "inline-flex h-8 items-center rounded-lg bg-pine-soft px-2.5 text-xs font-medium text-pine",
								children: "Andamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDetalhes(true),
								className: "inline-flex h-8 items-center rounded-lg border border-line px-2.5 text-xs font-medium text-ink",
								children: "Detalhes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMoverAberto((v) => !v),
								className: "inline-flex h-8 items-center rounded-lg border border-line px-2.5 text-xs font-medium text-ink",
								children: "Mover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onEditar,
								className: "inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-xs font-medium text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Editar"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onExcluir,
								className: "inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-xs font-medium text-seal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Excluir"]
							})
						]
					}),
					moverAberto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-1 rounded-xl border border-line bg-paper p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 text-xs text-muted",
								children: "Ou arraste o card até a equipe."
							}),
							processo.equipeId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMoverAberto(false);
									onMover(processo.id, null);
								},
								className: "h-9 rounded-lg px-2 text-left text-sm font-medium text-ink hover:bg-sheet",
								children: "Só meus"
							}),
							equipes.filter((equipe) => equipe.id !== processo.equipeId).map((equipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMoverAberto(false);
									onMover(processo.id, equipe.id);
								},
								className: "h-9 rounded-lg px-2 text-left text-sm font-medium text-ink hover:bg-sheet",
								children: equipe.nome
							}, equipe.id)),
							!processo.equipeId && equipes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 text-sm text-muted",
								children: "Crie uma equipe para mover o processo."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: detalhes,
				onOpenChange: setDetalhes,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-20 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed inset-x-3 top-4 bottom-4 z-20 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-display text-2xl text-ink",
							children: processo.numero ? rotuloNumero(processo.numero, processo.numeroAno) : "Processo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "mt-1 text-sm text-pine",
							children: [processo.tipo, processo.tipo !== "Outros" && processo.tipoNumero != null && processo.tipoAno != null ? ` · ${String(processo.tipoNumero).padStart(2, "0")}/${processo.tipoAno}` : ""]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							className: "grid size-10 place-items-center rounded-lg text-muted",
							"aria-label": "Fechar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-y-auto px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid grid-cols-2 gap-x-3 gap-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Número do processo",
										valor: processo.numero ? rotuloNumero(processo.numero, processo.numeroAno) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Número do tipo",
										valor: processo.tipoNumero != null ? `${String(processo.tipoNumero).padStart(2, "0")}/${processo.tipoAno ?? ""}` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Referência",
										valor: processo.referencia || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Status",
										valor: statusAdminLabel(processo.status)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Objeto",
										valor: processo.objeto || "—",
										largo: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Comunicação interna",
										valor: processo.ciNumero != null ? formatarPeca(processo.ciNumero, processo.ciAno) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Origem da CI",
										valor: processo.ciOrigem || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Parecer",
										valor: processo.parecerNumero != null ? formatarPeca(processo.parecerNumero, processo.parecerAno) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Início",
										valor: processo.tipo === "Outros" || processo.tipo === "Doação" ? "—" : formatDate(processo.dataInicio)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Previsão",
										valor: processo.previsaoEtapa ? formatDate(processo.previsaoEtapa) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Encerramento",
										valor: processo.tipo === "Outros" || processo.tipo === "Doação" ? "—" : formatDate(processo.encerramento)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Aviso",
										valor: `${processo.alertaDias} dias antes`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Contratado",
										valor: processo.contratado || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "CPF ou CNPJ",
										valor: processo.documento || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Vigência",
										valor: processo.vigenciaInicio ? `${formatDate(processo.vigenciaInicio)} a ${processo.vigenciaFim ? formatDate(processo.vigenciaFim) : "—"}` : "—",
										largo: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Valor estimado",
										valor: formatarReais(processo.valorEstimadoCentavos)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Valor anual",
										valor: formatarReais(processo.valorTotalCentavos)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Valor mensal",
										valor: formatarReais(processo.valorMensalCentavos)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Lançado por",
										valor: processo.autorNome || "sem nome"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
										rotulo: "Equipe",
										valor: equipes.find((equipe) => equipe.id === processo.equipeId)?.nome ?? "Só meus"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col gap-2",
								children: [
									processo.linkAbertura && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoLink, {
										href: processo.linkAbertura,
										texto: "Publicação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4" })
									}),
									processo.linkRetificacao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoLink, {
										href: processo.linkRetificacao,
										texto: "Retificação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "size-4" })
									}),
									processo.linkCancelamento && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoLink, {
										href: processo.linkCancelamento,
										texto: "Cancelamento",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" })
									}),
									processo.linkHomologacao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoLink, {
										href: processo.linkHomologacao,
										texto: "Homologação",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
									}),
									processo.linkPncp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoLink, {
										href: processo.linkPncp,
										texto: "PNCP",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandeiraBrasil, {})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl text-ink",
								children: "Histórico"
							}),
							processo.historico.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: "Nenhum lançamento."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 flex flex-col gap-2",
								children: [...processo.historico].reverse().map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-ink",
											children: item.texto
										}),
										item.link && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: item.link,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "mt-1 inline-flex items-center gap-1 text-pine",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3.5" }), "Link"]
										})
									]
								}, item.id))
							})
						]
					})]
				})] })
			})
		]
	});
}
function RelatorioPecas({ ano, onAno, relatorio, onGerar }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print rounded-2xl border border-line bg-sheet p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Comunicações e pareceres"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Lista à parte, com o número de cada peça e a referência do processo administrativo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 max-w-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
					label: "Ano da peça",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: ano,
						onChange: (e) => onAno(e.target.value),
						className: inputCls$1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "todos",
							children: "Todos os anos"
						}), anosDePeca().map((opcao) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opcao,
							children: opcao
						}, opcao))]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onGerar,
				className: "mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Gerar relatório"]
			})
		]
	}), relatorio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "relatorio-folha rounded-2xl border border-line bg-sheet p-4 md:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-pine",
					children: "Processos administrativos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-ink sm:text-3xl",
					children: "Comunicações internas e pareceres"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						relatorio.rotulo,
						" · ",
						relatorio.itens.length,
						" ",
						relatorio.itens.length === 1 ? "processo" : "processos"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: (evento) => imprimirRelatorio$1(evento.currentTarget),
				className: "no-print inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-medium text-ink sm:w-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Imprimir ou salvar PDF"]
			})]
		}), relatorio.itens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Nenhuma comunicação interna ou parecer neste recorte."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "relatorio-cards mt-4 flex flex-col gap-3 md:hidden",
			children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl border border-line bg-paper p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: rotuloNumero(item.numero, item.numeroAno)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-ink",
						children: item.referencia || "Sem referência"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Comunicação interna"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink",
						children: formatarPeca(item.ciNumero, item.ciAno)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Origem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "break-words text-ink",
						children: item.ciOrigem || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: "Parecer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-ink",
						children: formatarPeca(item.parecerNumero, item.parecerAno)
					})
				]
			}, item.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relatorio-tabela-wrap mt-4 hidden md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "relatorio-tabela w-full border-collapse text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Processo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Referência"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Comunicação interna"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Origem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Parecer"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line align-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 font-medium text-ink",
							children: rotuloNumero(item.numero, item.numeroAno)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink",
							children: item.referencia || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink",
							children: formatarPeca(item.ciNumero, item.ciAno)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 pr-3 text-ink",
							children: item.ciOrigem || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2 text-ink",
							children: formatarPeca(item.parecerNumero, item.parecerAno)
						})
					]
				}, item.id)) })]
			})
		})] })]
	})] });
}
function CamposLinks({ form, onChange }) {
	const obrigatorio = exigeLinks(form.tipo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Link de publicação",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				inputMode: "url",
				value: form.linkAbertura,
				onChange: (e) => onChange({
					...form,
					linkAbertura: e.target.value
				}),
				className: inputCls$1,
				placeholder: "https://",
				required: obrigatorio
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Houve retificação?",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: form.houveRetificacao ? "sim" : "nao",
				onChange: (e) => {
					const sim = e.target.value === "sim";
					onChange({
						...form,
						houveRetificacao: sim,
						linkRetificacao: sim ? form.linkRetificacao : ""
					});
				},
				className: inputCls$1,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "nao",
					children: "Não"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "sim",
					children: "Sim"
				})]
			})
		}),
		form.houveRetificacao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Link da retificação",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				inputMode: "url",
				value: form.linkRetificacao,
				onChange: (e) => onChange({
					...form,
					linkRetificacao: e.target.value
				}),
				className: inputCls$1,
				placeholder: "https://",
				required: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Link de homologação",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				inputMode: "url",
				value: form.linkHomologacao,
				onChange: (e) => onChange({
					...form,
					linkHomologacao: e.target.value
				}),
				className: inputCls$1,
				placeholder: "https://"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Link do PNCP",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				inputMode: "url",
				value: form.linkPncp,
				onChange: (e) => onChange({
					...form,
					linkPncp: e.target.value
				}),
				className: inputCls$1,
				placeholder: "https://"
			})
		}),
		form.status === "cancelado" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
			label: "Link de cancelamento",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				inputMode: "url",
				value: form.linkCancelamento,
				onChange: (e) => onChange({
					...form,
					linkCancelamento: e.target.value
				}),
				className: inputCls$1,
				placeholder: "https://",
				required: true
			})
		})
	] });
}
function BotaoLink({ href, texto, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-paper px-3 text-sm font-medium text-ink",
		children: [children, texto]
	});
}
function BandeiraBrasil() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 20 14",
		className: "h-3.5 w-5 shrink-0 rounded-[2px]",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "20",
				height: "14",
				fill: "#009b3a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "10,1.2 18.6,7 10,12.8 1.4,7",
				fill: "#fedf00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "10",
				cy: "7",
				r: "2.7",
				fill: "#002776"
			})
		]
	});
}
function CartaoProcesso({ item }) {
	const marco = marcoAdmin(item);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-xl border border-line bg-paper p-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-ink",
					children: rotuloNumero(item.numero, item.numeroAno)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-right text-ink",
					children: item.valorTotalCentavos != null ? formatarReais(item.valorTotalCentavos) : item.valorEstimadoCentavos != null ? `${formatarReais(item.valorEstimadoCentavos)} estimado` : "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 break-words text-pine",
				children: rotuloTipo(item.tipo, item.tipoNumero, item.tipoAno)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 break-words text-ink",
				children: item.referencia || "Sem referência"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted",
				children: [statusAdminLabel(item.status), marco.data ? ` · ${formatDate(marco.data)}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 break-words text-ink",
				children: [item.possuiContrato ? item.contratado || "Contrato" : "Sem contrato", item.valorMensalCentavos != null ? ` · ${formatarReais(item.valorMensalCentavos)} / mês` : ""]
			})
		]
	});
}
function PecaCampos({ titulo, numero, ano, onNumero, onAno, rotulo, obrigatorio = true }) {
	const pronto = numeroPeca(numero);
	const previa = pronto == null ? "número/ano" : rotulo ? rotulo(pronto, ano) : `${pronto}/${ano}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 rounded-2xl border border-line bg-paper p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ink",
				children: titulo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_9rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
					label: "Número",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: numero,
						onChange: (e) => onNumero(e.target.value.replace(/\D/g, "").slice(0, 6)),
						className: inputCls$1,
						inputMode: "numeric",
						placeholder: "Ex.: 12",
						required: obrigatorio
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo$1, {
					label: "Ano",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: ano,
						onChange: (e) => onAno(Number(e.target.value)),
						className: inputCls$1,
						children: anosDePeca().map((opcao) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: opcao,
							children: opcao
						}, opcao))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Fica como ",
					previa,
					"."
				]
			})
		]
	});
}
function Info({ rotulo, valor, largo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: largo ? "col-span-2" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: rotulo
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-ink",
			children: valor
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
			className: "mt-1 text-xs leading-tight text-muted",
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
function BotaoConfiguracoes({ equipes }) {
	const [aberto, setAberto] = (0, import_react.useState)(false);
	const [prefs, setPrefs] = (0, import_react.useState)(() => lerPreferencias());
	const [aviso, setAviso] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!aberto) return;
		setPrefs(lerPreferencias());
		setAviso("");
	}, [aberto]);
	function salvar() {
		const equipeId = prefs.escopo === "equipe" ? prefs.equipeId || equipes[0]?.id || null : prefs.equipeId;
		if (prefs.escopo === "equipe" && !equipeId) {
			setAviso("Crie uma equipe antes de escolhê-la como abertura.");
			return;
		}
		gravarPreferencias({
			...prefs,
			equipeId: prefs.escopo === "equipe" ? equipeId : null
		});
		setAviso("Guardado. Tema já aplicado. A parte e a equipe valem na próxima abertura.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: aberto,
		onOpenChange: setAberto,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Configurações",
				className: "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-sheet text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed inset-x-3 top-4 bottom-4 z-40 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl text-ink",
						children: "Configurações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-1 text-sm text-muted",
						children: "Tema, parte inicial e de onde abrir os processos."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "grid size-9 place-items-center rounded-full text-muted hover:bg-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 overflow-y-auto px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "text-sm font-medium text-ink",
									children: "Aparência"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "tema",
									valor: "claro",
									atual: prefs.tema,
									onChange: (tema) => setPrefs({
										...prefs,
										tema
									}),
									children: "Modo claro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "tema",
									valor: "escuro",
									atual: prefs.tema,
									onChange: (tema) => setPrefs({
										...prefs,
										tema
									}),
									children: "Modo escuro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "tema",
									valor: "auto",
									atual: prefs.tema,
									onChange: (tema) => setPrefs({
										...prefs,
										tema
									}),
									children: "Automático, segue o dispositivo"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-sm font-medium text-ink",
								children: "Cor"
							}), CORES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Opcao, {
								nome: "cor",
								valor: item.id,
								atual: prefs.cor,
								onChange: (cor) => setPrefs({
									...prefs,
									cor
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-4 shrink-0 rounded-full border border-line",
									style: { background: item.amostra }
								}), item.nome]
							}, item.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "text-sm font-medium text-ink",
									children: "Ao abrir o sistema"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "area",
									valor: "legislativo",
									atual: prefs.area,
									onChange: (area) => setPrefs({
										...prefs,
										area
									}),
									children: "Processos legislativos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "area",
									valor: "administrativo",
									atual: prefs.area,
									onChange: (area) => setPrefs({
										...prefs,
										area
									}),
									children: "Processos administrativos"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "text-sm font-medium text-ink",
									children: "Processos iniciais"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "escopo",
									valor: "meus",
									atual: prefs.escopo,
									onChange: () => setPrefs({
										...prefs,
										escopo: "meus"
									}),
									children: "Só os meus"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Opcao, {
									nome: "escopo",
									valor: "equipe",
									atual: prefs.escopo,
									onChange: () => setPrefs({
										...prefs,
										escopo: "equipe",
										equipeId: prefs.equipeId || equipes[0]?.id || null
									}),
									children: "Uma equipe"
								}),
								prefs.escopo === "equipe" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-1 flex flex-col gap-1 text-sm text-muted",
									children: ["Equipe", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: prefs.equipeId ?? "",
										onChange: (e) => setPrefs({
											...prefs,
											equipeId: e.target.value || null
										}),
										className: "h-11 rounded-xl border border-line bg-paper px-3 text-sm text-ink",
										children: [equipes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Nenhuma equipe"
										}), equipes.map((equipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: equipe.id,
											children: equipe.nome
										}, equipe.id))]
									})]
								})
							]
						}),
						aviso && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ink",
							children: aviso
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-line px-5 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: salvar,
						className: "inline-flex h-11 w-full items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet",
						children: "Salvar"
					})
				})
			]
		})] })]
	});
}
function Opcao({ nome, valor, atual, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "radio",
			name: nome,
			value: valor,
			checked: atual === valor,
			onChange: () => onChange(valor)
		}), children]
	});
}
var CORES = [
	{
		id: "padrao",
		nome: "Padrão — verde no claro, azul claro no escuro",
		amostra: "linear-gradient(135deg,#1c4738 50%,#8ec8f2 50%)"
	},
	{
		id: "verde",
		nome: "Verde",
		amostra: "#1c4738"
	},
	{
		id: "vinho",
		nome: "Vinho",
		amostra: "#6e1f3d"
	},
	{
		id: "azul",
		nome: "Azul",
		amostra: "#1a4e86"
	},
	{
		id: "laranja",
		nome: "Laranja",
		amostra: "#8f3d0c"
	},
	{
		id: "roxo",
		nome: "Roxo",
		amostra: "#5c2d82"
	}
];
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
		label: "Arquivados"
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
	if (numeroComAno(antes.numero, antes.dataLancamento) !== juntarNumero(form.numero, form.numeroAno)) partes.push("o número");
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
		const numero = numeroComAno(a.numero, a.dataLancamento).localeCompare(numeroComAno(b.numero, b.dataLancamento), "pt-BR", { numeric: true });
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
		numeroAno: (/* @__PURE__ */ new Date()).getFullYear(),
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
	const partes = separarNumero$1(p.numero, p.dataLancamento);
	return {
		numero: partes.numero,
		numeroAno: partes.ano,
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
		label: "Arquivado"
	}
};
function PranchetaGrafico({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className,
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "3.5",
				width: "12",
				height: "17",
				rx: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3.5h6v2.2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 17.5V14" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 17.5v-6" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 17.5v-3.5" })
		]
	});
}
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
	const [retorno, setRetorno] = (0, import_react.useState)("");
	const [vetoAlcance, setVetoAlcance] = (0, import_react.useState)("");
	const [leiTipo, setLeiTipo] = (0, import_react.useState)("");
	const [leiNumero, setLeiNumero] = (0, import_react.useState)("");
	const [leiAno, setLeiAno] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [apreciacao, setApreciacao] = (0, import_react.useState)("");
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [perm, setPerm] = (0, import_react.useState)("unsupported");
	const [toast, setToast] = (0, import_react.useState)("");
	const [equipes, setEquipes] = (0, import_react.useState)([]);
	const [equipeAtual, setEquipeAtual] = (0, import_react.useState)(null);
	const [tipoAba, setTipoAba] = (0, import_react.useState)("todos");
	const [ordemCampo, setOrdemCampo] = (0, import_react.useState)("numero");
	const [ordemDir, setOrdemDir] = (0, import_react.useState)("asc");
	const [guia, setGuia] = (0, import_react.useState)("lista");
	const [periodoRelatorio, setPeriodoRelatorio] = (0, import_react.useState)("mensal");
	const [ancoraRelatorio, setAncoraRelatorio] = (0, import_react.useState)(() => todayIso().slice(0, 7));
	const [situacaoRelatorio, setSituacaoRelatorio] = (0, import_react.useState)("todos");
	const [relatorio, setRelatorio] = (0, import_react.useState)(null);
	const [perfilOpen, setPerfilOpen] = (0, import_react.useState)(false);
	const [nomePerfil, setNomePerfil] = (0, import_react.useState)("");
	const [salvandoPerfil, setSalvandoPerfil] = (0, import_react.useState)(false);
	const [parte, setParte] = (0, import_react.useState)(0);
	const [area, setArea] = (0, import_react.useState)("legislativo");
	const tresColunas = useGradeTresColunas();
	const meuNome = user?.displayName?.trim() || "Sem nome";
	const aberturaAplicada = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (typeof Notification === "undefined") setPerm("unsupported");
		else setPerm(Notification.permission);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user?.id) return;
		let cancelado = false;
		const usuarioId = user.id;
		if (!aberturaAplicada.current) {
			aberturaAplicada.current = true;
			const prefs = lerPreferencias();
			const equipeInicial = prefs.escopo === "equipe" ? prefs.equipeId : null;
			if (prefs.area !== area) setArea(prefs.area);
			if (equipeInicial !== equipeAtual) {
				setEquipeAtual(equipeInicial);
				return;
			}
		}
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
				const comAno = garantirAno(lista);
				setProcessos(comAno);
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
	(0, import_react.useEffect)(() => {
		if (!user?.id || !ready) return;
		const id = window.setInterval(() => {
			listarProcessos({ data: equipeAtual }).then((lista) => setProcessos(garantirAno(lista))).catch(() => void 0);
			listarEquipes().then((minhas) => setEquipes(minhas)).catch(() => void 0);
		}, 3e4);
		return () => window.clearInterval(id);
	}, [
		user?.id,
		equipeAtual,
		ready
	]);
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
		if (!/^\d{4}$/.test(String(f.numeroAno))) lista.push("Informe o ano do processo.");
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
				numero: juntarNumero(form.numero, form.numeroAno),
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
			numero: juntarNumero(form.numero, form.numeroAno),
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
			autorNome: meuNome,
			retorno: null,
			vetoAlcance: null,
			leiTipo: null,
			leiNumero: null,
			leiAno: null,
			apreciacaoPrazo: null
		};
		if (await persistir([criado, ...processos], criado, null, "Processo lançado")) setFormOpen(false);
	}
	async function registrarAndamento() {
		if (!andamentoId) return;
		const texto = notaAndamento.trim();
		const atual = processos.find((p) => p.id === andamentoId);
		if (!atual) return;
		if (!texto && !retorno) return;
		const numero = Number(leiNumero);
		if (retorno === "veto") {
			if (vetoAlcance !== "integral" && vetoAlcance !== "parcial") {
				setToast("Informe se o veto é integral ou parcial.");
				return;
			}
			if (!Number.isInteger(numero) || numero < 1 || !apreciacao) {
				setToast("Informe o número, o ano e o prazo de apreciação do veto.");
				return;
			}
		}
		if (retorno === "sancionada") {
			if (!leiTipo || !Number.isInteger(numero) || numero < 1) {
				setToast("Informe o tipo, o número e o ano da lei.");
				return;
			}
		}
		const peca = retorno ? `${String(numero).padStart(2, "0")}/${leiAno}` : "";
		const resumo = !retorno ? texto : retorno === "sancionada" ? `Retornou como sancionada · ${leiTipo} ${peca}${texto ? `. ${texto}` : ""}` : `Retornou como veto ${vetoAlcance} · ${peca}. Apreciação até ${formatDate(apreciacao)}${texto ? `. ${texto}` : ""}`;
		const atualizado = {
			...atual,
			prazo: retorno === "veto" ? apreciacao : novoPrazo || atual.prazo,
			retorno: retorno || null,
			vetoAlcance: retorno === "veto" ? vetoAlcance : null,
			leiTipo: retorno === "sancionada" ? leiTipo : null,
			leiNumero: retorno ? numero : null,
			leiAno: retorno ? leiAno : null,
			apreciacaoPrazo: retorno === "veto" ? apreciacao : null,
			historico: [...atual.historico, evento(resumo, meuNome)]
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
		persistir(processos.map((p) => p.id === id ? atualizado : p), atualizado, null, "Enviado para Arquivados").then((ok) => {
			if (ok) {
				setGuia("lista");
				setFiltro("concluidos");
			}
		});
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
	const moverLegislativo = (0, import_react.useCallback)(async (id, equipeId) => {
		const atual = processos.find((item) => item.id === id);
		if (!atual || (atual.equipeId ?? null) === equipeId) return;
		try {
			await moverProcesso({ data: {
				id,
				equipeId
			} });
			setProcessos(await listarProcessos({ data: equipeAtual }));
			setToast(equipeId ? "Processo movido para a equipe." : "Processo movido para os seus.");
		} catch (err) {
			setToast(err instanceof Error ? err.message : "Não foi possível mover.");
		}
	}, [equipeAtual, processos]);
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
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarregandoTemis, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelaConta, {});
	if (!ready || contaId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarregandoTemis, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-8 md:py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl leading-tight text-ink sm:text-3xl",
					children: "Assistente do Poder Legislativo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotaoConfiguracoes, { equipes }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setNomePerfil(user.displayName ?? "");
									setPerfilOpen(true);
								},
								className: "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line bg-sheet px-4 text-sm font-medium text-ink sm:flex-none",
								children: "Perfil"
							})]
						}),
						area !== "administrativo" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: abrirNovo,
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
					className: "inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium " + (area === "legislativo" ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
					children: "Processos Legislativos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": area === "administrativo",
					onClick: () => setArea("administrativo"),
					className: "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium " + (area === "administrativo" ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PranchetaGrafico, { className: "size-5 shrink-0" }), "Controle e Estatística de Processos Administrativo"]
				})]
			}),
			area === "administrativo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminPainel, {
				equipeAtual,
				equipes,
				meuNome,
				sinalNovo: 0,
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
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoltarProcessoContext.Provider, {
				value: moverLegislativo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setGuia("lista"),
									className: "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium " + (guia === "lista" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
									children: "Lista"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setGuia("estatisticas"),
									className: "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium " + (guia === "estatisticas" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }), "Estatísticas"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setGuia("relatorio"),
									className: "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium " + (guia === "relatorio" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), "Relatório"]
								})
							]
						}), guia === "estatisticas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainelEstatisticas, { processos }) : guia === "relatorio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatorioLegislativo, {
							periodo: periodoRelatorio,
							ancora: ancoraRelatorio,
							situacao: situacaoRelatorio,
							relatorio,
							onPeriodo: setPeriodoRelatorio,
							onAncora: setAncoraRelatorio,
							onSituacao: setSituacaoRelatorio,
							onGerar: () => {
								const intervalo = intervaloPeriodo(ancoraRelatorio, periodoRelatorio);
								if (!intervalo) {
									setToast("Escolha um mês de referência.");
									return;
								}
								const itens = processos.filter((item) => item.dataLancamento <= intervalo.fim && item.prazo >= intervalo.inicio).filter((item) => passaSituacao(item, situacaoRelatorio)).sort((a, b) => numeroComAno(a.numero, a.dataLancamento).localeCompare(numeroComAno(b.numero, b.dataLancamento), "pt-BR", { numeric: true }));
								setRelatorio({
									...intervalo,
									itens
								});
							}
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
															children: numeroComAno(p.numero, p.dataLancamento)
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
										children: FILTROS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setFiltro(item.id),
											className: "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium " + (filtro === item.id ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink"),
											children: [
												item.id === "concluidos" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5" }),
												item.label,
												item.id === "concluidos" ? ` (${processos.filter((p) => p.status === "concluido").length})` : ""
											]
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
										children: processos.length === 0 ? equipeSelecionada ? "Nenhum processo nesta equipe. Lance um para todos acompanharem o prazo." : "Lance o primeiro processo com a data e o prazo de resposta." : filtro === "concluidos" ? "A pasta Arquivados está vazia. Ao concluir um processo, ele vem para cá." : "Nada corresponde a este filtro ou à busca."
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
									equipes,
									onMover: moverLegislativo,
									onEditar: () => abrirEdicao(p),
									onAndamento: () => {
										setAndamentoId(p.id);
										setNotaAndamento("");
										setNovoPrazo("");
										setRetorno(p.retorno ?? "");
										setVetoAlcance(p.vetoAlcance ?? "");
										setLeiTipo(p.leiTipo ?? "");
										setLeiNumero(p.leiNumero != null ? String(p.leiNumero) : "");
										setLeiAno(p.leiAno ?? (/* @__PURE__ */ new Date()).getFullYear());
										setApreciacao(p.apreciacaoPrazo ?? "");
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
				})
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
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-[1fr_auto_7rem] items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.numero,
												onChange: (e) => {
													const bruto = e.target.value;
													const corte = /^(.*)\/(\d{1,4})$/.exec(bruto);
													if (corte) {
														setForm({
															...form,
															numero: corte[1],
															numeroAno: Number(corte[2])
														});
														return;
													}
													setForm({
														...form,
														numero: bruto.replace(/\/+$/, "")
													});
												},
												className: inputCls,
												placeholder: "198",
												inputMode: "numeric",
												required: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg text-muted",
												"aria-hidden": true,
												children: "/"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: form.numeroAno || "",
												onChange: (e) => {
													const digitos = e.target.value.replace(/\D/g, "").slice(0, 4);
													setForm({
														...form,
														numeroAno: digitos ? Number(digitos) : 0
													});
												},
												className: inputCls,
												placeholder: "2026",
												inputMode: "numeric",
												"aria-label": "Ano do processo",
												required: true
											})
										]
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
										placeholder: "O que aconteceu"
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Retornou como",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: retorno,
										onChange: (e) => setRetorno(e.target.value),
										className: inputCls,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Ainda não"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "veto",
												children: "Veto"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "sancionada",
												children: "Sancionada"
											})
										]
									})
								}),
								retorno === "veto" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Veto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: vetoAlcance,
										onChange: (e) => setVetoAlcance(e.target.value),
										className: inputCls,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "Integral ou parcial"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "integral",
												children: "Integral"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "parcial",
												children: "Parcial"
											})
										]
									})
								}),
								retorno === "sancionada" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Tipo de lei",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: leiTipo,
										onChange: (e) => setLeiTipo(e.target.value),
										className: inputCls,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Escolha"
										}), TIPOS_LEI.map((tipo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: tipo,
											children: tipo
										}, tipo))]
									})
								}),
								retorno && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
										label: "Número",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: leiNumero,
											onChange: (e) => setLeiNumero(e.target.value.replace(/\D/g, "").slice(0, 6)),
											inputMode: "numeric",
											className: inputCls
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
										label: "Ano",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: leiAno,
											onChange: (e) => setLeiAno(Number(e.target.value)),
											inputMode: "numeric",
											className: inputCls
										})
									})]
								}),
								retorno === "veto" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
									label: "Prazo de apreciação",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: apreciacao,
										onChange: (e) => setApreciacao(e.target.value),
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrocaSenhaPerfil, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutenticadorPerfil, {})
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
function ProcessoCard({ processo, equipes, onMover, onEditar, onAndamento, onConcluir, onReabrir, onExcluir }) {
	const [aberto, setAberto] = (0, import_react.useState)(false);
	const [moverAberto, setMoverAberto] = (0, import_react.useState)(false);
	const tom = TOM[urgencia(processo)];
	const ultimo = processo.historico[processo.historico.length - 1];
	const dias = daysUntil(processo.prazo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		draggable: true,
		onDragStart: (evento) => {
			evento.dataTransfer.setData("text/plain", processo.id);
			evento.dataTransfer.effectAllowed = "move";
		},
		className: "relative flex h-full cursor-grab flex-col overflow-hidden rounded-2xl border border-line bg-sheet active:cursor-grabbing",
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
					children: numeroComAno(processo.numero, processo.dataLancamento)
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
				processo.retorno && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm font-medium text-ink",
					children: [processo.retorno === "sancionada" ? `Sancionada · ${processo.leiTipo ?? "Lei"} ${String(processo.leiNumero ?? "").padStart(2, "0")}/${processo.leiAno ?? ""}` : `Veto ${processo.vetoAlcance ?? ""} · ${String(processo.leiNumero ?? "").padStart(2, "0")}/${processo.leiAno ?? ""}`, processo.retorno === "veto" && processo.apreciacaoPrazo ? ` · apreciação ${formatDate(processo.apreciacaoPrazo)}` : ""]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onAndamento,
							className: "inline-flex h-10 items-center gap-1 rounded-lg bg-pine-soft px-3 text-sm font-medium text-pine",
							children: "Andamento"
						}),
						processo.status === "andamento" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onConcluir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Arquivar"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onReabrir,
							className: "inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reabrir"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMoverAberto((v) => !v),
							className: "inline-flex h-10 items-center rounded-lg border border-line px-3 text-sm font-medium text-ink",
							children: "Mover"
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
				}),
				moverAberto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-1 rounded-xl border border-line bg-paper p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 text-xs text-muted",
							children: "Ou arraste o card até a equipe."
						}),
						processo.equipeId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMoverAberto(false);
								onMover(processo.id, null);
							},
							className: "h-9 rounded-lg px-2 text-left text-sm font-medium text-ink hover:bg-sheet",
							children: "Só meus"
						}),
						equipes.filter((equipe) => equipe.id !== processo.equipeId).map((equipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setMoverAberto(false);
								onMover(processo.id, equipe.id);
							},
							className: "h-9 rounded-lg px-2 text-left text-sm font-medium text-ink hover:bg-sheet",
							children: equipe.nome
						}, equipe.id)),
						!processo.equipeId && equipes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 text-sm text-muted",
							children: "Crie uma equipe para mover o processo."
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
	const [sobre, setSobre] = (0, import_react.useState)(null);
	const soltar = (0, import_react.useContext)(SoltarProcessoContext);
	const selecionada = equipes.find((equipe) => equipe.id === atual) ?? null;
	const soltou = (0, import_react.useRef)(false);
	function escolher(id) {
		if (soltou.current) {
			soltou.current = false;
			return;
		}
		onEscolher(id);
	}
	function alvoArraste(chave, equipeId) {
		return {
			onDragOver: (evento) => {
				evento.preventDefault();
				evento.dataTransfer.dropEffect = "move";
				setSobre(chave);
			},
			onDragLeave: () => setSobre((valor) => valor === chave ? null : valor),
			onDrop: (evento) => aoSoltar(evento, equipeId)
		};
	}
	function aoSoltar(evento, equipeId) {
		evento.preventDefault();
		evento.stopPropagation();
		setSobre(null);
		soltou.current = true;
		const id = evento.dataTransfer.getData("text/plain");
		if (id) soltar?.(id, equipeId);
	}
	function classeAlvo(chave, ativo) {
		return "h-10 rounded-xl px-3 text-left text-sm font-medium " + (sobre === chave ? "ring-2 ring-pine " : "") + (ativo ? "bg-ink text-sheet" : "border border-line text-ink");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-sheet p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-medium text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-pine" }), "Equipe"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: "Arraste o processo até a equipe, ou use o botão Mover no card. Soltar em Só meus devolve para você."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => escolher(null),
					...alvoArraste("meus", null),
					className: classeAlvo("meus", atual === null),
					children: "Só meus"
				}), equipes.map((equipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => escolher(equipe.id),
					...alvoArraste(equipe.id, equipe.id),
					className: classeAlvo(equipe.id, atual === equipe.id),
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
function garantirAno(lista) {
	const pendentes = [];
	const saida = lista.map((item) => {
		const numero = numeroComAno(item.numero, item.dataLancamento);
		if (numero === item.numero) return item;
		const atualizado = {
			...item,
			numero
		};
		pendentes.push(atualizado);
		return atualizado;
	});
	for (const item of pendentes) salvarProcesso({ data: item });
	return saida;
}
function passaSituacao(item, situacao) {
	if (situacao === "todos") return true;
	const u = urgencia(item);
	if (situacao === "abertos") return item.status === "andamento";
	if (situacao === "atencao") return precisaAviso(item);
	if (situacao === "vencidos") return u === "vencido";
	if (situacao === "prazo") return u === "ok";
	if (situacao === "concluidos") return item.status === "concluido";
	return true;
}
function imprimirRelatorio(alvo) {
	const artigo = alvo instanceof HTMLElement ? alvo.closest("article") : null;
	if (!artigo) {
		window.print();
		return;
	}
	const marca = document.createElement("span");
	artigo.before(marca);
	document.body.appendChild(artigo);
	document.body.classList.add("imprimindo");
	const voltar = () => {
		marca.replaceWith(artigo);
		document.body.classList.remove("imprimindo");
	};
	window.addEventListener("afterprint", voltar, { once: true });
	window.print();
}
function RelatorioLegislativo({ periodo, ancora, situacao, relatorio, onPeriodo, onAncora, onSituacao, onGerar }) {
	const rotuloSituacao = situacao === "todos" ? "todas as situações" : FILTROS.find((item) => item.id === situacao)?.label.toLowerCase() ?? situacao;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					children: "Entram os processos cujo lançamento e prazo cruzam o período. Os gráficos acompanham o recorte."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
							label: "Período",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: periodo,
								onChange: (e) => onPeriodo(e.target.value),
								className: inputCls,
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
							label: "Mês de referência",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "month",
								value: ancora,
								onChange: (e) => onAncora(e.target.value),
								className: inputCls
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campo, {
							label: "Situação",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: situacao,
								onChange: (e) => onSituacao(e.target.value),
								className: inputCls,
								children: FILTROS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item.id,
									children: item.label
								}, item.id))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onGerar,
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
							children: "Processos legislativos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl text-ink sm:text-3xl",
							children: ["Relatório · ", relatorio.rotulo]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								formatDate(relatorio.inicio),
								" a ",
								formatDate(relatorio.fim),
								" · ",
								rotuloSituacao,
								" · ",
								relatorio.itens.length,
								" ",
								relatorio.itens.length === 1 ? "processo" : "processos"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (evento) => imprimirRelatorio(evento.currentTarget),
						className: "no-print inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-medium text-ink sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Imprimir ou salvar PDF"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainelEstatisticas, {
					processos: relatorio.itens,
					className: "mt-4 grid gap-4 lg:grid-cols-2"
				}),
				relatorio.itens.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Nenhum processo neste período."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "relatorio-cards mt-4 flex flex-col gap-3 md:hidden",
					children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-ink",
								children: numeroComAno(item.numero, item.dataLancamento)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-pine",
								children: item.tipo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-ink",
								children: item.parte
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: item.assunto
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-ink",
								children: [
									prazoLabel(item),
									" · ",
									formatDate(item.prazo)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: rotuloRetorno(item)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-ink",
								children: rotuloResposta(item)
							})
						]
					}, item.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relatorio-tabela-wrap mt-4 hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "relatorio-tabela w-full border-collapse text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Número"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Tipo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Parte"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Assunto"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Prazo"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-3 font-medium",
									children: "Retorno"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "Resposta"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: relatorio.itens.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 font-medium text-ink",
									children: numeroComAno(item.numero, item.dataLancamento)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-ink",
									children: item.tipo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-ink",
									children: item.parte
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-ink",
									children: item.assunto
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 pr-3 text-ink",
									children: [
										prazoLabel(item),
										" · ",
										formatDate(item.prazo)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-3 text-ink",
									children: rotuloRetorno(item)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 text-ink",
									children: rotuloResposta(item)
								})
							]
						}, item.id)) })]
					})
				})] })
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrazosApp, {});
}
//#endregion
export { Home as component };
