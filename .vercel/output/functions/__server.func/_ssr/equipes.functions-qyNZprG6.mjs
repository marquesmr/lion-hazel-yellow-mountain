import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { r as getSql } from "./db-f_0AD5V1.mjs";
import { t as authMiddleware } from "./middleware-Bmzeve2m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/equipes.functions-qyNZprG6.js
function emailOk(value) {
	if (typeof value !== "string") throw new Error("E-mail inválido.");
	const email = value.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) throw new Error("E-mail inválido.");
	return email;
}
function papelOk(value) {
	return value === "dono" ? "dono" : "membro";
}
async function aceitarConvites(userId) {
	const sql = await getSql();
	const email = (await sql`select email from "user" where id = ${userId}`)[0]?.email?.toLowerCase();
	if (!email) return;
	await sql`
    insert into equipe_membros (equipe_id, user_id, papel)
    select c.equipe_id, ${userId}, 'membro'
    from equipe_convites c
    where lower(c.email) = ${email}
    on conflict (equipe_id, user_id) do nothing
  `;
	await sql`delete from equipe_convites where lower(email) = ${email}`;
}
var listarEquipes_createServerFn_handler = createServerRpc({
	id: "9ec6aee1e2f22500f0fa0dc638592322b03a1f0ec0cba58ce9bc8fc56368ea5a",
	name: "listarEquipes",
	filename: "src/lib/equipes.functions.ts"
}, (opts) => listarEquipes.__executeServer(opts));
var listarEquipes = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listarEquipes_createServerFn_handler, async ({ context }) => {
	await aceitarConvites(context.userId);
	const sql = await getSql();
	const linhas = await sql`
      select e.id as equipe_id, e.nome, meu.papel as meu_papel,
             m.user_id, u.name, u.email, m.papel
      from equipe_membros meu
      join equipes e on e.id = meu.equipe_id
      join equipe_membros m on m.equipe_id = e.id
      join "user" u on u.id = m.user_id
      where meu.user_id = ${context.userId}
      order by e.nome, u.name
    `;
	const convites = await sql`
      select c.equipe_id, c.email
      from equipe_convites c
      join equipe_membros meu on meu.equipe_id = c.equipe_id
      where meu.user_id = ${context.userId} and meu.papel = 'dono'
      order by c.email
    `;
	const mapa = /* @__PURE__ */ new Map();
	for (const linha of linhas) {
		let equipe = mapa.get(linha.equipe_id);
		if (!equipe) {
			equipe = {
				id: linha.equipe_id,
				nome: linha.nome,
				papel: papelOk(linha.meu_papel),
				membros: [],
				convites: []
			};
			mapa.set(linha.equipe_id, equipe);
		}
		equipe.membros.push({
			userId: linha.user_id,
			nome: linha.name,
			email: linha.email,
			papel: papelOk(linha.papel)
		});
	}
	for (const convite of convites) mapa.get(convite.equipe_id)?.convites.push(convite.email);
	return [...mapa.values()];
});
var criarEquipe_createServerFn_handler = createServerRpc({
	id: "e6dc25ba786305a5cb1a3bbe4bd376ca6026cb7d0df1371c6e9c2ecd1c1958dd",
	name: "criarEquipe",
	filename: "src/lib/equipes.functions.ts"
}, (opts) => criarEquipe.__executeServer(opts));
var criarEquipe = createServerFn({ method: "POST" }).validator((nome) => {
	if (typeof nome !== "string" || nome.trim().length < 2) throw new Error("Dê um nome para a equipe.");
	return nome.trim().slice(0, 60);
}).middleware([authMiddleware]).handler(criarEquipe_createServerFn_handler, async ({ context, data: nome }) => {
	const sql = await getSql();
	const id = crypto.randomUUID();
	await sql`insert into equipes (id, nome, owner_id) values (${id}, ${nome}, ${context.userId})`;
	await sql`
      insert into equipe_membros (equipe_id, user_id, papel)
      values (${id}, ${context.userId}, 'dono')
    `;
	return {
		id,
		nome
	};
});
var adicionarNaEquipe_createServerFn_handler = createServerRpc({
	id: "e5fce7c652feb353592153b100b938223bdbf2da0d4d4c138ca9905e7941e8a0",
	name: "adicionarNaEquipe",
	filename: "src/lib/equipes.functions.ts"
}, (opts) => adicionarNaEquipe.__executeServer(opts));
var adicionarNaEquipe = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	if (typeof bruto.equipeId !== "string" || !bruto.equipeId.trim()) throw new Error("Dados inválidos");
	return {
		equipeId: bruto.equipeId.trim().slice(0, 80),
		email: emailOk(bruto.email)
	};
}).middleware([authMiddleware]).handler(adicionarNaEquipe_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!(await sql`
      select 1 as ok from equipe_membros
      where equipe_id = ${data.equipeId} and user_id = ${context.userId} and papel = 'dono'
    `).length) throw new Error("Só quem criou a equipe pode adicionar pessoas.");
	const total = await sql`
      select (
        (select count(*) from equipe_membros where equipe_id = ${data.equipeId})
        + (select count(*) from equipe_convites where equipe_id = ${data.equipeId})
      ) as n
    `;
	if (Number(total[0]?.n ?? 0) >= 30) throw new Error("Esta equipe já está cheia.");
	if ((await sql`select email from "user" where id = ${context.userId}`)[0]?.email?.toLowerCase() === data.email) throw new Error("Você já faz parte desta equipe.");
	const alvo = await sql`
      select id, name from "user" where lower(email) = ${data.email}
    `;
	if (alvo.length) {
		await sql`
        insert into equipe_membros (equipe_id, user_id, papel)
        values (${data.equipeId}, ${alvo[0].id}, 'membro')
        on conflict (equipe_id, user_id) do nothing
      `;
		await sql`
        delete from equipe_convites
        where equipe_id = ${data.equipeId} and lower(email) = ${data.email}
      `;
		return {
			entrou: true,
			nome: alvo[0].name
		};
	}
	await sql`
      insert into equipe_convites (equipe_id, email)
      values (${data.equipeId}, ${data.email})
      on conflict (equipe_id, email) do nothing
    `;
	return {
		entrou: false,
		nome: null
	};
});
var removerDaEquipe_createServerFn_handler = createServerRpc({
	id: "f2310c1977299419f856ebb7e928b0ec4ae301e0341553426bdd0f2d860302af",
	name: "removerDaEquipe",
	filename: "src/lib/equipes.functions.ts"
}, (opts) => removerDaEquipe.__executeServer(opts));
var removerDaEquipe = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Dados inválidos");
	const bruto = input;
	if (typeof bruto.equipeId !== "string" || !bruto.equipeId.trim()) throw new Error("Dados inválidos");
	return {
		equipeId: bruto.equipeId.trim().slice(0, 80),
		email: emailOk(bruto.email)
	};
}).middleware([authMiddleware]).handler(removerDaEquipe_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const eu = await sql`
      select u.email, m.papel
      from equipe_membros m
      join "user" u on u.id = m.user_id
      where m.equipe_id = ${data.equipeId} and m.user_id = ${context.userId}
    `;
	if (!eu.length) throw new Error("Você não faz parte desta equipe.");
	const meuEmail = eu[0].email.toLowerCase();
	const souDono = eu[0].papel === "dono";
	if (meuEmail === data.email) {
		if (souDono) throw new Error("Quem criou a equipe não pode sair.");
		await sql`
        delete from equipe_membros
        where equipe_id = ${data.equipeId} and user_id = ${context.userId}
      `;
		return { ok: true };
	}
	if (!souDono) throw new Error("Só quem criou a equipe pode remover pessoas.");
	await sql`
      delete from equipe_membros
      where equipe_id = ${data.equipeId}
        and user_id in (select id from "user" where lower(email) = ${data.email})
        and papel <> 'dono'
    `;
	await sql`
      delete from equipe_convites
      where equipe_id = ${data.equipeId} and lower(email) = ${data.email}
    `;
	return { ok: true };
});
//#endregion
export { adicionarNaEquipe_createServerFn_handler, criarEquipe_createServerFn_handler, listarEquipes_createServerFn_handler, removerDaEquipe_createServerFn_handler };
