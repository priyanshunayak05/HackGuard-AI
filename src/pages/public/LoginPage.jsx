import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { ShieldCheck, UserCheck, Code2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login, switchRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('elena.rostova@hackguard.io');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, role);
      toast(`Signed in successfully as ${role.toUpperCase()}.`, 'success');
      navigate(`/${role}`);
    }, 400);
  };

  const handleQuickLogin = (selectedRole) => {
    switchRole(selectedRole);
    toast(`Authenticated as ${selectedRole.toUpperCase()} via Instant Preset.`, 'success');
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <BrandLogo size="lg" className="justify-center" />
          <h2 className="text-xl font-bold text-graphite tracking-tight">
            Sign In to HackGuard Command Center
          </h2>
          <p className="text-xs text-muted">
            Institutional authentication for Organizers, Participants & Judges
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-subtle space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-2 rounded-md border text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                    role === 'admin'
                      ? 'bg-blue-50 border-signal-blue text-signal-blue font-semibold'
                      : 'border-border-subtle hover:bg-surface-soft text-muted'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('participant')}
                  className={`p-2 rounded-md border text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                    role === 'participant'
                      ? 'bg-blue-50 border-signal-blue text-signal-blue font-semibold'
                      : 'border-border-subtle hover:bg-surface-soft text-muted'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Participant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('judge')}
                  className={`p-2 rounded-md border text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                    role === 'judge'
                      ? 'bg-blue-50 border-signal-blue text-signal-blue font-semibold'
                      : 'border-border-subtle hover:bg-surface-soft text-muted'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Judge</span>
                </button>
              </div>
            </div>

            <Input
              label="Work or Academic Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Authenticate & Continue
            </Button>
          </form>

          {/* Quick Preset Buttons for Evaluators */}
          <div className="pt-4 border-t border-border-subtle space-y-2">
            <div className="text-[11px] font-mono text-muted uppercase font-semibold text-center">
              Instant Development Presets
            </div>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="w-full text-left p-2 rounded bg-surface-soft hover:bg-blue-50/60 border border-border-subtle flex items-center justify-between text-xs transition-colors"
              >
                <span className="font-semibold text-graphite">Dr. Elena Rostova (Admin)</span>
                <span className="text-[11px] font-mono text-signal-blue">Launch &rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('participant')}
                className="w-full text-left p-2 rounded bg-surface-soft hover:bg-blue-50/60 border border-border-subtle flex items-center justify-between text-xs transition-colors"
              >
                <span className="font-semibold text-graphite">Alex Rivera (Team Nexus Lead)</span>
                <span className="text-[11px] font-mono text-brand-ai">Launch &rarr;</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('judge')}
                className="w-full text-left p-2 rounded bg-surface-soft hover:bg-blue-50/60 border border-border-subtle flex items-center justify-between text-xs transition-colors"
              >
                <span className="font-semibold text-graphite">Prof. Marcus Thorne (Lead Judge)</span>
                <span className="text-[11px] font-mono text-brand-success">Launch &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted">
          New to the platform?{' '}
          <Link to="/register" className="text-signal-blue hover:underline font-semibold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
