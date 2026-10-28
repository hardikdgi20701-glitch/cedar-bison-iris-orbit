import { createServerFn } from "@tanstack/react-start";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export type TvChannelId = "awaaz" | "tv18" | "etnow" | "zee";

export type TvChannel = {
  id: TvChannelId;
  name: string;
  tagline: string;
  channelId: string;
  playlistId?: string;
  fallbackId?: string;
};

export const TV_CHANNELS: TvChannel[] = [
  {
    id: "awaaz",
    name: "CNBC Awaaz",
    tagline: "Hindi · share bazaar",
    channelId: "UCQIycDaLsBpMKjOCeaKUYVg",
    playlistId: "PLSbrpwmzi3x-94fRO5nlKTOTqzqMaDuPX",
    fallbackId: "i_1g_M0JSy4",
  },
  {
    id: "tv18",
    name: "CNBC-TV18",
    tagline: "English · markets",
    channelId: "UCmRbHAgG2k2vDUvb3xsEunQ",
  },
  {
    id: "etnow",
    name: "ET Now",
    tagline: "English · tape",
    channelId: "UCI_mwTKUhicNzFrhm33MzBQ",
  },
  {
    id: "zee",
    name: "Zee Business",
    tagline: "Hindi · markets",
    channelId: "UCkXopQ3ubd-rnXnStZqCl2w",
  },
];

export type LiveTv = {
  channelId: TvChannelId;
  channelName: string;
  videoId: string;
  title: string;
  live: boolean;
  watchUrl: string;
  embedUrl: string;
  asOf: number;
};

const cache = new Map<string, { at: number; value: LiveTv }>();

function marketTitle(title: string): boolean {
  return /nifty|sensex|stock|market|share|bazaar|trade|business|cnbc|et now|zee/i.test(title);
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`tv ${res.status}`);
  return res.text();
}

function rssVideos(xml: string): { id: string; title: string }[] {
  const blocks = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  const out: { id: string; title: string }[] = [];
  for (const block of blocks) {
    const id = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1];
    const title = (block.match(/<title>([^<]+)<\/title>/) ?? [])[1];
    if (id && title) out.push({ id, title });
  }
  return out;
}

type PlayerDetails = { title: string; live: boolean };

async function playerDetails(videoId: string): Promise<PlayerDetails | null> {
  try {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player?prettyPrint=false", {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(4000),
      body: JSON.stringify({
        context: { client: { clientName: "WEB", clientVersion: "2.20260911.01.00", hl: "en", gl: "IN" } },
        videoId,
      }),
    });
    if (!res.ok) return null;
    const raw = (await res.json()) as { videoDetails?: { title?: string; isLive?: boolean; isLiveContent?: boolean } };
    const d = raw.videoDetails;
    if (!d?.title) return null;
    return { title: d.title, live: Boolean(d.isLive) };
  } catch {
    return null;
  }
}

async function resolveStream(ch: TvChannel): Promise<LiveTv> {
  const candidates: { id: string; title: string }[] = [];
  if (ch.fallbackId) candidates.push({ id: ch.fallbackId, title: ch.name });
  try {
    if (ch.playlistId) {
      const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?playlist_id=${ch.playlistId}`);
      candidates.push(...rssVideos(xml).slice(0, 4));
    }
  } catch {
    /* skip */
  }
  try {
    const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.channelId}`);
    candidates.push(...rssVideos(xml).slice(0, 6));
  } catch {
    /* skip */
  }

  const seen = new Set<string>();
  let last: { id: string; title: string; live: boolean } | null = null;
  let liveMarket: { id: string; title: string; live: boolean } | null = null;
  let liveAny: { id: string; title: string; live: boolean } | null = null;

  for (const c of candidates) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    const det = await playerDetails(c.id);
    const title = det?.title || c.title;
    const live = Boolean(det?.live);
    const row = { id: c.id, title, live };
    if (!last) last = row;
    if (live && !liveAny) liveAny = row;
    if (live && marketTitle(title) && !liveMarket) liveMarket = row;
    if (liveMarket) break;
  }

  const pick = liveMarket ?? liveAny ?? last ?? { id: ch.fallbackId || candidates[0]?.id || "", title: ch.name, live: false };
  return {
    channelId: ch.id,
    channelName: ch.name,
    videoId: pick.id,
    title: pick.title,
    live: pick.live,
    watchUrl: `https://www.youtube.com/watch?v=${pick.id}`,
    embedUrl: `https://www.youtube.com/embed/${pick.id}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`,
    asOf: Date.now(),
  };
}

export const getLiveTv = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const id = String((data as { channel?: string })?.channel ?? "awaaz") as TvChannelId;
    const known = TV_CHANNELS.some((c) => c.id === id);
    return { channel: known ? id : ("awaaz" as const), fresh: Boolean((data as { fresh?: boolean })?.fresh) };
  })
  .handler(async ({ data }): Promise<LiveTv> => {
    const hit = cache.get(data.channel);
    if (!data.fresh && hit && Date.now() - hit.at < 45_000) return hit.value;
    const ch = TV_CHANNELS.find((c) => c.id === data.channel) ?? TV_CHANNELS[0]!;
    const value = await resolveStream(ch);
    cache.set(data.channel, { at: Date.now(), value });
    return value;
  });
