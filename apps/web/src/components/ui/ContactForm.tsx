"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { useFormState } from "@/lib/useFormState";
import {
  emailRule,
  phoneRule,
  requiredRule,
  type FieldRule,
} from "@/lib/validation";

type ContactFormProps = {
  subject?: string;
  ctaLabel?: string;
};

export function ContactForm({
  subject = "Contato pelo site",
  ctaLabel = "Enviar mensagem",
}: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormState({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    });

  const rules: Record<string, FieldRule | undefined> = {
    nome: requiredRule(true),
    email: emailRule(true),
    telefone: phoneRule(false),
    mensagem: requiredRule(true),
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll(rules);
    if (Object.keys(nextErrors).length > 0) {
      const firstName = Object.keys(nextErrors)[0];
      window.setTimeout(() => {
        document.getElementById(`${firstName}-field`)?.focus();
      }, 0);
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 900);
  };

  const blur = (name: string) => handleBlur(name, rules[name]);

  if (sent) {
    return (
      <FormSuccess
        title="Mensagem enviada"
        message="Recebemos sua mensagem. A equipe da Quinto Set entrará em contato em breve."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nome"
          name="nome"
          required
          placeholder="Seu nome"
          autoComplete="name"
          value={values.nome}
          onChange={handleChange}
          onBlur={blur}
          error={errors.nome}
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          required
          placeholder="voce@email.com"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={blur}
          error={errors.email}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Telefone / WhatsApp"
          name="telefone"
          mask="phone"
          placeholder="(21) 9.7493-4685"
          value={values.telefone}
          onChange={handleChange}
          onBlur={blur}
          error={errors.telefone}
        />
        <Field
          label="Assunto"
          name="assunto"
          options={["Matrícula", "Aula experimental", "Patrocínio", "Voluntariado", "Imprensa", "Outro"]}
          value={values.assunto}
          onChange={handleChange}
          onBlur={blur}
          error={errors.assunto}
        />
      </div>
      <Field
        label="Mensagem"
        name="mensagem"
        required
        rows={5}
        placeholder="Como podemos ajudar?"
        value={values.mensagem}
        onChange={handleChange}
        onBlur={blur}
        error={errors.mensagem}
      />
      <input type="hidden" name="subject" value={subject} />
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
      >
        {submitting ? "Enviando..." : ctaLabel}
        {!submitting && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
