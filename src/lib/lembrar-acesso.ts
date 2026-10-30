const CHAVE = "prazos.lembrar";
const SESSAO = "prazos.acesso-contado";
const PENDENTE = "prazos.senha-pendente";

export type Lembranca = { email: string; senha: string; acessos: number };

export function lerLembranca(): Lembranca | null {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return null;
    if (!bruto.startsWith("{")) return { email: bruto, senha: "", acessos: 0 };
    const dado = JSON.parse(bruto) as Partial<Lembranca>;
    if (!dado.email) return null;
    return { email: dado.email, senha: dado.senha ?? "", acessos: Number(dado.acessos) || 0 };
  } catch {
    return null;
  }
}

export function guardarLembranca(email: string, senha: string) {
  const atual = lerLembranca();
  const mesmo = atual?.email.toLowerCase() === email.toLowerCase();
  const item: Lembranca = { email, senha, acessos: mesmo ? atual!.acessos : 0 };
  localStorage.setItem(CHAVE, JSON.stringify(item));
}

export function atualizarSenhaLembrada(senha: string) {
  const atual = lerLembranca();
  if (!atual) return;
  localStorage.setItem(CHAVE, JSON.stringify({ ...atual, senha }));
}

export function esquecerLembranca() {
  localStorage.removeItem(CHAVE);
}

export function registrarAcesso(email: string) {
  if (sessionStorage.getItem(SESSAO) === "1") return sessionStorage.getItem(PENDENTE) === "1";
  const atual = lerLembranca();
  if (!atual || atual.email.toLowerCase() !== email.toLowerCase() || !atual.senha) return false;
  const acessos = atual.acessos + 1;
  localStorage.setItem(CHAVE, JSON.stringify({ ...atual, acessos }));
  if (acessos % 5 === 0) {
    sessionStorage.setItem(PENDENTE, "1");
    return true;
  }
  sessionStorage.setItem(SESSAO, "1");
  return false;
}

export function confirmarSenhaDigitada() {
  sessionStorage.removeItem(PENDENTE);
  sessionStorage.setItem(SESSAO, "1");
}

export function liberarProximoAcesso() {
  sessionStorage.removeItem(SESSAO);
}

export function concluirAcessoForcado() {
  const atual = lerLembranca();
  if (atual) localStorage.setItem(CHAVE, JSON.stringify({ ...atual, acessos: atual.acessos + 1 }));
  sessionStorage.removeItem(PENDENTE);
  sessionStorage.setItem(SESSAO, "1");
}
