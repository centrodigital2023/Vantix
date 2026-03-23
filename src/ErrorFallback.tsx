import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  // In development → let the error overlay / debugger catch it
  if (import.meta.env.DEV) {
    throw error;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon className="h-5 w-5" />
          <div>
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              {error.message || "An unexpected error occurred."}
            </AlertDescription>
          </div>
        </Alert>

        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
