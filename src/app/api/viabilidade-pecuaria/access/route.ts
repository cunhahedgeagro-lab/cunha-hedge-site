import { NextResponse } from "next/server";
import { isValidCpf, normalizeCpf } from "@/lib/cpf";
import {
  findViabilidadeLeadByCpf,
  isSupabaseConfigError,
} from "@/lib/supabase-viabilidade";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { cpf?: unknown };

  try {
    body = (await request.json()) as { cpf?: unknown };
  } catch {
    return NextResponse.json(
      { message: "Envie um CPF válido para continuar." },
      { status: 400 }
    );
  }

  const cpf = normalizeCpf(String(body.cpf ?? ""));

  if (!isValidCpf(cpf)) {
    return NextResponse.json(
      { message: "Informe um CPF válido para continuar." },
      { status: 400 }
    );
  }

  try {
    const lead = await findViabilidadeLeadByCpf(cpf);

    return NextResponse.json({
      registered: Boolean(lead),
      cpf,
    });
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return NextResponse.json(
        { message: "Configuração do Supabase pendente." },
        { status: 503 }
      );
    }

    console.error("Erro ao consultar cadastro de viabilidade:", error);
    return NextResponse.json(
      { message: "Não foi possível consultar o cadastro agora." },
      { status: 500 }
    );
  }
}
