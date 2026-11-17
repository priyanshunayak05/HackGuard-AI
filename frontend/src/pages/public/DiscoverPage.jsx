import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import StatusBadge from '../../components/brand/StatusBadge';
import Button from '../../components/common/Button';
import { useHackathon } from '../../context/HackathonContext';
import { Search, Calendar, Users, Trophy, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function DiscoverPage() {
  const { hackathons } = useHackathon();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = hackathons.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.tagline.toLowerCase().includes(search.toLowerCase()) ||
      h.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || h.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-signal-blue font-bold">
            COMPETITION DIRECTORY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
            Discover Verified Hackathons
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-2xl">
            Explore active competitions with automated Level 1 idea screening and Level 2 Docker code execution.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-surface-white border border-border-subtle rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-subtle">
          <div className="w-full sm:flex-1">
            <Input
              icon={Search}
              placeholder="Search hackathons by title, stack or domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-44">
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'cybersecurity', label: 'Cybersecurity & AI' },
                  { value: 'systems', label: 'Systems & Edge' },
                  { value: 'healthcare', label: 'Healthcare AI' },
                ]}
              />
            </div>

            <div className="w-36">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'active', label: 'Active' },
                  { value: 'upcoming', label: 'Upcoming' },
                  { value: 'completed', label: 'Completed' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Competition Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle flex flex-col justify-between hover:border-slate-300 transition-all duration-200 group"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-deep">
                  <img
                    src={hackathon.bannerUrl}
                    alt={hackathon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <StatusBadge status={hackathon.status} size="xs" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-graphite/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded border border-white/10 font-bold">
                    Prize: {hackathon.totalPrizePool}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-mono text-signal-blue font-semibold uppercase">
                    {hackathon.category}
                  </div>
                  <h3 className="text-base font-bold text-graphite tracking-tight leading-snug">
                    {hackathon.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {hackathon.shortDescription}
                  </p>

                  {/* Metadata Chips */}
                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-deep font-mono border-t border-border-subtle/60">
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-muted shrink-0" />
                      <span>Reg: {formatDate(hackathon.registrationDeadline)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-muted shrink-0" />
                      <span>{hackathon.registeredTeamsCount} Teams</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link to={`/hackathons/${hackathon.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight} iconPosition="right">
                    View Competition Specs
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

