import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortalWrapper } from '../utils/PortalDomWrapper';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

export function Portal({ children, wrapperId }: PortalProps) {
  const dynamicallyCreated = useRef(false);

  let portalDomWrapper = document.getElementById(wrapperId);

  if (!portalDomWrapper) {
    portalDomWrapper = createPortalWrapper(wrapperId);
    dynamicallyCreated.current = true;
  }

  const wrapperElement = portalDomWrapper;

  useLayoutEffect(() => {
    return () => {
      if (dynamicallyCreated.current && wrapperElement.parentNode) {
        wrapperElement.parentNode.removeChild(wrapperElement);
      }
    };
  }, [wrapperId, wrapperElement]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
}