import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  const baseUrl =
    process.env.NVIDIA_NIM_BASE_URL ?? "https://integrate.api.nvidia.com/v1";
  const model = process.env.NVIDIA_NIM_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      {
        error:
          "NVIDIA NIM is not configured. Set NVIDIA_NIM_API_KEY and NVIDIA_NIM_MODEL in the server environment.",
      },
      { status: 503 }
    );
  }

  const twinState = await request.json();
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 280,
      messages: [
        {
          role: "system",
          content:
            "You are a supply-chain operations analyst. Give one concise recommendation, cite the most important live signals, and state the expected tradeoff. Do not invent data.",
        },
        {
          role: "user",
          content: `Analyze this live factory digital-twin state and recommend the safest next action:\n${JSON.stringify(
            twinState,
            null,
            2
          )}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "NVIDIA NIM could not analyze the current twin state." },
      { status: 502 }
    );
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;

  return NextResponse.json({ recommendation: content ?? "No recommendation returned." });
}
