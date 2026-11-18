import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../brand/BrandLogo';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export default function PublicNavbar() {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToSection = (sectionId) => (event) => {
    event.preventDefault();
    navigate(`/#${sectionId}`);

    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface-white/95 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <BrandLogo size="md" />

          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-deep">
            <Link to="/discover" className="hover:text-signal-blue transition-colors">
              Hackathons
            </Link>
            <Link to="/#how-it-works" onClick={navigateToSection('how-it-works')} className="hover:text-signal-blue transition-colors">
              How it works
            </Link>
            <Link to="/#architecture" onClick={navigateToSection('architecture')} className="hover:text-signal-blue transition-colors">
              Evaluation
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to={`/${role}`}>
              <Button variant="secondary" size="sm" icon={ShieldCheck}>
                Workspace
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden -mx-4 flex gap-6 overflow-x-auto border-t border-border-subtle px-4 py-3 text-sm font-medium text-slate-deep">
          <Link to="/discover" className="shrink-0 hover:text-signal-blue transition-colors">
            Hackathons
          </Link>
          <Link to="/#how-it-works" onClick={navigateToSection('how-it-works')} className="shrink-0 hover:text-signal-blue transition-colors">
            How it works
          </Link>
          <Link to="/#architecture" onClick={navigateToSection('architecture')} className="shrink-0 hover:text-signal-blue transition-colors">
            Evaluation
          </Link>
        </div>
      </div>
    </nav>
  );
}
