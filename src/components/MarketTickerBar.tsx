import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_TICKERS } from '../data/sampleNews';

export const MarketTickerBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 whitespace-nowrap min-w-max">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] tracking-wide text-slate-300">MARKETS LIVE</span>
        </div>

        <div className="flex items-center gap-8">
          {MOCK_TICKERS.map((ticker) => (
            <div key={ticker.symbol} className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{ticker.symbol}</span>
              <span className="font-mono tabular-nums text-white font-semibold">{ticker.price}</span>
              <span
                className={`font-mono tabular-nums flex items-center gap-0.5 ${
                  ticker.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {ticker.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {ticker.change}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 hidden xl:block">
          Delayed 15m · Global Equities & Macro
        </div>
      </div>
    </div>
  );
};
