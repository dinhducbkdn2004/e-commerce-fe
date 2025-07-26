import { authApi } from '@/api'
import type {
  ApiResponse,
  LoginForm,
  LoginResponse,
  RegisterApiRequest,
  User,
} from '@/types'
import { storage } from '@/utils'

class AuthService {
  async login(credentials: LoginForm): Promise<LoginResponse> {
    const response = (await authApi.login(
      credentials
    )) as ApiResponse<LoginResponse>

    if (response.data) {
      const { user, accessToken, refreshToken } = response.data

      // Store tokens and user data
      storage.setToken(accessToken)
      storage.set('refresh_token', refreshToken)
      storage.setUser(user)

      return response.data
    }

    throw new Error('Login failed')
  }

  async register(userData: RegisterApiRequest): Promise<User> {
    const response = (await authApi.register(userData)) as ApiResponse<{
      user: User
    }>
    if (!response.data) throw new Error('Registration failed')
    return response.data.user
  }

  async googleAuth(
    idToken: string
    // firebaseUser: FirebaseUserLite
  ): Promise<LoginResponse> {
    const response = (await authApi.googleAuth({
      idToken,
      // user: {
      //   uid: firebaseUser.uid,
      //   email: firebaseUser.email,
      //   displayName: firebaseUser.displayName,
      //   photoURL: firebaseUser.photoURL,
      //   emailVerified: firebaseUser.emailVerified,
      // },
    })) as ApiResponse<LoginResponse>

    if (response.data) {
      const { user, accessToken, refreshToken } = response.data

      // Store tokens and user data
      storage.setToken(accessToken)
      storage.set('refresh_token', refreshToken)
      storage.setUser(user)

      return response.data
    }

    throw new Error('Google authentication failed')
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Always clear local storage
      storage.removeToken()
      storage.remove('refresh_token')
      storage.removeUser()
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const response = (await authApi.refreshToken()) as ApiResponse<{
        accessToken: string
      }>
      if (response.data?.accessToken) {
        storage.setToken(response.data.accessToken)
        return response.data.accessToken
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.logout() // Clear invalid tokens
    }
    return null
  }

  isAuthenticated(): boolean {
    return !!storage.getToken()
  }

  getCurrentUser(): User | null {
    return storage.getUser() as User | null
  }

  async verifyEmail(token: string): Promise<void> {
    await authApi.verifyEmail(token)
  }

  async forgotPassword(email: string): Promise<void> {
    await authApi.forgotPassword(email)
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await authApi.resetPassword({ token, password })
  }
}

export const authService = new AuthService()
