import { apiClient } from './client'

// Auth API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),

  register: (userData: { name: string; email: string; password: string; phoneNumber: string }) =>
    apiClient.post('/auth/register', userData),

  logout: () => apiClient.post('/auth/logout'),

  refreshToken: () => apiClient.post('/auth/refresh'),

  verifyEmail: (token: string) =>
    apiClient.post('/auth/verify-email', { token }),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (data: { token: string; password: string }) =>
    apiClient.post('/auth/reset-password', data),
}

// Users API endpoints
export const usersApi = {
  getProfile: () => apiClient.get('/users/profile'),

  updateProfile: (data: unknown) => apiClient.put('/users/profile', data),

  getUsers: () => apiClient.get('/users'),

  getUserById: (id: string) => apiClient.get(`/users/${id}`),
}

// Products API endpoints (for future use)
export const productsApi = {
  getProducts: (params?: Record<string, unknown>) =>
    apiClient.get(
      `/products${params ? '?' + new URLSearchParams(params as Record<string, string>) : ''}`
    ),

  getProductById: (id: string) => apiClient.get(`/products/${id}`),

  createProduct: (data: unknown) => apiClient.post('/products', data),

  updateProduct: (id: string, data: unknown) =>
    apiClient.put(`/products/${id}`, data),

  deleteProduct: (id: string) => apiClient.delete(`/products/${id}`),
}

// Cart API endpoints (for future use)
export const cartApi = {
  getCart: () => apiClient.get('/cart'),

  addToCart: (productId: string, quantity: number) =>
    apiClient.post('/cart', { productId, quantity }),

  updateCartItem: (itemId: string, quantity: number) =>
    apiClient.put(`/cart/${itemId}`, { quantity }),

  removeFromCart: (itemId: string) => apiClient.delete(`/cart/${itemId}`),

  clearCart: () => apiClient.delete('/cart'),
}
