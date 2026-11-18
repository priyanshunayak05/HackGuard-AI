import React from 'react';
import MetricCard from '../../components/brand/MetricCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Cpu, Activity, Clock, ShieldCheck, BarChart3 } from 'lucide-react';

export default function AdminAnalytics() {
  const scoreDistribution = [
    { range: '50-59', count: 2 },
    { range: '60-69', count: 6 },
    { range: '70-79', count: 14 },
    { range: '80-89', count: 18 },
    { range: '90-100', count: 8 },
  ];

  const executionDurations = [
    { p: 'p25', seconds: 18.2 },
    { p: 'p50 (Median)', seconds: 32.5 },
    { p: 'p75', seconds: 48.0 },
    { p: 'p90', seconds: 64.2 },
    { p: 'p99', seconds: 94.1 },
  ];

  const languageDistribution = [
    { name: 'Rust', value: 42, color: '#2563EB' },
    { name: 'Python', value: 28, color: '#6557C8' },
    { name: 'TypeScript', value: 18, color: '#183B56' },
    { name: 'Go', value: 12, color: '#15966B' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">System & Evaluation Analytics</h2>
        <p className="text-xs text-muted">Empirical metrics on scoring distribution, Docker execution duration, and technology footprints</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Median Score" value="82.4" subtext="Gaussian normalized" icon={Activity} />
        <MetricCard label="Container p95 Wall Time" value="64.2s" subtext="Under 120s limit" icon={Clock} />
        <MetricCard label="AST Plagiarism Rate" value="4.2%" subtext="2 flagged submissions" icon={ShieldCheck} />
        <MetricCard label="Sandbox Reliability" value="99.8%" subtext="0 container crashes" icon={Cpu} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-border-subtle">
            <h3 className="text-sm font-bold text-graphite">Score Distribution Histogram</h3>
            <p className="text-xs text-muted">Calibrated score bands across Level 1 & Level 2 evaluations</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="range" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '6px', color: '#F9FAFB', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Primary Stacks (5 cols) */}
        <div className="lg:col-span-5 bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
          <div className="pb-3 border-b border-border-subtle">
            <h3 className="text-sm font-bold text-graphite">Language & Stack Composition</h3>
            <p className="text-xs text-muted">Primary programming language in Level 2 repositories</p>
          </div>

          <div className="space-y-3 pt-2">
            {languageDistribution.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-semibold text-graphite">{item.name}</span>
                  <span className="text-slate-deep">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-surface-soft rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

