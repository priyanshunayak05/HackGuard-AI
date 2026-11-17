import React from 'react';
import { Shield, Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function PodiumTopThree({ topTeams = [] }) {
  if (topTeams.length < 3) return null;

  const first = topTeams[0];
  const second = topTeams[1];
  const third = topTeams[2];

  const renderTrend = (cur, prev) => {
    if (!prev || cur === prev) return <Minus className="w-3 h-3 text-muted" />;
    if (cur < prev) return <ArrowUp className="w-3 h-3 text-brand-success" />;
    return <ArrowDown className="w-3 h-3 text-brand-danger" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* 2nd Place: Silver Shield */}
      <div className="order-2 md:order-1 bg-surface-white border border-border-subtle rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center border border-slate-300">
                2
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
                Silver Shield
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs text-muted">
              {renderTrend(second.rank, second.previousRank)}
              <span>{second.previousRank ? `Prev #${second.previousRank}` : 'New'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-base font-bold text-graphite tracking-tight truncate">
              {second.teamName}
            </h3>
            <p className="text-xs text-muted truncate">{second.projectTitle}</p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-border-subtle/80 flex items-baseline justify-between">
          <div className="text-[11px] text-muted font-mono">WEIGHTED SCORE</div>
          <div className="text-2xl font-bold font-mono text-slate-deep tabular-nums">
            {second.totalWeightedScore?.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 1st Place: Gold Shield (Elevated) */}
      <div className="order-1 md:order-2 bg-gradient-to-b from-blue-50/50 to-surface-white border-2 border-signal-blue/30 rounded-xl p-6 flex flex-col justify-between shadow-elevated relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-signal-blue text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm">
            Current Leader
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-signal-blue text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                1
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-signal-blue font-bold">
                Gold Shield Candidate
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs text-muted">
              {renderTrend(first.rank, first.previousRank)}
              <span>{first.previousRank ? `Prev #${first.previousRank}` : 'New'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-lg font-bold text-graphite tracking-tight truncate">
              {first.teamName}
            </h3>
            <p className="text-xs text-slate-deep truncate">{first.projectTitle}</p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-blue-100 flex items-baseline justify-between">
          <div className="text-[11px] text-signal-blue font-mono font-semibold">WEIGHTED SCORE</div>
          <div className="text-3xl font-extrabold font-mono text-signal-blue tabular-nums">
            {first.totalWeightedScore?.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 3rd Place: Bronze Shield */}
      <div className="order-3 bg-surface-white border border-border-subtle rounded-xl p-5 flex flex-col justify-between shadow-subtle hover:border-slate-300 transition-all">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-800 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                3
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
                Bronze Shield
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs text-muted">
              {renderTrend(third.rank, third.previousRank)}
              <span>{third.previousRank ? `Prev #${third.previousRank}` : 'New'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-base font-bold text-graphite tracking-tight truncate">
              {third.teamName}
            </h3>
            <p className="text-xs text-muted truncate">{third.projectTitle}</p>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-border-subtle/80 flex items-baseline justify-between">
          <div className="text-[11px] text-muted font-mono">WEIGHTED SCORE</div>
          <div className="text-2xl font-bold font-mono text-slate-deep tabular-nums">
            {third.totalWeightedScore?.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}

