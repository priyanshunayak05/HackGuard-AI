import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted mb-2">
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link
            to="/"
            className="flex items-center text-muted hover:text-graphite transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3 h-3 text-muted/60" />
              {isLast || !item.to ? (
                <span className="font-medium text-graphite">{item.label}</span>
              ) : (
                <Link
                  to={item.to}
                  className="text-muted hover:text-graphite transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

