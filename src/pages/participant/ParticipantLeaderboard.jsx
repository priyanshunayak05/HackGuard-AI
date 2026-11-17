import React from 'react';
import PodiumTopThree from '../../components/leaderboard/PodiumTopThree';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import { useHackathon } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';

export default function ParticipantLeaderboard() {
  const { leaderboard, activeHackathon, isLiveConnected } = useHackathon();
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-graphite tracking-tight">Live Competition Leaderboard</h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
              {activeHackathon.title}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Realtime weighted ranking updates directly from automated test runners and judge scoring boards
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-brand-success animate-pulse' : 'bg-gray-400'}`}></span>
          <span>{isLiveConnected ? 'SOCKET: LIVE TELEMETRY' : 'STATIC'}</span>
        </div>
      </div>

      <PodiumTopThree topTeams={leaderboard.slice(0, 3)} />

      <div className="bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
        <LeaderboardTable entries={leaderboard} />
      </div>
    </div>
  );
}
