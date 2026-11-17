import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(function Select(
  {
    label,
    options = [],
    error,
    helperText,
    id,
    name,
    required = false,
    className = '',
    selectClassName = '',
    ...props
  },
  ref
) {
  const selectId = id || name || Math.random().toString(36).substring(7);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold text-graphite flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-brand-danger">*</span>}
          </span>
          {helperText && !error && (
            <span className="text-[11px] text-muted font-normal">{helperText}</span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          className={`w-full bg-surface-white text-graphite text-[13px] border rounded-md h-9 pl-3 pr-8 transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue cursor-pointer ${
            error
              ? 'border-brand-danger focus:ring-brand-danger/20 focus:border-brand-danger'
              : 'border-border-subtle hover:border-slate-300'
          } ${selectClassName}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 pointer-events-none text-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <p className="text-xs text-brand-danger flex items-center gap-1 mt-0.5">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

export default Select;
