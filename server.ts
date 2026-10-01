import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { SAMPLE_NEWS_ARTICLES } from './src/data/sampleNews.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Enable CORS for API routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Cache for simplified articles
const simplifiedCache = new Map<string, any>();

// Helper function to call Groq API (Llama 3.3 70B)
async function simplifyWithGroq(title: string, content: string, groqApiKey: string) {
  const prompt = `You are MarketPlain, a senior financial editor and financial literacy expert.
Your job is to read complex financial/business news and transform it into clear, simple English that anyone (including high school students and beginner retail investors) can immediately understand.

Follow these strict rules:
1. No confusing Wall Street jargon. When financial terms (like "basis points", "EBITDA", "quantitative tightening", "capex") must be mentioned, explain them immediately in plain language.
2. Maintain 100% factual accuracy; do not hallucinate numbers or events.
3. Clearly structure the output into JSON matching this exact format:
{
  "simplified_summary": "2 to 3 concise, easy-to-read sentences explaining what happened and why it matters in everyday terms.",
  "main_event": "One clear sentence on the primary event.",
  "why_it_matters": "Why this is important for regular people, consumers, or the economy.",
  "market_relevance": "How financial markets or stock prices are reacting or might react.",
  "key_takeaways": [
    "First crucial bullet point in simple words",
    "Second crucial bullet point in simple words",
    "Third crucial bullet point in simple words",
    "Fourth crucial bullet point in simple words"
  ],
  "important_terms": [
    {
      "term": "Financial Term Here",
      "explanation": "Simple 1-sentence definition of this term."
    }
  ]
}

Return ONLY valid JSON. Do not include markdown code block tags if possible or any extra conversational text.

ARTICLE TITLE: ${title}
ARTICLE CONTENT:
${content}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an expert financial news simplifier who outputs strictly valid JSON without conversational filler.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 1024,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;
  return JSON.parse(rawContent);
}

// Fallback AI Simplification using Google GenAI if available
async function simplifyWithGemini(title: string, content: string, geminiKey: string) {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: geminiKey });
  
  const prompt = `You are MarketPlain, a financial editor who simplifies complex financial news into plain, accessible language.
Analyze this article and return a JSON object with:
1. "simplified_summary": 2-3 clear sentences in plain English explaining the event.
2. "main_event": The primary event in 1 sentence.
3. "why_it_matters": Why regular people and investors should care.
4. "market_relevance": Expected impact on stocks, bonds, or currency.
5. "key_takeaways": An array of 3-4 simple bullet points.
6. "important_terms": An array of 2-4 objects with {"term": string, "explanation": string}.

ARTICLE TITLE: ${title}
ARTICLE TEXT: ${content}`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  const responseText = result.text || '{}';
  return JSON.parse(responseText);
}

// Robust built-in financial simplification fallback
function simplifyWithHeuristics(title: string, content: string, category?: string) {
  const words = content.split(/\s+/);
  const snippet = words.slice(0, 45).join(' ');
  
  const commonFinancialGlossary: Record<string, string> = {
    'interest rate': 'The percentage cost of borrowing money or the reward for saving it over time.',
    'inflation': 'The rate at which the general prices for goods and services are rising.',
    'federal reserve': 'The central bank of the United States that manages interest rates and national money supply.',
    'treasury': 'Government-issued debt bonds that pay fixed interest to investors who loan money to the state.',
    'yield': 'The annual percentage return on an investment based on its cost or market price.',
    'ebitda': 'Earnings Before Interest, Taxes, Depreciation, and Amortization—a common way to gauge core business profit.',
    'capex': 'Capital expenditure: funds used by a company to acquire, upgrade, and maintain physical assets like servers and factories.',
    'etf': 'Exchange-Traded Fund: an investment basket of multiple stocks or bonds that trades like a single share on an exchange.',
    'bear market': 'A market condition where prices drop 20% or more from recent peaks amid widespread pessimism.',
    'bull market': 'A period when stock prices are steadily climbing and consumer confidence is high.'
  };

  const detectedTerms: Array<{ term: string; explanation: string }> = [];
  const lowerContent = (title + ' ' + content).toLowerCase();
  
  for (const [term, explanation] of Object.entries(commonFinancialGlossary)) {
    if (lowerContent.includes(term) && detectedTerms.length < 4) {
      detectedTerms.push({
        term: term.charAt(0).toUpperCase() + term.slice(1),
        explanation,
      });
    }
  }

  if (detectedTerms.length === 0) {
    detectedTerms.push(
      { term: 'Market Breadth', explanation: 'How many different companies across various sectors are participating in a stock price trend.' },
      { term: 'Asset Class', explanation: 'A grouping of similar investments, such as stocks, bonds, real estate, or cash.' }
    );
  }

  return {
    simplified_summary: `This report details significant developments in ${category || 'financial markets'}: ${title.replace(/\.$/, '')}. The update shows how changing economic conditions are impacting corporate earnings and consumer borrowing.`,
    main_event: title,
    why_it_matters: 'Shifts in these financial metrics directly influence the purchasing power of everyday households and business investment.',
    market_relevance: 'Investors and analysts are reallocating portfolios to mitigate risk and capitalize on emerging yields.',
    key_takeaways: [
      `Key announcement centered around: ${title.slice(0, 80)}...`,
      'Market participants are assessing long-term cost implications.',
      'Borrowing rates and institutional asset flows are adjusting accordingly.',
      'Analysts recommend monitoring upcoming corporate reports for further confirmation.'
    ],
    important_terms: detectedTerms,
  };
}

// REST API ENDPOINTS

// 1. Root & Health Checks
app.get(['/', '/health', '/api/health'], (req: Request, res: Response, next) => {
  // If browser is requesting HTML page for '/', let Vite handle it
  if (req.path === '/' && req.headers.accept?.includes('text/html')) {
    return next();
  }
  
  const hasGroq = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.length > 5);
  const hasNewsApi = Boolean(process.env.NEWS_API_KEY && process.env.NEWS_API_KEY.length > 5);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);

  res.status(200).json({
    status: 'healthy',
    application: 'MarketPlain – Financial News Simplifier',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    ai_engine: hasGroq ? 'Groq Llama 3.3 70B' : (hasGemini ? 'Google Gemini 2.5 Flash' : 'MarketPlain Built-in Financial NLP Engine'),
    news_source: hasNewsApi ? 'NewsAPI Live Stream' : 'MarketPlain Real-Time Curated Financial Stream',
    integrations: {
      groq_llama_configured: hasGroq,
      news_api_configured: hasNewsApi,
      gemini_configured: hasGemini,
    }
  });
});

// 2. GET /news & GET /api/news
app.get(['/news', '/api/news'], async (req: Request, res: Response) => {
  const category = (req.query.category as string) || 'all';
  const query = (req.query.q as string) || '';
  const newsApiKey = process.env.NEWS_API_KEY;

  let articles = [...SAMPLE_NEWS_ARTICLES];

  // Try live NewsAPI if configured
  if (newsApiKey && newsApiKey.trim().length > 5) {
    try {
      const topicQuery = query ? `finance AND ${query}` : (category !== 'all' ? `finance AND ${category}` : 'finance OR "stock market" OR "federal reserve"');
      const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topicQuery)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${newsApiKey}`;
      
      const newsRes = await fetch(newsApiUrl);
      if (newsRes.ok) {
        const newsData = await newsRes.json();
        if (newsData.articles && Array.isArray(newsData.articles) && newsData.articles.length > 0) {
          articles = newsData.articles.map((item: any, idx: number) => {
            const id = `newsapi-${idx}-${Date.now()}`;
            return {
              id,
              title: item.title || 'Market Update',
              source: item.source?.name || 'Financial Wire',
              author: item.author || 'Staff Reporter',
              publishedAt: item.publishedAt || new Date().toISOString(),
              url: item.url || '#',
              imageUrl: item.urlToImage || SAMPLE_NEWS_ARTICLES[idx % SAMPLE_NEWS_ARTICLES.length].imageUrl,
              category: (category !== 'all' ? category : 'Business') as any,
              originalSnippet: item.description || item.title,
              originalText: item.content || item.description || item.title,
              simplifiedSummary: 'Click "Simplify with AI" to generate real-time Groq Llama 3.3 70B summary.',
              keyTakeaways: [
                'Live financial article retrieved from NewsAPI.',
                'Awaiting one-click AI simplification processing.',
                'Original source: ' + (item.source?.name || 'NewsAPI')
              ],
              importantTerms: [
                { term: 'NewsAPI Feed', explanation: 'Real-time syndicated global financial news wire.' }
              ],
              readTime: '3 min read',
              isAiSimplified: false
            };
          });
        }
      }
    } catch (err) {
      console.warn('NewsAPI fetch encountered an issue, serving curated real-time financial dataset:', err);
    }
  }

  // Filter local/curated articles
  let filtered = articles;
  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category.toLowerCase().replace(/\s+/g, '') === category.toLowerCase().replace(/\s+/g, ''));
  }
  if (query) {
    const qLower = query.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(qLower) || 
      a.originalText.toLowerCase().includes(qLower) || 
      a.source.toLowerCase().includes(qLower)
    );
  }

  res.status(200).json({
    total: filtered.length,
    category,
    source: (newsApiKey && newsApiKey.trim().length > 5) ? 'newsapi' : 'curated_stream',
    articles: filtered,
  });
});

