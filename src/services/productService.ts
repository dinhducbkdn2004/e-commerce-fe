import { productsApi } from '@/api'
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
  sortBy?: 'name' | 'price' | 'rating' | 'sales' | 'createdAt' | 'views'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

class ProductService {
  async getProducts(params: GetProductsParams = {}): Promise<{
    products: ProductDTO[]
    total: number
    page: number
    pages: number
  }> {
    const res = (await productsApi.getProducts(
      params as unknown as Record<string, unknown>
    )) as ProductListResponse

    return {
      products: res.products,
      total: res.total,
      page: res.page,
      pages: res.pages,
    }
  }

  async getProductById(id: string): Promise<ProductDTO> {
    const res = (await productsApi.getProductById(id)) as ProductDetailResponse
    return res.data
  }
}

export const productService = new ProductService()
