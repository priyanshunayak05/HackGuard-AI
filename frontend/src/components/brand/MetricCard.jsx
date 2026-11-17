import React from 'react';

export default function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendLabel,
  badge,
  className = '',
}) {
  return (
    <div
      className={`bg-surface-white border border-border-subtle rounded-md p-4 transition-all duration-150 hover:border-slate-300 ${className}`}
    >
      <div className="flex items-center justify-between text-muted text-xs font-medium uppercase tracking-wider mb-1.5">
        <span>{label}</span>
        {Icon && <Icon className="w-4 h-4 text-muted opacity-80" />}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-bold tracking-tight text-graphite font-mono tabular-nums">
          {value}
        </div>
        {badge && (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
            {badge}
          </span>
        )}
      </div>

      {(subtext || trend !== undefined) && (
        <div className="mt-2 pt-2 border-t border-border-subtle/60 flex items-center justify-between text-xs text-muted">
          <span>{subtext}</span>
          {trend !== undefined && (
            <span
              className={`font-mono font-medium ${
                trend > 0
                  ? 'text-brand-success'
                  : trend < 0
                  ? 'text-brand-danger'
                  : 'text-muted'
              }`}
            >
              {trend > 0 ? `+${trend}` : trend} {trendLabel || ''}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

