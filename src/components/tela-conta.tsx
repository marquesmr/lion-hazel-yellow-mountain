import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { redefinirSenhaAutenticador, registrarAceiteTermo } from "@/lib/auth/autenticador.functions";
import { consultarExclusao, limparAvisoExclusao } from "@/lib/gestao.functions";
import { limparExigenciaLocal, marcarExigenciaLocal } from "@/components/autenticador";
import { AvisoContaExcluida } from "@/components/aviso-exclusao";
import { TermosCadastro } from "@/components/termos-cadastro";
import { soltarTemaDaConta } from "@/lib/preferencias";

type Modo = "entrar" | "criar" | "esqueci";
const AVISO_EXCLUSAO = "prazos.conta-excluida";
const MOTIVO_EXCLUSAO = "prazos.exclusao-motivo";
const VISTA_EXCLUSAO = "prazos.exclusao-vista";

function avisoPendente() {
  return sessionStorage.getItem(AVISO_EXCLUSAO) === "1" && sessionStorage.getItem(VISTA_EXCLUSAO) !== "1";
}

export function TelaConta() {
  const [modo, setModo] = useState<Modo>(() => (sessionStorage.getItem(AVISO_EXCLUSAO) === "1" ? "criar" : "entrar"));
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [excluida, setExcluida] = useState(() => sessionStorage.getItem(AVISO_EXCLUSAO) === "1");
  const [mostrarAviso, setMostrarAviso] = useState(avisoPendente);
  const [motivoAviso, setMotivoAviso] = useState(() => sessionStorage.getItem(MOTIVO_EXCLUSAO) ?? "");
  const [enviando, setEnviando] = useState(false);
  const [termos, setTermos] = useState(false);

  useEffect(() => {
    soltarTemaDaConta();
  }, []);

  async function concluir(modoAtual: Modo) {
    setEnviando(true);
    if (modoAtual === "criar") marcarExigenciaLocal();
    try {
      const resultado =
        modoAtual === "criar"
          ? await authClient.signUp.email({
              name: nome.trim(),
              email: email.trim(),
              password: senha,
              callbackURL: "/",
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password: senha,
              callbackURL: "/",
            });
      if (resultado.error) {
        if (modoAtual === "criar") limparExigenciaLocal();
        if (modoAtual === "entrar") {
          const estado = await consultarExclusao({ data: { email: email.trim() } }).catch(() => ({ excluida: false, motivo: "" }));
          if (estado.excluida) {
            sessionStorage.setItem(AVISO_EXCLUSAO, "1");
            sessionStorage.setItem(MOTIVO_EXCLUSAO, estado.motivo);
            sessionStorage.removeItem(VISTA_EXCLUSAO);
            setExcluida(true);
            setMotivoAviso(estado.motivo);
            setMostrarAviso(true);
            setErro("");
            return;
          }
        }
        setErro(traduzir(resultado.error.message ?? ""));
        return;
      }
      if (modoAtual === "criar") void registrarAceiteTermo().catch(() => undefined);
      void limparAvisoExclusao({ data: { email: email.trim() } }).catch(() => undefined);
      sessionStorage.removeItem(AVISO_EXCLUSAO);
      sessionStorage.removeItem(MOTIVO_EXCLUSAO);
      sessionStorage.removeItem(VISTA_EXCLUSAO);
    } catch (err) {
      if (modoAtual === "criar") limparExigenciaLocal();
      setErro(traduzir(err instanceof Error ? err.message : ""));
    } finally {
      setEnviando(false);
    }
  }

  function enviar(event: FormEvent) {
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
    if (modo === "criar") {
      setTermos(true);
      return;
    }
    void concluir("entrar");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      {termos && (
        <TermosCadastro
          onVoltar={() => setTermos(false)}
          onContinuar={() => {
            setTermos(false);
            void concluir("criar");
          }}
        />
      )}
      {mostrarAviso && (
        <AvisoContaExcluida
          motivo={motivoAviso}
          onEntendi={() => {
            sessionStorage.setItem(VISTA_EXCLUSAO, "1");
            setMostrarAviso(false);
            setExcluida(true);
            setModo("criar");
          }}
        />
      )}
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-pine text-sheet" aria-hidden>
          <Scale className="size-5" strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="font-display text-2xl leading-tight text-ink sm:text-3xl">Assistente do Poder Legislativo</h1>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {excluida
          ? "Sua conta foi excluída e você foi desconectado. Para entrar de novo, crie outra conta."
          : modo === "criar"
            ? "Crie a conta com e-mail e senha. Em seguida, leia e aceite os termos de uso."
            : "Entre com o mesmo e-mail e senha para abrir os processos neste navegador."}
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-sheet p-5">
        {modo === "esqueci" ? (
          <RecuperarSenha
            emailInicial={email}
            onVoltar={() => {
              setModo("entrar");
              setErro("");
            }}
            onPronto={() => {
              setModo("entrar");
              setSenha("");
              setErro("");
              setAviso("Senha atualizada. Entre com a nova senha.");
            }}
          />
        ) : (
      <form onSubmit={enviar} className="flex flex-col gap-3">
        <h2 className="font-display text-2xl text-ink">{modo === "criar" ? "Criar conta" : "Login"}</h2>
        {aviso && <p className="rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine">{aviso}</p>}
        {erro && (
          <p role="alert" className="rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">
            {erro}
          </p>
        )}
        {modo === "criar" && (
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Nome
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={campo}
              autoComplete="name"
              required
            />
          </label>
        )}
        <label className="flex flex-col gap-1 text-sm font-medium text-ink">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={campo}
            autoComplete="email"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-ink">
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={campo}
            autoComplete={modo === "criar" ? "new-password" : "current-password"}
            minLength={8}
            required
          />
        </label>
        {modo === "entrar" && (
          <button
            type="button"
            onClick={() => {
              setModo("esqueci");
              setErro("");
            }}
            className="self-start text-sm font-medium text-pine"
          >
            Esqueci minha senha
          </button>
        )}
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
        >
          {enviando ? "Aguarde…" : modo === "criar" ? "Criar conta" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => {
            setModo(modo === "criar" ? "entrar" : "criar");
            setErro("");
          }}
          className="h-11 text-sm font-medium text-pine"
        >
          {modo === "criar" ? "Login" : "Criar conta"}
        </button>
      </form>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {GROK_PROVIDERS.map((provedor) => (
          <button
            key={provedor.providerId}
            type="button"
            onClick={() => signIn(provedor.providerId, { callbackURL: "/" })}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-sheet text-sm font-medium text-ink"
          >
            Continuar com {provedor.label}
          </button>
        ))}
      </div>
      <Link
        to="/gestao"
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-line bg-sheet text-sm font-medium text-ink"
      >
        Área restrita
      </Link>
    </main>
  );
}

const campo = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";

function RecuperarSenha({
  emailInicial,
  onVoltar,
  onPronto,
}: {
  emailInicial: string;
  onVoltar: () => void;
  onPronto: () => void;
}) {
  const [email, setEmail] = useState(emailInicial);
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [repete, setRepete] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function redefinir(event: FormEvent) {
    event.preventDefault();
    setErro("");
    if (senha !== repete) {
      setErro("A repetição não é igual à nova senha.");
      return;
    }
    setEnviando(true);
    try {
      await redefinirSenhaAutenticador({ data: { email: email.trim(), codigo, senha } });
      onPronto();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível redefinir a senha.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={(event) => void redefinir(event)}>
      <h2 className="font-display text-2xl text-ink">Esqueci minha senha</h2>
      <p className="text-sm text-muted">
        Digite o e-mail, o código de 6 dígitos do aplicativo autenticador e a nova senha. O código não é enviado por e-mail.
      </p>
      {erro && <p className="rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">{erro}</p>}
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        E-mail
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={campo} autoComplete="email" required />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Código do aplicativo
        <input
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className={campo}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000000"
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Nova senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className={campo} autoComplete="new-password" minLength={8} required />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Repetir nova senha
        <input type="password" value={repete} onChange={(e) => setRepete(e.target.value)} className={campo} autoComplete="new-password" minLength={8} required />
      </label>
      <button type="submit" disabled={enviando} className="inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60">
        {enviando ? "Salvando…" : "Redefinir senha"}
      </button>
      <button type="button" onClick={onVoltar} className="h-11 text-sm font-medium text-pine">
        Voltar para entrar
      </button>
    </form>
  );
}

function traduzir(mensagem: string): string {
  const texto = mensagem.toLowerCase();
  if (texto.includes("already") || texto.includes("exist")) return "Já existe uma conta com este e-mail.";
  if (texto.includes("password") && (texto.includes("short") || texto.includes("8") || texto.includes("length"))) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }
  if (texto.includes("invalid email") || texto.includes("invalid password") || texto.includes("incorrect")) {
    return "E-mail ou senha incorretos.";
  }
  if (texto.includes("otp") && texto.includes("expired")) return "O código expirou. Peça outro.";
  if (texto.includes("too many") || texto.includes("attempts")) return "Muitas tentativas. Peça um código novo.";
  if (texto.includes("invalid otp") || texto.includes("otp")) return "Código incorreto.";
  if (texto.includes("configurado") || texto.includes("e-mail")) return mensagem;
  if (texto.includes("origin")) return "Não foi possível entrar neste endereço.";
  return "Não foi possível concluir. Confira os dados e tente de novo.";
}
