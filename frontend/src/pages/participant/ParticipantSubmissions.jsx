import React, { useState } from 'react';
import Tabs from '../../components/common/Tabs';
import Level1SubmissionWizard from '../../components/evaluation/Level1SubmissionWizard';
import Level2SubmissionWorkspace from '../../components/evaluation/Level2SubmissionWorkspace';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import { FileCode, Terminal, Sparkles, ShieldCheck, Lock, Unlock } from 'lucide-react';

export default function ParticipantSubmissions() {
  const { user } = useAuth();
  const { teams, activeHackathon, submissions } = useHackathon();

  const myTeam = teams.find((t) => t.id === user.teamId) || teams[0];
  const isL1Qualified = myTeam.level1Qualified;

  // Active Tab
  const [activeTab, setActiveTab] = useState(isL1Qualified ? 'level_2' : 'level_1');

  const tabs = [
    {
      id: 'level_1',
      label: 'Level 1: Idea & Feasibility',
      icon: Sparkles,
      badge: myTeam.level1Score ? `${myTeam.level1Score.toFixed(1)}` : 'In Progress',
    },
    {
      id: 'level_2',
      label: 'Level 2: Technical Sandbox',
      icon: isL1Qualified ? Unlock : Lock,
      badge: isL1Qualified ? 'Unlocked' : 'Locked',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-graphite tracking-tight">
              Dual-Stage Project Submissions
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
              {myTeam.name}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Submit required materials for automated AI screening and rootless Docker container execution
          </p>
        </div>

        {/* Stage Status Pill */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-muted">CURRENT GATE:</span>
          <span
            className={`px-2.5 py-1 rounded font-bold ${
              isL1Qualified
                ? 'bg-emerald-50 text-brand-success border border-emerald-200'
                : 'bg-blue-50 text-signal-blue border border-blue-200'
            }`}
          >
            {isL1Qualified ? 'LEVEL 2 UNLOCKED' : 'LEVEL 1 EVALUATION'}
          </span>
        </div>
      </div>

      {/* Stage Tab Selector */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
        className="max-w-md"
      />

      {/* Active Tab Content */}
      {activeTab === 'level_1' ? (
        <Level1SubmissionWizard
          onSubmitSuccess={() => {
            // Can auto switch to L2 if qualified
          }}
        />
      ) : (
        <Level2SubmissionWorkspace
          isQualified={isL1Qualified}
          qualificationScore={myTeam.level1Score || 0}
          threshold={activeHackathon.qualificationThreshold}
        />
      )}
    </div>
  );
}

