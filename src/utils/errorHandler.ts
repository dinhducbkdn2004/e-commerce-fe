import { ApiError } from '@/api/client'

/**
 * Extract user-friendly error message from API error
 * Prioritizes Vietnamese message if available
 */
export function getErrorMessage(error: unknown): string {
  // Handle ApiError (from our API client)
  if (error instanceof ApiError) {
    return error.message || error.messageVi || 'An error occurred'
  }

  // Handle regular Error
  if (error instanceof Error) {
    return error.message || 'An error occurred'
  }

  // Handle string error
  if (typeof error === 'string') {
    return error
  }

  // Handle object with message
  if (error && typeof error === 'object' && 'message' in error) {
    return (
      String((error as Record<string, unknown>).message) || 'An error occurred'
    )
  }

  // Fallback
  return 'Unknown error occurred'
}

/**
 * Get success message from API response
 */
export function getSuccessMessage(response: Record<string, unknown>): string {
  if (response?.message && typeof response.message === 'string') {
    return response.message
  }

  if (response?.messageVi && typeof response.messageVi === 'string') {
    return response.messageVi
  }

  return 'Operation successful'
}

/**
 * Check if API response indicates success
 */
export function isApiSuccess(response: Record<string, unknown>): boolean {
  return response?.success === true
}

/**
 * Extract data from API response
 */
export function getApiData<T>(response: Record<string, unknown>): T | null {
  return (response?.data as T) || null
}
