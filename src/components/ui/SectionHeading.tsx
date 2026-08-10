import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 font-display text-sm font-semibold uppercase tracking-[0.25em]",
            dark ? "text-gold-400" : "text-gold-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-cream-100/80" : "text-navy-900/70",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
