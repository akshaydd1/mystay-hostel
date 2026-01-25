"use client";
import React from 'react';
import FloatingLayer, { FloatingLayerProps } from '../FloatingLayer';
import FloatingPanelFrame from '../FloatingPanelFrame';
import FilterPanel from '@/shared/components/elements/FilterPanel/FilterPanel';

export interface FilterFloatingPanelProps extends Omit<FloatingLayerProps,'children'|'role'> {
  filterProps?: React.ComponentProps<typeof FilterPanel>;
}

export default function FilterFloatingPanel({
  open,
  onClose,
  filterProps,
  positionClassName,
  overlay,
  overlayClassName,
  closeOnBackdropClick,
  escToClose,
  trapFocus,
  containerClassName,
  ariaLabel = 'Filter Panel',
  ...rest
}: FilterFloatingPanelProps) {
  return (
    <FloatingLayer
      open={open}
      onClose={onClose}
      overlay={overlay}
      overlayClassName={overlayClassName}
      closeOnBackdropClick={closeOnBackdropClick}
      escToClose={escToClose}
      trapFocus={trapFocus}
      positionClassName={positionClassName}
      containerClassName={containerClassName}
      ariaLabel={ariaLabel}
      role="dialog"
      {...rest}
    >
      <FloatingPanelFrame>
        <FilterPanel 
          key={open ? 'open' : 'closed'} 
          isOpen 
          {...filterProps} 
          onClose={filterProps?.onClose || onClose} 
        />
      </FloatingPanelFrame>
    </FloatingLayer>
  );
}
