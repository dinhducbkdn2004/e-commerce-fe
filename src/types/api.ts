// Common API response types
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message: string
  data?: T
}

// User related types
export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  isEmailVerified: boolean
  phoneNumber?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

// Product related types (for future use)
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  stock: number
  rating: number
  reviews: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  itemCount: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

// Form types (cho UI)
export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
}

// API types (cho API calls)
export interface RegisterApiRequest {
  email: string
  password: string
  name: string
  phoneNumber: string
}

export interface ForgotPasswordForm {
  email: string
}

export interface ResetPasswordForm {
  token: string
  password: string
  confirmPassword: string
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
