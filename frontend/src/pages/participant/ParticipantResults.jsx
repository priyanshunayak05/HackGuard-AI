import React, { useState } from 'react';
import AIAnalysisReport from '../../components/evaluation/AIAnalysisReport';
import CodeExecutionTerminal from '../../components/evaluation/CodeExecutionTerminal';
import PlagiarismComparisonView from '../../components/evaluation/PlagiarismComparisonView';
import Tabs from '../../components/common/Tabs';
import StatusBadge from '../../components/brand/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import { Sparkles, Terminal, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

export default function ParticipantResults() {
  const { user } = useAuth();
  const { teams, submissions, activeHackathon } = useHackathon();

  const myTeam = teams.find((t) => t.id === user.teamId) || teams[0];
  const myL1Sub = submissions.find((s) => s.teamId === myTeam.id && s.stage === 'level_1');
  const myL2Sub = submissions.find((s) => s.teamId === myTeam.id && s.stage === 'level_2') || submissions[1]; // fallback sample

  const [activeTab, setActiveTab] = useState('ai_report');

  const tabs = [
    { id: 'ai_report', label: 'AI Evaluation Report', icon: Sparkles },
    { id: 'sandbox_logs', label: 'Docker Sandbox & Test Logs', icon: Terminal },
    { id: 'plagiarism_audit', label: 'AST Plagiarism Integrity', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-graphite tracking-tight">
              Evaluation & Assessment Results
            </h2>
            <StatusBadge status={myL2Sub?.status || 'evaluated'} size="xs" />
          </div>
          <p className="text-xs text-muted mt-0.5">
            Team: <span className="font-semibold text-graphite">{myTeam.name}</span> · Project: <span className="font-semibold text-slate-deep">{myTeam.projectTitle}</span>
          </p>
        </div>

        {/* Score Card */}
        <div className="flex items-baseline gap-3 bg-surface-white border border-border-subtle rounded-xl p-3 px-5 shadow-subtle font-mono">
          <div className="text-left">
            <div className="text-[10px] text-muted uppercase">WEIGHTED TOTAL</div>
            <div className="text-2xl font-bold text-signal-blue tabular-nums">
              {myTeam.level2Score || 90.7}
            </div>
          </div>
          <div className="text-xs text-muted">/ 100</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pill" />

      {/* Content */}
      {activeTab === 'ai_report' && myL2Sub?.aiEvaluation && (
        <AIAnalysisReport aiEvaluation={myL2Sub.aiEvaluation} submission={myL2Sub} />
      )}

      {activeTab === 'sandbox_logs' && myL2Sub?.dockerExecution && (
        <CodeExecutionTerminal execution={myL2Sub.dockerExecution} />
      )}

      {activeTab === 'plagiarism_audit' && myL2Sub?.plagiarism && (
        <PlagiarismComparisonView plagiarism={myL2Sub.plagiarism} teamName={myTeam.name} />
      )}
    </div>
  );
}

