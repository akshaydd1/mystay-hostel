import React from "react";
import { cn } from "@/shared/utils/cn";

/**
 * Divider
 *
 * A visual element used to separate or divide content within a layout.
 * Renders as a horizontal rule (`<hr>`) with consistent styling.
 */

export interface DividerProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
  /** Custom spacing (margin) around the divider */
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingStyles = {
  none: "",
  sm: "my-2",
  md: "my-4",
  lg: "my-6",
};

const verticalSpacingStyles = {
  none: "",
  sm: "mx-2",
  md: "mx-4",
  lg: "mx-6",
};

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = "horizontal",
  spacing = "md",
}) => {
  const isVertical = orientation === "vertical";

  return (
    <hr
      className={cn(
        "border-0 flex-none",
        isVertical
          ? [
              "w-px h-auto self-stretch border-l border-mo-divider",
              verticalSpacingStyles[spacing],
            ]
          : [
              "w-full h-0 self-stretch border-t border-mo-divider",
              spacingStyles[spacing],
            ],
        className
      )}
      aria-orientation={orientation}
    />
  );
};

export default Divider;
