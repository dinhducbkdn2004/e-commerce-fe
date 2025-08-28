import { env } from '@/config'
import type { ApiResponse, AuthTokens } from '@/types'
import { requestThrottler } from '@/utils'
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
      withCredentials: true, // 🔥 Quan trọng: gửi cookies tự động
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

    // 🔥 Cập nhật response interceptor để handle automatic token refresh
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        // Danh sách endpoints không cần refresh token khi 401
        const authEndpoints = ['/auth/login', '/auth/register', '/auth/google']
        const isAuthEndpoint = authEndpoints.some(endpoint =>
          originalRequest.url?.includes(endpoint)
        )

        // Nếu 401 và chưa retry và KHÔNG phải auth endpoints
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isAuthEndpoint
        ) {
          originalRequest._retry = true

          try {
            // Gọi refresh token (không cần gửi token vì đã có trong cookie)
            const { data: response } = await this.client.post<
              ApiResponse<AuthTokens>
            >('/auth/refresh-token')

            if (response?.data?.accessToken) {
              const newToken = response.data.accessToken

              // Cập nhật token trong localStorage
              localStorage.setItem('access_token', newToken)

              // Retry request gốc với token mới
              originalRequest.headers.Authorization = `Bearer ${newToken}`
              return this.client(originalRequest)
            }
          } catch (refreshError) {
            // Refresh thất bại → redirect đến login
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }

        // Extract meaningful error message từ backend response
        const backendError = error.response?.data
        let errorMessage = 'Request failed'
        let errorMessageVi = 'Yêu cầu thất bại'

        if (backendError) {
          if (backendError.message) {
            errorMessage = backendError.message
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

  // HTTP methods with throttling
  async get<T>(endpoint: string): Promise<T> {
    // Wait for throttling if needed
    await requestThrottler.waitForAvailability(endpoint)

    const response = await this.client.get(endpoint)
    return response.data as T
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    // Wait for throttling if needed
    await requestThrottler.waitForAvailability(endpoint)

    const response = await this.client.post(endpoint, data)
    return response.data as T
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    // Wait for throttling if needed
    await requestThrottler.waitForAvailability(endpoint)

    const response = await this.client.put(endpoint, data)
    return response.data as T
  }

  async delete<T>(endpoint: string): Promise<T> {
    // Wait for throttling if needed
    await requestThrottler.waitForAvailability(endpoint)

    const response = await this.client.delete(endpoint)
    return response.data as T
  }
}

export const apiClient = new ApiClient()
export { ApiError }
