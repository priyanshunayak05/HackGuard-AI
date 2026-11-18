import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { Scale, Mail, Building, Save, ShieldCheck } from 'lucide-react';

export default function JudgeProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    institution: 'Cyber Security Research Institute',
    expertise: user.expertise?.join(', ') || 'AST Analysis, Docker Sandboxing, Cryptography',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Evaluator profile details updated.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">Evaluator Credentials & Profile</h2>
        <p className="text-xs text-muted">Accredited judge credentials, domain expertise, and institutional affiliations</p>
      </div>

      <form onSubmit={handleSave} className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-border-subtle">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-border-subtle"
          />
          <div>
            <div className="font-bold text-graphite text-base">{user.name}</div>
            <div className="text-xs text-brand-success font-mono font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACCREDITED LEAD JUDGE</span>
            </div>
          </div>
        </div>

        <Input
          label="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <Input
          label="Academic Email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <Input
          label="Affiliated Research Institution"
          value={profile.institution}
          onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
        />

        <Input
          label="Expertise Domains (Comma-separated)"
          value={profile.expertise}
          onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
          helperText="Used for automated matching of submission technical stacks"
        />

        <div className="pt-2 flex justify-end">
          <Button type="submit" variant="primary" loading={loading} icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

