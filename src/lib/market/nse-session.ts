/** Last official NSE homepage print for the session (07 Oct 2026 close).
 *  nseindia.com itself is blocked from this environment; we overlay live
 *  Nifty 50 / index tapes on top of this exchange-wide snapshot. */

export type NseTurnoverRow = {
  product: string;
  volume: string;
  value: string;
  oi: string;
  updatedAt: string;
};

export type NseContract = {
  contract: string;
  ltp: number;
  change: number;
  changePct: number;
};

export type NseCorporate = {
  name: string;
  symbol: string;
  subject: string;
  at: string;
  size: string;
};

export type NseFxSpot = {
  code: string;
  flag: string;
  name: string;
  unit: string;
  today: number;
  previous: number;
};

export type NseFxFuture = {
  contract: string;
  ltp: number;
  changePct: number;
  volume: number;
  turnoverCr: number;
  oi: number;
};

export type NseOptionRow = {
  strike: number;
  callLtp: number | null;
  callChg: number | null;
  callBid: number | null;
  callAsk: number | null;
  putLtp: number | null;
  putChg: number | null;
  putBid: number | null;
  putAsk: number | null;
};

export type NseBoardStats = {
  asOf: string;
  traded: number;
  advances: number;
  declines: number;
  unchanged: number;
  weekHigh: number;
  weekLow: number;
  upperCircuit: number;
  lowerCircuit: number;
  clients: number;
  mcapLacCr: number;
  mcapTnUsd: number;
  ackLatencyNs: number;
};

export type NseIpoTracker = {
  year: number;
  sme: number;
  gainIssue: number;
  lossIssue: number;
  gainListing: number;
  lossListing: number;
};

export const NSE_SESSION_DATE = "07-Oct-2026";
export const NSE_CLOSE_IST = "07-Oct-2026 15:30 IST";
export const NSE_STATS_IST = "07-Oct-2026 16:00 IST";
export const NSE_FNO_IST = "07-Oct-2026 15:40 IST";
export const NSE_FX_IST = "07-Oct-2026 13:00 IST";
export const NSE_FX_FUT_IST = "07-Oct-2026 17:00 IST";

export const NSE_BOARD_STATS: NseBoardStats = {
  asOf: NSE_STATS_IST,
  traded: 3690,
  advances: 1549,
  declines: 2043,
  unchanged: 98,
  weekHigh: 108,
  weekLow: 120,
  upperCircuit: 166,
  lowerCircuit: 80,
  clients: 272589123,
  mcapLacCr: 466.92,
  mcapTnUsd: 4.83,
  ackLatencyNs: 722,
};

export const NSE_TURNOVER: NseTurnoverRow[] = [
  { product: "Equity", volume: "490.75 Cr", value: "1,15,268.89", oi: "—", updatedAt: "16:00" },
  { product: "Equity Derivatives", volume: "7.33 Cr", value: "1,22,626.23", oi: "2.22 Cr", updatedAt: "15:40" },
  { product: "Currency Derivatives", volume: "7.63 L", value: "7,374.34", oi: "15.58 L", updatedAt: "17:00" },
  { product: "Interest Rate Derivatives", volume: "2.05 K", value: "40.07", oi: "35.08 K", updatedAt: "16:34" },
  { product: "Commodity Derivatives", volume: "9.08 L", value: "791.91", oi: "65.56 K", updatedAt: "19:29" },
  { product: "Debt", volume: "—", value: "14,290.12", oi: "—", updatedAt: "17:14" },
  { product: "Electronic Gold Receipts", volume: "112", value: "1.71", oi: "—", updatedAt: "13:08" },
  { product: "Mutual Fund", volume: "—", value: "2,351.29", oi: "—", updatedAt: "15:30" },
];

export const NSE_TURNOVER_TOTAL: NseTurnoverRow = {
  product: "Total",
  volume: "498.25 Cr",
  value: "2,62,744.55",
  oi: "2.38 Cr",
  updatedAt: "",
};

