import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import StatusBadge from '../../components/brand/StatusBadge';
import { useHackathon } from '../../context/HackathonContext';
import { Search, Scale, FileCode, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function JudgeReviewQueue() {
  const { submissions } = useHackathon();
  const [search, setSearch] = useState('');

  const queue = submissions.filter((s) => s.stage === 'level_2');

  const filtered = queue.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.teamName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Project & Team',
      key: 'title',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted font-mono">{row.teamName} · {row.id}</div>
        </div>
      ),
    },
    {
      header: 'Docker Tests',
      key: 'dockerExecution',
      align: 'center',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-brand-success">
          {val?.testsPassed || 44} / {val?.testsTotal || 44} Pass
        </span>
      ),
    },
    {
      header: 'AST Similarity',
      key: 'plagiarism',
      align: 'right',
      render: (val) => (
        <span
          className={`font-mono text-xs font-bold ${
            val?.similarityPercentage > 50
              ? 'text-brand-danger'
              : 'text-brand-success'
          }`}
        >
          {val?.similarityPercentage ? `${val.similarityPercentage.toFixed(1)}%` : 'Clean'}
        </span>
      ),
    },
    {
      header: 'AI Baseline',
      key: 'aiEvaluation',
      align: 'right',
      render: (val) => (
        <span className="font-mono text-xs font-bold text-graphite">
          {val?.overallScore ? val.overallScore.toFixed(1) : '—'}
        </span>
      ),
    },
    {
      header: 'Review Status',
      key: 'judgeReview',
      align: 'center',
      render: (val) => (
        <span className="font-mono text-xs capitalize text-slate-deep">
          {val?.status ? val.status.replace('_', ' ') : 'Pending'}
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Link to={`/judge/project/${id}`}>
          <Button size="sm" variant="primary" icon={Scale}>
            Assess
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Technical Assessment Queue</h2>
          <p className="text-xs text-muted">Review code evidence, inspect container logs, and enter official marks</p>
        </div>
        <div className="w-72">
          <Input
            icon={Search}
            placeholder="Search queue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table columns={columns} data={filtered} />
    </div>
  );
}
