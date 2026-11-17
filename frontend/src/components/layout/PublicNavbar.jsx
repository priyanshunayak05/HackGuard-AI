import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PublicNavbar() {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-surface-white/95 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <BrandLogo size="md" />

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-deep">
          <Link to="/discover" className="hover:text-signal-blue transition-colors">
            Discover Hackathons
          </Link>
          <a href="/#how-it-works" className="hover:text-signal-blue transition-colors">
            Evaluation Stages
          </a>
          <a href="/#architecture" className="hover:text-signal-blue transition-colors">
            AST & Sandbox Architecture
          </a>
          <a href="/#leaderboard-preview" className="hover:text-signal-blue transition-colors">
            Live Leaderboards
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>

          {/* Quick Launch Command Center */}
          <Link to={`/${role}`}>
            <Button variant="secondary" size="sm" icon={ShieldCheck}>
              Open Command Center
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

