import { t as createServerFn } from "./ssr.mjs";
import { t as answerQuestion } from "./research-answers-C1RaX7hM.mjs";
import { i as teachChart } from "./chart-teacher-yKcVTq9r.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Dfpk79HO.js
function localResearch(prompt, context, history = []) {
	return answerQuestion(prompt, context, history);
}
var askResearch_createServerFn_handler = createServerRpc({
	id: "e8e5687cd8191f1d4cf4ae7660bf84fa1ca4f54ad65ea071f465be82ee5235ca",
	name: "askResearch",
	filename: "src/lib/chat.ts"
}, (opts) => askResearch.__executeServer(opts));
var askResearch = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const prompt = String(d?.prompt ?? "").trim();
	if (!prompt) throw new Error("Ask a question");
	if (prompt.length > 2e3) throw new Error("Keep questions under 2,000 characters");
	const history = Array.isArray(d?.history) ? d.history.slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		text: String(m.text ?? "").slice(0, 1200)
	})).filter((m) => m.text) : [];
	return {
		prompt,
		context: String(d?.context ?? "").slice(0, 4e3),
		history
	};
}).handler(askResearch_createServerFn_handler, async ({ data }) => {
	const local = localResearch(data.prompt, data.context, data.history);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		text: local
	};
	const messages = [{
		role: "system",
		content: `You are PlanVista Finance Research, a calm teacher for Indian markets and personal money.
The learner may ask anything. Answer in plain, readable English. Light Hindi is fine if they wrote in Hindi.
Rules:
- For learning purposes only. Not investment advice. Not a SEBI-registered advisor. Never name a stock to buy or sell. Never give a price target or a "sure shot".
- If they ask for a tip, refuse and teach the idea instead.
- Short paragraphs and bullets. No walls of text. About 120–180 words.
- Use numbers from the context only. If a number is missing, say so. Do not invent filings or returns.
- Off-topic questions get a short honest answer, then one line pointing back to money or markets if it helps.
- End with: "For learning purposes only."`
	}];
	if (data.context) messages.push({
		role: "user",
		content: `Context:\n${data.context}`
	});
	for (const m of data.history) messages.push({
		role: m.role,
		content: m.text
	});
	messages.push({
		role: "user",
		content: data.prompt
	});
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 700,
				temperature: .4,
				messages
			})
		});
		if (!res.ok) return {
			ok: true,
			text: local
		};
		const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
		if (!text) return {
			ok: true,
			text: local
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: true,
			text: local
		};
	}
});
var askChartGpt_createServerFn_handler = createServerRpc({
	id: "a4dd0c7a3bb61318de90830ed6624a7b1b185c7cee3f94bbc62a9da6e3f64fb5",
	name: "askChartGpt",
	filename: "src/lib/chat.ts"
}, (opts) => askChartGpt.__executeServer(opts));
var askChartGpt = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	const prompt = String(d?.prompt ?? "").trim();
	if (!prompt) throw new Error("Ask Chart GPT a question");
	if (prompt.length > 2e3) throw new Error("Keep questions under 2,000 characters");
	const history = Array.isArray(d?.history) ? d.history.slice(-8).map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		text: String(m.text ?? "").slice(0, 1500)
	})).filter((m) => m.text) : [];
	const snapshot = d?.snapshot && typeof d.snapshot === "object" ? d.snapshot : null;
	return {
		prompt,
		context: String(d?.context ?? "").slice(0, 5e3),
		history,
		snapshot
	};
}).handler(askChartGpt_createServerFn_handler, async ({ data }) => {
	const local = data.snapshot ? teachChart(data.prompt, data.snapshot, data.history) : localResearch(data.prompt, data.context, data.history);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: true,
		text: local
	};
	const messages = [{
		role: "system",
		content: `You are "Chart GPT — Awaaz Desk", an educational chart explainer in the style of a calm CNBC Awaaz market-desk teacher. Hindi-English mix is welcome; keep sentences short and readable.
You help first-time Indian investors READ a chart. You never tell them to buy or sell a specific stock.

Rules:
- For learning purposes only. Not investment advice. Not a SEBI-registered research analyst or adviser.
- Explain candles, trend, support/resistance, volume, bull vs bear colour in simple words.
- Use the provided snapshot numbers only. If a number is missing, say so. Do not invent prices, targets, or "sure-shot" levels.
- No guaranteed returns. No "ye stock lo". Offer 2–4 teaching bullets and one risk reminder.
- If the user asks for a buy/sell call, refuse and teach how a stop-loss and target are written instead.
- Structure every reply with short paragraphs and bullets so a beginner can actually read it.
- Remember prior turns in this chat and stay on the same symbol unless the snapshot changes.
- End with: "Yeh sirf padhai ke liye hai — Chart GPT is not a buy/sell call."`
	}];
	if (data.context) {
		messages.push({
			role: "user",
			content: `Chart snapshot (delayed public tape — treat as last print, not a live tick):\n${data.context}`
		});
		messages.push({
			role: "assistant",
			content: "Understood. I will teach from this snapshot only and will not give a buy/sell call."
		});
	}
	for (const m of data.history) messages.push({
		role: m.role,
		content: m.text
	});
	messages.push({
		role: "user",
		content: `Learner question: ${data.prompt}`
	});
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 700,
				temperature: .35,
				messages
			})
		});
		if (!res.ok) return {
			ok: true,
			text: local
		};
		const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
		if (!text) return {
			ok: true,
			text: local
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: true,
			text: local
		};
	}
});
//#endregion
export { askChartGpt_createServerFn_handler, askResearch_createServerFn_handler };
