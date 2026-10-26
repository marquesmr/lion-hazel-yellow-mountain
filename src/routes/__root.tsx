import { useEffect } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { AvisoAtualizacao } from "@/components/aviso-atualizacao";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Controle de Prazos";

const SEM_CORRETOR = new Set(["password", "email", "date", "month", "number", "checkbox", "radio", "file", "hidden", "range", "color"]);

function ativarCorretor(alvo: EventTarget | null) {
  if (!(alvo instanceof HTMLInputElement || alvo instanceof HTMLTextAreaElement)) return;
  if (alvo instanceof HTMLInputElement && SEM_CORRETOR.has(alvo.type)) return;
  alvo.spellcheck = true;
  alvo.lang = "pt-BR";
  alvo.setAttribute("autocorrect", "on");
}

function CorretorOrtografico() {
  useEffect(() => {
    const noFoco = (evento: FocusEvent) => ativarCorretor(evento.target);
    document.addEventListener("focusin", noFoco);
    document.querySelectorAll("input, textarea").forEach((campo) => ativarCorretor(campo));
    return () => document.removeEventListener("focusin", noFoco);
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Lance processos, registre a data e o prazo de resposta e receba aviso quando o prazo estiver vencendo.",
      },
      { name: "theme-color", content: "#f3efe6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,650&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="pt-BR" spellCheck suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <CorretorOrtografico />
        <PreviewHostBridge />
        <AuthProvider>
          <AvisoAtualizacao />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
