import React from 'react';
import { cn } from '@/shared/utils/cn';

export interface SkeletonProps {
  /**
   * Shape variant of the skeleton
   * @default 'rectangle'
   */
  variant?: 'rectangle' | 'circle' | 'rounded' | 'text';
  
  /**
   * Width of the skeleton
   * @example 'w-full', 'w-32', '100px', '50%'
   */
  width?: string | number;
  
  /**
   * Height of the skeleton
   * @example 'h-4', 'h-32', '40px', '100%'
   */
  height?: string | number;
  
  /**
   * Border radius (applies only to 'rectangle' and 'rounded' variants)
   * @example 'rounded', 'rounded-md', 'rounded-lg'
   */
  radius?: string;
  
  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
  
  /**
   * Optional className for additional customization
   */
  className?: string;
  
  /**
   * Background color class
   * @default 'bg-mo-gray-light'
   */
  bgColor?: string;
  
  /**
   * Number of skeleton items to render (useful for lists)
   * @default 1
   */
  count?: number;
  
  /**
   * Gap between skeleton items when count > 1
   * @default 'gap-2'
   */
  gap?: string;
}

/**
 * Skeleton - A flexible, reusable skeleton loader component
 * 
 * @example
 * // Simple text line
 * <Skeleton variant="text" width="w-32" />
 * 
 * @example
 * // Avatar circle
 * <Skeleton variant="circle" width="w-10" height="h-10" />
 * 
 * @example
 * // Card skeleton
 * <Skeleton variant="rounded" width="w-full" height="h-48" />
 * 
 * @example
 * // Multiple lines
 * <Skeleton variant="text" width="w-full" count={3} />
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangle',
  width,
  height,
  radius,
  animation = 'pulse',
  className = '',
  bgColor = 'bg-mo-gray-light',
  count = 1,
  gap = 'gap-2',
}) => {
  // Convert numeric values to pixel strings
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  
  // Determine shape classes
  const getShapeClasses = () => {
    switch (variant) {
      case 'circle':
        return 'rounded-full aspect-square';
      case 'rounded':
        return radius || 'rounded-lg';
      case 'text':
        return 'rounded';
      case 'rectangle':
      default:
        return radius || 'rounded';
    }
  };
  
  // Determine animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'wave':
        return 'animate-shimmer bg-gradient-to-r from-mo-gray-light via-mo-white to-mo-gray-light bg-[length:200%_100%]';
      case 'none':
      default:
        return '';
    }
  };
  
  // Determine width classes
  const getWidthClasses = () => {
    if (widthStyle) {
      // If it's a Tailwind class
      if (typeof width === 'string' && width.startsWith('w-')) {
        return width;
      }
      // If it's a custom value, return empty and use style prop
      return '';
    }
    // Default width for text variant
    if (variant === 'text') {
      return 'w-full';
    }
    return '';
  };
  
  // Determine height classes
  const getHeightClasses = () => {
    if (heightStyle) {
      // If it's a Tailwind class
      if (typeof height === 'string' && height.startsWith('h-')) {
        return height;
      }
      // If it's a custom value, return empty and use style prop
      return '';
    }
    // Default heights based on variant
    switch (variant) {
      case 'text':
        return 'h-4';
      case 'circle':
        return 'h-10 w-10';
      default:
        return 'h-4';
    }
  };
  
  // Build inline styles for custom width/height values
  const inlineStyle: React.CSSProperties = {};
  if (widthStyle && typeof width === 'string' && !width.startsWith('w-')) {
    inlineStyle.width = widthStyle;
  }
  if (heightStyle && typeof height === 'string' && !height.startsWith('h-')) {
    inlineStyle.height = heightStyle;
  }
  
  const skeletonClasses = cn(
    bgColor,
    getShapeClasses(),
    getAnimationClasses(),
    getWidthClasses(),
    getHeightClasses(),
    className
  );
  
  // Render single skeleton
  const renderSkeleton = (index?: number) => (
    <div
      key={index}
      className={skeletonClasses}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      aria-hidden="true"
    />
  );
  
  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className={cn('flex flex-col', gap)}>
        {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
      </div>
    );
  }
  
  return renderSkeleton();
};

// Pre-configured skeleton components for common use cases
export const SkeletonText: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="text" {...props} />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="circle" {...props} />
);

export const SkeletonCard: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="rounded" {...props} />
);

export const SkeletonAvatar: React.FC<Omit<SkeletonProps, 'variant' | 'width' | 'height'>> = (props) => (
  <Skeleton variant="circle" width="w-10" height="h-10" {...props} />
);
