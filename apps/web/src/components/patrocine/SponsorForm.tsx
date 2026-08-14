"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { useFormState } from "@/lib/useFormState";
import { postLead } from "@/lib/api";
import { maskPhone } from "@/lib/validation";
import {
  emailRule,
  phoneRule,
  requiredRule,
  type FieldRule,
} from "@/lib/validation";

export function SponsorForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { values, errors, handleChange, handleBlur, validateAll } =
    useFormState({
      empresa_nome: "",
      empresa_responsavel: "",
      empresa_email: "",
      empresa_telefone: "",
      empresa_segmento: "",
      empresa_apoio: "",
      empresa_mensagem: "",
      empresa_segmento_outro: "",
      empresa_apoio_outro: "",
    });

  const isSegmentoOutro = values.empresa_segmento === "Outro";
  const isApoioOutro = values.empresa_apoio === "Outro";

  const rules: Record<string, FieldRule | undefined> = {
    empresa_nome: requiredRule(true),
    empresa_responsavel: requiredRule(true),
    empresa_email: emailRule(true),
    empresa_telefone: phoneRule(true),
    empresa_mensagem: requiredRule(true),
    empresa_segmento_outro: isSegmentoOutro ? requiredRule(true) : undefined,
    empresa_apoio_outro: isApoioOutro ? requiredRule(true) : undefined,
  };

  const handleChangeCleaned = (name: string, value: string) => {
    handleChange(name, value);
    if (name === "empresa_segmento" && value !== "Outro") {
      handleChange("empresa_segmento_outro", "");
    }
    if (name === "empresa_apoio" && value !== "Outro") {
      handleChange("empresa_apoio_outro", "");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    setSubmitError(null);
    try {
      await postLead("/sponsors", {
        company: values.empresa_nome,
        segment: isSegmentoOutro
          ? values.empresa_segmento_outro
          : values.empresa_segmento,
        contactName: values.empresa_responsavel,
        phone: maskPhone(values.empresa_telefone),
        email: values.empresa_email,
        support: isApoioOutro
          ? values.empresa_apoio_outro
          : values.empresa_apoio,
        message: values.empresa_mensagem,
      });
      setSent(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Não foi possível enviar.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const blur = (name: string) => handleBlur(name, rules[name]);

  if (sent) {
    return (
      <FormSuccess
        title="Interesse registrado"
        message="Recebemos a manifestação de interesse da sua empresa. A equipe da Quinto Set entrará em contato para conversar sobre as possibilidades de apoio."
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-navy-900/10 ring-1 ring-navy-900/10 sm:p-10">
      <form onSubmit={handleSubmit} noValidate className="grid gap-4">
        {submitError && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700"
          >
            {submitError}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome da empresa"
            name="empresa_nome"
            required
            placeholder="Nome da empresa / instituição"
            value={values.empresa_nome}
            onChange={handleChange}
            onBlur={blur}
            error={errors.empresa_nome}
          />
          <Field
            label="Nome do responsável"
            name="empresa_responsavel"
            required
            placeholder="Nome do contato"
            value={values.empresa_responsavel}
            onChange={handleChange}
            onBlur={blur}
            error={errors.empresa_responsavel}
          />
          <Field
            label="E-mail"
            name="empresa_email"
            type="email"
            required
            placeholder="contato@empresa.com.br"
            autoComplete="email"
            value={values.empresa_email}
            onChange={handleChange}
            onBlur={blur}
            error={errors.empresa_email}
          />
          <Field
            label="Telefone / WhatsApp"
            name="empresa_telefone"
            mask="phone"
            required
            placeholder="(21) 9.7493-4685"
            value={values.empresa_telefone}
            onChange={handleChange}
            onBlur={blur}
            error={errors.empresa_telefone}
          />
          <div className="grid gap-4">
            <Field
              label="Segmento"
              name="empresa_segmento"
              options={["Educação", "Esporte", "Saúde", "Comunicação", "Tecnologia", "Comércio", "Indústria", "Outro"]}
              value={values.empresa_segmento}
              onChange={handleChangeCleaned}
              onBlur={blur}
              error={errors.empresa_segmento}
              labelClassName="min-h-[2rem]"
            />
            <Field
              label="Outro segmento"
              name="empresa_segmento_outro"
              required={isSegmentoOutro}
              placeholder="Digite o segmento da empresa"
              hidden={!isSegmentoOutro}
              value={values.empresa_segmento_outro}
              onChange={handleChange}
              onBlur={blur}
              error={errors.empresa_segmento_outro}
              labelClassName="min-h-[2rem]"
            />
          </div>
          <div className="grid gap-4">
            <Field
              label="Tipo de apoio / interesse"
              name="empresa_apoio"
              required
              options={["Patrocínio", "Apoio financeiro", "Doação de materiais", "Equipamentos esportivos", "Voluntariado", "Parceria institucional", "Outro"]}
              value={values.empresa_apoio}
              onChange={handleChangeCleaned}
              onBlur={blur}
              error={errors.empresa_apoio}
              labelClassName="min-h-[2rem]"
            />
            <Field
              label="Outro tipo de apoio / interesse"
              name="empresa_apoio_outro"
              required={isApoioOutro}
              placeholder="Descreva o tipo de apoio"
              hidden={!isApoioOutro}
              value={values.empresa_apoio_outro}
              onChange={handleChange}
              onBlur={blur}
              error={errors.empresa_apoio_outro}
              labelClassName="min-h-[2rem]"
            />
          </div>
        </div>
        <Field
          label="Mensagem"
          name="empresa_mensagem"
          required
          rows={5}
          placeholder="Conte um pouco sobre o interesse da sua empresa em apoiar a Quinto Set."
          value={values.empresa_mensagem}
          onChange={handleChange}
          onBlur={blur}
          error={errors.empresa_mensagem}
        />
        <p className="text-xs leading-relaxed text-navy-900/60">
          Suas informações serão utilizadas apenas para o contato sobre apoio ao
          projeto.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-4 font-display text-sm font-semibold uppercase tracking-wider text-navy-950 transition-colors hover:bg-gold-300 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar interesse"}
          {!submitting && <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
