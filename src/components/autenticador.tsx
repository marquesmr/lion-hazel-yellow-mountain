import { useEffect, useState, type FormEvent } from "react";
import { confirmarAutenticador, estadoAutenticador, iniciarAutenticador } from "@/lib/auth/autenticador.functions";

const campo = "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm font-normal text-ink";

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
