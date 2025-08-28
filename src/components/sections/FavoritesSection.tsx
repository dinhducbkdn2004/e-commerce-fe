import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Heart,
    ShoppingBag,
    Star,
} from 'lucide-react'
import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'

function FavoritesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const favoriteProducts = [
    {
      id: 1,
      name: 'Premium Silk Blouse',
      price: 189,
      originalPrice: 249,
      image:
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/premium-silk-blouse',
      badge: 'Bestseller',
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: 'Designer Leather Handbag',
      price: 399,
      originalPrice: 529,
      image:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/designer-leather-handbag',
      badge: 'Limited Edition',
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Luxury Cashmere Scarf',
      price: 129,
      originalPrice: 179,
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/luxury-cashmere-scarf',
      badge: 'New',
      rating: 4.7,
      reviews: 203,
    },
    {
      id: 4,
      name: 'Statement Gold Necklace',
      price: 299,
      originalPrice: 399,
      image:
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/statement-gold-necklace',
      badge: 'Trending',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 5,
      name: 'Designer Sunglasses',
      price: 249,
      originalPrice: 329,
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/designer-sunglasses',
      badge: 'Hot',
      rating: 4.8,
      reviews: 92,
    },
    {
      id: 6,
      name: 'Elegant Pearl Earrings',
      price: 159,
      originalPrice: 219,
      image:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      href: '/product/elegant-pearl-earrings',
      badge: 'Classic',
      rating: 4.9,
      reviews: 134,
    },
  ]

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='text-center mb-12 lg:mb-16'>
          <div className='flex items-center justify-center mb-4'>
            <Heart className='w-6 h-6 text-purple-600 dark:text-purple-400 mr-2' />
            <span className='text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider'>
              Customer Favorites
            </span>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
            Most Loved
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 ml-3'>
              Products
            </span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Discover the items our customers can't stop talking about.
            Handpicked favorites with exceptional reviews.
          </p>
        </div>

        {/* Carousel Navigation */}
        <div className='flex justify-center gap-4 mb-8'>
          <Button
            variant='outline'
            size='sm'
            onClick={scrollPrev}
            className='rounded-full w-10 h-10 p-0 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/20'
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={scrollNext}
            className='rounded-full w-10 h-10 p-0 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/20'
          >
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>

        {/* Products Carousel */}
        <div className='relative mb-12'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {favoriteProducts.map(product => (
                <div
                  key={product.id}
                  className='flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-3'
                >
                  <div className='group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden border border-gray-100 dark:border-gray-700 h-full'>
                    {/* Product Image */}
                    <div className='relative aspect-square overflow-hidden rounded-t-2xl'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      />

                      {/* Badge */}
                      <div className='absolute top-3 left-3'>
                        <Badge
                          variant={
                            product.badge === 'Bestseller'
                              ? 'default'
                              : 'secondary'
                          }
                          className={`text-xs font-bold ${
                            product.badge === 'Bestseller'
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                              : product.badge === 'Limited Edition'
                                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                                : product.badge === 'New'
                                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                  : 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                          }`}
                        >
                          {product.badge}
                        </Badge>
                      </div>

                      {/* Quick Actions */}
                      <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button className='bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
                          <Heart className='w-4 h-4 text-gray-600 dark:text-gray-400' />
                        </button>
                      </div>

                      {/* Quick Shop Overlay */}
                      <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <Link to={product.href}>
                          <Button
                            size='sm'
                            className='bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                          >
                            <ShoppingBag className='w-4 h-4 mr-2' />
                            Quick Shop
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className='p-6'>
                      {/* Rating */}
                      <div className='flex items-center mb-2'>
                        <div className='flex items-center'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className='text-sm text-gray-500 dark:text-gray-400 ml-2'>
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className='font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'>
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-lg font-bold text-gray-900 dark:text-white'>
                            ${product.price}
                          </span>
                          <span className='text-sm text-gray-500 dark:text-gray-400 line-through'>
                            ${product.originalPrice}
                          </span>
                        </div>
                        <div className='text-sm font-medium text-green-600 dark:text-green-400'>
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          % OFF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className='text-center'>
          <div className='inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 lg:p-10 border border-purple-200 dark:border-purple-800'>
            <div className='text-center sm:text-left'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                Want to see more customer favorites?
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-sm'>
                Browse our complete collection of top-rated products
              </p>
            </div>
            <Link to='/shop/favorites'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group whitespace-nowrap'
              >
                View All Favorites
                <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(FavoritesSection)
