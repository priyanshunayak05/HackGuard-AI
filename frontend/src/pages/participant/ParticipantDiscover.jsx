import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { useHackathon } from '../../context/HackathonContext';
import { Search, Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function ParticipantDiscover() {
  const { hackathons, changeActiveHackathon } = useHackathon();
  const [search, setSearch] = useState('');

  const filtered = hackathons.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Explore Open Hackathons</h2>
          <p className="text-xs text-muted">Discover technology challenges and register your team</p>
        </div>
        <div className="w-72">
          <Input
            icon={Search}
            placeholder="Search competitions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((hackathon) => (
          <div
            key={hackathon.id}
            className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
          >
            <div>
              <div className="relative h-40 overflow-hidden bg-slate-deep">
                <img
                  src={hackathon.bannerUrl}
                  alt={hackathon.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={hackathon.status} size="xs" />
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] font-mono text-signal-blue font-semibold uppercase">
                  {hackathon.category}
                </div>
                <h3 className="text-sm font-bold text-graphite">{hackathon.title}</h3>
                <p className="text-xs text-muted line-clamp-2">{hackathon.shortDescription}</p>

                <div className="pt-2 text-[11px] font-mono text-slate-deep flex justify-between border-t border-border-subtle/60">
                  <span>Prize: {hackathon.totalPrizePool}</span>
                  <span>Reg: {formatDate(hackathon.registrationDeadline)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Link to={`/hackathons/${hackathon.id}`}>
                <Button variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight} iconPosition="right">
                  View Specs & Register
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

