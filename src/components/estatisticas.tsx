import { type Processo, urgencia } from "@/lib/prazos";

const ORDEM_TIPO = ["Requerimentos", "Indicações", "Projetos de Lei", "Outros"] as const;

const CORES_TIPO = ["#1c4738", "#7a4510", "#3d5a4c", "#6d665c"];

export function PainelEstatisticas({ processos }: { processos: Processo[] }) {
  const porTipo = ORDEM_TIPO.map((tipo) => ({
    tipo,
    n: processos.filter((p) => p.tipo === tipo).length,
  }));
  const situacao = [
    { label: "Vencidos", n: processos.filter((p) => urgencia(p) === "vencido").length, cor: "#9a2e2e" },
    { label: "Vencem hoje", n: processos.filter((p) => urgencia(p) === "hoje").length, cor: "#9a2e2e" },
    { label: "Vencendo", n: processos.filter((p) => urgencia(p) === "proximo").length, cor: "#7a4510" },
    { label: "No prazo", n: processos.filter((p) => urgencia(p) === "ok").length, cor: "#1c4738" },
    { label: "Concluídos", n: processos.filter((p) => p.status === "concluido").length, cor: "#6d665c" },
  ];
  const total = processos.length;
  const abertos = processos.filter((p) => p.status === "andamento").length;

  if (total === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center">
        <p className="font-display text-2xl text-ink">Ainda sem números</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Lance um processo para ver a distribuição por tipo e por prazo.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      <section className="rounded-2xl border border-line bg-sheet p-4">
        <h2 className="font-display text-2xl text-ink">Situação</h2>
        <p className="mt-1 text-sm text-muted">
          {abertos} em aberto de {total}
        </p>
        <Donut fatias={situacao} total={total} />
        <ul className="mt-2 flex flex-col gap-2">
          {situacao.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-ink">
                <span className="size-2.5 rounded-full" style={{ background: item.cor }} />
                {item.label}
              </span>
              <span className="font-medium text-ink">{item.n}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-sheet p-4">
        <h2 className="font-display text-2xl text-ink">Por tipo</h2>
        <Donut
          fatias={porTipo.map((item, i) => ({ label: item.tipo, n: item.n, cor: CORES_TIPO[i] }))}
          total={total}
        />
        <ul className="mt-2 flex flex-col gap-2">
          {porTipo.map((item, i) => (
            <li key={item.tipo} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-ink">
                <span className="size-2.5 rounded-full" style={{ background: CORES_TIPO[i] }} />
                {item.tipo}
              </span>
              <span className="font-medium text-ink">{item.n}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Donut({ fatias, total }: { fatias: { label: string; n: number; cor: string }[]; total: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const usadas = fatias.filter((f) => f.n > 0);
  return (
    <svg viewBox="0 0 140 140" className="mx-auto mt-2 size-40" role="img" aria-label={`${total} processos no gráfico`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="#e3dcd0" strokeWidth="16" />
      {usadas.map((fatia) => {
        const len = (fatia.n / total) * c;
        const el = (
          <circle
            key={fatia.label}
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke={fatia.cor}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 70 70)"
          />
        );
        offset += len;
        return el;
      })}
      <text x="70" y="66" textAnchor="middle" fill="#1b1915" fontSize="28" fontFamily="Fraunces, Georgia, serif">
        {total}
      </text>
      <text x="70" y="84" textAnchor="middle" fill="#6d665c" fontSize="11" fontFamily="Outfit, sans-serif">
        processos
      </text>
    </svg>
  );
}
