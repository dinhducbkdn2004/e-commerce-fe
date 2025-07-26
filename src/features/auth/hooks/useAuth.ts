import { authService } from '@/services'
import type {
  LoginForm,
  RegisterApiRequest,
  RegisterFormData,
  User,
} from '@/types'
import { useState } from 'react'
import { toast } from 'sonner'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const login = async (credentials: LoginForm) => {
    setIsLoading(true)

    try {
      const result = await authService.login(credentials)
      toast.success('Login successful!', {
        description: 'Welcome back to BeeLuxe!',
      })
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      toast.error('Login Failed', {
        description: errorMessage,
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (formData: RegisterFormData) => {
    setIsLoading(true)

    try {
      // Transform form data to API format
      const apiData: RegisterApiRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      }

      const result = await authService.register(apiData)
      toast.success('Registration Successful!', {
        description: 'Your account has been created. Please login to continue.',
      })
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Registration failed'
      toast.error('Registration Failed', {
        description: errorMessage,
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async (
    idToken: string
    // firebaseUser: FirebaseUserLite
  ) => {
    setIsLoading(true)
    try {
      const result = await authService.googleAuth(idToken)
      toast.success('Google Login Successful!', {
        // description: `Welcome back ${firebaseUser.displayName || firebaseUser.email}!`,
        description: `Welcome back!`,
      })
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Google login failed'
      toast.error('Google Login Failed', {
        description: errorMessage,
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      toast.success('Logged out successfully')
    } catch (err) {
      console.error('Logout error:', err)
      toast.error('Logout failed', {
        description: 'Please try again',
      })
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
    googleLogin,
    logout,
    isAuthenticated,
    getCurrentUser,
    isLoading,
  }
}
