import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origem = join(raiz, "node_modules/@electric-sql/pglite/dist");
const destino = join(raiz, ".vercel/output/functions/__server.func/_libs");
const arquivos = ["pglite.data", "pglite.wasm", "initdb.wasm"];

mkdirSync(destino, { recursive: true });
for (const nome of arquivos) {
  copyFileSync(join(origem, nome), join(destino, nome));
}
console.log("[pglite] arquivos do banco copiados para a função da Vercel");
