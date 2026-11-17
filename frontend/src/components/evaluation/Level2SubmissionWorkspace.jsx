import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useToast } from '../common/Toast';
import {
  Lock,
  Unlock,
  GitBranch,
  UploadCloud,
  Terminal,
  Cpu,
  CheckSquare,
  AlertTriangle,
  Play,
  FileArchive,
  ArrowRight
} from 'lucide-react';
import { formatFileSize } from '../../utils/formatters';

export default function Level2SubmissionWorkspace({ isQualified = true, qualificationScore = 88.5, threshold = 75.0 }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    repoUrl: 'https://github.com/nexus-shield/sentinelmesh-core',
    commitHash: '9a2f7c4b18de82fa0',
    demoVideoUrl: 'https://youtu.be/sentinelmesh-live-demo-2026',
    description: 'Production Rust core with tree-sitter bindings and isolated Docker test runner containing 44 automated test assertions.',
    buildInstructions: 'cargo build --release && cargo test',
    archiveFile: { name: 'sentinelmesh-v1.0-release.tar.gz', size: 12450000 },
    checks: {
      dockerFileIncluded: true,
      testsPassedLocally: true,
      noHardcodedSecrets: true,
      reproducibleBuild: true,
    },
  });

  const toggleCheck = (key) => {
    setForm({
      ...form,
      checks: { ...form.checks, [key]: !form.checks[key] },
    });
  };

  const handleLevel2Submit = (e) => {
    e.preventDefault();
    if (!form.repoUrl && !form.archiveFile) {
      toast('Please provide a GitHub Repository URL or upload a ZIP archive.', 'error');
      return;
    }
    const allChecked = Object.values(form.checks).every(Boolean);
    if (!allChecked) {
      toast('Please confirm all technical checklist criteria before deploying to the sandbox.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast('Level 2 Technical submission queued for Docker container execution & AST analysis.', 'success');
    }, 1500);
  };

  // UNQUALIFIED / LOCKED STATE
  if (!isQualified) {
    return (
      <div className="bg-surface-white border border-border-subtle rounded-xl p-8 max-w-2xl mx-auto text-center space-y-5 shadow-subtle">
        <div className="w-14 h-14 rounded-full bg-surface-soft border border-border-subtle flex items-center justify-center mx-auto text-muted">
          <Lock className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-graphite tracking-tight">
            Level 2 — Technical Evaluation Locked
          </h2>
          <p className="text-xs text-muted mt-1.5 max-w-md mx-auto leading-relaxed">
            The technical code sandbox requires Level 1 qualification. Your team must achieve an initial score &ge; {threshold.toFixed(1)} to unlock automated Docker execution.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-brand-warning shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold">Qualification Requirement:</div>
            <div>
              Current Score: <span className="font-mono font-bold">{qualificationScore ? qualificationScore.toFixed(1) : 'Pending Evaluation'}</span> / Threshold: <span className="font-mono font-bold">{threshold.toFixed(1)}</span>
            </div>
            <div className="text-[11px] text-amber-800">
              Please await evaluator committee review or revise your Level 1 pitch deck & problem statement.
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/participant/submissions'}>
            Return to Level 1 Workspace
          </Button>
        </div>
      </div>
    );
  }

  // QUALIFIED WORKSPACE
  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle">
      {/* Header Banner */}
      <div className="border-b border-border-subtle bg-surface-subtle p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-brand-success flex items-center justify-center">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-graphite tracking-tight">
                Level 2 — Technical Implementation & Code Sandbox
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-brand-success border border-emerald-200">
                Unlocked (L1 Score: {qualificationScore.toFixed(1)})
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Submit your code for automated rootless Docker execution, benchmark testing, and AST plagiarism verification.
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block font-mono text-xs text-muted">
          <span>PIPELINE: DOCKER v27 + TREE-SITTER</span>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-200 text-brand-ai flex items-center justify-center mx-auto">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-graphite tracking-tight">
              Container Build & Test Suite Running
            </h3>
            <p className="text-xs text-muted mt-1.5">
              Your repository commit <code className="bg-surface-soft px-1.5 py-0.5 rounded font-mono text-slate-deep">{form.commitHash}</code> is executing inside an isolated rootless container.
            </p>
          </div>

          <div className="bg-slate-deep text-surface-soft rounded-lg p-4 font-mono text-xs text-left space-y-1.5 border border-graphite">
            <div className="text-emerald-400">&gt; Spawning container worker: hg-sandbox-e83fa99b...</div>
            <div className="text-blue-300">&gt; Enforcing 1GB RAM limit, 2 vCPU quota, network denied.</div>
            <div className="text-gray-300">&gt; cargo test --release: Running invariant suite...</div>
            <div className="text-amber-300">&gt; AST Plagiarism Engine: generating syntax graph fingerprints...</div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => window.location.href = '/participant/results'}
            >
              Open Live Execution Logs
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Push New Commit
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLevel2Submit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Repo & Archive */}
            <div className="space-y-4">
              <div className="border border-border-subtle rounded-lg p-4 bg-surface-white space-y-3">
                <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-signal-blue" />
                  <span>Option A: Git Repository</span>
                </div>
                <Input
                  label="GitHub / GitLab Repository URL"
                  value={form.repoUrl}
                  onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                  placeholder="https://github.com/organization/project"
                />
                <Input
                  label="Target Commit Hash / Release Tag"
                  value={form.commitHash}
                  onChange={(e) => setForm({ ...form, commitHash: e.target.value })}
                  placeholder="e.g. 9a2f7c4b"
                  helperText="Pinned commit guarantees deterministic evaluation"
                />
              </div>

              <div className="border border-border-subtle rounded-lg p-4 bg-surface-white space-y-3">
                <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono flex items-center gap-2">
                  <FileArchive className="w-4 h-4 text-brand-ai" />
                  <span>Option B: Source Archive ZIP</span>
                </div>
                {form.archiveFile ? (
                  <div className="p-3 bg-surface-soft border border-border-subtle rounded flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileArchive className="w-4 h-4 text-brand-ai" />
                      <span className="font-medium text-graphite">{form.archiveFile.name}</span>
                      <span className="text-muted font-mono text-[11px]">({formatFileSize(form.archiveFile.size)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, archiveFile: null })}
                      className="text-xs text-brand-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="border border-dashed border-border-subtle rounded p-4 text-center text-xs text-muted cursor-pointer hover:bg-surface-soft">
                    Click to attach project-source.zip (Max 50MB)
                  </div>
                )}
              </div>

              <Input
                label="Demonstration Video URL (YouTube / Vimeo / Loom)"
                value={form.demoVideoUrl}
                onChange={(e) => setForm({ ...form, demoVideoUrl: e.target.value })}
                placeholder="https://youtu.be/..."
                helperText="Technical walkthrough of working software (3 to 5 minutes)"
              />
            </div>

            {/* Right Column: Execution Commands & Checklist */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-graphite block mb-1.5 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-deep" />
                  <span>Sandboxed Build & Test Command</span>
                </label>
                <textarea
                  rows={3}
                  value={form.buildInstructions}
                  onChange={(e) => setForm({ ...form, buildInstructions: e.target.value })}
                  className="w-full bg-surface-soft text-graphite font-mono text-xs border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
                  placeholder="e.g. cargo build --release && cargo test"
                />
                <span className="text-[11px] text-muted">
                  Executed inside non-networked Docker container with timeout guard (120s).
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-graphite block mb-1.5">
                  Technical Project Summary & Architecture Notes
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-surface-white text-graphite text-[13px] border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
                  placeholder="Briefly explain code organization, key algorithmic paths, and test instructions."
                />
              </div>

              {/* Technical Submission Checklist */}
              <div className="border border-border-subtle rounded-lg p-4 bg-surface-subtle/50 space-y-2">
                <div className="text-xs font-bold text-graphite uppercase tracking-wider font-mono">
                  Technical Verification Checklist
                </div>
                <div className="space-y-2 pt-1 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer text-slate-deep">
                    <input
                      type="checkbox"
                      checked={form.checks.dockerFileIncluded}
                      onChange={() => toggleCheck('dockerFileIncluded')}
                      className="rounded border-border-subtle text-signal-blue focus:ring-signal-blue"
                    />
                    <span>Runnable test suite or benchmark harness included in repo</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-slate-deep">
                    <input
                      type="checkbox"
                      checked={form.checks.noHardcodedSecrets}
                      onChange={() => toggleCheck('noHardcodedSecrets')}
                      className="rounded border-border-subtle text-signal-blue focus:ring-signal-blue"
                    />
                    <span>Zero hardcoded API secrets, private keys, or external credentials</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer text-slate-deep">
                    <input
                      type="checkbox"
                      checked={form.checks.reproducibleBuild}
                      onChange={() => toggleCheck('reproducibleBuild')}
                      className="rounded border-border-subtle text-signal-blue focus:ring-signal-blue"
                    />
                    <span>Acknowledged AST structural plagiarism analysis against public repos</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
            <div className="text-xs text-muted flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-ai" />
              <span>Container runtime: Isolated Linux x86_64 Sandbox</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              icon={ArrowRight}
              iconPosition="right"
            >
              Deploy & Trigger Sandbox Evaluation
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

