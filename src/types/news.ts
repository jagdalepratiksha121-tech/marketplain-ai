export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  author?: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  category: 'Stock Market' | 'Business' | 'Economy' | 'Technology' | 'Banking' | 'Cryptocurrency';
  originalText: string;
  originalSnippet: string;
  simplifiedSummary: string;
  keyTakeaways: string[];
  importantTerms: Array<{
    term: string;
    explanation: string;
  }>;
  mainEvent?: string;
  whyItMatters?: string;
  marketRelevance?: string;
  readTime: string;
  isAiSimplified?: boolean;
}

export interface SimplifyRequest {
  title: string;
  content: string;
  description?: string;
  category?: string;
}

export interface SimplifyResponse {
  simplified_summary: string;
  key_takeaways: string[];
  important_terms: Array<{
    term: string;
    explanation: string;
  }>;
  main_event: string;
  why_it_matters: string;
  market_relevance: string;
  reading_time: string;
  complexity_before: string;
  complexity_after: string;
  engine_used: string;
}

export interface MarketTicker {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}
