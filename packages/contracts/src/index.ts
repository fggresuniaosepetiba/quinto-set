import { z } from "zod";

export const MIN_BIRTH_YEAR = new Date().getFullYear() - 100;

export const healthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  uptime: z.number(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const leadTypeSchema = z.enum(["contact", "enrollment", "sponsor"]);

export const createdLeadSchema = z.object({
  id: z.string(),
  type: leadTypeSchema,
  createdAt: z.string(),
});

export type CreatedLead = z.infer<typeof createdLeadSchema>;

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
  birthDate: z
    .string()
    .date({ message: "Informe uma data válida." })
    .refine(
      (value) => {
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        return (
          date.getUTCFullYear() === year &&
          date.getUTCMonth() === month - 1 &&
          date.getUTCDate() === day
        );
      },
      { message: "Informe uma data válida." },
    )
    .refine(
      (value) => new Date(value + "T00:00:00Z") <= new Date(),
      { message: "A data de nascimento não pode ser no futuro." },
    )
    .refine(
      (value) => Number(value.split("-")[0]) >= MIN_BIRTH_YEAR,
      { message: `A data de nascimento precisa ser a partir de ${MIN_BIRTH_YEAR}.` },
    ),
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
  subject: z.string().trim().max(120).optional(),
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
  city: z.string().trim().max(255).optional(),
  state: z
    .string()
    .trim()
    .length(2, { message: "Informe a UF." })
    .toUpperCase()
    .optional(),
  support: z.string().trim().max(255).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type SponsorInput = z.input<typeof sponsorSchema>;
export type Sponsor = z.infer<typeof sponsorSchema>;

export const leadDataSchema = z.union([
  contactSchema,
  enrollmentSchema,
  sponsorSchema,
]);

export type LeadData = z.infer<typeof leadDataSchema>;

export const leadSchema = z.object({
  id: z.string(),
  type: leadTypeSchema,
  data: leadDataSchema,
  createdAt: z.string(),
});

export type Lead = z.infer<typeof leadSchema>;

export const leadsResponseSchema = z.object({
  leads: z.array(leadSchema),
});

export type LeadsResponse = z.infer<typeof leadsResponseSchema>;

export const loginInputSchema = z.object({
  username: z.string().trim().min(1, { message: "Informe o usuário." }),
  password: z.string().min(1, { message: "Informe a senha." }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const authResponseSchema = z.object({
  token: z.string(),
  expiresAt: z.string().datetime(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
