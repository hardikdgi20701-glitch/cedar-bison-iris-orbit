export type QuoteRange = "1d" | "5d" | "1mo" | "6mo" | "ytd" | "1y" | "5y" | "max";

export type MarketQuote = {
  symbol: string;
  name: string;
  shortName: string;
  exchange: string;
  currency: string;
  price: number;
  previousClose: number;
  change: number;
  changePct: number;
  dayHigh: number | null;
  dayLow: number | null;
  volume: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  spark: number[];
  marketState: "open" | "closed" | "unknown";
  asOf: number;
  source: "live" | "cached" | "simulated";
};

export type ChartPoint = {
  t: number;
  close: number;
  open?: number;
  high?: number;
  low?: number;
  volume: number | null;
};

export type ChartSeries = {
  symbol: string;
  range: QuoteRange;
  previousClose: number;
  currency: string;
  points: ChartPoint[];
};

export type NewsItem = {
  title: string;
  source: string;
  url: string;
  published: string;
};

export type QuarterResult = {
  period: string;
  label: string;
  revenueCr: number | null;
  patCr: number | null;
  eps: number | null;
  yoyRevenue: number | null;
  yoyPat: number | null;
  note?: string;
};

export type CompanyProfile = {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  exchange: "NSE" | "BSE" | "INDEX" | "FX" | "CRYPTO" | "US" | "EU";
  yahoo: string;
  bseYahoo?: string;
  description: string;
  ceo?: string;
  headquarters?: string;
  employees?: string;
  founded?: string;
  website?: string;
  related: string[];
  pe?: number;
  eps?: number;
  bookValue?: number;
  sharesCr?: number;
  quarters?: QuarterResult[];
};

export type QuoteBundle = {
  quote: MarketQuote;
  chart: ChartSeries;
  profile: CompanyProfile | null;
  news: NewsItem[];
  analysis: string[];
  stats: {
    open: number | null;
    avgVolume: number | null;
    marketCap: number | null;
    pe: number | null;
    eps: number | null;
    employees: string | null;
    return1m: number | null;
    return1y: number | null;
    vs52wHigh: number | null;
  };
  delayed: boolean;
};
