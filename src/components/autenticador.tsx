import { useEffect, useState, type FormEvent } from "react";
import { Scale } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import { confirmarAutenticador, dispensarAutenticador, estadoAutenticador, iniciarAutenticador } from "@/lib/auth/autenticador.functions";

const campo = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";

function ChaveCopiavel({ chave }: { chave: string }) {
  const [copiada, setCopiada] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(chave).then(() => {
          setCopiada(true);
          window.setTimeout(() => setCopiada(false), 1600);
        });
      }}
      className="w-full min-w-0 rounded-xl bg-paper px-3 py-2 text-left"
    >
      <span className="block text-xs text-muted">Se o aplicativo não ler a imagem, toque para copiar a chave.</span>
      <span className="mt-1 block break-all font-medium text-ink">{chave}</span>
      {copiada && <span className="mt-1 block text-xs text-pine">Chave copiada.</span>}
    </button>
  );
}
const CHAVE_EXIGIR_2FA = "prazos.exigir-2fa";

export function marcarExigenciaLocal() {
  sessionStorage.setItem(CHAVE_EXIGIR_2FA, "1");
}

export function limparExigenciaLocal() {
  sessionStorage.removeItem(CHAVE_EXIGIR_2FA);
}

export function useExigirAutenticador(contaAtiva: boolean) {
  const [gate, setGate] = useState<"checando" | "ok" | "exigir">("checando");

  useEffect(() => {
    if (!contaAtiva) {
      setGate("checando");
      return;
    }
    let vivo = true;
    const local = sessionStorage.getItem(CHAVE_EXIGIR_2FA) === "1";
    void estadoAutenticador()
      .then((estado) => {
        if (!vivo) return;
        if (estado.ativo) {
          sessionStorage.removeItem(CHAVE_EXIGIR_2FA);
          setGate("ok");
          return;
        }
        setGate(local || estado.obrigatorio ? "exigir" : "ok");
      })
      .catch(() => {
        if (vivo) setGate(local ? "exigir" : "ok");
      });
    return () => {
      vivo = false;
    };
  }, [contaAtiva]);

  return {
    gate,
    concluir() {
      sessionStorage.removeItem(CHAVE_EXIGIR_2FA);
      setGate("ok");
    },
  };
}

