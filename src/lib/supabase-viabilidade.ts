const LEADS_TABLE = "viabilidade_pecuaria_leads";

export type ViabilidadeLeadPayload = {
  fullName: string;
  cpf: string;
  whatsapp: string;
  email: string | null;
  city: string;
  state: string;
  herdSizeRange: string;
  herdSizeExact: number | null;
  cattleRoles: string[];
  otherRole: string | null;
};

type SupabaseLeadRow = {
  id: string;
  cpf: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return {
    url: url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, ""),
    key,
  };
}

async function supabaseFetch(path: string, init?: RequestInit) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`SUPABASE_REQUEST_FAILED:${response.status}:${details}`);
  }

  return response;
}

export async function findViabilidadeLeadByCpf(
  cpf: string
): Promise<SupabaseLeadRow | null> {
  const params = new URLSearchParams({
    select: "id,cpf",
    cpf: `eq.${cpf}`,
    limit: "1",
  });
  const response = await supabaseFetch(`${LEADS_TABLE}?${params.toString()}`);
  const rows = (await response.json()) as SupabaseLeadRow[];

  return rows[0] ?? null;
}

export async function createViabilidadeLead(
  payload: ViabilidadeLeadPayload
): Promise<SupabaseLeadRow> {
  const params = new URLSearchParams({
    select: "id,cpf",
  });
  const response = await supabaseFetch(`${LEADS_TABLE}?${params.toString()}`, {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      full_name: payload.fullName,
      cpf: payload.cpf,
      whatsapp: payload.whatsapp,
      email: payload.email,
      city: payload.city,
      state: payload.state,
      herd_size_range: payload.herdSizeRange,
      herd_size_exact: payload.herdSizeExact,
      cattle_roles: payload.cattleRoles,
      other_role: payload.otherRole,
    }),
  });
  const rows = (await response.json()) as SupabaseLeadRow[];

  return rows[0];
}

export function isSupabaseConfigError(error: unknown): boolean {
  return error instanceof Error && error.message === "SUPABASE_NOT_CONFIGURED";
}

export function isSupabaseConflictError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.message.startsWith("SUPABASE_REQUEST_FAILED:409:")
  );
}
