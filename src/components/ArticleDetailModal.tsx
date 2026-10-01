import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  ExternalLink,
  Clock,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Copy,
  Check,
  Building2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { NewsArticle } from '../types/news';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onSimplifyLive?: (article: NewsArticle) => Promise<void>;
  isSimplifying?: boolean;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onSimplifyLive,
  isSimplifying = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'simplified' | 'side-by-side'>('simplified');
  const [imageError, setImageError] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  if (!article) return null;

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. Here is the AI simplified summary: ${article.simplifiedSummary}. Main event: ${article.mainEvent || ''}. Why it matters: ${article.whyItMatters || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `MarketPlain Simplified Breakdown:\n${article.title}\n\nSummary:\n${article.simplifiedSummary}\n\nKey Takeaways:\n${article.keyTakeaways.join('\n- ')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white rounded-md">
              {article.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-600 truncate max-w-[200px]">
              {article.source}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title={isPlayingAudio ? 'Stop reading aloud' : 'Listen to AI summary'}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-white animate-pulse" />
                  <span className="hidden sm:inline">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span className="hidden sm:inline">Listen</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopySummary}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              title="Copy Simplified Summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              {article.author && (
                <>
                  <span className="text-slate-700 font-medium">By {article.author}</span>
                  <span>·</span>
                </>
              )}
              <span>Published {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime || '3 min read'}
              </span>
              <span>·</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                AI Analyzed
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && !imageError && (
            <div className="relative aspect-[16/8] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* View Toggle (Simplified vs Side-by-Side) */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Analysis Engine</span>
            </div>

            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('simplified')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'simplified'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Simplified View
              </button>
              <button
                onClick={() => setActiveTab('side-by-side')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'side-by-side'
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Compare With Original
              </button>
            </div>
          </div>

          {/* Section 1: AI Simplified Summary Box */}
          <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>AI Simplified Summary</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded">
                Zero Wall Street Jargon
              </span>
            </div>

            <p className="text-base text-slate-800 leading-relaxed font-normal">
              {article.simplifiedSummary}
            </p>

            {/* Main Event & Why It Matters Quick Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-blue-200/60">
              {article.mainEvent && (
                <div className="bg-white/80 rounded-xl p-3.5 border border-blue-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>The Main Event</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {article.mainEvent}
                  </p>
                </div>
              )}

              {article.whyItMatters && (
                <div className="bg-white/80 rounded-xl p-3.5 border border-blue-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Why It Matters</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {article.whyItMatters}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Side-by-Side Comparison (if selected) */}
          {activeTab === 'side-by-side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Original Financial Wire
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono leading-relaxed max-h-60 overflow-y-auto">
                  {article.originalText || article.originalSnippet}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Plain English Translation
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-200 text-xs text-slate-800 leading-relaxed max-h-60 overflow-y-auto">
                  <p className="mb-2 font-medium">{article.simplifiedSummary}</p>
                  {article.marketRelevance && (
                    <p className="text-slate-600 pt-2 border-t border-slate-100">
                      <strong>Market Relevance:</strong> {article.marketRelevance}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Key Takeaways */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Key Takeaways</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {article.keyTakeaways && article.keyTakeaways.length > 0 ? (
                article.keyTakeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {takeaway}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500 italic">No takeaways available.</div>
              )}
            </div>
          </div>

          {/* Section 4: Important Financial Terms Glossary */}
          {article.importantTerms && article.importantTerms.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>Important Financial Terms</span>
                </h3>
                <span className="text-xs text-slate-500">
                  Tap to review jargon definitions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.importantTerms.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm space-y-1.5"
                  >
                    <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                      <span className="text-blue-900">{item.term}</span>
                      <span className="text-[10px] uppercase font-mono text-slate-400">Definition</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Original Article Content Context */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-500">
              Original News Context
            </h4>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono">
              <p>{article.originalText || article.originalSnippet}</p>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Source: <strong className="text-slate-800">{article.source}</strong> · Informational & Educational
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {article.url && article.url !== '#' && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Original Article</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