export function CadastroAutenticador({ onPronto }: { onPronto: () => void }) {
  const [svg, setSvg] = useState("");
  const [chave, setChave] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [pulando, setPulando] = useState(false);

  useEffect(() => {
    let vivo = true;
    setEnviando(true);
    void iniciarAutenticador()
      .then((gerado) => {
        if (!vivo) return;
        setSvg(gerado.svg);
        setChave(gerado.chave);
      })
      .catch(() => {
        if (vivo) setErro("Não foi possível gerar o código do aplicativo.");
      })
      .finally(() => {
        if (vivo) setEnviando(false);
      });
    return () => {
      vivo = false;
    };
  }, []);

  async function confirmar(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await confirmarAutenticador({ data: { codigo } });
      onPronto();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível confirmar.");
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
        <h1 className="font-display text-2xl leading-tight text-ink sm:text-3xl">Assistente do Poder Legislativo</h1>
      </div>
      <div className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-line bg-sheet p-5">
        <h2 className="font-display text-2xl text-ink">Aplicativo autenticador</h2>
        <p className="mt-2 text-sm text-muted">
          Cadastre o Google Authenticator, ou outro aplicativo igual, se quiser. Ele será necessário para trocar a senha.
        </p>
        {erro && <p className="mt-3 rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">{erro}</p>}
        {!svg && (
          <button
            type="button"
            onClick={() => {
              setErro("");
              setEnviando(true);
              void iniciarAutenticador()
                .then((gerado) => {
                  setSvg(gerado.svg);
                  setChave(gerado.chave);
                })
                .catch(() => setErro("Não foi possível gerar o código do aplicativo."))
                .finally(() => setEnviando(false));
            }}
            disabled={enviando}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
          >
            {enviando ? "Gerando…" : "Gerar código de novo"}
          </button>
        )}
        {svg && (
          <form className="mt-4 flex flex-col gap-3" onSubmit={(event) => void confirmar(event)}>
            <div className="mx-auto w-48 rounded-xl bg-white p-2" dangerouslySetInnerHTML={{ __html: svg }} />
            <ChaveCopiavel chave={chave} />
            <label className="flex flex-col gap-1 text-sm font-medium text-ink">
              Código do aplicativo
              <input
                value={codigo}
                onChange={(event) => setCodigo(event.target.value.replace(/\D/g, "").slice(0, 6))}
                className={campo}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                required
              />
            </label>
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
            >
              {enviando ? "Confirmando…" : "Confirmar e entrar"}
            </button>
          </form>
        )}
        {pulando && (
          <div className="mt-4 rounded-xl border border-line bg-paper p-3">
            <p className="text-sm text-ink">
              Você entra agora sem o aplicativo. Para trocar a senha depois, será preciso cadastrá-lo no perfil.
            </p>
            <button
              type="button"
              disabled={enviando}
              onClick={() => {
                setEnviando(true);
                void dispensarAutenticador()
                  .catch(() => undefined)
                  .finally(() => {
                    limparExigenciaLocal();
                    onPronto();
                  });
              }}
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
            >
              Entendi e entrar
            </button>
          </div>
        )}
        {!pulando && (
          <button type="button" onClick={() => setPulando(true)} className="mt-2 h-11 w-full text-sm font-medium text-pine">
            Pular
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            limparExigenciaLocal();
            void signOut();
          }}
          className="mt-2 h-11 w-full text-sm font-medium text-pine"
        >
          Sair
        </button>
      </div>
    </main>
  );
}

export function AutenticadorPerfil() {
  const [ativo, setAtivo] = useState(false);
  const [svg, setSvg] = useState("");
  const [chave, setChave] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let vivo = true;
    void estadoAutenticador()
      .then((estado) => {
        if (vivo) setAtivo(estado.ativo);
      })
      .catch(() => {
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

  async function confirmar(event: FormEvent) {
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

  return (
    <div className="mt-5 border-t border-line pt-4">
      <h3 className="font-display text-xl text-ink">Aplicativo autenticador</h3>
      <p className="mt-1 text-sm text-muted">
        {ativo
          ? "O Google Authenticator, ou outro aplicativo igual, já pode recuperar esta senha."
          : "Cadastre um aplicativo agora, enquanto souber a senha. Sem ele, a senha esquecida não é recuperada."}
      </p>
      {aviso && <p className="mt-2 rounded-xl bg-pine-soft px-3 py-2 text-sm text-pine">{aviso}</p>}
      {erro && <p className="mt-2 rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">{erro}</p>}
      <button
        type="button"
        onClick={() => void gerar()}
        disabled={enviando}
        className="mt-3 inline-flex h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-medium text-ink disabled:opacity-60"
      >
        {enviando && !svg ? "Gerando…" : ativo ? "Trocar aplicativo" : "Configurar aplicativo"}
      </button>
      {svg && (
        <form className="mt-3 flex flex-col gap-3" onSubmit={(event) => void confirmar(event)}>
          <div className="mx-auto w-48 rounded-xl bg-white p-2" dangerouslySetInnerHTML={{ __html: svg }} />
          <p className="text-xs text-muted">
            Se o aplicativo não ler a imagem, digite esta chave: <span className="font-medium text-ink">{chave}</span>
          </p>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Código do aplicativo
            <input
              value={codigo}
              onChange={(event) => setCodigo(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className={campo}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              required
            />
          </label>
          <button type="submit" disabled={enviando} className="inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60">
            {enviando ? "Confirmando…" : "Confirmar aplicativo"}
          </button>
        </form>
      )}
    </div>
  );
}
