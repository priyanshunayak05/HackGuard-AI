import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import JudgeScoringPanel from '../../components/evaluation/JudgeScoringPanel';
import AIAnalysisReport from '../../components/evaluation/AIAnalysisReport';
import CodeExecutionTerminal from '../../components/evaluation/CodeExecutionTerminal';
import PlagiarismComparisonView from '../../components/evaluation/PlagiarismComparisonView';
import Tabs from '../../components/common/Tabs';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import { useHackathon } from '../../context/HackathonContext';
import { 
  Scale, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  GitBranch, 
  ExternalLink, 
  FileCode, 
  Play, 
  ArrowLeft 
} from 'lucide-react';

export default function JudgeProjectDetail() {
  const { id } = useParams();
  const { submissions, updateSubmission } = useHackathon();

  const submission = submissions.find((s) => s.id === id) || submissions[1]; // fallback sample

  const [activeTab, setActiveTab] = useState('scoring'); // 'scoring' | 'ai' | 'sandbox' | 'plagiarism'

  const tabs = [
    { id: 'scoring', label: 'Judge Rubric Scoring', icon: Scale },
    { id: 'ai', label: 'AI Evidence Report', icon: Sparkles },
    { id: 'sandbox', label: 'Docker Container Logs', icon: Terminal },
    { id: 'plagiarism', label: 'AST Plagiarism Scan', icon: ShieldCheck },
  ];

  const handleSaveReview = (reviewPayload) => {
    updateSubmission(submission.id, {
      judgeReview: reviewPayload,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/judge/review-queue"
            className="text-xs text-muted hover:text-signal-blue inline-flex items-center gap-1 mb-2 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Review Queue</span>
          </Link>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-graphite tracking-tight">
              {submission.title}
            </h2>
            <StatusBadge status={submission.status} size="xs" />
          </div>
          <p className="text-xs text-muted mt-0.5">
            Team: <span className="font-semibold text-graphite">{submission.teamName}</span> · ID: <span className="font-mono">{submission.id}</span>
          </p>
        </div>

        {/* External Evidence Links */}
        <div className="flex items-center gap-2">
          {submission.repoUrl && (
            <a
              href={submission.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle bg-surface-white hover:bg-surface-soft text-xs font-mono font-medium text-slate-deep transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-signal-blue" />
              <span>Git Repository</span>
              <ExternalLink className="w-3 h-3 text-muted" />
            </a>
          )}
          {submission.demoVideoUrl && (
            <a
              href={submission.demoVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-border-subtle bg-surface-white hover:bg-surface-soft text-xs font-mono font-medium text-slate-deep transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-brand-ai" />
              <span>Demo Video</span>
              <ExternalLink className="w-3 h-3 text-muted" />
            </a>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      {/* Main Tab Content */}
      {activeTab === 'scoring' && (
        <JudgeScoringPanel submission={submission} onSaveReview={handleSaveReview} />
      )}

      {activeTab === 'ai' && submission.aiEvaluation && (
        <AIAnalysisReport aiEvaluation={submission.aiEvaluation} submission={submission} />
      )}

      {activeTab === 'sandbox' && submission.dockerExecution && (
        <CodeExecutionTerminal execution={submission.dockerExecution} />
      )}

      {activeTab === 'plagiarism' && submission.plagiarism && (
        <PlagiarismComparisonView
          plagiarism={submission.plagiarism}
          teamName={submission.teamName}
        />
      )}
    </div>
  );
}

