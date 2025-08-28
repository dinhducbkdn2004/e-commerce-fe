import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { productService } from '@/services/productService'
import type { ProductDTO } from '@/types/product'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface RelatedProductsProps {
  productId: string
  category: string
  className?: string
}

export default function RelatedProducts({
  productId,
  category,
  className = '',
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<ProductDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadRelatedProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        // Get products from the same category, excluding current product
        const products = await productService.getProductsByCategory(category)
        const filtered = products
          .filter(product => product._id !== productId)
          .slice(0, 8) // Limit to 8 related products

        setRelatedProducts(filtered)
      } catch (err) {
        console.error('Error loading related products:', err)
        setError('Không thể tải sản phẩm liên quan')
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      loadRelatedProducts()
    }
  }, [productId, category])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // Scroll by approximately one card width
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // Scroll by approximately one card width
        behavior: 'smooth',
      })
    }
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className='text-2xl font-bold'>Sản phẩm liên quan</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='h-64 rounded-xl bg-muted animate-pulse' />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className='text-2xl font-bold'>Sản phẩm liên quan</h2>
        <div className='text-center py-8'>
          <p className='text-muted-foreground'>{error}</p>
        </div>
      </div>
    )
  }

  if (relatedProducts.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className='text-2xl font-bold'>Sản phẩm liên quan</h2>
        <div className='text-center py-8'>
          <p className='text-muted-foreground'>Không có sản phẩm liên quan</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Sản phẩm liên quan</h2>

        {/* Navigation buttons for desktop */}
        <div className='hidden md:flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            onClick={scrollLeft}
            className='h-8 w-8'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            onClick={scrollRight}
            className='h-8 w-8'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Desktop: Horizontal scrolling carousel */}
      <div className='hidden md:block relative'>
        <div
          ref={scrollContainerRef}
          className='flex gap-4 overflow-x-auto scrollbar-hide'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {relatedProducts.map(product => (
            <div key={product._id} className='flex-shrink-0 w-72'>
              <ProductCard product={product} viewMode='grid' />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Grid layout */}
      <div className='md:hidden grid grid-cols-2 gap-4'>
        {relatedProducts.slice(0, 4).map(product => (
          <ProductCard key={product._id} product={product} viewMode='grid' />
        ))}
      </div>

      {/* Show more button for mobile */}
      {relatedProducts.length > 4 && (
        <div className='md:hidden text-center'>
          <Button variant='outline' asChild>
            <a href={`/products?category=${encodeURIComponent(category)}`}>
              Xem thêm sản phẩm trong danh mục
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

// Add custom CSS for hiding scrollbar
const style = document.createElement('style')
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`
document.head.appendChild(style)

