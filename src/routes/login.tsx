import { createFileRoute, Navigate } from "@tanstack/react-router";
import { TelaConta } from "@/components/tela-conta";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <p className="font-display text-3xl text-ink">Prazos</p>
        <p className="mt-2 text-muted">Verificando sua conta…</p>
      </main>
    );
  }
  if (user) return <Navigate to="/" />;
  return <TelaConta />;
}
