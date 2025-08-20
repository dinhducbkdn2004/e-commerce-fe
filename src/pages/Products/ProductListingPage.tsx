import Breadcrumb from '@/components/Breadcrumb'
import MobileSidebar from '@/components/MobileSidebar'
import ProductCard from '@/components/ProductCard'
import ProductSidebar from '@/components/ProductSidebar'
import { Button } from '@/components/ui/button'
import {
  productService,
  type GetProductsParams,
} from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import { ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // URL params
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sortBy = searchParams.get('sortBy') || 'createdAt'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

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
    sortBy?: string
    sortOrder?: string
  }) => {
    updateURLParams(filters)
  }

  useEffect(() => {
    let active = true
    setLoading(true)

    const params: GetProductsParams = {
      page,
      limit: 12,
      sortBy: sortBy as GetProductsParams['sortBy'],
      sortOrder: sortOrder as GetProductsParams['sortOrder'],
    }

    if (search) params.search = search
    if (category) params.category = category
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
          setProducts([])
          setTotal(0)
        }
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [page, search, category, sortBy, sortOrder, minPrice, maxPrice])

  const pages = Math.ceil(total / 12)

  return (
    <div className='min-h-screen'>
      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        currentFilters={{
          search,
          category,
          minPrice,
          maxPrice,
          sortBy,
          sortOrder,
        }}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        totalProducts={total}
      />

      <div className='container mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Sản phẩm' }]} />

        <div className='flex gap-6'>
          {/* Desktop Sidebar */}
          <div className='hidden lg:block flex-shrink-0'>
            <ProductSidebar
              currentFilters={{
                search,
                category,
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
              <div className='flex items-center justify-between mb-4'>
                <h1 className='text-3xl font-bold text-foreground'>Sản phẩm</h1>

                {/* View Toggle */}
                <div className='hidden sm:flex items-center gap-2 bg-muted rounded-lg p-1'>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? ' text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Grid className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <List className='h-4 w-4' />
                  </button>
                </div>
              </div>

              {/* Results Summary */}
              {!loading && (
                <div className='text-sm text-muted-foreground'>
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

            {/* Mobile Filters Button */}
            <div className='lg:hidden mb-6'>
              <Button
                variant='outline'
                className='w-full flex items-center justify-center gap-2'
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className='h-4 w-4' />
                Bộ lọc và sắp xếp
              </Button>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xl bg-muted animate-pulse ${
                      viewMode === 'grid' ? 'h-64' : 'h-32'
                    }`}
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className='text-center py-12'>
                <div className='text-muted-foreground text-lg'>
                  Không tìm thấy sản phẩm nào
                </div>
                <Button
                  variant='outline'
                  onClick={clearFilters}
                  className='mt-4'
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className='flex items-center justify-center gap-4 mt-12'>
                <Button
                  variant='outline'
                  disabled={page <= 1}
                  onClick={() =>
                    updateURLParams({ page: Math.max(1, page - 1) })
                  }
                  className='flex items-center gap-2'
                >
                  <ChevronLeft className='h-4 w-4' />
                  Trước
                </Button>

                <div className='flex items-center gap-2'>
                  {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                    const pageNum = i + 1
                    if (pages > 5) {
                      // Show smart pagination for many pages
                      if (page <= 3) {
                        // Show 1,2,3,4,5 ... last
                        if (i < 5) {
                          return (
                            <Button
                              key={pageNum}
                              variant={page === pageNum ? 'default' : 'outline'}
                              size='sm'
                              onClick={() => updateURLParams({ page: pageNum })}
                              className='w-10 h-10'
                            >
                              {pageNum}
                            </Button>
                          )
                        }
                      } else if (page >= pages - 2) {
                        // Show first ... last-4,last-3,last-2,last-1,last
                        const showPageNum = pages - 4 + i
                        return (
                          <Button
                            key={showPageNum}
                            variant={
                              page === showPageNum ? 'default' : 'outline'
                            }
                            size='sm'
                            onClick={() =>
                              updateURLParams({ page: showPageNum })
                            }
                            className='w-10 h-10'
                          >
                            {showPageNum}
                          </Button>
                        )
                      } else {
                        // Show first ... page-1,page,page+1 ... last
                        const showPageNum = page - 2 + i
                        return (
                          <Button
                            key={showPageNum}
                            variant={
                              page === showPageNum ? 'default' : 'outline'
                            }
                            size='sm'
                            onClick={() =>
                              updateURLParams({ page: showPageNum })
                            }
                            className='w-10 h-10'
                          >
                            {showPageNum}
                          </Button>
                        )
                      }
                    } else {
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          size='sm'
                          onClick={() => updateURLParams({ page: pageNum })}
                          className='w-10 h-10'
                        >
                          {pageNum}
                        </Button>
                      )
                    }
                  })}

                  {pages > 5 && page < pages - 2 && (
                    <>
                      <span className='text-muted-foreground'>...</span>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => updateURLParams({ page: pages })}
                        className='w-10 h-10'
                      >
                        {pages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant='outline'
                  disabled={page >= pages}
                  onClick={() =>
                    updateURLParams({ page: Math.min(pages, page + 1) })
                  }
                  className='flex items-center gap-2'
                >
                  Sau
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
