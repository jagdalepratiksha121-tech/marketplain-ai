import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Clock, Building2, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
  onSimplifyLive?: (article: NewsArticle) => void;
  isSimplifying?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onSelect,
  onSimplifyLive,
  isSimplifying = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Format relative time or clean date
  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return 'Just now';
      if (diffHours === 1) return '1 hour ago';
      if (diffHours < 24) return `${diffHours} hours ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group">
      {/* Top Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {!imageError && article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300 text-center">
            <Building2 className="w-8 h-8 text-blue-400 mb-2 opacity-80" />
            <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              {article.category}
            </span>
          </div>
        )}

        {/* Category Overlay Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase bg-slate-900/85 backdrop-blur-md text-white rounded-md shadow-sm">
            {article.category}
          </span>
        </div>

        {/* AI Simplified Status Marker */}
        <div className="absolute top-3 right-3">
          <div className="px-2 py-1 text-[11px] font-semibold bg-white/95 backdrop-blur-md text-blue-700 rounded-md shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>AI Ready</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Row: Source & Publication Date */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-slate-800 font-semibold truncate max-w-[150px]">
              {article.source}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime || '2 min'}</span>
          </div>

          {/* News Title */}
          <h3
            onClick={() => onSelect(article)}
            className="text-base font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Original Headline Snippet */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Original Wording:
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              "{article.originalSnippet}"
            </p>
          </div>

          {/* AI Simplified Summary Box */}
          <div className="bg-blue-50/70 border border-blue-100/80 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                AI Simplified Summary:
              </span>
              <span className="text-[11px] text-blue-600 font-mono">Simple English</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {article.simplifiedSummary}
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(article)}
            className="text-xs font-semibold text-slate-900 hover:text-blue-600 py-1.5 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Detailed Breakdown</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {article.url && article.url !== '#' && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1.5 transition-colors"
              title="Open original news source"
            >
              <span>Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
