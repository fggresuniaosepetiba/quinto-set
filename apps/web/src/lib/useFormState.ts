"use client";

import { useCallback, useState } from "react";
import type { FieldRule } from "./validation";

type FormValues = Record<string, string>;

export function useFormState(initial: FormValues) {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (name: string, rule?: FieldRule) => {
      if (!rule) return;
      const error = rule(values[name] ?? "");
      setErrors((prev) => {
        const next = { ...prev };
        if (error) next[name] = error;
        else delete next[name];
        return next;
      });
    },
    [values],
  );

  const validateAll = useCallback(
    (rules: Record<string, FieldRule | undefined>) => {
      const next: Record<string, string> = {};
      for (const [name, rule] of Object.entries(rules)) {
        if (!rule) continue;
        const error = rule(values[name] ?? "");
        if (error) next[name] = error;
      }
      setErrors(next);
      return next;
    },
    [values],
  );

  return { values, errors, setValues, handleChange, handleBlur, validateAll };
}
