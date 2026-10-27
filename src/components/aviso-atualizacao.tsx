import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { NOVIDADES, VERSAO_APP } from "@/lib/atualizacao";

const CHAVE = "prazos.aviso-atualizacao";

export function AvisoAtualizacao() {
  const [aberto, setAberto] = useState(false);
  const [ocultar, setOcultar] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE) !== VERSAO_APP) setAberto(true);
    } catch {
      setAberto(true);
    }
  }, []);

  function fechar() {
    if (ocultar) {
      try {
        localStorage.setItem(CHAVE, VERSAO_APP);
      } catch {
        /* o aviso volta na próxima abertura */
      }
    }
    setAberto(false);
  }

  return (
    <Dialog.Root open={aberto} onOpenChange={(valor) => (valor ? setAberto(true) : fechar())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
        <Dialog.Content className="fixed inset-x-3 top-4 bottom-4 z-40 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="border-b border-line px-5 py-4">
            <p className="text-sm font-medium text-pine">Versão {VERSAO_APP}</p>
            <Dialog.Title className="font-display text-2xl text-ink">O que mudou</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-muted">
              Somente o que mudou nesta atualização.
            </Dialog.Description>
          </div>
          <div className="overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-2 text-sm text-ink">
              {NOVIDADES.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pine" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-line bg-paper p-3 text-sm text-ink">
              <p className="font-medium">Licença GPL (Copyleft)</p>
              <p className="mt-1 text-muted">
                Software livre sob a Licença Pública Geral GNU (GPL). Pode ser usado, estudado, modificado e
                compartilhado, inclusive comercialmente, desde que as cópias e as versões modificadas permaneçam sob a
                mesma licença e o código-fonte acompanhe quem receber o programa.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={ocultar} onChange={(e) => setOcultar(e.target.checked)} />
              Não mostrar mais
            </label>
            <button type="button" onClick={fechar} className="inline-flex h-11 items-center justify-center rounded-xl bg-pine px-4 text-sm font-medium text-sheet">
              Entendi
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
