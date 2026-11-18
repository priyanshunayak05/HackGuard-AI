import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { useHackathon } from '../../context/HackathonContext';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Scale, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';

export default function CreateHackathonPage() {
  const { addHackathon } = useHackathon();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: 'Autonomous Systems Security & Invariant Hackathon 2026',
    shortDescription: 'Verifying robotic execution paths, eBPF telemetry shields, and neural network safety filters.',
    description: 'A global competitive sprint aimed at deploying mathematical formal verification systems and low-level kernel protection mechanisms against emerging adversarial threats.',
    category: 'Cybersecurity & AI',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    totalPrizePool: '$35,000',
    // Schedule
    registrationDeadline: '2026-11-28',
    startDate: '2026-12-01',
    endDate: '2026-12-15',
    level1Deadline: '2026-12-05',
    level2Deadline: '2026-12-14',
    // Participation
    minTeamSize: 2,
    maxTeamSize: 4,
    eligibility: 'Open to university students, academic researchers, and independent systems engineers.',
    rules: [
      'Level 2 technical submission must run inside HackGuard isolated container sandbox.',
      'AST-based plagiarism analysis will automatically flag structural duplicate submissions.',
      'All automated test suites must pass within 120 seconds.',
    ],
    newRuleInput: '',
    // Evaluation
    qualificationThreshold: 75.0,
    rubricL1: [
      { id: 'r1_1', name: 'Problem Statement & Clarity', weight: 25, maxMarks: 25 },
      { id: 'r1_2', name: 'Architectural Novelty', weight: 35, maxMarks: 35 },
      { id: 'r1_3', name: 'Technical Feasibility', weight: 40, maxMarks: 40 },
    ],
    rubricL2: [
      { id: 'r2_1', name: 'Code Quality & AST Modularity', weight: 30, maxMarks: 30 },
      { id: 'r2_2', name: 'Sandbox Test Suite Execution', weight: 40, maxMarks: 40 },
      { id: 'r2_3', name: 'Security & Invariant Containment', weight: 30, maxMarks: 30 },
    ],
  });

  const handleAddRule = () => {
    if (!formData.newRuleInput.trim()) return;
    setFormData({
      ...formData,
      rules: [...formData.rules, formData.newRuleInput.trim()],
      newRuleInput: '',
    });
  };

  const handleRemoveRule = (index) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, idx) => idx !== index),
    });
  };

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newEvent = {
        id: `hack-${Date.now()}`,
        status: 'active',
        currentStage: 'registration',
        registeredTeamsCount: 0,
        activeSubmissionsCount: 0,
        qualifiedTeamsCount: 0,
        organizer: 'HackGuard Technical Committee',
        ...formData,
      };
      addHackathon(newEvent);
      toast('Hackathon published and open for registrations!', 'success');
      navigate('/admin/hackathons');
    }, 600);
  };

  const sections = [
    { num: 1, label: 'Basic Info', icon: Trophy },
    { num: 2, label: 'Schedule', icon: Calendar },
    { num: 3, label: 'Participation', icon: Users },
    { num: 4, label: 'Evaluation Rubrics', icon: Scale },
    { num: 5, label: 'Review & Publish', icon: FileCheck2 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-xl font-bold text-graphite tracking-tight">Create Hackathon Competition</h2>
        <p className="text-xs text-muted">Configure competition scope, schedule, participation invariants, and dual-stage rubrics</p>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {sections.map((sec) => {
          const isActive = currentSection === sec.num;
          const isDone = currentSection > sec.num;
          const Icon = sec.icon;
          return (
            <button
              key={sec.num}
              onClick={() => setCurrentSection(sec.num)}
              className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-colors ${
                isActive
                  ? 'bg-surface-white border-signal-blue ring-2 ring-signal-blue/20 shadow-xs'
                  : isDone
                  ? 'bg-surface-soft border-emerald-300 text-emerald-800'
                  : 'bg-surface-white border-border-subtle text-muted hover:border-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  isActive
                    ? 'bg-signal-blue text-white'
                    : isDone
                    ? 'bg-brand-success text-white'
                    : 'bg-surface-soft text-muted'
                }`}
              >
                {isDone ? '✓' : sec.num}
              </div>
              <span className={`text-xs font-semibold truncate ${isActive ? 'text-graphite' : 'text-slate-deep'}`}>
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form Workspace */}
      <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-subtle">
        {/* SECTION 1: BASIC INFORMATION */}
        {currentSection === 1 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
              Section 1 — Basic Information
            </h3>

            <Input
              label="Hackathon Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category & Domain"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  { value: 'Cybersecurity & AI', label: 'Cybersecurity & AI' },
                  { value: 'Systems & Edge', label: 'Systems & Edge' },
                  { value: 'Healthcare AI', label: 'Healthcare AI' },
                  { value: 'Decentralized Infra', label: 'Decentralized Infra' },
                ]}
              />
              <Input
                label="Total Prize Pool Allocation"
                value={formData.totalPrizePool}
                onChange={(e) => setFormData({ ...formData, totalPrizePool: e.target.value })}
                placeholder="e.g. $45,000"
              />
            </div>

            <Input
              label="Short Tagline (Displayed in listings)"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            />

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Detailed Competition Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface-white text-graphite text-xs border border-border-subtle rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
              />
            </div>

            <Input
              label="Banner Image URL"
              value={formData.bannerUrl}
              onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
            />

            <div className="pt-4 flex justify-end">
              <Button variant="primary" onClick={() => setCurrentSection(2)} icon={ArrowRight} iconPosition="right">
                Next: Competition Schedule
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 2: SCHEDULE */}
        {currentSection === 2 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
              Section 2 — Competition Timeline & Gates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Registration Deadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
              />
              <Input
                label="Competition Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <Input
                label="Competition Final Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Level 1 (Idea Evaluation) Deadline"
                type="date"
                value={formData.level1Deadline}
                onChange={(e) => setFormData({ ...formData, level1Deadline: e.target.value })}
                helperText="Submissions after this time cannot qualify for L2"
              />
              <Input
                label="Level 2 (Technical Sandbox) Deadline"
                type="date"
                value={formData.level2Deadline}
                onChange={(e) => setFormData({ ...formData, level2Deadline: e.target.value })}
                helperText="Final code lock for Docker benchmark execution"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentSection(1)} icon={ArrowLeft}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setCurrentSection(3)} icon={ArrowRight} iconPosition="right">
                Next: Participation Rules
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 3: PARTICIPATION */}
        {currentSection === 3 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
              Section 3 — Participation & Team Boundaries
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Minimum Team Size"
                type="number"
                min="1"
                max="6"
                value={formData.minTeamSize}
                onChange={(e) => setFormData({ ...formData, minTeamSize: parseInt(e.target.value) || 1 })}
              />
              <Input
                label="Maximum Team Size"
                type="number"
                min="1"
                max="8"
                value={formData.maxTeamSize}
                onChange={(e) => setFormData({ ...formData, maxTeamSize: parseInt(e.target.value) || 4 })}
              />
            </div>

            <Input
              label="Eligibility Criteria"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            />

            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Competition Rules & Sandbox Policies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.newRuleInput}
                  onChange={(e) => setFormData({ ...formData, newRuleInput: e.target.value })}
                  placeholder="Enter rule policy..."
                  className="bg-surface-white text-graphite text-xs border border-border-subtle rounded-md px-3 h-8 flex-1 focus:outline-none focus:ring-2 focus:ring-signal-blue/20"
                />
                <Button size="sm" variant="outline" onClick={handleAddRule} icon={Plus}>
                  Add Rule
                </Button>
              </div>

              <div className="space-y-1.5 pt-1">
                {formData.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-surface-soft border border-border-subtle text-xs">
                    <span className="text-slate-deep">{rule}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRule(idx)}
                      className="text-muted hover:text-brand-danger"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentSection(2)} icon={ArrowLeft}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setCurrentSection(4)} icon={ArrowRight} iconPosition="right">
                Next: Evaluation Rubrics
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 4: EVALUATION RUBRIC */}
        {currentSection === 4 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
              Section 4 — Dual-Stage Evaluation Rubrics & Weights
            </h3>

            <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-signal-blue font-mono">Qualification Gate Threshold:</span>
                <p className="text-muted mt-0.5">Minimum Level 1 score required to unlock Level 2 Technical sandbox</p>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <input
                  type="number"
                  step="0.5"
                  min="50"
                  max="95"
                  value={formData.qualificationThreshold}
                  onChange={(e) => setFormData({ ...formData, qualificationThreshold: parseFloat(e.target.value) || 75.0 })}
                  className="w-16 h-8 text-center font-bold border border-border-subtle rounded bg-surface-white"
                />
                <span className="font-semibold text-graphite">/ 100</span>
              </div>
            </div>

            {/* Rubrics Preview Table */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-slate-deep uppercase">
                Level 1 Rubric (Idea & Feasibility)
              </div>
              <div className="space-y-1.5">
                {formData.rubricL1.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-2.5 rounded bg-surface-soft border border-border-subtle text-xs">
                    <span className="font-medium text-graphite">{r.name}</span>
                    <span className="font-mono text-muted">{r.weight}% Weight ({r.maxMarks} max)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs font-bold text-slate-deep uppercase">
                Level 2 Rubric (Technical Sandbox & AST)
              </div>
              <div className="space-y-1.5">
                {formData.rubricL2.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-2.5 rounded bg-surface-soft border border-border-subtle text-xs">
                    <span className="font-medium text-graphite">{r.name}</span>
                    <span className="font-mono text-muted">{r.weight}% Weight ({r.maxMarks} max)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentSection(3)} icon={ArrowLeft}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setCurrentSection(5)} icon={ArrowRight} iconPosition="right">
                Review & Publish
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 5: REVIEW & PUBLISH */}
        {currentSection === 5 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-graphite tracking-tight border-b border-border-subtle pb-3">
              Section 5 — Final Review & Launch
            </h3>

            <div className="border border-border-subtle rounded-lg divide-y divide-border-subtle bg-surface-white text-xs">
              <div className="p-4 bg-surface-subtle/40 space-y-1">
                <span className="font-mono text-[10px] uppercase text-signal-blue font-bold">{formData.category}</span>
                <div className="text-base font-bold text-graphite">{formData.title}</div>
                <p className="text-muted leading-relaxed">{formData.shortDescription}</p>
              </div>

              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div>
                  <span className="text-[10px] text-muted uppercase font-sans">Prize Allocation</span>
                  <div className="font-bold text-graphite mt-0.5">{formData.totalPrizePool}</div>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase font-sans">Team Capacity</span>
                  <div className="font-bold text-graphite mt-0.5">{formData.minTeamSize} – {formData.maxTeamSize} Members</div>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase font-sans">Registration Closes</span>
                  <div className="font-bold text-graphite mt-0.5">{formData.registrationDeadline}</div>
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase font-sans">L1 Qualification</span>
                  <div className="font-bold text-brand-success mt-0.5">&ge; {formData.qualificationThreshold.toFixed(1)} pts</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setCurrentSection(4)} icon={ArrowLeft}>
                Back
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePublish} loading={loading}>
                  Save Draft
                </Button>
                <Button variant="primary" onClick={handlePublish} loading={loading} icon={Sparkles}>
                  Publish Hackathon
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

