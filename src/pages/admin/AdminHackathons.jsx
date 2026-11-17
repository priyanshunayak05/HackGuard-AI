import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import StatusBadge from '../../components/brand/StatusBadge';
import { useHackathon } from '../../context/HackathonContext';
import { Plus, Search, Calendar, Users, Trophy, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function AdminHackathons() {
  const { hackathons, changeActiveHackathon } = useHackathon();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = hackathons.filter((h) => {
    const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase()) || h.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: 'Hackathon Title & Category',
      key: 'title',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite tracking-tight text-[13px]">{val}</div>
          <div className="text-xs text-muted capitalize">{row.category} · Stage: {row.currentStage}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="xs" />,
    },
    {
      header: 'Registration Deadline',
      key: 'registrationDeadline',
      render: (val) => <span className="font-mono text-xs">{formatDate(val)}</span>,
    },
    {
      header: 'Start Date',
      key: 'startDate',
      render: (val) => <span className="font-mono text-xs">{formatDate(val)}</span>,
    },
    {
      header: 'Teams',
      key: 'registeredTeamsCount',
      align: 'center',
      render: (val) => <span className="font-mono font-semibold">{val}</span>,
    },
    {
      header: 'Submissions',
      key: 'activeSubmissionsCount',
      align: 'center',
      render: (val) => <span className="font-mono font-semibold text-signal-blue">{val}</span>,
    },
    {
      header: 'Threshold',
      key: 'qualificationThreshold',
      align: 'right',
      render: (val) => <span className="font-mono font-semibold text-emerald-700">{val ? `${val.toFixed(1)}` : '75.0'}</span>,
    },
    {
      header: 'Actions',
      key: 'id',
      align: 'right',
      render: (id, row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => changeActiveHackathon(id)}
            className="px-2 py-1 rounded bg-surface-soft border border-border-subtle hover:border-signal-blue text-[11px] font-mono font-medium text-slate-deep transition-colors"
          >
            Set Scope
          </button>
          <Link to={`/hackathons/${id}`}>
            <Button size="sm" variant="ghost">
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Hackathon Competitions Management</h2>
          <p className="text-xs text-muted">Create, configure rubrics, and monitor active competitive events</p>
        </div>
        <Link to="/admin/hackathons/create">
          <Button variant="primary" icon={Plus}>
            Create Hackathon
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-white border border-border-subtle rounded-lg p-3">
        <div className="w-full sm:w-80">
          <Input
            icon={Search}
            placeholder="Search events by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-44">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active Events' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={filtered} />
    </div>
  );
}
