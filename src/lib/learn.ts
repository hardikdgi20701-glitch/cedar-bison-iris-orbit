export type Article = {
  slug: string;
  title: string;
  kicker: string;
  minutes: number;
  image?: string;
  body: string[];
  terms?: { term: string; meaning: string }[];
  takeaways?: string[];
  example?: { title: string; lines: string[] };
};

export const ARTICLES: Article[] = [
  {
    slug: "what-is-a-share",
    title: "What is a share? (absolute beginner)",
    kicker: "Basics",
    minutes: 6,
    image: "/media/share.jpg",
    body: [
      "A share (also called a stock or equity) is a tiny piece of a company. If a company has 100 shares and you own 1, you own 1% of that company. In real life companies have crores of shares, so your piece is usually very small.",
      "When you buy a share, you are not depositing money in a bank. You are buying something whose price can go up or down every market day. Nobody — not SEBI, not the exchange, not the app — promises you a profit.",
      "You make money in two simple ways: (1) the price rises and you sell later for more than you paid (capital gain), or (2) the company pays a dividend (a share of profits). You can also lose money if the price falls.",
      "Shares in India trade mainly on NSE and BSE during market hours (about 9:15 am to 3:30 pm IST, Monday–Friday, except holidays). After hours you can place orders, but they wait until the next session.",
      "You do not need to pick individual stocks on day one. Many beginners start with a mutual fund SIP that already holds many companies for them.",
    ],
    terms: [
      { term: "Share / stock", meaning: "A unit of ownership in a company." },
      { term: "Price", meaning: "What buyers and sellers last agreed to pay, in rupees." },
      { term: "Dividend", meaning: "Optional cash the company may pay to shareholders. Not guaranteed." },
      { term: "Capital gain / loss", meaning: "Profit or loss when you sell at a different price than you bought." },
    ],
    takeaways: [
      "A share is ownership, not a savings deposit.",
      "Price can fall. You can lose money.",
      "You do not have to pick stocks first — funds are a gentler start.",
    ],
    example: {
      title: "Tiny example (illustrative only)",
      lines: [
        "You buy 2 shares of a company at ₹100 each → you spent ₹200.",
        "If the price becomes ₹110, your holding is worth ₹220 (unrealised gain ₹20).",
        "If the price becomes ₹90, your holding is worth ₹180 (unrealised loss ₹20).",
        "You only lock the gain or loss when you sell. Until then it is just a number on the screen.",
      ],
    },
  },
  {
    slug: "what-is-a-sip",
    title: "What a SIP actually does with your ₹500",
    kicker: "Basics",
    minutes: 6,
    image: "/media/sip.jpg",
    body: [
      "A Systematic Investment Plan (SIP) invests a fixed amount on a fixed date, usually into a mutual fund. You are not trying to guess the perfect day to buy. You buy more units when prices are low and fewer when prices are high. That habit is called rupee-cost averaging.",
      "Think of it like a recurring UPI payment — except the money buys fund units instead of paying a bill. ₹500, ₹1,000 or ₹2,000 a month is a normal student start. The amount should be money you will not miss on a bad month.",
      "A SIP is not a loan, not a lock-in (except tax-saving ELSS funds, which lock for 3 years), and not a guaranteed-return product. You can pause or stop it. The value of units can fall.",
      "Mutual funds pool money from many people and buy a basket of stocks or bonds. An index fund simply copies an index such as Nifty 50. You still need a real app (Groww, Coin, MF Central, a bank) to start a SIP — PlanVista only teaches and plans. It does not invest for you.",
    ],
    terms: [
      { term: "SIP", meaning: "A standing instruction to invest a fixed rupee amount on a schedule." },
      { term: "Unit", meaning: "A slice of the mutual fund. NAV × units = your current value." },
      { term: "NAV", meaning: "Net Asset Value — the per-unit price of the fund, usually updated once a day." },
      { term: "Rupee-cost averaging", meaning: "Buying more units when NAV is low and fewer when NAV is high." },
    ],
    takeaways: [
      "SIP = habit + time, not a magic profit machine.",
      "Start small enough that you will not raid it for a weekend trip.",
      "You can pause. You cannot demand a guaranteed return.",
    ],
    example: {
      title: "₹2,000 a month for 5 years (illustrative 11% annualised — not a forecast)",
      lines: [
        "Your money in: 2,000 × 12 × 5 = ₹1,20,000.",
        "If markets grew at an illustrative 11% a year, the pot might be near ₹1.6 lakh.",
        "If markets were weak, the pot could be less than ₹1.2 lakh. That is the risk.",
        "The extra (or the shortfall) is market movement, not a bank interest credit.",
      ],
    },
  },
  {
    slug: "nifty-sensex",
    title: "Nifty, Sensex and why the TV shouts numbers",
    kicker: "Markets",
    minutes: 5,
    image: "/media/desk.jpg",
    body: [
      "Sensex (BSE) and Nifty 50 (NSE) are indices — scoreboards of large Indian companies. When someone says “the market is up”, they usually mean one of these scoreboards rose today.",
      "Nifty 50 is 50 large companies. Sensex is 30. They move in the same direction most days, but not always by the same percent. A 1% move on Nifty is a big day; 2% is a very loud day.",
      "The index is not a stock you hold by default. To “buy the Nifty” you typically buy a Nifty index fund or ETF. That fund holds the same companies in similar weights.",
      "Your personal portfolio can go up on a day Nifty is down, and the other way around — especially if you hold mid-caps, gold, or debt. Always look at your own goal, not only the ticker on TV.",
    ],
    terms: [
      { term: "Index", meaning: "A calculated average of selected stocks. A scoreboard, not a company." },
      { term: "Nifty 50", meaning: "NSE’s 50-stock large-cap index." },
      { term: "Sensex", meaning: "BSE’s 30-stock large-cap index." },
      { term: "ETF", meaning: "A fund that trades on the exchange like a stock, often tracking an index." },
    ],
    takeaways: [
      "TV numbers are the market’s mood, not your personal report card.",
      "You do not own Nifty unless you buy a product that tracks it.",
      "One red day is normal. A plan is measured in years.",
    ],
  },
  {
    slug: "goal-based-vs-random",
    title: "Why every SIP needs a job",
    kicker: "Planning",
    minutes: 5,
    image: "/media/sip.jpg",
    body: [
      "A nameless SIP is easy to raid for a weekend trip. A SIP labelled “semester fees 2029” is harder to break. Goal-based investing assigns each rupee a date, an amount, and a risk level.",
      "Short goals (under 3 years) should not sit in pure equity. Markets can stay down for a year. Long goals (7+ years) can hold more equity because you have time to recover from a bad year.",
      "Mixing a laptop-next-year goal and a 10-year study-abroad goal in one fund is messy: you may sell the long-term units when a short bill arrives. Separate sleeves keep you honest.",
      "PlanVista maps each goal to its own SIP size and mix so you can see if the plan fits your monthly surplus before you open a real folio.",
    ],
    terms: [
      { term: "Goal", meaning: "A named future spend with a date and a rupee amount." },
      { term: "Horizon", meaning: "How many years until you need the money." },
      { term: "Surplus", meaning: "Income minus must-pay expenses — the only money that should SIP." },
    ],
    takeaways: [
      "Name the job: fees, emergency, laptop, retirement seed.",
      "Short calendar → safer mix. Long calendar → more growth assets allowed.",
      "Do not mix next-semester money with 10-year money.",
    ],
    example: {
      title: "Two different jobs",
      lines: [
        "Emergency ₹1.2 lakh in 18 months → mostly liquid / debt. Equity is optional and small.",
        "Study-abroad seed in 8 years → can hold more equity index funds.",
        "Same person, two SIPs, two risk levels. That is the point.",
      ],
    },
  },
  {
    slug: "inflation-is-the-silent-fee",
    title: "Inflation is the fee nobody invoices",
    kicker: "Inflation",
    minutes: 5,
    image: "/media/desk.jpg",
    body: [
      "A ₹80,000 laptop today is not ₹80,000 in 18 months. Education costs in India have often run above general CPI (the official inflation number). If you plan in today’s rupees and ignore inflation, your SIP will be too small.",
      "Even 6% inflation halves the buying power of idle cash in about 12 years. A 3% savings account that feels “safe” can still lose to fees that rise at 7–8%.",
      "PlanVista inflates the goal first, then solves for the monthly amount. If the number shocks you, that is useful: extend the date, step up the SIP when income rises, or shrink the goal.",
    ],
    terms: [
      { term: "Inflation", meaning: "Prices of the same things rising over time." },
      { term: "CPI", meaning: "Consumer Price Index — a government measure of average inflation." },
      { term: "Real return", meaning: "Return after subtracting inflation. The number that actually grows buying power." },
    ],
    takeaways: [
      "Always inflate the goal before calculating the SIP.",
      "Cash feels safe but can lose buying power.",
      "If the SIP does not fit your surplus, change the goal — do not wish the maths away.",
    ],
    example: {
      title: "Laptop at 6% inflation",
      lines: [
        "Today’s price: ₹80,000.",
        "In 2 years at 6%: about ₹89,900.",
        "If you saved only ₹80,000, you are ~₹10,000 short — before any market wobble.",
      ],
    },
  },
  {
    slug: "risk-for-students",
    title: "Risk when you have more time than money",
    kicker: "Risk",
    minutes: 6,
    image: "/media/stoploss.jpg",
    body: [
      "Risk, for a beginner, is simple: the chance that the money is worth less than you put in when you need it. Students usually have a long career ahead and a small corpus. A 20% drop on ₹10,000 feels loud (₹2,000) but is not life-ending. A 20% drop the week before you must pay fees is a real problem.",
      "Match risk to the calendar. Emergency and near-term fees → debt / liquid. Five-year-plus goals can hold more equity. “I can take risk” is not the same as “I need this money in 4 months”.",
      "The other big risk is doing nothing: sitting in a 3% savings account while education inflates at 7%. That quiet gap is also a loss of buying power.",
      "The quizzes in PlanVista are teaching tools, not a SEBI-registered risk profile. When you invest for real, complete the fund house or adviser questionnaire.",
    ],
    terms: [
      { term: "Volatility", meaning: "How much the value jumps around. Jumps ≠ guaranteed loss, but they feel like it." },
      { term: "Capacity", meaning: "Can you afford a drop without missing rent or fees?" },
      { term: "Willingness", meaning: "Can you sleep if the screen is red for a month?" },
    ],
    takeaways: [
      "Near-term money: keep it boring.",
      "Long-term money: a bumpy ride is normal.",
      "Never invest the rent, the fee, or the emergency stash in stocks.",
    ],
  },
  {
    slug: "index-funds-first",
    title: "Why an index fund is a good first SIP",
    kicker: "Funds",
    minutes: 6,
    image: "/media/share.jpg",
    body: [
      "A Nifty 50 or Nifty 500 index fund (direct plan) copies the index at a low expense ratio. You skip “star manager” risk and the urge to switch funds every year because last year’s rank changed.",
      "Direct plans cut the distributor commission. Over 10 years that 0.5–1% gap compounds. You still need a real account — PlanVista does not transact.",
      "Index funds can still fall. In 2020 and in other corrections, Nifty dropped sharply and later recovered — but “later” can be months or years. That is why horizon matters.",
      "Categories in the planner (equity / hybrid / debt / gold) are sleeves, not a buy-list. Always read the scheme information document. Past returns are not a promise.",
    ],
    terms: [
      { term: "Index fund", meaning: "A fund that aims to copy an index, not beat it." },
      { term: "Direct plan", meaning: "You buy from the fund house / app without distributor commission in the expense ratio." },
      { term: "Expense ratio", meaning: "Annual fee the fund charges, already taken from NAV." },
    ],
    takeaways: [
      "Simple, cheap, diversified is a strong first setup.",
      "Low cost still does not mean no loss.",
      "Read the document. Ignore last year’s trophy ads.",
    ],
  },
  {
    slug: "step-up-sip",
    title: "Step-up SIPs: let your stipend do the heavy lifting",
    kicker: "Tactics",
    minutes: 4,
    image: "/media/sip.jpg",
    body: [
      "A 10% annual step-up means this year’s ₹2,000 becomes ₹2,200 next year. That often matches an internship or placement hike and cuts the starting SIP needed for a far-off goal.",
      "Year one you put in ₹24,000. Year two, if you stepped up, you put in ₹26,400. The picture in this lesson shows those deposits adding up. It is money leaving your account, not a return the market owes you.",
      "If you cannot commit to a step-up, plan a flat SIP. A missed step-up is not a failure — recalculate. Consistency beats an aggressive schedule you abandon in exam season.",
    ],
    takeaways: [
      "Raise the SIP when income rises, not when a reel tells you to.",
      "A smaller SIP you keep is better than a large one you stop.",
    ],
    example: {
      title: "Flat vs 10% step-up (habit illustration, not a return forecast)",
      lines: [
        "Flat ₹2,000 for 5 years → ₹1,20,000 of your money.",
        "Start ₹2,000 and step up 10% each year → you contribute more in later years when you may earn more.",
        "The market return is a separate, uncertain layer on top of whatever you put in.",
      ],
    },
  },
  {
    slug: "how-to-read-candles",
    title: "How to read candlestick charts (without the hype)",
    kicker: "Charts",
    minutes: 8,
    image: "/media/candles.jpg",
    body: [
      "A candlestick is a drawing of four prices for one period (a day, an hour, a week): Open, High, Low, Close — OHLC. You do not need candles to start a SIP. You need them only if you look at stock charts.",
      "The thick part is the body (open to close). The thin lines are wicks (the extreme high and low). Green usually means close was higher than open (buyers won that period). Red means close was lower than open (sellers won).",
      "A long lower wick: price dipped, then buyers pushed it back up — possible support, not a buy button. A long upper wick: price spiked, then sellers pushed it down — possible resistance. A tiny body (doji) means indecision.",
      "Patterns (hammer, engulfing, shooting star) describe what already happened. They do not promise what happens next. Volume (how many shares traded) adds context: a move on tiny volume is weaker than the same move on heavy volume.",
      "If you remember one rule: a candle is a history lesson, not a fortune cookie. Pair any chart idea with a written stop-loss and a position size you can afford to be wrong on.",
    ],
    terms: [
      { term: "Open", meaning: "First traded price of the period." },
      { term: "High / Low", meaning: "Highest and lowest traded prices in the period." },
      { term: "Close", meaning: "Last traded price of the period. The number most people quote." },
      { term: "Wick / shadow", meaning: "The thin line showing the extreme high or low." },
    ],
    takeaways: [
      "OHLC = the whole story of that bar. Close is only the ending.",
      "Green / red is that period’s result, not a prediction.",
      "Do not trade a pattern you cannot explain in one sentence.",
    ],
    example: {
      title: "One day, four numbers",
      lines: [
        "Open ₹100, High ₹108, Low ₹97, Close ₹105 → green candle, upper wick to 108, lower wick to 97.",
        "Buyers finished ahead, but sellers did test ₹97. That dip is the lower wick.",
        "This does not tell you what Monday will do.",
      ],
    },
  },
  {
    slug: "stop-loss-and-target",
    title: "Stop-loss, target, buy and sell — the trade plan basics",
    kicker: "Risk",
    minutes: 7,
    image: "/media/stoploss.jpg",
    body: [
      "If you ever buy an individual stock (many beginners never need to), write three numbers before you tap Buy: entry, stop-loss, target.",
      "Stop-loss: the price where you admit the idea was wrong and exit to limit the loss. It is not a guarantee — the price can gap through your stop. Target: the price where you planned to take profit. Risk-reward example: risk ₹5 to aim for ₹10.",
      "Buy and Sell on a broker app place orders. A market order fills at the available price (can slip). A limit order waits for your price (might not fill). Delivery means you take shares home to demat. Intraday means you must square off the same day — higher stress, not a beginner sport.",
      "Paper-trade first (fake money). Never risk rent, fees, or emergency cash. Past performance is not indicative of future results.",
    ],
    terms: [
      { term: "Stop-loss", meaning: "Pre-decided exit to cap a loss." },
      { term: "Target", meaning: "Pre-decided exit to take a profit." },
      { term: "Market order", meaning: "Buy/sell now at whatever price is available." },
      { term: "Limit order", meaning: "Buy/sell only at your price or better." },
      { term: "Delivery", meaning: "You actually own the shares in your demat." },
    ],
    takeaways: [
      "No stop + no target = hope, not a plan.",
      "Beginners: prefer delivery and funds over intraday.",
      "Position size so that a full stop-loss still lets you sleep.",
    ],
    example: {
      title: "A written plan (illustration, not a recommendation)",
      lines: [
        "Buy idea: ₹100. Stop-loss: ₹95 (risk ₹5 per share). Target: ₹110 (reward ₹10).",
        "Risk-reward = 1:2. If you can only afford to lose ₹500, you buy at most 100 shares (100 × ₹5).",
        "If it hits ₹95, you exit. You do not “wait for it to come back” without a new plan.",
      ],
    },
  },
  {
    slug: "using-chart-gpt",
    title: "How to talk to Chart GPT (so it actually teaches)",
    kicker: "Chart GPT",
    minutes: 5,
    image: "/media/candles.jpg",
    body: [
      "Chart GPT is a chart classroom that sits on a live (or last-close) snapshot. It can see the last price, the day’s high and low, volume and a strip of recent closes. It cannot see your demat, your uncle’s WhatsApp tip, or the future.",
      "Ask it to explain a picture, not to pick a stock. ‘Aaj ka candle kaise padhun?’ is a good question. ‘Reliance buy karu kya, target kya hai?’ is a bad one — it will refuse, then show you how a stop-loss is written instead. That refusal is the product, not a bug.",
      "Stay on one name while you chat. If you jump from Nifty to a random small-cap mid-sentence, the snapshot in its head is no longer the chart on your screen. Use the chips on the Chart GPT page to switch, then start a fresh question.",
      "Useful follow-ups: wick vs body, trend vs noise, support vs a wall, volume vs a sleepy tape, 1-day vs 1-year. Useless follow-ups: sure-shot calls, option tips, ‘guaranteed 2% a week’.",
      "If the desk cannot reach the language model, Chart GPT still answers from the same teaching notes and the same numbers. You should get a readable reply either way — never a blank box.",
    ],
    terms: [
      { term: "Snapshot", meaning: "The delayed last print Chart GPT is allowed to cite. Not a live tick, not a forecast." },
      { term: "Teaching note", meaning: "An explanation of how to read a chart. Not a recommendation." },
      { term: "Refuse", meaning: "What Chart GPT must do when you ask it to buy or sell." },
    ],
    takeaways: [
      "Teach, don’t pick: ask ‘how do I read this?’",
      "One symbol per chat so the numbers stay honest.",
      "A refused buy call is Chart GPT doing its job.",
    ],
    example: {
      title: "Prompts that work",
      lines: [
        "“Is close din ke high ke paas hai ya low ke paas? Usse kya seekhein?”",
        "“Is window pe trend up hai, down hai, ya sideways?”",
        "“Agar main kabhi stock kharidun, 3% stop-loss ka matlab kya hua?”",
        "Not: “Kal 2% mil jayega kya?”",
      ],
    },
  },
  {
    slug: "which-timeframe",
    title: "1-day vs 1-year: which chart should you even look at?",
    kicker: "Charts",
    minutes: 6,
    image: "/media/candles.jpg",
    body: [
      "A chart is a question in picture form. The timeframe is the question. If you mix them up, you will take a 5-year fee goal and manage it like a 15-minute cricket over.",
      "1D / 5D: ‘What did the last session do?’ This is where candles earn their keep — body, wicks, high, low. Useful for learning to read. Useless for deciding whether next semester’s fees are funded.",
      "1M / 6M: the recent mood. Earnings, a budget, a rate decision often live here. Still a mood, not a plan.",
      "1Y / 5Y: where the name actually came from. A stock that looks ‘cheap’ after two red days may still be expensive on a five-year line — or the other way around. This is the student default if you insist on looking at an individual name.",
      "Intraday minutes and futures: a sport. They need capital, time, and a written plan you will actually follow. They are not a beginner classroom and Chart GPT will not coach you into them.",
      "If you came to the chart because of a SIP: you may not need the chart at all. A Nifty index-fund SIP does not care whether today’s 2-minute candle was a hammer.",
    ],
    terms: [
      { term: "Timeframe", meaning: "The length of time each bar represents, and how much history the window shows." },
      { term: "Noise", meaning: "Movement that does not change the plan. Most 1-day wiggles are noise for a 7-year goal." },
    ],
    takeaways: [
      "Match the chart to the question, not to the adrenaline.",
      "SIP / goal money: years. Chart class: days are optional.",
      "Intraday is a sport. Sit it out until the boring habits are real.",
    ],
    example: {
      title: "Same Nifty, three questions",
      lines: [
        "1D: ‘Did buyers or sellers win Friday’s bar?’ — a reading exercise.",
        "1Y: ‘Did this index grind up, chop, or drop over the last twelve months?’ — context.",
        "Goal: ‘Do I need this money in 11 months for fees?’ — if yes, the chart is the wrong room. Use debt / liquid, not a vibe.",
      ],
    },
  },
  {
    slug: "indicators-later",
    title: "RSI, MACD and why you can ignore them at first",
    kicker: "Charts",
    minutes: 5,
    image: "/media/desk.jpg",
    body: [
      "Beginner charts on YouTube are often covered in RSI, MACD, Supertrend, Bollinger bands and three moving averages in different colours. That is decoration on top of a guess if you cannot yet read Open, High, Low, Close.",
      "RSI (relative strength index) asks how stretched a move is. A high RSI is not automatically ‘sell’. A low RSI is not automatically ‘buy’. Markets can stay stretched. MACD is two moving averages arguing with each other — useful later, noisy now.",
      "A 50-day or 200-day moving average is simpler: it is the average of past closes. It lags on purpose so you can see drift. Price above a rising 200-day line is a common cartoon of a long-term uptrend. Cartoons fail. Do not treat a crossover as a buy alarm.",
      "Chart GPT will explain these if you ask, then send you back to OHLC, volume and a written stop. That order is the lesson: picture first, ornaments later. No secret RSI setting prints money.",
    ],
    terms: [
      { term: "Indicator", meaning: "A calculated overlay on price. A lens, not a crystal ball." },
      { term: "Lag", meaning: "Averages react after price has already moved. That is a feature when you want less noise." },
    ],
    takeaways: [
      "If you cannot read a candle, skip the oscillators.",
      "A crossover is not a buy alarm.",
      "OHLC + volume + a written stop beat a busy screenshot.",
    ],
  },
  {
    slug: "bull-vs-bear",
    title: "Bull and bear markets — what the animals mean",
    kicker: "Markets",
    minutes: 5,
    image: "/media/bull.jpg",
    body: [
      "A bull market is a stretch of generally rising prices and optimism. A bear market is a stretch of generally falling prices and pessimism. People often call a 20%+ fall from a peak a bear market. These are descriptions after the fact, not a siren that rings on day one.",
      "On PlanVista, a Bull label and green number mean the last trade / day’s change was positive. Bear and red mean it was negative. That is only the latest move — not a forecast, not a buy or sell call.",
      "Both animals can be in the room at once: large-caps up, small-caps down. Always check more than one index if you can.",
      "A SIP does not need you to name the animal. In a falling stretch you buy more units for the same rupees, if the money is for a date years away and you can leave it alone. If you need the cash this year, a bear label is a reason to keep that money out of equity, not a reason to “buy the dip” with fees.",
    ],
    terms: [
      { term: "Bull", meaning: "Prices generally rising, or (on this site) the last change was up." },
      { term: "Bear", meaning: "Prices generally falling, or (on this site) the last change was down." },
      { term: "Correction", meaning: "A noticeable drop (often ~10%) that may or may not become a bear market." },
    ],
    takeaways: [
      "Green today ≠ “buy”. Red today ≠ “sell everything”.",
      "Labels describe the last move. Your goal date matters more.",
      "A SIP in a bear market buys more units — if you can stay the course.",
    ],
  },
  {
    slug: "reading-market-stats",
    title: "Reading market stats: volume, PE, delivery %",
    kicker: "Stats",
    minutes: 7,
    image: "/media/desk.jpg",
    body: [
      "Volume is how many shares traded. A rising price on rising volume is a stronger story than a rising price on sleepy volume. Delivery % is how much of that volume was actually taken into demat (not squared off the same day). High delivery can mean longer-term hands; it is still not a crystal ball.",
      "PE (price-to-earnings) = price ÷ earnings per share. A high PE can mean “people expect growth” or “the stock is expensive”. A low PE can mean “cheap” or “the business is in trouble”. Always compare with the same sector and with the stock’s own history.",
      "Market cap = price × number of shares. Large-cap (Nifty types) are usually less jumpy than small-caps. Jumpier is not “better” — it is riskier.",
      "FII/DII flows, put-call ratio and open interest are extra layers for active traders. For a student SIP, asset allocation and the goal date beat daily stats.",
    ],
    terms: [
      { term: "Volume", meaning: "Number of shares that changed hands." },
      { term: "Delivery %", meaning: "Share of trades that were not intraday square-off." },
      { term: "PE", meaning: "Price divided by earnings. A valuation snapshot, not a grade." },
      { term: "Market cap", meaning: "What the whole company is worth at today’s price." },
    ],
    takeaways: [
      "One statistic is a clue, not a decision.",
      "Compare PE with peers, not with a magic number from a reel.",
      "SIP investors: check stats monthly, not every hour.",
    ],
  },
  {
    slug: "how-to-read-graphs",
    title: "Line charts, bar charts and what axes really mean",
    kicker: "Charts",
    minutes: 6,
    image: "/media/candles.jpg",
    body: [
      "A line chart connects closing prices over time — the simplest trend view. A bar or candlestick chart adds open, high and low. For multi-year views, a log scale makes percentage moves look fairer (a jump from 1,000 to 2,000 looks like 100 to 200).",
      "X-axis is time (days, months, years). Y-axis is price or index level. Volume is often a bar chart under the price. A 50-day or 200-day moving average is just an average of past closes — it lags, which is the point: it smooths noise.",
      "Support and resistance are zones where price paused before. They are not walls. Prices break them all the time. A “breakout” that fails is called a false breakout — common, and why stops exist.",
    ],
    terms: [
      { term: "X-axis", meaning: "Time." },
      { term: "Y-axis", meaning: "Price or index level." },
      { term: "Moving average", meaning: "Average of past prices; a smoother, slower line." },
      { term: "Support / resistance", meaning: "Zones where price previously paused. Not guarantees." },
    ],
    takeaways: [
      "Read the axes first, then the pretty line.",
      "Zoom out. One hour of noise is not a 5-year plan.",
      "A graph without a stop-loss is entertainment.",
    ],
  },
  {
    slug: "demat-and-orders",
    title: "Demat, trading account and your first order",
    kicker: "Accounts",
    minutes: 6,
    image: "/media/demat.jpg",
    body: [
      "To hold shares in India you need a demat account (like a locker for securities) plus a trading account (the window that sends orders to the exchange). Mutual fund SIPs can also run through MF platforms with a folio — slightly different paperwork, same idea: you must be KYC-compliant.",
      "KYC typically needs PAN, Aadhaar, a bank account and in-person or video verification. You must be 18+. This is the law, not a website gimmick. PlanVista’s document step is only a prototype simulation.",
      "Settlement is T+1 for most stocks: you pay today, shares show in demat the next working day (details can change with exchange rules). Do not spend money you have not received.",
      "Brokerage, DP charges, STT, GST and stamp duty are real costs. Read the broker’s tariff. Cheap brokerage is not a reason to over-trade.",
    ],
    terms: [
      { term: "Demat", meaning: "Electronic locker where your shares sit." },
      { term: "Trading account", meaning: "The account that places buy/sell orders." },
      { term: "KYC", meaning: "Know Your Customer — identity checks required by regulation." },
      { term: "Folio", meaning: "Your mutual-fund account number with a fund house." },
    ],
    takeaways: [
      "18+ and KYC are mandatory for real investing.",
      "Demat holds shares; the trading window sends orders.",
      "Costs eat frequent traders. Beginners: few, planned actions.",
    ],
  },
  {
    slug: "first-mistakes",
    title: "Ten beginner mistakes (and the boring fix)",
    kicker: "Habits",
    minutes: 6,
    image: "/media/mistakes.jpg",
    body: [
      "Most first-year damage is not “the market”. It is behaviour. Here are the usual traps, in plain language.",
      "1) Investing rent money. 2) Copying a Telegram/WhatsApp tip. 3) Buying because it is already up 30% this week. 4) Selling a long-term SIP because one red week felt personal. 5) Using intraday or futures on day one. 6) Ignoring costs. 7) No emergency fund. 8) Mixing all goals in one fund. 9) Believing “guaranteed 2% a week”. 10) Checking the app 40 times a day.",
      "Read them as a list in the picture above, one line at a time. The damage is usually the size of the bet and the missing written stop, not a secret the market hid from you.",
      "The boring fix: write the goal, pick a boring index/debt mix, automate a small SIP, keep 2–3 months of expenses in liquid money, and log off. Review once a month, not once an hour.",
    ],
    takeaways: [
      "If it promises guaranteed high returns, walk away.",
      "Tips are marketing. Your written plan is the product.",
      "Boredom is a feature of a good beginner setup.",
    ],
  },
  {
    slug: "sebi-guidelines-basics",
    title: "SEBI guidelines every learner should know",
    kicker: "Compliance",
    minutes: 6,
    image: "/media/sebi.jpg",
    body: [
      "SEBI (Securities and Exchange Board of India) regulates the securities market. Unregistered investment advice, guaranteed-return claims and paid “tips” are illegal. If someone DMs you a sure-shot stock for a fee, that is a red flag.",
      "Investment advisers and research analysts must be registered. Mutual fund distributors follow different rules. An education site (like this prototype) must not send orders to a broker or tell you “buy this, sell that” as personal advice. The paper desk fills practice orders with imaginary cash only.",
      "Mandatory spirit of every disclosure: you can lose capital; past performance is not indicative of future results; read the offer document. Free official material lives at investor.sebi.gov.in and the NSE/BSE investor pages.",
      "Complaints can go through SCORES (SEBI’s complaint system) and exchange grievance cells. Keep contract notes and statements.",
    ],
    terms: [
      { term: "SEBI", meaning: "The market regulator in India." },
      { term: "Registered adviser", meaning: "A person/firm allowed to give personal investment advice for a fee, under SEBI rules." },
      { term: "SCORES", meaning: "SEBI’s online complaint portal." },
    ],
    takeaways: [
      "No one legally promises stock-market returns.",
      "Education ≠ advice. Practice fills never leave this browser.",
      "Use official SEBI / exchange channels if something smells wrong.",
    ],
  },
  {
    slug: "position-size",
    title: "Position size: how many shares, not which share",
    kicker: "Expert",
    minutes: 6,
    image: "/media/stoploss.jpg",
    body: [
      "Experts do not start with a stock tip. They start with a number they can afford to lose, then a stop, then the share count that makes that loss the maximum.",
      "Formula: quantity = risk rupees ÷ (entry − stop). If you will risk ₹5,000 and the stop is ₹10 away, you buy 500 shares — not “as many as the app allows”. If the cash cannot cover that size, you buy fewer, you do not move the stop.",
      "On the paper desk, type a stop (or click the chart), set the rupee risk, and tap Size qty. The button does this arithmetic for practice cash. It is not a suggestion to buy the name on the screen.",
      "A 3% stop and a 1:2 target are classroom defaults so you can see the lines. They are not a system. Change them only when you can say, in one sentence, why the idea is wrong at that price.",
    ],
    terms: [
      { term: "Risk per share", meaning: "The distance from your entry to your stop, in rupees." },
      { term: "Position size", meaning: "How many shares make that distance equal your planned loss." },
      { term: "1:2", meaning: "You aim to make twice what you are willing to lose. Still not a promise." },
    ],
    takeaways: [
      "Size comes from the stop, not from excitement.",
      "If the maths says 4 shares, buy 4. Do not round up to feel serious.",
      "Practice this on the paper desk before any real account.",
    ],
    example: {
      title: "₹5,000 risk",
      lines: [
        "Last print ₹250. Stop ₹240. Risk per share = ₹10.",
        "₹5,000 ÷ ₹10 = 500 shares. Order value = ₹1,25,000 of practice cash.",
        "If the stop is hit, the planned loss is about ₹5,000. The target at 1:2 sits near ₹270.",
      ],
    },
  },
  {
    slug: "trade-journal",
    title: "The trade journal (the only edge a beginner can keep)",
    kicker: "Expert",
    minutes: 5,
    image: "/media/desk.jpg",
    body: [
      "A journal is a list of what you planned before the click, and what the market actually did after. Without it, every red day feels like a new story and every green day feels like skill.",
      "Write four things before you press Buy or Sell: the idea in one sentence, the entry, the stop, the target. After the fill, leave it alone. When it exits, write whether you followed the plan. That last line matters more than the profit.",
      "The paper desk keeps the fill, the price, and the stop you typed. That is the start of a journal, stored on this device. It is not a contract note and it is not sent to NSE.",
      "Review once a week, not after every candle. If you broke the stop “just this once”, that is the lesson. The chart did not betray you.",
    ],
    terms: [
      { term: "Plan", meaning: "Entry, stop, and target written before the order." },
      { term: "Fill", meaning: "The price the practice order actually got." },
      { term: "Review", meaning: "Did you follow the plan? Yes or no. Then stop." },
    ],
    takeaways: [
      "No written stop means there is nothing to journal.",
      "Score obedience, not just profit and loss.",
      "Practice fills stay in this browser. Reset the book when you want a clean week.",
    ],
  },
];

export const HEADLINES = [
  { title: "Nifty last close 23,398 — oil above $108 is the story, not a buy alarm", source: "Tape", time: "Fri close" },
  { title: "Sensex 74,782 after a 1,350-point slide: capital can go down", source: "Tape", time: "Fri close" },
  { title: "Rupee around 95.6 vs the dollar; gold near $4,409 / oz", source: "FX", time: "Weekend" },
  { title: "NSE/BSE shut for Ganesh Chaturthi — tape resumes Tuesday 16 Sep", source: "Calendar", time: "Holiday" },
  { title: "HDFC Bank ~₹708, Reliance ~₹1,258: Friday’s print, not a forecast", source: "Nifty", time: "Fri close" },
  { title: "SEBI’s investor-ed push: why campuses are the next classroom", source: "Campus Desk", time: "2h" },
  { title: "Direct plans vs regular: the 1% that compounds on student SIPs", source: "Explainers", time: "5h" },
  { title: "Bull vs bear: reading the last trade colour without FOMO", source: "Markets", time: "4h" },
];
