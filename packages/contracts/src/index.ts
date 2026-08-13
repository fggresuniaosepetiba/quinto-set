import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  uptime: z.number(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

const requiredText = (message: string) =>
  z
    .string()
    .trim()
    .min(1, { message })
    .max(255, { message: "Valor muito longo." });

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\(\d{2}\)\s\d\.\d{4}-\d{4}$/, {
    message: "Telefone inválido.",
  });

export const emailSchema = z.email({ message: "Informe um e-mail válido." }).trim();

const studentData = z.object({
  name: requiredText("Informe o nome do aluno."),
  birthDate: z.string().date({ message: "Informe uma data válida." }),
  sex: z.enum(["Masculino", "Feminino"]),
  phone: phoneSchema,
  email: emailSchema.optional(),
  address: requiredText("Informe o endereço."),
  school: requiredText("Informe a escola."),
  grade: requiredText("Informe a série."),
  category: z.enum(["SUB-14", "SUB-16", "SUB-18", "SUB-19"]),
});

const guardianData = z.object({
  name: requiredText("Informe o nome do responsável."),
  relationship: requiredText("Informe o parentesco."),
  phone: phoneSchema,
  email: emailSchema,
});

export const enrollmentSchema = z.object({
  student: studentData,
  guardian: guardianData,
});

export type EnrollmentInput = z.input<typeof enrollmentSchema>;
export type Enrollment = z.infer<typeof enrollmentSchema>;

export const contactSchema = z.object({
  name: requiredText("Informe seu nome."),
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: requiredText("Escreva sua mensagem.").max(2000),
});

export type ContactInput = z.input<typeof contactSchema>;
export type Contact = z.infer<typeof contactSchema>;

export const sponsorSchema = z.object({
  company: requiredText("Informe a empresa."),
  segment: requiredText("Informe o segmento."),
  contactName: requiredText("Informe o nome do contato."),
  phone: phoneSchema,
  email: emailSchema,
  city: requiredText("Informe a cidade."),
  state: z
    .string()
    .trim()
    .length(2, { message: "Informe a UF." })
    .toUpperCase(),
  message: z.string().trim().max(2000).optional(),
});

export type SponsorInput = z.input<typeof sponsorSchema>;
export type Sponsor = z.infer<typeof sponsorSchema>;
