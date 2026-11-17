import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/Toast';
import { Settings, Cpu, Shield, Save, Key, Bell } from 'lucide-react';

export default function AdminSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    dockerRamLimitMb: 1024,
    dockerCpuQuota: 2,
    dockerTimeoutSec: 120,
    astSimilarityAlertThreshold: 60.0,
    judgeOverrideAlertDelta: 3.0,
    apiEndpoint: 'https://engine.hackguard.io/api/v1',
    webhookUrl: 'https://notifications.internal/hackguard-events',
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast('Engine configuration parameters saved successfully.', 'success');
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-border-subtle">
        <h2 className="text-lg font-bold text-graphite tracking-tight">System & Sandbox Architecture Settings</h2>
        <p className="text-xs text-muted">Configure Docker container limits, AST plagiarism thresholds, and webhook endpoints</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Docker Worker Configuration */}
        <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <Cpu className="w-4 h-4 text-signal-blue" />
            <h3 className="text-sm font-bold text-graphite">Docker Container Sandbox Invariants</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Memory Limit (MB)"
              type="number"
              value={settings.dockerRamLimitMb}
              onChange={(e) => setSettings({ ...settings, dockerRamLimitMb: parseInt(e.target.value) || 1024 })}
              helperText="cgroup memory.max limit"
            />
            <Input
              label="vCPU Core Quota"
              type="number"
              value={settings.dockerCpuQuota}
              onChange={(e) => setSettings({ ...settings, dockerCpuQuota: parseInt(e.target.value) || 2 })}
              helperText="cpu.max bandwidth allocation"
            />
            <Input
              label="Execution Timeout (Sec)"
              type="number"
              value={settings.dockerTimeoutSec}
              onChange={(e) => setSettings({ ...settings, dockerTimeoutSec: parseInt(e.target.value) || 120 })}
              helperText="Kills container if exceeded"
            />
          </div>
        </div>

        {/* AST & Evaluation Thresholds */}
        <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <Shield className="w-4 h-4 text-brand-ai" />
            <h3 className="text-sm font-bold text-graphite">Plagiarism & Evaluation Auditing Thresholds</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="AST Plagiarism Alert Threshold (%)"
              type="number"
              step="0.5"
              value={settings.astSimilarityAlertThreshold}
              onChange={(e) => setSettings({ ...settings, astSimilarityAlertThreshold: parseFloat(e.target.value) || 60 })}
              helperText="Flags submission for manual review"
            />
            <Input
              label="Judge Score Override Alert Delta (Points)"
              type="number"
              step="0.5"
              value={settings.judgeOverrideAlertDelta}
              onChange={(e) => setSettings({ ...settings, judgeOverrideAlertDelta: parseFloat(e.target.value) || 3 })}
              helperText="Requires mandatory explanation"
            />
          </div>
        </div>

        {/* Endpoints */}
        <div className="bg-surface-white border border-border-subtle rounded-xl p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
            <Bell className="w-4 h-4 text-slate-deep" />
            <h3 className="text-sm font-bold text-graphite">Telemetry & Webhook Subscriptions</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Core Backend Engine Endpoint"
              value={settings.apiEndpoint}
              onChange={(e) => setSettings({ ...settings, apiEndpoint: e.target.value })}
            />
            <Input
              label="Realtime Event Webhook URL"
              value={settings.webhookUrl}
              onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
              helperText="Receives container exit logs & plagiarism alerts"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={loading} icon={Save}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}

