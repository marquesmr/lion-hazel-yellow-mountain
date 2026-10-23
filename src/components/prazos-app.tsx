import { useEffect, useMemo, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Bell,
  BellOff,
  BarChart3,
  CalendarClock,
  Check,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  type Andamento,
  type Processo,
  type TipoProcesso,
  addDaysIso,
  avisoKey,
  avisosJaEnviados,
  daysUntil,
  formatDate,
  lerProcessosLocais,
  marcarAvisos,
  ordenar,
  prazoLabel,
  precisaAviso,
  todayIso,
  urgencia,
  type Urgencia,
} from "@/lib/prazos";
import { UserButton } from "@/lib/auth/gates";
import { authClient } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { apagarProcesso, listarProcessos, salvarProcesso } from "@/lib/processos.functions";
import { adicionarNaEquipe, criarEquipe, listarEquipes, removerDaEquipe, type Equipe } from "@/lib/equipes.functions";
import { TelaConta } from "@/components/tela-conta";
import { PainelEstatisticas } from "@/components/estatisticas";

type Filtro = "abertos" | "atencao" | "vencidos" | "prazo" | "concluidos" | "todos";

type FormState = {
  numero: string;
  parte: string;
  assunto: string;
  tipo: TipoProcesso;
  dataLancamento: string;
  prazo: string;
  alertaDias: number;
  nota: string;
};

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "abertos", label: "Abertos" },
  { id: "atencao", label: "Atenção" },
  { id: "vencidos", label: "Vencidos" },
  { id: "prazo", label: "No prazo" },
  { id: "concluidos", label: "Concluídos" },
  { id: "todos", label: "Todos" },
];

const ALERTA_OPCOES = [1, 2, 3, 5, 7, 10, 15, 30];

const ABAS_TIPO: { id: TipoProcesso | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "Requerimentos", label: "Requerimentos" },
  { id: "Indicações", label: "Indicações" },
  { id: "Projetos de Lei", label: "Projetos de Lei" },
  { id: "Outros", label: "Outros" },
];

type OrdemCampo = "numero" | "tipo" | "prazo";
type Guia = "lista" | "estatisticas";

function evento(texto: string, autorNome: string): Andamento {
  return { id: crypto.randomUUID(), em: new Date().toISOString(), texto, autorNome };
}

function textoMudanca(antes: Processo, form: FormState): string | null {
  const partes: string[] = [];
  if (antes.numero !== form.numero.trim()) partes.push("o número");
  if (antes.parte !== form.parte.trim()) partes.push("a parte");
  if (antes.assunto !== form.assunto.trim()) partes.push("o assunto");
  if (antes.tipo !== form.tipo) partes.push(`o tipo para ${form.tipo}`);
  if (antes.dataLancamento !== form.dataLancamento) partes.push("a data de lançamento");
  if (antes.prazo !== form.prazo) partes.push(`o prazo para ${formatDate(form.prazo)}`);
  if (antes.alertaDias !== form.alertaDias) partes.push("a antecedência do aviso");
  if (!partes.length) return null;
  if (partes.length === 1) return `Alterou ${partes[0]}.`;
  const ultimo = partes.pop();
  return `Alterou ${partes.join(", ")} e ${ultimo}.`;
}

function classificar(lista: Processo[], campo: OrdemCampo, dir: "asc" | "desc"): Processo[] {
  const fator = dir === "asc" ? 1 : -1;
  return [...lista].sort((a, b) => {
    const numero = a.numero.localeCompare(b.numero, "pt-BR", { numeric: true });
    const cmp =
      campo === "numero"
        ? numero
        : campo === "tipo"
          ? a.tipo.localeCompare(b.tipo, "pt-BR") || numero
          : a.prazo.localeCompare(b.prazo) || numero;
    return cmp * fator;
  });
}

function reduzirFoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/") || file.size > 8_000_000) {
      reject(new Error("foto"));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 256;
      const escala = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * escala));
      canvas.height = Math.max(1, Math.round(img.height * escala));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("foto"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("foto"));
    };
    img.src = url;
  });
}

function emptyForm(): FormState {
  return {
    numero: "",
    parte: "",
    assunto: "",
    tipo: "Requerimentos",
    dataLancamento: todayIso(),
    prazo: addDaysIso(15),
    alertaDias: 3,
    nota: "",
  };
}

function formFrom(p: Processo): FormState {
  return {
    numero: p.numero,
    parte: p.parte,
    assunto: p.assunto,
    tipo: p.tipo,
    dataLancamento: p.dataLancamento,
    prazo: p.prazo,
    alertaDias: p.alertaDias,
    nota: "",
  };
}

const TOM: Record<Urgencia, { badge: string; bar: string; label: string }> = {
  vencido: { badge: "bg-seal-soft text-seal", bar: "bg-seal", label: "Vencido" },
  hoje: { badge: "bg-seal-soft text-seal", bar: "bg-seal", label: "Hoje" },
  proximo: { badge: "bg-brass-soft text-brass", bar: "bg-brass", label: "Vencendo" },
  ok: { badge: "bg-pine-soft text-pine", bar: "bg-pine", label: "No prazo" },
  concluido: { badge: "bg-line text-muted", bar: "bg-line", label: "Concluído" },
};

