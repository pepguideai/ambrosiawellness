const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

/** Reads a JSON or form-encoded request body into a plain object. */
export async function readBody(req: Request): Promise<Record<string, unknown>> {
  const type = req.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) return (await req.json()) ?? {};
    if (type.includes("form")) return Object.fromEntries((await req.formData()).entries());
  } catch {
    // fall through to empty body
  }
  return {};
}
