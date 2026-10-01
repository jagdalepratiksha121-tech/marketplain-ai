import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  CheckCircle2,
  Zap,
  Globe2,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  LineChart,
  Layers,
  ChevronRight,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToNews: () => void;
  onFetchAndSimplify: () => void;
  onSelectArticlePreview: (articleId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToNews,
  onFetchAndSimplify,
  onSelectArticlePreview,
}) => {
  const [interactiveMode, setInteractiveMode] = useState<'simplified' | 'original'>('simplified');

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Gen Financial Intelligence</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-mono">v1.0</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
                Financial News, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                  Simplified by AI.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                Turn complex financial news into clear, simple and meaningful insights in seconds. No Wall Street jargon, no information overload.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    onNavigateToNews();
                    onFetchAndSimplify();
                  }}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform" />
                  <span>Fetch & Simplify News</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={onNavigateToNews}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300/80 rounded-xl transition-all flex items-center justify-center gap-2 hover:border-slate-400 cursor-pointer shadow-sm"
                >
                  <span>Explore Latest News</span>
                </button>
              </div>

              {/* Trust Statement */}
              <div className="pt-4 flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Powered by NewsAPI + Groq Llama 3.3 70B</span>
                </div>
                <span>·</span>
                <span>Factual & Zero Jargon</span>
              </div>
            </div>

            {/* Right Visual: Interactive Financial News Card */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Background decorative subtle halo */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-lg -z-10" />

                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
                  {/* Card Header with Real-time Market Mini Ticker */}
                  <div className="bg-slate-900 px-5 py-3.5 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-white tracking-wide">MARKET INTELLIGENCE</span>
                    </div>

                    <div className="flex items-center gap-3 font-mono tabular-nums text-[11px]">
                      <span>S&P 500: <strong className="text-emerald-400">+0.54%</strong></span>
                      <span>10Y YIELD: <strong className="text-slate-300">4.02%</strong></span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5">
                    {/* Source & Category */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-700 tracking-wide">ECONOMY</span>
                        <span aria-hidden="true">·</span>
                        <span>Financial Times</span>
                        <span aria-hidden="true">·</span>
                        <span>2 hours ago</span>
                      </div>

                      {/* Interactive Before/After Toggle */}
                      <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
                        <button
                          onClick={() => setInteractiveMode('simplified')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            interactiveMode === 'simplified'
                              ? 'bg-white text-blue-700 shadow-sm font-semibold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          AI Simplified
                        </button>
                        <button
                          onClick={() => setInteractiveMode('original')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            interactiveMode === 'original'
                              ? 'bg-white text-slate-900 shadow-sm font-semibold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Original Jargon
                        </button>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      Federal Reserve Signals Benchmark Interest Rate Pause as Core Inflation Moderates
                    </h3>

                    {/* Content Display based on Toggle */}
                    {interactiveMode === 'simplified' ? (
                      <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-4 space-y-3 transition-all">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-900">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span>AI Simplified Breakdown</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          The Federal Reserve decided not to raise or cut interest rates this month. Because price inflation is cooling down toward normal levels, the Fed is keeping borrowing costs steady.
                        </p>
                        <div className="pt-2 border-t border-blue-200/50 grid grid-cols-2 gap-2 text-xs text-slate-600">
                          <div>
                            <span className="font-medium text-slate-900">Mortgage & Loan Impact:</span> Rates remain unchanged.
                          </div>
                          <div>
                            <span className="font-medium text-slate-900">Stock Market:</span> Calmer trading without sudden hikes.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 transition-all">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Original Financial Wire Text
                        </div>
                        <p className="text-xs text-slate-600 font-mono leading-relaxed line-clamp-4">
                          "FOMC unanimously maintained federal funds target range at 4.25%-4.50%, noting quantitative tightening runoff caps will persist as annualized core PCE disinflation exhibits durability across non-housing services."
                        </p>
                      </div>
                    )}

                    {/* Interactive Action Footer */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>30 sec read</span>
                        <span>·</span>
                        <span>100% Verified</span>
                      </div>

                      <button
                        onClick={() => onSelectArticlePreview('fed-rates-2026')}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Full Breakdown</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE SECTION: Why MarketPlain? */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why MarketPlain?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed text-balance">
              Designed to solve the steep learning curve of financial markets through intelligent natural language processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Real-Time News
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fetch the latest financial and business news from multiple authoritative sources worldwide via NewsAPI.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. AI-Powered Simplification
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Convert complex financial articles into easy-to-understand summaries using Groq Llama 3.3 70B's deep reasoning.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                3. Jargon-Free Insights
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Understand financial terminology without needing advanced financial knowledge or an MBA degree.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 hover:border-blue-300 hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. Save Time
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get the important information without reading lengthy articles. Absorb essential headlines in under 60 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING STORIES SIMPLIFIED TODAY */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
                Live Intelligence Sample
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Trending Stories Simplified Today
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Real-world financial reporting transformed by Groq Llama 3.3 70B into plain, accessible takeaways.
              </p>
            </div>

            <button
              onClick={onNavigateToNews}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View All Financial News</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Story 1 */}
            <div
              onClick={() => onSelectArticlePreview('fed-rates-2026')}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/market_fed_rates_1790872483601.jpg"
                    alt="Federal Reserve"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white rounded">
                    Economy
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">Financial Times</span>
                  <span>·</span>
                  <span>2 hours ago</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  Federal Reserve Signals Benchmark Interest Rate Pause as Core Inflation Moderates
                </h3>

                <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    AI Simplification:
                  </strong>
                  The Fed kept interest rates at 4.25%-4.50%. Price inflation is cooling down, so borrowing costs for home and auto loans will stay steady for now.
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">1 min read</span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Story 2 */}
            <div
              onClick={() => onSelectArticlePreview('ai-semiconductor-capex')}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/tech_ai_chips_1790872495584.jpg"
                    alt="AI Semiconductor Chips"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white rounded">
                    Technology
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">Bloomberg Markets</span>
                  <span>·</span>
                  <span>3 hours ago</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  Hyperscalers Escalate AI Chip Capital Expenditure to $210 Billion as Next-Gen Silicon Arrives
                </h3>

                <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    AI Simplification:
                  </strong>
                  Tech giants like Microsoft and Google are spending an unprecedented $210 billion on AI chips and data centers, believing under-investing is a bigger existential threat.
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">2 min read</span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Story 3 */}
            <div
              onClick={() => onSelectArticlePreview('fintech-open-banking-rules')}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/banking_fintech_app_1790872518304.jpg"
                    alt="Fintech Banking App"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white rounded">
                    Banking
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">Wall Street Journal</span>
                  <span>·</span>
                  <span>5 hours ago</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  CFPB Finalizes Open Banking Rules, Reshaping Retail Lending Competition
                </h3>

                <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-3 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    AI Simplification:
                  </strong>
                  New rules allow consumers to transfer their banking history freely to competing fintech apps without junk fees, giving consumers more leverage for cheaper loans.
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">2 min read</span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Detailed Breakdown <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 3-step visual process */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From Complex Jargon to Plain Insights
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Three orchestrated steps transform raw market wires into accessible intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 01 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm relative">
              <div className="text-3xl font-extrabold text-blue-600 mb-4 font-mono">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Fetch
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Retrieve the latest financial news using NewsAPI and global wire syndication across stocks, economy, and banking.
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm relative">
              <div className="text-3xl font-extrabold text-indigo-600 mb-4 font-mono">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Analyze
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Groq Llama 3.3 70B analyzes the article, extracts factual premises, and isolates technical financial jargon.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm relative">
              <div className="text-3xl font-extrabold text-emerald-600 mb-4 font-mono">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Simplify
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate a concise, reader-friendly explanation with key bullet points, market relevance, and glossary definitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCENARIOS SECTION: 4 cards */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tailored for Every Audience
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether managing investments, studying for exams, or briefing leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Scenario 1: Retail Investor */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Retail Investor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Quickly understand stock market developments without being overwhelmed by institutional Wall Street jargon.
              </p>
            </div>

            {/* Scenario 2: College Student */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                College Student
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Learn difficult financial concepts in simple language to excel in finance classes and build foundational literacy.
              </p>
            </div>

            {/* Scenario 3: Business Professional */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Business Professional
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get a quick overview of macro trends and industry shifts before morning executive meetings and strategy reviews.
              </p>
            </div>

            {/* Scenario 4: Market Volatility */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Market Volatility
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Understand important market-moving events quickly during breaking crises or unexpected central bank rate decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
            Stop struggling with complicated financial news.
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Let AI turn financial complexity into clarity. Stay informed, save hours every week, and make smarter economic decisions.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigateToNews();
                onFetchAndSimplify();
              }}
              className="px-8 py-4 text-base font-bold text-slate-950 bg-white hover:bg-blue-50 rounded-xl shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Try MarketPlain Now</span>
              <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-400 pt-2">
            No credit card or registration required · Real-time REST API architecture
          </p>
        </div>
      </section>
    </div>
  );
};
