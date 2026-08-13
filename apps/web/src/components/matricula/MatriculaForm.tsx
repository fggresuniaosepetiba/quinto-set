"use client";

import { useState } from "react";
import { ShieldCheck, Send } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { useFormState } from "@/lib/useFormState";
import {
  emailRule,
  phoneRule,
  requiredRule,
  type FieldRule,
} from "@/lib/validation";

export function MatriculaForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormState({
      aluno_nome: "",
      aluno_nascimento: "",
      aluno_sexo: "",
      aluno_telefone: "",
      aluno_email: "",
      aluno_endereco: "",
      aluno_escola: "",
      aluno_serie: "",
      aluno_categoria: "",
      resp_nome: "",
      resp_parentesco: "",
      resp_telefone: "",
      resp_email: "",
    });

  const rules: Record<string, FieldRule> = {
    aluno_nome: requiredRule(true),
    aluno_nascimento: requiredRule(true),
    aluno_sexo: requiredRule(true),
    aluno_telefone: phoneRule(true),
    aluno_email: emailRule(false),
    aluno_endereco: requiredRule(true),
    aluno_escola: requiredRule(true),
    aluno_serie: requiredRule(true),
    aluno_categoria: requiredRule(true),
    resp_nome: requiredRule(true),
    resp_parentesco: requiredRule(true),
    resp_telefone: phoneRule(true),
    resp_email: emailRule(true),
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
        title="Cadastro recebido"
        message="Recebemos o cadastro de interesse. Lembre-se: o preenchimento deste formulário não confirma a matrícula. O responsável deverá comparecer à AMOCOC — Associação de Moradores do Conjunto Otacílio Câmara — para validar a inscrição. Você receberá as orientações em breve."
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-navy-900/10 ring-1 ring-navy-900/10 sm:p-10">
      <form onSubmit={handleSubmit} noValidate className="grid gap-8">
        <fieldset>
          <legend className="mb-5 flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-950 text-sm text-gold-400">
              1
            </span>
            Dados do aluno
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nome completo do aluno"
              name="aluno_nome"
              required
              placeholder="Nome do aluno"
              autoComplete="name"
              value={values.aluno_nome}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_nome}
            />
            <Field
              label="Data de nascimento"
              name="aluno_nascimento"
              type="date"
              required
              value={values.aluno_nascimento}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_nascimento}
            />
            <Field
              label="Sexo"
              name="aluno_sexo"
              required
              options={["Masculino", "Feminino"]}
              value={values.aluno_sexo}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_sexo}
            />
            <Field
              label="Telefone / WhatsApp"
              name="aluno_telefone"
              mask="phone"
              required
              placeholder="(21) 9.7493-4685"
              value={values.aluno_telefone}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_telefone}
            />
            <Field
              label="E-mail"
              name="aluno_email"
              type="email"
              placeholder="aluno@email.com"
              autoComplete="email"
              value={values.aluno_email}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_email}
            />
            <Field
              label="Endereço / Bairro"
              name="aluno_endereco"
              required
              placeholder="Rua, número, bairro"
              value={values.aluno_endereco}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_endereco}
            />
            <Field
              label="Escola onde estuda"
              name="aluno_escola"
              required
              placeholder="Nome da escola"
              value={values.aluno_escola}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_escola}
            />
            <Field
              label="Série / Ano escolar"
              name="aluno_serie"
              required
              placeholder="Ex.: 2º ano do Ensino Médio"
              value={values.aluno_serie}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_serie}
            />
            <Field
              label="Categoria pretendida"
              name="aluno_categoria"
              required
              options={["SUB-14", "SUB-16", "SUB-18", "SUB-19"]}
              value={values.aluno_categoria}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_categoria}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-5 flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-navy-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy-950 text-sm text-gold-400">
              2
            </span>
            Dados do responsável
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nome completo do responsável"
              name="resp_nome"
              required
              placeholder="Nome do responsável"
              autoComplete="name"
              value={values.resp_nome}
              onChange={handleChange}
              onBlur={blur}
              error={errors.resp_nome}
            />
            <Field
              label="Parentesco"
              name="resp_parentesco"
              required
              placeholder="Ex.: pai, mãe, tutor"
              value={values.resp_parentesco}
              onChange={handleChange}
              onBlur={blur}
              error={errors.resp_parentesco}
            />
            <Field
              label="Telefone / WhatsApp"
              name="resp_telefone"
              mask="phone"
              required
              placeholder="(21) 9.7493-4685"
              value={values.resp_telefone}
              onChange={handleChange}
              onBlur={blur}
              error={errors.resp_telefone}
            />
            <Field
              label="E-mail"
              name="resp_email"
              type="email"
              required
              placeholder="voce@email.com"
              autoComplete="email"
              value={values.resp_email}
              onChange={handleChange}
              onBlur={blur}
              error={errors.resp_email}
            />
          </div>
        </fieldset>

        <div className="flex flex-col gap-4 rounded-xl border border-gold-500/30 bg-gold-500/10 p-5">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-navy-900/80">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
            <span>
              <strong className="font-semibold text-navy-900">
                Importante:
              </strong>{" "}
              o preenchimento deste formulário não confirma automaticamente a
              matrícula. O responsável deverá comparecer à{" "}
              <strong className="font-semibold text-navy-900">
                AMOCOC — Associação de Moradores do Conjunto Otacílio Câmara
              </strong>{" "}
              para validação da inscrição.
            </span>
          </p>
          <p className="text-xs leading-relaxed text-navy-900/60">
            Os dados informados são tratados com responsabilidade e utilizados
            apenas para o processo de inscrição e comunicação com a família.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-4 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar cadastro"}
          {!submitting && <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
