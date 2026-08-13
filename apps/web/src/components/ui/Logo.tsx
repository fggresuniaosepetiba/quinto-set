import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
  tile?: boolean;
};

/**
 * Logo oficial da Quinto Set Escolinha de Vôlei.
 * A imagem original é exibida sem qualquer alteração, preservando a identidade.
 * A logo possui fundo transparente (proporção 2:3).
 */
export function Logo({ className, priority, tile = true }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        tile &&
          "rounded-xl bg-white shadow-lg shadow-navy-950/20 ring-1 ring-navy-900/10",
        className,
      )}
    >
      <Image
        src="/logo-quinto-set.png"
        alt="Quinto Set Escolinha de Vôlei"
        width={1024}
        height={1536}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
