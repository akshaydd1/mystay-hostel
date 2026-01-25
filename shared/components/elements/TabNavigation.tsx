"use client";
import { useState, useRef, useEffect } from "react";

export interface Tab<T extends string = string> {
  key: T;
  label: string;
}

interface TabNavigationProps<T extends string = string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (key: T) => void;
  className?: string;
  ariaLabel?: string;
  visibleTabsCount?: number; // Number of tabs to show before "More" dropdown
}

// Utility combines classes
function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function TabNavigation<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className,
  ariaLabel = "Tab navigation",
  visibleTabsCount = 15, // Default: show 15 tabs, rest in dropdown
}: TabNavigationProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const visibleTabs = tabs.slice(0, visibleTabsCount);
  const dropdownTabs = tabs.slice(visibleTabsCount);
  const hasDropdown = dropdownTabs.length > 0;

  return (
    <div
      className={cx(
        "flex w-full flex-row space-x-3 md:space-x-5 border-b border-mo-gray-border text-sm font-poppins overflow-x-auto scrollbar-hide relative",
        className
      )}
      aria-label={ariaLabel}
      style={{ overflow: 'visible' }}
    >
      {visibleTabs.map(({ key, label }) => {
        const isActive = key === activeTab;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            className={cx(
              "pb-2 flex items-center text-xs min-w-7 justify-center focus:outline-none relative transition-colors cursor-pointer whitespace-nowrap shrink-0",
              isActive
                ? "font-semibold text-mo-primary border-b-2 border-mo-primary"
                : "font-normal text-mo-gray hover:text-mo-primary hover:underline"
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {label}
          </button>
        );
      })}

      {hasDropdown && (
        <div 
          className="relative pb-2 shrink-0" 
          ref={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cx(
              "flex items-center text-xs min-w-7 justify-center focus:outline-none relative transition-colors cursor-pointer whitespace-nowrap",
              dropdownTabs.some((tab) => tab.key === activeTab)
                ? "font-semibold text-mo-primary border-b-2 border-mo-primary"
                : "font-normal text-mo-gray hover:text-mo-primary"
            )}
          >
            More
            <svg
              className={cx(
                "ml-1 h-4 w-4 transition-transform",
                isDropdownOpen && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={cx(
              "absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-2xl min-w-[220px] py-1 transition-all duration-200",
              isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
            )}
            style={{ zIndex: 9999 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {dropdownTabs.map(({ key, label }) => {
              const isActive = key === activeTab;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onTabChange(key);
                    setIsDropdownOpen(false);
                  }}
                  className={cx(
                    "w-full text-left px-4 py-2.5 text-xs hover:bg-gray-100 transition-colors block",
                    isActive
                      ? "font-semibold text-mo-primary bg-gray-50"
                      : "font-normal text-gray-700 hover:text-mo-primary"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TabNavigation;
