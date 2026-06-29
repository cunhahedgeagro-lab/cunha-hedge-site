"use client";

import * as React from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ViabilidadePecuariaCalculator from "@/components/ViabilidadePecuariaCalculator";
import { formatCpf, isValidCpf, normalizeCpf } from "@/lib/cpf";
import {
  brazilStateOptions,
  cattleRoleOptions,
  herdSizeOptions,
} from "@/lib/viabilidade-registration-options";

type AccessStep = "cpf" | "register" | "application";

type RegistrationForm = {
  fullName: string;
  cpf: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  herdSizeRange: string;
  cattleRoles: string[];
  otherRole: string;
  consent: boolean;
};

const emptyRegistrationForm: RegistrationForm = {
  fullName: "",
  cpf: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  herdSizeRange: "",
  cattleRoles: [],
  otherRole: "",
  consent: false,
};

function updateRegistrationField<K extends keyof RegistrationForm>(
  current: RegistrationForm,
  key: K,
  value: RegistrationForm[K]
): RegistrationForm {
  return { ...current, [key]: value };
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="text-sm font-medium text-zinc-700">
      {children}
      {required && <span className="text-primary"> *</span>}
    </span>
  );
}

export default function ViabilidadePecuariaAccess() {
  const [step, setStep] = React.useState<AccessStep>("cpf");
  const [cpf, setCpf] = React.useState("");
  const [registration, setRegistration] = React.useState<RegistrationForm>(
    emptyRegistrationForm
  );
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  function updateRegistration<K extends keyof RegistrationForm>(
    key: K,
    value: RegistrationForm[K]
  ) {
    setRegistration((current) => updateRegistrationField(current, key, value));
  }

  function toggleCattleRole(value: string) {
    setRegistration((current) => {
      const selected = current.cattleRoles.includes(value);
      const cattleRoles = selected
        ? current.cattleRoles.filter((role) => role !== value)
        : [...current.cattleRoles, value];

      return {
        ...current,
        cattleRoles,
        otherRole: cattleRoles.includes("outra") ? current.otherRole : "",
      };
    });
  }

  async function handleCpfSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const normalizedCpf = normalizeCpf(cpf);

    if (!isValidCpf(normalizedCpf)) {
      setMessage("Informe um CPF válido para continuar.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/viabilidade-pecuaria/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: normalizedCpf }),
      });
      const data = (await response.json()) as {
        registered?: boolean;
        message?: string;
      };

      if (!response.ok) {
        setMessage(data.message ?? "Não foi possível consultar o cadastro.");
        return;
      }

      if (data.registered) {
        setStep("application");
        return;
      }

      setRegistration({
        ...emptyRegistrationForm,
        cpf: formatCpf(normalizedCpf),
      });
      setStep("register");
    } catch {
      setMessage("Não foi possível consultar o cadastro agora.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isValidCpf(registration.cpf)) {
      setMessage("Informe um CPF válido para continuar.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/viabilidade-pecuaria/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: registration.fullName,
          cpf: normalizeCpf(registration.cpf),
          whatsapp: registration.whatsapp,
          email: registration.email,
          city: registration.city,
          state: registration.state,
          herdSizeRange: registration.herdSizeRange,
          cattleRoles: registration.cattleRoles,
          otherRole: registration.otherRole,
          consent: registration.consent,
        }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(data.message ?? "Não foi possível salvar o cadastro.");
        return;
      }

      setStep("application");
    } catch {
      setMessage("Não foi possível salvar o cadastro agora.");
    } finally {
      setIsLoading(false);
    }
  }

  if (step === "application") {
    return <ViabilidadePecuariaCalculator />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {step === "cpf" && (
        <Card className="rounded-lg border-primary/20 py-0 shadow-sm">
          <CardContent className="px-5 py-7 sm:px-8 sm:py-9">
            <p className="text-sm font-semibold uppercase text-primary">
              Cunha Hedge
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
              Acesse a ferramenta
            </h1>
            <p className="mt-2 text-zinc-600">
              Informe seu CPF para continuar
            </p>

            <form className="mt-7 grid gap-4" onSubmit={handleCpfSubmit}>
              <label className="grid gap-1.5">
                <FieldLabel>CPF</FieldLabel>
                <Input
                  value={cpf}
                  onChange={(event) => setCpf(formatCpf(event.target.value))}
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                  autoComplete="off"
                  className="h-11 text-base"
                />
              </label>

              {message && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                Continuar
              </Button>
            </form>

            <p className="mt-5 rounded-md bg-primary/5 px-4 py-3 text-sm leading-6 text-zinc-600">
              O CPF é utilizado somente para identificar seu cadastro e liberar
              o acesso à ferramenta.
            </p>
          </CardContent>
        </Card>
      )}

      {step === "register" && (
        <Card className="rounded-lg border-primary/20 py-0 shadow-sm">
          <CardContent className="px-5 py-7 sm:px-8 sm:py-9">
            <button
              type="button"
              onClick={() => {
                setStep("cpf");
                setMessage("");
              }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
            >
              <ArrowLeft className="size-4" />
              Voltar
            </button>

            <h1 className="mt-5 text-3xl font-semibold text-zinc-950">
              Complete seu cadastro para acessar a ferramenta
            </h1>

            <form className="mt-7 grid gap-6" onSubmit={handleRegisterSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5 md:col-span-2">
                  <FieldLabel required>Nome completo</FieldLabel>
                  <Input
                    value={registration.fullName}
                    onChange={(event) =>
                      updateRegistration("fullName", event.target.value)
                    }
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <FieldLabel required>CPF</FieldLabel>
                  <Input
                    value={registration.cpf}
                    onChange={(event) =>
                      updateRegistration("cpf", formatCpf(event.target.value))
                    }
                    inputMode="numeric"
                    autoComplete="off"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <FieldLabel required>Telefone/WhatsApp</FieldLabel>
                  <Input
                    value={registration.whatsapp}
                    onChange={(event) =>
                      updateRegistration("whatsapp", event.target.value)
                    }
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <FieldLabel>E-mail</FieldLabel>
                  <Input
                    type="email"
                    value={registration.email}
                    onChange={(event) =>
                      updateRegistration("email", event.target.value)
                    }
                    autoComplete="email"
                  />
                </label>

                <label className="grid gap-1.5">
                  <FieldLabel required>Município</FieldLabel>
                  <Input
                    value={registration.city}
                    onChange={(event) =>
                      updateRegistration("city", event.target.value)
                    }
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label className="grid gap-1.5">
                  <FieldLabel required>Estado</FieldLabel>
                  <select
                    value={registration.state}
                    onChange={(event) =>
                      updateRegistration("state", event.target.value)
                    }
                    required
                    className="h-9 rounded-md border border-input bg-white px-3 text-sm text-zinc-900 shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <option value="">UF</option>
                    {brazilStateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="grid gap-3">
                <legend className="text-sm font-semibold text-zinc-900">
                  Tamanho aproximado do rebanho
                  <span className="text-primary"> *</span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {herdSizeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                    >
                      <input
                        type="radio"
                        name="herdSizeRange"
                        value={option.value}
                        checked={registration.herdSizeRange === option.value}
                        onChange={() =>
                          updateRegistration("herdSizeRange", option.value)
                        }
                        required
                        className="size-4 accent-primary"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="grid gap-3">
                <legend className="text-sm font-semibold text-zinc-900">
                  Em quais etapas da pecuária você atua?
                  <span className="text-primary"> *</span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {cattleRoleOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex min-h-11 items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                    >
                      <input
                        type="checkbox"
                        checked={registration.cattleRoles.includes(option.value)}
                        onChange={() => toggleCattleRole(option.value)}
                        className="size-4 accent-primary"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {registration.cattleRoles.includes("outra") && (
                <label className="grid gap-1.5">
                  <FieldLabel>Descreva a outra atuação</FieldLabel>
                  <Input
                    value={registration.otherRole}
                    onChange={(event) =>
                      updateRegistration("otherRole", event.target.value)
                    }
                  />
                </label>
              )}

              <label className="flex items-start gap-3 rounded-md bg-primary/5 px-4 py-3 text-sm leading-6 text-zinc-700">
                <input
                  type="checkbox"
                  checked={registration.consent}
                  onChange={(event) =>
                    updateRegistration("consent", event.target.checked)
                  }
                  required
                  className="mt-1 size-4 accent-primary"
                />
                <span>
                  Autorizo a Cunha Hedge a armazenar meus dados para liberar o
                  acesso à ferramenta e possibilitar contato relacionado à
                  simulação.
                </span>
              </label>

              {message && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 bg-primary text-white hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                Liberar acesso
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
