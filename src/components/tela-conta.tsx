import { useState, type FormEvent } from "react";
import { Scale } from "lucide-react";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";

type Modo = "entrar" | "criar" | "esqueci";

export function TelaConta() {
  const [modo, setModo] = useState<Modo>("criar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(event: FormEvent) {
    event.preventDefault();
    if (modo === "esqueci") return;
    setErro("");
    setAviso("");
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
      const resultado =
        modo === "criar"
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
        setErro(traduzir(resultado.error.message ?? ""));
        return;
      }
    } catch (err) {
      setErro(traduzir(err instanceof Error ? err.message : ""));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-pine text-sheet" aria-hidden>
          <Scale className="size-5" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-medium text-pine">Controle de prazos</p>
          <h1 className="font-display text-4xl leading-none text-ink">Prazos</h1>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Crie uma conta para lançar processos e abrir os mesmos dados em qualquer navegador, com o mesmo e-mail e senha.
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-sheet p-5">
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
        <h2 className="font-display text-2xl text-ink">{modo === "criar" ? "Criar conta" : "Entrar"}</h2>
        {aviso && (
          <p className="rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine">{aviso}</p>
        )}
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
              setAviso("");
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
          {enviando ? "Aguarde…" : modo === "criar" ? "Criar conta" : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setModo(modo === "criar" ? "entrar" : "criar");
            setErro("");
            setAviso("");
          }}
          className="h-11 text-sm font-medium text-pine"
        >
          {modo === "criar" ? "Já tenho conta" : "Criar uma conta"}
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
  const [etapa, setEtapa] = useState<"email" | "codigo">("email");
  const [email, setEmail] = useState(emailInicial);
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function pedirCodigo(event?: FormEvent) {
    event?.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      const resultado = await authClient.emailOtp.requestPasswordReset({ email: email.trim() });
      if (resultado.error) {
        setErro(traduzir(resultado.error.message ?? ""));
        return;
      }
      setEtapa("codigo");
    } catch (err) {
      setErro(traduzir(err instanceof Error ? err.message : ""));
    } finally {
      setEnviando(false);
    }
  }

  async function redefinir() {
    setErro("");
    if (!/^\d{6}$/.test(codigo.trim())) {
      setErro("Informe o código de 6 dígitos enviado por e-mail.");
      return;
    }
    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (senha !== confirmar) {
      setErro("A confirmação não é igual à nova senha.");
      return;
    }
    setEnviando(true);
    try {
      const resultado = await authClient.emailOtp.resetPassword({
        email: email.trim(),
        otp: codigo.trim(),
        password: senha,
      });
      if (resultado.error) {
        setErro(traduzir(resultado.error.message ?? ""));
        return;
      }
      onPronto();
    } catch (err) {
      setErro(traduzir(err instanceof Error ? err.message : ""));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (etapa === "email") void pedirCodigo();
        else void redefinir();
      }}
    >
      <h2 className="font-display text-2xl text-ink">Esqueci minha senha</h2>
      <p className="text-sm text-muted">
        {etapa === "email"
          ? "Informe o e-mail da conta. Se ele existir, enviamos um código de 6 dígitos."
          : `Digite o código enviado para ${email} e escolha a nova senha. O código vale 10 minutos.`}
      </p>
      {erro && (
        <p role="alert" className="rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">
          {erro}
        </p>
      )}
      {etapa === "email" ? (
        <>
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
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar código"}
          </button>
        </>
      ) : (
        <>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Código do e-mail
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
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={campo}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Confirmar nova senha
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              className={campo}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
          >
            {enviando ? "Salvando…" : "Redefinir senha"}
          </button>
          <button type="button" onClick={() => void pedirCodigo()} disabled={enviando} className="h-11 text-sm font-medium text-pine">
            Reenviar código
          </button>
        </>
      )}
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
