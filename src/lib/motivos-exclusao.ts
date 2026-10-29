export type MotivoExclusao = {
  id: string;
  titulo: string;
  resumo: string;
  fundamento: string;
};

export const MOTIVOS_EXCLUSAO: MotivoExclusao[] = [
  {
    id: "compartilhada",
    titulo: "Conta compartilhada",
    resumo: "A conta foi usada por mais de uma pessoa.",
    fundamento:
      "O item 3.3 dos Termos veda compartilhar credenciais. A conta é pessoal. A senha e os atos feitos com ela são de responsabilidade de quem a criou.",
  },
  {
    id: "informacao-falsa",
    titulo: "Dados falsos ou sem autorização",
    resumo: "Houve cadastro de dado falso, incompleto ou de terceiro sem autorização.",
    fundamento:
      "O item 4.2 dos Termos veda cadastrar dados falsos, incompletos ou de terceiros sem autorização legítima. O item 2.3 atribui ao usuário a responsabilidade exclusiva pelas informações lançadas.",
  },
  {
    id: "uso-comercial",
    titulo: "Exploração comercial",
    resumo: "O acesso foi revendido, sublicenciado ou explorado comercialmente.",
    fundamento:
      "O item 4.2 dos Termos veda revender, sublicenciar ou explorar comercialmente o acesso ao Programa sem autorização escrita do Titular.",
  },
  {
    id: "prejuizo-equipe",
    titulo: "Conteúdo vedado",
    resumo: "Foi armazenado conteúdo ilegal, ofensivo, confidencial ou que viola direito de terceiro.",
    fundamento:
      "O item 4.2 dos Termos veda armazenar conteúdo ilegal, difamatório, ofensivo, confidencial de terceiros ou que viole propriedade intelectual ou privacidade.",
  },
  {
    id: "acesso-indevido",
    titulo: "Acesso ou uso indevido",
    resumo: "Houve tentativa de acesso não autorizado ou interferência no Programa.",
    fundamento:
      "O item 4.2 dos Termos veda tentar acessar conta de outro usuário, fazer engenharia reversa, interferir no funcionamento, sobrecarregar a infraestrutura ou usar o Programa para spam, phishing ou atividade ilícita. O item 3.4 permite encerrar a conta nesse caso.",
  },
];

export function motivoExclusao(id: string): MotivoExclusao | null {
  return MOTIVOS_EXCLUSAO.find((item) => item.id === id) ?? null;
}
