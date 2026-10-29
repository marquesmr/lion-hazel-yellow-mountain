import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent, recarregarModulo } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (evento) => {
    evento.preventDefault();
    recarregarModulo();
  });
}

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
