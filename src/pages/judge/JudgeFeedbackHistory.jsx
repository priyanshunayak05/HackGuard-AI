import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import { Scale, MessageSquare, AlertCircle } from 'lucide-react';

export default function JudgeFeedbackHistory() {
  const { submissions } = useHackathon();

  const reviews = submissions
    .filter((s) => s.judgeReview?.feedback)
    .map((s) => ({
      submissionId: s.id,
      teamName: s.teamName,
      title: s.title,
      feedback: s.judgeReview.feedback,
      overrideReason: s.judgeReview.overrideReason,
      isOverride: s.judgeReview.isOverride,
      score: s.judgeReview.totalJudgeScore,
    }));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">Evaluator Feedback Log</h2>
        <p className="text-xs text-muted">Chronological feedback and score override justifications submitted to teams</p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.submissionId}
            className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div>
                <div className="font-bold text-graphite text-sm">{rev.title}</div>
                <div className="text-xs text-muted font-mono">{rev.teamName} · {rev.submissionId}</div>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-muted uppercase font-sans">Awarded: </span>
                <span className="font-bold text-signal-blue text-sm">{rev.score?.toFixed(1) || '88.0'}</span>
              </div>
            </div>

            <div className="text-xs text-slate-deep leading-relaxed">
              <span className="font-semibold text-graphite">Written Feedback: </span>
              {rev.feedback}
            </div>

            {rev.isOverride && rev.overrideReason && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 font-mono text-brand-warning">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Audit Override Justification:</span>
                </div>
                <p className="leading-relaxed">{rev.overrideReason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
