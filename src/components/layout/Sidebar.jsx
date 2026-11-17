import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../brand/BrandLogo';
import {
  LayoutDashboard,
  Trophy,
  Users,
  ShieldCheck,
  FileCode,
  Scale,
  GitCompare,
  BarChart3,
  Settings,
  Compass,
  FileCheck2,
  ListTodo,
  User,
  FolderGit2,
  Terminal,
  Activity,
  History
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { role } = useAuth();

  // Navigation schema configured strictly for each role as defined in specification
  const adminNav = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
      ],
    },
    {
      group: 'EVENT MANAGEMENT',
      items: [
        { label: 'Hackathons', to: '/admin/hackathons', icon: Trophy },
        { label: 'Participants', to: '/admin/participants', icon: Users },
        { label: 'Teams', to: '/admin/teams', icon: FolderGit2 },
      ],
    },
    {
      group: 'EVALUATION',
      items: [
        { label: 'Submissions', to: '/admin/submissions', icon: FileCode },
        { label: 'Evaluation Queue', to: '/admin/evaluation-queue', icon: ListTodo },
        { label: 'Judges', to: '/admin/judges', icon: Scale },
        { label: 'Plagiarism Review', to: '/admin/plagiarism', icon: GitCompare, badge: 'AST' },
      ],
    },
    {
      group: 'RESULTS',
      items: [
        { label: 'Leaderboard', to: '/admin/leaderboard', icon: Activity },
        { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { label: 'Settings', to: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const participantNav = [
    {
      group: 'COMPETITION',
      items: [
        { label: 'My Workspace', to: '/participant', icon: LayoutDashboard, exact: true },
        { label: 'Discover Hackathons', to: '/participant/discover', icon: Compass },
        { label: 'My Registrations', to: '/participant/registrations', icon: Trophy },
        { label: 'My Team', to: '/participant/team', icon: Users },
      ],
    },
    {
      group: 'SUBMISSION & EVALUATION',
      items: [
        { label: 'Submissions', to: '/participant/submissions', icon: FileCode, badge: 'L1/L2' },
        { label: 'Evaluation Results', to: '/participant/results', icon: ShieldCheck },
        { label: 'Leaderboard', to: '/participant/leaderboard', icon: Activity },
      ],
    },
    {
      group: 'ACCOUNT',
      items: [
        { label: 'Profile', to: '/participant/profile', icon: User },
      ],
    },
  ];

  const judgeNav = [
    {
      group: 'ASSESSMENT',
      items: [
        { label: 'Overview', to: '/judge', icon: LayoutDashboard, exact: true },
        { label: 'Assigned Events', to: '/judge/assigned', icon: Trophy },
        { label: 'Review Queue', to: '/judge/review-queue', icon: ListTodo, badge: 'Pending' },
      ],
    },
    {
      group: 'HISTORY & EVIDENCE',
      items: [
        { label: 'Evaluated Projects', to: '/judge/evaluated', icon: FileCheck2 },
        { label: 'Feedback History', to: '/judge/feedback-history', icon: History },
      ],
    },
    {
      group: 'ACCOUNT',
      items: [
        { label: 'Profile', to: '/judge/profile', icon: User },
      ],
    },
  ];

  const currentNav = role === 'admin' ? adminNav : role === 'judge' ? judgeNav : participantNav;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-graphite/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-surface-white border-r border-border-subtle flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Area */}
        <div className="h-14 border-b border-border-subtle px-5 flex items-center justify-between">
          <BrandLogo size="md" />
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {currentNav.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
                {section.group}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-signal-blue-light text-signal-blue font-semibold border border-blue-200/50'
                            : 'text-slate-deep hover:text-graphite hover:bg-surface-soft border border-transparent'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-surface-soft border border-border-subtle text-muted">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Engine Badge */}
        <div className="p-3 border-t border-border-subtle bg-surface-subtle/50">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <div className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-success"></span>
              <span>ENGINE: ONLINE</span>
            </div>
            <span className="font-mono text-[10px] text-slate-deep font-semibold">v2.4 AST</span>
          </div>
        </div>
      </aside>
    </>
  );
}
