import { createServerFn } from "@tanstack/react-start";
import { teachChart, type ChartSnapshot, type ChatTurn } from "./chart-teacher";
import { answerQuestion } from "./research-answers";

export function localResearch(prompt: string, context: string, history: ChatTurn[] = []): string {
  return answerQuestion(prompt, context, history);
}

export const askResearch = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { prompt?: string; context?: string; history?: ChatTurn[] };
    const prompt = String(d?.prompt ?? "").trim();
    if (!prompt) throw new Error("Ask a question");
    if (prompt.length > 2000) throw new Error("Keep questions under 2,000 characters");
    const history = Array.isArray(d?.history)
      ? d.history
          .slice(-8)
          .map((m) => ({
            role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
            text: String(m.text ?? "").slice(0, 1200),
          }))
          .filter((m) => m.text)
      : [];
    return { prompt, context: String(d?.context ?? "").slice(0, 4000), history };
  })
  .handler(async ({ data }) => {
    const local = localResearch(data.prompt, data.context, data.history);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: true as const, text: local };

    const system = `You are PlanVista Finance Research, a calm teacher for Indian markets and personal money.
The learner may ask anything. Answer in plain, readable English. Light Hindi is fine if they wrote in Hindi.
Rules:
- For learning purposes only. Not investment advice. Not a SEBI-registered advisor. Never name a stock to buy or sell. Never give a price target or a "sure shot".
- If they ask for a tip, refuse and teach the idea instead.
- Short paragraphs and bullets. No walls of text. About 120–180 words.
- Use numbers from the context only. If a number is missing, say so. Do not invent filings or returns.
- Off-topic questions get a short honest answer, then one line pointing back to money or markets if it helps.
- End with: "For learning purposes only."`;

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: system },
    ];
    if (data.context) messages.push({ role: "user", content: `Context:\n${data.context}` });
    for (const m of data.history) messages.push({ role: m.role, content: m.text });
    messages.push({ role: "user", content: data.prompt });

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          temperature: 0.4,
          messages,
        }),
      });
      if (!res.ok) return { ok: true as const, text: local };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: true as const, text: local };
      return { ok: true as const, text };
    } catch {
      return { ok: true as const, text: local };
    }
  });

export const askChartGpt = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as {
      prompt?: string;
      context?: string;
      history?: ChatTurn[];
      snapshot?: ChartSnapshot;
    };
    const prompt = String(d?.prompt ?? "").trim();
    if (!prompt) throw new Error("Ask Chart GPT a question");
    if (prompt.length > 2000) throw new Error("Keep questions under 2,000 characters");
    const history = Array.isArray(d?.history)
      ? d.history
          .slice(-8)
          .map((m) => ({
            role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
            text: String(m.text ?? "").slice(0, 1500),
          }))
          .filter((m) => m.text)
      : [];
    const snapshot = d?.snapshot && typeof d.snapshot === "object" ? (d.snapshot as ChartSnapshot) : null;
    return { prompt, context: String(d?.context ?? "").slice(0, 5000), history, snapshot };
  })
  .handler(async ({ data }) => {
    const local = data.snapshot
      ? teachChart(data.prompt, data.snapshot, data.history)
      : localResearch(data.prompt, data.context, data.history);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: true as const, text: local };

    const system = `You are "Chart GPT — Awaaz Desk", an educational chart explainer in the style of a calm CNBC Awaaz market-desk teacher. Hindi-English mix is welcome; keep sentences short and readable.
You help first-time Indian investors READ a chart. You never tell them to buy or sell a specific stock.

Rules:
- For learning purposes only. Not investment advice. Not a SEBI-registered research analyst or adviser.
- Explain candles, trend, support/resistance, volume, bull vs bear colour in simple words.
- Use the provided snapshot numbers only. If a number is missing, say so. Do not invent prices, targets, or "sure-shot" levels.
- No guaranteed returns. No "ye stock lo". Offer 2–4 teaching bullets and one risk reminder.
- If the user asks for a buy/sell call, refuse and teach how a stop-loss and target are written instead.
- Structure every reply with short paragraphs and bullets so a beginner can actually read it.
- Remember prior turns in this chat and stay on the same symbol unless the snapshot changes.
- End with: "Yeh sirf padhai ke liye hai — Chart GPT is not a buy/sell call."`;

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: system },
    ];
    if (data.context) {
      messages.push({
        role: "user",
        content: `Chart snapshot (delayed public tape — treat as last print, not a live tick):\n${data.context}`,
      });
      messages.push({
        role: "assistant",
        content: "Understood. I will teach from this snapshot only and will not give a buy/sell call.",
      });
    }
    for (const m of data.history) messages.push({ role: m.role, content: m.text });
    messages.push({ role: "user", content: `Learner question: ${data.prompt}` });

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          temperature: 0.35,
          messages,
        }),
      });
      if (!res.ok) return { ok: true as const, text: local };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { ok: true as const, text: local };
      return { ok: true as const, text };
    } catch {
      return { ok: true as const, text: local };
    }
  });
