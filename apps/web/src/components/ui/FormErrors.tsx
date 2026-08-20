"use client";

export type FormErrorItem = {
  name: string;
  label: string;
  error: string;
};

type FormErrorsProps = {
  items: FormErrorItem[];
};

export function FormErrors({ items }: FormErrorsProps) {
  if (items.length === 0) return null;

  const focusField = (name: string) => {
    document.getElementById(`${name}-field`)?.focus();
  };

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-4 text-sm text-red-700"
    >
      <p className="mb-2 font-semibold">Corrija os campos abaixo:</p>
      <ul className="grid gap-1.5">
        {items.map(({ name, label, error }) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => focusField(name)}
              className="text-left underline-offset-2 hover:underline"
            >
              <span className="font-medium">{label}</span>
              <span aria-hidden="true"> — </span>
              <span>{error}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}