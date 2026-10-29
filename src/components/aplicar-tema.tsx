import { useEffect } from "react";
import { aplicarTema, lerPreferencias, temaDaContaAtiva } from "@/lib/preferencias";

export function AplicarTema() {
  useEffect(() => {
    const aplicar = () => {
      const conta = temaDaContaAtiva();
      const prefs = conta ? lerPreferencias(conta) : lerPreferencias(null);
      aplicarTema(prefs.tema, prefs.cor);
    };
    aplicar();
    const midia = window.matchMedia("(prefers-color-scheme: dark)");
    midia.addEventListener("change", aplicar);
    return () => midia.removeEventListener("change", aplicar);
  }, []);
  return null;
}
