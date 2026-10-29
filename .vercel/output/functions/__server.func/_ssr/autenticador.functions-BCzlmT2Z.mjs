import { o as __toESM } from "../_runtime.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-f_0AD5V1.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autenticador.functions-BCzlmT2Z.js
var ISSUER = "Controle de Prazos";
var tentativas = /* @__PURE__ */ new Map();
function limitar(email) {
	const agora = Date.now();
	const item = tentativas.get(email);
	if (item && item.ate > agora && item.n >= 5) throw new Error("Muitas tentativas. Espere alguns minutos e tente de novo.");
	if (!item || item.ate <= agora) tentativas.set(email, {
		n: 1,
		ate: agora + 6e5
	});
	else item.n += 1;
}
function codigoOk(value) {
	const codigo = String(value ?? "").replace(/\D/g, "");
	if (!/^\d{6}$/.test(codigo)) throw new Error("Informe o código de 6 dígitos do aplicativo.");
	return codigo;
}
var estadoAutenticador_createServerFn_handler = createServerRpc({
	id: "741b678bcc2696c71669425418e226ee554de3bbeed86baabc48945816557846",
	name: "estadoAutenticador",
	filename: "src/lib/auth/autenticador.functions.ts"
}, (opts) => estadoAutenticador.__executeServer(opts));
var estadoAutenticador = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(estadoAutenticador_createServerFn_handler, async ({ context }) => {
	return { ativo: (await (await getSql())`
      select confirmado from autenticador where user_id = ${context.userId}
    `)[0]?.confirmado === true };
});
var iniciarAutenticador_createServerFn_handler = createServerRpc({
	id: "2616a2183f45a02ae2daa05c96a0b3b379270807149967e5ebf9bea6f2960e22",
	name: "iniciarAutenticador",
	filename: "src/lib/auth/autenticador.functions.ts"
}, (opts) => iniciarAutenticador.__executeServer(opts));
var iniciarAutenticador = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(iniciarAutenticador_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const email = (await sql`select email from "user" where id = ${context.userId}`)[0]?.email;
	if (!email) throw new Error("Esta conta não tem e-mail.");
	const { randomBytes } = await import("node:crypto");
	const { createOTP } = await import("../_libs/better-auth__utils.mjs").then((n) => n.t);
	const { base32 } = await import("../_libs/better-auth__utils.mjs").then((n) => n.n);
	const QRCode = await import("../_libs/qrcode.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const segredo = randomBytes(20).toString("hex");
	await sql`
      insert into autenticador (user_id, segredo, confirmado, pendente, atualizado_em)
      values (${context.userId}, ${segredo}, false, ${segredo}, now())
      on conflict (user_id) do update
      set pendente = excluded.pendente, atualizado_em = now()
    `;
	const uri = createOTP(segredo, {
		digits: 6,
		period: 30
	}).url(ISSUER, email);
	return {
		chave: base32.encode(segredo, { padding: false }),
		svg: (await QRCode.toString(uri, {
			type: "svg",
			margin: 1,
			width: 196,
			errorCorrectionLevel: "M"
		})).replace(/<\?xml[^>]*>/, "")
	};
});
var confirmarAutenticador_createServerFn_handler = createServerRpc({
	id: "488ef22080487581b8a53bbe1fb339cb1e0599278f067c4358c01b19b8920d09",
	name: "confirmarAutenticador",
	filename: "src/lib/auth/autenticador.functions.ts"
}, (opts) => confirmarAutenticador.__executeServer(opts));
var confirmarAutenticador = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	return { codigo: codigoOk(input.codigo) };
}).handler(confirmarAutenticador_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const linhas = await sql`
      select segredo, pendente from autenticador where user_id = ${context.userId}
    `;
	const alvo = linhas[0]?.pendente || linhas[0]?.segredo;
	if (!alvo) throw new Error("Gere o código do aplicativo antes de confirmar.");
	const { createOTP } = await import("../_libs/better-auth__utils.mjs").then((n) => n.t);
	if (!await createOTP(alvo, {
		digits: 6,
		period: 30
	}).verify(data.codigo, { window: 1 })) throw new Error("Código do aplicativo incorreto.");
	await sql`
      update autenticador
      set segredo = ${alvo}, confirmado = true, pendente = null, atualizado_em = now()
      where user_id = ${context.userId}
    `;
	return { ativo: true };
});
var redefinirSenhaAutenticador_createServerFn_handler = createServerRpc({
	id: "81ab0408d2686930584823078ca5214a2e87a290d8435c00b16504874255473c",
	name: "redefinirSenhaAutenticador",
	filename: "src/lib/auth/autenticador.functions.ts"
}, (opts) => redefinirSenhaAutenticador.__executeServer(opts));
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
}).handler(redefinirSenhaAutenticador_createServerFn_handler, async ({ data }) => {
	limitar(data.email);
	const sql = await getSql();
	const userId = (await sql`select id from "user" where lower(email) = ${data.email}`)[0]?.id;
	const segredos = userId ? await sql`
          select segredo from autenticador where user_id = ${userId} and confirmado = true
        ` : [];
	if (!userId || !segredos[0]) throw new Error("Esta conta não tem aplicativo autenticador. Configure no perfil enquanto souber a senha.");
	const { createOTP } = await import("../_libs/better-auth__utils.mjs").then((n) => n.t);
	if (!await createOTP(segredos[0].segredo, {
		digits: 6,
		period: 30
	}).verify(data.codigo, { window: 1 })) throw new Error("Código do aplicativo incorreto.");
	const { auth } = await import("./server-CWSQxHiz.mjs").then((n) => n.r);
	const ctx = await auth.$context;
	const hash = await ctx.password.hash(data.senha);
	if ((await ctx.internalAdapter.findAccounts(userId))?.find((conta) => conta.providerId === "credential")) await ctx.internalAdapter.updatePassword(userId, hash);
	else await ctx.internalAdapter.createAccount({
		userId,
		providerId: "credential",
		accountId: userId,
		password: hash
	});
	await sql`delete from "session" where "userId" = ${userId}`;
	return { ok: true };
});
//#endregion
export { confirmarAutenticador_createServerFn_handler, estadoAutenticador_createServerFn_handler, iniciarAutenticador_createServerFn_handler, redefinirSenhaAutenticador_createServerFn_handler };
