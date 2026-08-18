"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { useFormState } from "@/lib/useFormState";
import { requiredRule, type FieldRule } from "@/lib/validation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormState({
      username: "",
      password: "",
    });

  const rules: Record<string, FieldRule | undefined> = {
    username: requiredRule(true),
    password: requiredRule(true),
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll(rules);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setSubmitError(
          body?.error === "invalid_credentials"
            ? "Usuário ou senha inválidos."
            : "Não foi possível entrar. Tente novamente.",
        );
        return;
      }
      const from = searchParams.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch {
      setSubmitError("Não foi possível entrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const blur = (name: string) => handleBlur(name, rules[name]);

  return (
    <main className="bg-cream-50 py-16">
      <div className="mx-auto w-full max-w-md px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-900/10">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-navy-900">
            Acesso restrito
          </h1>
          <p className="mt-1 text-sm text-navy-900/65">
            Entre para gerenciar os leads.
          </p>

          {submitError && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-4">
            <Field
              label="Usuário"
              name="username"
              required
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              onBlur={blur}
              error={errors.username}
            />
            <Field
              label="Senha"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={blur}
              error={errors.password}
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
            >
              {submitting ? "Entrando..." : "Entrar"}
              {!submitting && <LogIn className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}