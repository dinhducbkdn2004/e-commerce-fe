export interface ProductRatings {
  average: number
  count: number
}

export interface ProductVariant {
  size?: string
  color?: string
  stock: number
  price?: number
  sku?: string
  images?: string[]
}

export interface ProductDTO {
  _id: string
  name: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  brand?: string
  sku: string
  images: string[]
  thumbnail: string
  variants: ProductVariant[]
  tags: string[]
  specifications?: Record<string, string>
  stock: number
  minStock: number
  isActive: boolean
  isFeatured: boolean
  isDigital: boolean
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ratings: ProductRatings
  sales: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface ProductListResponse {
  success: boolean
  message: string
  messageVi: string
  products: ProductDTO[]
  total: number
  page: number
  pages: number
  timestamp: string
}

export interface ProductDetailResponse {
  success: boolean
  message: string
  messageVi: string
  data: ProductDTO
  timestamp: string
}
