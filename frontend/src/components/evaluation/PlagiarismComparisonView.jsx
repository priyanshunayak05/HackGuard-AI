import React, { useState } from 'react';
import { 
  GitCompare, 
  ShieldAlert, 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  FileCode,
  FileText,
  ExternalLink
} from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../common/Toast';

export default function PlagiarismComparisonView({ plagiarism, teamName, onUpdateStatus }) {
  const { toast } = useToast();
  const [reviewNotes, setReviewNotes] = useState(plagiarism?.reviewerNotes || '');
  const [activeTab, setActiveTab] = useState('diff'); // 'diff' | 'ast' | 'audit'
  const [actionTaken, setActionTaken] = useState(plagiarism?.status || 'under_review');

  if (!plagiarism) {
    return (
      <div className="bg-surface-white border border-border-subtle rounded-xl p-8 text-center text-xs text-muted">
        No plagiarism comparison data recorded.
      </div>
    );
  }

  const {
    similarityPercentage = 11.4,
    riskLevel = 'low',
    matchedTeam = 'OpenSource AST Base (Tree-Sitter Official)',
    matchedFilesCount = 2,
    astFingerprintScore = 0.94,
    summary = 'High structural originality.',
    matchedCodeRegions = [
      {
        file: 'core/src/ast/visitor.rs',
        submissionCode: `pub fn traverse_syntax_tree(&mut self, root_node: &Node) {\n    let mut cursor = root_node.walk();\n    loop {\n        let current = cursor.node();\n        self.apply_invariants(&current);\n        if !cursor.goto_first_child() {\n            while !cursor.goto_next_sibling() {\n                if !cursor.goto_parent() {\n                    return;\n                }\n            }\n        }\n    }\n}`,
        sourceCode: `pub fn visit_ast_hierarchy(&mut self, root: &AstNode) {\n    let mut walker = root.cursor();\n    loop {\n        let node = walker.current();\n        self.verify_rules(&node);\n        if !walker.step_child() {\n            while !walker.step_sibling() {\n                if !walker.step_parent() {\n                    return;\n                }\n            }\n        }\n    }\n}`,
        similarity: 88.0,
      },
    ],
  } = plagiarism;

  const handleAction = (status) => {
    setActionTaken(status);
    toast(`Audit determination saved: ${status.replace('_', ' ').toUpperCase()}`, 'success');
    if (onUpdateStatus) {
      onUpdateStatus({ action: status, notes: reviewNotes });
    }
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 text-brand-danger border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'moderate':
        return 'bg-amber-50 text-brand-warning border-amber-200';
      default:
        return 'bg-emerald-50 text-brand-success border-emerald-200';
    }
  };

  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle space-y-5 p-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 text-brand-danger flex items-center justify-center">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-graphite tracking-tight">
                AST Structural Similarity & Integrity Engine
              </h3>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${getRiskBadge(riskLevel)}`}>
                Risk Level: {riskLevel}
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Abstract Syntax Tree tokenization comparisons against public repositories and competitor submissions.
            </p>
          </div>
        </div>

        {/* Big Similarity Index */}
        <div className="bg-surface-soft border border-border-subtle rounded-lg px-4 py-2 flex items-baseline gap-2 self-start sm:self-auto font-mono">
          <span className="text-xs text-muted uppercase">Similarity Index:</span>
          <span
            className={`text-2xl font-bold tabular-nums ${
              similarityPercentage > 50
                ? 'text-brand-danger'
                : similarityPercentage > 25
                ? 'text-brand-warning'
                : 'text-brand-success'
            }`}
          >
            {similarityPercentage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Comparison Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle">
          <div className="text-[11px] text-muted font-mono uppercase">Target Comparison</div>
          <div className="font-semibold text-graphite mt-1 truncate">{teamName}</div>
          <div className="text-[10px] text-muted">Active Submission</div>
        </div>

        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle">
          <div className="text-[11px] text-muted font-mono uppercase">Matched Source Target</div>
          <div className="font-semibold text-graphite mt-1 truncate">{matchedTeam}</div>
          <div className="text-[10px] text-muted">{matchedFilesCount} matched source files</div>
        </div>

        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle">
          <div className="text-[11px] text-muted font-mono uppercase">AST Fingerprint Metric</div>
          <div className="font-semibold text-slate-deep font-mono mt-1">{astFingerprintScore}</div>
          <div className="text-[10px] text-muted">Control-flow graph similarity</div>
        </div>
      </div>

      {/* Engine Synthesis */}
      <div className="p-3.5 bg-surface-soft/60 rounded-lg border border-border-subtle text-xs text-graphite">
        <span className="font-mono text-muted uppercase font-semibold text-[10px] mr-1">Engine Finding:</span>
        {summary}
      </div>

      {/* Side-by-Side Code Diff Viewer */}
      <div className="border border-border-subtle rounded-lg overflow-hidden bg-surface-white">
        <div className="bg-surface-subtle px-4 py-2 border-b border-border-subtle flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-signal-blue" />
            <span className="font-semibold text-graphite">Matched Region: {matchedCodeRegions[0]?.file}</span>
          </div>
          <span className="text-muted text-[11px]">Token Overlap: {matchedCodeRegions[0]?.similarity}%</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle font-mono text-[11px]">
          {/* Left: Submitted Code */}
          <div className="p-4 bg-surface-white overflow-x-auto">
            <div className="text-[10px] font-bold text-slate-deep uppercase mb-2 flex items-center justify-between">
              <span>{teamName} (Submission)</span>
              <span className="text-muted">Lines 42 - 56</span>
            </div>
            <pre className="text-graphite leading-relaxed">
              <code>{matchedCodeRegions[0]?.submissionCode}</code>
            </pre>
          </div>

          {/* Right: Matched Reference Source */}
          <div className="p-4 bg-surface-soft/40 overflow-x-auto">
            <div className="text-[10px] font-bold text-muted uppercase mb-2 flex items-center justify-between">
              <span>Matched Source ({matchedTeam})</span>
              <span className="text-muted">Reference Node</span>
            </div>
            <pre className="text-slate-deep leading-relaxed">
              <code>{matchedCodeRegions[0]?.sourceCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Evaluator Audit Actions */}
      <div className="border-t border-border-subtle pt-4 space-y-3">
        <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono">
          Evaluator Determination & Reviewer Notes
        </div>
        <textarea
          rows={2}
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
          placeholder="Enter objective justification for confirming concern or dismissing flag..."
          className="w-full bg-surface-white text-graphite text-xs border border-border-subtle rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-muted italic">
            Note: Flags never automatically penalize participants without manual reviewer audit.
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction('cleared')}
              icon={Check}
            >
              Dismiss Flag (Clear)
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => handleAction('confirmed_concern')}
              icon={ShieldAlert}
            >
              Confirm Integrity Concern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

