export const herdSizeOptions = [
  { value: "ate_50", label: "Até 50 cabeças" },
  { value: "51_100", label: "De 51 a 100" },
  { value: "101_300", label: "De 101 a 300" },
  { value: "301_500", label: "De 301 a 500" },
  { value: "501_1000", label: "De 501 a 1.000" },
  { value: "1001_3000", label: "De 1.001 a 3.000" },
  { value: "mais_3000", label: "Mais de 3.000" },
  {
    value: "sem_rebanho",
    label: "Não possuo rebanho atualmente",
  },
] as const;

export const cattleRoleOptions = [
  { value: "cria", label: "Cria" },
  { value: "recria", label: "Recria" },
  { value: "engorda_pasto", label: "Engorda a pasto" },
  { value: "semiconfinamento", label: "Semiconfinamento" },
  { value: "confinamento", label: "Confinamento" },
  { value: "ciclo_completo", label: "Ciclo completo" },
  {
    value: "consultoria_assistencia",
    label: "Consultoria ou assistência técnica",
  },
  { value: "outra", label: "Outra" },
] as const;

export const brazilStateOptions = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export function optionValues<T extends readonly { value: string }[]>(
  options: T
): string[] {
  return options.map((option) => option.value);
}
