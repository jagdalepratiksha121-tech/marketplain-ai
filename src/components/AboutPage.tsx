import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  CheckCircle2,
  BookOpen,
  Clock,
  Cpu,
  Layers,
  FileCode,
  Copy,
  Check,
  ShieldAlert,
  Server,
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const pythonFastAPICode = `"""
MarketPlain – FastAPI Backend Implementation
Powered by NewsAPI + Groq Llama 3.3 70B
File: backend/main.py
Run command: uvicorn backend.main:app --reload --port 8000
"""

import os
import json
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="MarketPlain API",
    description="REST API for simplifying complex financial news using NewsAPI and Groq Llama 3.3 70B",
    version="1.0.0"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    category: Optional[str] = "General"

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

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "app": "MarketPlain",
        "groq_configured": bool(GROQ_API_KEY),
        "newsapi_configured": bool(NEWS_API_KEY)
    }

@app.get("/news", tags=["News"])
async def get_financial_news(
    category: Optional[str] = Query(default="all"),
    q: Optional[str] = Query(default="")
):
    if not NEWS_API_KEY:
        return {"source": "curated_backup", "message": "Add NEWS_API_KEY in .env"}
    
    query = f"finance AND {category}" if category != "all" else "finance OR 'stock market'"
    if q:
        query = f"finance AND {q}"
        
    url = f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&pageSize=12&apiKey={NEWS_API_KEY}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()

@app.post("/simplify", response_model=SimplifyResponse, tags=["AI Simplifier"])
async def simplify_article(payload: SimplifyRequest):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=503, detail="GROQ_API_KEY not configured")
    
    prompt = f"""You are MarketPlain, a senior financial editor.
Explain this news in simple English for regular people.
TITLE: {payload.title}
CONTENT: {payload.content}

Return valid JSON with: simplified_summary, main_event, why_it_matters, market_relevance, key_takeaways (array of 4 strings), important_terms (array of objects with term and explanation)."""

    async with httpx.AsyncClient(timeout=30.0) as client:
        res = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            json={
                "model": "llama-3.3-70b-versatile",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"},
                "temperature": 0.2
            }
        )
        data = res.json()
        result = json.loads(data["choices"][0]["message"]["content"])
        result["engine_used"] = "Groq Llama 3.3 70B"
        return result
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonFastAPICode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const projectGoals = [
    {
      num: '01',
      title: 'Improve Financial Information Accessibility',
      desc: 'Democratize access to economic and corporate news for retail traders, students, and non-finance professionals.',
      icon: Target
    },
    {
      num: '02',
      title: 'Reduce Information Overload',
      desc: 'Filter multi-page earnings calls and central bank statements down to the 4 essential bullet points that matter.',
      icon: Clock
    },
    {
      num: '03',
      title: 'Explain Complex Financial Terminology',
      desc: 'Automatically surface and define confusing jargon like "quantitative tightening", "EBITDA", and "yield inversions".',
      icon: BookOpen
    },
    {
      num: '04',
      title: "Save Users' Valuable Time",
      desc: 'Deliver complete, fact-checked economic summaries that can be absorbed in 45 seconds rather than 15 minutes.',
      icon: CheckCircle2
    },
    {
      num: '05',
      title: 'Demonstrate Practical Generative AI Applications',
      desc: 'Illustrate how large language models (Groq Llama 3.3 70B) solve real-world natural language comprehension challenges.',
      icon: Cpu
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/health',
      desc: 'Returns system health, active AI model status, and API configuration flags.',
      code: '200 OK'
    },
    {
      method: 'GET',
      path: '/news',
      desc: 'Fetches latest financial articles filtered by category or search keyword.',
      code: '200 OK'
    },
    {
      method: 'POST',
      path: '/simplify',
      desc: 'Submits financial headline & text to Groq Llama 3.3 70B for jargon-free JSON output.',
      code: '200 OK / 400 Bad Request'
    },
    {
      method: 'GET',
      path: '/news/latest',
      desc: 'Returns pre-cached, verified financial news cards with zero-latency summaries.',
      code: '200 OK'
    }
  ];

  return (
    <div className="w-full py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Mission & Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Making Financial Information Easier to Understand
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Financial news often contains complex terminology, market jargon and economic analysis. MarketPlain uses Generative AI to transform complicated financial information into simple, accessible explanations.
          </p>
        </div>

        {/* 5 Project Goals */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Project Goals
            </h2>
            <p className="text-sm text-slate-600">
              The fundamental objectives guiding our platform design and engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectGoals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.num}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      GOAL {goal.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {goal.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Architecture Diagram */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Technical Architecture Blueprint
            </h2>
            <p className="text-sm text-slate-600">
              Clean separation of concerns with a decoupled client, REST controller, and foundation model inference.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
            <pre className="whitespace-pre">
{`+-------------------------------------------------------------+
|                     Frontend Presentation                   |
|           React 19 + TypeScript + Tailwind CSS (Vite)       |
+-------------------------------------------------------------+
                              |
                              |  HTTP / REST (JSON)
                              v
+-------------------------------------------------------------+
|                     FastAPI REST API                        |
|       - Asynchronous endpoints (/health, /news, /simplify)  |
|       - Pydantic validation & CORS middleware               |
|       - Secure Environment Variable Secret Management       |
+-------------------------------------------------------------+
            |                                    |
            | News Fetching                      | LLM Inference Request
            v                                    v
+-------------------------+          +------------------------+
|        NewsAPI          |          |  Groq Llama 3.3 70B    |
| Global Financial Feeds  |          | Zero-Jargon NLP Engine |
+-------------------------+          +------------------------+
            |                                    |
            +------------------+-----------------+
                               |
                               v
+-------------------------------------------------------------+
|                  Simplified Financial News                  |
|     (Executive Summary, Key Takeaways, Jargon Glossary)     |
+-------------------------------------------------------------+`}
            </pre>
          </div>
        </div>

        {/* Backend API Endpoints Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">
              Backend REST API Specification
            </h2>
            <p className="text-sm text-slate-600">
              Standardized HTTP routes exposed for client consumption and third-party integrations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Endpoint</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Response Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {apiEndpoints.map((ep, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        ep.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      {ep.path}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {ep.desc}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                      {ep.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Python FastAPI Implementation Code Section */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Python FastAPI Implementation Source (main.py)
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Ready for BTech AI/DS project review & execution
                </p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'Code Copied' : 'Copy Python Code'}</span>
            </button>
          </div>

          <div className="bg-slate-950 rounded-xl p-4 overflow-x-auto max-h-96 text-xs font-mono text-slate-300">
            <pre>{pythonFastAPICode}</pre>
          </div>
        </div>

        {/* Important Regulatory Disclaimer */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-950">
              Important Financial Disclaimer
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              MarketPlain provides simplified news summaries for informational and educational purposes only. It does not provide financial, investment, legal, or tax advice. Market participants should perform independent due diligence before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