export function PrazosApp() {
  const { user, isPending } = useCurrentUserState();
  const [ready, setReady] = useState(false);
  const [contaId, setContaId] = useState<string | null>(null);
  const [processos, setProcessos] = useState<Processo[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("abertos");
  const [busca, setBusca] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Processo | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [erros, setErros] = useState<string[]>([]);
  const [andamentoId, setAndamentoId] = useState<string | null>(null);
  const [notaAndamento, setNotaAndamento] = useState("");
  const [novoPrazo, setNovoPrazo] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [perm, setPerm] = useState<NotificationPermission | "unsupported">("unsupported");
  const [toast, setToast] = useState("");
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [equipeAtual, setEquipeAtual] = useState<string | null>(null);
  const [tipoAba, setTipoAba] = useState<TipoProcesso | "todos">("todos");
  const [ordemCampo, setOrdemCampo] = useState<OrdemCampo>("prazo");
  const [ordemDir, setOrdemDir] = useState<"asc" | "desc">("asc");
  const [guia, setGuia] = useState<Guia>("lista");
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [nomePerfil, setNomePerfil] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const meuNome = user?.displayName?.trim() || "Sem nome";

  useEffect(() => {
    if (typeof Notification === "undefined") setPerm("unsupported");
    else setPerm(Notification.permission);
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let cancelado = false;
    const usuarioId = user.id;
    const equipeId = equipeAtual;
    if (contaId !== usuarioId) setReady(false);
    setProcessos([]);
    (async () => {
      try {
        const minhas = await listarEquipes();
        if (cancelado) return;
        setEquipes(minhas);
        const aindaExiste = equipeId === null || minhas.some((equipe) => equipe.id === equipeId);
        const alvo = aindaExiste ? equipeId : null;
        if (!aindaExiste) setEquipeAtual(null);
        let lista = await listarProcessos({ data: alvo });
        const marca = `prazos.importado.${usuarioId}`;
        if (!alvo && lista.length === 0 && localStorage.getItem(marca) !== "1") {
          const locais = lerProcessosLocais();
          for (const item of locais) await salvarProcesso({ data: { ...item, equipeId: null } });
          if (locais.length) lista = await listarProcessos({ data: null });
          localStorage.setItem(marca, "1");
          if (!cancelado && locais.length) setToast("Processos deste navegador foram salvos na sua conta.");
        }
        if (cancelado) return;
        setProcessos(lista);
        setContaId(usuarioId);
        setReady(true);
      } catch {
        if (cancelado) return;
        setProcessos([]);
        setContaId(usuarioId);
        setToast("Não foi possível carregar seus processos.");
        setReady(true);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [user?.id, equipeAtual]);

  const atencao = useMemo(
    () => ordenar(processos.filter((p) => precisaAviso(p))),
    [processos],
  );

  useEffect(() => {
    if (!ready) return;
    const n = atencao.length;
    document.title = n > 0 ? `(${n}) Controle de Prazos` : "Controle de Prazos";
  }, [atencao.length, ready]);

  useEffect(() => {
    if (!ready || perm !== "granted") return;

    const disparar = () => {
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      const enviados = new Set(avisosJaEnviados());
      const novos: string[] = [];
      let mostrados = 0;
      for (const p of ordenar(processos).filter((p) => precisaAviso(p))) {
        const key = avisoKey(p);
        if (enviados.has(key)) continue;
        novos.push(key);
        if (mostrados < 3) {
          const titulo =
            urgencia(p) === "vencido"
              ? "Prazo vencido"
              : urgencia(p) === "hoje"
                ? "Prazo vence hoje"
                : "Prazo vencendo";
          try {
            new Notification(titulo, {
              body: `${p.numero} — ${p.assunto}. ${prazoLabel(p)}.`,
              tag: p.id,
            });
            mostrados += 1;
          } catch {
            /* iframe ou permissão revogada no meio do caminho */
          }
        }
      }
      if (novos.length) marcarAvisos(novos);
    };

    disparar();
    const id = window.setInterval(disparar, 60_000);
    const aoVoltar = () => {
      if (document.visibilityState === "visible") disparar();
    };
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, [ready, perm, processos]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const lista = processos.filter((p) => {
      const u = urgencia(p);
      const passaFiltro =
        filtro === "todos" ||
        (filtro === "abertos" && p.status === "andamento") ||
        (filtro === "atencao" && precisaAviso(p)) ||
        (filtro === "vencidos" && u === "vencido") ||
        (filtro === "prazo" && u === "ok") ||
        (filtro === "concluidos" && p.status === "concluido");
      const passaTipo = tipoAba === "todos" || p.tipo === tipoAba;
      if (!passaFiltro || !passaTipo) return false;
      if (!q) return true;
      return [p.numero, p.parte, p.assunto, p.tipo, p.autorNome].join(" ").toLowerCase().includes(q);
    });
    return classificar(lista, ordemCampo, ordemDir);
  }, [processos, filtro, busca, tipoAba, ordemCampo, ordemDir]);

  const contagem = useMemo(() => {
    let vencidos = 0;
    let hoje = 0;
    let proximos = 0;
    let abertos = 0;
    for (const p of processos) {
      const u = urgencia(p);
      if (p.status === "andamento") abertos += 1;
      if (u === "vencido") vencidos += 1;
      if (u === "hoje") hoje += 1;
      if (u === "proximo") proximos += 1;
    }
    return { vencidos, hoje, proximos, abertos };
  }, [processos]);

  function abrirNovo() {
    setEditing(null);
    setForm(emptyForm());
    setErros([]);
    setFormOpen(true);
  }

  function abrirEdicao(p: Processo) {
    setEditing(p);
    setForm(formFrom(p));
    setErros([]);
    setFormOpen(true);
  }

  function validar(f: FormState): string[] {
    const lista: string[] = [];
    if (!f.numero.trim()) lista.push("Informe o número do processo.");
    if (!f.parte.trim()) lista.push("Informe a parte ou o cliente.");
    if (!f.assunto.trim()) lista.push("Informe o assunto.");
    if (!f.dataLancamento) lista.push("Informe a data de lançamento.");
    if (!f.prazo) lista.push("Informe o prazo de resposta ou andamento.");
    return lista;
  }

  async function persistir(proximo: Processo[], salvo: Processo | null, apagado: string | null, ok: string) {
    const anterior = processos;
    setProcessos(proximo);
    try {
      if (apagado) await apagarProcesso({ data: apagado });
      if (salvo) await salvarProcesso({ data: salvo });
      setToast(ok);
      return true;
    } catch {
      setProcessos(anterior);
      setToast("Não foi possível salvar. Tente de novo.");
      return false;
    }
  }

  async function salvarForm() {
    const problemas = validar(form);
    setErros(problemas);
    if (problemas.length) return;

    const nota = form.nota.trim();
    if (editing) {
      const mudou = textoMudanca(editing, form);
      const extra: Andamento[] = [];
      if (mudou) extra.push(evento(mudou, meuNome));
      if (nota) extra.push(evento(nota, meuNome));
      const atualizado: Processo = {
        ...editing,
        numero: form.numero.trim(),
        parte: form.parte.trim(),
        assunto: form.assunto.trim(),
        tipo: form.tipo,
        dataLancamento: form.dataLancamento,
        prazo: form.prazo,
        alertaDias: form.alertaDias,
        historico: [...editing.historico, ...extra],
      };
      const ok = await persistir(
        processos.map((p) => (p.id === atualizado.id ? atualizado : p)),
        atualizado,
        null,
        "Processo atualizado",
      );
      if (ok) setFormOpen(false);
      return;
    }

    const criado: Processo = {
      id: crypto.randomUUID(),
      numero: form.numero.trim(),
      parte: form.parte.trim(),
      assunto: form.assunto.trim(),
      tipo: form.tipo,
      dataLancamento: form.dataLancamento,
      prazo: form.prazo,
      alertaDias: form.alertaDias,
      status: "andamento",
      historico: nota
        ? [evento("Lançou o processo.", meuNome), evento(nota, meuNome)]
        : [evento("Lançou o processo.", meuNome)],
      equipeId: equipeAtual,
      autorId: user?.id ?? null,
      autorNome: meuNome,
    };
    const ok = await persistir([criado, ...processos], criado, null, "Processo lançado");
    if (ok) setFormOpen(false);
  }

  async function registrarAndamento() {
    if (!andamentoId) return;
    const texto = notaAndamento.trim();
    if (!texto) return;
    const atual = processos.find((p) => p.id === andamentoId);
    if (!atual) return;
    const atualizado: Processo = {
      ...atual,
      prazo: novoPrazo || atual.prazo,
      historico: [...atual.historico, evento(texto, meuNome)],
    };
    const ok = await persistir(
      processos.map((p) => (p.id === atualizado.id ? atualizado : p)),
      atualizado,
      null,
      "Andamento registrado",
    );
    if (!ok) return;
    setAndamentoId(null);
    setNotaAndamento("");
    setNovoPrazo("");
  }

  function concluir(id: string) {
    const atual = processos.find((p) => p.id === id);
    if (!atual) return;
    const atualizado: Processo = {
      ...atual,
      status: "concluido",
      historico: [
        ...atual.historico,
        { id: crypto.randomUUID(), em: new Date().toISOString(), texto: "Marcou como concluído.", autorNome: meuNome },
      ],
    };
    void persistir(
      processos.map((p) => (p.id === id ? atualizado : p)),
      atualizado,
      null,
      "Marcado como concluído",
    );
  }

  function reabrir(id: string) {
    const atual = processos.find((p) => p.id === id);
    if (!atual) return;
    const atualizado: Processo = {
      ...atual,
      status: "andamento",
      historico: [
        ...atual.historico,
        { id: crypto.randomUUID(), em: new Date().toISOString(), texto: "Reabriu o processo.", autorNome: meuNome },
      ],
    };
    void persistir(
      processos.map((p) => (p.id === id ? atualizado : p)),
      atualizado,
      null,
      "Processo reaberto",
    );
  }

  function excluir() {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    void persistir(
      processos.filter((p) => p.id !== id),
      null,
      id,
      "Processo excluído",
    );
  }

  const equipeSelecionada = equipes.find((equipe) => equipe.id === equipeAtual) ?? null;

  async function criarNovaEquipe(nome: string) {
    try {
      const criada = await criarEquipe({ data: nome });
      setEquipeAtual(criada.id);
      setToast(`Equipe ${criada.nome} criada`);
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Não foi possível criar a equipe.");
    }
  }

  async function incluirNaEquipe(email: string) {
    if (!equipeAtual) return;
    try {
      const resultado = await adicionarNaEquipe({ data: { equipeId: equipeAtual, email } });
      setEquipes(await listarEquipes());
      setToast(
        resultado.entrou
          ? `${resultado.nome} agora vê os processos desta equipe.`
          : "Convite guardado. A pessoa entra quando criar a conta com este e-mail.",
      );
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Não foi possível adicionar.");
    }
  }

  async function tirarDaEquipe(email: string) {
    if (!equipeAtual) return;
    try {
      await removerDaEquipe({ data: { equipeId: equipeAtual, email } });
      const minhas = await listarEquipes();
      setEquipes(minhas);
      if (!minhas.some((equipe) => equipe.id === equipeAtual)) setEquipeAtual(null);
      setToast("Equipe atualizada");
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Não foi possível atualizar a equipe.");
    }
  }

  async function salvarPerfil() {
    const nome = nomePerfil.trim();
    if (nome.length < 2) {
      setToast("Informe seu nome.");
      return;
    }
    setSalvandoPerfil(true);
    try {
      const resposta = await authClient.updateUser({ name: nome, image: fotoPerfil });
      if (resposta.error) {
        setToast("Não foi possível atualizar o perfil.");
        return;
      }
      setPerfilOpen(false);
      setToast("Perfil atualizado");
    } catch {
      setToast("Não foi possível atualizar o perfil.");
    } finally {
      setSalvandoPerfil(false);
    }
  }

  async function ativarAvisos() {
    if (typeof Notification === "undefined") {
      setPerm("unsupported");
      return;
    }
    try {
      const resultado = await Notification.requestPermission();
      setPerm(resultado);
      if (resultado === "granted") setToast("Avisos do navegador ativados");
    } catch {
      setPerm("denied");
    }
  }

  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-display text-3xl text-ink">Prazos</p>
        <p className="mt-2 text-muted">Verificando sua conta…</p>
      </main>
    );
  }

  if (!user) return <TelaConta />;

  if (!ready || contaId !== user.id) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-display text-3xl text-ink">Prazos</p>
        <p className="mt-2 text-muted">Carregando seus processos…</p>
      </main>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <header className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" className="size-11 shrink-0 rounded-xl" />
          <div>
            <p className="text-sm font-medium tracking-wide text-pine">Controle de prazos</p>
            <h1 className="font-display text-4xl leading-none text-ink">Prazos</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <UserButton />
          <button
            type="button"
            onClick={() => {
              setNomePerfil(user.displayName ?? "");
              setFotoPerfil(user.profileImageUrl);
              setPerfilOpen(true);
            }}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-sheet px-4 text-sm font-medium text-ink"
          >
            Perfil
          </button>
          <button
            type="button"
            onClick={abrirNovo}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet sm:w-auto"
          >
            <Plus className="size-4" />
            Novo processo
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-[16rem_1fr]">
        <aside className="flex flex-col gap-4 md:sticky md:top-6 md:self-start">
          <div className="grid grid-cols-2 gap-2">
            <Resumo valor={contagem.vencidos} rotulo="Vencidos" tom="seal" />
            <Resumo valor={contagem.hoje} rotulo="Vencem hoje" tom="seal" />
            <Resumo valor={contagem.proximos} rotulo="Vencendo" tom="brass" />
            <Resumo valor={contagem.abertos} rotulo="Em aberto" tom="pine" />
          </div>

          <PainelEquipe
            equipes={equipes}
            atual={equipeAtual}
            meuEmail={user.primaryEmail ?? ""}
            onEscolher={setEquipeAtual}
            onCriar={criarNovaEquipe}
            onAdicionar={incluirNaEquipe}
            onRemover={tirarDaEquipe}
          />

          <div className="rounded-2xl border border-line bg-sheet p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-ink">
              <Bell className="size-4 text-pine" />
              Avisos
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Os prazos vencidos e os que entram na antecedência escolhida ficam destacados no topo.
              Com a página aberta, o navegador também notifica — uma vez por dia para cada prazo.
            </p>
            {perm === "granted" ? (
              <p className="mt-3 text-sm font-medium text-pine">Avisos do navegador ativos.</p>
            ) : perm === "denied" ? (
              <p className="mt-3 flex items-start gap-2 text-sm text-brass">
                <BellOff className="mt-0.5 size-4 shrink-0" />
                Bloqueados neste navegador. Os alertas continuam nesta tela.
              </p>
            ) : perm === "default" ? (
              <button
                type="button"
                onClick={ativarAvisos}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper text-sm font-medium text-ink"
              >
                <Bell className="size-4" />
                Ativar avisos
              </button>
            ) : (
              <p className="mt-3 text-sm text-muted">Este navegador não mostra notificações do sistema.</p>
            )}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => setGuia("lista")}
              className={
                "inline-flex h-11 items-center rounded-xl px-4 text-sm font-medium " +
                (guia === "lista" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink")
              }
            >
              Lista
            </button>
            <button
              type="button"
              onClick={() => setGuia("estatisticas")}
              className={
                "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium " +
                (guia === "estatisticas" ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink")
              }
            >
              <BarChart3 className="size-4" />
              Estatísticas
            </button>
          </div>

          {guia === "estatisticas" ? (
            <PainelEstatisticas processos={processos} />
          ) : (
            <>
              {atencao.length > 0 && (
                <div role="status" aria-live="polite" className="mb-4 rounded-2xl border border-line bg-sheet p-4">
                  <p className="text-sm font-medium text-ink">
                    {atencao.length === 1
                      ? "1 prazo precisa de atenção"
                      : `${atencao.length} prazos precisam de atenção`}
                  </p>
                  {equipeSelecionada && (
                    <p className="mt-1 text-sm text-muted">
                      A equipe {equipeSelecionada.nome} acompanha estes prazos junta — {equipeSelecionada.membros.length}{" "}
                      {equipeSelecionada.membros.length === 1 ? "pessoa" : "pessoas"}.
                    </p>
                  )}
                  <ul className="mt-3 flex flex-col gap-2">
                    {atencao.slice(0, 4).map((p) => {
                      const u = urgencia(p);
                      return (
                        <li key={p.id} className="flex items-start gap-3 text-sm">
                          <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${TOM[u].bar}`} />
                          <span className="min-w-0">
                            <span className="font-medium text-ink">{p.numero}</span>
                            <span className="text-pine"> · {p.tipo}</span>
                            <span className="block text-ink">{p.parte}</span>
                            <span className="text-muted"> · {p.assunto}</span>
                            <span className="block text-muted">
                              {prazoLabel(p)} · {formatDate(p.prazo)}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <label className="relative block">
                  <span className="sr-only">Buscar processo</span>
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
                  <input
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar número, parte ou assunto"
                    className="h-12 w-full rounded-xl border border-line bg-sheet pr-3 pl-10 text-sm text-ink placeholder:text-muted"
                  />
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Tipo de processo">
                  {ABAS_TIPO.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={tipoAba === item.id}
                      onClick={() => setTipoAba(item.id)}
                      className={
                        "h-10 shrink-0 rounded-full px-3 text-sm font-medium " +
                        (tipoAba === item.id ? "bg-pine text-sheet" : "border border-line bg-sheet text-ink")
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {FILTROS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFiltro(item.id)}
                      className={
                        "h-10 shrink-0 rounded-full px-3 text-sm font-medium " +
                        (filtro === item.id ? "bg-ink text-sheet" : "border border-line bg-sheet text-ink")
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-muted">
                    Ordenar
                    <select
                      value={ordemCampo}
                      onChange={(e) => setOrdemCampo(e.target.value as OrdemCampo)}
                      className="h-10 rounded-full border border-line bg-sheet px-3 text-sm text-ink"
                    >
                      <option value="numero">Número</option>
                      <option value="tipo">Tipo</option>
                      <option value="prazo">Prazo</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => setOrdemDir((dir) => (dir === "asc" ? "desc" : "asc"))}
                    className="h-10 rounded-full border border-line bg-sheet px-3 text-sm font-medium text-ink"
                  >
                    {ordemDir === "asc" ? "Crescente" : "Decrescente"}
                  </button>
                </div>
              </div>

          {filtrados.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-line bg-sheet px-6 py-12 text-center">
              <p className="font-display text-2xl text-ink">Nenhum processo aqui</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                {processos.length === 0
                  ? equipeSelecionada
                    ? "Nenhum processo nesta equipe. Lance um para todos acompanharem o prazo."
                    : "Lance o primeiro processo com a data e o prazo de resposta."
                  : "Nada corresponde a este filtro ou à busca."}
              </p>
              {processos.length === 0 && (
                <button
                  type="button"
                  onClick={abrirNovo}
                  className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-pine px-4 text-sm font-medium text-sheet"
                >
                  <Plus className="size-4" />
                  Lançar processo
                </button>
              )}
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {filtrados.map((p) => (
                <ProcessoCard
                  key={p.id}
                  processo={p}
                  onEditar={() => abrirEdicao(p)}
                  onAndamento={() => {
                    setAndamentoId(p.id);
                    setNotaAndamento("");
                    setNovoPrazo("");
                  }}
                  onConcluir={() => concluir(p.id)}
                  onReabrir={() => reabrir(p.id)}
                  onExcluir={() => setDeleteId(p.id)}
                />
              ))}
            </ul>
          )}
            </>
          )}
        </section>
      </div>

      <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-ink/40" />
          <Dialog.Content className="fixed inset-x-3 top-4 bottom-4 z-10 flex flex-col overflow-hidden rounded-2xl border border-line bg-sheet md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90vh] md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <Dialog.Title className="font-display text-2xl text-ink">
                  {editing ? "Editar processo" : "Lançar processo"}
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted">
                  Data do lançamento e prazo de resposta ou andamento.
                </Dialog.Description>
              </div>
              <Dialog.Close className="grid size-10 place-items-center rounded-lg text-muted" aria-label="Fechar">
                <X className="size-4" />
              </Dialog.Close>
            </div>
            <form
              className="flex min-h-0 flex-1 flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                salvarForm();
              }}
            >
              <div className="flex flex-col gap-3 overflow-y-auto px-5 py-4">
                {erros.length > 0 && (
                  <ul className="rounded-xl bg-seal-soft px-3 py-2 text-sm text-seal">
                    {erros.map((erro) => (
                      <li key={erro}>{erro}</li>
                    ))}
                  </ul>
                )}
                <Campo label="Número do processo">
                  <input
                    value={form.numero}
                    onChange={(e) => setForm({ ...form, numero: e.target.value })}
                    className={inputCls}
                    placeholder="0000000-00.0000.0.00.0000"
                    required
                  />
                </Campo>
                <Campo label="Parte ou cliente">
                  <input
                    value={form.parte}
                    onChange={(e) => setForm({ ...form, parte: e.target.value })}
                    className={inputCls}
                    placeholder="Nome da parte"
                    required
                  />
                </Campo>
                <Campo label="Assunto">
                  <input
                    value={form.assunto}
                    onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                    className={inputCls}
                    placeholder="O que precisa de resposta"
                    required
                  />
                </Campo>
                <Campo label="Tipo">
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoProcesso })}
                    className={inputCls}
                  >
                    {ABAS_TIPO.filter((item) => item.id !== "todos").map((tipo) => (
                      <option key={tipo.id}>{tipo.label}</option>
                    ))}
                  </select>
                </Campo>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Campo label="Data de lançamento">
                    <input
                      type="date"
                      value={form.dataLancamento}
                      onChange={(e) => setForm({ ...form, dataLancamento: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Campo>
                  <Campo label="Prazo de resposta">
                    <input
                      type="date"
                      value={form.prazo}
                      onChange={(e) => setForm({ ...form, prazo: e.target.value })}
                      className={inputCls}
                      required
                    />
                  </Campo>
                </div>
                <Campo label="Avisar com antecedência">
                  <select
                    value={form.alertaDias}
                    onChange={(e) => setForm({ ...form, alertaDias: Number(e.target.value) })}
                    className={inputCls}
                  >
                    {ALERTA_OPCOES.map((n) => (
                      <option key={n} value={n}>
                        {n === 1 ? "1 dia antes" : `${n} dias antes`}
                      </option>
                    ))}
                  </select>
                </Campo>
                <Campo label={editing ? "Nota (opcional)" : "Andamento inicial (opcional)"}>
                  <textarea
                    value={form.nota}
                    onChange={(e) => setForm({ ...form, nota: e.target.value })}
                    className={`${inputCls} min-h-20 py-2`}
                    placeholder="O que já foi feito"
                  />
                </Campo>
              </div>
              <div className="flex gap-2 border-t border-line px-5 py-4">
                <Dialog.Close
                  type="button"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium text-ink"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet"
                >
                  Salvar
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={andamentoId !== null} onOpenChange={(open) => !open && setAndamentoId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-ink/40" />
          <Dialog.Content className="fixed inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2">
            <Dialog.Title className="font-display text-2xl text-ink">Registrar andamento</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-muted">
              Anote o que foi feito. Se o prazo mudou, informe a nova data.
            </Dialog.Description>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                registrarAndamento();
              }}
            >
              <Campo label="Andamento">
                <textarea
                  value={notaAndamento}
                  onChange={(e) => setNotaAndamento(e.target.value)}
                  className={`${inputCls} min-h-24 py-2`}
                  required
                  placeholder="Ex.: contestação protocolada"
                />
              </Campo>
              <Campo label="Novo prazo (opcional)">
                <input
                  type="date"
                  value={novoPrazo}
                  onChange={(e) => setNovoPrazo(e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <div className="flex gap-2 pt-1">
                <Dialog.Close
                  type="button"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet"
                >
                  Registrar
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-ink/40" />
          <Dialog.Content className="fixed inset-x-3 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-sm md:-translate-x-1/2">
            <Dialog.Title className="font-display text-2xl text-ink">Excluir processo?</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-muted">
              O lançamento e o histórico saem da lista. Não dá para desfazer.
            </Dialog.Description>
            <div className="mt-4 flex gap-2">
              <Dialog.Close
                type="button"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="button"
                onClick={excluir}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-seal text-sm font-medium text-sheet"
              >
                Excluir
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={perfilOpen} onOpenChange={setPerfilOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-ink/40" />
          <Dialog.Content className="fixed inset-x-3 top-1/2 z-10 max-h-[90vh] -translate-y-1/2 overflow-y-auto rounded-2xl border border-line bg-sheet p-5 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2">
            <Dialog.Title className="font-display text-2xl text-ink">Seu perfil</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-muted">
              O nome aparece como autor dos lançamentos e andamentos.
            </Dialog.Description>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                void salvarPerfil();
              }}
            >
              <div className="flex items-center gap-3">
                {fotoPerfil ? (
                  <img src={fotoPerfil} alt="" className="size-16 rounded-full object-cover" />
                ) : (
                  <span className="grid size-16 place-items-center rounded-full bg-pine-soft text-xl font-medium text-pine">
                    {(nomePerfil || "P").charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <label className="inline-flex h-11 cursor-pointer items-center rounded-xl border border-line px-3 text-sm font-medium text-ink">
                    Escolher foto
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        if (!file) return;
                        void reduzirFoto(file)
                          .then(setFotoPerfil)
                          .catch(() => setToast("Não foi possível usar esta foto."));
                      }}
                    />
                  </label>
                  {fotoPerfil && (
                    <button type="button" onClick={() => setFotoPerfil(null)} className="inline-flex h-11 items-center text-sm text-seal">
                      Remover foto
                    </button>
                  )}
                </div>
              </div>
              <Campo label="Nome">
                <input
                  value={nomePerfil}
                  onChange={(event) => setNomePerfil(event.target.value)}
                  className={inputCls}
                  required
                  minLength={2}
                  maxLength={80}
                />
              </Campo>
              <div className="flex gap-2 pt-1">
                <Dialog.Close
                  type="button"
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-line text-sm font-medium"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={salvandoPerfil}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
                >
                  Salvar perfil
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {toast && (
        <p
          role="status"
          className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-sheet"
        >
          {toast}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted";

function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-ink">
      {label}
      {children}
    </label>
  );
}

function Resumo({
  valor,
  rotulo,
  tom,
}: {
  valor: number;
  rotulo: string;
  tom: "seal" | "brass" | "pine";
}) {
  const cor = tom === "seal" ? "text-seal" : tom === "brass" ? "text-brass" : "text-pine";
  return (
    <div className="rounded-2xl border border-line bg-sheet px-3 py-3">
      <p className={`font-display text-3xl leading-none ${cor}`}>{valor}</p>
      <p className="mt-1 text-xs text-muted">{rotulo}</p>
    </div>
  );
}

function ProcessoCard({
  processo,
  onEditar,
  onAndamento,
  onConcluir,
  onReabrir,
  onExcluir,
}: {
  processo: Processo;
  onEditar: () => void;
  onAndamento: () => void;
  onConcluir: () => void;
  onReabrir: () => void;
  onExcluir: () => void;
}) {
  const [aberto, setAberto] = useState(false);
  const u = urgencia(processo);
  const tom = TOM[u];
  const ultimo = processo.historico[processo.historico.length - 1];
  const dias = daysUntil(processo.prazo);

  return (
    <li className="relative overflow-hidden rounded-2xl border border-line bg-sheet">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${tom.bar}`} aria-hidden />
      <div className="px-4 py-4 pl-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${tom.badge}`}>{prazoLabel(processo)}</span>
        </div>
        <p className="mt-3 font-display text-2xl leading-none tracking-tight text-ink">{processo.numero}</p>
        <p className="mt-1 text-sm font-semibold text-pine">{processo.tipo}</p>
        <h2 className="mt-2 text-base font-semibold text-ink">{processo.parte}</h2>
        <p className="text-sm text-muted">{processo.assunto}</p>
        <p className="mt-1 text-xs text-muted">Lançado por {processo.autorNome || "sem nome"}</p>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted">Lançamento</p>
            <p className="font-medium text-ink">{formatDate(processo.dataLancamento)}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-xs text-muted">
              <CalendarClock className="size-3" />
              Prazo
            </p>
            <p className="font-medium text-ink">{formatDate(processo.prazo)}</p>
            {processo.status === "andamento" && dias > 0 && (
              <p className="text-xs text-muted">Aviso {processo.alertaDias} dias antes</p>
            )}
          </div>
        </div>

        {ultimo && (
          <p className="mt-3 text-sm leading-relaxed text-ink">
            <span className="text-muted">Último · {ultimo.autorNome || "sem nome"} · </span>
            {ultimo.texto}
          </p>
        )}

        {processo.historico.length > 0 && (
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="mt-2 text-sm font-medium text-pine"
          >
            {aberto ? "Ocultar histórico" : `Ver histórico (${processo.historico.length})`}
          </button>
        )}
        {aberto && (
          <ol className="mt-2 flex flex-col gap-2 border-t border-line pt-2">
            {[...processo.historico].reverse().map((item) => (
              <li key={item.id} className="text-sm">
                <span className="text-xs text-muted">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(item.em))}
                  {" · "}
                  {item.autorNome || "sem nome"}
                </span>
                <span className="mt-0.5 block text-ink">{item.texto}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {processo.status === "andamento" && (
            <button
              type="button"
              onClick={onAndamento}
              className="inline-flex h-10 items-center gap-1 rounded-lg bg-pine-soft px-3 text-sm font-medium text-pine"
            >
              Andamento
            </button>
          )}
          {processo.status === "andamento" ? (
            <button
              type="button"
              onClick={onConcluir}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink"
            >
              <Check className="size-4" />
              Concluir
            </button>
          ) : (
            <button
              type="button"
              onClick={onReabrir}
              className="inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink"
            >
              <RotateCcw className="size-4" />
              Reabrir
            </button>
          )}
          <button
            type="button"
            onClick={onEditar}
            className="inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-ink"
            aria-label={`Editar ${processo.numero}`}
          >
            <Pencil className="size-4" />
            Editar
          </button>
          <button
            type="button"
            onClick={onExcluir}
            className="inline-flex h-10 items-center gap-1 rounded-lg border border-line px-3 text-sm font-medium text-seal"
            aria-label={`Excluir ${processo.numero}`}
          >
            <Trash2 className="size-4" />
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
}

function PainelEquipe({
  equipes,
  atual,
  meuEmail,
  onEscolher,
  onCriar,
  onAdicionar,
  onRemover,
}: {
  equipes: Equipe[];
  atual: string | null;
  meuEmail: string;
  onEscolher: (id: string | null) => void;
  onCriar: (nome: string) => Promise<void>;
  onAdicionar: (email: string) => Promise<void>;
  onRemover: (email: string) => Promise<void>;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const selecionada = equipes.find((equipe) => equipe.id === atual) ?? null;

  return (
    <div className="rounded-2xl border border-line bg-sheet p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-ink">
        <Users className="size-4 text-pine" />
        Equipe
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Quem entra na equipe vê os mesmos processos e os prazos que precisam de atenção.
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onEscolher(null)}
          className={
            "h-10 rounded-xl px-3 text-left text-sm font-medium " +
            (atual === null ? "bg-ink text-sheet" : "border border-line text-ink")
          }
        >
          Só meus
        </button>
        {equipes.map((equipe) => (
          <button
            key={equipe.id}
            type="button"
            onClick={() => onEscolher(equipe.id)}
            className={
              "h-10 rounded-xl px-3 text-left text-sm font-medium " +
              (atual === equipe.id ? "bg-ink text-sheet" : "border border-line text-ink")
            }
          >
            {equipe.nome}
          </button>
        ))}
      </div>

      {!selecionada ? (
        <form
          className="mt-3 flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (ocupado || nome.trim().length < 2) return;
            setOcupado(true);
            void onCriar(nome.trim()).finally(() => {
              setNome("");
              setOcupado(false);
            });
          }}
        >
          <label className="flex flex-col gap-1 text-sm font-medium text-ink">
            Nova equipe
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Gabinete"
              className="h-11 rounded-xl border border-line bg-paper px-3 text-sm font-normal"
            />
          </label>
          <button
            type="submit"
            disabled={ocupado}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-pine text-sm font-medium text-sheet disabled:opacity-60"
          >
            Criar equipe
          </button>
        </form>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          <ul className="flex flex-col gap-1">
            {selecionada.membros.map((membro) => (
              <li key={membro.userId} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex min-w-0 items-center gap-2 text-ink">
                  {membro.foto ? (
                    <img src={membro.foto} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pine-soft text-xs font-medium text-pine">
                      {(membro.nome || "?").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="min-w-0 truncate">
                    {membro.nome}
                    <span className="text-muted"> · {membro.papel === "dono" ? "criou" : "membro"}</span>
                  </span>
                </span>
                {selecionada.papel === "dono" && membro.papel !== "dono" && (
                  <button type="button" onClick={() => void onRemover(membro.email)} className="inline-flex h-11 items-center text-sm font-medium text-seal">
                    Remover
                  </button>
                )}
                {selecionada.papel !== "dono" && membro.email.toLowerCase() === meuEmail.toLowerCase() && (
                  <button type="button" onClick={() => void onRemover(membro.email)} className="inline-flex h-11 items-center text-sm font-medium text-seal">
                    Sair
                  </button>
                )}
              </li>
            ))}
            {selecionada.convites.map((convite) => (
              <li key={convite} className="flex items-center justify-between gap-2 text-sm text-muted">
                <span className="min-w-0 truncate">{convite} · convite</span>
                {selecionada.papel === "dono" && (
                  <button type="button" onClick={() => void onRemover(convite)} className="inline-flex h-11 items-center text-sm font-medium text-seal">
                    Remover
                  </button>
                )}
              </li>
            ))}
          </ul>
          {selecionada.papel === "dono" && (
            <form
              className="flex flex-col gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (ocupado || !email.trim()) return;
                setOcupado(true);
                void onAdicionar(email.trim()).finally(() => {
                  setEmail("");
                  setOcupado(false);
                });
              }}
            >
              <label className="flex flex-col gap-1 text-sm font-medium text-ink">
                Adicionar por e-mail
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="pessoa@email.com"
                  className="h-11 rounded-xl border border-line bg-paper px-3 text-sm font-normal"
                />
              </label>
              <button
                type="submit"
                disabled={ocupado}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line text-sm font-medium text-ink disabled:opacity-60"
              >
                Adicionar
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
