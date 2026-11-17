import React from 'react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import { useHackathon } from '../../context/HackathonContext';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle2 } from 'lucide-react';

export default function JudgeEvaluatedProjects() {
  const { submissions } = useHackathon();

  // Evaluated projects
  const evaluated = submissions.filter((s) => s.judgeReview?.status === 'submitted' || s.overallScore);

  const columns = [
    {
      header: 'Project & Team',
      key: 'title',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted font-mono">{row.teamName}</div>
        </div>
      ),
    },
    {
      header: 'AI Baseline',
      key: 'aiEvaluation',
      align: 'right',
      render: (val, row) => (
        <span className="font-mono text-xs text-muted tabular-nums">
          {val?.overallScore ? val.overallScore.toFixed(1) : row.aiScore?.toFixed(1) || '89.0'}
        </span>
      ),
    },
    {
      header: 'Judge Score Awarded',
      key: 'judgeReview',
      align: 'right',
      render: (val, row) => (
        <span className="font-mono font-bold text-xs text-signal-blue tabular-nums">
          {val?.totalJudgeScore ? val.totalJudgeScore.toFixed(1) : row.judgeScore?.toFixed(1) || '88.0'} / 100
        </span>
      ),
    },
    {
      header: 'Score Divergence',
      key: 'judgeReview',
      align: 'center',
      render: (val) => (
        <span className="font-mono text-xs text-slate-deep">
          {val?.isOverride ? '+1.8 (Override)' : 'Within Margin'}
        </span>
      ),
    },
    {
      header: 'Actions',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Link to={`/judge/project/${id}`}>
          <Button size="sm" variant="outline">
            Review Marks
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">Evaluated Projects Archive</h2>
        <p className="text-xs text-muted">Historical record of submissions evaluated and scored by you</p>
      </div>

      <Table columns={columns} data={evaluated} />
    </div>
  );
}

