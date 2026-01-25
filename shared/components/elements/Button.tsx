"use client";

import React, { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "error";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  children,
  className = "",
  style,
  disabled,
  ...props
}) => {
  // Base styles using Tailwind v4 CSS variables
  const baseStyles =
    "font-medium text-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer";

  // Variant styles using CSS variables from globals.css
  const variantStyles = {
    primary:
      "bg-mo-primary text-mo-primary-text hover:opacity-90 focus:ring-mo-primary active:scale-95",
    secondary:
      "bg-mo-gray-light text-mo-text-dark hover:bg-mo-gray-border focus:ring-mo-gray active:scale-95",
    outline:
      "bg-transparent border-1 border-mo-primary text-mo-primary hover:bg-mo-primary hover:text-mo-primary-text focus:ring-mo-primary active:scale-95",
    success:
      "bg-mo-green-success text-white hover:opacity-90 focus:ring-mo-green-success active:scale-95",
    error:
      "bg-mo-red-error text-white hover:opacity-90 focus:ring-mo-red-error active:scale-95",
  };

  // Size styles using CSS variables
  const sizeStyles = {
    sm: "text-[var(--text-mofsl-sm)] h-9",
    md: "text-[var(--text-mofsl-base)] h-9",
    lg: "text-[var(--text-mofsl-lg)] h-14",
  };

  // Padding styles using CSS variables
  const paddingStyles = {
    sm: "px-[var(--space-mofsl-4)] py-[var(--space-mofsl-2)]",
    md: "px-[var(--space-mofsl-6)] py-[var(--space-mofsl-3)]",
    lg: "px-[var(--space-mofsl-8)] py-[var(--space-mofsl-4)]",
  };

  // Border radius using CSS variables
  const radiusStyle = "rounded-[var(--radius-mofsl-lg)]";

  // Transition using CSS variables
  const transitionStyle =
    "transition-all duration-[var(--dur-mofsl-normal)] ease-[var(--ease-mofsl-standard)]";

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${paddingStyles[size]} ${radiusStyle} ${transitionStyle} ${widthStyles} ${className}`;

  return (
    <button
      className={buttonClasses}
      style={style}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
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
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
