"use client";
import React, { useState, useMemo } from "react";

interface ChipItem {
  label: string;
  value?: string; // falls back to label
  className?: string; // custom per-chip classes
  disabled?: boolean; // disables interaction
}

interface ChipsTagsProps {
  chips?: (string | ChipItem)[]; // accepts strings or objects
  activeChip?: string; // value (or label if value absent)
  onChipChange?: (chipValue: string) => void;
}

const ChipsTags: React.FC<ChipsTagsProps> = ({
  chips = [],
  activeChip,
  onChipChange,
}) => {
  const normalizedChips: ChipItem[] = useMemo(() => {
    return (chips as (string | ChipItem)[]).map((c) =>
      typeof c === "string"
        ? { label: c, value: c }
        : {
            label: c.label,
            value: c.value || c.label,
            className: c.className,
            disabled: c.disabled,
          }
    );
  }, [chips]);

  const [internalActive, setInternalActive] = useState<string>(
    normalizedChips[0]?.value || ""
  );
  const currentActive = activeChip ?? internalActive;

  const handleChipClick = (value: string, disabled?: boolean) => {
    if (disabled) return;
    if (!activeChip) setInternalActive(value); // uncontrolled mode
    onChipChange?.(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 justify-start">
      {normalizedChips.map((chip) => {
        const value = chip.value || chip.label;
        const active = value === currentActive;
        const disabled = !!chip.disabled;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handleChipClick(value, disabled)}
            className={
              "px-4 py-1 rounded-full text-sm font-medium border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer " +
              (disabled
                ? "opacity-50 cursor-not-allowed"
                : active
                ? "bg-mo-primary text-white border-mo-primary"
                : "bg-white text-mo-primary border-mo-primary hover:bg-mo-primary hover:text-white") +
              (chip.className ? " " + chip.className : "")
            }
            aria-pressed={active}
            aria-disabled={disabled}
            disabled={disabled}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};

export default ChipsTags;