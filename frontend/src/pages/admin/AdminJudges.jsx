import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { Scale, Mail, CheckCircle2, Plus, UserPlus } from 'lucide-react';

export default function AdminJudges() {
  const { toast } = useToast();
  const [judges, setJudges] = useState([
    {
      id: 'j1',
      name: 'Prof. Marcus Thorne',
      email: 'm.thorne@cyber-institute.org',
      institution: 'Cyber Institute of Technology',
      expertise: ['AST Analysis', 'Docker Sandboxing', 'Distributed Systems'],
      assignedEvents: ['Global AI Defense Challenge'],
      evaluatedCount: 14,
      pendingCount: 4,
    },
    {
      id: 'j2',
      name: 'Dr. Aris Vance',
      email: 'a.vance@quantum-lab.gov',
      institution: 'Quantum Computing Laboratory',
      expertise: ['Rust Embedded', 'Post-Quantum Crypto', 'Memory Safety'],
      assignedEvents: ['Quantum Edge & Microkernel Hackathon'],
      evaluatedCount: 8,
      pendingCount: 2,
    },
    {
      id: 'j3',
      name: 'Sarah Jenkins',
      email: 's.jenkins@sec-review.net',
      institution: 'Open Security Foundation',
      expertise: ['Smart Contracts', 'Bytecode Auditing', 'Formal Verification'],
      assignedEvents: ['Global AI Defense Challenge'],
      evaluatedCount: 12,
      pendingCount: 1,
    },
  ]);

  const columns = [
    {
      header: 'Judge & Title',
      key: 'name',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted flex items-center gap-1">
            <Mail className="w-3 h-3 text-muted/60" />
            <span>{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Expertise Domains',
      key: 'expertise',
      render: (tags) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {tags.map((t) => (
            <span key={t} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-soft border border-border-subtle text-slate-deep">
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: 'Assigned Hackathons',
      key: 'assignedEvents',
      render: (events) => (
        <div className="text-xs text-graphite font-medium">
          {events.join(', ')}
        </div>
      ),
    },
    {
      header: 'Evaluated',
      key: 'evaluatedCount',
      align: 'center',
      render: (val) => <span className="font-mono font-bold text-brand-success">{val}</span>,
    },
    {
      header: 'Pending',
      key: 'pendingCount',
      align: 'center',
      render: (val) => <span className="font-mono font-bold text-brand-warning">{val}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Evaluator & Judge Roster</h2>
          <p className="text-xs text-muted">Manage accredited industry experts, rubric assignments, and evaluation progress</p>
        </div>
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => toast('Judge invitation link generated: https://hackguard.io/invite/judge-8821', 'success')}
        >
          Invite Judge
        </Button>
      </div>

      <Table columns={columns} data={judges} />
    </div>
  );
}

