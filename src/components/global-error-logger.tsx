'use client';

import { useEffect } from 'react';

/**
 * GlobalErrorLogger ensures that any unhandled errors or unhandled promise
 * rejections across the client application are captured and logged to console.error.
 */
export function GlobalErrorLogger() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled application error:', event.error ?? event.message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
