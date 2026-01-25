import React from 'react';
import { InfoCardSkeleton } from './InfoCardSkeleton';

export interface InfoCardProps {
  /**
   * Content to display on the left side (icon, image, or any React element)
   */
  leftContent?: React.ReactNode;
  
  /**
   * Main title text
   */
  title?: string| React.ReactNode;
  
  /**
   * Subtitle or description text
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Content to display on the right side (text, badge, or any React element)
   */
  rightContent?: React.ReactNode;
  
  /**
   * Image URL for right side. When provided, displays a 64x64px rounded image.
   * Takes precedence over rightContent.
   */
  imageUrl?: string;
  
  /**
   * Alt text for the image (used when imageUrl is provided)
   */
  imageAlt?: string;
  
  /**
   * Optional className for customization
   */
  className?: string;
  
  /**
   * Background color (defaults to #f7f7f7)
   */
  backgroundColor?: string;
}

interface InfoCardComponent extends React.FC<InfoCardProps> {
  Skeleton: typeof InfoCardSkeleton;
}

export const InfoCard: InfoCardComponent = ({
  leftContent,
  title,
  subtitle,
  rightContent,
  imageUrl,
  imageAlt = '',
  className = '',
  backgroundColor = '#f7f7f7',
}) => {
  return (
    <div
      className={`content-stretch flex items-center justify-between p-[12px] rounded-[8px] ${className}`}
      style={{ backgroundColor }}
    >
      {/* Left side with icon/image and text */}
      <div className="content-stretch flex gap-[8px] items-center flex-[1_0_0] min-w-0">
        {leftContent && (
          <div className="flex items-center justify-center shrink-0">
            {leftContent}
          </div>
        )}
        
        {(title || subtitle) && (
          <div className="content-stretch flex flex-col gap-[7px] items-start flex-[1_0_0] min-w-0">
            {title && (
              <div className="font-['Inter:semi_bold',sans-serif] text-[#0F0F10] font-semibold leading-[18px] text-[14px] tracking-[-0.16px] w-full">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="font-['Inter:regular',sans-serif] text-[#727279] leading-[16px] text-[12px] tracking-[-0.16px] w-full">
                {subtitle}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side content */}
      {imageUrl ? (
        <div 
          className="size-[64px] rounded-[4px] shrink-0"
          style={{
            background: `url(${imageUrl}) lightgray 50% / cover no-repeat`
          }}
          role="img"
          aria-label={imageAlt}
        />
      ) : rightContent ? (
        <div className="flex items-center shrink-0">
          {rightContent}
        </div>
      ) : null}
    </div>
  );
};

// Attach Skeleton as a static property for easy access
InfoCard.Skeleton = InfoCardSkeleton as any;
