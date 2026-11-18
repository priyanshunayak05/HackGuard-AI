import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { User, Mail, Building, GitBranch, Save } from 'lucide-react';

export default function ParticipantProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    title: user.title || 'Lead Systems Engineer',
    institution: user.institution || 'Institute of Advanced Computing',
    githubHandle: 'alex-rivera-dev',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Profile preferences updated.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">Competitor Profile & Credentials</h2>
        <p className="text-xs text-muted">Manage your identity, academic verification, and GitHub repository links</p>
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
            <div className="text-xs text-muted font-mono">{user.role.toUpperCase()} ACCOUNT</div>
          </div>
        </div>

        <Input
          label="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <Input
          label="Institutional Email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <Input
          label="Professional / Academic Title"
          value={profile.title}
          onChange={(e) => setProfile({ ...profile, title: e.target.value })}
        />

        <Input
          label="University / Organization"
          value={profile.institution}
          onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
        />

        <Input
          label="GitHub Username"
          value={profile.githubHandle}
          onChange={(e) => setProfile({ ...profile, githubHandle: e.target.value })}
          helperText="Used for automated SSH key signature checks"
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

