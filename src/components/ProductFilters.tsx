import { categoriesApi } from '@/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import SortSelect from './SortSelect'

// Types for category API response
interface Category {
  _id: string
  name: string
  slug: string
  isActive: boolean
  level: number
}

interface CategoryApiResponse {
  success: boolean
  data: Category[]
}

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    sortBy?: string
    sortOrder?: string
  }) => void
  currentFilters: {
    search?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    rating?: string
    sortBy?: string
    sortOrder?: string
  }
  onClearFilters: () => void
  totalProducts?: number
}

export default function ProductFilters({
  onFilterChange,
  currentFilters,
  onClearFilters,
  totalProducts = 0,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string; slug: string }>
  >([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [localFilters, setLocalFilters] = useState({
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
  })

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true)
      try {
        const response =
          (await categoriesApi.getCategories()) as CategoryApiResponse
        if (response.success && response.data) {
          // Filter only active root categories
          const activeCategories = response.data
            .filter((cat: Category) => cat.isActive && cat.level === 0)
            .map((cat: Category) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug,
            }))
          setCategories(activeCategories)
        }
      } catch (error) {
        console.error('Error loading categories:', error)
        setCategories([]) // Set empty array on error
      } finally {
        setLoadingCategories(false)
      }
    }
    loadCategories()
  }, [])

  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value || undefined })
  }

  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value === 'all' ? undefined : value })
  }

  const handleRatingChange = (value: string) => {
    onFilterChange({ rating: value === 'all' ? undefined : parseInt(value) })
  }

  const handlePriceFilter = () => {
    onFilterChange({
      minPrice: localFilters.minPrice
        ? parseInt(localFilters.minPrice)
        : undefined,
      maxPrice: localFilters.maxPrice
        ? parseInt(localFilters.maxPrice)
        : undefined,
    })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-')
    onFilterChange({ sortBy, sortOrder })
  }

  const hasActiveFilters =
    currentFilters.search ||
    currentFilters.category ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.rating

  return (
    <Card className='mb-6 border-purple-200 dark:border-purple-800'>
      <CardHeader className='bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg text-purple-900 dark:text-purple-100'>
            Bộ lọc sản phẩm
            {totalProducts > 0 && (
              <span className='text-sm font-normal text-purple-600 dark:text-purple-400 ml-2'>
                ({totalProducts} sản phẩm)
              </span>
            )}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant='outline'
              size='sm'
              onClick={onClearFilters}
              className='border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
            >
              Xóa tất cả
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Search */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Tìm kiếm</label>
          <SearchInput
            value={currentFilters.search || ''}
            onChange={handleSearchChange}
            placeholder='Tìm kiếm sản phẩm...'
            className='w-full'
          />
        </div>

        {/* Category Filter */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Danh mục</label>
          <Select
            value={currentFilters.category || 'all'}
            onValueChange={handleCategoryChange}
            disabled={loadingCategories}
          >
            <SelectTrigger className='border-purple-300/60 dark:border-purple-600 focus:ring-purple-500/50 dark:focus:ring-purple-400 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-200'>
              <SelectValue
                placeholder={
                  loadingCategories ? 'Đang tải...' : 'Chọn danh mục'
                }
              />
            </SelectTrigger>
            <SelectContent className='border-purple-300/60 dark:border-purple-600 bg-white/98 dark:bg-gray-800/95'>
              <SelectItem
                value='all'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                Tất cả danh mục
              </SelectItem>
              {categories.map(category => (
                <SelectItem
                  key={category.id}
                  value={category.slug}
                  className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Đánh giá</label>
          <Select
            value={currentFilters.rating || 'all'}
            onValueChange={handleRatingChange}
          >
            <SelectTrigger className='border-purple-300/60 dark:border-purple-600 focus:ring-purple-500/50 dark:focus:ring-purple-400 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-200'>
              <SelectValue placeholder='Chọn đánh giá' />
            </SelectTrigger>
            <SelectContent className='border-purple-300/60 dark:border-purple-600 bg-white/98 dark:bg-gray-800/95'>
              <SelectItem
                value='all'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                Tất cả đánh giá
              </SelectItem>
              <SelectItem
                value='5'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                ⭐⭐⭐⭐⭐ 5 sao
              </SelectItem>
              <SelectItem
                value='4'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                ⭐⭐⭐⭐ 4 sao trở lên
              </SelectItem>
              <SelectItem
                value='3'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                ⭐⭐⭐ 3 sao trở lên
              </SelectItem>
              <SelectItem
                value='2'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                ⭐⭐ 2 sao trở lên
              </SelectItem>
              <SelectItem
                value='1'
                className='hover:bg-purple-100/80 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-200'
              >
                ⭐ 1 sao trở lên
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Khoảng giá</label>
          <div className='flex gap-2 items-center'>
            <Input
              type='number'
              placeholder='Từ'
              value={localFilters.minPrice}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, minPrice: e.target.value }))
              }
              className='flex-1 border-purple-300/60 dark:border-purple-600 focus:ring-purple-500/50 dark:focus:ring-purple-400 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-200'
            />
            <span className='text-purple-600 dark:text-purple-400'>-</span>
            <Input
              type='number'
              placeholder='Đến'
              value={localFilters.maxPrice}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, maxPrice: e.target.value }))
              }
              className='flex-1 border-purple-300/60 dark:border-purple-600 focus:ring-purple-500/50 dark:focus:ring-purple-400 bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-200'
            />
          </div>
          <Button
            onClick={handlePriceFilter}
            size='sm'
            className='w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
          >
            Áp dụng
          </Button>
        </div>

        {/* Sort */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Sắp xếp theo</label>
          <SortSelect
            value={`${currentFilters.sortBy || 'createdAt'}-${currentFilters.sortOrder || 'desc'}`}
            onChange={handleSortChange}
          />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Bộ lọc đang áp dụng</label>
            <div className='flex flex-wrap gap-2'>
              {currentFilters.search && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => handleSearchChange('')}
                >
                  Tìm kiếm: "{currentFilters.search}" ×
                </Badge>
              )}
              {currentFilters.category && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => handleCategoryChange('all')}
                >
                  Danh mục: {currentFilters.category} ×
                </Badge>
              )}
              {currentFilters.rating && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => handleRatingChange('all')}
                >
                  Đánh giá: {currentFilters.rating}+ sao ×
                </Badge>
              )}
              {currentFilters.minPrice && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => {
                    setLocalFilters(prev => ({ ...prev, minPrice: '' }))
                    onFilterChange({ minPrice: undefined })
                  }}
                >
                  Từ:{' '}
                  {parseInt(currentFilters.minPrice).toLocaleString('vi-VN')}₫ ×
                </Badge>
              )}
              {currentFilters.maxPrice && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer hover:bg-destructive hover:text-destructive-foreground'
                  onClick={() => {
                    setLocalFilters(prev => ({ ...prev, maxPrice: '' }))
                    onFilterChange({ maxPrice: undefined })
                  }}
                >
                  Đến:{' '}
                  {parseInt(currentFilters.maxPrice).toLocaleString('vi-VN')}₫ ×
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
