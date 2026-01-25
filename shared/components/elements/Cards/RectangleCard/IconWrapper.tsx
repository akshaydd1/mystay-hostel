import React from 'react';

export interface IconWrapperProps {
  /**
   * Icon content (image URL, img element, or any React element)
   */
  children?: React.ReactNode;
  
  /**
   * Size of the wrapper (defaults to 40px)
   */
  size?: number;
  
  /**
   * Background color for the circle (defaults to white)
   */
  backgroundColor?: string;
  
  /**
   * Border color (defaults to #EDEDEE)
   */
  borderColor?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  size = 40,
  backgroundColor = 'rgba(255, 255, 255, 1)',
  borderColor = 'rgba(237, 237, 238, 1)',
}) => {
  return (
    <div 
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
      // style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative" >
        <div className="absolute inset-0" style={{ '--fill-0': backgroundColor, '--stroke-0': borderColor } as React.CSSProperties}>
          {/* <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <path d={svgPaths.p1a7cad80} fill="var(--fill-0, white)" stroke="var(--stroke-0, #EDEDEE)" />
          </svg> */}
        </div>
      </div>
      
      {/* Icon/Image content */}
      <div 
        className="[grid-area:1_/_1] relative flex items-center justify-center"
        // style={{ 
        //   width: size * 0.55, 
        //   height: size * 0.525,
        //   marginLeft: size * 0.225,
        //   marginTop: size * 0.225
        // }}
      >
        {children}
      </div>
      
      {/* Border circle */}
      <div className="[grid-area:1_/_1] relative" 
      // style={{ width: size - 1, height: size - 1, marginLeft: 0.5, marginTop: 0.5 }}
      >
        <div className="absolute inset-[-1.28%]" style={{ '--stroke-0': borderColor } as React.CSSProperties}>
          {/* <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
            <path d={svgPaths.p30b36e80} stroke="var(--stroke-0, #EDEDEE)" />
          </svg> */}
        </div>
      </div>
    </div>
  );
};
