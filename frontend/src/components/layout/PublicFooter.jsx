import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import { Shield, GitBranch, Cpu, Terminal, ExternalLink } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-surface-white border-t border-border-subtle pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border-subtle">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <BrandLogo size="md" />
            <p className="text-xs text-muted leading-relaxed">
              Secure AI-Powered Hackathon Hosting & Automated Evaluation Engine. Bringing structural AST verification, container sandboxing, and objective rubric scoring to competitive technology events.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-deep pt-1">
              <span className="w-2 h-2 rounded-full bg-brand-success"></span>
              <span>ENGINE STATUS: OPERATIONAL</span>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-graphite uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/discover" className="hover:text-signal-blue transition-colors">
                  Browse Competitions
                </Link>
              </li>
              <li>
                <Link to="/participant/submissions" className="hover:text-signal-blue transition-colors">
                  Two-Stage Submissions
                </Link>
              </li>
              <li>
                <Link to="/admin/plagiarism" className="hover:text-signal-blue transition-colors">
                  AST Plagiarism Engine
                </Link>
              </li>
              <li>
                <Link to="/judge" className="hover:text-signal-blue transition-colors">
                  Judge Scoring Calibration
                </Link>
              </li>
            </ul>
          </div>

          {/* Workspaces */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-graphite uppercase tracking-wider font-mono">
              Workspaces
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/admin" className="hover:text-signal-blue transition-colors">
                  Organizer Command Center
                </Link>
              </li>
              <li>
                <Link to="/participant" className="hover:text-signal-blue transition-colors">
                  Participant Dashboard
                </Link>
              </li>
              <li>
                <Link to="/judge" className="hover:text-signal-blue transition-colors">
                  Judge Assessment Queue
                </Link>
              </li>
              <li>
                <Link to="/admin/leaderboard" className="hover:text-signal-blue transition-colors">
                  Realtime Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Compliance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-graphite uppercase tracking-wider font-mono">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-signal-blue" />
                <span>Docker Sandbox Isolation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-brand-ai" />
                <span>AST Semantic Graph Diff</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-brand-success" />
                <span>Non-repudiable Evaluation Audit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-deep" />
                <span>Verifiable Container Logs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <div>
            © {new Date().getFullYear()} HackGuard AI Engine. All rights reserved. Built for universities, enterprises & global competitions.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/priyanshunayak05/HackGuard-AI"
              target="_blank"
              rel="noreferrer"
              className="hover:text-graphite flex items-center gap-1 transition-colors"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="font-mono text-[11px] text-slate-deep">SECURE-BUILD-v2.4.9</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

