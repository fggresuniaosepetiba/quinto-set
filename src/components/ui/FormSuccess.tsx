import { CheckCircle2 } from "lucide-react";

type FormSuccessProps = {
  title: string;
  message: string;
};

export function FormSuccess({ title, message }: FormSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-8 py-14 text-center">
      <CheckCircle2 className="h-12 w-12 text-emerald-500" />
      <h3 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight text-navy-900">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-navy-900/65">
        {message}
      </p>
    </div>
  );
}
