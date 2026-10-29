import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { o as GROK_PROVIDERS } from "./server-CWSQxHiz.mjs";
import { s as Scale } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tela-conta-CFmYQvpA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const rawImage = data?.user.image ?? null;
	const profileImageUrl = rawImage && !rawImage.startsWith("data:") ? rawImage : null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
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
function codigoOk(value) {
	const codigo = String(value ?? "").replace(/\D/g, "");
	if (!/^\d{6}$/.test(codigo)) throw new Error("Informe o código de 6 dígitos do aplicativo.");
	return codigo;
}
var estadoAutenticador = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("741b678bcc2696c71669425418e226ee554de3bbeed86baabc48945816557846"));
var iniciarAutenticador = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("2616a2183f45a02ae2daa05c96a0b3b379270807149967e5ebf9bea6f2960e22"));
var confirmarAutenticador = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	return { codigo: codigoOk(input.codigo) };
}).handler(createSsrRpc("488ef22080487581b8a53bbe1fb339cb1e0599278f067c4358c01b19b8920d09"));
var redefinirSenhaAutenticador = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	const email = typeof bruto.email === "string" ? bruto.email.trim().toLowerCase() : "";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("E-mail inválido.");
	const senha = typeof bruto.senha === "string" ? bruto.senha : "";
	if (senha.length < 8) throw new Error("A senha precisa ter pelo menos 8 caracteres.");
	if (senha.length > 128) throw new Error("A senha está longa demais.");
	return {
		email,
		codigo: codigoOk(bruto.codigo),
		senha
	};
}).handler(createSsrRpc("81ab0408d2686930584823078ca5214a2e87a290d8435c00b16504874255473c"));
function TelaConta() {
	const [modo, setModo] = (0, import_react.useState)("criar");
	const [nome, setNome] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [senha, setSenha] = (0, import_react.useState)("");
	const [erro, setErro] = (0, import_react.useState)("");
	const [aviso, setAviso] = (0, import_react.useState)("");
	const [enviando, setEnviando] = (0, import_react.useState)(false);
	async function enviar(event) {
		event.preventDefault();
		if (modo === "esqueci") return;
		setErro("");
		if (modo === "criar" && nome.trim().length < 2) {
			setErro("Informe seu nome.");
			return;
		}
		if (senha.length < 8) {
			setErro("A senha precisa ter pelo menos 8 caracteres.");
			return;
		}
		setEnviando(true);
		try {
			const resultado = modo === "criar" ? await authClient.signUp.email({
				name: nome.trim(),
				email: email.trim(),
				password: senha,
				callbackURL: "/"
			}) : await authClient.signIn.email({
				email: email.trim(),
				password: senha,
				callbackURL: "/"
			});
			if (resultado.error) {
				setErro(traduzir(resultado.error.message ?? ""));
				return;
			}
		} catch (err) {
			setErro(traduzir(err instanceof Error ? err.message : ""));
		} finally {
			setEnviando(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-11 place-items-center rounded-xl bg-pine text-sheet",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
						className: "size-5",
						strokeWidth: 1.75
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl leading-tight text-ink sm:text-3xl",
					children: "Assistente do Poder Legislativo"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: "Crie uma conta para lançar processos e abrir os mesmos dados em qualquer navegador, com o mesmo e-mail e senha."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-2xl border border-line bg-sheet p-5",
				children: modo === "esqueci" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecuperarSenha, {
					emailInicial: email,
					onVoltar: () => {
						setModo("entrar");
						setErro("");
					},
					onPronto: () => {
						setModo("entrar");
						setSenha("");
						setErro("");
						setAviso("Senha atualizada. Entre com a nova senha.");
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: enviar,
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-ink",
							children: modo === "criar" ? "Criar conta" : "Entrar"
						}),
						aviso && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine",
							children: aviso
						}),
						erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
							children: erro
						}),
						modo === "criar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm font-medium text-ink",
							children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: nome,
								onChange: (e) => setNome(e.target.value),
								className: campo,
								autoComplete: "name",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm font-medium text-ink",
							children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: campo,
								autoComplete: "email",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-1 text-sm font-medium text-ink",
							children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: senha,
								onChange: (e) => setSenha(e.target.value),
								className: campo,
								autoComplete: modo === "criar" ? "new-password" : "current-password",
								minLength: 8,
								required: true
							})]
						}),
						modo === "entrar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setModo("esqueci");
								setErro("");
							},
							className: "self-start text-sm font-medium text-pine",
							children: "Esqueci minha senha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: enviando,
							className: "inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
							children: enviando ? "Aguarde…" : modo === "criar" ? "Criar conta" : "Entrar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setModo(modo === "criar" ? "entrar" : "criar");
								setErro("");
							},
							className: "h-11 text-sm font-medium text-pine",
							children: modo === "criar" ? "Já tenho conta" : "Criar uma conta"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: GROK_PROVIDERS.map((provedor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => signIn(provedor.providerId, { callbackURL: "/" }),
					className: "inline-flex h-12 items-center justify-center rounded-xl border border-line bg-sheet text-sm font-medium text-ink",
					children: ["Continuar com ", provedor.label]
				}, provedor.providerId))
			})
		]
	});
}
var campo = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";
function RecuperarSenha({ emailInicial, onVoltar, onPronto }) {
	const [email, setEmail] = (0, import_react.useState)(emailInicial);
	const [codigo, setCodigo] = (0, import_react.useState)("");
	const [senha, setSenha] = (0, import_react.useState)("");
	const [repete, setRepete] = (0, import_react.useState)("");
	const [erro, setErro] = (0, import_react.useState)("");
	const [enviando, setEnviando] = (0, import_react.useState)(false);
	async function redefinir(event) {
		event.preventDefault();
		setErro("");
		if (senha !== repete) {
			setErro("A repetição não é igual à nova senha.");
			return;
		}
		setEnviando(true);
		try {
			await redefinirSenhaAutenticador({ data: {
				email: email.trim(),
				codigo,
				senha
			} });
			onPronto();
		} catch (err) {
			setErro(err instanceof Error ? err.message : "Não foi possível redefinir a senha.");
		} finally {
			setEnviando(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-3",
		onSubmit: (event) => void redefinir(event),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Esqueci minha senha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Digite o e-mail, o código de 6 dígitos do aplicativo autenticador e a nova senha. O código não é enviado por e-mail."
			}),
			erro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal",
				children: erro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					className: campo,
					autoComplete: "email",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["Código do aplicativo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: codigo,
					onChange: (e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6)),
					className: campo,
					inputMode: "numeric",
					autoComplete: "one-time-code",
					placeholder: "000000",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-col gap-1 text-sm font-medium text-ink",
				children: ["Nova senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: senha,
					onChange: (e) => setSenha(e.target.value),
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
				className: "inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60",
				children: enviando ? "Salvando…" : "Redefinir senha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onVoltar,
				className: "h-11 text-sm font-medium text-pine",
				children: "Voltar para entrar"
			})
		]
	});
}
function traduzir(mensagem) {
	const texto = mensagem.toLowerCase();
	if (texto.includes("already") || texto.includes("exist")) return "Já existe uma conta com este e-mail.";
	if (texto.includes("password") && (texto.includes("short") || texto.includes("8") || texto.includes("length"))) return "A senha precisa ter pelo menos 8 caracteres.";
	if (texto.includes("invalid email") || texto.includes("invalid password") || texto.includes("incorrect")) return "E-mail ou senha incorretos.";
	if (texto.includes("otp") && texto.includes("expired")) return "O código expirou. Peça outro.";
	if (texto.includes("too many") || texto.includes("attempts")) return "Muitas tentativas. Peça um código novo.";
	if (texto.includes("invalid otp") || texto.includes("otp")) return "Código incorreto.";
	if (texto.includes("configurado") || texto.includes("e-mail")) return mensagem;
	if (texto.includes("origin")) return "Não foi possível entrar neste endereço.";
	return "Não foi possível concluir. Confira os dados e tente de novo.";
}
//#endregion
export { iniciarAutenticador as a, estadoAutenticador as i, confirmarAutenticador as n, useCurrentUser as o, createSsrRpc as r, useCurrentUserState as s, TelaConta as t };
