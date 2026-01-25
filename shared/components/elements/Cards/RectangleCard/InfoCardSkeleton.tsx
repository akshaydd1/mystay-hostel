import React from 'react';
import { Skeleton, SkeletonCircle } from '../../Skeleton';

export interface InfoCardSkeletonProps {
  /**
   * Whether to show the left content skeleton (icon/image area)
   */
  showLeftContent?: boolean;
  
  /**
   * Whether to show the subtitle skeleton
   */
  showSubtitle?: boolean;
  
  /**
   * Whether to show the right content skeleton
   */
  showRightContent?: boolean;
  
  /**
   * Optional className for customization
   */
  className?: string;
  
  /**
   * Background color (defaults to #f7f7f7)
   */
  backgroundColor?: string;
}

export const InfoCardSkeleton: React.FC<InfoCardSkeletonProps> = ({
  showLeftContent = true,
  showSubtitle = true,
  showRightContent = true,
  className = '',
  backgroundColor = '#f7f7f7',
}) => {
  return (
    <div
      className={`content-stretch flex items-center justify-between p-[12px] rounded-[8px] ${className}`}
      style={{ backgroundColor }}
    >
      {/* Left side skeleton */}
      <div className="content-stretch flex gap-[8px] items-center">
        {showLeftContent && (
          <div className="flex items-center justify-center shrink-0">
            <Skeleton variant="rounded" width="w-10" height="h-10" radius="rounded-md" />
          </div>
        )}
        
        <div className="content-stretch flex flex-col gap-[6px] items-start">
          {/* Title skeleton */}
          <Skeleton variant="text" width="w-32" height="h-[18px]" />
          
          {/* Subtitle skeleton */}
          {showSubtitle && (
            <Skeleton variant="text" width="w-24" height="h-[18px]" />
          )}
        </div>
      </div>

      {/* Right side skeleton */}
      {/* {showRightContent && (
        <div className="flex items-center shrink-0">
          <Skeleton variant="text" width="w-16" height="h-[18px]" />
        </div>
      )} */}
    </div>
  );
};
