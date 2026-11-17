import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-md focus:outline-none focus:ring-2 focus:ring-signal-blue/20 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
    md: 'text-[13px] px-3.5 py-2 gap-2 h-9',
    lg: 'text-sm px-4 py-2.5 gap-2.5 h-10',
  };

  const variantStyles = {
    primary: 'bg-signal-blue text-white hover:bg-signal-blue-hover active:bg-blue-800 shadow-sm border border-transparent',
    secondary: 'bg-slate-deep text-white hover:bg-[#132f45] active:bg-[#0e2334] shadow-sm border border-transparent',
    outline: 'bg-surface-white text-graphite border border-border-subtle hover:bg-surface-soft hover:border-slate-300 active:bg-gray-100',
    ghost: 'bg-transparent text-graphite hover:bg-surface-soft active:bg-gray-100 border border-transparent',
    danger: 'bg-brand-danger text-white hover:bg-red-700 active:bg-red-800 shadow-sm border border-transparent',
    subtle: 'bg-signal-blue-light text-signal-blue hover:bg-blue-100 border border-blue-200/60',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}

