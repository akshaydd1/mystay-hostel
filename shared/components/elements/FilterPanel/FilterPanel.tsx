'use client';
import { useState, useEffect, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterSection {
  id: string;
  label: string;
  options: FilterOption[];
  type: "checkbox" | "radio";
}

interface FilterPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  onApply?: (filters: Record<string, string[]>) => void;
  onReset?: () => void;
  animate?: boolean; // enable slide-down animation
  /** Persist previously applied filters when reopening panel */
  initialFilters?: Record<string, string[]>;
  /** Optional external override of filter sections; if omitted uses default internal config */
  sections?: FilterSection[];
}

// Default filter configuration. Pages can override via `sections` prop.
const defaultFilterSections: FilterSection[] = [
  {
    id: "holdingPeriod",
    label: "Holding Period",
    type: "checkbox",
    options: [
      { label: "Up to 1 Month", value: "upto_1_month" },
      { label: "Up to 6 Months", value: "upto_6_months" },
    ],
  },
  {
    id: "action",
    label: "Buy/Sell",
    type: "checkbox",
    options: [
      { label: "Buy", value: "buy" },
      { label: "Sell", value: "sell" },
    ],
  },
  {
    id: "mcap",
    label: "M.Cap",
    type: "checkbox",
    options: [
      { label: "Large Cap", value: "large_cap" },
      { label: "Mid Cap", value: "mid_cap" },
      { label: "Small Cap", value: "small_cap" },
    ],
  },
  {
    id: "upside",
    label: "Upside %",
    type: "checkbox",
    options: [
      { label: "0–10%", value: "0_10" },
      { label: "10–25%", value: "10_25" },
      { label: "25–50%", value: "25_50" },
      { label: "50%+", value: "50_plus" },
    ],
  },
  {
    id: "current_price",
    label: "Stock Price",
    type: "checkbox",
    options: [
      { label: "<₹100", value: "lt_100" },
      { label: "₹100–₹500", value: "100_500" },
      { label: "₹500–₹1000", value: "500_1000" },
      { label: "₹1000–₹5000", value: "1000_5000" },
      { label: "₹5000+", value: "5000_plus" },
    ],
  },
  {
    id: "exchange",
    label: "NSE/BSE Indices",
    type: "radio",
    // For Stock Ratings & Broker Consensus pages: should be replaced by dynamic index list.
    options: [
      { label: "NSE", value: "all_nse_indices" },
      { label: "BSE", value: "all_bse_indices" },
    ],
  },
];

export default function FilterPanel({
  isOpen = true,
  onClose,
  onApply,
  onReset,
  animate = true,
  initialFilters,
  sections,
}: FilterPanelProps) {
  const effectiveSections =sections && sections.length > 0 ? sections : defaultFilterSections;
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(() => initialFilters || {});
  // Track which section is active; default to first with options.
  const [activeSectionId, setActiveSectionId] = useState<string>(effectiveSections[0]?.id || '');

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleValueChange = (section: FilterSection, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section.id] || [];
      const isSelected = current.includes(value);

      if (section.type === "radio") {
        // Single selection: selecting same value clears, otherwise set single value.
        return {
          ...prev,
          [section.id]: isSelected ? [] : [value],
        };
      }

      // Checkbox logic (multi select)
      if (isSelected) {
        return {
          ...prev,
          [section.id]: current.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [section.id]: [...current, value],
        };
      }
    });
  };

  const handleReset = () => {
    setSelectedFilters({});
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(selectedFilters);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`w-full bg-mo-white rounded-lg overflow-hidden flex flex-col ${
        animate ? "panel-enter" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-mo-blue-light border-b border-mo-gray-border">
        <div className="flex items-center gap-2">
          <HiAdjustmentsHorizontal size={24} className="text-mo-text-dark" />
          <h2 className="text-base font-semibold text-mo-text-black">Filter</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-mo-bg-neutral rounded-md transition-colors duration-(--dur-mofsl-fast)"
          aria-label="Close filter"
        >
          <IoClose size={20} className="text-mo-text-dark" />
        </button>
      </div>

      {/* Filter Content */}
      {/* Body: split sidebar + content with fixed min height and internal scrolling */}
      <div className="flex flex-1 min-h-[200px] max-h-[200px]">
        {/* Left Sidebar - Filter Categories */}
        <div
          className="w-[140px] bg-mo-bg-soft border-r border-mo-gray-border overflow-y-auto scrollbar-hide"
          role="listbox"
          aria-label="Filter sections"
        >
          {effectiveSections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                type="button"
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                role="option"
                aria-selected={isActive}
                className={`w-full text-left px-3 py-4 text-xs transition-colors duration-(--dur-mofsl-fast) border-b border-mo-gray-light focus:outline-none focus:ring-2 focus:ring-mo-primary ${
                  isActive
                    ? "bg-mo-bg-neutral text-mo-text-black font-semibold"
                    : "text-mo-text-muted hover:bg-mo-bg-neutral"
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Right Content - Filter Options */}
        <div className="flex-1 bg-mo-white overflow-y-auto p-4 scrollbar-hide">
          {(() => {
            const activeSection = effectiveSections.find((s) => s.id === activeSectionId);
            if (!activeSection) return <div className="text-xs text-mo-text-muted">No section selected.</div>;
            if (activeSection.options.length === 0)
              return (
                <div className="text-xs text-mo-text-muted">
                  No options for {activeSection.label}.
                </div>
              );
            return (
              <div
                key={activeSection.id}
                className="space-y-3"
                aria-label={`Options for ${activeSection.label}`}
              >
                {activeSection.options.map((option) => {
                  const checked =
                    selectedFilters[activeSection.id]?.includes(option.value) ||
                    false;
                  const inputType =
                    activeSection.type === "radio" ? "radio" : "checkbox";
                  return (
                    <label
                      key={option.value}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <span className="text-sm text-mo-text-dark group-hover:text-mo-text-black">
                        {option.label}
                      </span>
                      <input
                        type={inputType}
                        checked={checked}
                        onChange={() =>
                          handleValueChange(activeSection, option.value)
                        }
                        name={activeSection.id}
                        className={`w-4 h-4 border-2 border-mo-gray-border rounded text-mo-primary focus:ring-2 focus:ring-mo-primary focus:ring-offset-0 cursor-pointer ${
                          inputType === "radio" ? "rounded-full" : "rounded"
                        }`}
                        aria-label={`Filter by ${option.label}`}
                      />
                    </label>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Footer Actions */}
      {/* Footer Actions */}
      <div className="flex gap-3 px-4 py-3 bg-mo-white border-t border-mo-gray-border">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-mo-primary bg-mo-white border-2 border-mo-primary rounded-lg hover:bg-mo-bg-soft focus:outline-none focus:ring-2 focus:ring-mo-primary focus:ring-offset-2 transition-colors duration-(--dur-mofsl-fast)"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-mo-primary-text bg-mo-primary rounded-lg hover:bg-mo-blue-secondary focus:outline-none focus:ring-2 focus:ring-mo-primary focus:ring-offset-2 transition-colors duration-(--dur-mofsl-fast)"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
