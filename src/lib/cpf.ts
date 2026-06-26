export function normalizeCpf(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function formatCpf(value: string): string {
  const digits = normalizeCpf(value);
  const first = digits.slice(0, 3);
  const second = digits.slice(3, 6);
  const third = digits.slice(6, 9);
  const verifier = digits.slice(9, 11);

  if (digits.length <= 3) return first;
  if (digits.length <= 6) return `${first}.${second}`;
  if (digits.length <= 9) return `${first}.${second}.${third}`;
  return `${first}.${second}.${third}-${verifier}`;
}

export function isValidCpf(value: string): boolean {
  const digits = normalizeCpf(value);

  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const numbers = digits.split("").map(Number);
  const calculateDigit = (factor: number) => {
    const total = numbers
      .slice(0, factor - 1)
      .reduce((sum, number, index) => sum + number * (factor - index), 0);
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(10) === numbers[9] && calculateDigit(11) === numbers[10];
}
