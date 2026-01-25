"use client";

import React from "react";

export interface TabToggleOption {
  value: string;
  label: string;
  /** Optional color for active state - if not provided, uses variant default */
  activeColor?: string;
}

export interface TabToggleProps {
  options: TabToggleOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
  /** Size variant - affects width per button */
  size?: 'auto' | 'fixed';
  /** Fixed width per button when size='fixed' */
  buttonWidth?: string;
}

/**
 * TabToggle - Segmented control toggle component
 * Design: Connected bordered buttons with active state highlighting
 * Supports custom colors per option for status-based toggles
 */
export const TabToggle: React.FC<TabToggleProps> = ({
  options,
  value,
  onChange,
  ariaLabel = "Tab selector",
  className = "",
  size = 'auto',
  buttonWidth = 'w-[74px]',
}) => {
  return (
    <div
      className={"inline-flex h-8 bg-mo-bg-light border border-mo-gray-border rounded-full p-1 " + className}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          const currentIndex = options.findIndex(opt => opt.value === value);
          const nextIndex = e.key === 'ArrowRight' 
            ? (currentIndex + 1) % options.length 
            : (currentIndex - 1 + options.length) % options.length;
          onChange(options[nextIndex].value);
          e.preventDefault();
        }
      }}
    >
      {options.map((option, index) => {
        const isActive = value === option.value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${option.value.toLowerCase()}-panel`}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => { 
              if (['Enter', ' '].includes(e.key)) {
                onChange(option.value);
                e.preventDefault();
              }
            }}
            className={`
              flex items-center justify-center min-w-10 h-6 padding 
              ${size === 'fixed' ? buttonWidth : 'px-4'}
              text-[12px] leading-[18px] tracking-[-0.16px] transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mo-primary
              ${isFirst ? 'rounded-l-full' : ''}
              ${isLast ? 'rounded-r-full' : ''}
              ${isActive 
                ? 'font-semibold bg-[#FAFAFA] text-mo-blue-secondary' 
                : 'font-normal bg-[#FFFFFF] text-mo-text-muted'
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
