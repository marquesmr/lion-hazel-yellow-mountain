import { daysUntil, todayIso, type Andamento } from "@/lib/prazos";

export const MODALIDADES = [
  "Pregão",
  "Concorrência",
  "Concurso",
  "Leilão",
  "Diálogo Competitivo",
  "Dispensa de Licitação",
  "Inexigibilidade de Licitação",
  "Pronto Pagamento",
  "Doação",
  "Outros",
] as const;

export type Modalidade = (typeof MODALIDADES)[number];

const MODALIDADES_ANTIGAS: Record<string, Modalidade> = {
  "Diálogo competitivo": "Diálogo Competitivo",
  "Dispensa de licitação": "Dispensa de Licitação",
  "Inexigibilidade de licitação": "Inexigibilidade de Licitação",
  "Compra direta por pronto pagamento": "Pronto Pagamento",
};

export function normalizarModalidade(raw: string): Modalidade | null {
  if ((MODALIDADES as readonly string[]).includes(raw)) return raw as Modalidade;
  return MODALIDADES_ANTIGAS[raw] ?? null;
}

export function rotuloTipo(tipo: Modalidade, numero: number | null, ano: number | null): string {
  if (numero == null || ano == null) return tipo;
  return `${tipo} ${String(numero).padStart(2, "0")}/${ano}`;
}
export const STATUS_ADMIN = [
  "proposta",
  "pareceres",
  "assinatura",
  "execucao",
  "encerrado",
  "cancelado",
] as const;

export type StatusAdmin = (typeof STATUS_ADMIN)[number];
export type UrgenciaAdmin = "vencido" | "hoje" | "proximo" | "ok" | "encerrado" | "cancelado";
export type PeriodoRelatorio = "mensal" | "trimestral" | "semestral" | "anual";

export function tipoSimples(tipo: string): boolean {
  return tipo === "Outros" || tipo === "Doação";
}

export function modoValor(tipo: string, status: string): "nenhum" | "total" | "contrato" {
  if (tipoSimples(tipo) || status === "cancelado") return "nenhum";
  if (status === "execucao") return "contrato";
  return "total";
}

export function pedePrevisao(status: StatusAdmin): boolean {
  return status === "proposta" || status === "pareceres" || status === "assinatura";
}

export function normalizarStatus(raw: string): StatusAdmin {
  if (raw === "concluido" || raw === "encerrado") return "encerrado";
  if (raw === "cancelado") return "cancelado";
  if (raw === "execucao") return "execucao";
  if (raw === "pareceres" || raw === "assinatura" || raw === "proposta") return raw;
  return "proposta";
}

export function statusAdminLabel(status: StatusAdmin): string {
  if (status === "proposta") return "Recebendo proposta";
  if (status === "pareceres") return "Pareceres";
  if (status === "assinatura") return "Assinatura de contrato";
  if (status === "execucao") return "Execução";
  if (status === "cancelado") return "Cancelado";
  return "Encerrado";
}

export type ProcessoAdmin = {
  id: string;
  numero: string;
  numeroAno: number | null;
  referencia: string;
  objeto: string;
  tipo: Modalidade;
  tipoNumero: number | null;
  tipoAno: number | null;
  dataInicio: string;
  previsaoEtapa: string | null;
  encerramento: string;
  alertaDias: number;
  possuiContrato: boolean;
  vigenciaInicio: string | null;
  vigenciaFim: string | null;
  contratado: string;
  documento: string;
  valorTotalCentavos: number | null;
  valorMensalCentavos: number | null;
  ciNumero: number | null;
  ciAno: number | null;
  ciOrigem: string;
  parecerNumero: number | null;
  parecerAno: number | null;
  status: StatusAdmin;
  historico: Andamento[];
  equipeId: string | null;
  autorId: string | null;
  autorNome: string;
};

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function dataAlvo(p: ProcessoAdmin): string {
  if (p.status === "execucao" && p.vigenciaFim) return p.vigenciaFim;
  if (p.status === "encerrado" && p.encerramento) return p.encerramento;
  if (pedePrevisao(p.status) && p.previsaoEtapa) return p.previsaoEtapa;
  return p.encerramento || p.dataInicio;
}

export function marcoAdmin(p: ProcessoAdmin): { rotulo: string; data: string | null } {
  if (tipoSimples(p.tipo)) return { rotulo: "Status", data: null };
  if (p.status === "cancelado") return { rotulo: "Cancelado", data: null };
  if (p.status === "encerrado") return { rotulo: "Encerramento", data: p.encerramento };
  if (p.status === "execucao") return { rotulo: "Fim da vigência", data: p.vigenciaFim };
  return { rotulo: "Previsão da etapa", data: p.previsaoEtapa ?? p.encerramento };
}

export function urgenciaAdmin(p: ProcessoAdmin, now = new Date()): UrgenciaAdmin {
  if (p.status === "encerrado") return "encerrado";
  if (p.status === "cancelado") return "cancelado";
  if (tipoSimples(p.tipo)) return "ok";
  const dias = daysUntil(dataAlvo(p), now);
  if (dias < 0) return "vencido";
  if (dias === 0) return "hoje";
  if (dias <= p.alertaDias) return "proximo";
  return "ok";
}

export function prazoAdminLabel(p: ProcessoAdmin, now = new Date()): string {
  if (tipoSimples(p.tipo)) return statusAdminLabel(p.status);
  if (p.status === "encerrado") return "Encerrado";
  if (p.status === "cancelado") return "Cancelado";
  const dias = daysUntil(dataAlvo(p), now);
  const qual = p.status === "execucao" ? "Vigência" : "Previsão";
  if (dias < 0) {
    const n = Math.abs(dias);
    return n === 1 ? `${qual} vencida há 1 dia` : `${qual} vencida há ${n} dias`;
  }
  if (dias === 0) return `${qual} encerra hoje`;
  if (dias === 1) return `${qual} encerra amanhã`;
  return `${qual} em ${dias} dias`;
}

