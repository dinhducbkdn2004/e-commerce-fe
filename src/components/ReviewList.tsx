import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Review } from '@/types/product'
import { ThumbsUp, User, Verified } from 'lucide-react'
import { useMemo, useState } from 'react'

interface ReviewListProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

const StarRating = ({
  rating,
  size = 'sm',
}: {
  rating: number
  size?: 'sm' | 'lg'
}) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const starSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <div className='flex items-center gap-1'>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={`full-${i}`} className={`${starSize} text-yellow-500`}>
          ⭐
        </span>
      ))}
      {/* Half star */}
      {hasHalfStar && <span className={`${starSize} text-yellow-500`}>⭐</span>}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={`empty-${i}`} className={`${starSize} text-gray-300`}>
          ☆
        </span>
      ))}
    </div>
  )
}

export default function ReviewList({
  reviews,
  averageRating,
  totalReviews,
}: ReviewListProps) {
  const [sortBy, setSortBy] = useState('newest')
  const [filterRating, setFilterRating] = useState('all')
  const [showAll, setShowAll] = useState(false)

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      const rating = Math.round(review.rating) as keyof typeof distribution
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++
      }
    })
    return distribution
  }, [reviews])

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    // Filter by rating
    if (filterRating !== 'all') {
      const targetRating = parseInt(filterRating)
      filtered = filtered.filter(
        review => Math.round(review.rating) === targetRating
      )
    }

    // Sort reviews
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        case 'helpful':
          return (b.helpful || 0) - (a.helpful || 0)
        default:
          return 0
      }
    })

    return sorted
  }, [reviews, sortBy, filterRating])

  const displayedReviews = showAll
    ? filteredAndSortedReviews
    : filteredAndSortedReviews.slice(0, 5)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className='space-y-6'>
      {/* Rating Summary */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Overall Rating */}
        <div className='text-center md:text-left'>
          <div className='flex items-center justify-center md:justify-start gap-3 mb-2'>
            <span className='text-4xl font-bold'>
              {averageRating.toFixed(1)}
            </span>
            <div>
              <StarRating rating={averageRating} size='lg' />
              <p className='text-sm text-muted-foreground'>
                {totalReviews} đánh giá
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className='space-y-2'>
          {[5, 4, 3, 2, 1].map(star => {
            const count =
              ratingDistribution[star as keyof typeof ratingDistribution]
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0

            return (
              <div key={star} className='flex items-center gap-2 text-sm'>
                <span className='w-6'>{star}⭐</span>
                <div className='flex-1 bg-muted rounded-full h-2'>
                  <div
                    className='bg-yellow-500 h-2 rounded-full transition-all'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className='w-8 text-muted-foreground'>{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className='flex flex-col sm:flex-row gap-4 justify-between'>
        <div className='flex gap-4'>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Lọc theo sao' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả</SelectItem>
              <SelectItem value='5'>5 sao</SelectItem>
              <SelectItem value='4'>4 sao</SelectItem>
              <SelectItem value='3'>3 sao</SelectItem>
              <SelectItem value='2'>2 sao</SelectItem>
              <SelectItem value='1'>1 sao</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Sắp xếp' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Mới nhất</SelectItem>
              <SelectItem value='oldest'>Cũ nhất</SelectItem>
              <SelectItem value='highest'>Đánh giá cao</SelectItem>
              <SelectItem value='lowest'>Đánh giá thấp</SelectItem>
              <SelectItem value='helpful'>Hữu ích nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className='text-sm text-muted-foreground'>
          Hiển thị {displayedReviews.length} / {filteredAndSortedReviews.length}{' '}
          đánh giá
        </p>
      </div>

      {/* Reviews List */}
      <div className='space-y-4'>
        {displayedReviews.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-muted-foreground'>
              {filterRating === 'all'
                ? 'Chưa có đánh giá nào'
                : `Không có đánh giá ${filterRating} sao`}
            </div>
          </div>
        ) : (
          displayedReviews.map(review => (
            <Card key={review.id}>
              <CardContent className='p-4'>
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-muted flex items-center justify-center'>
                      <User className='w-5 h-5 text-muted-foreground' />
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>
                          {review.reviewerName}
                        </span>
                        {review.verified && (
                          <Badge variant='secondary' className='text-xs'>
                            <Verified className='w-3 h-3 mr-1' />
                            Đã mua hàng
                          </Badge>
                        )}
                      </div>
                      <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <StarRating rating={review.rating} />
                        <span>•</span>
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className='text-sm text-muted-foreground mb-3 leading-relaxed'>
                  {review.comment}
                </p>

                <div className='flex items-center justify-between'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    <ThumbsUp className='w-4 h-4 mr-1' />
                    Hữu ích ({review.helpful || 0})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More Button */}
      {!showAll && filteredAndSortedReviews.length > 5 && (
        <div className='text-center'>
          <Button variant='outline' onClick={() => setShowAll(true)}>
            Xem thêm {filteredAndSortedReviews.length - 5} đánh giá
          </Button>
        </div>
      )}

      {showAll && filteredAndSortedReviews.length > 5 && (
        <div className='text-center'>
          <Button variant='outline' onClick={() => setShowAll(false)}>
            Thu gọn
          </Button>
        </div>
      )}
    </div>
  )
}

