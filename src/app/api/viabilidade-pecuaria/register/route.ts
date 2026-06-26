import { NextResponse } from "next/server";
import { isValidCpf, normalizeCpf } from "@/lib/cpf";
import {
  createViabilidadeLead,
  findViabilidadeLeadByCpf,
  isSupabaseConfigError,
  isSupabaseConflictError,
} from "@/lib/supabase-viabilidade";
import {
  brazilStateOptions,
  cattleRoleOptions,
  herdSizeOptions,
  optionValues,
} from "@/lib/viabilidade-registration-options";

export const dynamic = "force-dynamic";

const herdSizeValues = optionValues(herdSizeOptions);
const cattleRoleValues = optionValues(cattleRoleOptions);
const stateValues: string[] = [...brazilStateOptions];

type RegisterRequestBody = {
  fullName?: unknown;
  cpf?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  city?: unknown;
  state?: unknown;
  herdSizeRange?: unknown;
  herdSizeExact?: unknown;
  cattleRoles?: unknown;
  otherRole?: unknown;
  consent?: unknown;
};

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readOptionalText(value: unknown): string | null {
  const text = readText(value);
  return text ? text : null;
}

function readHerdSizeExact(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;

  return Math.floor(parsed);
}

export async function POST(request: Request) {
  let body: RegisterRequestBody;

  try {
    body = (await request.json()) as RegisterRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Envie os dados do cadastro para continuar." },
      { status: 400 }
    );
  }

  const fullName = readText(body.fullName);
  const cpf = normalizeCpf(String(body.cpf ?? ""));
  const whatsapp = readText(body.whatsapp);
  const email = readOptionalText(body.email);
  const city = readText(body.city);
  const state = readText(body.state).toUpperCase();
  const herdSizeRange = readText(body.herdSizeRange);
  const herdSizeExact = readHerdSizeExact(body.herdSizeExact);
  const cattleRoles = Array.isArray(body.cattleRoles)
    ? body.cattleRoles.map(readText).filter(Boolean)
    : [];
  const otherRole = readOptionalText(body.otherRole);

  if (
    !fullName ||
    !isValidCpf(cpf) ||
    !whatsapp ||
    !city ||
    !stateValues.includes(state) ||
    !herdSizeValues.includes(herdSizeRange) ||
    cattleRoles.length === 0 ||
    cattleRoles.some((role) => !cattleRoleValues.includes(role)) ||
    body.consent !== true
  ) {
    return NextResponse.json(
      { message: "Preencha os campos obrigatórios para liberar o acesso." },
      { status: 400 }
    );
  }

  try {
    await createViabilidadeLead({
      fullName,
      cpf,
      whatsapp,
      email,
      city,
      state,
      herdSizeRange,
      herdSizeExact,
      cattleRoles,
      otherRole,
    });

    return NextResponse.json({ registered: true, cpf });
  } catch (error) {
    if (isSupabaseConflictError(error)) {
      const existingLead = await findViabilidadeLeadByCpf(cpf);

      if (existingLead) {
        return NextResponse.json({ registered: true, cpf });
      }
    }

    if (isSupabaseConfigError(error)) {
      return NextResponse.json(
        { message: "Configuração do Supabase pendente." },
        { status: 503 }
      );
    }

    console.error("Erro ao salvar cadastro de viabilidade:", error);
    return NextResponse.json(
      { message: "Não foi possível salvar o cadastro agora." },
      { status: 500 }
    );
  }
}
