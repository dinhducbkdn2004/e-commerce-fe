import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductDTO } from '@/types/product'
import { memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: ProductDTO
  viewMode?: 'grid' | 'list'
}

const ProductCard = memo(function ProductCard({
  product,
  viewMode = 'grid',
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock'
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      // TODO: Implement add to cart functionality
      console.log('Add to cart:', product._id)
      alert(`Đã thêm "${product.name}" vào giỏ hàng!`)
    },
    [product._id, product.name]
  )

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  if (viewMode === 'list') {
    return (
      <Card className='group overflow-hidden hover:shadow-lg transition-all duration-300 relative card-glass'>
        <Link to={`/products/${product._id}`} className='block'>
          <div className='flex'>
            {/* Product Image - List View */}
            <div className='w-48 h-36 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800 relative'>
              {/* Badges */}
              {hasDiscount && (
                <Badge
                  variant='destructive'
                  className='absolute top-2 left-2 z-10'
                >
                  -{discountPercent}%
                </Badge>
              )}

              {!imageLoaded && !imageError && (
                <div className='absolute inset-0 bg-purple-100 dark:bg-purple-900/20 animate-pulse' />
              )}

              {!imageError ? (
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.name}
                  className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading='lazy'
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className='h-full w-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'>
                  <svg
                    className='w-8 h-8'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              )}

              {/* Out of Stock Overlay */}
              {isOutOfStock && (
                <div className='absolute inset-0 bg-gray-900/30 dark:bg-gray-800/50 flex items-center justify-center z-20'>
                  <Badge
                    variant='destructive'
                    className='text-white bg-red-600/90 dark:bg-red-700/90 border-0'
                  >
                    Hết hàng
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info - List View */}
            <div className='flex-1 p-4'>
              <div className='flex justify-between h-full'>
                <div className='flex-1 space-y-2'>
                  <h3 className='text-lg font-semibold line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                    {product.name}
                  </h3>

                  {product.brand && (
                    <p className='text-sm text-muted-foreground'>
                      {product.brand}
                    </p>
                  )}

                  {/* Rating */}
                  <div className='flex items-center gap-1 text-sm'>
                    <span className='text-yellow-500'>⭐</span>
                    <span className='font-medium'>
                      {product.ratings?.average?.toFixed(1) || 0}
                    </span>
                    <span className='text-muted-foreground'>
                      ({product.ratings?.count || 0})
                    </span>
                    {product.sales > 0 && (
                      <>
                        <span className='text-muted-foreground'>•</span>
                        <span className='text-muted-foreground'>
                          {product.sales} đã bán
                        </span>
                      </>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags?.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {product.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant='outline' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 3 && (
                        <Badge variant='outline' className='text-xs'>
                          +{product.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Price and Actions */}
                <div className='flex flex-col justify-between items-end'>
                  {/* Featured Badge */}
                  {product.isFeatured && (
                    <Badge variant='default' className='mb-2'>
                      Nổi bật
                    </Badge>
                  )}

                  <div className='text-right space-y-3'>
                    {/* Price */}
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl font-semibold text-purple-600 dark:text-purple-400'>
                          {product.price.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                      {hasDiscount && (
                        <span className='text-sm text-muted-foreground line-through block'>
                          {product.originalPrice!.toLocaleString('vi-VN')}₫
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      variant={isOutOfStock ? 'secondary' : 'default'}
                      size='sm'
                      className={`min-w-[120px] ${
                        !isOutOfStock
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
                          : ''
                      }`}
                    >
                      {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    )
  }

  // Grid view (default)
  return (
    <Card className='group overflow-hidden hover:shadow-lg transition-all duration-300 relative card-glass'>
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge variant='destructive' className='absolute top-2 left-2 z-10'>
          -{discountPercent}%
        </Badge>
      )}

      {/* Featured Badge */}
      {product.isFeatured && (
        <Badge variant='default' className='absolute top-2 right-2 z-10'>
          Nổi bật
        </Badge>
      )}

      {/* Out of Stock Overlay */}
      {isOutOfStock && (
        <div className='absolute inset-0 bg-gray-900/30 dark:bg-gray-800/50 flex items-center justify-center z-20'>
          <Badge variant='destructive' className='text-white bg-red-600/90 dark:bg-red-700/90 border-0'>
            Hết hàng
          </Badge>
        </div>
      )}

      <Link to={`/products/${product._id}`} className='block'>
        {/* Product Image */}
                    <div className='aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 relative'>
          {!imageLoaded && !imageError && (
            <div className='absolute inset-0 bg-muted animate-pulse' />
          )}

          {!imageError ? (
            <img
              src={product.thumbnail || product.images?.[0]}
              alt={product.name}
              className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading='lazy'
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className='h-full w-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'>
              <svg
                className='w-12 h-12'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      <CardHeader className='pb-2'>
        <CardTitle className='text-base line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
          {product.name}
        </CardTitle>

        {/* Brand */}
        {product.brand && (
          <p className='text-xs text-muted-foreground'>{product.brand}</p>
        )}
      </CardHeader>

      <CardContent className='pb-4 space-y-3'>
        {/* Rating */}
        <div className='flex items-center gap-1 text-xs'>
          <span className='text-yellow-500'>⭐</span>
          <span className='font-medium'>
            {product.ratings?.average?.toFixed(1) || 0}
          </span>
          <span className='text-muted-foreground'>
            ({product.ratings?.count || 0})
          </span>
          {product.sales > 0 && (
            <>
              <span className='text-muted-foreground'>•</span>
              <span className='text-muted-foreground'>
                {product.sales} đã bán
              </span>
            </>
          )}
        </div>

        {/* Price */}
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-semibold text-purple-600 dark:text-purple-400'>
              {product.price.toLocaleString('vi-VN')}₫
            </span>
            {hasDiscount && (
              <span className='text-sm text-muted-foreground line-through'>
                {product.originalPrice!.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {product.tags?.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {product.tags.slice(0, 2).map((tag, idx) => (
              <Badge key={idx} variant='outline' className='text-xs'>
                {tag}
              </Badge>
            ))}
            {product.tags.length > 2 && (
              <Badge variant='outline' className='text-xs'>
                +{product.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full mt-2 ${
            !isOutOfStock
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
              : ''
          }`}
          variant={isOutOfStock ? 'secondary' : 'default'}
          size='sm'
        >
          {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
        </Button>
      </CardContent>
    </Card>
  )
})

export default ProductCard
