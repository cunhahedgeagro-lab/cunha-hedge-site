"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

type PhoneInputProps = React.ComponentProps<typeof Input>;

function formatBrazilPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len <= 2) return `(${digits}`;
  if (len <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  // 11 digits: (xx) xxxxx-xxxx, 10 digits: (xx) xxxx-xxxx
  const isEleven = len > 10;
  const middle = isEleven ? digits.slice(2, 7) : digits.slice(2, 6);
  const end = isEleven ? digits.slice(7) : digits.slice(6);
  return `(${digits.slice(0, 2)}) ${middle}-${end}`;
}

export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
  const [internal, setInternal] = React.useState<string>(
    typeof value === "string" ? value : ""
  );

  React.useEffect(() => {
    if (typeof value === "string") setInternal(value);
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatBrazilPhone(e.target.value);
    setInternal(formatted);
    if (onChange) {
      // Create a synthetic event with formatted value
      const event = {
        ...e,
        target: { ...e.target, value: formatted, name: e.target.name },
        currentTarget: { ...e.currentTarget, value: formatted, name: e.target.name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  }

  return (
    <Input
      inputMode="numeric"
      autoComplete="tel"
      maxLength={16}
      value={internal}
      onChange={handleChange}
      {...props}
    />
  );
}

export default PhoneInput;


