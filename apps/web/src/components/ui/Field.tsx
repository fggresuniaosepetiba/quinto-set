"use client";

import { cn } from "@/lib/utils";
import {
  PHONE_MASKED_MAX_LENGTH,
  cursorAfterDigits,
  maskPhone,
  phoneDigits,
} from "@/lib/validation";

const fieldClasses =
  "w-full rounded-lg border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-navy-900/40 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40";

const errorFieldClasses =
  "border-red-500 focus:border-red-500 focus:ring-red-400/40";

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  options?: string[];
  rows?: number;
  hint?: string;
  mask?: "phone";
  maxLength?: number;
  autoComplete?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (name: string) => void;
  error?: string;
  className?: string;
  hidden?: boolean;
  labelClassName?: string;
};

export function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
  options,
  rows,
  hint,
  mask,
  maxLength,
  autoComplete,
  value,
  onChange,
  onBlur,
  error,
  className,
  hidden,
  labelClassName,
}: FieldProps) {
  const id = `${name}-field`;
  const errorId = `${name}-error`;
  const isPhone = mask === "phone";
  const controlClasses = cn(fieldClasses, error && errorFieldClasses);
  const errorProps = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  } as const;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isPhone) {
      const el = event.target;
      const typed = el.value;
      const cursor = el.selectionStart ?? typed.length;
      const digitsBefore = (typed.slice(0, cursor).match(/\d/g) ?? []).length;
      const raw = phoneDigits(typed);
      const masked = maskPhone(raw);
      onChange(name, raw);
      requestAnimationFrame(() => {
        if (el) {
          const pos = cursorAfterDigits(masked, digitsBefore);
          el.setSelectionRange(pos, pos);
        }
      });
      return;
    }
    onChange(name, event.target.value);
  };

  const handleBlur = () => {
    onBlur?.(name);
  };

  return (
    <label className={cn(hidden ? "hidden" : "block", className)}>
      <span
        className={cn(
          "mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-900/70",
          labelClassName,
        )}
      >
        {label}
        {required && <span className="text-gold-600"> *</span>}
      </span>

      {options ? (
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={handleBlur}
          className={controlClasses}
          {...errorProps}
        >
          <option value="" disabled>
            Selecione...
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={handleBlur}
          className={cn(controlClasses, "resize-y")}
          {...errorProps}
        />
      ) : (
        <>
          <input
            id={id}
            name={isPhone ? undefined : name}
            type={type}
            inputMode={isPhone ? "numeric" : undefined}
            autoComplete={isPhone ? "tel" : autoComplete}
            required={required}
            placeholder={placeholder}
            value={isPhone ? maskPhone(value) : value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            maxLength={isPhone ? PHONE_MASKED_MAX_LENGTH : maxLength}
            className={controlClasses}
            {...errorProps}
          />
          {isPhone && (
            <input type="hidden" name={name} value={phoneDigits(value)} />
          )}
        </>
      )}

      {error ? (
        <span
          id={errorId}
          role="alert"
          className="mt-1.5 block text-xs font-medium text-red-600"
        >
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-xs text-navy-900/50">{hint}</span>
      ) : null}
    </label>
  );
}
