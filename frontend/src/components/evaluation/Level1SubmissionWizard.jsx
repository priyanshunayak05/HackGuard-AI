import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useToast } from '../common/Toast';
import { 
  FileText, 
  Video, 
  CheckCircle2, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { formatFileSize, formatDuration } from '../../utils/formatters';

export default function Level1SubmissionWizard({ onSubmitSuccess, initialData = null }) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || 'SentinelMesh: Autonomous AST Invariant Verifier',
    problem: initialData?.problem || 'Existing AI development pipelines suffer from silent bytecode and source tampering. Traditional static linters fail to detect semantic obfuscation injected via untrusted package dependencies.',
    solution: initialData?.solution || 'SentinelMesh constructs control-flow dependency graphs from the source Abstract Syntax Tree (AST) in real-time, enforcing symbolic execution invariants before deployment into production clusters.',
    innovation: initialData?.innovation || 'Combines fast tree-sitter AST queries with symbolic SMT solver checks, achieving 99.4% detection of logic-bomb payload vectors in sub-100ms compilation phases.',
    technologies: initialData?.technologies || ['Rust', 'Tree-Sitter', 'Z3 SMT Solver', 'Docker'],
    deckFile: initialData?.deckFile || { name: 'SentinelMesh_L1_PitchDeck_v2.pdf', size: 4820100 },
    videoFile: initialData?.videoFile || { name: 'SentinelMesh_Intro_Demo_1080p.mp4', size: 34100500, duration: 184 },
    techInput: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleAddTech = (e) => {
    e.preventDefault();
    if (!formData.techInput.trim()) return;
    if (!formData.technologies.includes(formData.techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, formData.techInput.trim()],
        techInput: '',
      });
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleMockFileUpload = (type) => {
    if (type === 'deck') {
      setFormData({
        ...formData,
        deckFile: {
          name: 'Team_Proposal_PitchDeck_2026.pdf',
          size: 3840200,
        },
      });
      toast('Pitch deck PDF uploaded successfully.', 'success');
    } else {
      setFormData({
        ...formData,
        videoFile: {
          name: 'Team_Project_Overview_Video.mp4',
          size: 28400000,
          duration: 172,
        },
      });
      toast('Introduction video validated and attached.', 'success');
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const result = {
        submissionId: `HG-L1-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        status: 'evaluated',
        ...formData,
      };
      setSubmittedData(result);
      setCurrentStep(5);
      toast('Level 1 Idea Submission verified and registered.', 'success');
      if (onSubmitSuccess) onSubmitSuccess(result);
    }, 1200);
  };

  const steps = [
    { num: 1, label: 'Idea Details' },
    { num: 2, label: 'Pitch Deck' },
    { num: 3, label: 'Intro Video' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle">
      {/* Wizard Step Indicator Bar */}
      <div className="border-b border-border-subtle bg-surface-subtle px-6 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((s, idx) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-colors ${
                      isCompleted
                        ? 'bg-brand-success text-white'
                        : isActive
                        ? 'bg-signal-blue text-white ring-4 ring-signal-blue/20'
                        : 'bg-surface-white border border-border-subtle text-muted'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${
                      isActive ? 'text-graphite font-semibold' : 'text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      currentStep > s.num ? 'bg-brand-success' : 'bg-border-subtle'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1: IDEA DETAILS */}
        {currentStep === 1 && (
          <div className="space-y-5 max-w-3xl mx-auto">
            <div>
              <h2 className="text-lg font-bold text-graphite tracking-tight">
                Level 1 — Project Concept & Problem Space
              </h2>
              <p className="text-xs text-muted mt-1">
                Articulate the core problem, your architectural solution, and technological novelty.
              </p>
            </div>

            <Input
              label="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. SentinelMesh: Autonomous AST Invariant Verifier"
              required
            />

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Problem Statement <span className="text-brand-danger">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="w-full bg-surface-white text-graphite text-[13px] border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue"
                placeholder="What critical security, latency, or integrity challenge are you solving?"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Proposed Solution <span className="text-brand-danger">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full bg-surface-white text-graphite text-[13px] border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue"
                placeholder="Describe your architectural design and methodology."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Innovation & Novelty Description <span className="text-brand-danger">*</span>
              </label>
              <textarea
                rows={2}
                value={formData.innovation}
                onChange={(e) => setFormData({ ...formData, innovation: e.target.value })}
                className="w-full bg-surface-white text-graphite text-[13px] border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue"
                placeholder="What distinguishes this from existing tools or standard library approaches?"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Key Technologies & Stacks
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                  placeholder="e.g. Rust, WebAssembly, Z3"
                  className="bg-surface-white text-graphite text-[13px] border border-border-subtle rounded-md px-3 h-8 flex-1 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTech(e)}
                />
                <Button size="sm" variant="outline" onClick={handleAddTech}>
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.technologies.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-soft border border-border-subtle text-slate-deep text-xs font-mono"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(t)}
                      className="text-muted hover:text-brand-danger"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={() => setCurrentStep(2)}
                icon={ArrowRight}
                iconPosition="right"
              >
                Continue to Pitch Deck
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: PITCH DECK */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-lg font-bold text-graphite tracking-tight">
                Pitch Deck PDF Upload
              </h2>
              <p className="text-xs text-muted mt-1">
                Upload your slide deck in PDF format (maximum 20MB). AI evaluation will parse slides for problem-solution fit and technical architecture.
              </p>
            </div>

            <div
              onClick={() => handleMockFileUpload('deck')}
              className="border-2 border-dashed border-border-subtle rounded-xl p-8 text-center bg-surface-soft/40 hover:bg-blue-50/20 hover:border-signal-blue transition-all cursor-pointer group"
            >
              <UploadCloud className="w-10 h-10 text-muted group-hover:text-signal-blue mx-auto mb-3 transition-colors" />
              <div className="text-sm font-semibold text-graphite">
                Click to browse or drag and drop your Pitch Deck PDF
              </div>
              <div className="text-xs text-muted mt-1 font-mono">
                Supported format: PDF up to 20MB
              </div>
            </div>

            {formData.deckFile && (
              <div className="bg-surface-white border border-border-subtle rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-red-50 border border-red-100 flex items-center justify-center text-brand-danger">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-graphite">{formData.deckFile.name}</div>
                    <div className="text-[11px] text-muted font-mono">{formatFileSize(formData.deckFile.size)} · Valid PDF</div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-brand-success border border-emerald-200">
                  Ready for AI Analysis
                </span>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(3)}
                icon={ArrowRight}
                iconPosition="right"
                disabled={!formData.deckFile}
              >
                Continue to Intro Video
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: INTRO VIDEO */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <h2 className="text-lg font-bold text-graphite tracking-tight">
                Introduction Video
              </h2>
              <p className="text-xs text-muted mt-1">
                Upload a 2 to 4 minute video walkthrough explaining team capabilities, architecture, and threat model.
              </p>
            </div>

            <div
              onClick={() => handleMockFileUpload('video')}
              className="border-2 border-dashed border-border-subtle rounded-xl p-8 text-center bg-surface-soft/40 hover:bg-blue-50/20 hover:border-signal-blue transition-all cursor-pointer group"
            >
              <Video className="w-10 h-10 text-muted group-hover:text-signal-blue mx-auto mb-3 transition-colors" />
              <div className="text-sm font-semibold text-graphite">
                Click to attach or drag your MP4 / WebM video
              </div>
              <div className="text-xs text-muted mt-1 font-mono">
                Max 100MB · Recommended 1080p · Max duration 4:00
              </div>
            </div>

            {formData.videoFile && (
              <div className="bg-surface-white border border-border-subtle rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-signal-blue">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-graphite">{formData.videoFile.name}</div>
                    <div className="text-[11px] text-muted font-mono">
                      {formatFileSize(formData.videoFile.size)} · Duration: {formatDuration(formData.videoFile.duration || 180)}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-50 text-brand-success border border-emerald-200">
                  Duration Valid (3:04)
                </span>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)} icon={ArrowLeft}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setCurrentStep(4)}
                icon={ArrowRight}
                iconPosition="right"
                disabled={!formData.videoFile}
              >
                Review Submission
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h2 className="text-lg font-bold text-graphite tracking-tight">
                Review Level 1 Submission
              </h2>
              <p className="text-xs text-muted mt-1">
                Ensure all details are accurate before submitting to the automated AI evaluation pipeline.
              </p>
            </div>

            <div className="border border-border-subtle rounded-lg divide-y divide-border-subtle bg-surface-white text-xs">
              <div className="p-4 bg-surface-subtle/50 flex items-center justify-between">
                <div>
                  <span className="text-muted uppercase text-[10px] font-mono font-semibold">Stage 1</span>
                  <div className="text-sm font-bold text-graphite mt-0.5">{formData.title}</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setCurrentStep(1)}>
                  Edit
                </Button>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <span className="font-semibold text-muted text-[11px] uppercase tracking-wider font-mono">Problem:</span>
                  <p className="text-graphite mt-1 leading-relaxed">{formData.problem}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted text-[11px] uppercase tracking-wider font-mono">Solution:</span>
                  <p className="text-graphite mt-1 leading-relaxed">{formData.solution}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted text-[11px] uppercase tracking-wider font-mono">Innovation:</span>
                  <p className="text-graphite mt-1 leading-relaxed">{formData.innovation}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted text-[11px] uppercase tracking-wider font-mono">Stack:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-surface-soft border border-border-subtle rounded text-[11px] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-subtle/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-brand-danger" />
                  <span className="font-medium text-graphite">{formData.deckFile?.name}</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setCurrentStep(2)}>
                  Change
                </Button>
              </div>

              <div className="p-4 bg-surface-subtle/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-signal-blue" />
                  <span className="font-medium text-graphite">{formData.videoFile?.name}</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setCurrentStep(3)}>
                  Change
                </Button>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-slate-deep flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-signal-blue shrink-0 mt-0.5" />
              <div>
                <strong>Automated Ingestion Pipeline:</strong> Once submitted, HackGuard's evaluation engine parses the submission against the Level 1 rubric. Scores &ge; 75.0 automatically unlock the Level 2 Technical stage.
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)} icon={ArrowLeft}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleFinalSubmit}
                loading={isSubmitting}
                icon={Sparkles}
              >
                Confirm & Submit for AI Evaluation
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: SUBMITTED CONFIRMATION */}
        {currentStep === 5 && submittedData && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-brand-success flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-graphite tracking-tight">
                Level 1 Submission Confirmed
              </h2>
              <p className="text-xs text-muted mt-1.5">
                Your proposal has been securely logged into the HackGuard evaluation queue.
              </p>
            </div>

            <div className="bg-surface-soft border border-border-subtle rounded-lg p-5 text-left text-xs space-y-2.5 font-mono">
              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-muted">SUBMISSION ID:</span>
                <span className="font-bold text-graphite">{submittedData.submissionId}</span>
              </div>
              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-muted">TIMESTAMP:</span>
                <span className="text-graphite">{new Date(submittedData.timestamp).toUTCString()}</span>
              </div>
              <div className="flex justify-between border-b border-border-subtle pb-2">
                <span className="text-muted">EVALUATION STATUS:</span>
                <span className="text-brand-ai font-semibold">AI Screening in Progress</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">AUDIT HASH:</span>
                <span className="text-slate-deep truncate max-w-[200px]">0x8e4b77...29a1</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => window.location.href = '/participant/results'}
              >
                View Live Evaluation Results
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                Submit Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

