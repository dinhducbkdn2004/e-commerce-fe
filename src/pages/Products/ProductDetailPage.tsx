import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { productService } from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductDTO | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    productService
      .getProductById(id)
      .then(p => {
        if (!active) return
        setProduct(p)
      })
      .catch(error => {
        console.error('Error loading product:', error)
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div className='aspect-square rounded-xl bg-muted animate-pulse' />
            <div className='grid grid-cols-4 gap-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className='aspect-square rounded-md bg-muted animate-pulse'
                />
              ))}
            </div>
          </div>
          <div className='space-y-4'>
            <div className='h-8 w-3/4 rounded bg-muted animate-pulse' />
            <div className='h-4 w-1/2 rounded bg-muted animate-pulse' />
            <div className='h-6 w-1/3 rounded bg-muted animate-pulse' />
            <div className='h-20 w-full rounded bg-muted animate-pulse' />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Không tìm thấy sản phẩm</h1>
          <p className='text-muted-foreground mb-6'>
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to='/products'>
            <Button>Quay lại danh sách sản phẩm</Button>
          </Link>
        </div>
      </div>
    )
  }

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail]
  const currentImage = images[selectedImageIndex] || product.thumbnail

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', { productId: product._id, quantity })
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`)
  }

  const isOutOfStock = product.stock <= 0

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <nav className='mb-6 text-sm'>
        <Link to='/' className='text-muted-foreground hover:text-foreground'>
          Trang chủ
        </Link>
        <span className='mx-2 text-muted-foreground'>/</span>
        <Link
          to='/products'
          className='text-muted-foreground hover:text-foreground'
        >
          Sản phẩm
        </Link>
        <span className='mx-2 text-muted-foreground'>/</span>
        <span className='font-medium'>{product.name}</span>
      </nav>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Image Gallery */}
        <div className='space-y-4'>
          {/* Main Image */}
          <div className='aspect-square overflow-hidden rounded-xl bg-muted border'>
            <img
              src={currentImage}
              alt={product.name}
              className='h-full w-full object-cover'
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className='grid grid-cols-4 gap-2'>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    idx === selectedImageIndex
                      ? 'border-primary'
                      : 'border-muted hover:border-border'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className='space-y-6'>
          {/* Header */}
          <div>
            <h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <span>SKU: {product.sku}</span>
              <span>Thương hiệu: {product.brand || 'Không có'}</span>
              {product.status === 'out_of_stock' && (
                <Badge variant='destructive'>Hết hàng</Badge>
              )}
              {product.isFeatured && <Badge variant='default'>Nổi bật</Badge>}
            </div>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <span className='text-lg'>⭐</span>
              <span className='font-medium'>
                {product.ratings?.average?.toFixed(1) || 0}
              </span>
            </div>
            <span className='text-muted-foreground'>
              ({product.ratings?.count || 0} đánh giá)
            </span>
            <span className='text-muted-foreground'>•</span>
            <span className='text-muted-foreground'>
              {product.sales} đã bán
            </span>
          </div>

          {/* Price */}
          <div className='space-y-2'>
            <div className='flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-primary'>
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <span className='text-lg text-muted-foreground line-through'>
                      {product.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                    <Badge variant='destructive'>
                      -
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      %
                    </Badge>
                  </>
                )}
            </div>
          </div>

          {/* Stock Info */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Tình trạng:</span>
              <span
                className={`font-medium ${isOutOfStock ? 'text-destructive' : 'text-green-600'}`}
              >
                {isOutOfStock ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
              </span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          {!isOutOfStock && (
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='font-medium'>Số lượng:</span>
                <div className='flex items-center border rounded-md'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className='px-3 py-2 hover:bg-muted'
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className='px-4 py-2 border-x'>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className='px-3 py-2 hover:bg-muted'
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className='flex gap-4'>
                <Button onClick={handleAddToCart} className='flex-1' size='lg'>
                  Thêm vào giỏ hàng
                </Button>
                <Button variant='outline' size='lg' className='px-6'>
                  ♡
                </Button>
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className='space-y-2'>
              <span className='font-medium'>Tags:</span>
              <div className='flex flex-wrap gap-2'>
                {product.tags.map((tag, idx) => (
                  <Badge key={idx} variant='secondary'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-12 space-y-8'>
        <Card>
          <CardContent className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Mô tả sản phẩm</h2>
            <div className='prose prose-sm max-w-none'>
              {product.shortDescription && (
                <p className='text-lg text-muted-foreground mb-4'>
                  {product.shortDescription}
                </p>
              )}
              <div className='whitespace-pre-line'>{product.description}</div>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-bold mb-4'>Thông số kỹ thuật</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className='flex justify-between border-b pb-2'
                      >
                        <span className='font-medium'>{key}:</span>
                        <span className='text-muted-foreground'>{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  )
}
