import { env } from '@/config'
import axios from 'axios'

// Custom error class for API errors
class ApiError extends Error {
  public status?: number
  public originalError: unknown
  public messageVi?: string

  constructor(
    message: string,
    status?: number,
    originalError?: unknown,
    messageVi?: string
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.originalError = originalError
    this.messageVi = messageVi
  }
}

// Base API client configuration
class ApiClient {
  private client: ReturnType<typeof axios.create>

  constructor() {
    this.client = axios.create({
      baseURL: env.BASE_URL_API,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Setup request interceptor to add auth token
    this.client.interceptors.request.use(
      config => {
        const token = this.getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Setup response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Extract meaningful error message from backend response
        const backendError = error.response?.data
        let errorMessage = 'Request failed'
        let errorMessageVi = 'Yêu cầu thất bại'

        if (backendError) {
          // Handle new API response format with bilingual messages
          if (backendError.message) {
            errorMessage = backendError.message // Prioritize English message
            errorMessageVi = backendError.messageVi || backendError.message
          } else if (backendError.messageVi) {
            errorMessage = backendError.messageVi
            errorMessageVi = backendError.messageVi
          } else if (backendError.error) {
            errorMessage = backendError.error
            errorMessageVi = backendError.error
          } else if (typeof backendError === 'string') {
            errorMessage = backendError
            errorMessageVi = backendError
          }
        }

        // Create a new error with the meaningful message
        const meaningfulError = new ApiError(
          errorMessage,
          error.response?.status,
          error,
          errorMessageVi
        )

        console.error('API request failed:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          message: errorMessage,
          data: backendError,
        })

        return Promise.reject(meaningfulError)
      }
    )
  }

  private getToken(): string | null {
    return localStorage.getItem('access_token')
  }

  // HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    const response = await this.client.get(endpoint)
    return response.data as T
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.client.post(endpoint, data)
    return response.data as T
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.client.put(endpoint, data)
    return response.data as T
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.client.delete(endpoint)
    return response.data as T
  }
}

export const apiClient = new ApiClient()
export { ApiError }
