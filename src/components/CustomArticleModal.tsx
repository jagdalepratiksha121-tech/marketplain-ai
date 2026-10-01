import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Loader2, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';
import { SimplifyResponse } from '../types/news';

interface CustomArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (result: any) => void;
}

const PRESET_ARTICLES = [
  {
    title: 'Bank of England Delivers Hawkish 25 Bps Hike Amid Sticky Services CPI',
    category: 'Economy',
    content: 'The Monetary Policy Committee voted 6-3 to raise the Bank Rate by 25 basis points to 5.25%. Governor Bailey noted that second-round wage growth and persistent core services CPI inflation necessitate maintaining a restrictive monetary stance to ensure expectations remain anchored.'
  },
  {
    title: 'Sovereign Yield Curve Inverts Further as Term Premium Collapses in Long Bonds',
    category: 'Stock Market',
    content: 'The 2-year/10-year Treasury yield curve inversion deepened by 9 basis points today as institutional investors accelerated flight-to-safety duration allocations, signaling heightened recessionary probability over a 12-month forward horizon.'
  },
  {
    title: 'Cloud Enterprise ARR Decelerates as Customers Optimize FinOps Workloads',
    category: 'Technology',
    content: 'Enterprise software bellwethers reported a 400 basis point deceleration in net retention rates and annual recurring revenue (ARR), driven by enterprise-wide cloud consumption rationalization and elongated enterprise procurement cycles.'
  }
];

export const CustomArticleModal: React.FC<CustomArticleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Economy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimplifyResponse | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: typeof PRESET_ARTICLES[0]) => {
    setTitle(preset.title);
    setContent(preset.content);
    setCategory(preset.category);
    setError(null);
    setResult(null);
  };

  const handleSimplify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Please provide both an article headline and text to simplify.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Simplification failed (${response.status})`);
      }

      const data: SimplifyResponse = await response.json();
      setResult(data);
      onSuccess(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to simplify article at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                MarketPlain AI News Simplifier
              </h3>
              <p className="text-xs text-slate-500">
                Test any financial news article with Groq Llama 3.3 70B
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Try a Quick Complex Financial Preset:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_ARTICLES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                >
                  {p.title.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSimplify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline / News Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Federal Reserve delivers 25 bps rate cut as PCE disinflation accelerates..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Economy">Economy</option>
                  <option value="Stock Market">Stock Market</option>
                  <option value="Business">Business</option>
                  <option value="Technology">Technology</option>
                  <option value="Banking">Banking</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Audience
                </label>
                <div className="px-3.5 py-2.5 text-xs text-slate-600 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span>Beginner / Retail Investor</span>
                  <span className="font-mono text-emerald-700 font-semibold">Zero Jargon</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Original Article Content / Wall Street Jargon Text
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Paste financial news paragraph with complex terminology (quantitative easing, yield curves, EBITDA, hawkish commentary)..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-xs"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 disabled:bg-slate-400 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-300" />
                  <span>Groq Llama 3.3 70B Simplifying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  <span>Simplify Article with AI</span>
                </>
              )}
            </button>
          </form>

          {/* Result Display */}
          {result && (
            <div className="pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI Simplification Output ({result.engine_used})</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {result.complexity_before} → {result.complexity_after}
                </span>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-sm text-slate-800 leading-relaxed">
                <strong>Plain English Summary:</strong>
                <p className="mt-1">{result.simplified_summary}</p>
              </div>

              {/* Takeaways */}
              {result.key_takeaways && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Takeaways:
                  </span>
                  <div className="space-y-1">
                    {result.key_takeaways.map((point, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms */}
              {result.important_terms && result.important_terms.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Explained Terms:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.important_terms.map((t, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <strong className="text-slate-900 block">{t.term}</strong>
                        <span className="text-slate-600">{t.explanation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
