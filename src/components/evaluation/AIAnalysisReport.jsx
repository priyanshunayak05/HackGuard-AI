import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  Cpu,
  BarChart2
} from 'lucide-react';

export default function AIAnalysisReport({ aiEvaluation, submission }) {
  if (!aiEvaluation) {
    return (
      <div className="bg-surface-white border border-border-subtle rounded-xl p-8 text-center text-xs text-muted">
        AI Evaluation Engine has not processed this submission yet.
      </div>
    );
  }

  const { overallScore, criteria = [], summary, strengths = [], weaknesses = [], actionableSuggestions = [], citations = [] } = aiEvaluation;

  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle space-y-6 p-6">
      {/* Top Banner: AI Score Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border-subtle gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 text-brand-ai flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-graphite tracking-tight">
                AI Evaluation Engine Assessment
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
                Model: HG-Audit-v4
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Automated rubric scoring calibrated against project AST, test logs, and problem specification.
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-2 bg-surface-soft border border-border-subtle rounded-lg px-4 py-2 self-start sm:self-auto">
          <span className="text-xs text-muted font-medium uppercase font-mono">Calibrated Score:</span>
          <span className="text-2xl font-bold font-mono text-graphite tabular-nums">
            {overallScore.toFixed(1)}
          </span>
          <span className="text-xs text-muted font-mono">/ 100</span>
        </div>
      </div>

      {/* Criteria Breakdown Grid */}
      <div>
        <h4 className="text-xs font-bold text-graphite uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-signal-blue" />
          <span>Rubric Criteria Breakdown</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {criteria.map((c, idx) => {
            const pct = Math.round((c.score / c.max) * 100);
            return (
              <div
                key={idx}
                className="p-3.5 bg-surface-soft/60 border border-border-subtle rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-graphite">{c.name}</span>
                  <span className="font-mono font-semibold text-graphite tabular-nums">
                    {c.score.toFixed(1)} / {c.max}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      pct >= 85
                        ? 'bg-brand-success'
                        : pct >= 70
                        ? 'bg-signal-blue'
                        : 'bg-brand-warning'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-muted font-mono">
                  <span>Weight index: {pct}%</span>
                  <span>{pct >= 80 ? 'Exceeds Standard' : 'Meets Baseline'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Synthesis Summary */}
      <div className="p-4 bg-blue-50/40 border border-blue-200/60 rounded-lg space-y-1.5">
        <div className="text-xs font-bold text-slate-deep uppercase tracking-wider font-mono">
          Executive Synthesis
        </div>
        <p className="text-xs text-slate-deep leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Strengths & Weaknesses Two-Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Strengths */}
        <div className="border border-border-subtle rounded-lg p-4 bg-surface-white space-y-2.5">
          <div className="text-xs font-bold text-brand-success uppercase tracking-wider font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Strengths & Merits</span>
          </div>
          <ul className="space-y-2 text-xs text-graphite">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-success mt-1.5 shrink-0" />
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Identified Limitations / Weaknesses */}
        <div className="border border-border-subtle rounded-lg p-4 bg-surface-white space-y-2.5">
          <div className="text-xs font-bold text-brand-warning uppercase tracking-wider font-mono flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Limitations & Potential Vulnerabilities</span>
          </div>
          <ul className="space-y-2 text-xs text-graphite">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-warning mt-1.5 shrink-0" />
                <span className="leading-relaxed">{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Suggestions */}
      {actionableSuggestions.length > 0 && (
        <div className="border border-border-subtle rounded-lg p-4 bg-surface-white space-y-2.5">
          <div className="text-xs font-bold text-brand-ai uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            <span>Targeted Architectural Recommendations</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-deep">
            {actionableSuggestions.map((sug, idx) => (
              <div key={idx} className="p-2.5 rounded bg-surface-soft border border-border-subtle leading-relaxed">
                {sug}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Citations & Evidence Linking */}
      {citations.length > 0 && (
        <div className="border border-border-subtle rounded-lg p-4 bg-surface-subtle/60 space-y-2">
          <div className="text-xs font-bold text-muted uppercase tracking-wider font-mono flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Grounded Code Citations & Trace Evidence</span>
          </div>
          <div className="space-y-1.5">
            {citations.map((cite, idx) => (
              <div key={idx} className="font-mono text-[11px] text-slate-deep bg-surface-white p-2 rounded border border-border-subtle">
                {cite}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
