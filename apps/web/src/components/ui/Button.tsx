import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "md" | "lg";
  className?: string;
  target?: string;
  rel?: string;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-400/30",
  outline:
    "border border-white/25 text-white hover:border-gold-400 hover:text-gold-300 bg-white/0 hover:bg-white/5",
  ghost: "text-cream-100 hover:text-gold-300",
  white:
    "bg-white text-navy-900 hover:bg-gold-100 shadow-lg shadow-navy-950/10",
};

const sizeClasses: Record<NonNullable<ButtonLinkProps["size"]>, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
