'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="sv">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-sans">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Ett allvarligt fel har inträffat</h2>
        <p className="text-gray-600 mb-4">Applikationen stötte på ett oväntat fel.</p>
        <button
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
          onClick={() => reset()}
        >
          Försök igen
        </button>
      </body>
    </html>
  );
}
