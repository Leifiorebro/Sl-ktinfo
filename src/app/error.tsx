'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-destructive mb-2">Ett fel har inträffat</h2>
      <p className="text-muted-foreground mb-4">
        Ett oväntat fel uppstod i applikationen.
      </p>
      <Button onClick={() => reset()}>Försök igen</Button>
    </div>
  );
}
