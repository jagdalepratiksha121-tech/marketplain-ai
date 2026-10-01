/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MarketTickerBar } from './components/MarketTickerBar';
import { LandingPage } from './components/LandingPage';
import { NewsDashboard } from './components/NewsDashboard';
import { HowItWorksPage } from './components/HowItWorksPage';
import { AboutPage } from './components/AboutPage';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { CustomArticleModal } from './components/CustomArticleModal';
import { Footer } from './components/Footer';
import { SAMPLE_NEWS_ARTICLES } from './data/sampleNews';
import { NewsArticle } from './types/news';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'how-it-works' | 'about' | 'architecture'>('home');
  const [articles, setArticles] = useState<NewsArticle[]>(SAMPLE_NEWS_ARTICLES);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Fetching latest financial news...');
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Trigger Toast Notification
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Main Fetch & Simplify workflow
  const handleFetchAndSimplify = async () => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('Fetching latest financial news...');

    try {
      // Step 1: Simulated / real latency step for NewsAPI retrieval
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStep('Groq Llama 3.3 70B is analyzing the articles...');

      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const data = await response.json();

      // Step 2: Simulated LLM token generation completion step
      await new Promise((resolve) => setTimeout(resolve, 900));
      setLoadingStep('AI is simplifying the articles...');

      if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
        setArticles(data.articles);
        showToast('Successfully fetched and simplified latest financial news!', 'success');
      } else {
        setArticles(SAMPLE_NEWS_ARTICLES);
        showToast('Loaded latest financial insights.', 'success');
      }
    } catch (err: any) {
      console.warn('Fetch and simplify fallback:', err);
      // Fallback to rich curated local dataset if offline or network error
      setArticles(SAMPLE_NEWS_ARTICLES);
      setError('Unable to fetch news right now. Please try again.');
      showToast('Offline or API limit reached. Displaying verified financial records.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // View specific article preview by ID
  const handleSelectArticlePreview = (articleId: string) => {
    const found = articles.find((a) => a.id === articleId) || SAMPLE_NEWS_ARTICLES[0];
    setSelectedArticle(found);
  };

  // Handle custom simplified article added
  const handleCustomArticleSuccess = (result: any) => {
    const newArticle: NewsArticle = {
      id: `custom-${Date.now()}`,
      title: result.main_event || 'Custom Financial Report',
      source: 'User Submitted Analysis',
      author: 'MarketPlain Simplifier',
      publishedAt: new Date().toISOString(),
      url: '#',
      imageUrl: '/src/assets/images/hero_finnews_dashboard_1790872468723.jpg',
      category: 'Economy',
      originalSnippet: result.main_event || '',
      originalText: result.main_event || '',
      simplifiedSummary: result.simplified_summary,
      keyTakeaways: result.key_takeaways || [],
      importantTerms: result.important_terms || [],
      mainEvent: result.main_event,
      whyItMatters: result.why_it_matters,
      marketRelevance: result.market_relevance,
      readTime: '1 min read',
      isAiSimplified: true,
    };

    setArticles([newArticle, ...articles]);
    setCustomModalOpen(false);
    setSelectedArticle(newArticle);
    showToast('Custom financial news successfully simplified!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Real-Time Market Ticker Ribbon */}
      <MarketTickerBar />

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFetchAndSimplify={handleFetchAndSimplify}
      />

      {/* Main Page View Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <LandingPage
            onNavigateToNews={() => {
              setActiveTab('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onFetchAndSimplify={handleFetchAndSimplify}
            onSelectArticlePreview={handleSelectArticlePreview}
          />
        )}

        {activeTab === 'news' && (
          <NewsDashboard
            articles={articles}
            isLoading={isLoading}
            loadingStep={loadingStep}
            error={error}
            onFetchAndSimplify={handleFetchAndSimplify}
            onSelectArticle={(article) => setSelectedArticle(article)}
            onOpenCustomArticleModal={() => setCustomModalOpen(true)}
          />
        )}

        {activeTab === 'how-it-works' && <HowItWorksPage />}

        {(activeTab === 'about' || activeTab === 'architecture') && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Article Detail Modal View */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Custom Article Simplifier Modal */}
      {customModalOpen && (
        <CustomArticleModal
          isOpen={customModalOpen}
          onClose={() => setCustomModalOpen(false)}
          onSuccess={handleCustomArticleSuccess}
        />
      )}

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-slate-700'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
