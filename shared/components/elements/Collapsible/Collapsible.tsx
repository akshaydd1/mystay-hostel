"use client";

import React, { useState } from "react";
import { LuChevronDown, LuPlus, LuMinus } from "react-icons/lu";
import { IoMdTrendingUp } from "react-icons/io";
import { GrAdd } from "react-icons/gr";

import { cn } from "@/shared/utils/cn";

export interface CollapsibleProps {
  /** Title of the scorecard */
  title?: string;
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Whether the component can be collapsed/expanded */
  collapsible?: boolean;
  /** Callback when collapse state changes */
  onToggleCollapse?: (collapsed: boolean) => void;
  /** Content to be displayed when expanded */
  children?: React.ReactNode;
  /** Component to be rendered when expanded */
  component?: React.ReactElement<any>;
  /** Props to pass to the component */
  /** Icon component to display next to title */
  icon?: React.ReactElement;
  /** Icon size */
  iconSize?: number;
  /** Icon color - Tailwind color class */
  iconColor?: string;
  /** Background color class */
  backgroundColor?: string;
  /** Title color class */
  titleColor?: string;
  /** Chevron color - Tailwind color class */
  chevronColor?: string;
  /** Border radius class */
  borderRadius?: string;
  /** Additional class name for the container */
  className?: string;
  /** Additional class name for the content container */
  contentClassName?: string;
  isDarkMode?: boolean;
}

export function Collapsible({
  title = "Card Title",
  defaultCollapsed = false,
  collapsible = true,
  onToggleCollapse,
  children,
  component: Component,
  icon: Icon = <IoMdTrendingUp />,
  iconSize = 20,
  iconColor = "text-mo-copyright",
  backgroundColor = "bg-blue-100",
  titleColor = "text-mo-copyright",
  chevronColor = "text-mo-blue-secondary",
  borderRadius = "rounded-2xl",
  className,
  contentClassName,
  isDarkMode = false,
}: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(
    collapsible ? defaultCollapsed : false
  );

  const handleToggle = () => {
    if (!collapsible) return;

    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggleCollapse?.(newState);
  };

  const showContent = !isCollapsed || !collapsible;

  return (
    <div
      className={cn(
        backgroundColor,
        borderRadius,
        "relative shrink-0 w-full",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center size-full p-0.5">
        <div
          className={`content-stretch flex flex-col gap-3 items-center justify-center pt-3 ${
            showContent ? "pb-0" : "pb-3"
          } relative w-full`}
        >
          {/* Header */}
          <div
            className={cn(
              "content-stretch flex items-center justify-between relative shrink-0 w-full px-4",
              collapsible && "cursor-pointer"
            )}
            onClick={handleToggle}
          >
            {/* Title with icon */}
            <div className="content-stretch flex gap-3 items-center relative shrink-0">
              {/* Icon */}
              {Icon && (
                <div
                  className={cn("relative shrink-0", iconColor)}
                  style={{ width: iconSize, height: iconSize }}
                >
                  {Icon}
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col font-[600] font-['Inter:semi_bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-nowrap tracking-[-0.16px]",
                  titleColor
                )}
              >
                <p className="leading-[22px]">{title}</p>
              </div>
            </div>

            {/* Toggle button - only show if collapsible */}
            {collapsible && (
              <button
                className={cn(
                  "relative shrink-0 size-5 md:size-6 cursor-pointer transition-all duration-300 rounded-full border-2",
                  chevronColor
                )}
                aria-label={
                  isCollapsed ? "Expand scorecard" : "Collapse scorecard"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
              >
                {isCollapsed ? (
                  <LuPlus className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <LuMinus className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </button>
            )}
          </div>

          {/* Content */}
          {showContent && (
            <div
              id="collapsible-content"
              className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                isDarkMode
                  ? "bg-linear-to-t from-[#2b2e8b] to-[#17105d]"
                  : "bg-mo-white"
              } rounded-2xl`}
              aria-hidden={isCollapsed && collapsible}
            >
              <div className={cn("md:px-6 md:py-6", contentClassName)}>
                {Component ? Component : children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
