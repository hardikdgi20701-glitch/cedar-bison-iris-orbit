import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-tv-D1JgQ3_a.js
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
var TV_CHANNELS = [
	{
		id: "awaaz",
		name: "CNBC Awaaz",
		tagline: "Hindi · share bazaar",
		channelId: "UCQIycDaLsBpMKjOCeaKUYVg",
		playlistId: "PLSbrpwmzi3x-94fRO5nlKTOTqzqMaDuPX",
		fallbackId: "i_1g_M0JSy4"
	},
	{
		id: "tv18",
		name: "CNBC-TV18",
		tagline: "English · markets",
		channelId: "UCmRbHAgG2k2vDUvb3xsEunQ"
	},
	{
		id: "etnow",
		name: "ET Now",
		tagline: "English · tape",
		channelId: "UCI_mwTKUhicNzFrhm33MzBQ"
	},
	{
		id: "zee",
		name: "Zee Business",
		tagline: "Hindi · markets",
		channelId: "UCkXopQ3ubd-rnXnStZqCl2w"
	}
];
var cache = /* @__PURE__ */ new Map();
function marketTitle(title) {
	return /nifty|sensex|stock|market|share|bazaar|trade|business|cnbc|et now|zee/i.test(title);
}
async function fetchText(url) {
	const res = await fetch(url, {
		headers: { "User-Agent": UA },
		signal: AbortSignal.timeout(4e3)
	});
	if (!res.ok) throw new Error(`tv ${res.status}`);
	return res.text();
}
function rssVideos(xml) {
	const blocks = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
	const out = [];
	for (const block of blocks) {
		const id = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1];
		const title = (block.match(/<title>([^<]+)<\/title>/) ?? [])[1];
		if (id && title) out.push({
			id,
			title
		});
	}
	return out;
}
async function playerDetails(videoId) {
	try {
		const res = await fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
			method: "POST",
			headers: {
				"User-Agent": UA,
				"Content-Type": "application/json"
			},
			signal: AbortSignal.timeout(4e3),
			body: JSON.stringify({
				context: { client: {
					clientName: "WEB",
					clientVersion: "2.20260911.01.00",
					hl: "en",
					gl: "IN"
				} },
				videoId
			})
		});
		if (!res.ok) return null;
		const d = (await res.json()).videoDetails;
		if (!d?.title) return null;
		return {
			title: d.title,
			live: Boolean(d.isLive)
		};
	} catch {
		return null;
	}
}
async function resolveStream(ch) {
	const candidates = [];
	if (ch.fallbackId) candidates.push({
		id: ch.fallbackId,
		title: ch.name
	});
	try {
		if (ch.playlistId) {
			const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?playlist_id=${ch.playlistId}`);
			candidates.push(...rssVideos(xml).slice(0, 4));
		}
	} catch {}
	try {
		const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channelId}`);
		candidates.push(...rssVideos(xml).slice(0, 6));
	} catch {}
	const seen = /* @__PURE__ */ new Set();
	let last = null;
	let liveMarket = null;
	let liveAny = null;
	for (const c of candidates) {
		if (seen.has(c.id)) continue;
		seen.add(c.id);
		const det = await playerDetails(c.id);
		const title = det?.title || c.title;
		const live = Boolean(det?.live);
		const row = {
			id: c.id,
			title,
			live
		};
		if (!last) last = row;
		if (live && !liveAny) liveAny = row;
		if (live && marketTitle(title) && !liveMarket) liveMarket = row;
		if (liveMarket) break;
	}
	const pick = liveMarket ?? liveAny ?? last ?? {
		id: ch.fallbackId || candidates[0]?.id || "",
		title: ch.name,
		live: false
	};
	return {
		channelId: ch.id,
		channelName: ch.name,
		videoId: pick.id,
		title: pick.title,
		live: pick.live,
		watchUrl: `https://www.youtube.com/watch?v=${pick.id}`,
		embedUrl: `https://www.youtube.com/embed/${pick.id}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`,
		asOf: Date.now()
	};
}
var getLiveTv_createServerFn_handler = createServerRpc({
	id: "26f7df86db9bb81c99e059f2d29bf23a5a2e33a49833b4b9d312123e6eb3a63c",
	name: "getLiveTv",
	filename: "src/lib/market/live-tv.ts"
}, (opts) => getLiveTv.__executeServer(opts));
var getLiveTv = createServerFn({ method: "POST" }).validator((data) => {
	const id = String(data?.channel ?? "awaaz");
	return {
		channel: TV_CHANNELS.some((c) => c.id === id) ? id : "awaaz",
		fresh: Boolean(data?.fresh)
	};
}).handler(getLiveTv_createServerFn_handler, async ({ data }) => {
	const hit = cache.get(data.channel);
	if (!data.fresh && hit && Date.now() - hit.at < 45e3) return hit.value;
	const value = await resolveStream(TV_CHANNELS.find((c) => c.id === data.channel) ?? TV_CHANNELS[0]);
	cache.set(data.channel, {
		at: Date.now(),
		value
	});
	return value;
});
//#endregion
export { getLiveTv_createServerFn_handler };
