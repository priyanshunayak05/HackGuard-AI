import React from 'react';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline', // 'underline' | 'pill'
  className = '',
}) {
  return (
    <div
      className={`flex items-center ${
        variant === 'underline'
          ? 'border-b border-border-subtle gap-6'
          : 'bg-surface-soft p-1 rounded-md gap-1 border border-border-subtle'
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        if (variant === 'pill') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all select-none ${
                isActive
                  ? 'bg-surface-white text-graphite shadow-sm font-semibold'
                  : 'text-muted hover:text-graphite'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-signal-blue-light text-signal-blue'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-2.5 text-xs font-medium border-b-2 transition-all select-none -mb-px ${
              isActive
                ? 'border-signal-blue text-signal-blue font-semibold'
                : 'border-transparent text-muted hover:text-graphite hover:border-gray-300'
            }`}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive
                    ? 'bg-signal-blue text-white'
                    : 'bg-surface-soft text-muted border border-border-subtle'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
