import { STORAGE_KEYS } from '@/constants'

export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error getting from localStorage:', error)
      return null
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Error setting to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },

  // Specific methods for common operations
  getToken: (): string | null => storage.get(STORAGE_KEYS.ACCESS_TOKEN),
  setToken: (token: string): void =>
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token),
  removeToken: (): void => storage.remove(STORAGE_KEYS.ACCESS_TOKEN),

  getUser: (): unknown | null => {
    const user = storage.get(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },
  setUser: (user: unknown): void =>
    storage.set(STORAGE_KEYS.USER, JSON.stringify(user)),
  removeUser: (): void => storage.remove(STORAGE_KEYS.USER),
}
