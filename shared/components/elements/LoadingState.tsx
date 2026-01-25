import React, { ReactNode } from "react";

export interface LoadingStateProps {
  /** Optional custom loading message. Defaults to "Loading..." */
  message?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Variant: 'spinner' (default) or 'skeleton' */
  variant?: "spinner" | "skeleton";
  /** Custom skeleton component to render when variant is 'skeleton' */
  skeleton?: ReactNode;
}

/**
 * LoadingState - Reusable loading indicator component
 * Supports both spinner and skeleton loading states
 * Displays spinner with accessible aria-live region or custom skeleton UI
 */
export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...",
  className = "",
  variant = "spinner",
  skeleton,
}) => {
  // Skeleton variant
  if (variant === "skeleton") {
    return (
      <div className={className}>
        {skeleton}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div 
      role="status" 
      aria-live="polite" 
      className={`flex items-center justify-center py-12 ${className}`}
    >
      <span className="sr-only">{message}</span>
      <div 
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-mo-blue-brand" 
        aria-hidden="true"
      />
    </div>
  );
};
