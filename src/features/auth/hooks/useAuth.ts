import { useAuthContext } from '@/hooks/useAuthContext'
import { authService } from '@/services'
import type {
  FirebaseUserLite,
  LoginForm,
  RegisterApiRequest,
  RegisterFormData,
  User,
} from '@/types'
import { getErrorMessage } from '@/utils/errorHandler'
import { useState } from 'react'
import { toast } from 'sonner'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const authContext = useAuthContext()

  const login = async (credentials: LoginForm) => {
    setIsLoading(true)

    try {
      const result = await authService.login(credentials)

      // Update global auth context
      authContext.login(result.user)

      toast.success('Login successful!', {
        description: 'Welcome back to BeeLuxe!',
      })
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)

      // Check if error is due to unverified email
      if (err instanceof Error && err.message.includes('xác thực email')) {
        toast.error('Email chưa xác thực', {
          description: 'Vui lòng kiểm tra email và xác thực tài khoản của bạn.',
          action: {
            label: 'Gửi lại email',
            onClick: () => {
              // Navigate to resend verification page
              window.location.href = '/auth/resend-verification'
            },
          },
          duration: 10000, // Show longer for important message
        })
      } else {
        toast.error('Login Failed', {
          description: errorMessage,
        })
      }
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
        description:
          'Please check your email to verify your account before signing in.',
        duration: 6000, // Show longer for important message
      })
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)
      toast.error('Registration Failed', {
        description: errorMessage,
      })
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async (
    idToken: string,
    firebaseUser: FirebaseUserLite
  ) => {
    setIsLoading(true)
    try {
      const result = await authService.googleAuth(idToken, firebaseUser)

      // Update global auth context
      authContext.login(result.user)

      toast.success('Google Login Successful!', {
        description: `Welcome back ${firebaseUser.displayName || firebaseUser.email}!`,
      })
      return result
    } catch (err) {
      const errorMessage = getErrorMessage(err)
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
      await authContext.logout()
      toast.success('Logged out successfully', {
        description: 'See you again!',
      })
    } catch (err) {
      console.error('Logout error:', err)
      const errorMessage = getErrorMessage(err)
      toast.error('Logout failed', {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isAuthenticated = (): boolean => {
    return authContext.isAuthenticated
  }

  const getCurrentUser = (): User | null => {
    return authContext.user
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
