import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/brand/StatusBadge';
import { 
  Trophy, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  GitBranch, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Activity, 
  ChevronRight,
  PlayCircle,
  FileCode,
  Lock,
  Unlock,
  Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingPage() {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleQuickStart = (roleName) => {
    switchRole(roleName);
    navigate(`/${roleName}`);
  };

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border-subtle bg-gradient-to-b from-surface-white via-surface-soft to-surface-soft overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Core Positioning */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs font-mono text-signal-blue">
                  <span className="w-2 h-2 rounded-full bg-signal-blue animate-pulse"></span>
                  <span className="font-semibold uppercase tracking-wider">HACKGUARD COMMAND CENTER v2.4</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-graphite tracking-tight leading-[1.15]">
                  Make Every <br />
                  <span className="text-signal-blue">Hackathon Count.</span>
                </h1>

                <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                  One platform to organize competitions, manage submissions, evaluate innovation, and discover outstanding teams with structural AST plagiarism audits and Docker container sandboxing.
                </p>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/discover">
                    <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                      Explore Hackathons
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleRoleQuickStart('admin')}
                  >
                    Host a Hackathon
                  </Button>
                </div>

                {/* Fast Role Simulator Shortcuts */}
                <div className="pt-4 border-t border-border-subtle/80 flex items-center gap-3 text-xs text-muted">
                  <span className="font-mono text-[11px] uppercase">Simulate Role:</span>
                  <button
                    onClick={() => handleRoleQuickStart('admin')}
                    className="px-2.5 py-1 rounded bg-surface-white border border-border-subtle hover:border-signal-blue hover:text-signal-blue transition-colors font-medium"
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => handleRoleQuickStart('participant')}
                    className="px-2.5 py-1 rounded bg-surface-white border border-border-subtle hover:border-signal-blue hover:text-signal-blue transition-colors font-medium"
                  >
                    Participant
                  </button>
                  <button
                    onClick={() => handleRoleQuickStart('judge')}
                    className="px-2.5 py-1 rounded bg-surface-white border border-border-subtle hover:border-signal-blue hover:text-signal-blue transition-colors font-medium"
                  >
                    Judge
                  </button>
                </div>
              </div>

              {/* Right Column: Original Product-Interface Composition */}
              <div className="lg:col-span-6 relative">
                {/* Real interactive interface composition (NO generic fake screenshots) */}
                <div className="bg-surface-white border border-border-subtle rounded-xl shadow-modal overflow-hidden p-5 space-y-4">
                  {/* Top Bar: Active Event Telemetry */}
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-success"></span>
                      <span className="font-bold text-graphite">GLOBAL AI DEFENSE CHALLENGE</span>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-50 text-signal-blue border border-blue-200">
                      LEVEL 2 ACTIVE
                    </span>
                  </div>

                  {/* Submission & Sandbox Pipeline Status */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-surface-soft rounded-lg border border-border-subtle">
                      <div className="text-[10px] text-muted uppercase">Docker Sandbox</div>
                      <div className="flex items-center gap-1.5 mt-1 text-brand-success font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>44/44 Tests Passed</span>
                      </div>
                      <div className="text-[10px] text-muted mt-0.5">Runtime: 42.8s</div>
                    </div>

                    <div className="p-3 bg-surface-soft rounded-lg border border-border-subtle">
                      <div className="text-[10px] text-muted uppercase">AST Plagiarism Engine</div>
                      <div className="flex items-center gap-1.5 mt-1 text-brand-success font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>11.4% Similarity (Clean)</span>
                      </div>
                      <div className="text-[10px] text-muted mt-0.5">Control graph verified</div>
                    </div>
                  </div>

                  {/* Two-Level Stage Progression Bar */}
                  <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-graphite">Evaluation Progression</span>
                      <span className="font-mono text-signal-blue font-bold">Stage 2 of 2</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-surface-white border border-emerald-200 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-emerald-800">L1: Idea Screening</span>
                        <span className="font-mono font-bold text-emerald-700">88.5 &ge; 75.0</span>
                      </div>
                      <div className="p-2 rounded bg-blue-50 border border-blue-200 flex items-center justify-between text-[11px]">
                        <span className="font-medium text-signal-blue">L2: Technical Code</span>
                        <span className="font-mono font-bold text-signal-blue">In Review</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Real-time Leaderboard Snapshot */}
                  <div className="border border-border-subtle rounded-lg overflow-hidden text-xs">
                    <div className="bg-surface-subtle px-3 py-1.5 font-mono text-[10px] uppercase font-bold text-muted flex justify-between">
                      <span>Live Standings</span>
                      <span className="text-signal-blue">Socket Connected</span>
                    </div>
                    <div className="divide-y divide-border-subtle/60 bg-surface-white">
                      <div className="p-2.5 flex items-center justify-between font-mono">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-deep">#1</span>
                          <span className="font-sans font-semibold text-graphite">Aether Dynamics</span>
                        </div>
                        <span className="font-bold text-signal-blue">93.2 pts</span>
                      </div>
                      <div className="p-2.5 flex items-center justify-between font-mono bg-blue-50/40">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-deep">#2</span>
                          <span className="font-sans font-semibold text-graphite">Team Nexus Shield</span>
                        </div>
                        <span className="font-bold text-signal-blue">90.7 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP PLATFORM EXPLANATION */}
        <section className="py-20 bg-surface-white border-b border-border-subtle" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-signal-blue font-bold">
                END-TO-END COMPETITION LIFECYCLE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                Architected for Rigorous Technical Hackathons
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                From problem statement definition to automated code sandboxing and non-repudiable winner selection.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 01 Organize */}
              <div className="bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3 relative">
                <div className="font-mono text-xs font-bold text-signal-blue">01</div>
                <h3 className="text-base font-bold text-graphite tracking-tight">Organize</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Configure multi-stage schedules, define custom rubrics for Level 1 and Level 2, establish qualification score thresholds, and provision invitations.
                </p>
              </div>

              {/* 02 Compete */}
              <div className="bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3 relative">
                <div className="font-mono text-xs font-bold text-signal-blue">02</div>
                <h3 className="text-base font-bold text-graphite tracking-tight">Compete</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Participants form teams with secure invitation codes, upload pitch decks and videos, and unlock the technical code stage upon passing Level 1.
                </p>
              </div>

              {/* 03 Evaluate */}
              <div className="bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3 relative">
                <div className="font-mono text-xs font-bold text-signal-blue">03</div>
                <h3 className="text-base font-bold text-graphite tracking-tight">Evaluate</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Automated Docker containers execute test suites, AST algorithms scan for structural code plagiarism, and judges enter calibrated scores.
                </p>
              </div>

              {/* 04 Recognize */}
              <div className="bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3 relative">
                <div className="font-mono text-xs font-bold text-signal-blue">04</div>
                <h3 className="text-base font-bold text-graphite tracking-tight">Recognize</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Weighted score synthesis updates live leaderboards with real-time WebSocket feeds, enabling transparent final winner approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TWO-LEVEL EVALUATION WORKFLOW DIAGRAM */}
        <section className="py-20 bg-surface-soft border-b border-border-subtle" id="architecture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-deep font-bold">
                DUAL-STAGE EVALUATION ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                Two-Level Automated Filtering Engine
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Separating high-potential concepts from technical implementation guarantees scalable assessment.
              </p>
            </div>

            {/* Custom Visual Flow Diagram Built with React Components */}
            <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-10 shadow-subtle">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Stage 1: Idea Box */}
                <div className="lg:col-span-5 border border-border-subtle rounded-xl p-5 bg-surface-subtle/50 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-signal-blue text-white font-mono text-xs font-bold flex items-center justify-center">
                        L1
                      </span>
                      <h4 className="text-sm font-bold text-graphite">Idea & Feasibility Evaluation</h4>
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase">STAGE 1</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-surface-white border border-border-subtle">
                      <div className="font-semibold text-graphite">Participant Submissions:</div>
                      <div className="text-muted mt-0.5">Project Title, Problem, Solution, PDF Pitch Deck, Video</div>
                    </div>
                    <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-slate-deep">
                      <div className="font-semibold text-signal-blue">Automated Screening Engine:</div>
                      <div className="mt-0.5">Semantic relevance audit, novelty analysis, rubric calibration</div>
                    </div>
                  </div>
                </div>

                {/* Transition / Threshold Node */}
                <div className="lg:col-span-2 text-center flex flex-col items-center justify-center gap-2">
                  <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-brand-success font-bold">
                    Score &ge; 75.0 Threshold
                  </div>
                  <div className="hidden lg:flex items-center text-signal-blue">
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-muted font-mono">Unlocks Stage 2</div>
                </div>

                {/* Stage 2: Technical Box */}
                <div className="lg:col-span-5 border border-border-subtle rounded-xl p-5 bg-surface-subtle/50 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-brand-ai text-white font-mono text-xs font-bold flex items-center justify-center">
                        L2
                      </span>
                      <h4 className="text-sm font-bold text-graphite">Technical Code & Sandbox Execution</h4>
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase">STAGE 2</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-surface-white border border-border-subtle">
                      <div className="font-semibold text-graphite">Qualified Code Artifacts:</div>
                      <div className="text-muted mt-0.5">Git Repo URL / ZIP Archive, Demo Video, Build Specs</div>
                    </div>
                    <div className="p-2.5 rounded bg-purple-50 border border-purple-200 text-purple-900">
                      <div className="font-semibold text-brand-ai">Execution & Plagiarism Pipeline:</div>
                      <div className="mt-0.5">Isolated Docker test suite, AST graph similarity, judge reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM FEATURES */}
        <section className="py-20 bg-surface-white border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-xs font-mono uppercase tracking-widest text-signal-blue font-bold">
                ENGINEERING PILLARS
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                Built for High-Stakes Competitions
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Protecting institutional integrity through automated infrastructure and verifiable evaluation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-signal-blue flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-graphite">Docker Code Sandboxing</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Run arbitrary participant repositories in isolated, non-networked rootless containers with strict cgroup CPU and RAM enforcement.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 text-brand-ai flex items-center justify-center">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-graphite">AST Semantic Plagiarism</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Go beyond simple string hashing. Compare control flow graphs and syntax token trees to detect variable-renamed or obfuscated code.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-brand-success flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-graphite">Judge Calibration & Overrides</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Combine AI baseline recommendations with manual evaluator scores. Require explicit audit justifications for score divergences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-16 bg-slate-deep text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Host or Compete on HackGuard AI?
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
              Launch institutional-grade competitions with automated screening, AST code integrity checks, and live leaderboards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/discover">
                <Button variant="primary" size="lg">
                  Explore Competitions
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleRoleQuickStart('admin')}
                className="bg-transparent text-white border-blue-300 hover:bg-slate-800"
              >
                Launch Admin Command Center
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}

