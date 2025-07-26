import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup, type User } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

export interface GoogleAuthResult {
  user: User
  accessToken: string | null
}

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const signInWithGoogle = async (): Promise<GoogleAuthResult | null> => {
    setIsLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const accessToken = await user.getIdToken()

      toast.success('Google Sign-in Successful!', {
        description: `Welcome ${user.displayName || user.email}!`,
      })

      return {
        user,
        accessToken,
      }
    } catch (error: unknown) {
      console.error('Google sign-in error:', error)

      let errorMessage = 'Google sign-in failed'
      // Type guard for FirebaseError
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const code = (error as { code: string }).code
        if (code === 'auth/popup-closed-by-user') {
          errorMessage = 'Sign-in was cancelled'
        } else if (code === 'auth/popup-blocked') {
          errorMessage = 'Popup was blocked by browser'
        } else if (code === 'auth/network-request-failed') {
          errorMessage = 'Network error. Please check your connection'
        }
      }

      toast.error('Google Sign-in Failed', {
        description: errorMessage,
      })

      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signInWithGoogle,
    isLoading,
  }
}
