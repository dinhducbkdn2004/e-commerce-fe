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
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

interface ProductSidebarProps {
  onFilterChange: (filters: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    sortOrder?: string
  }) => void
  currentFilters: {
    search?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
    sortOrder?: string
  }
  onClearFilters: () => void
  totalProducts: number
}

const categories = [
  { value: '', label: 'Tất cả danh mục' },
  { value: 'electronics', label: 'Điện tử' },
  { value: 'fashion', label: 'Thời trang' },
  { value: 'home', label: 'Gia dụng' },
  { value: 'beauty', label: 'Làm đẹp' },
  { value: 'books', label: 'Sách' },
  { value: 'sports', label: 'Thể thao' },
]

const priceRanges = [
  { min: 0, max: 100000, label: 'Dưới 100k' },
  { min: 100000, max: 500000, label: '100k - 500k' },
  { min: 500000, max: 1000000, label: '500k - 1tr' },
  { min: 1000000, max: 5000000, label: '1tr - 5tr' },
  { min: 5000000, max: null, label: 'Trên 5tr' },
]

export default function ProductSidebar({
  onFilterChange,
  currentFilters,
  onClearFilters,
  totalProducts,
}: ProductSidebarProps) {
  const [localFilters, setLocalFilters] = useState({
    search: currentFilters.search || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
  })

  const handleSearchChange = (value: string) => {
    setLocalFilters(prev => ({ ...prev, search: value }))
    onFilterChange({ search: value || undefined })
  }

  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value || undefined })
  }

  const handlePriceRangeClick = (min: number, max: number | null) => {
    setLocalFilters(prev => ({
      ...prev,
      minPrice: min.toString(),
      maxPrice: max?.toString() || '',
    }))
    onFilterChange({
      minPrice: min,
      maxPrice: max || undefined,
    })
  }

  const handleCustomPriceFilter = () => {
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
    currentFilters.maxPrice

  return (
    <div className='w-80 h-fit sticky top-4'>
      <Card className='border-border'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold text-foreground'>
              Bộ lọc sản phẩm
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant='outline'
                size='sm'
                onClick={onClearFilters}
                className='text-xs'
              >
                Xóa tất cả
              </Button>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>
            {totalProducts} sản phẩm
          </p>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Search */}
          <div>
            <label className='text-sm font-medium text-foreground mb-2 block'>
              Tìm kiếm
            </label>
            <Input
              type='text'
              placeholder='Nhập tên sản phẩm...'
              value={localFilters.search}
              onChange={e => handleSearchChange(e.target.value)}
              className=' border-border'
            />
          </div>

          <Separator className='bg-border' />

          {/* Categories */}
          <div>
            <label className='text-sm font-medium text-foreground mb-3 block'>
              Danh mục
            </label>
            <div className='space-y-2'>
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentFilters.category === category.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <Separator className='bg-border' />

          {/* Price Range Quick Filters */}
          <div>
            <label className='text-sm font-medium text-foreground mb-3 block'>
              Khoảng giá
            </label>
            <div className='space-y-2 mb-4'>
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handlePriceRangeClick(range.min, range.max)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentFilters.minPrice === range.min.toString() &&
                    (range.max
                      ? currentFilters.maxPrice === range.max.toString()
                      : !currentFilters.maxPrice)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Custom Price Range */}
            <div className='space-y-3'>
              <p className='text-xs text-muted-foreground'>
                Hoặc nhập khoảng giá tùy chỉnh:
              </p>
              <div className='flex gap-2 items-center'>
                <Input
                  type='number'
                  placeholder='Từ'
                  value={localFilters.minPrice}
                  onChange={e =>
                    setLocalFilters(prev => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className='flex-1 text-xs  border-border'
                />
                <span className='text-muted-foreground text-xs'>-</span>
                <Input
                  type='number'
                  placeholder='Đến'
                  value={localFilters.maxPrice}
                  onChange={e =>
                    setLocalFilters(prev => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className='flex-1 text-xs  border-border'
                />
              </div>
              <Button
                onClick={handleCustomPriceFilter}
                size='sm'
                className='w-full'
              >
                Áp dụng
              </Button>
            </div>
          </div>

          <Separator className='bg-border' />

          {/* Sort */}
          <div>
            <label className='text-sm font-medium text-foreground mb-3 block'>
              Sắp xếp theo
            </label>
            <Select
              value={`${currentFilters.sortBy || 'createdAt'}-${currentFilters.sortOrder || 'desc'}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className=' border-border'>
                <SelectValue placeholder='Chọn cách sắp xếp' />
              </SelectTrigger>
              <SelectContent className='bg-popover border-border'>
                <SelectItem value='createdAt-desc'>Mới nhất</SelectItem>
                <SelectItem value='createdAt-asc'>Cũ nhất</SelectItem>
                <SelectItem value='price-asc'>Giá thấp đến cao</SelectItem>
                <SelectItem value='price-desc'>Giá cao đến thấp</SelectItem>
                <SelectItem value='rating-desc'>Đánh giá cao nhất</SelectItem>
                <SelectItem value='sales-desc'>Bán chạy nhất</SelectItem>
                <SelectItem value='views-desc'>Xem nhiều nhất</SelectItem>
                <SelectItem value='name-asc'>Tên A-Z</SelectItem>
                <SelectItem value='name-desc'>Tên Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <>
              <Separator className='bg-border' />
              <div>
                <label className='text-sm font-medium text-foreground mb-3 block'>
                  Bộ lọc đang áp dụng
                </label>
                <div className='flex flex-wrap gap-2'>
                  {currentFilters.search && (
                    <Badge
                      variant='secondary'
                      className='cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      onClick={() => handleSearchChange('')}
                    >
                      Tìm kiếm: "{currentFilters.search}" ×
                    </Badge>
                  )}
                  {currentFilters.category && (
                    <Badge
                      variant='secondary'
                      className='cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      onClick={() => handleCategoryChange('')}
                    >
                      {
                        categories.find(
                          c => c.value === currentFilters.category
                        )?.label
                      }{' '}
                      ×
                    </Badge>
                  )}
                  {currentFilters.minPrice && (
                    <Badge
                      variant='secondary'
                      className='cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      onClick={() => {
                        setLocalFilters(prev => ({ ...prev, minPrice: '' }))
                        onFilterChange({ minPrice: undefined })
                      }}
                    >
                      Từ:{' '}
                      {parseInt(currentFilters.minPrice).toLocaleString(
                        'vi-VN'
                      )}
                      ₫ ×
                    </Badge>
                  )}
                  {currentFilters.maxPrice && (
                    <Badge
                      variant='secondary'
                      className='cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      onClick={() => {
                        setLocalFilters(prev => ({ ...prev, maxPrice: '' }))
                        onFilterChange({ maxPrice: undefined })
                      }}
                    >
                      Đến:{' '}
                      {parseInt(currentFilters.maxPrice).toLocaleString(
                        'vi-VN'
                      )}
                      ₫ ×
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
