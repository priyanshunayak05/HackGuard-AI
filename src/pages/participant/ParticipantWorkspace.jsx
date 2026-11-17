import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import MetricCard from '../../components/brand/MetricCard';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Lock, 
  Unlock,
  AlertCircle,
  FileCode,
  Activity
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function ParticipantWorkspace() {
  const { user } = useAuth();
  const { activeHackathon, teams, submissions } = useHackathon();

  // Find user's team
  const myTeam = teams.find((t) => t.id === user.teamId) || teams[0];
  const myL1Sub = submissions.find((s) => s.teamId === myTeam.id && s.stage === 'level_1');
  const myL2Sub = submissions.find((s) => s.teamId === myTeam.id && s.stage === 'level_2');

  const isL1Qualified = myTeam.level1Qualified;
  const isL2Submitted = !!myL2Sub;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Context Banner */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-signal-blue font-bold tracking-wider">
            PARTICIPANT DASHBOARD · {myTeam.name}
          </div>
          <h2 className="text-xl font-bold text-graphite tracking-tight mt-1">
            Welcome back, {user.name}
          </h2>
          <p className="text-xs text-muted mt-1">
            Active Event: <span className="font-semibold text-graphite">{activeHackathon.title}</span> · Lead: <span className="text-slate-deep">{myTeam.leaderName}</span>
          </p>
        </div>

        {/* Most Important Next Action (Visually Prominent as instructed) */}
        <div className="p-4 rounded-lg bg-blue-50/80 border border-blue-200 flex items-center justify-between gap-4 self-start sm:self-auto">
          <div>
            <div className="text-[11px] font-mono text-signal-blue font-bold uppercase">
              NEXT REQUIRED ACTION
            </div>
            <div className="text-xs font-bold text-graphite mt-0.5">
              {isL1Qualified
                ? isL2Submitted
                  ? 'Monitor Live Docker Execution'
                  : 'Submit Level 2 Code Repository'
                : 'Complete Level 1 Pitch Deck Submission'}
            </div>
          </div>
          <Link to="/participant/submissions">
            <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
              {isL1Qualified ? (isL2Submitted ? 'View Logs' : 'Submit Code') : 'Complete L1'}
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="My Team"
          value={myTeam.name}
          subtext={`Code: ${myTeam.joinCode} · ${myTeam.members.length} members`}
          icon={Users}
        />
        <MetricCard
          label="Level 1 Idea Score"
          value={myTeam.level1Score ? `${myTeam.level1Score.toFixed(1)}` : 'Pending'}
          subtext={`Threshold: ${activeHackathon.qualificationThreshold.toFixed(1)} pts`}
          icon={Sparkles}
          badge={isL1Qualified ? 'Qualified' : 'Under Review'}
        />
        <MetricCard
          label="Level 2 Status"
          value={isL1Qualified ? (isL2Submitted ? 'Docker Passed' : 'Unlocked') : 'Locked'}
          subtext={isL1Qualified ? 'Deadline in 5 days' : 'Requires L1 pass'}
          icon={isL1Qualified ? Unlock : Lock}
        />
        <MetricCard
          label="Leaderboard Rank"
          value={`#${myTeam.rank}`}
          subtext="Out of 48 registered teams"
          icon={Activity}
          trend={2}
          trendLabel="up this week"
        />
      </div>

      {/* Dual Stage Journey Progress Bar */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div>
            <h3 className="text-sm font-bold text-graphite">Competition Evaluation Stage Tracker</h3>
            <p className="text-xs text-muted">Complete both stages to qualify for final podium rankings</p>
          </div>
          <span className="font-mono text-xs font-bold text-signal-blue">
            {isL1Qualified ? (isL2Submitted ? 'STAGE 2 EVALUATING' : 'STAGE 2 UNLOCKED') : 'STAGE 1 IN PROGRESS'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Stage 1 Box */}
          <div className="border border-border-subtle rounded-lg p-4 bg-emerald-50/40 border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-brand-success font-mono">LEVEL 1: IDEA & PROBLEM SPACE</span>
              <span className="font-mono text-emerald-800 font-bold">88.5 / 100</span>
            </div>
            <p className="text-xs text-slate-deep leading-relaxed">
              Problem statement and pitch deck screened by automated evaluation engine. Exceeded 75.0 threshold.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] text-muted">
              <span>Status: Qualified for Technical Stage</span>
              <Link to="/participant/results" className="text-signal-blue hover:underline font-medium">
                View AI Feedback &rarr;
              </Link>
            </div>
          </div>

          {/* Stage 2 Box */}
          <div
            className={`border rounded-lg p-4 space-y-2 ${
              isL1Qualified
                ? 'bg-purple-50/40 border-purple-200'
                : 'bg-surface-soft border-border-subtle opacity-70'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-brand-ai font-mono">LEVEL 2: TECHNICAL CODE EXECUTION</span>
              <span className="font-mono font-semibold">
                {isL1Qualified ? (isL2Submitted ? 'Docker 44/44' : 'Unlocked') : 'Locked'}
              </span>
            </div>
            <p className="text-xs text-slate-deep leading-relaxed">
              {isL1Qualified
                ? 'Docker container sandbox and AST plagiarism analysis active. Test cases passing.'
                : 'Complete Level 1 with &ge; 75.0 points to unlock code repository submission.'}
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-muted">Deadline: {formatDate(activeHackathon.level2Deadline)}</span>
              <Link to="/participant/submissions" className="text-brand-ai hover:underline font-semibold">
                {isL2Submitted ? 'Inspect Logs' : 'Submit Code'} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns: Team Roster & Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Roster (6 cols) */}
        <div className="lg:col-span-6 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-bold text-graphite">My Team: {myTeam.name}</h3>
              <p className="text-xs text-muted">Invitation Code: <span className="font-mono font-bold text-slate-deep">{myTeam.joinCode}</span></p>
            </div>
            <Link to="/participant/team">
              <Button size="sm" variant="outline">
                Manage Team
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border-subtle/60 text-xs">
            {myTeam.members.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-7 h-7 rounded-full object-cover border border-border-subtle"
                  />
                  <div>
                    <div className="font-semibold text-graphite">{m.name}</div>
                    <div className="text-[11px] text-muted">{m.email}</div>
                  </div>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback & AI Evaluation Highlights (6 cols) */}
        <div className="lg:col-span-6 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-bold text-graphite">Recent Evaluation Feedback</h3>
              <p className="text-xs text-muted">Synthesis notes from AI engine and lead evaluators</p>
            </div>
            <Link to="/participant/results">
              <Button size="sm" variant="ghost">
                Full Report
              </Button>
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200/60 space-y-1">
              <div className="font-mono text-[10px] uppercase font-bold text-signal-blue">
                Lead Judge Feedback (Prof. Marcus Thorne)
              </div>
              <p className="text-slate-deep leading-relaxed">
                "One of the strongest technical submissions in this event. The architectural separation of parser and invariant verifier makes it production-viable."
              </p>
            </div>

            <div className="p-3.5 bg-surface-soft rounded-lg border border-border-subtle space-y-1">
              <div className="font-mono text-[10px] uppercase font-bold text-muted">
                AI Engine Suggestion
              </div>
              <p className="text-slate-deep leading-relaxed">
                "Memory footprint during large 100,000+ line AST synthesis peaks at 248MB; consider memory arena allocations for transient tree nodes."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
