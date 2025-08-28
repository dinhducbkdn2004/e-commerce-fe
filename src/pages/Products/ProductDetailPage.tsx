import Breadcrumb from '@/components/Breadcrumb'
import CommentList from '@/components/CommentList'
import ProductGallery from '@/components/ProductGallery'
import RelatedProducts from '@/components/RelatedProducts'
import ReviewList from '@/components/ReviewList'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useWishlist } from '@/hooks/useWishlist'
import { productService } from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import {
    AlertCircle,
    Heart,
    Loader2,
    RotateCcw,
    Share2,
    Shield,
    ShoppingCart,
    Truck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductDTO | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { isWishlisted, toggleWishlistFocused } = useWishlist(id)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    setError(null)

    productService
      .getProductById(id)
      .then(p => {
        if (!active) return
        if (p) {
          setProduct(p)
        } else {
          setError('Không tìm thấy sản phẩm.')
        }
      })
      .catch(error => {
        console.error('Error loading product:', error)
        if (active) {
          let errorMessage =
            'Không thể tải thông tin sản phẩm. Vui lòng thử lại.'

          // Check for specific error types
          if (error.status === 429) {
            errorMessage =
              'Quá nhiều yêu cầu. Vui lòng đợi một chút và thử lại.'
          } else if (error.status >= 500) {
            errorMessage = 'Lỗi server. Vui lòng thử lại sau.'
          } else if (error.status === 404) {
            errorMessage = 'Không tìm thấy sản phẩm này.'
          }

          setError(errorMessage)
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    console.log('Add to cart:', { productId: product._id, quantity })
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`)
  }

  const handleBuyNow = () => {
    if (!product) return
    console.log('Buy now:', { productId: product._id, quantity })
    toast.success('Chuyển đến trang thanh toán!')
  }

  const handleWishlist = () => {
    if (!product) return
    toggleWishlistFocused()
    toast.success(
      isWishlisted ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích'
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Đã sao chép link sản phẩm!')
    }
  }

  const handleRetry = () => {
    if (id) {
      setError(null)
      setLoading(true)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-beeluxe-page'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col items-center justify-center py-12'>
            <Loader2 className='h-8 w-8 animate-spin text-primary mb-4' />
            <p className='text-muted-foreground'>
              Đang tải thông tin sản phẩm...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className='min-h-screen bg-beeluxe-page'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col items-center justify-center py-12'>
            <AlertCircle className='h-12 w-12 text-destructive mb-4' />
            <h1 className='text-2xl font-bold mb-2'>
              {error ? 'Có lỗi xảy ra' : 'Không tìm thấy sản phẩm'}
            </h1>
            <p className='text-muted-foreground mb-6 text-center max-w-md'>
              {error ||
                'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
            </p>
            <div className='flex gap-4'>
              {error && (
                <Button
                  onClick={handleRetry}
                  variant='outline'
                  className='border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                >
                  Thử lại
                </Button>
              )}
              <Link to='/products'>
                <Button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'>
                  Quay lại danh sách sản phẩm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock'
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  return (
    <div className='min-h-screen bg-beeluxe-page'>
      <div className='container mx-auto px-4 py-6'>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Sản phẩm', href: '/products' },
            { label: product.name },
          ]}
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
          {/* Image Gallery */}
          <div className='space-y-4'>
            <ProductGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            {/* Header */}
            <div>
              <h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <span>SKU: {product.sku}</span>
                {product.brand && <span>Thương hiệu: {product.brand}</span>}
                <div className='flex gap-2'>
                  {isOutOfStock && (
                    <Badge variant='destructive'>Hết hàng</Badge>
                  )}
                  {product.isFeatured && (
                    <Badge variant='default'>Nổi bật</Badge>
                  )}
                  {hasDiscount && (
                    <Badge variant='destructive'>Giảm {discountPercent}%</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <span className='text-lg'>⭐</span>
                <span className='font-medium text-lg'>
                  {product.ratings?.average?.toFixed(1) || 0}
                </span>
                <span className='text-muted-foreground'>
                  ({product.ratings?.count || 0} đánh giá)
                </span>
              </div>
              <span className='text-muted-foreground'>•</span>
              <span className='text-muted-foreground'>
                {product.sales} đã bán
              </span>
            </div>

            {/* Price */}
            <div className='space-y-2'>
              <div className='flex items-baseline gap-3 flex-wrap'>
                <span className='text-4xl font-bold text-primary'>
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
                {hasDiscount && (
                  <span className='text-xl text-muted-foreground line-through'>
                    {product.originalPrice!.toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>
            </div>

            {/* Stock Info */}
            <div className='flex items-center justify-between py-3 border-y'>
              <span className='font-medium'>Tình trạng:</span>
              <span
                className={`font-medium ${isOutOfStock ? 'text-destructive' : 'text-green-600'}`}
              >
                {isOutOfStock ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
              </span>
            </div>

            {/* Quantity and Actions */}
            <div className='space-y-4'>
              {!isOutOfStock && (
                <div className='flex items-center gap-4'>
                  <span className='font-medium'>Số lượng:</span>
                  <div className='flex items-center border border-purple-200 dark:border-purple-700 rounded-lg overflow-hidden bg-white/50 dark:bg-gray-800/50'>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className='px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors border-r border-purple-200 dark:border-purple-700'
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className='px-6 py-2 border-x border-purple-200 dark:border-purple-700 min-w-[60px] text-center font-medium bg-purple-50 dark:bg-purple-900/10'>
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className='px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors border-l border-purple-200 dark:border-purple-700'
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className='flex gap-3'>
                {!isOutOfStock && (
                  <>
                    <Button
                      onClick={handleAddToCart}
                      className='flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200'
                      size='lg'
                    >
                      <ShoppingCart className='w-4 h-4 mr-2' />
                      Thêm vào giỏ
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      variant='outline'
                      className='flex-1 border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                      size='lg'
                    >
                      Mua ngay
                    </Button>
                  </>
                )}
                <Button
                  variant='outline'
                  size='lg'
                  className={`px-4 ${
                    isWishlisted
                      ? 'text-red-500 border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                  }`}
                  onClick={handleWishlist}
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='px-4 border-purple-300 text-purple-600 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20'
                  onClick={handleShare}
                >
                  <Share2 className='w-4 h-4' />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-4'>
              <div className='flex items-center gap-2 text-sm'>
                <Truck className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <span>Miễn phí vận chuyển</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Shield className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <span>Bảo hành chính hãng</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <RotateCcw className='w-4 h-4 text-purple-600 dark:text-purple-400' />
                <span>Đổi trả 7 ngày</span>
              </div>
            </div>

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

        {/* Product Details Tabs */}
        <div className='mt-12'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='space-y-6'
          >
            <TabsList className='grid w-full grid-cols-3 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'>
              <TabsTrigger value='description'>Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value='reviews'>
                Đánh giá ({product.ratings?.count || 0})
              </TabsTrigger>
              <TabsTrigger value='comments'>Bình luận</TabsTrigger>
            </TabsList>

            <TabsContent value='description' className='space-y-6'>
              <Card className='card-glass'>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-bold mb-4'>Mô tả chi tiết</h3>
                  <div className='space-y-4'>
                    {product.shortDescription && (
                      <p className='text-lg text-muted-foreground leading-relaxed'>
                        {product.shortDescription}
                      </p>
                    )}
                    <div className='prose prose-sm max-w-none'>
                      <div className='whitespace-pre-line leading-relaxed'>
                        {product.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <Card className='card-glass'>
                    <CardContent className='p-6'>
                      <h3 className='text-xl font-bold mb-4'>
                        Thông số kỹ thuật
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className='flex justify-between py-2 border-b border-border/50'
                            >
                              <span className='font-medium text-muted-foreground'>
                                {key}:
                              </span>
                              <span className='text-foreground'>{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

              {/* Additional Info */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {product.warrantyInformation && (
                  <Card className='card-glass'>
                    <CardContent className='p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Shield className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        <h4 className='font-semibold'>Bảo hành</h4>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {product.warrantyInformation}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {product.shippingInformation && (
                  <Card className='card-glass'>
                    <CardContent className='p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <Truck className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        <h4 className='font-semibold'>Vận chuyển</h4>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {product.shippingInformation}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {product.returnPolicy && (
                  <Card className='card-glass'>
                    <CardContent className='p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <RotateCcw className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        <h4 className='font-semibold'>Chính sách đổi trả</h4>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {product.returnPolicy}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value='reviews'>
              <ReviewList
                reviews={product.reviews || []}
                averageRating={product.ratings?.average || 0}
                totalReviews={product.ratings?.count || 0}
              />
            </TabsContent>

            <TabsContent value='comments'>
              <CommentList productId={product._id} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className='mt-12'>
          <RelatedProducts
            productId={product._id}
            category={product.category}
          />
        </div>
      </div>
    </div>
  )
}
