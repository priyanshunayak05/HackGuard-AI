import React from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../../components/brand/MetricCard';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import { 
  Scale, 
  ListTodo, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Clock, 
  FileCode 
} from 'lucide-react';

export default function JudgeOverview() {
  const { user } = useAuth();
  const { submissions, activeHackathon } = useHackathon();

  const pendingSubmissions = submissions.filter((s) => s.stage === 'level_2');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase text-brand-success font-bold tracking-wider">
            JUDGE ASSESSMENT WORKSPACE
          </div>
          <h2 className="text-xl font-bold text-graphite tracking-tight mt-1">
            Welcome, {user.name}
          </h2>
          <p className="text-xs text-muted mt-1">
            Active Review Board: <span className="font-semibold text-graphite">{activeHackathon.title}</span> · 4 submissions awaiting manual rubric scoring
          </p>
        </div>

        <Link to="/judge/review-queue">
          <Button variant="primary" icon={ArrowRight} iconPosition="right">
            Open Review Queue
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Pending in Queue"
          value="4"
          subtext="Level 2 Technical submissions"
          icon={ListTodo}
          badge="Action Required"
        />
        <MetricCard
          label="Evaluated to Date"
          value={user.evaluatedCount || 14}
          subtext="Average scoring time: 6.2 mins"
          icon={CheckCircle2}
        />
        <MetricCard
          label="AI Alignment Rate"
          value="91.4%"
          subtext="Score divergence under 3 pts"
          icon={Sparkles}
        />
        <MetricCard
          label="Assigned Competitions"
          value="1"
          subtext={activeHackathon.category}
          icon={Trophy}
        />
      </div>

      {/* Review Queue Preview */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div>
            <h3 className="text-sm font-bold text-graphite">Priority Assessment Queue</h3>
            <p className="text-xs text-muted">Technical submissions with passing Docker sandbox test suites</p>
          </div>
          <Link to="/judge/review-queue">
            <Button size="sm" variant="ghost">
              View All (4)
            </Button>
          </Link>
        </div>

        <div className="divide-y divide-border-subtle/60 text-xs">
          {pendingSubmissions.map((sub) => (
            <div key={sub.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-graphite text-[13px]">{sub.title}</span>
                  <StatusBadge status={sub.status} size="xs" />
                </div>
                <div className="text-muted font-mono text-[11px]">
                  Team: {sub.teamName} · Docker Tests: {sub.dockerExecution?.testsPassed || 44}/{sub.dockerExecution?.testsTotal || 44} Passed · AI Baseline: {sub.aiEvaluation?.overallScore?.toFixed(1) || '—'}
                </div>
              </div>

              <Link to={`/judge/project/${sub.id}`}>
                <Button size="sm" variant="outline" icon={Scale}>
                  Score Project
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
