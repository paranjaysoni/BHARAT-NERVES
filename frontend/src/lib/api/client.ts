const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Safely coerce a backend value to a finite number before calling .toFixed() etc.
export function safeNum(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export async function apiPost<TBody, TResponse>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as { success: boolean; data: TResponse; error?: { code: string; message: string } };

  if (!json.success) {
    throw new Error(json.error?.message ?? `API error on ${path}`);
  }

  return json.data;
}

export async function apiGet<TResponse>(path: string): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}${path}`);
  const json = (await res.json()) as { success: boolean; data: TResponse; error?: { code: string; message: string } };

  if (!json.success) {
    throw new Error(json.error?.message ?? `API error on ${path}`);
  }

  return json.data;
}
