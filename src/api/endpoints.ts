import { apiClient } from './client';

// Auth API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),

  register: (userData: {
    name: string
    email: string
    password: string
    phoneNumber: string
  }) => apiClient.post('/auth/register', userData),

  googleAuth: (data: { idToken: string; user: Record<string, unknown> }) =>
    apiClient.post('/auth/google', data),

  logout: () => apiClient.post('/auth/logout'),

  refreshToken: () => apiClient.post('/auth/refresh-token'), // Không gửi refresh token trong body

  verifyEmail: (token: string) =>
    apiClient.post('/auth/verify-email', { token }),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (data: { token: string; newPassword: string }) =>
    apiClient.post('/auth/reset-password', data),

  resendVerificationEmail: (email: string) =>
    apiClient.post('/auth/resend-verification-email', { email }),
}

// Users API endpoints
export const usersApi = {
  getProfile: () => apiClient.get('/users/profile'),

  updateProfile: (data: unknown) => apiClient.put('/users/profile', data),

  getUsers: () => apiClient.get('/users'),

  getUserById: (id: string) => apiClient.get(`/users/${id}`),
}

// Products API endpoints
export const productsApi = {
  getProducts: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/products${queryString ? '?' + queryString : ''}`)
  },

  getProductById: (id: string) => apiClient.get(`/products/${id}`),

  getFeaturedProducts: () => apiClient.get('/products/featured'),

  searchProducts: (query: string, params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams({ q: query })
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    return apiClient.get(`/products/search?${searchParams.toString()}`)
  },

  getProductsByCategory: (
    categoryId: string,
    params?: Record<string, unknown>
  ) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(
      `/products/category/${categoryId}${queryString ? '?' + queryString : ''}`
    )
  },

  // for future admin use
  createProduct: (data: unknown) => apiClient.post('/products', data),
  updateProduct: (id: string, data: unknown) =>
    apiClient.put(`/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/products/${id}`),
}

// Categories API endpoints
export const categoriesApi = {
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id: string) => apiClient.get(`/categories/${id}`),
}

// Cart API endpoints
export const cartApi = {
  getCart: () => apiClient.get('/cart'),

  getCartCount: () => apiClient.get('/cart/count'),

  addToCart: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) =>
    apiClient.post('/cart', { productId, quantity, selectedSize, selectedColor }),

  updateCartItem: (itemId: string, quantity: number, selectedSize?: string, selectedColor?: string) =>
    apiClient.put(`/cart/${itemId}`, { quantity, selectedSize, selectedColor }),

  removeFromCart: (itemId: string) => apiClient.delete(`/cart/${itemId}`),

  clearCart: () => apiClient.delete('/cart'),
}

// Address API endpoints
export const addressApi = {
  getAddresses: () => apiClient.get('/address'),

  getDefaultAddress: () => apiClient.get('/address/default'),

  getAddressById: (addressId: string) => apiClient.get(`/address/${addressId}`),

  addAddress: (addressData: unknown) => apiClient.post('/address', addressData),

  updateAddress: (addressId: string, addressData: unknown) =>
    apiClient.put(`/address/${addressId}`, addressData),

  deleteAddress: (addressId: string) => apiClient.delete(`/address/${addressId}`),

  setDefaultAddress: (addressId: string) =>
    apiClient.put(`/address/${addressId}/default`),
}

// Order API endpoints
export const orderApi = {
  createOrder: (orderData: unknown) => apiClient.post('/orders', orderData),

  createOrderFromCart: (orderData: unknown) =>
    apiClient.post('/orders/from-cart', orderData),

  getUserOrders: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/orders${queryString ? '?' + queryString : ''}`)
  },

  getOrderById: (orderId: string) => apiClient.get(`/orders/${orderId}`),

  getOrderByNumber: (orderNumber: string) =>
    apiClient.get(`/orders/number/${orderNumber}`),

  cancelOrder: (orderId: string, cancelReason?: string) =>
    apiClient.put(`/orders/${orderId}/cancel`, { cancelReason }),

  getOrderStatistics: () => apiClient.get('/orders/statistics'),

  // Admin endpoints
  getAllOrders: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/orders/admin/all${queryString ? '?' + queryString : ''}`)
  },

  updateOrderStatus: (orderId: string, statusData: unknown) =>
    apiClient.put(`/orders/admin/${orderId}/status`, statusData),
}

// Wishlist API endpoints
export const wishlistApi = {
  getWishlist: () => apiClient.get('/wishlist'),

  getWishlistPaginated: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/wishlist/paginated${queryString ? '?' + queryString : ''}`)
  },

  getWishlistCount: () => apiClient.get('/wishlist/count'),

  addToWishlist: (productId: string) =>
    apiClient.post('/wishlist', { productId }),

  removeFromWishlist: (productId: string) =>
    apiClient.delete(`/wishlist/${productId}`),

  clearWishlist: () => apiClient.delete('/wishlist'),

  isInWishlist: (productId: string) =>
    apiClient.get(`/wishlist/check/${productId}`),

  moveToCart: (productId: string, quantity: number = 1, selectedSize?: string, selectedColor?: string) =>
    apiClient.post(`/wishlist/${productId}/move-to-cart`, { quantity, selectedSize, selectedColor }),
}

// Loyalty API endpoints
export const loyaltyApi = {
  getLoyaltyStats: () => apiClient.get('/loyalty/stats'),

  getLoyaltyHistory: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/loyalty/history${queryString ? '?' + queryString : ''}`)
  },

  getExpiringPoints: (days?: number) => {
    const queryString = days ? `?days=${days}` : ''
    return apiClient.get(`/loyalty/expiring${queryString}`)
  },

  getEarningRules: () => apiClient.get('/loyalty/earning-rules'),

  getRedemptionOptions: () => apiClient.get('/loyalty/redemption-options'),

  redeemPoints: (redeemData: unknown) =>
    apiClient.post('/loyalty/redeem', redeemData),

  // Admin endpoints
  awardPoints: (awardData: unknown) =>
    apiClient.post('/loyalty/admin/award', awardData),

  getLoyaltyAnalytics: (params?: Record<string, unknown>) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value))
        }
      })
    }
    const queryString = searchParams.toString()
    return apiClient.get(`/loyalty/admin/analytics${queryString ? '?' + queryString : ''}`)
  },
}
