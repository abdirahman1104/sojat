'use client'

interface LoadingSpinnerProps {
  className?: string
}

export function LoadingSpinner({ className = 'h-5 w-5' }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-current border-t-transparent text-blue-600 dark:text-blue-400 ${className}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
