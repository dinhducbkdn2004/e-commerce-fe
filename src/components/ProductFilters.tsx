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
import { useState } from 'react'

interface ProductFiltersProps {
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
}

export default function ProductFilters({
  onFilterChange,
  currentFilters,
  onClearFilters,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    search: currentFilters.search || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
  })

  const handleSearchChange = (value: string) => {
    setLocalFilters(prev => ({ ...prev, search: value }))
    onFilterChange({ search: value || undefined })
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
    currentFilters.search || currentFilters.minPrice || currentFilters.maxPrice

  return (
    <Card className='mb-6'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>Bộ lọc sản phẩm</CardTitle>
          {hasActiveFilters && (
            <Button variant='outline' size='sm' onClick={onClearFilters}>
              Xóa tất cả
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Search */}
        <div>
          <label className='text-sm font-medium mb-2 block'>Tìm kiếm</label>
          <Input
            type='text'
            placeholder='Nhập tên sản phẩm...'
            value={localFilters.search}
            onChange={e => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div>
          <label className='text-sm font-medium mb-2 block'>Khoảng giá</label>
          <div className='flex gap-2 items-center'>
            <Input
              type='number'
              placeholder='Từ'
              value={localFilters.minPrice}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, minPrice: e.target.value }))
              }
              className='flex-1'
            />
            <span className='text-muted-foreground'>-</span>
            <Input
              type='number'
              placeholder='Đến'
              value={localFilters.maxPrice}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, maxPrice: e.target.value }))
              }
              className='flex-1'
            />
            <Button onClick={handlePriceFilter} size='sm'>
              Áp dụng
            </Button>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className='text-sm font-medium mb-2 block'>Sắp xếp theo</label>
          <Select
            value={`${currentFilters.sortBy || 'createdAt'}-${currentFilters.sortOrder || 'desc'}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Chọn cách sắp xếp' />
            </SelectTrigger>
            <SelectContent>
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
          <div>
            <label className='text-sm font-medium mb-2 block'>
              Bộ lọc đang áp dụng
            </label>
            <div className='flex flex-wrap gap-2'>
              {currentFilters.search && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer'
                  onClick={() => handleSearchChange('')}
                >
                  Tìm kiếm: "{currentFilters.search}" ×
                </Badge>
              )}
              {currentFilters.minPrice && (
                <Badge
                  variant='secondary'
                  className='cursor-pointer'
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
                  className='cursor-pointer'
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
