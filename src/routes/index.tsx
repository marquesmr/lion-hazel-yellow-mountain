import { createFileRoute } from "@tanstack/react-router";
import { PrazosApp } from "@/components/prazos-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PrazosApp />;
}
