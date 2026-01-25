"use client";
import React, { ReactNode } from 'react';

export interface FloatingPanelFrameProps {
  children: ReactNode;
  className?: string;
  /** Width (tailwind or custom) */
  widthClassName?: string;
  /** Max height constraint */
  maxHeightClassName?: string;
  /** Additional border/shadow overrides */
  variantClassName?: string;
}

/** Structural frame & default styling for a floating panel */
export default function FloatingPanelFrame({
  children,
  className = '',
  widthClassName = 'w-[360px]',
  maxHeightClassName = 'max-h-[520px]',
  variantClassName = 'shadow-mofsl-lg rounded-lg bg-mo-white border border-mo-gray-border',
}: FloatingPanelFrameProps) {
  return (
    <div
      className={`${widthClassName} ${maxHeightClassName} ${variantClassName} overflow-hidden flex flex-col ${className}`}
      data-floating-panel-frame
    >
      {children}
    </div>
  );
}
