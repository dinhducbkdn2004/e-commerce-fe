import ProductCard from '@/components/ProductCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  productService,
  type GetProductsParams,
} from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)

  // URL params
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const sortBy = searchParams.get('sortBy') || 'createdAt'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  // Local state for filters
  const [searchInput, setSearchInput] = useState(search)
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice })

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
          params.set('search', value)
        } else {
          params.delete('search')
        }
        params.set('page', '1')
        setSearchParams(params)
      }, 500),
    [searchParams, setSearchParams]
  )

  // Filter functions
  const updateURLParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    params.set('page', '1')
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchParams({})
    setSearchInput('')
    setPriceRange({ min: '', max: '' })
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

  // Search input handler
  useEffect(() => {
    debouncedSearch(searchInput)
  }, [searchInput, debouncedSearch])

  const pages = Math.ceil(total / 12)

  return (
    <div className='container mx-auto px-4'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Sản phẩm</h1>

        {/* Search and Filters */}
        <div className='space-y-4'>
          {/* Search Bar */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Input
                type='text'
                placeholder='Tìm kiếm sản phẩm...'
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className='w-full'
              />
            </div>
            <Button onClick={clearFilters} variant='outline'>
              Xóa bộ lọc
            </Button>
          </div>

          {/* Price Filter */}
          <div className='flex gap-4 items-center'>
            <span className='text-sm font-medium'>Khoảng giá:</span>
            <Input
              type='number'
              placeholder='Giá từ'
              value={priceRange.min}
              onChange={e =>
                setPriceRange(prev => ({ ...prev, min: e.target.value }))
              }
              className='w-32'
            />
            <span>-</span>
            <Input
              type='number'
              placeholder='Giá đến'
              value={priceRange.max}
              onChange={e =>
                setPriceRange(prev => ({ ...prev, max: e.target.value }))
              }
              className='w-32'
            />
            <Button
              onClick={() =>
                updateURLParams({
                  minPrice: priceRange.min || null,
                  maxPrice: priceRange.max || null,
                })
              }
              size='sm'
            >
              Áp dụng
            </Button>
          </div>

          {/* Sort Options */}
          <div className='flex gap-4 items-center flex-wrap'>
            <span className='text-sm font-medium'>Sắp xếp:</span>
            <div className='flex gap-2'>
              <Button
                variant={sortBy === 'createdAt' ? 'default' : 'outline'}
                size='sm'
                onClick={() =>
                  updateURLParams({ sortBy: 'createdAt', sortOrder: 'desc' })
                }
              >
                Mới nhất
              </Button>
              <Button
                variant={
                  sortBy === 'price' && sortOrder === 'asc'
                    ? 'default'
                    : 'outline'
                }
                size='sm'
                onClick={() =>
                  updateURLParams({ sortBy: 'price', sortOrder: 'asc' })
                }
              >
                Giá thấp - cao
              </Button>
              <Button
                variant={
                  sortBy === 'price' && sortOrder === 'desc'
                    ? 'default'
                    : 'outline'
                }
                size='sm'
                onClick={() =>
                  updateURLParams({ sortBy: 'price', sortOrder: 'desc' })
                }
              >
                Giá cao - thấp
              </Button>
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size='sm'
                onClick={() =>
                  updateURLParams({ sortBy: 'rating', sortOrder: 'desc' })
                }
              >
                Đánh giá cao
              </Button>
              <Button
                variant={sortBy === 'sales' ? 'default' : 'outline'}
                size='sm'
                onClick={() =>
                  updateURLParams({ sortBy: 'sales', sortOrder: 'desc' })
                }
              >
                Bán chạy
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(search || minPrice || maxPrice || category) && (
            <div className='flex gap-2 items-center flex-wrap'>
              <span className='text-sm font-medium'>Bộ lọc đang áp dụng:</span>
              {search && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer'
                  onClick={() => {
                    setSearchInput('')
                    updateURLParams({ search: null })
                  }}
                >
                  Tìm kiếm: {search} ×
                </Badge>
              )}
              {minPrice && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer'
                  onClick={() => {
                    setPriceRange(prev => ({ ...prev, min: '' }))
                    updateURLParams({ minPrice: null })
                  }}
                >
                  Từ: {parseInt(minPrice).toLocaleString('vi-VN')}₫ ×
                </Badge>
              )}
              {maxPrice && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer'
                  onClick={() => {
                    setPriceRange(prev => ({ ...prev, max: '' }))
                    updateURLParams({ maxPrice: null })
                  }}
                >
                  Đến: {parseInt(maxPrice).toLocaleString('vi-VN')}₫ ×
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      {!loading && (
        <div className='mb-4 text-sm text-muted-foreground'>
          {total > 0 ? (
            <>
              Hiển thị {(page - 1) * 12 + 1}-{Math.min(page * 12, total)} trong
              tổng số {total} sản phẩm
            </>
          ) : (
            'Không tìm thấy sản phẩm nào'
          )}
        </div>
      )}

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='h-64 rounded-xl bg-muted animate-pulse' />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className='text-center text-muted-foreground'>
          Chưa có sản phẩm nào
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {products.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className='flex items-center justify-center gap-2 mt-8'>
          <Button
            variant='outline'
            disabled={page <= 1}
            onClick={() =>
              updateURLParams({ page: Math.max(1, page - 1).toString() })
            }
          >
            Trước
          </Button>
          <span className='text-sm px-4'>
            Trang {page} / {pages}
          </span>
          <Button
            variant='outline'
            disabled={page >= pages}
            onClick={() =>
              updateURLParams({ page: Math.min(pages, page + 1).toString() })
            }
          >
            Sau
          </Button>
        </div>
      )}
    </div>
  )
}
