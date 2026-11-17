import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Search, Mail, Building, Users } from 'lucide-react';

export default function AdminParticipants() {
  const [search, setSearch] = useState('');

  const participants = [
    { id: 'p1', name: 'Alex Rivera', email: 'alex.rivera@polytech.edu', team: 'Team Nexus Shield', role: 'Team Leader', institution: 'Institute of Advanced Computing', joinedAt: '2026-11-11' },
    { id: 'p2', name: 'Siddharth Verma', email: 'sid.v@polytech.edu', team: 'Team Nexus Shield', role: 'Security Researcher', institution: 'Institute of Advanced Computing', joinedAt: '2026-11-11' },
    { id: 'p3', name: 'Klara Lindqvist', email: 'k.lindqvist@polytech.edu', team: 'Team Nexus Shield', role: 'ML Infrastructure', institution: 'Institute of Advanced Computing', joinedAt: '2026-11-12' },
    { id: 'p4', name: 'Chen Wei', email: 'chen.wei@mit.edu', team: 'Aether Dynamics', role: 'Team Leader', institution: 'MIT CSAIL', joinedAt: '2026-11-11' },
    { id: 'p5', name: 'Zoe Kravitz', email: 'zoe.k@mit.edu', team: 'Aether Dynamics', role: 'Architect', institution: 'MIT CSAIL', joinedAt: '2026-11-11' },
    { id: 'p6', name: 'David O\'Connor', email: 'david.oc@oxford.ac.uk', team: 'CipherCore Labs', role: 'Team Leader', institution: 'Oxford Cyber Security', joinedAt: '2026-11-12' },
    { id: 'p7', name: 'Tanya Morozova', email: 'tanya.m@kyiv.tech', team: 'ShadowGuard Squad', role: 'Team Leader', institution: 'Kyiv Polytechnic Institute', joinedAt: '2026-11-12' },
  ];

  const filtered = participants.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.team.toLowerCase().includes(search.toLowerCase()) ||
    p.institution.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: 'Participant Name',
      key: 'name',
      render: (val, row) => (
        <div>
          <div className="font-bold text-graphite text-[13px]">{val}</div>
          <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
            <Mail className="w-3 h-3 text-muted/60" />
            <span>{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Team Assignment',
      key: 'team',
      render: (val, row) => (
        <div>
          <div className="font-semibold text-slate-deep">{val}</div>
          <div className="text-[11px] text-muted">{row.role}</div>
        </div>
      ),
    },
    {
      header: 'Academic / Institution',
      key: 'institution',
      render: (val) => (
        <div className="flex items-center gap-1.5 text-xs text-graphite">
          <Building className="w-3.5 h-3.5 text-muted shrink-0" />
          <span>{val}</span>
        </div>
      ),
    },
    {
      header: 'Registered On',
      key: 'joinedAt',
      align: 'right',
      render: (val) => <span className="font-mono text-xs text-muted">{val}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Registered Participants Directory</h2>
          <p className="text-xs text-muted">Manage verified competitors, roles, and institutional affiliations</p>
        </div>
        <div className="w-72">
          <Input
            icon={Search}
            placeholder="Search participants or teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table columns={columns} data={filtered} />
    </div>
  );
}
