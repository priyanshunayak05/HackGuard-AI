import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, Scale, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function JudgeAssignedEvents() {
  const { hackathons } = useHackathon();
  const assigned = [hackathons[0]];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">Assigned Hackathons & Review Boards</h2>
        <p className="text-xs text-muted">Competitions where you are designated as an accredited scoring evaluator</p>
      </div>

      <div className="space-y-4">
        {assigned.map((h) => (
          <div
            key={h.id}
            className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={h.status} size="xs" />
                <span className="text-[11px] font-mono text-signal-blue font-semibold uppercase">
                  {h.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-graphite">{h.title}</h3>
              <p className="text-xs text-muted max-w-xl">{h.shortDescription}</p>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-deep pt-1">
                <span>Evaluation Closes: {formatDate(h.endDate)}</span>
                <span>Rubric: 4 Criteria (100 Marks Max)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/judge/review-queue">
                <Button variant="primary" size="sm" icon={Scale}>
                  Review Queue (4 Pending)
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

