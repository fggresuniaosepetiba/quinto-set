export const PHONE_MAX_DIGITS = 11;
export const PHONE_MASKED_MAX_LENGTH = 16;
export const MIN_BIRTH_YEAR = new Date().getFullYear() - 100;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return EMAIL_PATTERN.test(trimmed);
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_MAX_DIGITS);
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskPhone(value: string): string {
  const d = phoneDigits(value);
  const n = d.length;
  if (n === 0) return "";
  if (n === 1) return d;
  if (n === 2) return d;
  let out = `(${d.slice(0, 2)})`;
  out += ` ${d[2]}`;
  if (n >= 4) out += `.${d.slice(3, Math.min(7, n))}`;
  if (n >= 8) out += `-${d.slice(7)}`;
  return out;
}

export function isValidPhone(value: string): boolean {
  const d = unmaskPhone(value);
  return d.length === PHONE_MAX_DIGITS && d[0] !== "0";
}

export function cursorAfterDigits(masked: string, digitsBefore: number): number {
  let digits = 0;
  let i = 0;
  while (i < masked.length && digits < digitsBefore) {
    const ch = masked[i];
    if (ch >= "0" && ch <= "9") digits += 1;
    i += 1;
  }
  return i;
}

export const MESSAGES = {
  required: "Preencha este campo.",
  email: "Informe um e-mail válido.",
  phone: "Informe um telefone válido.",
  birthDate: "Data de nascimento inválida.",
} as const;

export type FieldRule = (value: string) => string | null;

export function requiredRule(required: boolean): FieldRule {
  return (value) => {
    if (!value.trim()) return required ? MESSAGES.required : null;
    return null;
  };
}

export function emailRule(required: boolean): FieldRule {
  return (value) => {
    const v = value.trim();
    if (!v) return required ? MESSAGES.required : null;
    return isValidEmail(v) ? null : MESSAGES.email;
  };
}

export function phoneRule(required: boolean): FieldRule {
  return (value) => {
    const v = value.trim();
    if (!v) return required ? MESSAGES.required : null;
    return isValidPhone(v) ? null : MESSAGES.phone;
  };
}

export function isValidBirthDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  const validCalendar =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
  if (!validCalendar) return false;
  if (date > new Date()) return false;
  return year >= MIN_BIRTH_YEAR;
}

export function todayDateInputValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function birthDateRule(required: boolean): FieldRule {
  return (value) => {
    const v = value.trim();
    if (!v) return required ? MESSAGES.required : null;
    return isValidBirthDate(v) ? null : MESSAGES.birthDate;
  };
}
