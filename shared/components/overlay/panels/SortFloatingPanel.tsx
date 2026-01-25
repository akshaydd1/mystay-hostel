"use client";
import React from 'react';
import FloatingLayer, { FloatingLayerProps } from '../FloatingLayer';
import FloatingPanelFrame from '../FloatingPanelFrame';
import SortPanel from '@/shared/components/elements/SortPanel/SortPanel';

export interface SortFloatingPanelProps extends Omit<FloatingLayerProps,'children'|'role'> {
  sortProps?: React.ComponentProps<typeof SortPanel>;
}

export default function SortFloatingPanel({
  open,
  onClose,
  sortProps,
  positionClassName,
  overlay,
  overlayClassName,
  closeOnBackdropClick,
  escToClose,
  trapFocus,
  containerClassName,
  ariaLabel = 'Sort Panel',
  ...rest
}: SortFloatingPanelProps) {
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
        <SortPanel isOpen {...sortProps} onClose={sortProps?.onClose || onClose} />
      </FloatingPanelFrame>
    </FloatingLayer>
  );
}
