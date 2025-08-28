import { categoriesApi, productsApi } from '@/api'
import type {
  ProductDTO,
  ProductDetailResponse,
  ProductListResponse,
} from '@/types/product'

export interface GetProductsParams {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  tags?: string
  rating?: number
  isActive?: 'true' | 'false'
  status?: 'draft' | 'active' | 'inactive' | 'out_of_stock'
  isFeatured?: 'true' | 'false'
  search?: string
  sortBy?:
    | 'name'
    | 'price'
    | 'rating'
    | 'sales'
    | 'createdAt'
    | 'views'
    | 'title'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

class ProductService {
  // Helper method for compatibility (always returns backend)
  getCurrentApiSource(): 'backend' {
    return 'backend'
  }

  async getProducts(params: GetProductsParams = {}): Promise<{
    products: ProductDTO[]
    total: number
    page: number
    pages: number
  }> {
    // Use backend API only
    const backendParams: Record<string, unknown> = {}

    // Map frontend params to backend params
    if (params.search) backendParams.search = params.search
    if (params.category) backendParams.category = params.category
    if (params.brand) backendParams.brand = params.brand
    if (params.minPrice) backendParams.minPrice = params.minPrice
    if (params.maxPrice) backendParams.maxPrice = params.maxPrice
    if (params.rating) backendParams.rating = params.rating
    if (params.tags) backendParams.tags = params.tags
    if (params.sortBy) backendParams.sortBy = params.sortBy
    if (params.sortOrder) backendParams.sortOrder = params.sortOrder
    if (params.page) backendParams.page = params.page
    if (params.limit) backendParams.limit = params.limit

    try {
      const res = (await productsApi.getProducts(
        backendParams
      )) as ProductListResponse

      return {
        products: res.products || [],
        total: res.total || 0,
        page: res.page || 1,
        pages: res.pages || 1,
      }
    } catch (error) {
      console.error('Error fetching products from backend:', error)

      // Return empty state instead of fallback
      return {
        products: [],
        total: 0,
        page: 1,
        pages: 1,
      }
    }
  }

  async getProductById(id: string): Promise<ProductDTO | null> {
    try {
      const res = (await productsApi.getProductById(
        id
      )) as ProductDetailResponse
      return res.data
    } catch (error) {
      console.error('Error fetching product from backend:', error)

      // Return null instead of fallback
      return null
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await categoriesApi.getCategories()
      const categories = (response as { data?: unknown[] })?.data || []
      // Extract category names from category objects
      return categories.map((cat: unknown) => {
        const categoryObj = cat as {
          name?: string
          title?: string
          _id?: string
        }
        return (
          categoryObj.name ||
          categoryObj.title ||
          categoryObj._id ||
          String(cat)
        )
      })
    } catch (error) {
      console.error('Error fetching categories from backend:', error)

      // Return empty array instead of fallback
      return []
    }
  }

  async getProductsByCategory(category: string): Promise<ProductDTO[]> {
    try {
      const response = await productsApi.getProductsByCategory(category)
      const result = response as ProductListResponse
      return result.products || []
    } catch (error) {
      console.error('Error fetching products by category from backend:', error)

      // Return empty array instead of fallback
      return []
    }
  }
}

export const productService = new ProductService()
