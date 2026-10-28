//#region node_modules/.nitro/vite/services/ssr/assets/universe-C6G9ps6z.js
/** Google Finance / Google Search URL helpers for live follow-through. */
var INDEX_MAP = {
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
	AIA: "AIA:NYSEARCA"
};
function googleFinanceQuoteUrl(yahoo) {
	const mapped = INDEX_MAP[yahoo];
	if (mapped) return `https://www.google.com/finance/quote/${mapped}`;
	if (yahoo.endsWith(".NS")) return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.slice(0, -3))}:NSE`;
	if (yahoo.endsWith(".BO")) return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.slice(0, -3))}:BOM`;
	if (yahoo.endsWith("-USD")) return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo)}`;
	if (yahoo.endsWith("=X")) return `https://www.google.com/finance/quote/${encodeURIComponent(yahoo.replace("=X", ""))}`;
	const ticker = yahoo.replace(/^\^/, "");
	return `https://www.google.com/finance/quote/${encodeURIComponent(ticker)}`;
}
function googleFinanceSearchUrl(q) {
	return `https://www.google.com/finance/search?q=${encodeURIComponent(q)}`;
}
function googleSearchUrl(q) {
	return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
function googleNewsUrl(q) {
	return `https://www.google.com/search?q=${encodeURIComponent(q)}&tbm=nws&hl=en-IN&gl=IN`;
}
function displayTicker(yahoo) {
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
function n(symbol, name, sector, industry, related, extra = {}) {
	return {
		symbol,
		name,
		sector,
		industry,
		exchange: extra.exchange ?? "NSE",
		yahoo: extra.yahoo ?? `${symbol}.NS`,
		bseYahoo: extra.bseYahoo,
		description: extra.description ?? `${name} is listed on NSE/BSE. This profile is an educational snapshot for Google Finance-style tracking — not investment advice.`,
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
		quarters: extra.quarters
	};
}
/** Additional NSE/BSE names used in Google Finance-style lists. */
var MORE_COMPANIES = [
	n("ACC", "ACC Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"AMBUJACEM",
		"SHREECEM"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 18
	}),
	n("ADANIGREEN", "Adani Green Energy Ltd", "Energy", "Renewables", [
		"ADANIENT",
		"ADANIPOWER",
		"TATAPOWER"
	], {
		headquarters: "Ahmedabad, Gujarat, India",
		pe: 95
	}),
	n("ADANIPOWER", "Adani Power Ltd", "Energy", "Power generation", [
		"ADANIENT",
		"NTPC",
		"TATAPOWER"
	], {
		headquarters: "Ahmedabad, Gujarat, India",
		pe: 16
	}),
	n("ATGL", "Adani Total Gas Ltd", "Energy", "City gas", [
		"ADANIENT",
		"GAIL",
		"IGL"
	], {
		headquarters: "Ahmedabad, Gujarat, India",
		pe: 92
	}),
	n("AWL", "AWL Agri Business Ltd", "FMCG", "Edible oil / foods", [
		"ITC",
		"TATACONSUM",
		"ADANIENT"
	], {
		headquarters: "Ahmedabad, Gujarat, India",
		pe: 28
	}),
	n("UNOMINDA", "UNO Minda Ltd", "Automobile", "Auto ancillaries", [
		"BOSCHLTD",
		"MOTHERSON",
		"GABRIEL"
	], {
		headquarters: "Gurugram, Haryana, India",
		pe: 62
	}),
	n("WAAREEENER", "Waaree Energies Ltd", "Energy", "Solar manufacturing", [
		"ADANIGREEN",
		"TATAPOWER",
		"SUZLON"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 38
	}),
	n("ABB", "ABB India Ltd", "Capital goods", "Electrification / automation", [
		"SIEMENS",
		"HAVELLS",
		"LT"
	], {
		headquarters: "Bengaluru, Karnataka, India",
		pe: 78
	}),
	n("BAJAJFINSV", "Bajaj Finserv Ltd", "Financials", "Holding / insurance / lending", [
		"BAJFINANCE",
		"HDFCBANK",
		"SBILIFE"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 32
	}),
	n("BAJAJHFL", "Bajaj Housing Finance Ltd", "Financials", "Housing finance", [
		"BAJFINANCE",
		"BAJAJFINSV",
		"LICI"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 48
	}),
	n("BAJAJHIND", "Bajaj Hindusthan Sugar Ltd", "Commodities", "Sugar", ["BALRAMCHIN", "EIDPARRY"], { headquarters: "Noida, Uttar Pradesh, India" }),
	n("BLUESTARCO", "Blue Star Ltd", "Consumer", "Cooling & commercial AC", [
		"VOLTAS",
		"HAVELLS",
		"DIXON"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 62
	}),
	n("DIXON", "Dixon Technologies Ltd", "Consumer", "Electronics manufacturing", [
		"HAVELLS",
		"VOLTAS",
		"AMBER"
	], {
		headquarters: "Noida, Uttar Pradesh, India",
		pe: 85
	}),
	n("GODFRYPHLP", "Godfrey Phillips India Ltd", "FMCG", "Cigarettes & retail", ["ITC", "VSTIND"], {
		headquarters: "New Delhi, India",
		pe: 28
	}),
	n("HAVELLS", "Havells India Ltd", "Consumer", "Electricals", [
		"POLYCAB",
		"KEI",
		"SIEMENS"
	], {
		headquarters: "Noida, Uttar Pradesh, India",
		pe: 68
	}),
	n("KEI", "KEI Industries Ltd", "Capital goods", "Cables", [
		"POLYCAB",
		"HAVELLS",
		"FINOLEX"
	], {
		headquarters: "New Delhi, India",
		pe: 48
	}),
	n("POLYCAB", "Polycab India Ltd", "Capital goods", "Cables & FMEG", [
		"KEI",
		"HAVELLS",
		"SIEMENS"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 52
	}),
	n("BANKBARODA", "Bank of Baroda", "Banking", "Public-sector bank", [
		"SBIN",
		"CANBK",
		"PNB"
	], {
		headquarters: "Vadodara, Gujarat, India",
		pe: 7
	}),
	n("BANKINDIA", "Bank of India", "Banking", "Public-sector bank", [
		"SBIN",
		"BANKBARODA",
		"CANBK"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 6.5
	}),
	n("CANBK", "Canara Bank", "Banking", "Public-sector bank", [
		"SBIN",
		"BANKBARODA",
		"PNB"
	], {
		headquarters: "Bengaluru, Karnataka, India",
		pe: 6.8
	}),
	n("IDEA", "Vodafone Idea Ltd", "Telecom", "Wireless", ["BHARTIARTL", "RELIANCE"], { headquarters: "Mumbai, Maharashtra, India" }),
	n("MOTILALOFS", "Motilal Oswal Financial Services", "Financials", "Broking / AMC", [
		"HDFCBANK",
		"ICICIBANK",
		"BAJFINANCE"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 18
	}),
	n("SWIGGY", "Swiggy Ltd", "Consumer", "Food delivery / quick commerce", ["ZOMATO", "PAYTM"], { headquarters: "Bengaluru, Karnataka, India" }),
	n("YESBANK", "Yes Bank Ltd", "Banking", "Private bank", [
		"AXISBANK",
		"IDFCFIRSTB",
		"SBIN"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 22
	}),
	n("AMBUJACEM", "Ambuja Cements Ltd", "Materials", "Cement", [
		"ACC",
		"ULTRACEMCO",
		"SHREECEM"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 32
	}),
	n("APOLSINHOT", "Apollo Sindoori Hotels Ltd", "Consumer", "Hospitality", ["INDIGO", "IRCTC"], { headquarters: "Chennai, Tamil Nadu, India" }),
	n("BIRLACORPN", "Birla Corporation Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"SHREECEM",
		"JKCEMENT"
	], {
		headquarters: "Kolkata, West Bengal, India",
		pe: 22
	}),
	n("DALBHARAT", "Dalmia Bharat Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"SHREECEM",
		"JKCEMENT"
	], {
		headquarters: "New Delhi, India",
		pe: 38
	}),
	n("JKCEMENT", "J K Cement Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"SHREECEM",
		"DALBHARAT"
	], {
		headquarters: "Kanpur, Uttar Pradesh, India",
		pe: 42
	}),
	n("JKLAKSHMI", "JK Lakshmi Cement Ltd", "Materials", "Cement", [
		"JKCEMENT",
		"AMBUJACEM",
		"RAMCOCEM"
	], {
		headquarters: "New Delhi, India",
		pe: 24
	}),
	n("MANGLMCEM", "Mangalam Cement Ltd", "Materials", "Cement", [
		"JKLAKSHMI",
		"NCLIND",
		"STARCEMENT"
	], { headquarters: "Kolkata, West Bengal, India" }),
	n("NCLIND", "NCL Industries Ltd", "Materials", "Cement / boards", ["MANGLMCEM", "RAMCOCEM"], { headquarters: "Hyderabad, Telangana, India" }),
	n("RAMCOCEM", "The Ramco Cements Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"DALBHARAT",
		"JKCEMENT"
	], {
		headquarters: "Chennai, Tamil Nadu, India",
		pe: 52
	}),
	n("SHREECEM", "Shree Cement Ltd", "Materials", "Cement", [
		"ULTRACEMCO",
		"AMBUJACEM",
		"DALBHARAT"
	], {
		headquarters: "Kolkata, West Bengal, India",
		pe: 42
	}),
	n("STARCEMENT", "Star Cement Ltd", "Materials", "Cement", [
		"DALBHARAT",
		"MANGLMCEM",
		"NCLIND"
	], { headquarters: "Guwahati, Assam, India" }),
	n("ARE&M", "Amara Raja Energy & Mobility", "Automobile", "Batteries / energy storage", [
		"EXIDEIND",
		"M&M",
		"BEL"
	], {
		headquarters: "Tirupati, Andhra Pradesh, India",
		pe: 22,
		yahoo: "ARE&M.NS"
	}),
	n("EXIDEIND", "Exide Industries Ltd", "Automobile", "Batteries", [
		"ARE&M",
		"M&M",
		"HEROMOTOCO"
	], {
		headquarters: "Kolkata, West Bengal, India",
		pe: 28
	}),
	n("OLAELEC", "Ola Electric Mobility Ltd", "Automobile", "Electric two-wheelers", [
		"M&M",
		"BAJAJ-AUTO",
		"TVSMOTOR"
	], { headquarters: "Bengaluru, Karnataka, India" }),
	n("COFORGE", "Coforge Ltd", "IT", "IT services", [
		"TCS",
		"HCLTECH",
		"LTIM"
	], {
		headquarters: "Noida, Uttar Pradesh, India",
		pe: 48
	}),
	n("NETWEB", "Netweb Technologies Ltd", "IT", "Supercomputing / AI infra", [
		"ZENTEC",
		"HCLTECH",
		"TCS"
	], {
		headquarters: "Faridabad, Haryana, India",
		pe: 85
	}),
	n("NEWGEN", "Newgen Software Technologies", "IT", "Enterprise software", [
		"COFORGE",
		"PERSISTENT",
		"TCS"
	], {
		headquarters: "New Delhi, India",
		pe: 42
	}),
	n("QUICKHEAL", "Quick Heal Technologies Ltd", "IT", "Cybersecurity", ["NEWGEN", "HCLTECH"], { headquarters: "Pune, Maharashtra, India" }),
	n("SASKEN", "Sasken Technologies Ltd", "IT", "Product engineering", [
		"HCLTECH",
		"TECHM",
		"TCS"
	], { headquarters: "Bengaluru, Karnataka, India" }),
	n("SUZLON", "Suzlon Energy Ltd", "Energy", "Wind turbines", [
		"WAAREEENER",
		"TATAPOWER",
		"ADANIGREEN"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 48
	}),
	n("TECHM", "Tech Mahindra Ltd", "IT", "IT services", [
		"TCS",
		"INFY",
		"HCLTECH",
		"WIPRO"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 28
	}),
	n("ZENSARTECH", "Zensar Technologies Ltd", "IT", "IT services", [
		"WIPRO",
		"COFORGE",
		"TECHM"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 24
	}),
	n("ZENTEC", "Zen Technologies Ltd", "Defence", "Training simulators", [
		"BEL",
		"HAL",
		"BDL"
	], {
		headquarters: "Hyderabad, Telangana, India",
		pe: 55
	}),
	n("GALLANTT", "Gallantt Ispat Ltd", "Metals", "Steel / steel products", [
		"TATASTEEL",
		"JSWSTEEL",
		"SAIL"
	], { headquarters: "Gorakhpur, Uttar Pradesh, India" }),
	n("MTARTECH", "MTAR Technologies Ltd", "Defence", "Precision engineering", [
		"HAL",
		"BEL",
		"BHEL"
	], {
		headquarters: "Hyderabad, Telangana, India",
		pe: 72
	}),
	n("BHEL", "Bharat Heavy Electricals Ltd", "Capital goods", "Power equipment", [
		"NTPC",
		"BHEL",
		"LT",
		"BEL"
	], {
		headquarters: "New Delhi, India",
		pe: 32
	}),
	n("BPCL", "Bharat Petroleum Corporation Ltd", "Energy", "Oil refining & marketing", [
		"IOC",
		"HINDPETRO",
		"ONGC",
		"RELIANCE"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 9
	}),
	n("GAIL", "GAIL (India) Ltd", "Energy", "Gas transmission", [
		"ONGC",
		"OIL",
		"ATGL",
		"RELIANCE"
	], {
		headquarters: "New Delhi, India",
		pe: 11
	}),
	n("HINDPETRO", "Hindustan Petroleum Corporation", "Energy", "Oil refining & marketing", [
		"IOC",
		"BPCL",
		"ONGC"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 8
	}),
	n("IOC", "Indian Oil Corporation Ltd", "Energy", "Oil refining & marketing", [
		"BPCL",
		"HINDPETRO",
		"ONGC",
		"RELIANCE"
	], {
		headquarters: "New Delhi, India",
		pe: 8.5
	}),
	n("IRFC", "Indian Railway Finance Corporation", "Financials", "NBFC / railways", [
		"IRCTC",
		"RVNL",
		"SBIN"
	], {
		headquarters: "New Delhi, India",
		pe: 24
	}),
	n("OIL", "Oil India Ltd", "Energy", "Upstream oil & gas", [
		"ONGC",
		"GAIL",
		"RELIANCE"
	], {
		headquarters: "Duliajan, Assam, India",
		pe: 9
	}),
	n("SAIL", "Steel Authority of India Ltd", "Metals", "Steel", [
		"TATASTEEL",
		"JSWSTEEL",
		"NMDC"
	], {
		headquarters: "New Delhi, India",
		pe: 14
	}),
	n("JIOFIN", "Jio Financial Services Ltd", "Financials", "NBFC / payments", [
		"RELIANCE",
		"HDFCBANK",
		"BAJFINANCE"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 95
	}),
	n("RCOM", "Reliance Communications Ltd", "Telecom", "Telecom", [
		"RELIANCE",
		"BHARTIARTL",
		"IDEA"
	], { headquarters: "Mumbai, Maharashtra, India" }),
	n("RELINFRA", "Reliance Infrastructure Ltd", "Infrastructure", "Power / infra", [
		"RELIANCE",
		"RPOWER",
		"NTPC"
	], { headquarters: "Mumbai, Maharashtra, India" }),
	n("RHFL", "Reliance Home Finance Ltd", "Financials", "Housing finance", [
		"RELIANCE",
		"JIOFIN",
		"LICI"
	], { headquarters: "Mumbai, Maharashtra, India" }),
	n("RPOWER", "Reliance Power Ltd", "Energy", "Power generation", [
		"RELIANCE",
		"RELINFRA",
		"NTPC"
	], { headquarters: "Mumbai, Maharashtra, India" }),
	n("HCC", "Hindustan Construction Company", "Infrastructure", "Construction", [
		"LT",
		"NCC",
		"IRB"
	], { headquarters: "Mumbai, Maharashtra, India" }),
	n("TATACONSUM", "Tata Consumer Products Ltd", "FMCG", "Foods & beverages", [
		"HINDUNILVR",
		"ITC",
		"NESTLEIND",
		"TCS"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 62
	}),
	n("TATATECH", "Tata Technologies Ltd", "IT", "Engineering / ER&D", [
		"TCS",
		"TATAMOTORS",
		"INFY"
	], {
		headquarters: "Pune, Maharashtra, India",
		pe: 42
	}),
	n("SPICEJET", "SpiceJet Ltd", "Aviation", "Airline", ["INDIGO", "IRCTC"], { headquarters: "Gurugram, Haryana, India" }),
	n("HEROMOTOCO", "Hero MotoCorp Ltd", "Automobile", "Two-wheelers", [
		"BAJAJ-AUTO",
		"EICHERMOT",
		"TVSMOTOR"
	], {
		headquarters: "New Delhi, India",
		pe: 22
	}),
	n("INDIGO", "InterGlobe Aviation Ltd", "Aviation", "Airline", ["SPICEJET", "IRCTC"], {
		headquarters: "Gurugram, Haryana, India",
		pe: 28
	}),
	n("IRCTC", "Indian Railway Catering & Tourism", "Consumer", "Rail catering / tourism", [
		"IRFC",
		"RVNL",
		"INDIGO"
	], {
		headquarters: "New Delhi, India",
		pe: 48
	}),
	n("RVNL", "Rail Vikas Nigam Ltd", "Infrastructure", "Rail construction", [
		"IRFC",
		"IRCTC",
		"LT"
	], {
		headquarters: "New Delhi, India",
		pe: 32
	}),
	n("VBL", "Varun Beverages Ltd", "FMCG", "Beverages", [
		"TATACONSUM",
		"HINDUNILVR",
		"ITC"
	], {
		headquarters: "Gurugram, Haryana, India",
		pe: 72
	}),
	n("DIAMONDYD", "Prataap Snacks Ltd", "FMCG", "Packaged snacks", [
		"ITC",
		"TATACONSUM",
		"NESTLEIND"
	], { headquarters: "Indore, Madhya Pradesh, India" }),
	n("DOMS", "Doms Industries Ltd", "Consumer", "Stationery", ["ITC", "TITAN"], {
		headquarters: "Umbergaon, Gujarat, India",
		pe: 68
	}),
	n("MEDANTA", "Global Health Ltd", "Pharma", "Hospitals", [
		"APOLLOHOSP",
		"FORTIS",
		"MAXHEALTH"
	], {
		headquarters: "Gurugram, Haryana, India",
		pe: 58
	}),
	n("PAYTM", "One 97 Communications Ltd", "Financials", "Fintech / payments", [
		"JIOFIN",
		"SWIGGY",
		"HDFCBANK"
	], { headquarters: "Noida, Uttar Pradesh, India" }),
	n("PVRINOX", "PVR INOX Ltd", "Consumer", "Cinemas", ["TRENT", "DMART"], { headquarters: "Gurugram, Haryana, India" }),
	n("SHAHALLOYS", "Shah Alloys Ltd", "Metals", "Stainless steel", [
		"TATASTEEL",
		"JSWSTEEL",
		"SAIL"
	], { headquarters: "Ahmedabad, Gujarat, India" }),
	n("SIEMENS", "Siemens Ltd", "Capital goods", "Electrification / automation", [
		"ABB",
		"HAVELLS",
		"LT"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 72
	}),
	n("VADILALIND", "Vadilal Industries Ltd", "FMCG", "Ice cream", [
		"TATACONSUM",
		"NESTLEIND",
		"VBL"
	], { headquarters: "Ahmedabad, Gujarat, India" }),
	n("VOLTAS", "Voltas Ltd", "Consumer", "AC & engineering", [
		"BLUESTARCO",
		"HAVELLS",
		"DIXON"
	], {
		headquarters: "Mumbai, Maharashtra, India",
		pe: 58
	}),
	n("NIFTY_FIN_SERVICE", "Nifty Financial Services", "Index", "Sector index", [
		"HDFCBANK",
		"ICICIBANK",
		"SBIN"
	], {
		exchange: "INDEX",
		yahoo: "NIFTY_FIN_SERVICE.NS",
		description: "Nifty Financial Services is the NSE sector index covering banks, NBFCs and insurers."
	})
];
var MARKET_LISTS = [
	{
		id: "adani",
		name: "Adani",
		symbols: [
			"ACC.NS",
			"ADANIENT.NS",
			"ADANIGREEN.NS",
			"ADANIPORTS.NS",
			"ADANIPOWER.NS",
			"ATGL.NS",
			"AWL.NS",
			"UNOMINDA.NS",
			"WAAREEENER.NS"
		]
	},
	{
		id: "bajaj",
		name: "Bajaj",
		symbols: [
			"ABB.NS",
			"BAJAJ-AUTO.NS",
			"BAJAJFINSV.NS",
			"BAJAJHFL.NS",
			"BAJAJHIND.NS",
			"BAJFINANCE.NS",
			"BLUESTARCO.NS",
			"DIXON.NS",
			"GODFRYPHLP.NS",
			"HAVELLS.NS",
			"KEI.NS",
			"POLYCAB.NS"
		]
	},
	{
		id: "banking",
		name: "Banking Sector",
		symbols: [
			"AXISBANK.NS",
			"BANKBARODA.NS",
			"BANKINDIA.NS",
			"CANBK.NS",
			"HDFCBANK.NS",
			"ICICIBANK.NS",
			"IDEA.NS",
			"MOTILALOFS.NS",
			"SBIN.NS",
			"SWIGGY.NS",
			"YESBANK.NS"
		]
	},
	{
		id: "cement",
		name: "Cement Sector",
		symbols: [
			"AMBUJACEM.NS",
			"APOLSINHOT.NS",
			"BIRLACORPN.NS",
			"DALBHARAT.NS",
			"JKCEMENT.NS",
			"JKLAKSHMI.NS",
			"MANGLMCEM.NS",
			"NCLIND.NS",
			"RAMCOCEM.NS",
			"SHREECEM.NS",
			"STARCEMENT.NS",
			"ULTRACEMCO.NS"
		]
	},
	{
		id: "ev",
		name: "EV Sector",
		symbols: [
			"ARE&M.NS",
			"BEL.NS",
			"EXIDEIND.NS",
			"M&M.NS",
			"OLAELEC.NS",
			"UNOMINDA.NS"
		]
	},
	{
		id: "it",
		name: "IT sector",
		symbols: [
			"COFORGE.NS",
			"HCLTECH.NS",
			"IDEA.NS",
			"NETWEB.NS",
			"NEWGEN.NS",
			"QUICKHEAL.NS",
			"SASKEN.NS",
			"SUZLON.NS",
			"TECHM.NS",
			"WIPRO.NS",
			"ZENSARTECH.NS",
			"ZENTEC.NS"
		]
	},
	{
		id: "index",
		name: "Index",
		symbols: [
			"^DJI",
			"^GSPC",
			"^IXIC",
			"^N225",
			"^NSEI",
			"^CRSLDX",
			"^NSEBANK",
			"^CNXIT",
			"^CNXSERVICE",
			"AIA"
		]
	},
	{
		id: "must",
		name: "Must to buy",
		symbols: ["GALLANTT.NS", "MTARTECH.NS"]
	},
	{
		id: "oil",
		name: "OIL",
		symbols: [
			"BEL.NS",
			"BHEL.NS",
			"BPCL.NS",
			"COALINDIA.NS",
			"GAIL.NS",
			"HINDPETRO.NS",
			"IOC.NS",
			"IRFC.NS",
			"OIL.NS",
			"ONGC.NS",
			"SAIL.NS"
		]
	},
	{
		id: "reliance",
		name: "Reliance",
		symbols: [
			"JIOFIN.NS",
			"RCOM.NS",
			"RELIANCE.NS",
			"RELINFRA.NS",
			"RHFL.NS",
			"RPOWER.NS"
		]
	},
	{
		id: "tata",
		name: "TATA",
		symbols: [
			"HAL.NS",
			"HCC.NS",
			"HINDUNILVR.NS",
			"INFY.NS",
			"MTARTECH.NS",
			"TATACONSUM.NS",
			"TATASTEEL.NS",
			"TATATECH.NS",
			"TCS.NS",
			"TRENT.NS"
		]
	},
	{
		id: "transport",
		name: "Transport Sector",
		symbols: [
			"SPICEJET.NS",
			"EICHERMOT.NS",
			"FORCEMOT.NS",
			"HEROMOTOCO.NS",
			"INDIGO.NS",
			"IRCTC.NS",
			"RVNL.NS",
			"VBL.NS"
		]
	},
	{
		id: "equity-sectors",
		name: "Equity sectors",
		symbols: [
			"^CNXAUTO",
			"^CNXENERGY",
			"NIFTY_FIN_SERVICE.NS",
			"^CNXFMCG",
			"^CNXINFRA",
			"^CNXIT",
			"^CNXMEDIA",
			"^CNXMETAL",
			"^CNXPHARMA",
			"^CNXREALTY"
		]
	}
];
var DEFAULT_WATCHLIST$1 = [
	"^IXIC",
	"BALRAMCHIN.NS",
	"CIPLA.NS",
	"DIAMONDYD.NS",
	"DOMS.NS",
	"FORCEMOT.NS",
	"GABRIEL.NS",
	"GLAND.NS",
	"GLENMARK.NS",
	"IEX.NS",
	"INOXINDIA.NS",
	"IRB.NS"
];
function q(period, label, revenueCr, patCr, eps, yoyRevenue, yoyPat) {
	return {
		period,
		label,
		revenueCr,
		patCr,
		eps,
		yoyRevenue,
		yoyPat
	};
}
var COMPANIES = [...[
	{
		symbol: "FORCEMOT",
		name: "Force Motors Ltd",
		sector: "Automobile",
		industry: "CV / UV manufacturing",
		exchange: "NSE",
		yahoo: "FORCEMOT.NS",
		bseYahoo: "FORCEMOT.BO",
		description: "Force Motors Ltd is an Indian automotive manufacturer based in Pune. From 1958 to 2005 it was known as Bajaj Tempo. The company builds light commercial vehicles (Traveller, Trax, Gurkha, Citiline, Monobus), engines and axles, and has partnered with Mercedes-Benz, BMW, MAN and others for powertrains. It is India’s largest van maker and exports across Africa, Latin America, SAARC and ASEAN.",
		ceo: "Prasan Firodia",
		headquarters: "Pune, Maharashtra, India",
		employees: "5k",
		founded: "1958",
		related: [
			"EICHERMOT",
			"ASHOKLEY",
			"MARUTI",
			"M&M",
			"BOSCHLTD"
		],
		pe: 18.7,
		eps: 950,
		sharesCr: 1.32,
		quarters: [
			q("FY25 Q2", "Q2 FY25", 1984, 186, 141, .155, .22),
			q("FY25 Q3", "Q3 FY25", 2102, 201, 152, .12, .18),
			q("FY25 Q4", "Q4 FY25", 2240, 218, 165, .14, .16),
			q("FY26 Q1", "Q1 FY26", 2310, 224, 170, .11, .09),
			q("FY26 Q2", "Q2 FY26", 2288, 198, 150, .153, .065),
			q("FY26 Q3", "Q3 FY26", 2415, 232, 176, .149, .154),
			q("FY26 Q4", "Q4 FY26", 2520, 248, 188, .125, .138),
			q("FY27 Q1", "Q1 FY27", 2610, 255, 193, .13, .138)
		]
	},
	{
		symbol: "RELIANCE",
		name: "Reliance Industries Ltd",
		sector: "Energy",
		industry: "Oil, gas, telecom, retail",
		exchange: "NSE",
		yahoo: "RELIANCE.NS",
		bseYahoo: "RELIANCE.BO",
		description: "Reliance Industries is India’s largest private-sector company, spanning oil-to-chemicals, retail, digital (Jio) and new energy. It is a core Nifty 50 holding and one of the most widely owned stocks on NSE and BSE.",
		ceo: "Mukesh D. Ambani",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "390k+",
		founded: "1973",
		related: [
			"ONGC",
			"IOC",
			"BPCL",
			"BHARTIARTL",
			"TATAPOWER"
		],
		pe: 26,
		eps: 58,
		sharesCr: 676,
		quarters: [
			q("FY26 Q1", "Q1 FY26", 231400, 16520, 24.4, .07, .08),
			q("FY26 Q2", "Q2 FY26", 238900, 17110, 25.3, .06, .09),
			q("FY26 Q3", "Q3 FY26", 244200, 17640, 26.1, .08, .1),
			q("FY26 Q4", "Q4 FY26", 251800, 18220, 26.9, .07, .09),
			q("FY27 Q1", "Q1 FY27", 256400, 18810, 27.8, .108, .139)
		]
	},
	{
		symbol: "TCS",
		name: "Tata Consultancy Services",
		sector: "IT",
		industry: "IT services",
		exchange: "NSE",
		yahoo: "TCS.NS",
		bseYahoo: "TCS.BO",
		description: "TCS is India’s largest IT services firm and a flagship Tata company. It provides consulting, software and business-process services to global enterprises, with a large workforce across India, North America and Europe.",
		ceo: "K. Krithivasan",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "600k+",
		founded: "1968",
		related: [
			"INFY",
			"WIPRO",
			"HCLTECH",
			"TECHM",
			"LTIM"
		],
		pe: 29,
		eps: 134,
		sharesCr: 362,
		quarters: [
			q("FY26 Q1", "Q1 FY26", 62640, 12080, 33.4, .05, .06),
			q("FY26 Q2", "Q2 FY26", 63810, 12340, 34.1, .06, .05),
			q("FY26 Q3", "Q3 FY26", 64520, 12510, 34.6, .05, .04),
			q("FY26 Q4", "Q4 FY26", 65280, 12790, 35.3, .06, .07),
			q("FY27 Q1", "Q1 FY27", 66140, 13020, 36, .056, .078)
		]
	},
	{
		symbol: "INFY",
		name: "Infosys Ltd",
		sector: "IT",
		industry: "IT services",
		exchange: "NSE",
		yahoo: "INFY.NS",
		bseYahoo: "INFY.BO",
		description: "Infosys is a global digital services and consulting company headquartered in Bengaluru. It is a Nifty 50 and Nasdaq-listed name, known for large transformation deals and a strong balance sheet.",
		ceo: "Salil Parekh",
		headquarters: "Bengaluru, Karnataka, India",
		employees: "320k+",
		founded: "1981",
		related: [
			"TCS",
			"WIPRO",
			"HCLTECH",
			"TECHM",
			"PERSISTENT"
		],
		pe: 25,
		eps: 65,
		sharesCr: 415
	},
	{
		symbol: "HDFCBANK",
		name: "HDFC Bank Ltd",
		sector: "Banking",
		industry: "Private bank",
		exchange: "NSE",
		yahoo: "HDFCBANK.NS",
		bseYahoo: "HDFCBANK.BO",
		description: "HDFC Bank is India’s largest private-sector bank by market cap, with a nationwide retail and wholesale franchise after the HDFC Ltd merger.",
		ceo: "Sashidhar Jagdishan",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "210k+",
		founded: "1994",
		related: [
			"ICICIBANK",
			"KOTAKBANK",
			"SBIN",
			"AXISBANK",
			"INDUSINDBK"
		],
		pe: 19,
		eps: 92,
		sharesCr: 765
	},
	{
		symbol: "ICICIBANK",
		name: "ICICI Bank Ltd",
		sector: "Banking",
		industry: "Private bank",
		exchange: "NSE",
		yahoo: "ICICIBANK.NS",
		bseYahoo: "ICICIBANK.BO",
		description: "ICICI Bank is a leading private bank with a large retail deposit base, credit-card franchise and international presence.",
		ceo: "Sandeep Bakhshi",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "150k+",
		founded: "1994",
		related: [
			"HDFCBANK",
			"SBIN",
			"AXISBANK",
			"KOTAKBANK",
			"BAJFINANCE"
		],
		pe: 18,
		eps: 68,
		sharesCr: 702
	},
	{
		symbol: "SBIN",
		name: "State Bank of India",
		sector: "Banking",
		industry: "Public-sector bank",
		exchange: "NSE",
		yahoo: "SBIN.NS",
		bseYahoo: "SBIN.BO",
		description: "SBI is India’s largest bank by deposits and a proxy for the domestic credit cycle, with a vast branch network and subsidiaries in insurance, mutual funds and cards.",
		ceo: "C. S. Setty",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "230k+",
		founded: "1955",
		related: [
			"BANKBARODA",
			"PNB",
			"HDFCBANK",
			"ICICIBANK",
			"CANBK"
		],
		pe: 9.5,
		eps: 88,
		sharesCr: 892
	},
	{
		symbol: "ITC",
		name: "ITC Ltd",
		sector: "FMCG",
		industry: "FMCG, hotels, paper",
		exchange: "NSE",
		yahoo: "ITC.NS",
		bseYahoo: "ITC.BO",
		description: "ITC is a diversified Indian conglomerate spanning cigarettes, FMCG, hotels, paperboards and agri-business, with a large rural distribution network.",
		headquarters: "Kolkata, West Bengal, India",
		employees: "24k+",
		founded: "1910",
		related: [
			"HINDUNILVR",
			"NESTLEIND",
			"BRITANNIA",
			"DABUR",
			"MARICO"
		],
		pe: 26,
		eps: 16,
		sharesCr: 1248
	},
	{
		symbol: "BHARTIARTL",
		name: "Bharti Airtel Ltd",
		sector: "Telecom",
		industry: "Wireless & digital",
		exchange: "NSE",
		yahoo: "BHARTIARTL.NS",
		bseYahoo: "BHARTIARTL.BO",
		description: "Airtel is India’s second-largest telecom operator and a pan-Africa wireless group, expanding into digital, payments and data-centre services.",
		ceo: "Gopal Vittal",
		headquarters: "New Delhi, India",
		employees: "20k+",
		founded: "1995",
		related: [
			"RELIANCE",
			"IDEA",
			"TATACOMM",
			"HFCL"
		],
		pe: 52,
		sharesCr: 578
	},
	{
		symbol: "LT",
		name: "Larsen & Toubro Ltd",
		sector: "Capital goods",
		industry: "Engineering & construction",
		exchange: "NSE",
		yahoo: "LT.NS",
		bseYahoo: "LT.BO",
		description: "L&T is India’s largest engineering and construction company, with businesses in infrastructure, defence, hydrocarbons, IT (LTIMindtree) and financial services.",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "50k+",
		founded: "1938",
		related: [
			"SIEMENS",
			"ABB",
			"HAL",
			"BEL",
			"NTPC"
		],
		pe: 32,
		sharesCr: 137
	},
	{
		symbol: "MARUTI",
		name: "Maruti Suzuki India Ltd",
		sector: "Automobile",
		industry: "Passenger vehicles",
		exchange: "NSE",
		yahoo: "MARUTI.NS",
		bseYahoo: "MARUTI.BO",
		description: "Maruti Suzuki is India’s largest passenger-car maker, a Suzuki Motor subsidiary with a dominant small-car franchise and a growing SUV mix.",
		headquarters: "New Delhi, India",
		employees: "16k+",
		founded: "1981",
		related: [
			"M&M",
			"TATAMOTORS",
			"HYUNDAI",
			"BAJAJ-AUTO",
			"EICHERMOT"
		],
		pe: 28,
		sharesCr: 31.4
	},
	{
		symbol: "TATAMOTORS",
		name: "Tata Motors Ltd",
		sector: "Automobile",
		industry: "PV, CV, JLR",
		exchange: "NSE",
		yahoo: "TATAMOTORS.NS",
		bseYahoo: "TATAMOTORS.BO",
		description: "Tata Motors makes commercial and passenger vehicles in India and owns Jaguar Land Rover. It is a key auto cyclical on NSE/BSE.",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "80k+",
		founded: "1945",
		related: [
			"MARUTI",
			"M&M",
			"ASHOKLEY",
			"EICHERMOT",
			"FORCEMOT"
		],
		pe: 11,
		sharesCr: 368
	},
	{
		symbol: "M&M",
		name: "Mahindra & Mahindra Ltd",
		sector: "Automobile",
		industry: "UV, farm, auto",
		exchange: "NSE",
		yahoo: "M&M.NS",
		bseYahoo: "M&M.BO",
		description: "Mahindra is a leading SUV and tractor maker with interests in electric vehicles, financial services and IT (Tech Mahindra).",
		headquarters: "Mumbai, Maharashtra, India",
		employees: "260k+",
		founded: "1945",
		related: [
			"MARUTI",
			"TATAMOTORS",
			"ESCORTS",
			"TVSMOTOR",
			"BAJAJ-AUTO"
		],
		pe: 27,
		sharesCr: 124
	},
	{
		symbol: "EICHERMOT",
		name: "Eicher Motors Ltd",
		sector: "Automobile",
		industry: "Two-wheelers / CV",
		exchange: "NSE",
		yahoo: "EICHERMOT.NS",
		bseYahoo: "EICHERMOT.BO",
		description: "Eicher Motors owns Royal Enfield and a VECV commercial-vehicle joint venture with Volvo. It is a premium two-wheeler franchise.",
		headquarters: "Gurugram, Haryana, India",
		employees: "5k+",
		founded: "1982",
		related: [
			"BAJAJ-AUTO",
			"TVSMOTOR",
			"HEROMOTOCO",
			"FORCEMOT",
			"ASHOKLEY"
		],
		pe: 34,
		sharesCr: 27.4
	},
	{
		symbol: "BAJAJ-AUTO",
		name: "Bajaj Auto Ltd",
		sector: "Automobile",
		industry: "Two-wheelers / 3W",
		exchange: "NSE",
		yahoo: "BAJAJ-AUTO.NS",
		description: "Bajaj Auto is a major two- and three-wheeler exporter with brands including Pulsar, Chetak EV and a stake in KTM / Triumph partnerships.",
		headquarters: "Pune, Maharashtra, India",
		related: [
			"EICHERMOT",
			"TVSMOTOR",
			"HEROMOTOCO",
			"M&M"
		],
		pe: 33,
		sharesCr: 27.9
	},
	{
		symbol: "HINDUNILVR",
		name: "Hindustan Unilever Ltd",
		sector: "FMCG",
		industry: "Consumer staples",
		exchange: "NSE",
		yahoo: "HINDUNILVR.NS",
		description: "HUL is India’s largest FMCG company, a Unilever subsidiary with category leadership in soaps, detergents, tea and skincare.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"ITC",
			"NESTLEIND",
			"DABUR",
			"MARICO",
			"GODREJCP"
		],
		pe: 55,
		sharesCr: 235
	},
	{
		symbol: "ASIANPAINT",
		name: "Asian Paints Ltd",
		sector: "Consumer",
		industry: "Paints",
		exchange: "NSE",
		yahoo: "ASIANPAINT.NS",
		description: "Asian Paints is India’s largest decorative-paints company with a dense dealer network and expanding home-improvement adjacencies.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"BERGEPAINT",
			"PIDILITIND",
			"HAVELLS",
			"HINDUNILVR"
		],
		pe: 52,
		sharesCr: 95.9
	},
	{
		symbol: "SUNPHARMA",
		name: "Sun Pharmaceutical Industries",
		sector: "Pharma",
		industry: "Generic & specialty pharma",
		exchange: "NSE",
		yahoo: "SUNPHARMA.NS",
		description: "Sun Pharma is India’s largest drug maker, with a US specialty franchise and a broad domestic branded-generic portfolio.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"CIPLA",
			"DRREDDY",
			"DIVISLAB",
			"AUROPHARMA",
			"LUPIN"
		],
		pe: 38,
		sharesCr: 240
	},
	{
		symbol: "CIPLA",
		name: "Cipla Ltd",
		sector: "Pharma",
		industry: "Pharma",
		exchange: "NSE",
		yahoo: "CIPLA.NS",
		description: "Cipla is a global pharmaceutical company known for respiratory, HIV and complex generics, with a strong India brands franchise.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"SUNPHARMA",
			"DRREDDY",
			"LUPIN",
			"GLENMARK",
			"AUROPHARMA"
		],
		pe: 24,
		sharesCr: 80.7
	},
	{
		symbol: "DRREDDY",
		name: "Dr. Reddy's Laboratories",
		sector: "Pharma",
		industry: "Pharma",
		exchange: "NSE",
		yahoo: "DRREDDY.NS",
		description: "Dr. Reddy’s is a vertically integrated pharma company with US generics, India brands and biosimilars.",
		headquarters: "Hyderabad, Telangana, India",
		related: [
			"SUNPHARMA",
			"CIPLA",
			"DIVISLAB",
			"BIOCON"
		],
		pe: 19,
		sharesCr: 16.6
	},
	{
		symbol: "WIPRO",
		name: "Wipro Ltd",
		sector: "IT",
		industry: "IT services",
		exchange: "NSE",
		yahoo: "WIPRO.NS",
		description: "Wipro is a global IT services and consulting firm, part of the Nifty IT pack, with a large India delivery base.",
		headquarters: "Bengaluru, Karnataka, India",
		related: [
			"TCS",
			"INFY",
			"HCLTECH",
			"TECHM"
		],
		pe: 22,
		sharesCr: 523
	},
	{
		symbol: "HCLTECH",
		name: "HCL Technologies Ltd",
		sector: "IT",
		industry: "IT services",
		exchange: "NSE",
		yahoo: "HCLTECH.NS",
		description: "HCLTech provides digital, engineering and cloud services to global enterprises and is a core Nifty IT constituent.",
		headquarters: "Noida, Uttar Pradesh, India",
		related: [
			"TCS",
			"INFY",
			"WIPRO",
			"TECHM",
			"LTIM"
		],
		pe: 26,
		sharesCr: 271
	},
	{
		symbol: "AXISBANK",
		name: "Axis Bank Ltd",
		sector: "Banking",
		industry: "Private bank",
		exchange: "NSE",
		yahoo: "AXISBANK.NS",
		description: "Axis Bank is one of India’s large private banks with a growing retail book and a notable wholesale franchise.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"HDFCBANK",
			"ICICIBANK",
			"KOTAKBANK",
			"INDUSINDBK"
		],
		pe: 13,
		sharesCr: 309
	},
	{
		symbol: "KOTAKBANK",
		name: "Kotak Mahindra Bank Ltd",
		sector: "Banking",
		industry: "Private bank",
		exchange: "NSE",
		yahoo: "KOTAKBANK.NS",
		description: "Kotak is a private bank and financial-services group covering banking, insurance, AMC and securities.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"HDFCBANK",
			"ICICIBANK",
			"BAJFINANCE",
			"AXISBANK"
		],
		pe: 17,
		sharesCr: 198
	},
	{
		symbol: "BAJFINANCE",
		name: "Bajaj Finance Ltd",
		sector: "Financials",
		industry: "NBFC",
		exchange: "NSE",
		yahoo: "BAJFINANCE.NS",
		description: "Bajaj Finance is India’s largest retail NBFC, with a wide consumer-lending franchise and a dense distribution network.",
		headquarters: "Pune, Maharashtra, India",
		related: [
			"BAJAJFINSV",
			"HDFCBANK",
			"CHOLAFIN",
			"SBICARD"
		],
		pe: 32,
		sharesCr: 62
	},
	{
		symbol: "NTPC",
		name: "NTPC Ltd",
		sector: "Energy",
		industry: "Power generation",
		exchange: "NSE",
		yahoo: "NTPC.NS",
		description: "NTPC is India’s largest power generator, transitioning from coal toward renewables while remaining a high-dividend PSU.",
		headquarters: "New Delhi, India",
		related: [
			"POWERGRID",
			"TATAPOWER",
			"ADANIPOWER",
			"COALINDIA"
		],
		pe: 16,
		sharesCr: 970
	},
	{
		symbol: "ONGC",
		name: "Oil & Natural Gas Corporation",
		sector: "Energy",
		industry: "Upstream oil & gas",
		exchange: "NSE",
		yahoo: "ONGC.NS",
		description: "ONGC is India’s flagship upstream oil and gas company and a key PSU in the energy complex.",
		headquarters: "New Delhi, India",
		related: [
			"RELIANCE",
			"IOC",
			"BPCL",
			"GAIL",
			"OIL"
		],
		pe: 8,
		sharesCr: 1258
	},
	{
		symbol: "TATASTEEL",
		name: "Tata Steel Ltd",
		sector: "Metals",
		industry: "Steel",
		exchange: "NSE",
		yahoo: "TATASTEEL.NS",
		description: "Tata Steel is a global steel producer with operations in India, the Netherlands and the UK, and a core Nifty metals name.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"JSWSTEEL",
			"HINDALCO",
			"VEDL",
			"SAIL",
			"JINDALSTEL"
		],
		pe: 14,
		sharesCr: 1247
	},
	{
		symbol: "JSWSTEEL",
		name: "JSW Steel Ltd",
		sector: "Metals",
		industry: "Steel",
		exchange: "NSE",
		yahoo: "JSWSTEEL.NS",
		description: "JSW Steel is one of India’s largest private steel makers with a growing capacity footprint and downstream products.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"TATASTEEL",
			"JINDALSTEL",
			"HINDALCO",
			"VEDL"
		],
		pe: 18,
		sharesCr: 244
	},
	{
		symbol: "HINDALCO",
		name: "Hindalco Industries Ltd",
		sector: "Metals",
		industry: "Aluminium & copper",
		exchange: "NSE",
		yahoo: "HINDALCO.NS",
		description: "Hindalco, an Aditya Birla Group company, is a global aluminium producer through Novelis and a major Indian copper smelter.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"VEDL",
			"NATIONALUM",
			"TATASTEEL",
			"JSWSTEEL"
		],
		pe: 12,
		sharesCr: 224
	},
	{
		symbol: "ADANIENT",
		name: "Adani Enterprises Ltd",
		sector: "Infrastructure",
		industry: "Incubator / infra",
		exchange: "NSE",
		yahoo: "ADANIENT.NS",
		description: "Adani Enterprises is the Adani Group’s incubator, with interests in airports, green hydrogen, mining and digital.",
		headquarters: "Ahmedabad, Gujarat, India",
		related: [
			"ADANIPORTS",
			"ADANIPOWER",
			"ADANIGREEN",
			"TATAPOWER"
		],
		pe: 48,
		sharesCr: 114
	},
	{
		symbol: "ADANIPORTS",
		name: "Adani Ports & SEZ Ltd",
		sector: "Infrastructure",
		industry: "Ports & logistics",
		exchange: "NSE",
		yahoo: "ADANIPORTS.NS",
		description: "India’s largest private port operator, running a network of ports and logistics parks along the coastline.",
		headquarters: "Ahmedabad, Gujarat, India",
		related: [
			"ADANIENT",
			"CONCOR",
			"GESHIP"
		],
		pe: 26,
		sharesCr: 216
	},
	{
		symbol: "HAL",
		name: "Hindustan Aeronautics Ltd",
		sector: "Defence",
		industry: "Aerospace & defence",
		exchange: "NSE",
		yahoo: "HAL.NS",
		description: "HAL is India’s principal military aircraft manufacturer, a PSU leveraged to defence indigenisation and export orders.",
		headquarters: "Bengaluru, Karnataka, India",
		related: [
			"BEL",
			"BHEL",
			"MAZDOCK",
			"BDL",
			"SOLARINDS"
		],
		pe: 36,
		sharesCr: 66.9
	},
	{
		symbol: "BEL",
		name: "Bharat Electronics Ltd",
		sector: "Defence",
		industry: "Defence electronics",
		exchange: "NSE",
		yahoo: "BEL.NS",
		description: "BEL is a defence-electronics PSU supplying radars, communication and electronic-warfare systems to the Indian armed forces.",
		headquarters: "Bengaluru, Karnataka, India",
		related: [
			"HAL",
			"BDL",
			"MAZDOCK",
			"GRSE"
		],
		pe: 42,
		sharesCr: 731
	},
	{
		symbol: "MAZDOCK",
		name: "Mazagon Dock Shipbuilders",
		sector: "Defence",
		industry: "Shipbuilding",
		exchange: "NSE",
		yahoo: "MAZDOCK.NS",
		description: "Mazagon Dock is a defence PSU that builds submarines and warships for the Indian Navy, a high-order-book shipyard stock.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"HAL",
			"BEL",
			"BDL",
			"GRSE",
			"COCHINSHIP"
		],
		pe: 44,
		sharesCr: 40.2
	},
	{
		symbol: "BDL",
		name: "Bharat Dynamics Ltd",
		sector: "Defence",
		industry: "Missiles",
		exchange: "NSE",
		yahoo: "BDL.NS",
		description: "BDL manufactures missiles and underwater weapons for India’s defence forces and is a pure-play munitions PSU.",
		headquarters: "Hyderabad, Telangana, India",
		related: [
			"HAL",
			"BEL",
			"MAZDOCK",
			"SOLARINDS"
		],
		pe: 50,
		sharesCr: 36.6
	},
	{
		symbol: "CEATLTD",
		name: "CEAT Ltd",
		sector: "Automobile",
		industry: "Tyres",
		exchange: "NSE",
		yahoo: "CEATLTD.NS",
		description: "CEAT, part of the RPG Group, makes tyres for two-wheelers, passenger cars and commercial vehicles in India and export markets.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"APOLLOTYRE",
			"MRF",
			"BALKRISIND",
			"FORCEMOT"
		],
		pe: 22,
		sharesCr: 4.04
	},
	{
		symbol: "NESTLEIND",
		name: "Nestlé India Ltd",
		sector: "FMCG",
		industry: "Foods",
		exchange: "NSE",
		yahoo: "NESTLEIND.NS",
		description: "Nestlé India is a leading packaged-foods company (Maggi, Nescafé, KitKat) and a defensive Nifty FMCG name.",
		headquarters: "Gurugram, Haryana, India",
		related: [
			"HINDUNILVR",
			"BRITANNIA",
			"TATACONSUM",
			"ITC"
		],
		pe: 72,
		sharesCr: 96.4
	},
	{
		symbol: "TITAN",
		name: "Titan Company Ltd",
		sector: "Consumer",
		industry: "Jewellery & watches",
		exchange: "NSE",
		yahoo: "TITAN.NS",
		description: "Titan, a Tata company, leads organised jewellery (Tanishq) and watches in India, with expanding eyewear and wearables.",
		headquarters: "Bengaluru, Karnataka, India",
		related: [
			"KALYANKJIL",
			"TRENT",
			"DMART",
			"HINDUNILVR"
		],
		pe: 84,
		sharesCr: 88.8
	},
	{
		symbol: "ULTRACEMCO",
		name: "UltraTech Cement Ltd",
		sector: "Materials",
		industry: "Cement",
		exchange: "NSE",
		yahoo: "ULTRACEMCO.NS",
		description: "UltraTech is India’s largest cement producer, an Aditya Birla Group company leveraged to housing and infrastructure capex.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"SHREECEM",
			"AMBUJACEM",
			"ACC",
			"DALBHARAT"
		],
		pe: 45,
		sharesCr: 28.9
	},
	{
		symbol: "POWERGRID",
		name: "Power Grid Corporation of India",
		sector: "Energy",
		industry: "Power transmission",
		exchange: "NSE",
		yahoo: "POWERGRID.NS",
		description: "POWERGRID is India’s central transmission utility, a regulated PSU with predictable cash flows and a high dividend payout.",
		headquarters: "Gurugram, Haryana, India",
		related: [
			"NTPC",
			"NHPC",
			"TATAPOWER"
		],
		pe: 17,
		sharesCr: 930
	},
	{
		symbol: "COALINDIA",
		name: "Coal India Ltd",
		sector: "Energy",
		industry: "Mining",
		exchange: "NSE",
		yahoo: "COALINDIA.NS",
		description: "Coal India is the world’s largest coal miner and a high-dividend PSU tied to India’s thermal-power demand.",
		headquarters: "Kolkata, West Bengal, India",
		related: [
			"NTPC",
			"ONGC",
			"NMDC",
			"VEDL"
		],
		pe: 7.5,
		sharesCr: 616
	},
	{
		symbol: "LICI",
		name: "Life Insurance Corporation of India",
		sector: "Financials",
		industry: "Life insurance",
		exchange: "NSE",
		yahoo: "LICI.NS",
		description: "LIC is India’s largest life insurer, a newly listed PSU with unmatched agency distribution and a huge AUM.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"SBILIFE",
			"HDFCLIFE",
			"ICICIPRULI",
			"GICRE"
		],
		pe: 12,
		sharesCr: 632
	},
	{
		symbol: "DMART",
		name: "Avenue Supermarts Ltd",
		sector: "Consumer",
		industry: "Retail",
		exchange: "NSE",
		yahoo: "DMART.NS",
		description: "DMart operates a value-retail supermarket chain with a high-volume, low-margin model concentrated in western India.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"TRENT",
			"TITAN",
			"RELIANCE"
		],
		pe: 95,
		sharesCr: 65.1
	},
	{
		symbol: "TRENT",
		name: "Trent Ltd",
		sector: "Consumer",
		industry: "Fashion retail",
		exchange: "NSE",
		yahoo: "TRENT.NS",
		description: "Trent, a Tata company, runs Westside, Zudio and other fashion formats and has been one of India’s fastest-growing retailers.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"DMART",
			"TITAN",
			"RELIANCE"
		],
		pe: 110,
		sharesCr: 35.5
	},
	{
		symbol: "IRB",
		name: "IRB Infrastructure Developers",
		sector: "Infrastructure",
		industry: "Roads",
		exchange: "NSE",
		yahoo: "IRB.NS",
		description: "IRB is a major roads BOT / InvIT developer with a large highway portfolio across India.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"LT",
			"ADANIPORTS",
			"NCC",
			"PNCINFRA"
		],
		pe: 28,
		sharesCr: 603
	},
	{
		symbol: "NCC",
		name: "NCC Ltd",
		sector: "Infrastructure",
		industry: "Construction",
		exchange: "NSE",
		yahoo: "NCC.NS",
		description: "NCC is a diversified construction company executing buildings, transportation, water and electrical projects across India.",
		headquarters: "Hyderabad, Telangana, India",
		related: [
			"LT",
			"IRB",
			"PNCINFRA",
			"KPIL"
		],
		pe: 16,
		sharesCr: 62.8
	},
	{
		symbol: "GLENMARK",
		name: "Glenmark Pharmaceuticals",
		sector: "Pharma",
		industry: "Pharma",
		exchange: "NSE",
		yahoo: "GLENMARK.NS",
		description: "Glenmark is an Indian pharma company with branded generics, respiratory and a specialty pipeline, listed on NSE and BSE.",
		headquarters: "Mumbai, Maharashtra, India",
		related: [
			"CIPLA",
			"SUNPHARMA",
			"LUPIN",
			"GLAND"
		],
		pe: 38,
		sharesCr: 28.2
	},
	{
		symbol: "IEX",
		name: "Indian Energy Exchange Ltd",
		sector: "Energy",
		industry: "Power exchange",
		exchange: "NSE",
		yahoo: "IEX.NS",
		description: "IEX is India’s leading electricity trading exchange, a high-ROE market-infrastructure name leveraged to power-market volumes.",
		headquarters: "New Delhi, India",
		related: [
			"NTPC",
			"TATAPOWER",
			"POWERGRID"
		],
		pe: 38,
		sharesCr: 89.1
	},
	{
		symbol: "GABRIEL",
		name: "Gabriel India Ltd",
		sector: "Automobile",
		industry: "Auto ancillaries",
		exchange: "NSE",
		yahoo: "GABRIEL.NS",
		description: "Gabriel India, part of the Anand Group, manufactures ride-control products (shock absorbers) for two-wheelers and four-wheelers.",
		headquarters: "Pune, Maharashtra, India",
		related: [
			"BOSCHLTD",
			"MOTHERSON",
			"BHARATFORG",
			"FORCEMOT"
		],
		pe: 42,
		sharesCr: 14.4
	},
	{
		symbol: "GLAND",
		name: "Gland Pharma Ltd",
		sector: "Pharma",
		industry: "Injectables",
		exchange: "NSE",
		yahoo: "GLAND.NS",
		description: "Gland Pharma is a sterile injectables specialist with a large US FDA-approved manufacturing base, majority-owned by Fosun.",
		headquarters: "Hyderabad, Telangana, India",
		related: [
			"CIPLA",
			"SUNPHARMA",
			"BIOCON",
			"GLENMARK"
		],
		pe: 42,
		sharesCr: 16.5
	},
	{
		symbol: "BALRAMCHIN",
		name: "Balrampur Chini Mills Ltd",
		sector: "Commodities",
		industry: "Sugar",
		exchange: "NSE",
		yahoo: "BALRAMCHIN.NS",
		description: "Balrampur Chini is one of India’s largest sugar producers, with distillery and cogeneration operations in Uttar Pradesh.",
		headquarters: "Kolkata, West Bengal, India",
		related: [
			"EIDPARRY",
			"DHAMPURSUG",
			"TRIVENI"
		],
		pe: 22,
		sharesCr: 20.2
	},
	{
		symbol: "KARURVYSYA",
		name: "Karur Vysya Bank Ltd",
		sector: "Banking",
		industry: "Private bank",
		exchange: "NSE",
		yahoo: "KARURVYSYA.NS",
		description: "Karur Vysya Bank is a south-India private bank with a long operating history and a growing retail franchise.",
		headquarters: "Karur, Tamil Nadu, India",
		related: [
			"FEDERALBNK",
			"BANDHANBNK",
			"IDFCFIRSTB",
			"SBIN"
		],
		pe: 9,
		sharesCr: 80.5
	},
	{
		symbol: "INOXINDIA",
		name: "INOX India Ltd",
		sector: "Capital goods",
		industry: "Cryogenic engineering",
		exchange: "NSE",
		yahoo: "INOXINDIA.NS",
		description: "INOX India designs and makes cryogenic storage and distribution equipment used in industrial gases, LNG and space applications.",
		headquarters: "Vadodara, Gujarat, India",
		related: [
			"LLOYDSME",
			"KIRLOSENG",
			"CUMMINSIND"
		],
		pe: 48,
		sharesCr: 9.07
	}
], ...MORE_COMPANIES];
var INDICES = [
	{
		yahoo: "^NSEI",
		name: "NIFTY 50",
		region: "india"
	},
	{
		yahoo: "^BSESN",
		name: "SENSEX",
		region: "india"
	},
	{
		yahoo: "^NSEBANK",
		name: "Nifty Bank",
		region: "india"
	},
	{
		yahoo: "^CNXIT",
		name: "Nifty IT",
		region: "india"
	},
	{
		yahoo: "^CNXAUTO",
		name: "Nifty Auto",
		region: "india"
	},
	{
		yahoo: "^CNXPHARMA",
		name: "Nifty Pharma",
		region: "india"
	},
	{
		yahoo: "^CNXFMCG",
		name: "Nifty FMCG",
		region: "india"
	},
	{
		yahoo: "^CNXENERGY",
		name: "Nifty Energy",
		region: "india"
	},
	{
		yahoo: "^CNXMETAL",
		name: "Nifty Metal",
		region: "india"
	},
	{
		yahoo: "^CNXREALTY",
		name: "Nifty Realty",
		region: "india"
	},
	{
		yahoo: "^CNXINFRA",
		name: "Nifty Infra",
		region: "india"
	},
	{
		yahoo: "^CNXMEDIA",
		name: "Nifty Media",
		region: "india"
	},
	{
		yahoo: "^CNXSERVICE",
		name: "Nifty Services",
		region: "india"
	},
	{
		yahoo: "^CRSLDX",
		name: "Nifty 500",
		region: "india"
	},
	{
		yahoo: "NIFTY_FIN_SERVICE.NS",
		name: "Nifty Fin Service",
		region: "india"
	},
	{
		yahoo: "^INDIAVIX",
		name: "India VIX",
		region: "india"
	},
	{
		yahoo: "^GSPC",
		name: "S&P 500",
		region: "us"
	},
	{
		yahoo: "^DJI",
		name: "Dow Jones",
		region: "us"
	},
	{
		yahoo: "^IXIC",
		name: "Nasdaq Composite",
		region: "us"
	},
	{
		yahoo: "AIA",
		name: "S&P Asia 50",
		region: "us"
	},
	{
		yahoo: "^N225",
		name: "Nikkei 225",
		region: "europe"
	},
	{
		yahoo: "^FTSE",
		name: "FTSE 100",
		region: "europe"
	},
	{
		yahoo: "^GDAXI",
		name: "DAX",
		region: "europe"
	},
	{
		yahoo: "^FCHI",
		name: "CAC 40",
		region: "europe"
	},
	{
		yahoo: "BTC-USD",
		name: "Bitcoin",
		region: "crypto"
	},
	{
		yahoo: "ETH-USD",
		name: "Ethereum",
		region: "crypto"
	},
	{
		yahoo: "USDINR=X",
		name: "USD / INR",
		region: "fx"
	},
	{
		yahoo: "EURINR=X",
		name: "EUR / INR",
		region: "fx"
	}
];
var DEFAULT_WATCHLIST = DEFAULT_WATCHLIST$1;
var byYahoo = /* @__PURE__ */ new Map();
var bySymbol = /* @__PURE__ */ new Map();
for (const c of COMPANIES) {
	byYahoo.set(c.yahoo.toUpperCase(), c);
	if (c.bseYahoo) byYahoo.set(c.bseYahoo.toUpperCase(), c);
	bySymbol.set(c.symbol.toUpperCase(), c);
}
function findCompany(id) {
	const key = id.trim().toUpperCase();
	return byYahoo.get(key) ?? bySymbol.get(key.replace(/\.NS$|\.BO$/, ""));
}
function searchUniverse(q, limit = 8) {
	const s = q.trim().toLowerCase();
	if (!s) return [];
	return COMPANIES.map((c) => {
		const hay = `${c.symbol} ${c.name} ${c.sector} ${c.yahoo}`.toLowerCase();
		let score = 0;
		if (c.symbol.toLowerCase() === s) score = 100;
		else if (c.symbol.toLowerCase().startsWith(s)) score = 80;
		else if (c.name.toLowerCase().startsWith(s)) score = 70;
		else if (hay.includes(s)) score = 40;
		return {
			c,
			score
		};
	}).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.c);
}
/** Official NSE CM holidays 2026 (circular NSE/CMTR/71775). */
var NSE_HOLIDAYS_2026 = [
	{
		date: "2026-01-26",
		name: "Republic Day",
		day: "Mon"
	},
	{
		date: "2026-03-03",
		name: "Holi",
		day: "Tue"
	},
	{
		date: "2026-03-26",
		name: "Shri Ram Navami",
		day: "Thu"
	},
	{
		date: "2026-03-31",
		name: "Shri Mahavir Jayanti",
		day: "Tue"
	},
	{
		date: "2026-04-03",
		name: "Good Friday",
		day: "Fri"
	},
	{
		date: "2026-04-14",
		name: "Dr. Baba Saheb Ambedkar Jayanti",
		day: "Tue"
	},
	{
		date: "2026-05-01",
		name: "Maharashtra Day",
		day: "Fri"
	},
	{
		date: "2026-05-28",
		name: "Bakri Id",
		day: "Thu"
	},
	{
		date: "2026-06-26",
		name: "Muharram",
		day: "Fri"
	},
	{
		date: "2026-09-14",
		name: "Ganesh Chaturthi",
		day: "Mon"
	},
	{
		date: "2026-10-02",
		name: "Mahatma Gandhi Jayanti",
		day: "Fri"
	},
	{
		date: "2026-10-20",
		name: "Dussehra",
		day: "Tue"
	},
	{
		date: "2026-11-08",
		name: "Diwali Laxmi Pujan",
		day: "Sun",
		note: "Weekend · Muhurat trading"
	},
	{
		date: "2026-11-10",
		name: "Diwali-Balipratipada",
		day: "Tue"
	},
	{
		date: "2026-11-24",
		name: "Guru Nanak Jayanti",
		day: "Tue"
	},
	{
		date: "2026-12-25",
		name: "Christmas",
		day: "Fri"
	}
];
function istYmd(d = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(d);
}
function nseHolidayOn(date = istYmd()) {
	return NSE_HOLIDAYS_2026.find((h) => h.date === date);
}
function upcomingNseHolidays(from = istYmd(), limit = 6) {
	return NSE_HOLIDAYS_2026.filter((h) => h.date >= from).slice(0, limit);
}
function nseSession() {
	const holiday = nseHolidayOn();
	if (holiday) return {
		open: false,
		label: `NSE holiday · ${holiday.name}`
	};
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Asia/Kolkata",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(/* @__PURE__ */ new Date());
	const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
	const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
	const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
	const mins = hour * 60 + minute;
	const weekdayOpen = !["Sat", "Sun"].includes(weekday);
	const open = weekdayOpen && mins >= 555 && mins <= 930;
	const next = upcomingNseHolidays()[0];
	if (open) return {
		open: true,
		label: "NSE open · 9:15–15:30 IST"
	};
	if (!weekdayOpen) return {
		open: false,
		label: next ? `NSE closed · weekend · next holiday ${next.name}` : "NSE closed · weekend"
	};
	return {
		open: false,
		label: next ? `NSE closed · next holiday ${next.date.slice(8)}/${next.date.slice(5, 7)} ${next.name}` : "NSE closed"
	};
}
//#endregion
export { displayTicker as a, googleFinanceSearchUrl as c, nseSession as d, searchUniverse as f, MARKET_LISTS as i, googleNewsUrl as l, DEFAULT_WATCHLIST as n, findCompany as o, upcomingNseHolidays as p, INDICES as r, googleFinanceQuoteUrl as s, COMPANIES as t, googleSearchUrl as u };
