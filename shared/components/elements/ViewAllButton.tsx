"use client";

import React from "react";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";

export interface ViewAllButtonProps {
  /**
   * The text to display on the button
   * @default "View All"
   */
  label?: string;
  /**
   * The URL to navigate to when the button is clicked
   */
  href?: string;
  /**
   * Optional click handler (only used when href is not provided)
   */
  onClick?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Show arrow icon
   * @default true
   */
  showArrow?: boolean;
  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string;
}

/**
 * ViewAllButton component - A reusable button for "View All" actions
 * 
 * Features:
 * - Can navigate to a page (using href prop)
 * - Can trigger a custom action (using onClick prop)
 * - Customizable label
 * - Optional arrow icon
 * - Accessible
 */
export const ViewAllButton: React.FC<ViewAllButtonProps> = ({
  label = "View All",
  href,
  onClick,
  className = "",
  showArrow = true,
  ariaLabel,
}) => {
  const buttonContent = (
    <>
      <span>{label}</span>
      {showArrow && (
        <span aria-hidden="true">
          <IoMdArrowForward />
        </span>
      )}
    </>
  );

  const baseClasses = `flex items-center gap-1 text-xs font-medium text-mo-blue-secondary md:text-sm hover:text-mo-blue-primary transition-colors ${className}`;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        aria-label={ariaLabel || `${label} link`}
      >
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || label}
    >
      {buttonContent}
    </button>
  );
};
