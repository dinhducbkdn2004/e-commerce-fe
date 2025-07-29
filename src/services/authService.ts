import { authApi } from '@/api'
import type {
  ApiResponse,
  FirebaseUserLite,
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
      const { user, accessToken } = response.data // 🔥 Không lấy refreshToken nữa

      // 🔥 Chỉ lưu access token và user data
      storage.setToken(accessToken)
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
    idToken: string,
    firebaseUser: FirebaseUserLite
  ): Promise<LoginResponse> {
    const response = (await authApi.googleAuth({
      idToken,
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
      },
    })) as ApiResponse<LoginResponse>

    if (response.data) {
      const { user, accessToken } = response.data // 🔥 Không lấy refreshToken

      // 🔥 Chỉ lưu access token và user data
      storage.setToken(accessToken)
      storage.setUser(user)

      return response.data
    }

    throw new Error('Google authentication failed')
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout() // 🔥 API call sẽ tự động clear httpOnly cookie
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // 🔥 Chỉ clear access token và user data
      storage.removeToken()
      storage.removeUser()
      // Không cần remove refresh_token nữa vì nó ở cookie
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      // 🔥 Gọi refresh mà không cần gửi token (cookie tự động được gửi)
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

  async resendVerificationEmail(email: string): Promise<void> {
    await authApi.resendVerificationEmail(email)
  }
}

export const authService = new AuthService()
