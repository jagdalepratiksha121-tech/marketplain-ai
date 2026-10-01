import React from 'react';
import {
  User,
  Layout,
  Server,
  Globe2,
  Cpu,
  Sparkles,
  ArrowDown,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  Terminal,
  Database
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'User Requests Simplification',
      desc: 'The user accesses MarketPlain via desktop or mobile and clicks "Fetch & Simplify" or tests a custom article.',
      icon: User,
      badge: 'Client Action'
    },
    {
      num: '02',
      title: 'Frontend (React & TypeScript)',
      desc: 'Client makes an asynchronous REST API call (`GET /api/news` or `POST /api/simplify`) with category parameters.',
      icon: Layout,
      badge: 'Presentation Layer'
    },
    {
      num: '03',
      title: 'FastAPI / Express Backend',
      desc: 'Validates request payload, checks cache, loads environment variables, and orchestrates upstream service requests.',
      icon: Server,
      badge: 'REST API'
    },
    {
      num: '04',
      title: 'NewsAPI Ingestion',
      desc: 'Queries NewsAPI live endpoints for the latest financial, banking, technology, and economic headlines worldwide.',
      icon: Globe2,
      badge: 'Data Provider'
    },
    {
      num: '05',
      title: 'Groq Llama 3.3 70B Engine',
      desc: 'The powerful Llama 3.3 70B model analyzes the financial text, isolates complex jargon, and extracts factual insights.',
      icon: Cpu,
      badge: 'Inference Engine'
    },
    {
      num: '06',
      title: 'AI Simplification & Formatting',
      desc: 'Generates structured JSON with 2-sentence summary, 4 bullet takeaways, and a financial terms glossary.',
      icon: Sparkles,
      badge: 'NLP Parsing'
    },
    {
      num: '07',
      title: 'Responsive Delivery to User',
      desc: 'Frontend renders clean, legible cards with toggleable views, comparison tabs, and zero-jargon explanations.',
      icon: CheckCircle2,
      badge: 'Value Delivered'
    }
  ];

  const technologies = [
    {
      name: 'HTML5',
      category: 'Frontend',
      desc: 'Semantic web markup ensuring clean accessibility and responsive DOM structuring.',
      icon: FileCode
    },
    {
      name: 'CSS3 & Tailwind CSS',
      category: 'Styling',
      desc: 'Modern utility-first styling with zero-pill typography, soft shadows, and clean fintech aesthetics.',
      icon: Layout
    },
    {
      name: 'JavaScript / TypeScript',
      category: 'Language',
      desc: 'Strict type safety across client interfaces, API contracts, and asynchronous pipelines.',
      icon: Terminal
    },
    {
      name: 'FastAPI (Python)',
      category: 'Backend',
      desc: 'High-performance asynchronous Python REST framework with automatic OpenAPI documentation and CORS support.',
      icon: Server
    },
    {
      name: 'Python 3.11+',
      category: 'Language',
      desc: 'Robust, battle-tested programming language powering machine learning inference and backend endpoints.',
      icon: Terminal
    },
    {
      name: 'NewsAPI',
      category: 'Data Source',
      desc: 'Syndicated financial news wire API aggregating articles from Bloomberg, Reuters, WSJ, and CNBC.',
      icon: Globe2
    },
    {
      name: 'Groq Cloud',
      category: 'AI Infrastructure',
      desc: 'Ultra-low-latency LPU (Language Processing Unit) inference delivering instant AI responses.',
      icon: Cpu
    },
    {
      name: 'Llama 3.3 70B',
      category: 'Foundation Model',
      desc: 'State-of-the-art open-weights model capable of deep financial text reasoning, synthesis, and zero-shot simplification.',
      icon: Sparkles
    }
  ];

  return (
    <div className="w-full py-12 lg:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            System Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How MarketPlain Works
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A transparent walkthrough of our end-to-end data pipeline: from financial wire ingestion to Llama 3.3 70B simplification.
          </p>
        </div>

        {/* Complete System Flow Diagram */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Interactive Architectural Flow
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              RESTful Protocol · JSON Payload
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3 relative hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                        {step.num}
                      </span>
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 text-[10px] uppercase font-mono font-semibold text-slate-400">
                    {step.badge}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ASCII / Visual Flow representation */}
          <div className="bg-slate-900 rounded-2xl p-6 text-slate-300 font-mono text-xs overflow-x-auto">
            <div className="text-slate-400 mb-2">// Direct REST API Pipeline Execution:</div>
            <div className="text-emerald-400">
              User [Browser] ──▶ React 19 Frontend ──▶ FastAPI / Express Proxy (/api/simplify)
            </div>
            <div className="text-blue-400 pl-8">
              │
            </div>
            <div className="text-blue-400 pl-8">
              ├──▶ NewsAPI (Query: 'economy' OR 'stock market') ──▶ Raw Financial Articles
            </div>
            <div className="text-blue-400 pl-8">
              │
            </div>
            <div className="text-amber-400 pl-8">
              └──▶ Groq API [Llama 3.3 70B Versatile] (Temperature: 0.2)
            </div>
            <div className="text-amber-400 pl-16">
              └──▶ Natural Language Extraction: Jargon → Plain English
            </div>
            <div className="text-emerald-400 pt-2">
              User ◀── Responsive Dashboard ◀── Validated JSON: {'{ simplified_summary, key_takeaways, glossary }'}
            </div>
          </div>
        </div>

        {/* Technology Showcase Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Technology Stack
            </h2>
            <p className="text-sm text-slate-600">
              Built using industry-standard modern web, backend, and machine learning components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prompt Engineering Specification */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              AI Prompting & Guardrails Protocol
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            The backend instructs Groq Llama 3.3 70B with strict financial literacy constraints to guarantee accuracy and readability:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No Financial Halucinations
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                The model is constrained strictly to the numbers, facts, and corporate guidance present in the source article. It never invents stock targets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Mandatory Jargon Translation
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every technical term (e.g. basis points, yield curve, EBITDA) must be paired with an immediate plain-language definition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
