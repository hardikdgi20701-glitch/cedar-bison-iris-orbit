import type { CompanyProfile } from "./types";

function n(
  symbol: string,
  name: string,
  sector: string,
  industry: string,
  related: string[],
  extra: Partial<CompanyProfile> = {},
): CompanyProfile {
  return {
    symbol,
    name,
    sector,
    industry,
    exchange: extra.exchange ?? "NSE",
    yahoo: extra.yahoo ?? `${symbol}.NS`,
    bseYahoo: extra.bseYahoo,
    description:
      extra.description ??
      `${name} is listed on NSE/BSE. This profile is an educational snapshot for Google Finance-style tracking — not investment advice.`,
    ceo: extra.ceo,
    headquarters: extra.headquarters ?? "India",
    employees: extra.employees,
    founded: extra.founded,
    website: extra.website,
    related,
    pe: extra.pe,
    eps: extra.eps,
    bookValue: extra.bookValue,
    sharesCr: extra.sharesCr,
    quarters: extra.quarters,
  };
}

/** Additional NSE/BSE names used in Google Finance-style lists. */
export const MORE_COMPANIES: CompanyProfile[] = [
  n("ACC", "ACC Ltd", "Materials", "Cement", ["ULTRACEMCO", "AMBUJACEM", "SHREECEM"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 18,
  }),
  n("ADANIGREEN", "Adani Green Energy Ltd", "Energy", "Renewables", ["ADANIENT", "ADANIPOWER", "TATAPOWER"], {
    headquarters: "Ahmedabad, Gujarat, India",
    pe: 95,
  }),
  n("ADANIPOWER", "Adani Power Ltd", "Energy", "Power generation", ["ADANIENT", "NTPC", "TATAPOWER"], {
    headquarters: "Ahmedabad, Gujarat, India",
    pe: 16,
  }),
  n("ATGL", "Adani Total Gas Ltd", "Energy", "City gas", ["ADANIENT", "GAIL", "IGL"], {
    headquarters: "Ahmedabad, Gujarat, India",
    pe: 92,
  }),
  n("AWL", "AWL Agri Business Ltd", "FMCG", "Edible oil / foods", ["ITC", "TATACONSUM", "ADANIENT"], {
    headquarters: "Ahmedabad, Gujarat, India",
    pe: 28,
  }),
  n("UNOMINDA", "UNO Minda Ltd", "Automobile", "Auto ancillaries", ["BOSCHLTD", "MOTHERSON", "GABRIEL"], {
    headquarters: "Gurugram, Haryana, India",
    pe: 62,
  }),
  n("WAAREEENER", "Waaree Energies Ltd", "Energy", "Solar manufacturing", ["ADANIGREEN", "TATAPOWER", "SUZLON"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 38,
  }),
  n("ABB", "ABB India Ltd", "Capital goods", "Electrification / automation", ["SIEMENS", "HAVELLS", "LT"], {
    headquarters: "Bengaluru, Karnataka, India",
    pe: 78,
  }),
  n("BAJAJFINSV", "Bajaj Finserv Ltd", "Financials", "Holding / insurance / lending", ["BAJFINANCE", "HDFCBANK", "SBILIFE"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 32,
  }),
  n("BAJAJHFL", "Bajaj Housing Finance Ltd", "Financials", "Housing finance", ["BAJFINANCE", "BAJAJFINSV", "LICI"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 48,
  }),
  n("BAJAJHIND", "Bajaj Hindusthan Sugar Ltd", "Commodities", "Sugar", ["BALRAMCHIN", "EIDPARRY"], {
    headquarters: "Noida, Uttar Pradesh, India",
  }),
  n("BLUESTARCO", "Blue Star Ltd", "Consumer", "Cooling & commercial AC", ["VOLTAS", "HAVELLS", "DIXON"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 62,
  }),
  n("DIXON", "Dixon Technologies Ltd", "Consumer", "Electronics manufacturing", ["HAVELLS", "VOLTAS", "AMBER"], {
    headquarters: "Noida, Uttar Pradesh, India",
    pe: 85,
  }),
  n("GODFRYPHLP", "Godfrey Phillips India Ltd", "FMCG", "Cigarettes & retail", ["ITC", "VSTIND"], {
    headquarters: "New Delhi, India",
    pe: 28,
  }),
  n("HAVELLS", "Havells India Ltd", "Consumer", "Electricals", ["POLYCAB", "KEI", "SIEMENS"], {
    headquarters: "Noida, Uttar Pradesh, India",
    pe: 68,
  }),
  n("KEI", "KEI Industries Ltd", "Capital goods", "Cables", ["POLYCAB", "HAVELLS", "FINOLEX"], {
    headquarters: "New Delhi, India",
    pe: 48,
  }),
  n("POLYCAB", "Polycab India Ltd", "Capital goods", "Cables & FMEG", ["KEI", "HAVELLS", "SIEMENS"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 52,
  }),
  n("BANKBARODA", "Bank of Baroda", "Banking", "Public-sector bank", ["SBIN", "CANBK", "PNB"], {
    headquarters: "Vadodara, Gujarat, India",
    pe: 7,
  }),
  n("BANKINDIA", "Bank of India", "Banking", "Public-sector bank", ["SBIN", "BANKBARODA", "CANBK"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 6.5,
  }),
  n("CANBK", "Canara Bank", "Banking", "Public-sector bank", ["SBIN", "BANKBARODA", "PNB"], {
    headquarters: "Bengaluru, Karnataka, India",
    pe: 6.8,
  }),
  n("IDEA", "Vodafone Idea Ltd", "Telecom", "Wireless", ["BHARTIARTL", "RELIANCE"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("MOTILALOFS", "Motilal Oswal Financial Services", "Financials", "Broking / AMC", ["HDFCBANK", "ICICIBANK", "BAJFINANCE"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 18,
  }),
  n("SWIGGY", "Swiggy Ltd", "Consumer", "Food delivery / quick commerce", ["ZOMATO", "PAYTM"], {
    headquarters: "Bengaluru, Karnataka, India",
  }),
  n("YESBANK", "Yes Bank Ltd", "Banking", "Private bank", ["AXISBANK", "IDFCFIRSTB", "SBIN"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 22,
  }),
  n("AMBUJACEM", "Ambuja Cements Ltd", "Materials", "Cement", ["ACC", "ULTRACEMCO", "SHREECEM"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 32,
  }),
  n("APOLSINHOT", "Apollo Sindoori Hotels Ltd", "Consumer", "Hospitality", ["INDIGO", "IRCTC"], {
    headquarters: "Chennai, Tamil Nadu, India",
  }),
  n("BIRLACORPN", "Birla Corporation Ltd", "Materials", "Cement", ["ULTRACEMCO", "SHREECEM", "JKCEMENT"], {
    headquarters: "Kolkata, West Bengal, India",
    pe: 22,
  }),
  n("DALBHARAT", "Dalmia Bharat Ltd", "Materials", "Cement", ["ULTRACEMCO", "SHREECEM", "JKCEMENT"], {
    headquarters: "New Delhi, India",
    pe: 38,
  }),
  n("JKCEMENT", "J K Cement Ltd", "Materials", "Cement", ["ULTRACEMCO", "SHREECEM", "DALBHARAT"], {
    headquarters: "Kanpur, Uttar Pradesh, India",
    pe: 42,
  }),
  n("JKLAKSHMI", "JK Lakshmi Cement Ltd", "Materials", "Cement", ["JKCEMENT", "AMBUJACEM", "RAMCOCEM"], {
    headquarters: "New Delhi, India",
    pe: 24,
  }),
  n("MANGLMCEM", "Mangalam Cement Ltd", "Materials", "Cement", ["JKLAKSHMI", "NCLIND", "STARCEMENT"], {
    headquarters: "Kolkata, West Bengal, India",
  }),
  n("NCLIND", "NCL Industries Ltd", "Materials", "Cement / boards", ["MANGLMCEM", "RAMCOCEM"], {
    headquarters: "Hyderabad, Telangana, India",
  }),
  n("RAMCOCEM", "The Ramco Cements Ltd", "Materials", "Cement", ["ULTRACEMCO", "DALBHARAT", "JKCEMENT"], {
    headquarters: "Chennai, Tamil Nadu, India",
    pe: 52,
  }),
  n("SHREECEM", "Shree Cement Ltd", "Materials", "Cement", ["ULTRACEMCO", "AMBUJACEM", "DALBHARAT"], {
    headquarters: "Kolkata, West Bengal, India",
    pe: 42,
  }),
  n("STARCEMENT", "Star Cement Ltd", "Materials", "Cement", ["DALBHARAT", "MANGLMCEM", "NCLIND"], {
    headquarters: "Guwahati, Assam, India",
  }),
  n("ARE&M", "Amara Raja Energy & Mobility", "Automobile", "Batteries / energy storage", ["EXIDEIND", "M&M", "BEL"], {
    headquarters: "Tirupati, Andhra Pradesh, India",
    pe: 22,
    yahoo: "ARE&M.NS",
  }),
  n("EXIDEIND", "Exide Industries Ltd", "Automobile", "Batteries", ["ARE&M", "M&M", "HEROMOTOCO"], {
    headquarters: "Kolkata, West Bengal, India",
    pe: 28,
  }),
  n("OLAELEC", "Ola Electric Mobility Ltd", "Automobile", "Electric two-wheelers", ["M&M", "BAJAJ-AUTO", "TVSMOTOR"], {
    headquarters: "Bengaluru, Karnataka, India",
  }),
  n("COFORGE", "Coforge Ltd", "IT", "IT services", ["TCS", "HCLTECH", "LTIM"], {
    headquarters: "Noida, Uttar Pradesh, India",
    pe: 48,
  }),
  n("NETWEB", "Netweb Technologies Ltd", "IT", "Supercomputing / AI infra", ["ZENTEC", "HCLTECH", "TCS"], {
    headquarters: "Faridabad, Haryana, India",
    pe: 85,
  }),
  n("NEWGEN", "Newgen Software Technologies", "IT", "Enterprise software", ["COFORGE", "PERSISTENT", "TCS"], {
    headquarters: "New Delhi, India",
    pe: 42,
  }),
  n("QUICKHEAL", "Quick Heal Technologies Ltd", "IT", "Cybersecurity", ["NEWGEN", "HCLTECH"], {
    headquarters: "Pune, Maharashtra, India",
  }),
  n("SASKEN", "Sasken Technologies Ltd", "IT", "Product engineering", ["HCLTECH", "TECHM", "TCS"], {
    headquarters: "Bengaluru, Karnataka, India",
  }),
  n("SUZLON", "Suzlon Energy Ltd", "Energy", "Wind turbines", ["WAAREEENER", "TATAPOWER", "ADANIGREEN"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 48,
  }),
  n("TECHM", "Tech Mahindra Ltd", "IT", "IT services", ["TCS", "INFY", "HCLTECH", "WIPRO"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 28,
  }),
  n("ZENSARTECH", "Zensar Technologies Ltd", "IT", "IT services", ["WIPRO", "COFORGE", "TECHM"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 24,
  }),
  n("ZENTEC", "Zen Technologies Ltd", "Defence", "Training simulators", ["BEL", "HAL", "BDL"], {
    headquarters: "Hyderabad, Telangana, India",
    pe: 55,
  }),
  n("GALLANTT", "Gallantt Ispat Ltd", "Metals", "Steel / steel products", ["TATASTEEL", "JSWSTEEL", "SAIL"], {
    headquarters: "Gorakhpur, Uttar Pradesh, India",
  }),
  n("MTARTECH", "MTAR Technologies Ltd", "Defence", "Precision engineering", ["HAL", "BEL", "BHEL"], {
    headquarters: "Hyderabad, Telangana, India",
    pe: 72,
  }),
  n("BHEL", "Bharat Heavy Electricals Ltd", "Capital goods", "Power equipment", ["NTPC", "BHEL", "LT", "BEL"], {
    headquarters: "New Delhi, India",
    pe: 32,
  }),
  n("BPCL", "Bharat Petroleum Corporation Ltd", "Energy", "Oil refining & marketing", ["IOC", "HINDPETRO", "ONGC", "RELIANCE"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 9,
  }),
  n("GAIL", "GAIL (India) Ltd", "Energy", "Gas transmission", ["ONGC", "OIL", "ATGL", "RELIANCE"], {
    headquarters: "New Delhi, India",
    pe: 11,
  }),
  n("HINDPETRO", "Hindustan Petroleum Corporation", "Energy", "Oil refining & marketing", ["IOC", "BPCL", "ONGC"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 8,
  }),
  n("IOC", "Indian Oil Corporation Ltd", "Energy", "Oil refining & marketing", ["BPCL", "HINDPETRO", "ONGC", "RELIANCE"], {
    headquarters: "New Delhi, India",
    pe: 8.5,
  }),
  n("IRFC", "Indian Railway Finance Corporation", "Financials", "NBFC / railways", ["IRCTC", "RVNL", "SBIN"], {
    headquarters: "New Delhi, India",
    pe: 24,
  }),
  n("OIL", "Oil India Ltd", "Energy", "Upstream oil & gas", ["ONGC", "GAIL", "RELIANCE"], {
    headquarters: "Duliajan, Assam, India",
    pe: 9,
  }),
  n("SAIL", "Steel Authority of India Ltd", "Metals", "Steel", ["TATASTEEL", "JSWSTEEL", "NMDC"], {
    headquarters: "New Delhi, India",
    pe: 14,
  }),
  n("JIOFIN", "Jio Financial Services Ltd", "Financials", "NBFC / payments", ["RELIANCE", "HDFCBANK", "BAJFINANCE"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 95,
  }),
  n("RCOM", "Reliance Communications Ltd", "Telecom", "Telecom", ["RELIANCE", "BHARTIARTL", "IDEA"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("RELINFRA", "Reliance Infrastructure Ltd", "Infrastructure", "Power / infra", ["RELIANCE", "RPOWER", "NTPC"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("RHFL", "Reliance Home Finance Ltd", "Financials", "Housing finance", ["RELIANCE", "JIOFIN", "LICI"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("RPOWER", "Reliance Power Ltd", "Energy", "Power generation", ["RELIANCE", "RELINFRA", "NTPC"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("HCC", "Hindustan Construction Company", "Infrastructure", "Construction", ["LT", "NCC", "IRB"], {
    headquarters: "Mumbai, Maharashtra, India",
  }),
  n("TATACONSUM", "Tata Consumer Products Ltd", "FMCG", "Foods & beverages", ["HINDUNILVR", "ITC", "NESTLEIND", "TCS"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 62,
  }),
  n("TATATECH", "Tata Technologies Ltd", "IT", "Engineering / ER&D", ["TCS", "TATAMOTORS", "INFY"], {
    headquarters: "Pune, Maharashtra, India",
    pe: 42,
  }),
  n("SPICEJET", "SpiceJet Ltd", "Aviation", "Airline", ["INDIGO", "IRCTC"], {
    headquarters: "Gurugram, Haryana, India",
  }),
  n("HEROMOTOCO", "Hero MotoCorp Ltd", "Automobile", "Two-wheelers", ["BAJAJ-AUTO", "EICHERMOT", "TVSMOTOR"], {
    headquarters: "New Delhi, India",
    pe: 22,
  }),
  n("INDIGO", "InterGlobe Aviation Ltd", "Aviation", "Airline", ["SPICEJET", "IRCTC"], {
    headquarters: "Gurugram, Haryana, India",
    pe: 28,
  }),
  n("IRCTC", "Indian Railway Catering & Tourism", "Consumer", "Rail catering / tourism", ["IRFC", "RVNL", "INDIGO"], {
    headquarters: "New Delhi, India",
    pe: 48,
  }),
  n("RVNL", "Rail Vikas Nigam Ltd", "Infrastructure", "Rail construction", ["IRFC", "IRCTC", "LT"], {
    headquarters: "New Delhi, India",
    pe: 32,
  }),
  n("VBL", "Varun Beverages Ltd", "FMCG", "Beverages", ["TATACONSUM", "HINDUNILVR", "ITC"], {
    headquarters: "Gurugram, Haryana, India",
    pe: 72,
  }),
  n("DIAMONDYD", "Prataap Snacks Ltd", "FMCG", "Packaged snacks", ["ITC", "TATACONSUM", "NESTLEIND"], {
    headquarters: "Indore, Madhya Pradesh, India",
  }),
  n("DOMS", "Doms Industries Ltd", "Consumer", "Stationery", ["ITC", "TITAN"], {
    headquarters: "Umbergaon, Gujarat, India",
    pe: 68,
  }),
  n("MEDANTA", "Global Health Ltd", "Pharma", "Hospitals", ["APOLLOHOSP", "FORTIS", "MAXHEALTH"], {
    headquarters: "Gurugram, Haryana, India",
    pe: 58,
  }),
  n("PAYTM", "One 97 Communications Ltd", "Financials", "Fintech / payments", ["JIOFIN", "SWIGGY", "HDFCBANK"], {
    headquarters: "Noida, Uttar Pradesh, India",
  }),
  n("PVRINOX", "PVR INOX Ltd", "Consumer", "Cinemas", ["TRENT", "DMART"], {
    headquarters: "Gurugram, Haryana, India",
  }),
  n("SHAHALLOYS", "Shah Alloys Ltd", "Metals", "Stainless steel", ["TATASTEEL", "JSWSTEEL", "SAIL"], {
    headquarters: "Ahmedabad, Gujarat, India",
  }),
  n("SIEMENS", "Siemens Ltd", "Capital goods", "Electrification / automation", ["ABB", "HAVELLS", "LT"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 72,
  }),
  n("VADILALIND", "Vadilal Industries Ltd", "FMCG", "Ice cream", ["TATACONSUM", "NESTLEIND", "VBL"], {
    headquarters: "Ahmedabad, Gujarat, India",
  }),
  n("VOLTAS", "Voltas Ltd", "Consumer", "AC & engineering", ["BLUESTARCO", "HAVELLS", "DIXON"], {
    headquarters: "Mumbai, Maharashtra, India",
    pe: 58,
  }),
  n("NIFTY_FIN_SERVICE", "Nifty Financial Services", "Index", "Sector index", ["HDFCBANK", "ICICIBANK", "SBIN"], {
    exchange: "INDEX",
    yahoo: "NIFTY_FIN_SERVICE.NS",
    description: "Nifty Financial Services is the NSE sector index covering banks, NBFCs and insurers.",
  }),
];
