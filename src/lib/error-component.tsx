import { useEffect } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Algo inesperado aconteceu. Recarregue a página.";
const CHAVE_RECARGA = "prazos.reload-modulo";

function mensagem(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function moduloDesatualizado(error: unknown) {
  return /dynamically imported module|module script failed|error loading dynamically imported module|Failed to fetch/i.test(mensagem(error));
}

export function recarregarModulo() {
  try {
    if (sessionStorage.getItem(CHAVE_RECARGA) === "1") return false;
    sessionStorage.setItem(CHAVE_RECARGA, "1");
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export function limparRecargaModulo() {
  try {
    sessionStorage.removeItem(CHAVE_RECARGA);
  } catch {
    /* navegador sem sessionStorage */
  }
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const antigo = moduloDesatualizado(error);

  useEffect(() => {
    if (antigo) recarregarModulo();
  }, [antigo]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink">
      <span className="text-seal" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl">Não foi possível abrir</h1>
      <p className="max-w-md text-sm text-muted">
        {antigo
          ? "A aplicação foi atualizada e esta aba ainda está na versão anterior."
          : mensagem(error)}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-pine px-4 text-sm font-medium text-sheet"
      >
        Recarregar
      </button>
    </main>
  );
}
