import React from "react";

export interface ErrorStateProps {
  /** Error object or error message */
  error: Error | { message: string };
  /** Retry callback function */
  onRetry: () => void;
  /** Optional user-friendly fallback message */
  userMessage?: string;
  /** Optional className for custom styling */
  className?: string;
}

/**
 * ErrorState - Reusable error display component
 * Shows error message with retry button and accessible alert region
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error, 
  onRetry,
  userMessage = "Unable to load data. Please try again.",
  className = ""
}) => {
  const displayMessage = error?.message || userMessage;

  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      className={`bg-mo-red-light border border-mo-red-error rounded-lg p-4 text-mo-red-error ${className}`}
    >
      <p className="font-medium">Error loading data</p>
      <p className="text-sm mt-1">{displayMessage}</p>
      <button
        onClick={onRetry}
        className="mt-3 px-4 py-2 bg-mo-red-error text-mo-white text-sm rounded-md hover:bg-mo-red-dark transition-colors"
        aria-label="Retry loading data"
      >
        Retry
      </button>
    </div>
  );
};
