import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import { 
  Bell, 
  ChevronDown, 
  Radio, 
  ShieldCheck, 
  UserCheck, 
  SlidersHorizontal,
  ExternalLink,
  Code2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ title, subtitle, rightActions }) {
  const { user, role, logout } = useAuth();
  const { hackathons, activeHackathonId, changeActiveHackathon, isLiveConnected, setIsLiveConnected } = useHackathon();
  const [showHackathonMenu, setShowHackathonMenu] = useState(false);
  const navigate = useNavigate();

  <button
    onClick={() => {
        logout();
        navigate("/login", { replace: true });
    }}
    className="px-3 py-2 rounded-md text-xs font-medium border border-border-subtle hover:bg-surface-soft"
>
    Logout
</button>

  const activeHackathon = hackathons.find((h) => h.id === activeHackathonId) || hackathons[0];

  return (
    <header className="sticky top-0 z-30 h-14 bg-surface-white border-b border-border-subtle px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Contextual Title & Hackathon Scope */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-sm font-semibold text-graphite tracking-tight flex items-center gap-2">
            <span>{title || 'Command Center'}</span>
            {subtitle && (
              <span className="text-xs font-normal text-muted hidden md:inline">
                / {subtitle}
              </span>
            )}
          </h1>
        </div>

        {/* Hackathon Scope Switcher */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setShowHackathonMenu(!showHackathonMenu)}
            className="flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded bg-surface-soft border border-border-subtle text-slate-deep hover:border-slate-300 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-success"></span>
            <span className="max-w-[170px] truncate">{activeHackathon?.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>

          {showHackathonMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowHackathonMenu(false)}
              />
              <div className="absolute left-0 mt-1 w-72 bg-surface-white border border-border-subtle rounded-md shadow-dropdown py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border-subtle">
                  Switch Active Hackathon
                </div>
                {hackathons.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      changeActiveHackathon(h.id);
                      setShowHackathonMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-start justify-between hover:bg-surface-soft transition-colors ${
                      h.id === activeHackathonId ? 'bg-blue-50/60 font-semibold text-signal-blue' : 'text-graphite'
                    }`}
                  >
                    <div>
                      <div className="truncate font-medium">{h.title}</div>
                      <div className="text-[11px] text-muted capitalize">{h.category} · {h.status}</div>
                    </div>
                    {h.id === activeHackathonId && (
                      <span className="text-[10px] bg-signal-blue text-white px-1.5 py-0.2 rounded font-mono">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Role Switcher, Live Telemetry, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {rightActions}

        {/* Live WebSocket Status Toggle */}
        <button
          onClick={() => setIsLiveConnected(!isLiveConnected)}
          title={`Realtime WebSocket Feed: ${isLiveConnected ? 'Connected (Receiving Event Telemetry)' : 'Offline (Paused)'}`}
          className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono border transition-colors ${
            isLiveConnected
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-brand-success animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[11px] font-medium hidden md:inline">
            {isLiveConnected ? 'SOCKET: LIVE' : 'SOCKET: IDLE'}
          </span>
        </button>

        {/* Notifications Icon */}
        <button
          className="p-1.5 rounded-md text-muted hover:text-graphite hover:bg-surface-soft transition-colors relative"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-signal-blue" />
        </button>

        {/* User Profile Thumbnail */}
        <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-border-subtle"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-graphite leading-tight">{user.name}</div>
            <div className="text-[10px] text-muted leading-tight truncate max-w-[120px]">{user.title || user.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

