import React, { useState } from 'react';
import PodiumTopThree from '../../components/leaderboard/PodiumTopThree';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useHackathon } from '../../context/HackathonContext';
import { useToast } from '../../components/common/Toast';
import { Trophy, ShieldCheck, Radio, CheckCircle2, Lock } from 'lucide-react';

export default function AdminLeaderboard() {
  const { leaderboard, activeHackathon, isLiveConnected } = useHackathon();
  const { toast } = useToast();
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleApproveWinners = () => {
    setIsFinalized(true);
    setShowApprovalModal(false);
    toast('Final competition rankings approved! Certificates & notifications dispatched.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-graphite tracking-tight">
              Official Competition Leaderboard
            </h2>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep">
              {activeHackathon.title}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Realtime weighted ranking synthesis (40% Level 1 + 60% Level 2 Technical & Judge Scores)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isFinalized ? 'outline' : 'primary'}
            icon={isFinalized ? ShieldCheck : Lock}
            onClick={() => setShowApprovalModal(true)}
            disabled={isFinalized}
          >
            {isFinalized ? 'Standings Finalized' : 'Approve Final Winners'}
          </Button>
        </div>
      </div>

      {/* Podium Top 3 */}
      <PodiumTopThree topTeams={leaderboard.slice(0, 3)} />

      {/* Main Leaderboard Table */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-xs">
          <div className="font-bold text-graphite font-mono uppercase">Full Field Standings</div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-brand-success' : 'bg-gray-400'}`}></span>
            <span>FEED: {isLiveConnected ? 'REALTIME WEBSOCKET' : 'STATIC'}</span>
          </div>
        </div>

        <LeaderboardTable entries={leaderboard} />
      </div>

      {/* Approval Confirmation Modal */}
      <Modal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        title="Approve & Finalize Competition Winners"
        subtitle={activeHackathon.title}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApproveWinners} icon={CheckCircle2}>
              Confirm Winner Approval
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-deep">
          <p className="leading-relaxed">
            Approving final winners locks all evaluation marks, generates cryptographic prize allocation manifests, and announces official standings publicly on the portal.
          </p>
          <div className="p-3 bg-surface-soft border border-border-subtle rounded-lg space-y-1 font-mono text-[11px]">
            <div>1st Place: {leaderboard[0]?.teamName} ({leaderboard[0]?.totalWeightedScore} pts)</div>
            <div>2nd Place: {leaderboard[1]?.teamName} ({leaderboard[1]?.totalWeightedScore} pts)</div>
            <div>3rd Place: {leaderboard[2]?.teamName} ({leaderboard[2]?.totalWeightedScore} pts)</div>
          </div>
          <div className="text-[11px] text-brand-warning font-semibold">
            Warning: This action is non-reversible under institutional competition bylaws.
          </div>
        </div>
      </Modal>
    </div>
  );
}
