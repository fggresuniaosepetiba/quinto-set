"use client";

import { useState } from "react";
import { ShieldCheck, Send } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormErrors } from "@/components/ui/FormErrors";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { useFormState } from "@/lib/useFormState";
import { postLead } from "@/lib/api";
import { LeadValidationError, mapServerIssues } from "@/lib/leadError";
import { maskPhone } from "@/lib/validation";
import {
  MIN_BIRTH_YEAR,
  andRules,
  birthDateRule,
  emailRule,
  maxLengthRule,
  phoneRule,
  requiredRule,
  todayDateInputValue,
  type FieldRule,
} from "@/lib/validation";

export function MatriculaForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const { values, errors, setErrors, handleChange, handleBlur, validateAll } =
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
    aluno_nome: andRules(requiredRule(true), maxLengthRule(255)),
    aluno_nascimento: birthDateRule(true),
    aluno_sexo: requiredRule(true),
    aluno_telefone: phoneRule(true),
    aluno_email: emailRule(false),
    aluno_endereco: andRules(requiredRule(true), maxLengthRule(255)),
    aluno_escola: andRules(requiredRule(true), maxLengthRule(255)),
    aluno_serie: andRules(requiredRule(true), maxLengthRule(255)),
    aluno_categoria: requiredRule(true),
    resp_nome: andRules(requiredRule(true), maxLengthRule(255)),
    resp_parentesco: andRules(requiredRule(true), maxLengthRule(255)),
    resp_telefone: phoneRule(true),
    resp_email: emailRule(true),
  };

  const SERVER_PATH_TO_FIELD: Record<string, string> = {
    "student.name": "aluno_nome",
    "student.birthDate": "aluno_nascimento",
    "student.sex": "aluno_sexo",
    "student.phone": "aluno_telefone",
    "student.email": "aluno_email",
    "student.address": "aluno_endereco",
    "student.school": "aluno_escola",
    "student.grade": "aluno_serie",
    "student.category": "aluno_categoria",
    "guardian.name": "resp_nome",
    "guardian.relationship": "resp_parentesco",
    "guardian.phone": "resp_telefone",
    "guardian.email": "resp_email",
  };

  const FIELD_LABELS: Record<string, string> = {
    aluno_nome: "Nome completo do aluno",
    aluno_nascimento: "Data de nascimento",
    aluno_sexo: "Sexo",
    aluno_telefone: "Telefone / WhatsApp do aluno",
    aluno_email: "E-mail",
    aluno_endereco: "Endereço / Bairro",
    aluno_escola: "Escola onde estuda",
    aluno_serie: "Série / Ano escolar",
    aluno_categoria: "Categoria pretendida",
    resp_nome: "Nome completo do responsável",
    resp_parentesco: "Parentesco",
    resp_telefone: "Telefone / WhatsApp do responsável",
    resp_email: "E-mail do responsável",
  };

  const invalidItems = attempted
    ? Object.keys(FIELD_LABELS).flatMap((name) =>
        errors[name]
          ? [{ name, label: FIELD_LABELS[name], error: errors[name] }]
          : [],
      )
    : [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll(rules);
    if (Object.keys(nextErrors).length > 0) {
      setAttempted(true);
      const firstName = Object.keys(nextErrors)[0];
      window.setTimeout(() => {
        document.getElementById(`${firstName}-field`)?.focus();
      }, 0);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await postLead("/enrollments", {
        student: {
          name: values.aluno_nome,
          birthDate: values.aluno_nascimento,
          sex: values.aluno_sexo,
          phone: maskPhone(values.aluno_telefone),
          email: values.aluno_email || undefined,
          address: values.aluno_endereco,
          school: values.aluno_escola,
          grade: values.aluno_serie,
          category: values.aluno_categoria,
        },
        guardian: {
          name: values.resp_nome,
          relationship: values.resp_parentesco,
          phone: maskPhone(values.resp_telefone),
          email: values.resp_email,
        },
      });
      setSent(true);
    } catch (error) {
      if (error instanceof LeadValidationError) {
        const { fields, unmapped } = mapServerIssues(
          error.issues,
          SERVER_PATH_TO_FIELD,
        );
        setErrors((prev) => ({ ...prev, ...fields }));
        setAttempted(true);
        if (unmapped.length > 0) {
          setSubmitError(unmapped.map((issue) => issue.message).join(" "));
        }
        const firstName = Object.keys(fields)[0];
        if (firstName) {
          window.setTimeout(() => {
            document.getElementById(`${firstName}-field`)?.focus();
          }, 0);
        }
      } else {
        setSubmitError(
          error instanceof Error ? error.message : "Não foi possível enviar.",
        );
      }
    } finally {
      setSubmitting(false);
    }
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
        {submitError && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
          >
            {submitError}
          </p>
        )}
        <FormErrors items={invalidItems} />
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
              hint="Obrigatório"
            />
            <Field
              label="Data de nascimento"
              name="aluno_nascimento"
              type="date"
              required
              max={todayDateInputValue()}
              value={values.aluno_nascimento}
              onChange={handleChange}
              onBlur={blur}
              error={errors.aluno_nascimento}
              hint={`Obrigatório • não futura e a partir de ${MIN_BIRTH_YEAR}`}
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
              hint="Obrigatório"
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
              hint="Obrigatório • 11 dígitos com DDD"
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
              hint="Opcional • e-mail válido se informado"
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
              hint="Obrigatório"
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
              hint="Obrigatório"
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
              hint="Obrigatório"
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
              hint="Obrigatório"
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
              hint="Obrigatório"
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
              hint="Obrigatório"
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
              hint="Obrigatório • 11 dígitos com DDD"
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
              hint="Obrigatório • e-mail válido"
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
