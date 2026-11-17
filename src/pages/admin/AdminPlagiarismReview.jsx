import React, { useState } from 'react';
import PlagiarismComparisonView from '../../components/evaluation/PlagiarismComparisonView';
import Table from '../../components/common/Table';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { useHackathon } from '../../context/HackathonContext';
import { GitCompare, AlertTriangle, ShieldCheck, FileCode } from 'lucide-react';

export default function AdminPlagiarismReview() {
  const { submissions } = useHackathon();

  // Submissions with plagiarism data
  const flagged = submissions.filter((s) => s.plagiarism);
  const [selectedSub, setSelectedSub] = useState(flagged[1] || flagged[0]);

  const columns = [
    {
      header: 'Team & Project',
      key: 'teamName',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted truncate max-w-xs">{row.title}</div>
        </div>
      ),
    },
    {
      header: 'Matched Target',
      key: 'plagiarism',
      render: (val) => (
        <span className="text-xs font-mono text-slate-deep font-medium">
          {val.matchedTeam}
        </span>
      ),
    },
    {
      header: 'AST Similarity',
      key: 'plagiarism',
      align: 'right',
      render: (val) => (
        <span
          className={`font-mono font-bold text-xs tabular-nums ${
            val.similarityPercentage > 50
              ? 'text-brand-danger'
              : val.similarityPercentage > 25
              ? 'text-brand-warning'
              : 'text-brand-success'
          }`}
        >
          {val.similarityPercentage.toFixed(1)}%
        </span>
      ),
    },
    {
      header: 'Risk Level',
      key: 'plagiarism',
      align: 'center',
      render: (val) => (
        <span
          className={`font-mono text-[11px] uppercase px-2 py-0.5 rounded font-semibold ${
            val.riskLevel === 'critical'
              ? 'bg-red-50 text-brand-danger border border-red-200'
              : val.riskLevel === 'moderate'
              ? 'bg-amber-50 text-brand-warning border border-amber-200'
              : 'bg-emerald-50 text-brand-success border border-emerald-200'
          }`}
        >
          {val.riskLevel}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'plagiarism',
      align: 'center',
      render: (val) => <StatusBadge status={val.status} size="xs" />,
    },
    {
      header: 'Compare',
      key: 'id',
      align: 'right',
      render: (_, row) => (
        <Button
          size="sm"
          variant={selectedSub?.id === row.id ? 'primary' : 'outline'}
          onClick={() => setSelectedSub(row)}
        >
          {selectedSub?.id === row.id ? 'Active' : 'Inspect'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">
            AST Semantic Plagiarism & Code Integrity Center
          </h2>
          <p className="text-xs text-muted">
            Inspect control-flow graph token overlaps against internal submissions and indexed open-source ecosystems
          </p>
        </div>
      </div>

      {/* Flagged Submissions Table */}
      <Table columns={columns} data={flagged} />

      {/* Detailed Side-by-Side Comparison Workspace */}
      {selectedSub && selectedSub.plagiarism && (
        <div className="pt-2">
          <PlagiarismComparisonView
            plagiarism={selectedSub.plagiarism}
            teamName={selectedSub.teamName}
          />
        </div>
      )}
    </div>
  );
}
