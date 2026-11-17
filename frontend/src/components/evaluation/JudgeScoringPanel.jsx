import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useToast } from '../common/Toast';
import { Scale, CheckCircle2, AlertCircle, Sparkles, Save, Send } from 'lucide-react';

export default function JudgeScoringPanel({ submission, rubric, onSaveReview }) {
  const { toast } = useToast();

  const defaultRubric = rubric || [
    { criterionId: 'r2_code', criterionName: 'Code Architecture & AST Modularity', maxMarks: 25, aiScore: 23.5 },
    { criterionId: 'r2_exec', criterionName: 'Docker Container Execution & Test Pass Rate', maxMarks: 25, aiScore: 25.0 },
    { criterionId: 'r2_sec', criterionName: 'Defensive Robustness & Error Handling', maxMarks: 20, aiScore: 18.5 },
    { criterionId: 'r2_impact', criterionName: 'Functional Impact & Demo Validation', maxMarks: 30, aiScore: 24.2 },
  ];

  const existingReview = submission?.judgeReview || {};

  const [scores, setScores] = useState(() => {
    return defaultRubric.map((r) => {
      const match = existingReview.scores?.find((s) => s.criterionId === r.criterionId);
      return {
        criterionId: r.criterionId,
        criterionName: r.criterionName,
        maxMarks: r.maxMarks,
        aiScore: r.aiScore,
        enteredMarks: match?.enteredMarks ?? r.maxMarks * 0.9,
        remarks: match?.remarks || '',
      };
    });
  });

  const [feedback, setFeedback] = useState(existingReview.feedback || 'Exemplary architectural design and verifiable runtime behavior.');
  const [overrideReason, setOverrideReason] = useState(existingReview.overrideReason || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalJudgeScore = scores.reduce((sum, s) => sum + (parseFloat(s.enteredMarks) || 0), 0);
  const totalAiScore = defaultRubric.reduce((sum, s) => sum + (parseFloat(s.aiScore) || 0), 0);
  const isDivergent = Math.abs(totalJudgeScore - totalAiScore) >= 3.0;

  const handleScoreChange = (idx, val) => {
    const num = Math.min(Math.max(0, parseFloat(val) || 0), scores[idx].maxMarks);
    const updated = [...scores];
    updated[idx].enteredMarks = num;
    setScores(updated);
  };

  const handleRemarkChange = (idx, text) => {
    const updated = [...scores];
    updated[idx].remarks = text;
    setScores(updated);
  };

  const handleSubmit = (isDraft = false) => {
    if (!isDraft && isDivergent && !overrideReason.trim()) {
      toast('A brief override reason is required when your score diverges from the AI benchmark.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const payload = {
        status: isDraft ? 'saved_draft' : 'submitted',
        scores,
        totalJudgeScore,
        feedback,
        isOverride: isDivergent,
        overrideReason: isDivergent ? overrideReason : '',
      };
      toast(isDraft ? 'Review draft saved.' : 'Final evaluation marks submitted.', 'success');
      if (onSaveReview) onSaveReview(payload);
    }, 600);
  };

  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-brand-success flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-graphite tracking-tight">
              Judge Scoring & Calibration Workspace
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Enter official marks per rubric criterion. AI benchmark baseline is displayed for calibration.
            </p>
          </div>
        </div>

        {/* Score Comparison Display */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-surface-soft border border-border-subtle rounded-md px-3 py-1.5 text-center">
            <div className="text-[10px] text-muted">AI BENCHMARK</div>
            <div className="font-bold text-slate-deep">{totalAiScore.toFixed(1)}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-1.5 text-center">
            <div className="text-[10px] text-signal-blue font-semibold">JUDGE MARKS</div>
            <div className="font-bold text-graphite text-base">{totalJudgeScore.toFixed(1)} / 100</div>
          </div>
        </div>
      </div>

      {/* Rubric Score Entry Table */}
      <div className="border border-border-subtle rounded-lg overflow-hidden bg-surface-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-surface-subtle text-muted font-mono uppercase text-[11px] border-b border-border-subtle">
            <tr>
              <th className="py-2.5 px-4 font-semibold">Evaluation Criterion</th>
              <th className="py-2.5 px-4 font-semibold text-center w-24">AI Ref</th>
              <th className="py-2.5 px-4 font-semibold text-center w-32">Your Marks</th>
              <th className="py-2.5 px-4 font-semibold">Evaluator Notes / Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/60">
            {scores.map((sc, idx) => (
              <tr key={sc.criterionId} className="hover:bg-surface-soft/40 transition-colors">
                <td className="py-3 px-4 font-medium text-graphite">
                  <div>{sc.criterionName}</div>
                  <div className="text-[11px] text-muted font-mono">Max Marks: {sc.maxMarks}</div>
                </td>
                <td className="py-3 px-4 text-center font-mono text-muted tabular-nums">
                  {sc.aiScore?.toFixed(1) || '—'}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max={sc.maxMarks}
                      value={sc.enteredMarks}
                      onChange={(e) => handleScoreChange(idx, e.target.value)}
                      className="w-16 h-8 text-center font-mono font-bold text-graphite border border-border-subtle rounded bg-surface-white focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
                    />
                    <span className="text-muted font-mono">/ {sc.maxMarks}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={sc.remarks}
                    onChange={(e) => handleRemarkChange(idx, e.target.value)}
                    placeholder="Optional remarks on this rubric criterion..."
                    className="w-full h-8 text-xs px-2.5 bg-surface-soft border border-border-subtle rounded focus:outline-none focus:ring-1 focus:ring-signal-blue/20"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mandatory Override Notice if divergent */}
      {isDivergent && (
        <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg space-y-2 text-xs">
          <div className="font-bold text-brand-warning flex items-center gap-1.5 font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>Score Divergence Override Triggered (&Delta; &ge; 3.0 pts)</span>
          </div>
          <p className="text-amber-900 leading-relaxed">
            Your score deviates from the automated AI baseline by {(totalJudgeScore - totalAiScore).toFixed(1)} points. To maintain institutional fairness and non-repudiation, please enter a brief justification:
          </p>
          <textarea
            rows={2}
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            placeholder="e.g. Verified exceptional code elegance in live demo video exceeding automated static metric..."
            className="w-full bg-surface-white text-graphite text-xs border border-amber-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brand-warning/20"
            required
          />
        </div>
      )}

      {/* General Feedback Textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-graphite block">
          Comprehensive Feedback to Team
        </label>
        <textarea
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share constructive technical feedback, architecture comments, or encouragement..."
          className="w-full bg-surface-white text-graphite text-xs border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSubmit(true)}
          icon={Save}
        >
          Save Evaluation Draft
        </Button>
        <Button
          variant="primary"
          size="sm"
          loading={isSubmitting}
          onClick={() => handleSubmit(false)}
          icon={Send}
        >
          Submit Final Evaluation
        </Button>
      </div>
    </div>
  );
}

