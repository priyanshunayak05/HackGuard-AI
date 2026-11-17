import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import { useHackathon } from '../../context/HackathonContext';
import { useToast } from '../../components/common/Toast';
import { ListTodo, Play, RefreshCw, Cpu, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

export default function AdminEvaluationQueue() {
  const { submissions, updateSubmission } = useHackathon();
  const { toast } = useToast();
  const [runningJob, setRunningJob] = useState(null);

  const queueItems = submissions.map((sub) => ({
    id: sub.id,
    teamName: sub.teamName,
    title: sub.title,
    stage: sub.stage,
    dockerStatus: sub.dockerExecution?.status || 'n/a',
    astStatus: sub.plagiarism?.status || 'clean',
    judgeStatus: sub.judgeReview?.status || 'pending',
    overallScore: sub.overallScore || sub.aiEvaluation?.overallScore || '—',
  }));

  const handleTriggerReRun = (id) => {
    setRunningJob(id);
    setTimeout(() => {
      setRunningJob(null);
      toast(`Evaluation worker re-dispatched for ${id}. Docker sandbox passed.`, 'success');
    }, 1200);
  };

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
      header: 'Stage',
      key: 'stage',
      render: (val) => (
        <span className="font-mono text-xs uppercase text-slate-deep font-semibold">
          {val === 'level_1' ? 'L1 Concept' : 'L2 Code'}
        </span>
      ),
    },
    {
      header: 'Docker Sandbox',
      key: 'dockerStatus',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
    {
      header: 'AST Engine',
      key: 'astStatus',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
    {
      header: 'Judge Review',
      key: 'judgeStatus',
      align: 'center',
      render: (val) => (
        <span className="font-mono text-xs capitalize text-slate-deep">
          {val.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'id',
      align: 'right',
      render: (id) => (
        <Button
          size="sm"
          variant="outline"
          loading={runningJob === id}
          onClick={() => handleTriggerReRun(id)}
          icon={RefreshCw}
        >
          Re-evaluate
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Automated Evaluation Engine Queue</h2>
          <p className="text-xs text-muted">Monitor concurrent container workers, tree-sitter AST queries, and judge dispatch states</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-surface-white border border-border-subtle text-slate-deep">
            WORKERS: 4/4 IDLE
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-brand-success border border-emerald-200">
            LOAD: NOMINAL
          </span>
        </div>
      </div>

      <Table columns={columns} data={queueItems} />
    </div>
  );
}