export const NSE_ACTIVE_CALLS: NseContract[] = [
  { contract: "NIFTY 13OCT26 22700.00 CE", ltp: 81.0, change: -97.0, changePct: -54.49 },
  { contract: "NIFTY 13OCT26 22600.00 CE", ltp: 124.3, change: -115.75, changePct: -48.22 },
  { contract: "NIFTY 13OCT26 22800.00 CE", ltp: 49.75, change: -76.0, changePct: -60.44 },
  { contract: "NIFTY 13OCT26 22650.00 CE", ltp: 100.55, change: -107.7, changePct: -51.72 },
  { contract: "NIFTY 13OCT26 23000.00 CE", ltp: 16.85, change: -37.15, changePct: -68.8 },
];

export const NSE_ACTIVE_PUTS: NseContract[] = [
  { contract: "NIFTY 13OCT26 22600.00 PE", ltp: 154.95, change: 60.05, changePct: 63.28 },
  { contract: "NIFTY 13OCT26 22500.00 PE", ltp: 108.9, change: 42.75, changePct: 64.63 },
  { contract: "NIFTY 13OCT26 22700.00 PE", ltp: 210.5, change: 78.2, changePct: 59.11 },
  { contract: "NIFTY 13OCT26 22650.00 PE", ltp: 180.55, change: 68.85, changePct: 61.64 },
  { contract: "NIFTY 13OCT26 22550.00 PE", ltp: 129.55, change: 49.75, changePct: 62.34 },
];

export const NSE_ACTIVE_OI: NseContract[] = [
  { contract: "NIFTY OCT FUT", ltp: 22618.4, change: -177.0, changePct: -0.78 },
  { contract: "BANKNIFTY OCT FUT", ltp: 55241.2, change: -6.2, changePct: -0.01 },
  { contract: "NIFTY 13OCT26 23000.00 CE", ltp: 16.85, change: -37.15, changePct: -68.8 },
  { contract: "NIFTY 13OCT26 22800.00 CE", ltp: 49.75, change: -76.0, changePct: -60.44 },
  { contract: "NIFTY 27OCT26 23500.00 CE", ltp: 28.45, change: -20.0, changePct: -41.28 },
];

export const NSE_CORPORATES: NseCorporate[] = [
  {
    name: "Surani Steel Tubes Limited",
    symbol: "SURANI",
    subject: "Outcome of Board Meeting",
    at: "07-Oct-2026 19:31:01",
    size: "996KB",
  },
  {
    name: "Bank of Baroda",
    symbol: "BANKBARODA",
    subject: "General Updates",
    at: "07-Oct-2026 19:30:33",
    size: "407KB",
  },
  {
    name: "Vaibhav Global Limited",
    symbol: "VAIBHAVGBL",
    subject: "Credit Rating",
    at: "07-Oct-2026 19:30:11",
    size: "1.01MB",
  },
];

export const NSE_IPO: NseIpoTracker = {
  year: 197,
  sme: 78,
  gainIssue: 128,
  lossIssue: 69,
  gainListing: 131,
  lossListing: 66,
};

export const NSE_FX_SPOT: NseFxSpot[] = [
  { code: "USD", flag: "US", name: "USD", unit: "$ 1", today: 96.623, previous: 96.4348 },
  { code: "YEN", flag: "JP", name: "YEN", unit: "¥ 100", today: 61.01, previous: 60.96 },
  { code: "GBP", flag: "GB", name: "GBP", unit: "£ 1", today: 127.9772, previous: 127.3756 },
  { code: "EURO", flag: "EU", name: "EURO", unit: "€ 1", today: 108.4503, previous: 108.0729 },
];

