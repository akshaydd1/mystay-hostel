"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";

/* --------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export interface ProgressBarProps {
  /** Progress percentage (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant */
  variant?: "default" | "primary" | "success" | "error" | "warning" | "cyan" | "loss";
  /** Custom background color */
  backgroundColor?: string;
  /** Custom progress color */
  progressColor?: string;
  /** Whether to show percentage label */
  showLabel?: boolean;
  /** Additional className for container */
  className?: string;
  /** Accessible label */
  "aria-label"?: string;
}

/* --------------------------------------------------------------------------
   Component
---------------------------------------------------------------------------- */
/**
 * ProgressBar - A flexible progress bar component
 * 
 * @example
 * ```tsx
 * <ProgressBar value={60} variant="success" size="md" showLabel />
 * <ProgressBar value={75} progressColor="#1da597" />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  backgroundColor,
  progressColor,
  showLabel = false,
  className,
  "aria-label": ariaLabel,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Size classes
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
    xl: "h-5",
  };

  // Variant colors for progress
  const variantColors = {
    default: "bg-mo-blue-primary",
    primary: "bg-mo-primary",
    success: "bg-mo-green-success",
    error: "bg-mo-red-error",
    loss: "bg-mo-red-loss",
    warning: "bg-mo-accent-yellow",
    cyan: "bg-mo-cyan",
  };

  // Background color (light gray by default)
  const bgColor = backgroundColor || "#f2f4f7";
  const fillColor = progressColor || variantColors[variant];

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden flex-1",
          size === "xl" ? "rounded-lg" : "rounded-full",
          sizeClasses[size]
        )}
        style={{ backgroundColor: bgColor }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={ariaLabel || `Progress: ${percentage.toFixed(0)}%`}
      >
        <div
          className={cn(
            "h-full transition-all duration-300",
            size === "xl" ? "rounded-md" : "rounded-full",
            fillColor
          )}
          style={{
            width: `${percentage}%`,
            backgroundColor: progressColor,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-mo-text-muted min-w-[3ch] text-right">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
