'use client';

import React, { useState } from 'react';

interface TruncatedTextProps {
  text: string;
  /** Maximum characters to show initially */
  initialLength?: number;
  /** Maximum characters to show when expanded */
  expandedLength?: number;
  /** Custom class name for the text container */
  className?: string;
  /** Custom class name for the read more/less button */
  buttonClassName?: string;
}

/**
 * TruncatedText Component
 * 
 * Displays text with a "Read more/Read less" toggle functionality.
 * Shows a limited number of characters initially and expands to show more on click.
 * 
 * @example
 * ```tsx
 * <TruncatedText 
 *   text="Long text content..." 
 *   initialLength={100} 
 *   expandedLength={250}
 * />
 * ```
 */
export const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  initialLength = 100,
  expandedLength = 250,
  className = 'text-mo-text-dark text-sm leading-relaxed p-2 md:p-0',
  buttonClassName = 'ml-1 text-mo-blue-primary hover:underline font-medium',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return null;
  }

  const truncateText = (content: string, maxLength: number) => {
    return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  };

  const displayText = isExpanded 
    ? truncateText(text, expandedLength) 
    : truncateText(text, initialLength);

  const shouldShowReadMore = text.length > initialLength;
  const shouldShowReadLess = text.length > expandedLength && isExpanded;

  return (
    <div className={className}>
      {displayText}
      {shouldShowReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={buttonClassName}
          type="button"
        >
          {isExpanded && shouldShowReadLess ? 'read less' : isExpanded ? '' : 'read more'}
        </button>
      )}
    </div>
  );
};
