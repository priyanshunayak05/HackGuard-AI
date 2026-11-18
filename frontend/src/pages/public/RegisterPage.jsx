import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../components/brand/BrandLogo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { ShieldCheck, UserCheck, Code2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('participant');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast('Please enter your full name and valid email.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, role);
      toast(`Registration complete! Welcome to HackGuard AI as ${role.toUpperCase()}.`, 'success');
      navigate(`/${role}`);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-surface-soft flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="lg" className="justify-center" />
          <h2 className="text-xl font-bold text-graphite tracking-tight">
            Create HackGuard Account
          </h2>
          <p className="text-xs text-muted">
            Join competitions, host events, or join evaluation review boards
          </p>
        </div>

        <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-subtle space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-graphite block mb-1.5">
                Registering As
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                  onClick={() => setRole('admin')}
                  className={`p-2 rounded-md border text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                    role === 'admin'
                      ? 'bg-blue-50 border-signal-blue text-signal-blue font-semibold'
                      : 'border-border-subtle hover:bg-surface-soft text-muted'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Organizer</span>
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
              label="Full Name"
              placeholder="e.g. Priyanshu Nayak"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Academic or Corporate Email"
              type="email"
              placeholder="you@domain.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="University or Organization"
              placeholder="e.g. Department of Computer Science"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Complete Registration
            </Button>
          </form>
        </div>

        <div className="text-center text-xs text-muted">
          Already registered?{' '}
          <Link to="/login" className="text-signal-blue hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

