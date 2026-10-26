/** Envia o código de recuperação. Exige RESEND_API_KEY no ambiente. */
export async function enviarCodigoEmail(email: string, otp: string): Promise<void> {
  const chave = process.env.RESEND_API_KEY?.trim();
  const de = process.env.EMAIL_FROM?.trim();
  if (!chave || !de) {
    throw new Error("O envio de e-mail ainda não está configurado.");
  }
  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: de,
      to: [email],
      subject: "Código para redefinir sua senha",
      text: `Seu código de recuperação do Controle de Prazos é ${otp}.\n\nEle vale por 10 minutos. Se você não pediu a troca, ignore este e-mail.`,
    }),
  });
  if (!resposta.ok) {
    throw new Error("Não foi possível enviar o e-mail agora. Tente de novo em instantes.");
  }
}
