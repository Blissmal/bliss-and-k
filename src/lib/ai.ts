export async function ask(system: string, user: string, maxTokens = 1500) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.AI_MODEL ?? "claude-sonnet-5",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  if (!res.ok) throw new Error(`The AI request failed (${res.status})`);
  const data = (await res.json()) as { content: { type: string; text?: string }[] };
  return data.content.filter((b) => b.type === "text").map((b) => b.text).join("");
}

export function parseJson<T>(text: string): T {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("The AI reply was not in the expected format. Try again.");
  return JSON.parse(m[0]) as T;
}
