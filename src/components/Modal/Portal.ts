import { useLayoutEffect, type ReactNode } from 'react';
import { createPortalWrapper } from '../../utils/portalDomWrapper';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

export function Portal({ children, wrapperId }: PortalProps) {
  let dynamicallyCreated = false
  let portalDomWrapper = document.getElementById(wrapperId);

  const wrapperElement = portalDomWrapper ?? (() => {
    portalDomWrapper = createPortalWrapper(wrapperId);
    dynamicallyCreated = true;
    return portalDomWrapper
  })()
  
  useLayoutEffect(() => {
    return () => {
      const parentElement = wrapperElement.parentNode;

      if (dynamicallyCreated && parentElement) {
        parentElement.removeChild(wrapperElement);
      }
    };
  }, [wrapperId, wrapperElement]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