export function precisaAvisoAdmin(p: ProcessoAdmin, now = new Date()): boolean {
  if (tipoSimples(p.tipo)) return false;
  const u = urgenciaAdmin(p, now);
  return u === "vencido" || u === "hoje" || u === "proximo";
}

export function reaisParaCentavos(texto: string): number | null {
  const bruto = texto.trim();
  if (!bruto) return null;
  const normal = bruto.includes(",") ? bruto.replace(/\./g, "").replace(",", ".") : bruto;
  if (!/^\d+(\.\d{1,2})?$/.test(normal)) return null;
  const n = Number(normal);
  if (!Number.isFinite(n) || n < 0 || n > 1_000_000_000) return null;
  return Math.round(n * 100);
}

export function formatarReais(centavos: number | null): string {
  if (centavos == null) return "—";
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function centavosParaCampo(centavos: number | null): string {
  if (centavos == null) return "";
  return (centavos / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Preenche a pontuação de reais a partir dos dígitos: 123456 vira 1.234,56. */
export function mascaraReais(texto: string): string {
  const digitos = texto.replace(/\D/g, "").slice(0, 11);
  if (!digitos) return "";
  const completo = digitos.padStart(3, "0");
  const inteiro = completo.slice(0, -2).replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${inteiro},${completo.slice(-2)}`;
}

/** CPF até 11 dígitos; a partir daí, CNPJ. */
export function mascaraDocumento(texto: string): string {
  const d = texto.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 11) {
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }
  const base = `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}`;
  return d.length > 12 ? `${base}-${d.slice(12)}` : base;
}

/** Número da peça no formato 12/2026. */
export function formatarPeca(numero: number | null, ano: number | null): string {
  if (numero == null || ano == null) return "—";
  return `${numero}/${ano}`;
}

/** Número do processo no formato 02/2026. Sem ano, devolve o número com duas casas. */
export function rotuloNumero(numero: string, ano: number | null): string {
  const casa = (valor: string) => (/^\d+$/.test(valor) ? valor.padStart(2, "0") : valor);
  const bruto = numero.trim();
  const jaComAno = /^(\d+)\/(\d{4})$/.exec(bruto);
  if (jaComAno) return `${jaComAno[1].padStart(2, "0")}/${jaComAno[2]}`;
  if (ano == null) return casa(bruto);
  return `${casa(bruto)}/${ano}`;
}

export function numeroPeca(texto: string): number | null {
  const bruto = texto.trim();
  if (!/^\d{1,6}$/.test(bruto)) return null;
  const n = Number(bruto);
  return n >= 1 ? n : null;
}

/** Anos oferecidos no lançamento, do próximo ano até 2016. */
export function anosDePeca(agora = new Date()): number[] {
  const fim = agora.getFullYear() + 1;
  const anos: number[] = [];
  for (let ano = fim; ano >= 2016; ano -= 1) anos.push(ano);
  return anos;
}

function fimDoMes(ano: number, mes: number): string {
  const dia = new Date(ano, mes, 0).getDate();
  return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

export function intervaloPeriodo(
  ancora: string,
  periodo: PeriodoRelatorio,
): { inicio: string; fim: string; rotulo: string } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(ancora);
  if (!match) return null;
  const ano = Number(match[1]);
  const mes = Number(match[2]);
  if (mes < 1 || mes > 12) return null;
  if (periodo === "mensal") {
    return {
      inicio: `${match[1]}-${match[2]}-01`,
      fim: fimDoMes(ano, mes),
      rotulo: `${MESES[mes - 1]} de ${ano}`,
    };
  }
  if (periodo === "trimestral") {
    const inicioMes = Math.floor((mes - 1) / 3) * 3 + 1;
    const trimestre = Math.floor((mes - 1) / 3) + 1;
    return {
      inicio: `${ano}-${String(inicioMes).padStart(2, "0")}-01`,
      fim: fimDoMes(ano, inicioMes + 2),
      rotulo: `${trimestre}º trimestre de ${ano}`,
    };
  }
  if (periodo === "semestral") {
    const primeiro = mes <= 6;
    return {
      inicio: primeiro ? `${ano}-01-01` : `${ano}-07-01`,
      fim: primeiro ? `${ano}-06-30` : `${ano}-12-31`,
      rotulo: `${primeiro ? "1" : "2"}º semestre de ${ano}`,
    };
  }
  return { inicio: `${ano}-01-01`, fim: `${ano}-12-31`, rotulo: String(ano) };
}

export function cruzaPeriodo(p: ProcessoAdmin, inicio: string, fim: string): boolean {
  return p.dataInicio <= fim && dataAlvo(p) >= inicio;
}

export function avisoAdminKey(p: ProcessoAdmin, now = new Date()): string {
  return `admin|${p.id}|${urgenciaAdmin(p, now)}|${todayIso(now)}`;
}

const SENT_KEY = "prazos.avisos.admin.v1";

export function avisosAdminEnviados(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(SENT_KEY) || "[]") as unknown;
    return Array.isArray(raw) ? raw.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function marcarAvisosAdmin(keys: string[]): void {
  const next = [...avisosAdminEnviados(), ...keys].slice(-300);
  localStorage.setItem(SENT_KEY, JSON.stringify(next));
}
