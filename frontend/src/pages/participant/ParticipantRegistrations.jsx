import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function ParticipantRegistrations() {
  const { hackathons } = useHackathon();
  const registered = [hackathons[0]]; // User is registered for the primary challenge

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">My Active Registrations</h2>
        <p className="text-xs text-muted">Competitions you and your team are currently enrolled in</p>
      </div>

      <div className="space-y-4">
        {registered.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={hackathon.status} size="xs" />
                <span className="text-[11px] font-mono text-signal-blue uppercase font-semibold">
                  {hackathon.category}
                </span>
              </div>
              <h3 className="text-base font-bold text-graphite">{hackathon.title}</h3>
              <p className="text-xs text-muted max-w-xl">{hackathon.tagline}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-deep pt-1">
                <span>Registration Closes: {formatDate(hackathon.registrationDeadline)}</span>
                <span>Level 2 Closes: {formatDate(hackathon.level2Deadline)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link to="/participant/submissions">
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                  Open Submissions Workspace
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

