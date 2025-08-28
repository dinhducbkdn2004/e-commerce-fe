import Breadcrumb from '@/components/Breadcrumb'
import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import ProductSkeleton from '@/components/ProductSkeleton'
import SearchInput from '@/components/SearchInput'
import SortSelect from '@/components/SortSelect'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/useDebounce'
import {
  productService,
  type GetProductsParams,
} from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import { AlertCircle, Grid, List } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // URL params
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const rating = searchParams.get('rating') || ''
  const sortBy = searchParams.get('sortBy') || 'createdAt'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  // Debounce search to reduce API calls
  const debouncedSearch = useDebounce(search, 300)

  // Filter functions
  const updateURLParams = (
    updates: Record<string, string | number | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    params.set('page', '1')
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  const handleFilterChange = (filters: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    sortBy?: string
    sortOrder?: string
  }) => {
    updateURLParams(filters)
  }

  const handleRetry = () => {
    setError(null)
    setLoading(true)
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    const params: GetProductsParams = {
      page,
      limit: 12,
      sortBy: sortBy as GetProductsParams['sortBy'],
      sortOrder: sortOrder as GetProductsParams['sortOrder'],
    }

    if (debouncedSearch) params.search = debouncedSearch
    if (category) params.category = category
    if (rating) params.rating = parseInt(rating)
    if (minPrice) params.minPrice = parseInt(minPrice)
    if (maxPrice) params.maxPrice = parseInt(maxPrice)

    productService
      .getProducts(params)
      .then(res => {
        if (!active) return
        setProducts(res.products)
        setTotal(res.total)
      })
      .catch(error => {
        console.error('Error loading products:', error)
        if (active) {
          let errorMessage =
            'Không thể tải danh sách sản phẩm. Vui lòng thử lại.'

          // Check for specific error types
          if (error.status === 429) {
            errorMessage =
              'Quá nhiều yêu cầu. Vui lòng đợi một chút và thử lại.'
          } else if (error.status >= 500) {
            errorMessage = 'Lỗi server. Vui lòng thử lại sau.'
          } else if (error.status === 404) {
            errorMessage = 'Không tìm thấy dữ liệu sản phẩm.'
          }

          setError(errorMessage)
          setProducts([])
          setTotal(0)
          toast.error(errorMessage)
        }
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [
    page,
    debouncedSearch,
    category,
    rating,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  ])

  const pages = Math.ceil(total / 12)

  return (
    <div className='min-h-screen bg-beeluxe-page'>
      <div className='container mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Sản phẩm' }]} />

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Desktop Sidebar */}
          <div className='lg:w-80 flex-shrink-0'>
            <ProductFilters
              currentFilters={{
                search,
                category,
                rating,
                minPrice,
                maxPrice,
                sortBy,
                sortOrder,
              }}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              totalProducts={total}
            />
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Header */}
            <div className='mb-6'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4'>
                <div>
                  <h1 className='text-3xl font-bold text-foreground'>
                    Sản phẩm
                  </h1>
                  {!loading && !error && (
                    <div className='text-sm text-muted-foreground mt-1'>
                      {total > 0 ? (
                        <>
                          Hiển thị {(page - 1) * 12 + 1}-
                          {Math.min(page * 12, total)} trong tổng số {total} sản
                          phẩm
                        </>
                      ) : (
                        'Không tìm thấy sản phẩm nào'
                      )}
                    </div>
                  )}
                </div>

                {/* Top Controls */}
                <div className='flex items-center gap-4'>
                  {/* Mobile Search */}
                  <div className='lg:hidden flex-1 max-w-md'>
                    <SearchInput
                      value={search}
                      onChange={value => handleFilterChange({ search: value })}
                      placeholder='Tìm kiếm sản phẩm...'
                    />
                  </div>

                  {/* Sort Select */}
                  <div className='min-w-[180px]'>
                    <SortSelect
                      value={`${sortBy}-${sortOrder}`}
                      onChange={value => {
                        const [newSortBy, newSortOrder] = value.split('-')
                        handleFilterChange({
                          sortBy: newSortBy,
                          sortOrder: newSortOrder,
                        })
                      }}
                    />
                  </div>

                  {/* View Toggle */}
                  <div className='hidden sm:flex items-center gap-1 bg-purple-100 dark:bg-purple-900/20 rounded-lg p-1 border border-purple-200 dark:border-purple-800'>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30'
                      }`}
                      title='Lưới'
                    >
                      <Grid className='h-4 w-4' />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/30'
                      }`}
                      title='Danh sách'
                    >
                      <List className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className='space-y-6'>
              {/* Loading State */}
              {loading && <ProductSkeleton viewMode={viewMode} count={12} />}

              {/* Error State */}
              {error && (
                <div className='flex flex-col items-center justify-center py-12'>
                  <AlertCircle className='h-12 w-12 text-destructive mb-4' />
                  <h3 className='text-lg font-semibold mb-2'>Có lỗi xảy ra</h3>
                  <p className='text-muted-foreground mb-4 text-center'>
                    {error}
                  </p>
                  <Button
                    onClick={handleRetry}
                    variant='outline'
                    className='border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                  >
                    Thử lại
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && products.length === 0 && (
                <div className='flex flex-col items-center justify-center py-12'>
                  <div className='text-6xl mb-4'>🔍</div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className='text-muted-foreground mb-4 text-center max-w-md'>
                    Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
                    Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
                  </p>
                  <Button
                    variant='outline'
                    onClick={clearFilters}
                    className='border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && products.length > 0 && (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                        : 'grid-cols-1'
                    }`}
                  >
                    {products.map(product => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pages > 1 && (
                    <div className='flex justify-center mt-12'>
                      <PaginationBar
                        currentPage={page}
                        totalPages={pages}
                        onPageChange={newPage =>
                          updateURLParams({ page: newPage })
                        }
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
