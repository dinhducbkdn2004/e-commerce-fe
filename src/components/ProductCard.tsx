import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProductDTO } from '@/types/product'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: ProductDTO
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock'
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product._id)
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`)
  }

  return (
    <Card className='group overflow-hidden hover:shadow-lg transition-all duration-300 relative'>
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
        <div className='absolute inset-0 bg-black/20 flex items-center justify-center z-20'>
          <Badge variant='destructive' className='text-white bg-black/80'>
            Hết hàng
          </Badge>
        </div>
      )}

      <Link to={`/products/${product._id}`} className='block'>
        {/* Product Image */}
        <div className='aspect-[4/3] w-full overflow-hidden bg-muted relative'>
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
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className='h-full w-full flex items-center justify-center bg-muted text-muted-foreground'>
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
        <CardTitle className='text-base line-clamp-2 group-hover:text-primary transition-colors'>
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
            <span className='text-lg font-semibold text-primary'>
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
          className='w-full mt-2'
          variant={isOutOfStock ? 'secondary' : 'default'}
          size='sm'
        >
          {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
        </Button>
      </CardContent>
    </Card>
  )
}
