"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 py-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-center">Algo salió mal!</h2>
        <Button onClick={reset} className="mt-2">
          Reintentar
        </Button>
      </div>
    </main>
  );
}