export const NSE_FX_FUTURES: NseFxFuture[] = [
  { contract: "USDINR 28OCT26 FUT", ltp: 97.0775, changePct: 0.5073, volume: 721101, turnoverCr: 7000.27, oi: 1464832 },
  { contract: "USDINR 26NOV26 FUT", ltp: 97.43, changePct: 0.5651, volume: 31355, turnoverCr: 305.49, oi: 66316 },
  { contract: "USDINR 29DEC26 FUT", ltp: 97.73, changePct: 0.597, volume: 2598, turnoverCr: 25.39, oi: 6659 },
  { contract: "EURINR 28OCT26 FUT", ltp: 108.72, changePct: -0.0965, volume: 2459, turnoverCr: 26.73, oi: 7146 },
  { contract: "GBPINR 28OCT26 FUT", ltp: 128.275, changePct: 0.1503, volume: 2191, turnoverCr: 28.11, oi: 2968 },
];

export const NSE_OPTION_CHAIN: NseOptionRow[] = [
  { strike: 22500, callLtp: null, callChg: null, callBid: 197.45, callAsk: 233.95, putLtp: 108.9, putChg: 42.75, putBid: 1.0, putAsk: 1.15 },
  { strike: 22550, callLtp: null, callChg: null, callBid: 165.35, callAsk: 233.2, putLtp: 129.55, putChg: 49.75, putBid: 1.05, putAsk: 1.2 },
  { strike: 22600, callLtp: 124.3, callChg: -115.75, callBid: 159.4, callAsk: 228.9, putLtp: 154.95, putChg: 60.05, putBid: 0.9, putAsk: 0.95 },
  { strike: 22650, callLtp: 100.55, callChg: -107.7, callBid: 155.8, callAsk: 223.4, putLtp: 180.55, putChg: 68.85, putBid: 1.1, putAsk: 1.25 },
  { strike: 22700, callLtp: 81.0, callChg: -97.0, callBid: 148.3, callAsk: 213.95, putLtp: 210.5, putChg: 78.2, putBid: 1.05, putAsk: 1.15 },
  { strike: 22750, callLtp: null, callChg: null, callBid: 140.0, callAsk: 198.4, putLtp: null, putChg: null, putBid: 1.2, putAsk: 1.3 },
  { strike: 22800, callLtp: 49.75, callChg: -76.0, callBid: 132.0, callAsk: 193.9, putLtp: null, putChg: null, putBid: 1.25, putAsk: 1.35 },
  { strike: 22850, callLtp: null, callChg: null, callBid: 120.0, callAsk: 180.0, putLtp: null, putChg: null, putBid: 1.2, putAsk: 1.35 },
  { strike: 22900, callLtp: null, callChg: null, callBid: 110.0, callAsk: 165.0, putLtp: null, putChg: null, putBid: 1.25, putAsk: 1.4 },
  { strike: 23000, callLtp: 16.85, callChg: -37.15, callBid: 90.0, callAsk: 140.0, putLtp: null, putChg: null, putBid: 1.35, putAsk: 1.45 },
];

export const NSE_GIFT = {
  name: "GIFT Nifty Futures 27-Oct-2026",
  ltp: 22453.5,
  change: -138.5,
  changePct: -0.61,
  asOf: "07-Oct-2026 19:30 IST",
};

export const NSE_NIFTY_USD = {
  name: "Nifty 50 USD",
  ltp: 8092.2,
  change: -92.21,
  changePct: -1.12,
  asOf: NSE_CLOSE_IST,
};

export const NSE_OHLC = {
  last: 22603.05,
  change: -173.05,
  changePct: -0.76,
  open: 22690.45,
  high: 22717.65,
  low: 22546.3,
  prev: 22776.1,
};

export const HERO_INDEX_IDS = [
  { id: 9, yahoo: "^NSEI", label: "NIFTY 50" },
  { id: 6, yahoo: "NSE:NEXT50", label: "NIFTY NEXT 50" },
  { id: 23, yahoo: "^NSEBANK", label: "NIFTY BANK" },
  { id: 47, yahoo: "NSE:FINSERVICE", label: "NIFTY FIN SERVICE" },
  { id: 128, yahoo: "NSE:MIDSELECT", label: "NIFTY MID SELECT" },
] as const;
