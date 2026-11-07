import { NextResponse } from "next/server";

const DEFAULT_BASE_URL = "https://api.hindsight.vectorize.io";
type HindsightRequest = { operation?: "recall" | "reflect" | "retain"; query?: string; content?: string; context?: string };

export async function POST(request: Request) {
  const apiKey = process.env.HINDSIGHT_API_KEY;
  const bankId = process.env.HINDSIGHT_BANK_ID;
  const baseUrl = (process.env.HINDSIGHT_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
  if (!apiKey || !bankId) return NextResponse.json({ configured: false, error: "Hindsight is not configured. Add HINDSIGHT_API_KEY and HINDSIGHT_BANK_ID to the server environment." }, { status: 503 });
  let body: HindsightRequest;
  try { body = (await request.json()) as HindsightRequest; } catch { return NextResponse.json({ configured: true, error: "Invalid request body." }, { status: 400 }); }
  const operation = body.operation || "recall";
  const endpoint = operation === "retain" ? `/v1/default/banks/${encodeURIComponent(bankId)}/memories` : operation === "reflect" ? `/v1/default/banks/${encodeURIComponent(bankId)}/reflect` : `/v1/default/banks/${encodeURIComponent(bankId)}/memories/recall`;
  const payload = operation === "retain" ? { items: [{ content: body.content || "", context: body.context, timestamp: new Date().toISOString() }] } : { query: body.query || "", ...(body.context ? { context: body.context } : {}) };
  if (operation === "retain" && !body.content?.trim()) return NextResponse.json({ configured: true, error: "Memory content is required." }, { status: 400 });
  if (operation !== "retain" && !body.query?.trim()) return NextResponse.json({ configured: true, error: "A memory query is required." }, { status: 400 });
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    return NextResponse.json({ configured: true, operation, ...data }, { status: response.status });
  } catch (error) { return NextResponse.json({ configured: true, error: error instanceof Error ? error.message : "Unable to reach Hindsight." }, { status: 502 }); }
}
