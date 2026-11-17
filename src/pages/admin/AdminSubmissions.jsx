import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import Drawer from '../../components/common/Drawer';
import AIAnalysisReport from '../../components/evaluation/AIAnalysisReport';
import CodeExecutionTerminal from '../../components/evaluation/CodeExecutionTerminal';
import PlagiarismComparisonView from '../../components/evaluation/PlagiarismComparisonView';
import { useHackathon } from '../../context/HackathonContext';
import { Search, FileCode, ExternalLink, Terminal, GitBranch, Sparkles } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function AdminSubmissions() {
  const { submissions } = useHackathon();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.teamName.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'all' || s.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const columns = [
    {
      header: 'Project & Team',
      key: 'title',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite tracking-tight text-[13px]">{val}</div>
          <div className="text-xs text-muted">{row.teamName}</div>
        </div>
      ),
    },
    {
      header: 'Stage',
      key: 'stage',
      render: (val) => (
        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-surface-soft border border-border-subtle font-semibold text-slate-deep">
          {val === 'level_1' ? 'L1 Idea' : 'L2 Code'}
        </span>
      ),
    },
    {
      header: 'Submitted At',
      key: 'submittedAt',
      render: (val) => <span className="font-mono text-xs text-muted">{formatDate(val)}</span>,
    },
    {
      header: 'AI Score',
      key: 'overallScore',
      align: 'right',
      render: (val, row) => (
        <span className="font-mono font-bold text-xs text-graphite">
          {val ? val.toFixed(1) : row.aiEvaluation?.overallScore?.toFixed(1) || '—'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
    {
      header: 'Inspect',
      key: 'id',
      align: 'right',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={() => setSelectedSub(row)}>
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Project Submissions Pipeline</h2>
          <p className="text-xs text-muted">Inspect Level 1 concept artifacts, Docker runtime telemetry, and AST comparisons</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input
              icon={Search}
              placeholder="Search project or team..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-36">
            <Select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Stages' },
                { value: 'level_1', label: 'Level 1' },
                { value: 'level_2', label: 'Level 2' },
              ]}
            />
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        onRowClick={(row) => setSelectedSub(row)}
      />

      {/* Deep Inspection Drawer */}
      <Drawer
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        title={selectedSub?.title}
        subtitle={`${selectedSub?.teamName} · ${selectedSub?.stage?.toUpperCase()}`}
        width="max-w-3xl"
      >
        {selectedSub && (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-surface-soft border border-border-subtle rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-muted uppercase">Submission ID:</span>
                <span className="font-bold text-graphite">{selectedSub.id}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-muted uppercase">Stage:</span>
                <span className="font-bold text-signal-blue">{selectedSub.stage}</span>
              </div>
              {selectedSub.repoUrl && (
                <div className="flex justify-between font-mono">
                  <span className="text-muted uppercase">Repo:</span>
                  <a
                    href={selectedSub.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-signal-blue hover:underline flex items-center gap-1"
                  >
                    <span>{selectedSub.repoUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* AI Evaluation Section */}
            {selectedSub.aiEvaluation && (
              <AIAnalysisReport aiEvaluation={selectedSub.aiEvaluation} submission={selectedSub} />
            )}

            {/* Docker Execution Section */}
            {selectedSub.dockerExecution && (
              <CodeExecutionTerminal execution={selectedSub.dockerExecution} />
            )}

            {/* Plagiarism Analysis Section */}
            {selectedSub.plagiarism && (
              <PlagiarismComparisonView
                plagiarism={selectedSub.plagiarism}
                teamName={selectedSub.teamName}
              />
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
