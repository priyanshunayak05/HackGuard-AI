import React from 'react';
import { useHackathon } from '../../context/HackathonContext';
import MetricCard from '../../components/brand/MetricCard';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Users,
  FolderGit2,
  ListTodo,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Scale
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export default function AdminDashboard() {
  const { hackathons, activeHackathon, teams, submissions, activities } = useHackathon();

  // Realistic sample activity telemetry dataset
  const activityData = [
    { day: 'Mon', registrations: 12, submissionsL1: 8, submissionsL2: 3 },
    { day: 'Tue', registrations: 19, submissionsL1: 14, submissionsL2: 7 },
    { day: 'Wed', registrations: 24, submissionsL1: 18, submissionsL2: 12 },
    { day: 'Thu', registrations: 32, submissionsL1: 27, submissionsL2: 18 },
    { day: 'Fri', registrations: 41, submissionsL1: 34, submissionsL2: 24 },
    { day: 'Sat', registrations: 45, submissionsL1: 38, submissionsL2: 29 },
    { day: 'Sun', registrations: 48, submissionsL1: 42, submissionsL2: 35 },
  ];

  const pipelineStages = [
    { stage: 'Registered', count: 48, fill: '#64748B' },
    { stage: 'L1 Submitted', count: 38, fill: '#2563EB' },
    { stage: 'L1 Qualified', count: 24, fill: '#15966B' },
    { stage: 'L2 Sandbox', count: 18, fill: '#6557C8' },
    { stage: 'Evaluated', count: 12, fill: '#183B56' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome / Status Alert Banner */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-graphite tracking-tight">
              Event Command Overview: {activeHackathon.title}
            </h2>
            <StatusBadge status={activeHackathon.status} size="xs" />
          </div>
          <p className="text-xs text-muted mt-1">
            Current Stage: <span className="font-mono font-semibold uppercase text-slate-deep">{activeHackathon.currentStage}</span> · Qualification threshold locked at <span className="font-mono font-semibold">{activeHackathon.qualificationThreshold.toFixed(1)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/admin/hackathons/create">
            <Button variant="primary" size="sm">
              Create New Event
            </Button>
          </Link>
          <Link to="/admin/plagiarism">
            <Button variant="outline" size="sm" icon={ShieldAlert}>
              Audit AST Alerts
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Metric Blocks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Hackathons"
          value={hackathons.length}
          subtext="2 active, 1 completed"
          icon={Trophy}
          trend={1}
          trendLabel="this month"
        />
        <MetricCard
          label="Total Participants"
          value="142"
          subtext="Verified academic & pro engineers"
          icon={Users}
          trend={18}
          trendLabel="vs last week"
        />
        <MetricCard
          label="Registered Teams"
          value={teams.length}
          subtext="Avg team size: 3.2 members"
          icon={FolderGit2}
          badge="16 Qualified L2"
        />
        <MetricCard
          label="Pending Evaluations"
          value="4"
          subtext="2 automated Docker, 2 judge"
          icon={ListTodo}
          badge="Action Needed"
        />
      </div>

      {/* Two Column Charts: Activity over time & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Participation Activity Over Time (8 cols) */}
        <div className="lg:col-span-8 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-bold text-graphite">Participation & Submission Velocity</h3>
              <p className="text-xs text-muted">Daily cumulative registrations and Level 1 vs Level 2 submissions</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-slate-deep">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-deep"></span> Reg
              </span>
              <span className="flex items-center gap-1 text-signal-blue">
                <span className="w-2.5 h-2.5 rounded-full bg-signal-blue"></span> L1
              </span>
              <span className="flex items-center gap-1 text-brand-ai">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-ai"></span> L2
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '6px', color: '#F9FAFB', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#183B56" fill="#E2E6EC" fillOpacity={0.4} strokeWidth={2} />
                <Area type="monotone" dataKey="submissionsL1" stroke="#2563EB" fill="#DBEAFE" fillOpacity={0.4} strokeWidth={2} />
                <Area type="monotone" dataKey="submissionsL2" stroke="#6557C8" fill="#EDE9FE" fillOpacity={0.4} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Submission Pipeline Progression (4 cols) */}
        <div className="lg:col-span-4 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-border-subtle">
            <h3 className="text-sm font-bold text-graphite">Funnel & Qualification</h3>
            <p className="text-xs text-muted">Conversion across evaluation gates</p>
          </div>

          <div className="space-y-3 pt-1">
            {pipelineStages.map((st) => (
              <div key={st.stage} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-graphite font-sans font-medium">{st.stage}</span>
                  <span className="font-bold text-slate-deep tabular-nums">{st.count} teams</span>
                </div>
                <div className="w-full h-2 bg-surface-soft rounded-full overflow-hidden border border-border-subtle/50">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.round((st.count / 48) * 100)}%`,
                      backgroundColor: st.fill,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-border-subtle text-xs text-muted font-mono flex items-center justify-between">
            <span>Pass Rate: 50%</span>
            <span>Threshold: &ge; 75.0</span>
          </div>
        </div>
      </div>

      {/* Two Column Bottom: Activity Feed & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Feed (7 cols) */}
        <div className="lg:col-span-7 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div>
              <h3 className="text-sm font-bold text-graphite">Realtime System Activity Feed</h3>
              <p className="text-xs text-muted">Live event stream from sandbox runners and audit engines</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-brand-success border border-emerald-200">
              Live Stream
            </span>
          </div>

          <div className="divide-y divide-border-subtle/60 space-y-2">
            {activities.map((act) => (
              <div key={act.id} className="pt-2 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-graphite">{act.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-soft border border-border-subtle text-slate-deep">
                      {act.badge}
                    </span>
                  </div>
                  <p className="text-muted text-[11px] leading-relaxed">{act.description}</p>
                </div>
                <span className="text-[10px] font-mono text-muted shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Administrative Actions (5 cols) */}
        <div className="lg:col-span-5 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-border-subtle">
            <h3 className="text-sm font-bold text-graphite">Pending Action Queue</h3>
            <p className="text-xs text-muted">Tasks awaiting administrator or lead judge approval</p>
          </div>

          <div className="space-y-3">
            {/* Action 1: Plagiarism concern */}
            <div className="p-3.5 rounded-lg border border-red-200 bg-red-50/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-danger flex items-center gap-1.5 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  AST Similarity Flag (78.4%)
                </span>
                <span className="text-[10px] font-mono text-muted">2h ago</span>
              </div>
              <p className="text-xs text-slate-deep">
                ShadowGuard Squad code AST matched external repository with variable rename obfuscation.
              </p>
              <div className="flex justify-end pt-1">
                <Link to="/admin/plagiarism">
                  <Button size="sm" variant="danger">
                    Inspect AST Diff
                  </Button>
                </Link>
              </div>
            </div>

            {/* Action 2: Judge score override */}
            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-warning flex items-center gap-1.5 font-mono">
                  <Scale className="w-3.5 h-3.5" />
                  Judge Override Review
                </span>
                <span className="text-[10px] font-mono text-muted">12m ago</span>
              </div>
              <p className="text-xs text-slate-deep">
                Prof. Marcus Thorne modified Level 2 technical score on SentinelMesh (+1.8 pts divergence).
              </p>
              <div className="flex justify-end pt-1">
                <Link to="/admin/evaluation-queue">
                  <Button size="sm" variant="outline">
                    Verify Audit Trail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
