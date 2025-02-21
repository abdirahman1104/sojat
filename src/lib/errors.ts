import { ApiError } from '@/types'

export function handleError(error: unknown): ApiError {
  if (error instanceof Error) {
    return error as ApiError
  }
  return new Error('An unexpected error occurred') as ApiError
}

export function getUserFriendlyError(error: ApiError): string {
  // Add specific error handling logic here
  return error.message || 'An unexpected error occurred'
}
