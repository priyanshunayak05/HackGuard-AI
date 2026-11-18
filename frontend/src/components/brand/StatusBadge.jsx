import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Scale, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function StatusBadge({ status, variant = 'subtle', showIcon = true, size = 'sm', className = '' }) {
  const configs = {
    // Stage progressions
    level_1_submitted: {
      label: 'L1 Idea Submitted',
      icon: Clock,
      bg: 'bg-blue-50 text-signal-blue border-blue-200',
      dot: 'bg-signal-blue',
    },
    level_1_qualified: {
      label: 'L1 Qualified (Unlocked)',
      icon: ShieldCheck,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    level_2_in_progress: {
      label: 'L2 Technical In Progress',
      icon: Terminal,
      bg: 'bg-indigo-50 text-brand-ai border-indigo-200',
      dot: 'bg-brand-ai',
    },
    level_2_submitted: {
      label: 'L2 Code Submitted',
      icon: CheckCircle2,
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-600',
    },
    locked: {
      label: 'Stage Locked',
      icon: Lock,
      bg: 'bg-gray-100 text-muted border-border-subtle',
      dot: 'bg-muted',
    },

    // Sandbox execution
    docker_running: {
      label: 'Docker Sandboxed Running',
      icon: Cpu,
      bg: 'bg-amber-50 text-brand-warning border-amber-200',
      dot: 'bg-brand-warning animate-pulse',
    },
    passed: {
      label: 'Container Tests Passed',
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    failed: {
      label: 'Sandbox Failure',
      icon: XCircle,
      bg: 'bg-red-50 text-brand-danger border-red-200',
      dot: 'bg-brand-danger',
    },

    // Plagiarism AST
    ast_clean: {
      label: 'AST Plagiarism Clean',
      icon: ShieldCheck,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    cleared: {
      label: 'AST Cleared',
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    flagged_plagiarism: {
      label: 'AST Similarity Alert',
      icon: AlertTriangle,
      bg: 'bg-red-50 text-brand-danger border-red-200',
      dot: 'bg-brand-danger',
    },
    under_review: {
      label: 'Under Audit Review',
      icon: AlertTriangle,
      bg: 'bg-amber-50 text-brand-warning border-amber-200',
      dot: 'bg-brand-warning',
    },

    // Evaluations
    evaluated: {
      label: 'Evaluated',
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    in_evaluation: {
      label: 'In Evaluation',
      icon: Sparkles,
      bg: 'bg-purple-50 text-brand-ai border-purple-200',
      dot: 'bg-brand-ai animate-pulse',
    },
    judge_review: {
      label: 'Judge Review Active',
      icon: Scale,
      bg: 'bg-slate-100 text-slate-deep border-slate-300',
      dot: 'bg-slate-deep',
    },

    // General hackathon
    active: {
      label: 'Active Event',
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    upcoming: {
      label: 'Upcoming',
      icon: Clock,
      bg: 'bg-blue-50 text-signal-blue border-blue-200',
      dot: 'bg-signal-blue',
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle2,
      bg: 'bg-gray-100 text-muted border-border-subtle',
      dot: 'bg-muted',
    },
    finalized: {
      label: 'Results Finalized',
      icon: ShieldCheck,
      bg: 'bg-emerald-50 text-brand-success border-emerald-200',
      dot: 'bg-brand-success',
    },
    registered: {
      label: 'Registered',
      icon: CheckCircle2,
      bg: 'bg-blue-50 text-signal-blue border-blue-200',
      dot: 'bg-signal-blue',
    }
  };

  const key = status?.toLowerCase() || 'upcoming';
  const cfg = configs[key] || {
    label: status || 'Pending',
    icon: Clock,
    bg: 'bg-gray-50 text-muted border-border-subtle',
    dot: 'bg-muted',
  };

  const Icon = cfg.icon;
  const sizeClasses = size === 'xs' 
    ? 'text-[11px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-md select-none tabular-nums ${cfg.bg} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {showIcon && <Icon className="w-3.5 h-3.5 opacity-80" />}
      <span>{cfg.label}</span>
    </span>
  );
}

