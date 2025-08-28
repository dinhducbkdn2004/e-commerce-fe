import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useWishlist(productId?: string) {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', [])

  // If productId is provided, return focused utilities for that product
  const isWishlisted = productId ? wishlist.includes(productId) : false

  const addToWishlist = useCallback(
    (productId: string) => {
      setWishlist(prev => {
        if (prev.includes(productId)) return prev
        return [...prev, productId]
      })
    },
    [setWishlist]
  )

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlist(prev => prev.filter(id => id !== productId))
    },
    [setWishlist]
  )

  const toggleWishlistItem = useCallback(
    (productId: string) => {
      setWishlist(prev => {
        if (prev.includes(productId)) {
          return prev.filter(id => id !== productId)
        } else {
          return [...prev, productId]
        }
      })
    },
    [setWishlist]
  )

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.includes(productId)
    },
    [wishlist]
  )

  const clearWishlist = useCallback(() => {
    setWishlist([])
  }, [setWishlist])

  // Focused toggle for specific product
  const toggleWishlist = useCallback(
    (id?: string) => {
      const targetId = id || productId
      if (!targetId) return

      setWishlist(prev => {
        if (prev.includes(targetId)) {
          return prev.filter(item => item !== targetId)
        } else {
          return [...prev, targetId]
        }
      })
    },
    [setWishlist, productId]
  )

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist: toggleWishlistItem, // General toggle function
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
    // Focused properties for specific product
    isWishlisted,
    toggleWishlistFocused: toggleWishlist, // Focused toggle for specific product
  }
}
