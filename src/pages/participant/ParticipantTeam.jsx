import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';
import { useToast } from '../../components/common/Toast';
import { 
  Users, 
  Copy, 
  Check, 
  UserPlus, 
  Key, 
  FolderGit2, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  Trash2
} from 'lucide-react';

export default function ParticipantTeam() {
  const { user } = useAuth();
  const { teams, addTeam, activeHackathon } = useHackathon();
  const { toast } = useToast();

  const myTeam = teams.find((t) => t.id === user.teamId) || teams[0];
  const [copied, setCopied] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Create Team state
  const [newTeamName, setNewTeamName] = useState('');

  // Join Team state
  const [joinCodeInput, setJoinCodeInput] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myTeam.joinCode);
    setCopied(true);
    toast(`Invitation Code ${myTeam.joinCode} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const created = {
      id: `team-${Date.now()}`,
      hackathonId: activeHackathon.id,
      name: newTeamName.trim(),
      joinCode: `NX-${randomCode}`,
      leaderId: user.id,
      leaderName: user.name,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: user.id,
          name: user.name,
          role: 'Team Leader',
          email: user.email,
          avatar: user.avatar,
        },
      ],
      status: 'registered',
      level1Score: null,
      level1Qualified: false,
      rank: teams.length + 1,
      projectTitle: 'Unassigned Project Concept',
    };

    addTeam(created);
    setShowCreateModal(false);
    toast(`Team "${created.name}" created with Join Code: ${created.joinCode}`, 'success');
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    const code = joinCodeInput.trim().toUpperCase();
    const target = teams.find((t) => t.joinCode.toUpperCase() === code);

    if (!target) {
      toast('Invalid join code. Please check with your team leader.', 'error');
      return;
    }

    if (target.members.length >= 4) {
      toast('This team has already reached its maximum capacity of 4 members.', 'error');
      return;
    }

    target.members.push({
      id: user.id,
      name: user.name,
      role: 'Member',
      email: user.email,
      avatar: user.avatar,
    });

    setShowJoinModal(false);
    toast(`Joined "${target.name}" successfully!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="pb-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">Team Management & Membership</h2>
          <p className="text-xs text-muted">Manage your squad members, invitation join codes, and hackathon registration</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowJoinModal(true)} icon={Key}>
            Join Team with Code
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)} icon={Plus}>
            Create New Team
          </Button>
        </div>
      </div>

      {/* Active Team Card */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-graphite tracking-tight">{myTeam.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-brand-success border border-emerald-200">
                Registered
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Project: <span className="font-semibold text-slate-deep">{myTeam.projectTitle}</span>
            </p>
          </div>

          {/* Join Code Copy Box */}
          <div className="flex items-center gap-2 bg-surface-soft border border-border-subtle rounded-lg p-2 px-3">
            <div className="text-left font-mono">
              <div className="text-[9px] text-muted uppercase">INVITATION CODE</div>
              <div className="text-sm font-bold text-graphite">{myTeam.joinCode}</div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCode}
              icon={copied ? Check : Copy}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Member List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono flex items-center justify-between">
            <span>Roster Members ({myTeam.members.length} / 4)</span>
            <span className="text-[11px] text-muted font-normal">Cap: 4 members max</span>
          </div>

          <div className="divide-y divide-border-subtle border border-border-subtle rounded-lg overflow-hidden bg-surface-white">
            {myTeam.members.map((m) => (
              <div key={m.id} className="p-3.5 flex items-center justify-between hover:bg-surface-soft/40 transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-9 h-9 rounded-full object-cover border border-border-subtle"
                  />
                  <div>
                    <div className="text-xs font-bold text-graphite">{m.name}</div>
                    <div className="text-[11px] text-muted">{m.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-soft border border-border-subtle font-medium text-slate-deep">
                    {m.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Create Team */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create a New Competition Team"
        subtitle={activeHackathon.title}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTeam} icon={Plus}>
              Create Team & Generate Code
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Team Name"
            placeholder="e.g. CyberGuard Vanguard"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            required
            helperText="Choose a distinctive name for leaderboards"
          />
          <div className="p-3 bg-surface-soft border border-border-subtle rounded text-xs text-muted">
            As creator, you will automatically be assigned as Team Leader and receive a shareable 6-character invitation code.
          </div>
        </div>
      </Modal>

      {/* Modal: Join Team */}
      <Modal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join an Existing Team"
        subtitle="Enter the team code shared by your squad lead"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setShowJoinModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleJoinTeam} icon={Key}>
              Confirm Join Team
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Invitation Code"
            placeholder="e.g. NX-8842"
            value={joinCodeInput}
            onChange={(e) => setJoinCodeInput(e.target.value)}
            required
          />
          <div className="p-3 bg-surface-soft border border-border-subtle rounded text-xs text-muted">
            Joining a team registers you under their submission roster for the active event.
          </div>
        </div>
      </Modal>
    </div>
  );
}
