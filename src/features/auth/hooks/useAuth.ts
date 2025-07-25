import { authService } from '@/services'
import type {
  LoginForm,
  RegisterApiRequest,
  RegisterFormData,
  User,
} from '@/types'
import { useState } from 'react'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginForm) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authService.login(credentials)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // ...existing code...
  const register = async (formData: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Transform form data to API format
      const apiData: RegisterApiRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      }

      const result = await authService.register(apiData)
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }
  // ...existing code...

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const isAuthenticated = (): boolean => {
    return authService.isAuthenticated()
  }

  const getCurrentUser = (): User | null => {
    return authService.getCurrentUser()
  }

  return {
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser,
    isLoading,
    error,
    setError,
  }
}
