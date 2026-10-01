import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  RefreshCw,
  SlidersHorizontal,
  AlertCircle,
  PlusCircle,
  TrendingUp,
  Filter,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { NewsArticle } from '../types/news';
import { NewsCard } from './NewsCard';

interface NewsDashboardProps {
  articles: NewsArticle[];
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
  onFetchAndSimplify: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenCustomArticleModal: () => void;
}

const CATEGORIES = [
  'All',
  'Stock Market',
  'Business',
  'Economy',
  'Technology',
  'Banking',
  'Cryptocurrency',
];

export const NewsDashboard: React.FC<NewsDashboardProps> = ({
  articles,
  isLoading,
  loadingStep,
  error,
  onFetchAndSimplify,
  onSelectArticle,
  onOpenCustomArticleModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter articles based on Category and Search Query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category.toLowerCase().replace(/\s+/g, '') ===
          selectedCategory.toLowerCase().replace(/\s+/g, '');

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.originalSnippet.toLowerCase().includes(q) ||
        article.simplifiedSummary.toLowerCase().includes(q) ||
        article.source.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="w-full py-8 lg:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 rounded">
                Live Feed
              </span>
              <span className="text-xs text-slate-500 font-medium">
                NewsAPI + Groq Llama 3.3 70B
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest Financial News
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Stay informed with AI-simplified financial insights.
            </p>
          </div>

          {/* Prominent Action Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCustomArticleModal}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Test Any Article</span>
            </button>

            <button
              onClick={onFetchAndSimplify}
              disabled={isLoading}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 disabled:bg-slate-400 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform" />
              <span>{isLoading ? 'Processing...' : 'Fetch & Simplify'}</span>
            </button>
          </div>
        </div>

        {/* Search Bar and Category Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search financial news, Fed rates, tech stocks..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-semibold text-slate-900">{filteredArticles.length}</span> articles
            </div>
          </div>

          {/* Category Filter Buttons (Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-blue-200 p-8 text-center space-y-4 shadow-sm animate-pulse">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">
                {loadingStep || 'Fetching latest financial news...'}
              </h3>
              <p className="text-xs text-slate-500">
                Llama 3.3 70B is analyzing raw articles and eliminating market jargon.
              </p>
            </div>

            {/* Skeleton Grid Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                  <div className="h-36 bg-slate-200 rounded-lg animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-slate-200 rounded w-full animate-pulse" />
                  <div className="h-16 bg-blue-50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-rose-900">
              Unable to fetch news right now. Please try again.
            </h3>
            <p className="text-xs text-rose-700 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={onFetchAndSimplify}
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* NEWS CARDS GRID */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        )}

        {/* EMPTY SEARCH STATE */}
        {!isLoading && filteredArticles.length === 0 && !error && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No matching financial news found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset the category filter to explore all available articles.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
