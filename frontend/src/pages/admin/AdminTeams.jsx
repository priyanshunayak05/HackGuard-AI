import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import Drawer from '../../components/common/Drawer';
import { useHackathon } from '../../context/HackathonContext';
import { Search, FolderGit2, Key, Users, CheckCircle2, XCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function AdminTeams() {
  const { teams } = useHackathon();
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.leaderName.toLowerCase().includes(search.toLowerCase()) ||
    t.joinCode.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Team Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted">Lead: {row.leaderName}</div>
        </div>
      ),
    },
    {
      header: 'Join Code',
      key: 'joinCode',
      render: (val) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-soft border border-border-subtle font-semibold text-slate-deep">
          {val}
        </span>
      ),
    },
    {
      header: 'Members',
      key: 'members',
      align: 'center',
      render: (val) => (
        <span className="font-mono text-xs font-semibold">{val?.length || 1} / 4</span>
      ),
    },
    {
      header: 'L1 Score',
      key: 'level1Score',
      align: 'right',
      render: (val) => (
        <span className="font-mono font-bold text-xs">{val ? val.toFixed(1) : 'Pending'}</span>
      ),
    },
    {
      header: 'L2 Qualification',
      key: 'level1Qualified',
      align: 'center',
      render: (val) => (
        <span
          className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded ${
            val
              ? 'bg-emerald-50 text-brand-success border border-emerald-200'
              : 'bg-gray-100 text-muted'
          }`}
        >
          {val ? 'Qualified' : 'Pending'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Registered Teams & Roster</h2>
          <p className="text-xs text-muted">Monitor team formations, member capacity, and qualification flags</p>
        </div>
        <div className="w-72">
          <Input
            icon={Search}
            placeholder="Search teams by name or join code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        onRowClick={(team) => setSelectedTeam(team)}
      />

      {/* Contextual Inspection Drawer */}
      <Drawer
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        title={selectedTeam?.name}
        subtitle={`Join Code: ${selectedTeam?.joinCode}`}
      >
        {selectedTeam && (
          <div className="space-y-6 text-xs">
            <div className="p-3 bg-surface-soft border border-border-subtle rounded-lg space-y-1">
              <span className="text-[10px] text-muted font-mono uppercase font-bold">Qualification Assessment</span>
              <p className="text-slate-deep leading-relaxed">{selectedTeam.qualificationReason}</p>
            </div>

            <div>
              <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono mb-2">
                Team Members ({selectedTeam.members.length})
              </div>
              <div className="divide-y divide-border-subtle border border-border-subtle rounded-lg overflow-hidden bg-surface-white">
                {selectedTeam.members.map((m) => (
                  <div key={m.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-graphite">{m.name}</div>
                      <div className="text-muted">{m.email}</div>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded bg-surface-soft border border-border-subtle">
                <span className="text-[10px] text-muted uppercase font-sans">Level 1 Score</span>
                <div className="text-lg font-bold text-graphite mt-0.5">
                  {selectedTeam.level1Score ? selectedTeam.level1Score.toFixed(1) : '—'}
                </div>
              </div>
              <div className="p-3 rounded bg-surface-soft border border-border-subtle">
                <span className="text-[10px] text-muted uppercase font-sans">Current Leaderboard Rank</span>
                <div className="text-lg font-bold text-signal-blue mt-0.5">
                  #{selectedTeam.rank}
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

