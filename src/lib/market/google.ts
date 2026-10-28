/** Google Finance / Google Search URL helpers for live follow-through. */

const INDEX_MAP: Record<string, string> = {
  "^NSEI": "NIFTY_50:INDEXNSE",
  "^BSESN": "SENSEX:INDEXBOM",
  "^NSEBANK": "NIFTY_BANK:INDEXNSE",
  "^CNXIT": "NIFTY_IT:INDEXNSE",
  "^CNXAUTO": "NIFTY_AUTO:INDEXNSE",
  "^CNXENERGY": "NIFTY_ENERGY:INDEXNSE",
  "^CNXFMCG": "NIFTY_FMCG:INDEXNSE",
  "^CNXINFRA": "NIFTY_INFRA:INDEXNSE",
  "^CNXMEDIA": "NIFTY_MEDIA:INDEXNSE",
  "^CNXMETAL": "NIFTY_METAL:INDEXNSE",
  "^CNXPHARMA": "NIFTY_PHARMA:INDEXNSE",
  "^CNXREALTY": "NIFTY_REALTY:INDEXNSE",
  "^CNXSERVICE": "NIFTY_SERV_SECTOR:INDEXNSE",
  "^CRSLDX": "NIFTY_500:INDEXNSE",
  "NIFTY_FIN_SERVICE.NS": "NIFTY_FIN_SERVICE:INDEXNSE",
  "^GSPC": ".INX:INDEXSP",
  "^DJI": ".DJI:INDEXDJX",
  "^IXIC": ".IXIC:INDEXNASDAQ",
  "^N225": "NI225:INDEXNIKKEI",
  "^FTSE": "UKX:INDEXFTSE",
  "^GDAXI": "DAX:INDEXDB",
  "^FCHI": "CAC:INDEXEURO",
  "^INDIAVIX": "INDIA_VIX:INDEXNSE",
  AIA: "AIA:NYSEARCA",
};

export function googleFinanceQuoteUrl(yahoo: string): string {
  const mapped = INDEX_MAP[yahoo];
  if (mapped) return `https://www.google.com/finance/quote/${mapped}`;
  if (yahoo.endsWith(".NS")) {
    return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.slice(0, -3))}:NSE`;
  }
  if (yahoo.endsWith(".BO")) {
    return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.slice(0, -3))}:BOM`;
  }
  if (yahoo.endsWith("-USD")) {
    return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo)}`;
  }
  if (yahoo.endsWith("=X")) {
    return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.replace("=X", ""))}`;
  }
  const ticker = yahoo.replace(/^\^/, "");
  return `https://www.google.com/finance/quote/${encodeURIComponent(ticker)}`;
}

export function googleFinanceSearchUrl(q: string): string {
  return `https://www.google.com/finance/search?q=${encodeURIComponent(q)}`;
}

export function googleSearchUrl(q: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function googleNewsUrl(q: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}&tbm=nws&hl=en-IN&gl=IN`;
}

export function displayTicker(yahoo: string): string {
  if (yahoo === "^NSEI") return "NIFTY 50";
  if (yahoo === "^BSESN") return "SENSEX";
  if (yahoo === "^NSEBANK") return "NIFTY_BANK";
  if (yahoo === "^CNXIT") return "NIFTY_IT";
  if (yahoo === "^CNXAUTO") return "NIFTY_AUTO";
  if (yahoo === "^CNXENERGY") return "NIFTY_ENERGY";
  if (yahoo === "^CNXFMCG") return "NIFTY_FMCG";
  if (yahoo === "^CNXINFRA") return "NIFTY_INFRA";
  if (yahoo === "^CNXMEDIA") return "NIFTY_MEDIA";
  if (yahoo === "^CNXMETAL") return "NIFTY_METAL";
  if (yahoo === "^CNXPHARMA") return "NIFTY_PHARMA";
  if (yahoo === "^CNXREALTY") return "NIFTY_REALTY";
  if (yahoo === "^CNXSERVICE") return "NIFTY_SERV_SECTOR";
  if (yahoo === "^CRSLDX") return "NIFTY_500";
  if (yahoo === "NIFTY_FIN_SERVICE.NS") return "NIFTY_FIN_SERVICE";
  if (yahoo === "^GSPC") return ".INX";
  if (yahoo === "^DJI") return ".DJI";
  if (yahoo === "^IXIC") return ".IXIC";
  if (yahoo === "^N225") return "NI225";
  if (yahoo === "AIA") return "SPASIA50";
  return yahoo.replace(/\.NS$|\.BO$/, "").replace(/^\^/, "");
}
