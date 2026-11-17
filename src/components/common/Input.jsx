import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    rightElement,
    type = 'text',
    id,
    name,
    required = false,
    className = '',
    inputClassName = '',
    ...props
  },
  ref
) {
  const inputId = id || name || Math.random().toString(36).substring(7);

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
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
        {Icon && (
          <div className="absolute left-3 text-muted pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          required={required}
          className={`w-full bg-surface-white text-graphite text-[13px] border rounded-md h-9 transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue ${
            Icon ? 'pl-9' : 'pl-3'
          } ${rightElement ? 'pr-10' : 'pr-3'} ${
            error
              ? 'border-brand-danger focus:ring-brand-danger/20 focus:border-brand-danger'
              : 'border-border-subtle hover:border-slate-300'
          } ${inputClassName}`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-brand-danger flex items-center gap-1 mt-0.5">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

export default Input;
