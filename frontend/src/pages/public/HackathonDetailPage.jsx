import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import { useHackathon } from '../../context/HackathonContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { 
  Calendar, 
  Users, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  FileText, 
  Clock, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function HackathonDetailPage() {
  const { id } = useParams();
  const { hackathons, changeActiveHackathon } = useHackathon();
  const { role, switchRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const hackathon = hackathons.find((h) => h.id === id || h.slug === id) || hackathons[0];

  const handleRegisterAsParticipant = () => {
    changeActiveHackathon(hackathon.id);
    switchRole('participant');
    toast(`Registered for ${hackathon.title}! Welcome to Participant Workspace.`, 'success');
    navigate('/participant');
  };

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border border-border-subtle bg-slate-deep text-white shadow-subtle">
          <img
            src={hackathon.bannerUrl}
            alt={hackathon.title}
            className="w-full h-64 md:h-80 object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-transparent p-6 sm:p-10 flex flex-col justify-end">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <StatusBadge status={hackathon.status} />
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/10 border border-white/20 uppercase font-semibold">
                {hackathon.category}
              </span>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-signal-blue text-white font-bold">
                Pool: {hackathon.totalPrizePool}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {hackathon.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl">
              {hackathon.tagline}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 space-y-4 shadow-subtle">
              <h2 className="text-lg font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
                Overview & Problem Domain
              </h2>
              <p className="text-sm text-graphite leading-relaxed">
                {hackathon.description}
              </p>
            </div>

            {/* Two-Level Evaluation Structure */}
            <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 space-y-6 shadow-subtle">
              <h2 className="text-lg font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
                Two-Stage Evaluation Mechanics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border-subtle rounded-lg p-5 bg-surface-soft/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-signal-blue uppercase">Stage 1</span>
                    <span className="text-[11px] font-mono text-muted">Pass Mark: {hackathon.qualificationThreshold}</span>
                  </div>
                  <h3 className="text-sm font-bold text-graphite">Level 1: Idea & Feasibility</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Submit project proposal, threat model specification, PDF pitch deck, and video overview. Evaluated automatically against innovation rubrics.
                  </p>
                  <div className="text-[11px] font-mono text-slate-deep bg-surface-white p-2.5 rounded border border-border-subtle">
                    Deadline: {formatDate(hackathon.level1Deadline)}
                  </div>
                </div>

                <div className="border border-border-subtle rounded-lg p-5 bg-surface-soft/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-brand-ai uppercase">Stage 2</span>
                    <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 rounded">Unlocked upon L1 Pass</span>
                  </div>
                  <h3 className="text-sm font-bold text-graphite">Level 2: Technical Sandbox</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Submit GitHub repository or ZIP archive with Docker specs. Tested in isolated container with AST code plagiarism verification.
                  </p>
                  <div className="text-[11px] font-mono text-slate-deep bg-surface-white p-2.5 rounded border border-border-subtle">
                    Deadline: {formatDate(hackathon.level2Deadline)}
                  </div>
                </div>
              </div>
            </div>

            {/* Rules & Guidelines */}
            <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 space-y-4 shadow-subtle">
              <h2 className="text-lg font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
                Competition Rules & Sandbox Invariants
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-deep">
                {hackathon.rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-signal-blue shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar CTA & Metadata (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-5">
              <div className="space-y-1">
                <div className="text-[11px] font-mono uppercase text-muted">Participation Action</div>
                <h3 className="text-base font-bold text-graphite">Enter Competition</h3>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleRegisterAsParticipant}
                icon={ArrowRight}
                iconPosition="right"
              >
                Register Team
              </Button>

              <div className="border-t border-border-subtle pt-4 space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted font-sans">Team Size:</span>
                  <span className="font-semibold text-graphite">{hackathon.minTeamSize} – {hackathon.maxTeamSize} Members</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-sans">Registration Closes:</span>
                  <span className="font-semibold text-graphite">{formatDate(hackathon.registrationDeadline)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-sans">Hackathon Closes:</span>
                  <span className="font-semibold text-graphite">{formatDate(hackathon.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted font-sans">Organizer:</span>
                  <span className="font-semibold text-graphite truncate max-w-[150px]">{hackathon.organizer}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-5 space-y-2 text-xs text-slate-deep">
              <div className="font-bold flex items-center gap-1.5 font-mono text-signal-blue">
                <ShieldCheck className="w-4 h-4" />
                <span>HackGuard Automated Sandbox</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Submissions are evaluated through rootless Linux Docker workers without human scoring bias. Plagiarism is detected via AST semantic diff.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

