import React, { useState } from 'react';
import { Terminal, Cpu, CheckCircle2, XCircle, Clock, Copy, Check, Download } from 'lucide-react';
import Button from '../common/Button';

export default function CodeExecutionTerminal({ execution }) {
  const [copied, setCopied] = useState(false);

  if (!execution) {
    return (
      <div className="bg-surface-white border border-border-subtle rounded-xl p-8 text-center text-xs text-muted">
        No container execution data available for this submission.
      </div>
    );
  }

  const {
    status = 'passed',
    exitCode = 0,
    executionDurationSec = 42.8,
    memoryUsageMb = 248.5,
    cpuUtilizationPct = 78.2,
    testsTotal = 44,
    testsPassed = 44,
    testsFailed = 0,
    containerId = 'hg-sandbox-e83fa99b',
    image = 'rust:1.82-bookworm-slim',
    logs = [],
  } = execution;

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface-white border border-border-subtle rounded-xl overflow-hidden shadow-subtle space-y-4 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center justify-center">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-graphite tracking-tight">
                Docker Sandbox Execution & Test Harness
              </h3>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                  exitCode === 0
                    ? 'bg-emerald-50 text-brand-success border border-emerald-200'
                    : 'bg-red-50 text-brand-danger border border-red-200'
                }`}
              >
                Exit Code: {exitCode} ({status.toUpperCase()})
              </span>
            </div>
            <p className="text-xs text-muted font-mono mt-0.5">
              Container ID: {containerId} · Image: {image}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLogs}
            icon={copied ? Check : Copy}
          >
            {copied ? 'Copied' : 'Copy Logs'}
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle font-mono">
          <div className="text-[11px] text-muted uppercase font-sans">Tests Passed</div>
          <div className="text-lg font-bold text-brand-success mt-1 tabular-nums">
            {testsPassed} / {testsTotal}
          </div>
          <div className="text-[10px] text-muted">100% pass rate</div>
        </div>

        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle font-mono">
          <div className="text-[11px] text-muted uppercase font-sans">Wall Duration</div>
          <div className="text-lg font-bold text-graphite mt-1 tabular-nums">
            {executionDurationSec}s
          </div>
          <div className="text-[10px] text-muted">Timeout: 120s max</div>
        </div>

        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle font-mono">
          <div className="text-[11px] text-muted uppercase font-sans">Peak RAM Usage</div>
          <div className="text-lg font-bold text-slate-deep mt-1 tabular-nums">
            {memoryUsageMb} MB
          </div>
          <div className="text-[10px] text-muted">Limit: 1024 MB</div>
        </div>

        <div className="bg-surface-soft p-3 rounded-lg border border-border-subtle font-mono">
          <div className="text-[11px] text-muted uppercase font-sans">CPU Utilization</div>
          <div className="text-lg font-bold text-slate-deep mt-1 tabular-nums">
            {cpuUtilizationPct}%
          </div>
          <div className="text-[10px] text-muted">Quota: 2 vCPUs</div>
        </div>
      </div>

      {/* Terminal Output Window */}
      <div className="rounded-lg border border-graphite bg-[#0B0F19] text-gray-200 font-mono text-xs overflow-hidden shadow-inner">
        {/* Terminal Title Bar */}
        <div className="bg-[#161D2E] px-4 py-2 border-b border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="ml-2 font-medium text-gray-300">hackguard-sandbox-daemon [stdout/stderr]</span>
          </div>
          <span>Isolated Linux 6.6.0-x86_64</span>
        </div>

        {/* Console Log Stream */}
        <div className="p-4 max-h-72 overflow-y-auto space-y-1.5 leading-relaxed selection:bg-signal-blue selection:text-white">
          {logs.map((log, idx) => {
            const isError = log.includes('error') || log.includes('failed');
            const isSuccess = log.includes('passed') || log.includes('ok') || log.includes('clean exit');
            const isInfo = log.includes('[HACKGUARD-RUNNER]') || log.includes('[CARGO BUILD]');

            return (
              <div
                key={idx}
                className={`${
                  isError
                    ? 'text-red-400'
                    : isSuccess
                    ? 'text-emerald-400'
                    : isInfo
                    ? 'text-blue-300'
                    : 'text-gray-300'
                }`}
              >
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
