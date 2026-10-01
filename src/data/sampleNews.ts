import { NewsArticle } from '../types/news';

export const SAMPLE_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'fed-rates-2026',
    title: 'Federal Reserve Signals Pause on Benchmark Interest Rates Amid Moderating Core Inflation',
    source: 'Financial Times',
    author: 'Colby Smith & James Politi',
    publishedAt: '2026-10-01T08:15:00Z',
    url: 'https://ft.com/markets',
    imageUrl: '/src/assets/images/market_fed_rates_1790872483601.jpg',
    category: 'Economy',
    originalSnippet: 'Federal Reserve Chair stated that the Federal Open Market Committee (FOMC) will maintain the federal funds target range at 4.25%-4.50%, highlighting that quantitative tightening continues as headline PCE converges toward the 2% target.',
    originalText: `The Federal Open Market Committee concluded its two-day monetary policy summit today, voting unanimously to hold the benchmark federal funds target range steady at 4.25% to 4.50%. Fed policymakers noted that while labor market conditions remain broadly balanced with nonfarm payrolls showing resilient expansion, core Personal Consumption Expenditures (PCE) inflation has decelerated to 2.3% annualized.

Quantitative tightening continues at its measured pace, with the central bank rolling over maturing Treasuries and agency mortgage-backed securities within predetermined runoff caps. Fixed-income markets responded swiftly: the 10-year Treasury yield slipped four basis points to 4.02%, while swap markets trimmed the implied probability of an emergency rate reduction before year-end.

Chair Jerome Powell reiterated during the post-meeting press conference that policy trajectory remains strictly data-dependent: "We have made considerable progress toward our dual mandate of maximum employment and price stability. However, restrictive policy remains necessary until the committee achieves sufficient confidence that disinflation is durable across non-housing services."`,
    simplifiedSummary: 'The Federal Reserve decided not to raise or cut interest rates this month, keeping them at 4.25%–4.50%. Because inflation (the speed at which prices are going up) is cooling down toward normal levels, the Fed does not see an urgent need to make loans more expensive or cheaper right now.',
    keyTakeaways: [
      'The Federal Reserve kept interest rates unchanged at 4.25%–4.50%.',
      'Inflation is gradually dropping closer to the Fed\'s ideal 2% goal.',
      'Borrowing costs for home mortgages, auto loans, and credit cards will stay roughly where they are for now.',
      'Stock markets reacted calmly, and bond yields slightly declined.'
    ],
    importantTerms: [
      {
        term: 'Federal Reserve (The Fed)',
        explanation: 'The central bank of the United States that manages the country\'s money supply, interest rates, and financial stability.'
      },
      {
        term: 'Benchmark Interest Rate',
        explanation: 'The interest rate commercial banks pay each other to borrow money overnight; it acts as the baseline for all consumer and business loans.'
      },
      {
        term: 'Core Inflation / PCE',
        explanation: 'A measurement of how fast prices for goods and services are rising, ignoring volatile food and energy costs that fluctuate wildly.'
      },
      {
        term: 'Basis Points (bps)',
        explanation: 'A financial unit of measurement where 100 basis points equals 1 percentage point (e.g., 25 basis points = 0.25%).'
      }
    ],
    mainEvent: 'The US central bank held its benchmark interest rate steady.',
    whyItMatters: 'Interest rates directly dictate what everyday citizens and companies pay to borrow money for mortgages, cars, credit cards, and business expansion.',
    marketRelevance: 'Stability in rates gives businesses predictability, reducing stock market wild swings and stabilizing bond returns.',
    readTime: '2 min read',
    isAiSimplified: true
  },
  {
    id: 'ai-semiconductor-capex',
    title: 'Hyperscalers Escalate AI Chip Capital Expenditure to $210 Billion as Next-Gen Silicon Arrives',
    source: 'Bloomberg Markets',
    author: 'Ian King & Dina Bass',
    publishedAt: '2026-10-01T07:45:00Z',
    url: 'https://bloomberg.com/technology',
    imageUrl: '/src/assets/images/tech_ai_chips_1790872495584.jpg',
    category: 'Technology',
    originalSnippet: 'Major cloud providers have collectively revised upward their 2026 capital expenditure guidance, projecting over $210B in consolidated capex predominantly allocated to advanced high-bandwidth memory (HBM4) architectures and cutting-edge wafer foundry capacity.',
    originalText: `Global cloud computing hyperscalers including Microsoft, Alphabet, Amazon, and Meta collectively raised their 2026 capital expenditure forecasts to a historic $210 billion aggregate. The unprecedented deployment of capital is directed toward next-generation accelerated computing clusters featuring high-bandwidth memory (HBM4) modules and custom Application-Specific Integrated Circuits (ASICs).

Semiconductor foundry giants reported that capacity utilization for sub-3nm nodes remains oversubscribed into late 2027. Despite persistent investor scrutiny regarding return on invested capital (ROIC) and enterprise AI monetization timelines, hyperscaler leadership emphasized that under-investing presents a far greater existential hazard than over-provisioning infrastructure.

The news propelled the Philadelphia Semiconductor Index (SOX) upward by 2.4%, with suppliers of liquid cooling solutions and high-voltage grid infrastructure also experiencing aggressive trading volume.`,
    simplifiedSummary: 'The world\'s largest tech companies (like Microsoft, Google, Amazon, and Meta) announced they will spend a record $210 billion this year building data centers and buying AI microchips. They believe that not buying enough AI hardware is a bigger danger to their future than spending too much.',
    keyTakeaways: [
      'Tech giants are spending a record-breaking $210B on artificial intelligence hardware and data centers.',
      'Advanced chip factories are completely booked through 2027 to meet massive demand.',
      'Investors are watching closely to see when these huge multi-billion dollar investments will turn into actual profits.',
      'Semiconductor stock prices climbed higher following the news.'
    ],
    importantTerms: [
      {
        term: 'Capital Expenditure (Capex)',
        explanation: 'Money that a company spends on long-term physical assets, such as data centers, servers, buildings, and specialized machinery.'
      },
      {
        term: 'Hyperscalers',
        explanation: 'Giant cloud technology companies (like AWS, Google Cloud, and Microsoft Azure) that operate massive networks of computing infrastructure.'
      },
      {
        term: 'Semiconductors',
        explanation: 'Electronic microchips that power computers, smartphones, cars, and artificial intelligence systems.'
      },
      {
        term: 'Return on Invested Capital (ROIC)',
        explanation: 'A percentage measure of how efficiently a company generates profits from the money it has poured into its operations.'
      }
    ],
    mainEvent: 'Major tech corporations raised their budgets to buy computer chips and data centers to $210 billion.',
    whyItMatters: 'This massive wave of spending fuels jobs and profits throughout the technology and hardware supply chain.',
    marketRelevance: 'Drives gains in semiconductor and clean energy stocks while keeping pressure on tech companies to show commercial AI revenue.',
    readTime: '3 min read',
    isAiSimplified: true
  },
  {
    id: 'clean-energy-grid-transition',
    title: 'Global Energy Markets Pivot as Offshore Wind and Storage Projects Attract Record Institutional Inflows',
    source: 'Reuters Financial',
    author: 'Nina Chestney & Susanna Twidale',
    publishedAt: '2026-10-01T06:30:00Z',
    url: 'https://reuters.com/business/energy',
    imageUrl: '/src/assets/images/global_energy_market_1790872507334.jpg',
    category: 'Business',
    originalSnippet: 'Sovereign wealth funds and infrastructure asset managers funneled $64B into utility-scale battery storage and high-voltage direct current (HVDC) transmission interties during Q3, outpacing fossil fuel exploration financing.',
    originalText: `Institutional capital allocations to renewable energy grid modernization reached an all-time quarterly high of $64 billion during the third quarter. Leading pension funds, sovereign wealth managers, and private credit consortiums prioritized utility-scale battery energy storage systems (BESS) and high-voltage direct current (HVDC) subsea interties connecting offshore wind installations to high-demand metropolitan grids.

Crude benchmark Brent held stable near $76 per barrel, while natural gas futures experienced mild volatility due to storage replenishment rates in Northern Europe. Analysts at the International Energy Agency noted that grid transmission bottlenecks, rather than power generation capacity, have become the primary constraint determining clean energy project internal rates of return (IRR).

Infrastructure-focused exchange-traded funds (ETFs) reported net positive inflows for five consecutive weeks, signaling robust investor appetite for predictable, inflation-indexed yields backed by government regulatory frameworks.`,
    simplifiedSummary: 'Large global investment funds and pension systems invested $64 billion in green energy grids, mega-batteries, and offshore wind power during the last three months. Instead of merely building wind turbines, investors are now putting huge money into the high-tech transmission wires and storage batteries needed to bring that electricity into cities.',
    keyTakeaways: [
      'Huge institutional investors poured $64B into green energy and power grid upgrades in the last quarter.',
      'The biggest challenge today is not generating electricity, but having enough wires and batteries to transport and store it.',
      'Oil prices stayed relatively steady at around $76 a barrel despite shifting energy investments.',
      'Green infrastructure investments offer steady, government-backed returns that protect investors from inflation.'
    ],
    importantTerms: [
      {
        term: 'Institutional Investors',
        explanation: 'Large organizations like pension funds, insurance companies, and university endowments that manage billions of dollars on behalf of millions of people.'
      },
      {
        term: 'Sovereign Wealth Fund',
        explanation: 'A state-owned investment fund composed of money generated by the government, often from commodity revenues like oil or trade surpluses.'
      },
      {
        term: 'Utility-Scale Storage',
        explanation: 'Giant battery systems capable of storing excess electricity when the sun shines or wind blows, and releasing it into the grid when demand peaks.'
      },
      {
        term: 'Exchange-Traded Fund (ETF)',
        explanation: 'A basket of stocks or bonds that trades on an exchange just like an individual stock, giving investors easy diversification.'
      }
    ],
    mainEvent: 'Big investment funds committed $64 billion to modernizing electrical power grids and battery storage.',
    whyItMatters: 'Upgrading electrical power grids helps prevent blackouts and powers the surging demand for energy from electric cars and AI data centers.',
    marketRelevance: 'Creates consistent revenue for power equipment manufacturers, construction firms, and clean utility providers.',
    readTime: '2 min read',
    isAiSimplified: true
  },
  {
    id: 'fintech-open-banking-rules',
    title: 'Consumer Financial Protection Bureau Finalizes Open Banking Rules, Reshaping Retail Lending Competition',
    source: 'The Wall Street Journal',
    author: 'Rachel Louise Ensign',
    publishedAt: '2026-10-01T05:20:00Z',
    url: 'https://wsj.com/personal-finance',
    imageUrl: '/src/assets/images/banking_fintech_app_1790872518304.jpg',
    category: 'Banking',
    originalSnippet: 'Federal regulators issued the definitive rule under Dodd-Frank Section 1033, compelling depository institutions to provide secure API access for consumer financial data portability without imposing junk fees.',
    originalText: `The Consumer Financial Protection Bureau (CFPB) officially enacted long-anticipated standards governing personal financial data rights under Section 1033 of the Consumer Financial Protection Act. The rule requires commercial banks and credit unions with assets exceeding $850 million to establish standardized, secure Application Programming Interfaces (APIs) allowing account holders to port their transaction history, balance records, and recurring obligations to competing fintech platforms and lenders free of charge.

The regulatory shift eliminates vulnerable "screen scraping" credential practices in favor of tokenized, OAuth-authenticated data pipelines. Major regional banks voiced reservations regarding compliance overhead and cybersecurity liability, whereas consumer advocacy groups and challenger neo-banks praised the mandate for dismantling legacy deposit lock-in effects.

Analysts project the ruling will intensify competition for customer deposits, leading to higher annual percentage yields (APYs) on savings and lower loan underwriting spreads as consumers easily switch financial providers.`,
    simplifiedSummary: 'New government rules now force major banks to let you transfer your financial information easily and securely to modern budgeting apps, robo-investors, or rival lenders without paying fees. You now have legal ownership of your own financial history, making it much simpler to switch banks to get better interest rates or cheaper loans.',
    keyTakeaways: [
      'New "Open Banking" rules require banks to safely share your account data with other financial apps you authorize.',
      'Banks can no longer charge hidden fees to transfer or verify your financial data.',
      'Consumers will find it much easier to shop around for higher savings interest rates or cheaper credit cards.',
      'Increases competition between traditional brick-and-mortar banks and new mobile fintech apps.'
    ],
    importantTerms: [
      {
        term: 'Open Banking',
        explanation: 'A system where banks securely share your financial information with licensed third-party apps, but only when you give explicit permission.'
      },
      {
        term: 'API (Application Programming Interface)',
        explanation: 'A secure software bridge that lets two different computer programs communicate and share data safely without sharing your secret passwords.'
      },
      {
        term: 'Annual Percentage Yield (APY)',
        explanation: 'The real percentage rate of return you earn on your savings over one year, taking into account compounding interest.'
      },
      {
        term: 'Fintech (Financial Technology)',
        explanation: 'Digital tools, smartphone applications, and websites that automate and improve financial services like investing, banking, and payments.'
      }
    ],
    mainEvent: 'Government regulators issued rules requiring banks to share consumer banking data freely with authorized apps.',
    whyItMatters: 'You are no longer trapped at one bank; you can take your banking history to any provider that offers lower fees and higher interest.',
    marketRelevance: 'Benefits nimble fintech startups while putting margin pressure on traditional big banks that rely on low-yield deposits.',
    readTime: '3 min read',
    isAiSimplified: true
  },
  {
    id: 'sp500-earnings-broadening',
    title: 'S&P 500 Market Breadth Widens as Industrial and Healthcare Earnings Outpace Expectations',
    source: 'CNBC Pro',
    author: 'Michael Santoli',
    publishedAt: '2026-10-01T04:10:00Z',
    url: 'https://cnbc.com/investing',
    imageUrl: '/src/assets/images/hero_finnews_dashboard_1790872468723.jpg',
    category: 'Stock Market',
    originalSnippet: 'The equal-weighted S&P 500 benchmark outperformed the cap-weighted index by 85 bps today as mid-cap industrial cyclicals and medical device manufacturers posted resilient Q3 margins.',
    originalText: `Wall Street experienced a notable shift in market participation during Thursday\'s session as the S&P 500 Equal Weight Index gained 1.1%, significantly outpacing the market-cap-weighted benchmark\'s modest 0.25% advance. The widening of market breadth reflects robust earnings surprises across non-technology sectors, including aerospace manufacturing, commercial transportation, and healthcare diagnostics.

Over 78% of reporting companies in the industrial sector exceeded consensus EBITDA estimates, citing eased maritime freight costs, productivity automation gains, and stabilized supply chains. Simultaneously, defensive healthcare corporations exhibited pricing durability, mitigating investor anxieties regarding consumer discretionary slowdowns.

Equities strategists highlighted that a healthy, sustainable bull market relies on broad-based sector participation rather than an extreme concentration of capital in a handful of mega-cap technology leaders.`,
    simplifiedSummary: 'Stock market gains are finally spreading beyond just giant tech companies. Companies that build airplanes, manufacture medicines, and run freight trucks reported better-than-expected profits today, proving that different parts of the economy are doing well, not just Silicon Valley.',
    keyTakeaways: [
      'Industrial and healthcare companies reported higher profits than Wall Street predicted.',
      'The stock market rally is broadening: smaller and mid-sized companies are climbing faster than the tech giants.',
      'Lower shipping expenses and factory automation helped companies keep more of their revenues as profit.',
      'Financial analysts consider broad market participation a healthier sign for the economy.'
    ],
    importantTerms: [
      {
        term: 'Market Breadth',
        explanation: 'A metric showing how many individual stocks are participating in an overall market uptrend, rather than just 3 or 4 huge companies.'
      },
      {
        term: 'S&P 500 Equal Weight',
        explanation: 'An index version where every one of the 500 companies counts equally (0.2%), rather than the biggest companies dominating the score.'
      },
      {
        term: 'EBITDA',
        explanation: 'Earnings Before Interest, Taxes, Depreciation, and Amortization—a common way Wall Street evaluates a company\'s core operating profitability.'
      },
      {
        term: 'Bull Market',
        explanation: 'A financial market condition where prices are generally rising or expected to rise over an extended period of time.'
      }
    ],
    mainEvent: 'Stock market gains expanded broadly across healthcare and industrial companies beyond mega-cap tech.',
    whyItMatters: 'When more companies across multiple industries are making profits, the general economy is more resilient against sudden shocks.',
    marketRelevance: 'Suggests value stocks and cyclical manufacturing companies are attracting fresh investor cash.',
    readTime: '2 min read',
    isAiSimplified: true
  },
  {
    id: 'crypto-bitcoin-institutional-etf',
    title: 'Institutional Bitcoin Treasury Reserves Expand as Corporate Hedging Gains Regulatory Clarity',
    source: 'CoinDesk Institutional',
    author: 'Helene Braunn',
    publishedAt: '2026-10-01T03:00:00Z',
    url: 'https://coindesk.com/markets',
    imageUrl: '/src/assets/images/banking_fintech_app_1790872518304.jpg',
    category: 'Cryptocurrency',
    originalSnippet: 'Global asset managers registered $820M in net inflows into spot digital asset products this week as corporate treasury managers evaluate fair-value accounting standard implementations.',
    originalText: `Institutional participation in cryptocurrency markets demonstrated renewed momentum as spot digital asset exchange-traded products accumulated $820 million in net weekly inflows. The adoption curve is increasingly supported by the FASB\'s updated fair-value accounting guidelines, which allow corporate balance sheets to record digital assets at prevailing spot market valuations rather than recognizing only impairment write-downs.

Publicly traded corporations reported that adopting standardized institutional custody protocols and multi-signature cold storage infrastructure has lowered fiduciary compliance hurdles. Bitcoin traded near $88,400 with 30-day realized volatility declining to levels comparable to high-beta semiconductor equities.

Decentralized finance (DeFi) total value locked (TVL) also climbed 4.8% on the week, driven by tokenized real-world assets (RWAs) such as short-dated US Treasury bills yielding on-chain interest.`,
    simplifiedSummary: 'Big investment companies bought $820 million worth of Bitcoin this week. New accounting rules now make it much easier for regular public corporations to hold digital currencies on their balance sheets without suffering unfair accounting penalties. As a result, cryptocurrencies are acting more like standard mainstream financial assets.',
    keyTakeaways: [
      'Big institutional investors added $820 million into regulated Bitcoin funds this week.',
      'Accounting rules now let companies show the true market value of their digital holdings on quarterly reports.',
      'Bitcoin price volatility has decreased, behaving more like a standard high-growth technology stock.',
      'Tokenized US Treasury bonds on blockchains are gaining popularity among corporate treasurers.'
    ],
    importantTerms: [
      {
        term: 'Corporate Treasury',
        explanation: 'The department in a company that manages its cash, bank accounts, investments, and financial risk.'
      },
      {
        term: 'Fair-Value Accounting',
        explanation: 'An accounting method where assets are valued on financial balance sheets at current market prices rather than what they cost years ago.'
      },
      {
        term: 'Cold Storage / Custody',
        explanation: 'Keeping digital assets safely stored in offline hardware wallets completely disconnected from the internet to stop hackers.'
      },
      {
        term: 'Real-World Assets (RWAs)',
        explanation: 'Traditional physical or financial assets—like real estate, gold, or US Treasury bonds—represented as digital tokens on a blockchain.'
      }
    ],
    mainEvent: 'Corporate treasuries and institutional funds purchased $820M in regulated crypto investment products.',
    whyItMatters: 'Clearer rules mean digital assets are being treated like standard portfolio holdings rather than unregulated speculative bets.',
    marketRelevance: 'Provides liquidity and price support for the crypto sector while boosting custody fees for major financial institutions.',
    readTime: '3 min read',
    isAiSimplified: true
  }
];

export const MOCK_TICKERS = [
  { symbol: 'S&P 500', name: 'S&P 500', price: '5,862.40', change: '+0.54%', isPositive: true },
  { symbol: 'NASDAQ', name: 'Nasdaq Composite', price: '18,520.10', change: '+0.78%', isPositive: true },
  { symbol: 'DOW', name: 'Dow Jones Ind.', price: '42,310.80', change: '+0.21%', isPositive: true },
  { symbol: 'US10Y', name: '10-Yr Treasury Yield', price: '4.02%', change: '-0.04%', isPositive: false },
  { symbol: 'BRENT', name: 'Brent Crude Oil', price: '$76.15', change: '+0.32%', isPositive: true },
  { symbol: 'BTC', name: 'Bitcoin (USD)', price: '$88,420', change: '+1.85%', isPositive: true }
];
