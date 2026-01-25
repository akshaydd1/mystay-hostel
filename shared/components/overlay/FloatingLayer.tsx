"use client";
import React, { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import usePortalRoot from './hooks/usePortalRoot';
import useEscapeKey from './hooks/useEscapeKey';
import useFocusTrap from './hooks/useFocusTrap';

export interface FloatingLayerProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  /** Backdrop overlay */
  overlay?: boolean;
  overlayClassName?: string;
  closeOnBackdropClick?: boolean;
  escToClose?: boolean;
  trapFocus?: boolean;
  /** Container positioning utility classes */
  positionClassName?: string;
  /** Additional classes for container frame */
  containerClassName?: string;
  /** Data attribute used for portal root creation */
  portalRootAttr?: string;
  /** ARIA role; default dialog */
  role?: 'dialog' | 'region';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  /** Keep mounted when closed to allow CSS exit animations */
  keepMounted?: boolean;
  /** Initial focus callback */
  initialFocus?: () => HTMLElement | null | undefined;
}

/** Generic floating layer handling portal, overlay, dismissal & a11y */
export default function FloatingLayer({
  open,
  onClose,
  children,
  overlay = true,
  overlayClassName,
  closeOnBackdropClick = true,
  escToClose = true,
  trapFocus = true,
  positionClassName = 'bottom-6 right-6',
  containerClassName = '',
  portalRootAttr = 'data-floating-layer-root',
  role = 'dialog',
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  keepMounted = false,
  initialFocus,
}: FloatingLayerProps) {
  const portalRoot = usePortalRoot(portalRootAttr);
  // Cast to broader HTMLElement to satisfy useFocusTrap generic expectation
  const containerRef = useRef<HTMLElement | null>(null);

  useEscapeKey(open && escToClose, () => onClose?.());
  useFocusTrap(open && trapFocus, containerRef, { initialFocus });

  if (!portalRoot) return null; // SSR or not yet mounted
  if (!open && !keepMounted) return null;

  const layer = (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden={!open} data-floating-layer-wrapper>
      {overlay && (
        <div
          className={`absolute inset-0 pointer-events-auto ${overlayClassName || 'bg-black/30 backdrop-blur-sm'}`}
          onClick={() => {
            if (open && closeOnBackdropClick) onClose?.();
          }}
          aria-label="Floating layer backdrop"
        />
      )}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        role={role}
        aria-modal={overlay ? (role === 'dialog' ? 'true' : undefined) : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={`pointer-events-auto fixed ${positionClassName} ${containerClassName}`}
        data-floating-layer>
        {children}
      </div>
    </div>
  );

  return createPortal(layer, portalRoot);
}
