import { createContext } from "react";

export const SoltarProcessoContext = createContext<((processoId: string, equipeId: string | null) => void) | null>(null);