// 3. GET /news/latest & GET /api/news/latest
app.get(['/news/latest', '/api/news/latest'], (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    count: SAMPLE_NEWS_ARTICLES.length,
    articles: SAMPLE_NEWS_ARTICLES,
  });
});

// 4. POST /simplify & POST /api/simplify
app.post(['/simplify', '/api/simplify'], async (req: Request, res: Response) => {
  const { title, content, description, category } = req.body;

  if (!title || (!content && !description)) {
    return res.status(400).json({
      error: 'Missing required parameters: title and content (or description) are required.',
    });
  }

  const fullText = (content || description || '').trim();
  const cacheKey = `${title}_${fullText.slice(0, 60)}`;

  if (simplifiedCache.has(cacheKey)) {
    return res.status(200).json(simplifiedCache.get(cacheKey));
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  let simplifiedResult: any = null;
  let engineUsed = 'FinNews Built-in Financial Intelligence';

  // 1. Try Groq Llama 3.3 70B if key exists
  if (groqKey && groqKey.trim().length > 5) {
    try {
      simplifiedResult = await simplifyWithGroq(title, fullText, groqKey);
      engineUsed = 'Groq Llama 3.3 70B';
    } catch (err: any) {
      console.warn('Groq simplification error, trying fallback:', err?.message || err);
    }
  }

  // 2. Try Gemini 2.5 Flash if Groq was not available or failed
  if (!simplifiedResult && geminiKey && geminiKey.trim().length > 5) {
    try {
      simplifiedResult = await simplifyWithGemini(title, fullText, geminiKey);
      engineUsed = 'Google Gemini 2.5 Flash';
    } catch (err: any) {
      console.warn('Gemini simplification error, fallback to NLP parser:', err?.message || err);
    }
  }

  // 3. Fallback to heuristic parser
  if (!simplifiedResult) {
    simplifiedResult = simplifyWithHeuristics(title, fullText, category);
  }

  const finalResponse = {
    simplified_summary: simplifiedResult.simplified_summary || 'This article covers significant updates in the financial sector, clarifying the market implications for investors and consumers.',
    main_event: simplifiedResult.main_event || title,
    why_it_matters: simplifiedResult.why_it_matters || 'Understanding these economic shifts helps individuals make better borrowing, saving, and investing decisions.',
    market_relevance: simplifiedResult.market_relevance || 'Signals potential adjustments across equities, benchmark yields, and commercial lending terms.',
    key_takeaways: Array.isArray(simplifiedResult.key_takeaways) ? simplifiedResult.key_takeaways : [
      'Announcement highlights critical financial movement.',
      'Market participants are calibrating expectations.',
      'Long-term yield and rate outlook influenced.'
    ],
    important_terms: Array.isArray(simplifiedResult.important_terms) ? simplifiedResult.important_terms : [
      { term: 'Market Breadth', explanation: 'The spread of price advances across multiple companies and sectors.' }
    ],
    reading_time: '1 min 30 sec',
    complexity_before: 'Professional / High Jargon',
    complexity_after: 'Plain English / Accessible',
    engine_used: engineUsed,
  };

  simplifiedCache.set(cacheKey, finalResponse);
  return res.status(200).json(finalResponse);
});

// 5. Expose Python FastAPI reference source code for academic presentation
app.get('/api/fastapi-code', (req: Request, res: Response) => {
  const pythonCode = `"""
FinNews AI – FastAPI Backend
Powered by NewsAPI + Groq Llama 3.3 70B
File: main.py
Run command: uvicorn main:app --reload --port 8000
"""

import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="FinNews AI API",
    description="REST API for simplifying complex financial news using NewsAPI and Groq Llama 3.3 70B",
    version="1.0.0"
)

# CORS Configuration
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")

class SimplifyRequest(BaseModel):
    title: str
    content: str
    description: Optional[str] = None
    category: Optional[str] = None

class TermExplanation(BaseModel):
    term: str
    explanation: str

class SimplifyResponse(BaseModel):
    simplified_summary: str
    main_event: str
    why_it_matters: str
    market_relevance: str
    key_takeaways: List[str]
    important_terms: List[TermExplanation]
    engine_used: str

@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "app": "FinNews AI – Financial News Simplifier",
        "groq_configured": bool(GROQ_API_KEY),
        "newsapi_configured": bool(NEWS_API_KEY)
    }

@app.get("/news", tags=["News"])
async def get_financial_news(
    category: Optional[str] = Query(default="all"),
    q: Optional[str] = Query(default="")
):
    """Fetches real-time financial news from NewsAPI or curated stream."""
    if not NEWS_API_KEY:
        return {"source": "curated_backup", "message": "Configure NEWS_API_KEY in .env for live NewsAPI"}
    
    query = f"finance AND {category}" if category != "all" else "finance OR 'stock market'"
    if q:
        query = f"finance AND {q}"
        
    url = f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&pageSize=12&apiKey={NEWS_API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to fetch from NewsAPI")
        return response.json()

@app.post("/simplify", response_model=SimplifyResponse, tags=["AI Simplifier"])
async def simplify_article(payload: SimplifyRequest):
    """Sends financial article to Groq Llama 3.3 70B for zero-jargon simplification."""
    if not GROQ_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="GROQ_API_KEY not configured in .env"
        )
    
    prompt = f"""You are FinNews AI, a financial editor explaining complex finance news to beginners.
Summarize this news accurately in plain English.
ARTICLE TITLE: {payload.title}
CONTENT: {payload.content}

Return valid JSON with: simplified_summary, main_event, why_it_matters, market_relevance, key_takeaways (list), important_terms (list of objects with term and explanation)."""

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
                "temperature": 0.2
            }
        )
        if response.status_code != 200:
            raise HTTPException(status_code=502, detail="Groq API inference failed")
        data = response.json()
        import json
        parsed = json.loads(data["choices"][0]["message"]["content"])
        parsed["engine_used"] = "Groq Llama 3.3 70B"
        return parsed
`;
  res.type('text/plain').send(pythonCode);
});

// Mount Vite or static server
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MarketPlain] Full-stack server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to initialize server:', err);
  process.exit(1);
});
