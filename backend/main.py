"""
MarketPlain – FastAPI Backend
Powered by NewsAPI + Groq Llama 3.3 70B
File: backend/main.py
Execution: uvicorn backend.main:app --reload --port 8000
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

# CORS configuration
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

@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "app": "MarketPlain – Financial News Simplifier",
        "groq_configured": bool(GROQ_API_KEY),
        "newsapi_configured": bool(NEWS_API_KEY)
    }

@app.get("/news", tags=["News"])
async def get_financial_news(
    category: Optional[str] = Query(default="all"),
    q: Optional[str] = Query(default="")
):
    """Fetches real-time financial news from NewsAPI or returns fallback dataset."""
    if not NEWS_API_KEY:
        return {
            "source": "curated_stream",
            "message": "Add NEWS_API_KEY to .env to enable direct NewsAPI streaming."
        }
    
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
    
    prompt = f"""You are MarketPlain, a senior financial editor explaining complex finance news to beginners.
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
        parsed = json.loads(data["choices"][0]["message"]["content"])
        parsed["engine_used"] = "Groq Llama 3.3 70B"
        return parsed

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
