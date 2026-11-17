import React, { useState } from 'react';
import Table from '../common/Table';
import Input from '../common/Input';
import StatusBadge from '../brand/StatusBadge';
import { Search, ArrowUpDown, Shield, ArrowUp, ArrowDown, Minus, Filter } from 'lucide-react';

export default function LeaderboardTable({ entries = [], onSelectTeam }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('rank');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = entries.filter((e) => {
    const term = searchTerm.toLowerCase();
    return (
      e.teamName.toLowerCase().includes(term) ||
      e.projectTitle.toLowerCase().includes(term) ||
      e.members?.some((m) => m.toLowerCase().includes(term))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const renderTrend = (cur, prev) => {
    if (!prev || cur === prev) {
      return <Minus className="w-3.5 h-3.5 text-muted inline" />;
    }
    if (cur < prev) {
      return (
        <span className="inline-flex items-center text-brand-success font-mono font-medium text-[11px]">
          <ArrowUp className="w-3 h-3" />
          {prev - cur}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-brand-danger font-mono font-medium text-[11px]">
        <ArrowDown className="w-3 h-3" />
        {cur - prev}
      </span>
    );
  };

  const columns = [
    {
      header: 'Rank',
      key: 'rank',
      cellClassName: 'w-16 font-mono font-bold text-graphite tabular-nums text-center',
      render: (val, row) => (
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-6 h-6 rounded flex items-center justify-center bg-surface-soft border border-border-subtle text-xs">
            {val}
          </span>
          {renderTrend(val, row.previousRank)}
        </div>
      ),
    },
    {
      header: 'Team & Project Title',
      key: 'teamName',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite tracking-tight text-[13px]">{val}</div>
          <div className="text-xs text-muted truncate max-w-sm">{row.projectTitle}</div>
          {row.badge && (
            <span className="inline-block mt-0.5 text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-surface-soft border border-border-subtle text-slate-deep">
              {row.badge}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'L1 Idea',
      key: 'level1Score',
      align: 'right',
      cellClassName: 'font-mono tabular-nums text-muted',
      render: (val) => val ? val.toFixed(1) : '—',
    },
    {
      header: 'L2 Tech',
      key: 'level2Score',
      align: 'right',
      cellClassName: 'font-mono tabular-nums text-muted',
      render: (val) => val ? val.toFixed(1) : '—',
    },
    {
      header: 'Test Pass',
      key: 'codePassRate',
      align: 'right',
      cellClassName: 'font-mono tabular-nums text-slate-deep font-semibold',
      render: (val) => val ? `${val}%` : '—',
    },
    {
      header: 'AST Similarity',
      key: 'plagiarismSimilarity',
      align: 'right',
      cellClassName: 'font-mono tabular-nums',
      render: (val) => (
        <span className={val > 50 ? 'text-brand-danger font-bold' : 'text-brand-success'}>
          {val ? `${val.toFixed(1)}%` : '0.0%'}
        </span>
      ),
    },
    {
      header: 'Weighted Total',
      key: 'totalWeightedScore',
      align: 'right',
      cellClassName: 'font-mono font-bold text-sm text-signal-blue tabular-nums text-right',
      render: (val) => val ? val.toFixed(1) : '—',
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            placeholder="Search teams or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-xs text-muted font-mono flex items-center gap-2 self-end sm:self-auto">
          <span>Sort by:</span>
          <button
            onClick={() => handleSort('totalWeightedScore')}
            className={`px-2 py-1 rounded border transition-colors ${
              sortField === 'totalWeightedScore'
                ? 'bg-signal-blue text-white border-signal-blue font-semibold'
                : 'bg-surface-white border-border-subtle text-slate-deep hover:bg-surface-soft'
            }`}
          >
            Score &darr;
          </button>
          <button
            onClick={() => handleSort('rank')}
            className={`px-2 py-1 rounded border transition-colors ${
              sortField === 'rank'
                ? 'bg-signal-blue text-white border-signal-blue font-semibold'
                : 'bg-surface-white border-border-subtle text-slate-deep hover:bg-surface-soft'
            }`}
          >
            Rank &uarr;
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <Table
        columns={columns}
        data={sorted}
        onRowClick={onSelectTeam}
        emptyMessage="No ranked teams found matching your query."
      />
    </div>
  );
}

