"use client";

import { FC } from "react";

type ChipsVariant = "sm" | "md" | "lg";

interface ChipsProps {
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  variant?: ChipsVariant;
}

const textSizeClasses: Record<ChipsVariant, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const Chips: FC<ChipsProps> = ({
  label,
  count,
  isActive = false,
  onClick,
  variant = "md",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer hover:bg-mo-blue-brand hover:text-white
        ${textSizeClasses[variant]}
        ${
          isActive
            ? "bg-[#2E2A94] text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
        }
      `}
    >
      {label}
      {count !== undefined && `(${count})`}
    </button>
  );
};

export default Chips;
