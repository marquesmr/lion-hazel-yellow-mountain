import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export function CampoSenha({ className = "", ...resto }: InputHTMLAttributes<HTMLInputElement>) {
  const [visivel, setVisivel] = useState(false);
  return (
    <span className="relative block min-w-0">
      <input {...resto} type={visivel ? "text" : "password"} className={`${className} pr-11`} />
      <button
        type="button"
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        onClick={() => setVisivel((atual) => !atual)}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted"
      >
        {visivel ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
      </button>
    </span>
  );
}
