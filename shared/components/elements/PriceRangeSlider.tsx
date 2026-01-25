"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";

/* --------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export interface PriceRangeSliderProps {
  /** Low value label */
  lowLabel: string;
  /** Low value */
  lowValue: number;
  /** High value label */
  highLabel: string;
  /** High value */
  highValue: number;
  /** Current value (for indicator position) */
  currentValue: number;
  /** Additional className */
  className?: string;
}

/* --------------------------------------------------------------------------
   Component
---------------------------------------------------------------------------- */
/**
 * PriceRangeSlider - Displays a price range with low/high values and current position indicator
 * 
 * @example
 * ```tsx
 * <PriceRangeSlider
 *   lowLabel="Day Low"
 *   lowValue={166.03}
 *   highLabel="Day High"
 *   highValue={168.74}
 *   currentValue={167.5}
 * />
 * ```
 */
export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  lowLabel,
  lowValue,
  highLabel,
  highValue,
  currentValue,
  className,
}) => {
  // Calculate position percentage
  const range = highValue - lowValue;
  const position = range > 0 ? ((currentValue - lowValue) / range) * 100 : 50;
  const clampedPosition = Math.min(Math.max(position, 0), 100);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Labels and Values */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-normal leading-3 tracking-[-0.16px] text-mo-text-muted">
            {lowLabel}
          </p>
          <p className="text-[12px] font-semibold leading-4 tracking-[-0.16px] text-mo-text-dark">
            {lowValue.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <p className="text-[10px] font-normal leading-3 tracking-[-0.16px] text-mo-text-muted">
            {highLabel}
          </p>
          <p className="text-[12px] font-semibold leading-4 tracking-[-0.16px] text-mo-text-dark">
            {highValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Range Slider */}
      <div className="relative h-4 rounded-lg">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1">
          <div className="absolute inset-0 h-1 rounded-full bg-gradient-to-r from-[#b8d7ff] to-[#2c6acf]" />
        </div>

        {/* Current Position Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white border border-[#9a9cea] shadow-sm"
          style={{ left: `${clampedPosition}%` }}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
