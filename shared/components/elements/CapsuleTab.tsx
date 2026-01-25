"use client";
import { useState, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

/* --------------------------------------------------------------------------
   Types
---------------------------------------------------------------------------- */
export interface CapsuleTabProps<T extends string = string> {
  tabs: readonly T[];
  labels?: Record<T, string>;
  defaultTab?: T;
  className?: string;
  tabClassName?: string;
  onTabChange?: (tab: T) => void;
  children: (activeTab: T) => ReactNode;
}

/* --------------------------------------------------------------------------
   CapsuleTab Component
   
   A capsule-style tab component following the Figma design system.
   Features:
   - Light purple/blue background with border
   - Active tab has white background with primary blue text
   - Inactive tabs have transparent background with muted gray text
   - Rounded corners with smooth transitions
---------------------------------------------------------------------------- */
function CapsuleTab<T extends string = string>({
  tabs,
  labels,
  defaultTab,
  className = "",
  tabClassName = "",
  onTabChange,
  children,
}: CapsuleTabProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab || tabs[0]);

  const getLabel = (tab: T): string => {
    return labels?.[tab] || tab.toString();
  };

  return (
    <div className={className}>
      {/* Capsule Tab Switch */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div
          className={cn(
            "flex w-full md:justify-between items-center p-1 rounded-lg min-w-max md:min-w-0",
            "bg-mo-capsule-tab-bg border border-mo-capsule-tab-border",
            tabClassName
          )}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                onTabChange?.(tab);
              }}
              className={cn(
                "flex-1 flex items-center justify-center whitespace-nowrap", // equal-width tabs, text on one line
                "px-3 md:px-2 py-2 rounded transition-all duration-200 shrink-0",
                "text-xs font-normal leading-[18px] tracking-[-0.16px]",
                "hover:bg-white/50",
                activeTab === tab
                  ? "bg-white text-mo-blue-secondary font-semibold shadow-sm"
                  : "bg-transparent text-mo-capsule-tab-text-inactive"
              )}
              aria-pressed={activeTab === tab}
              aria-label={`Switch to ${getLabel(tab)} tab`}
            >
              {getLabel(tab)}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div>{children(activeTab)}</div>
    </div>
  );
}

export default CapsuleTab;
