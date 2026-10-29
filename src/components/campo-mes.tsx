export function CampoMes({ value, onChange }: { value: string; onChange: (valor: string) => void }) {
  const rotulo = rotuloMes(value);
  return (
    <div className="relative h-11 w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex h-11 w-full items-center rounded-xl border border-line bg-paper px-3 text-sm text-ink">
        {rotulo}
      </div>
      <input
        type="month"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        aria-label="Mês de referência"
        className="absolute inset-0 m-0 h-full w-full min-w-0 cursor-pointer border-0 p-0 opacity-0"
      />
    </div>
  );
}

function rotuloMes(valor: string) {
  const [ano, mes] = valor.split("-");
  const data = new Date(Number(ano), Number(mes) - 1, 1);
  if (!ano || !mes || Number.isNaN(data.getTime())) return "Escolher mês";
  return data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}
