import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import Button from '../../components/common/Button';
import { ArrowRight, GitBranch, Scale, ShieldCheck, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHackathon } from '../../context/HackathonContext';

export default function LandingPage() {
  const { switchRole } = useAuth();
  const { hackathons } = useHackathon();
  const featuredHackathon = hackathons.find((hackathon) => hackathon.status === 'active') || hackathons[0];
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    const sectionId = hash.slice(1);
    if (!sectionId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  const handleRoleQuickStart = (roleName) => {
    switchRole(roleName);
    navigate(`/${roleName}`);
  };

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle bg-surface-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-signal-blue">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Hackathon management, made clearer</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-graphite tracking-tight leading-[1.08]">
                  Great ideas deserve a <span className="text-signal-blue">fair shot.</span>
                </h1>

                <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
                  Run a hackathon from the first sign-up to the final review. Keep event details, project submissions, judging, and results together in one place.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/discover">
                    <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                      Browse hackathons
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleRoleQuickStart('admin')}
                  >
                    For organizers
                  </Button>
                </div>

                <p className="pt-2 text-sm text-muted">
                  Built for organizers, participants, and judges.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-white shadow-elevated">
                  <div className="relative h-52 sm:h-64">
                    <img
                      src={featuredHackathon.bannerUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-graphite">
                          Sample event
                        </span>
                        <p className="mt-2 text-sm font-medium text-white">
                          {featuredHackathon.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 p-5 sm:p-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold tracking-tight text-graphite sm:text-2xl">
                        {featuredHackathon.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-muted">
                        {featuredHackathon.tagline}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
                      <span className="text-sm text-muted">
                        {featuredHackathon.totalPrizePool} prize pool
                      </span>
                      <Link
                        to={`/hackathons/${featuredHackathon.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-signal-blue transition-colors hover:text-signal-blue-hover"
                      >
                        View event details
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="scroll-mt-20 py-20 bg-surface-white border-b border-border-subtle" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-sm font-semibold text-signal-blue">
                One clear workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                From the first idea to the final result
              </h2>
              <p className="text-sm text-muted">
                Give every person involved a clear place to do their part.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="is-interactive bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3">
                <div className="text-sm font-semibold text-signal-blue">01</div>
                <h3 className="text-lg font-semibold text-graphite tracking-tight">Set up your event</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Publish the brief, dates, team rules, and judging criteria in one place.
                </p>
              </div>

              <div className="is-interactive bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3">
                <div className="text-sm font-semibold text-signal-blue">02</div>
                <h3 className="text-lg font-semibold text-graphite tracking-tight">Bring teams together</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Participants create teams, share their ideas, and submit project work.
                </p>
              </div>

              <div className="is-interactive bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3">
                <div className="text-sm font-semibold text-signal-blue">03</div>
                <h3 className="text-lg font-semibold text-graphite tracking-tight">Review with context</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Judges use shared rubrics, with code checks available alongside their review.
                </p>
              </div>

              <div className="is-interactive bg-surface-soft/60 border border-border-subtle rounded-xl p-6 space-y-3">
                <div className="text-sm font-semibold text-signal-blue">04</div>
                <h3 className="text-lg font-semibold text-graphite tracking-tight">Share the outcome</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Bring scores and feedback together so teams can see how decisions were made.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation stages */}
        <section className="scroll-mt-20 py-20 bg-surface-soft border-b border-border-subtle" id="architecture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-sm font-semibold text-signal-blue">
                Two stages, one transparent process
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                A fair path from proposal to finished project
              </h2>
              <p className="text-sm text-muted">
                Start with the idea, then give qualified teams room to show what they built.
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
                      <h4 className="text-sm font-bold text-graphite">Idea and feasibility</h4>
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase">STAGE 1</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded bg-surface-white border border-border-subtle">
                      <div className="font-semibold text-graphite">Teams share</div>
                      <div className="text-muted mt-1">Their idea, the problem it solves, and a short pitch</div>
                    </div>
                    <div className="p-3 rounded bg-blue-50 border border-blue-200 text-slate-deep">
                      <div className="font-semibold text-signal-blue">Judges review</div>
                      <div className="mt-1">Ideas against the event's published criteria</div>
                    </div>
                  </div>
                </div>

                {/* Transition / Threshold Node */}
                <div className="lg:col-span-2 text-center flex flex-col items-center justify-center gap-2">
                  <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-brand-success font-semibold">
                    Meets event criteria
                  </div>
                  <div className="hidden lg:flex items-center text-signal-blue">
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-sm text-muted">Advances to code review</div>
                </div>

                {/* Stage 2: Technical Box */}
                <div className="lg:col-span-5 border border-border-subtle rounded-xl p-5 bg-surface-subtle/50 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-deep text-white font-mono text-xs font-bold flex items-center justify-center">
                        L2
                      </span>
                      <h4 className="text-sm font-bold text-graphite">Project and code review</h4>
                    </div>
                    <span className="text-[10px] font-mono text-muted uppercase">STAGE 2</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded bg-surface-white border border-border-subtle">
                      <div className="font-semibold text-graphite">Teams share</div>
                      <div className="text-muted mt-1">Their code, a working demo, and how to run it</div>
                    </div>
                    <div className="p-3 rounded bg-surface-soft border border-border-subtle text-slate-deep">
                      <div className="font-semibold text-graphite">Judges assess</div>
                      <div className="mt-1">The project, code checks, and event rubric together</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built-in review tools */}
        <section className="py-20 bg-surface-white border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
              <div className="text-sm font-semibold text-signal-blue">
                Helpful tools, clear decisions
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-graphite tracking-tight">
                Give judges better context
              </h2>
              <p className="text-sm text-muted">
                Use code checks to support a thoughtful review, not replace it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="is-interactive p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-signal-blue flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-graphite">Run project checks</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Review build and test results alongside each team's submitted code.
                </p>
              </div>

              <div className="is-interactive p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-signal-blue flex items-center justify-center">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-graphite">Compare code structure</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Surface code similarities for closer inspection by organizers and judges.
                </p>
              </div>

              <div className="is-interactive p-6 rounded-xl border border-border-subtle bg-surface-soft/40 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-brand-success flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-graphite">Keep reviews consistent</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Give every judge the same rubric and keep feedback with the submission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-16 bg-slate-deep text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              A better-organized hackathon starts here.
            </h2>
            <p className="text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Find an event to join, or explore the tools organizers use to run one.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/discover">
                <Button variant="primary" size="lg">
                  Browse hackathons
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleRoleQuickStart('admin')}
                className="bg-transparent text-white border-blue-300 hover:bg-slate-800"
              >
                For organizers
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
